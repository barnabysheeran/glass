import MeshLibrary from '../Library/MeshLibrary';

import World from '../World/World';
import CameraController from '../Camera/CameraController';
// import Recorder from '../Recorder/Recorder';

import PathRendererWorkers from './PathRendererWorkers';

export default class PathRenderer {
	#CONTEXT;

	#CALLBACK_RENDER_COMPLETE;

	#WORKERS;

	// #IMAGE_LIBRARY;
	#MESH_LIBRARY;

	#pixelWidth = -1;
	#pixelHeight = -1;

	#timeRenderStart = 0;
	#rowsComplete = 0;

	#frame = 0;
	#frameMax = 0;

	#timeFrameInterval = 1.0;

	// _________________________________________________________________________

	constructor(canvas, callbackRenderComplete) {
		// Store
		this.#CALLBACK_RENDER_COMPLETE = callbackRenderComplete;

		// Get Context
		this.#CONTEXT = canvas.getContext('2d', { willReadFrequently: true });
		this.#CONTEXT.imageSmoothingEnabled = false;

		// Create Path Renderer Workers
		this.#WORKERS = new PathRendererWorkers(this);

		// Recorder // TODO Remove / Rename
		// this.saveOutput = false;
		// this.RECORDER = new Recorder(canvas);

		// Mesh Library - Load on main thread
		this.#MESH_LIBRARY = new MeshLibrary(this);
		// TODO Move to AssetController as Images were moved

		// Create local World // TODO Remove - See SetScene
		this.WORLD = new World(new CameraController());
	}

	// __________________________________________________________________ Render

	startAnimation() {
		// Render Time
		const d = new Date();
		this.#timeRenderStart = d.getTime();

		// Frame
		this.frame = 0;

		// Start
		this.startFrame();
	}

	startFrame() {
		// Rows
		this.#rowsComplete = 0;

		// Path Renderer Workers
		this.#WORKERS.startFrame(this.#frame * this.timeFrameInterval);
	}

	drawPixels(row, imageDataData) {
		// Count
		this.#rowsComplete += 1;

		// Draw
		this.#CONTEXT.putImageData(
			new ImageData(imageDataData, this.#pixelWidth, 1),
			0,
			row,
		);
	}

	onFrameComplete() {
		// Save ?
		// if (this.saveOutput === true) {
		// 	this.RECORDER.saveImage(`frame_${this.#frame}.png`);
		// }

		// Frame
		this.#frame += 1;

		if (this.#frame >= this.#frameMax) {
			this.onRenderComplete();
		} else {
			this.startFrame();
		}
	}

	onRenderComplete() {
		// Complete
		this.#CALLBACK_RENDER_COMPLETE();
	}

	// ___________________________________________________________________ Clear

	clear() {
		//
		this.#CONTEXT.fillStyle = '#ffffff';
		this.#CONTEXT.fillRect(0, 0, this.#pixelWidth, this.#pixelHeight);

		// Path Renderer Workers
		this.#WORKERS.stop();
	}

	// ________________________________________________________________ Stop

	stop() {
		// Path Renderer Workers
		this.#WORKERS.stop();
	}

	// ___________________________________________________________________ Scene

	setScene(sceneId) {
		// World TODO Remove duplicate WORLD from renderer, communicate first worker
		this.WORLD.setScene(sceneId);

		// Animation Frames
		this.#frameMax = this.WORLD.getSceneAnimationFrameMax(sceneId);

		// Time
		this.timeFrameInterval = 1.0 / this.#frameMax;

		// Path Renderer Workers
		this.#WORKERS.setScene(sceneId, this.timeFrameInterval);
	}

	// ___________________________________________________________________ Shape

	setSize(width, height) {
		// Store
		this.#pixelWidth = width;
		this.#pixelHeight = height;

		this.#WORKERS.shape(width, height);
	}

	// ________________________________________________________________ Settings

	setAASamples(samples) {
		this.#WORKERS.setAASamples(samples);
	}

	setBounceMax(bounceMax) {
		this.#WORKERS.setBounceMax(bounceMax);
	}

	setAperture(aperture) {
		this.#WORKERS.setAperture(aperture);
	}

	setFov(fov) {
		this.#WORKERS.setFov(fov);
	}

	setSaveOutput(save) {
		this.saveOutput = save;
	}
}
