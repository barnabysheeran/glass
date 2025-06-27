import { vec3 } from 'gl-matrix';

import Camera from './Camera';

export default class CameraController {
	constructor() {
		// Up
		this.UP = vec3.fromValues(0.0, 1.0, 0.0);

		// Initial settings
		this.fov = 20.0;
		this.aspectRatio = 800 / 400;
		this.aperture = 0.2;

		// Positions
		this.position = vec3.create();
		this.positionTarget = vec3.create();
	}

	calculateDistanceFocus() {
		const POSITION = this.position;
		const POSITION_TARGET = this.positionTarget;

		const path = vec3.fromValues(
			POSITION[0] - POSITION_TARGET[0],
			POSITION[1] - POSITION_TARGET[1],
			POSITION[2] - POSITION_TARGET[2],
		);

		return vec3.length(path);
	}

	getRay(u, v) {
		return this.CAMERA.getRay(u, v);
	}

	// _______________________________________________________________________ Set

	shape(w, h) {
		this.aspectRatio = w / h;

		this.update();
	}

	setAperture(aperture) {
		this.aperture = aperture;

		this.update();
	}

	setFov(fov) {
		this.fov = fov;

		this.update();
	}

	setPosition(x, y, z) {
		this.position[0] = x;
		this.position[1] = y;
		this.position[2] = z;

		this.update();
	}

	setPositionTarget(x, y, z) {
		this.positionTarget[0] = x;
		this.positionTarget[1] = y;
		this.positionTarget[2] = z;

		this.update();
	}

	// ____________________________________________________________________ Update

	update() {
		this.distanceFocus = this.calculateDistanceFocus();

		this.CAMERA = new Camera(
			this.position,
			this.positionTarget,
			this.UP,
			this.fov,
			this.aspectRatio,
			this.aperture,
			this.distanceFocus,
		);
	}
}
