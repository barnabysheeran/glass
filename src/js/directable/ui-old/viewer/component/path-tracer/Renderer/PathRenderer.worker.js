import { vec3 } from 'gl-matrix';

import World from '../World/World';
import CameraController from '../Camera/CameraController';
import Ray from '../Ray/Ray';
import HitRecord from '../Hit/HitRecord';

const CAMERA_CONTROLLER = new CameraController();
const WORLD = new World(CAMERA_CONTROLLER);

// Settings
let threadId = -1;

let samplesAA = 10;
let bounceMax = 50;

let pixelWidth = -1;
let pixelHeight = -1;

let timeFrameInterval;

// Colour
const colour = vec3.create();
let colourSample = vec3.create();
let imageDataData = new Uint8ClampedArray();

let time;
let ray;

let u;
let v;
let s;

// ______________________________________________________________________ Colour

// TODO setTimeout escape call stack ?
// https://www.toptal.com/javascript/interview-questions

// let scattered = new Ray();
// let hitRecord = new HitRecord();

const getColour = function getColourFunction(rayScattered, depth) {
	const hitRecord = new HitRecord();

	if (WORLD.didHitAnything(rayScattered, 0.001, Infinity, hitRecord) === true) {
		const scattered = new Ray();

		const attenuation = vec3.create();

		const emitted = hitRecord.material.emitted(
			hitRecord.u,
			hitRecord.v,
			hitRecord.position,
		);

		if (
			depth < bounceMax &&
			hitRecord.material.scatter(
				rayScattered,
				hitRecord,
				attenuation,
				scattered,
			) === true
		) {
			const colourScattered = getColour(scattered, depth + 1);

			/* eslint-disable-next-line new-cap */
			return new vec3.fromValues(
				emitted[0] + attenuation[0] * colourScattered[0],
				emitted[1] + attenuation[1] * colourScattered[1],
				emitted[2] + attenuation[2] * colourScattered[2],
			);
		}
		return emitted;
	}

	// Background
	return WORLD.getBackground(rayScattered.getDirectionNormalized());
};

// ______________________________________________________________________ Render

const render = function renderFunction(timeFrameStart, row) {
	let column;
	let index;

	// seed("thread", { global: true });
	// console.log("Random:" + Math.random());

	for (column = 0; column < pixelWidth; column += 1) {
		// Index
		index = column * 4;

		// Reset
		colour[0] = 0.0;
		colour[1] = 0.0;
		colour[2] = 0.0;

		// Samples
		for (s = 0; s < samplesAA; s += 1) {
			u = (column + Math.random()) / pixelWidth;
			v = (pixelHeight - row + Math.random()) / pixelHeight;

			time = timeFrameStart + Math.random() * timeFrameInterval;

			WORLD.setAnimationTime(time);

			ray = CAMERA_CONTROLLER.getRay(u, v);

			colourSample = getColour(ray, 0);

			colour[0] += colourSample[0];
			colour[1] += colourSample[1];
			colour[2] += colourSample[2];
		}

		colour[0] /= samplesAA;
		colour[1] /= samplesAA;
		colour[2] /= samplesAA;

		// Store
		// imageDataData[index] = Math.sqrt(colour[0]) * 255;
		// imageDataData[index + 1] = Math.sqrt(colour[1]) * 255;
		// imageDataData[index + 2] = Math.sqrt(colour[2]) * 255;
		// imageDataData[index + 3] = 255;

		imageDataData[index] = colour[0] * 255.999;
		imageDataData[index + 1] = colour[1] * 255.999;
		imageDataData[index + 2] = colour[2] * 255.999;
		imageDataData[index + 3] = 255;
	}

	// Done
	postMessage({
		message: 'complete',
		threadId,
		row,
		imageDataData,
	});
};

// _____________________________________________________________________ Message

/* eslint-disable-next-line no-restricted-globals */
self.addEventListener('message', (event) => {
	// console.log(`Worker. addEventListener ${e.data.messageType}`);

	// Get Event Data
	const EVENT_DATA = event.data;

	// Process Event Data
	switch (EVENT_DATA.messageType) {
		case 'init':
			// Store
			threadId = EVENT_DATA.threadId;

			// console.log(`Worker ${threadId}. eventListener. init`);

			break;

		case 'shape':
			pixelWidth = EVENT_DATA.pixelWidth;
			pixelHeight = EVENT_DATA.pixelHeight;
			imageDataData = new Uint8ClampedArray(pixelWidth * 4);

			CAMERA_CONTROLLER.shape(pixelWidth, pixelHeight);

			break;

		case 'setScene':
			// console.log(
			// 	`Worker ${threadId}. eventListener. setScene ${EVENT_DATA.sceneId}`
			// );

			WORLD.setScene(EVENT_DATA.sceneId);
			WORLD.buildBVH();

			timeFrameInterval = EVENT_DATA.timeFrameInterval;

			break;

		case 'setSamplesAA':
			samplesAA = EVENT_DATA.samples;

			break;

		case 'setBounceMax':
			bounceMax = EVENT_DATA.bounceMax;

			break;

		case 'setAperture':
			CAMERA_CONTROLLER.setAperture(EVENT_DATA.aperture);

			break;

		case 'setFov':
			CAMERA_CONTROLLER.setFov(EVENT_DATA.fov);

			break;

		case 'setTextureImageData':
			// console.log(`Worker ${threadId}. eventListener. setTextureImageData`);
			// console.log(EVENT_DATA.imageDimensions);
			// console.log(EVENT_DATA.imageData);

			WORLD.setTextureImageDimensions(EVENT_DATA.imageDimensions);
			WORLD.setTextureImageData(EVENT_DATA.imageData);

			break;

		case 'setMeshData':
			WORLD.setMeshes(
				EVENT_DATA.positions,
				EVENT_DATA.normals,
				EVENT_DATA.cells,
			);

			break;

		case 'buildBVH':
			WORLD.buildBVH();

			break;

		case 'initScene':
			// console.log(`Worker ${threadId}. eventListener. initScene`);

			WORLD.initScene();

			break;

		case 'render':
			// console.log(`Worker ${threadId}. eventListener. render`);

			render(EVENT_DATA.timeFrameStart, EVENT_DATA.row);

			break;

		default:
			break;
	}
});
