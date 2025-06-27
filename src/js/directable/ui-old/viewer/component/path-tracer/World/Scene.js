import { vec3 } from 'gl-matrix';

import MeshLibrary from '../Library/MeshLibrary';

import HitableSphere from '../Hit/HitableSphere';
import HitableTriangle from '../Hit/HitableTriangle';
import HitablePlaneHolder from '../Hit/HitablePlaneHolder';

import HitableNode from '../Hit/HitableNode';
import HitableBox from '../Hit/HitableBox';
import HitableConstantMedium from '../Hit/HitableConstantMedium';

import SceneHelper from './Helper/SceneHelper';

export default class Scene {
	constructor(cameraController) {
		this.CAMERA_CONTROLLER = cameraController;

		this.animationFrameMax = 0;

		this.HITABLES = [];
		this.bvhRoot = null;

		this.textureImageDimensions = [];
		this.textureImageData = [];

		this.meshLibrary = new MeshLibrary();

		this.countTriangles = 0;
		this.countSpheres = 0;
		this.countVolumeSpheres = 0;
	}

	// ____________________________________________________________________ Init

	init() {}

	// ___________________________________________________________________ Reset

	reset() {
		this.HITABLES = [];
		this.BVH_ROOT = null;

		this.countTriangles = 0;
		this.countSpheres = 0;
		this.countVolumeSpheres = 0;
	}

	// __________________________________________________________________ Sphere

	addSphere(position, radius, material) {
		// TODO Move position to seperate method to match other primitives
		const SPHERE = new HitableSphere(position, radius, material);

		this.HITABLES.push(SPHERE);

		this.countSpheres += 1;

		return SPHERE;
	}

	// ________________________________________________________________ Triangle

	addTriangle(p0, p1, p2, material) {
		const TRIANGLE = new HitableTriangle(p0, p1, p2, material);

		this.HITABLES.push(TRIANGLE);

		this.countTriangles += 1;

		return TRIANGLE;
	}

	// ___________________________________________________________________ Plane

	addPlane(width, height, material) {
		return new HitablePlaneHolder(this, width, height, material);
	}

	// __________________________________________________________________ Volume

	addVolumeSphere(position, radius, texture, density) {
		const MEDIUM = new HitableConstantMedium(
			new HitableSphere(position, radius),
			density,
			texture,
		);

		this.HITABLES.push(MEDIUM);

		this.countVolumeSpheres += 1;

		return MEDIUM;
	}

	// _____________________________________________________________________ Box

	addBox(width, height, depth, material) {
		this.countTriangles += 12;

		return new HitableBox(this, width, height, depth, material);
	}

	// ____________________________________________________________ Scene helper

	addSceneHelper(sizeAxis = 10, sizeSphere = 1) {
		return new SceneHelper(this, sizeAxis, sizeSphere);
	}

	// _____________________________________________________________________ BVH

	buildBVH() {
		this.bvhRoot = new HitableNode(this.HITABLES, 0);

		this.bvhRoot.createBoundingBox();
	}

	// _______________________________________________________________ Animation

	setAnimationTime() {
		// time
	}

	getAnimationFrameMax() {
		return this.animationFrameMax;
	}

	// ______________________________________________________________ Background

	getBackground() {
		// rayDirectionNormalized

		return vec3.fromValues(0.5, 0.5, 0.5);
	}

	// ________________________________________________________ TextureImageData

	setTextureImageDimensions(dimensions) {
		this.textureImageDimensions = dimensions;
	}

	setTextureImageData(data) {
		this.textureImageData = data;
	}

	getTextureImageDimensions(textureId) {
		return this.textureImageDimensions[textureId];
	}

	getTextureImageData(textureId) {
		return this.textureImageData[textureId];
	}

	// _______________________________________________________________ Mesh Data

	getMeshPositions(assetId) {
		return this.meshLibrary.POSITIONS[assetId];
	}

	getMeshNormals(assetId) {
		return this.meshLibrary.NORMALS[assetId];
	}

	getMeshCells(assetId) {
		return this.meshLibrary.CELLS[assetId];
	}
}
