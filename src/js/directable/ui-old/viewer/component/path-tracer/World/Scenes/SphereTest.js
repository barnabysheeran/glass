import { vec3 } from 'gl-matrix';

import Scene from '../Scene';

import TextureImage from '../../Texture/TextureImage';
import TextureConstant from '../../Texture/TextureConstant';

import MaterialDielectric from '../../Material/MaterialDielectric';
import MaterialMetal from '../../Material/MaterialMetal';
import MaterialLightDiffuse from '../../Material/MaterialLightDiffuse';

import EnvironmentSpherical from '../../Environment/EnvironmentSpherical';

export default class SceneTestSphere extends Scene {
	constructor(cameraController) {
		super(cameraController);
	}

	// ____________________________________________________________________ Init

	init() {
		this.reset();

		// Helper
		// this.addSceneHelper(100, 10);

		// Dialectic
		const MATERIAL_DIELECTRIC = new MaterialDielectric(1.5);

		const TEXTURE_VOLUME_A = new TextureConstant(
			vec3.fromValues(1.0, 1.0, 0.0),
		);
		const TEXTURE_VOLUME_B = new TextureConstant(
			vec3.fromValues(0.0, 1.0, 1.0),
		);
		const TEXTURE_VOLUME_C = new TextureConstant(
			vec3.fromValues(1.0, 0.0, 1.0),
		);

		let inner;

		// A
		this.addSphere(vec3.fromValues(0.0, 0.0, 0.0), 2.0, MATERIAL_DIELECTRIC);

		// Dialectic
		// const MATERIAL_DIELECTRIC = new MaterialDielectric(1.5);

		// A
		// this.addSphere(vec3.fromValues(0.0, 0.0, 0.0), 3.0, MATERIAL_DIELECTRIC);
		// this.addSphere(vec3.fromValues(0.0, 0.0, 0.0), 4.0, MATERIAL_DIELECTRIC);
		// this.addSphere(vec3.fromValues(0.0, 0.0, 0.0), 5.0, MATERIAL_DIELECTRIC);
		// this.addSphere(vec3.fromValues(2.0, 2.0, 2.0), 2.0, MATERIAL_DIELECTRIC);
		// this.addSphere(vec3.fromValues(-2.0, -2.0, -2.0), 2.0, MATERIAL_DIELECTRIC);

		// Light
		// const TEXTURE_LIGHT = new TextureConstant(vec3.fromValues(1.0, 1.0, 1.0));
		// const MATERIAL_LIGHT = new MaterialLightDiffuse(TEXTURE_LIGHT);
		// this.addSphere(vec3.fromValues(0.0, 0.0, 0.0), 0.5, MATERIAL_LIGHT);

		// const TEXTURE_VOLUME_A = new TextureConstant(
		// 	vec3.fromValues(1.0, 0.0, 0.0)
		// );

		// this.addVolumeSphere(
		// 	vec3.fromValues(1.0, 1.0, 1.0),
		// 	1.0,
		// 	TEXTURE_VOLUME_A,
		// 	0.2
		// );

		// Metal
		// const MATERIAL_METAL = new MaterialMetal(
		// 	new TextureConstant(vec3.fromValues(1.0, 1.0, 1.0)),
		// 	0.01,
		// );

		// this.addSphere(vec3.fromValues(0.0, 0.0, 0.0), 1.0, MATERIAL_METAL);

		// Add Teleprompt Reflector
		// TODO

		// // Floor and walls
		// const TEXTURE_FLOOR = new TextureConstant(vec3.fromValues(0.8, 0.8, 0.8));
		// const MATERIAL_FLOOR = new MaterialMetal(TEXTURE_FLOOR, 0.02);

		// const BOX_SIZE = 20;
		// const BOX_SIZE_HALF = BOX_SIZE * 0.5;

		// // Wall A
		// const WALL_A = this.addPlane(BOX_SIZE, BOX_SIZE, MATERIAL_FLOOR);
		// WALL_A.setRotationEuler(0.0, 90.0, 0.0);
		// WALL_A.setPosition(-BOX_SIZE_HALF, BOX_SIZE_HALF, 0.0);

		// // Wall B
		// const WALL_B = this.addPlane(BOX_SIZE, BOX_SIZE, MATERIAL_FLOOR);
		// WALL_B.setRotationEuler(0.0, 180.0, 0.0);
		// WALL_B.setPosition(0.0, BOX_SIZE_HALF, BOX_SIZE_HALF);

		// // Floor
		// const FLOOR = this.addPlane(BOX_SIZE, BOX_SIZE, MATERIAL_FLOOR);
		// FLOOR.setRotationEuler(-90.0, 90.0, 0.0);

		// Text Texture
		// const IMAGE_TEXT_ID = 0;

		// const TEXTURE_TEXT = new TextureImage(
		// 	this.getTextureImageDimensions(IMAGE_TEXT_ID),
		// 	this.getTextureImageData(IMAGE_TEXT_ID),
		// );

		// // Material Text
		// const MATERIAL_TEXT = new MaterialMetal(TEXTURE_TEXT, 0.0);

		// // Create Text Plane
		// const TEXT_PLANE = this.addPlane(20, 10, MATERIAL_METAL);
		// TEXT_PLANE.setRotationEuler(0.0, 10.0, 0.0);
		// TEXT_PLANE.setPosition(0.0, 0.0, -4.0);

		// // Create Glass Plane
		// const GLASS_PLANE = this.addPlane(10, 5, MATERIAL_DIELECTRIC);
		// GLASS_PLANE.setRotationEuler(0.0, 0.0, 0.0);
		// GLASS_PLANE.setPosition(0.0, 0.0, 0.0);

		// Create Text Plane Reflector
		// const TEXT_PLANE_REFLECTOR = this.addPlane(20, 10, MATERIAL_TEXT);
		// TEXT_PLANE_REFLECTOR.setRotationEuler(0.0, 200.0, 0.0);
		// TEXT_PLANE_REFLECTOR.setPosition(0.0, 0.0, 4.0);

		// Environment
		const imageEnvironmentIndex = 0;

		const ENVIRONMENT_TEXTURE = new TextureImage(
			this.getTextureImageDimensions(imageEnvironmentIndex),
			this.getTextureImageData(imageEnvironmentIndex),
		);

		this.ENVIRONMENT = new EnvironmentSpherical(ENVIRONMENT_TEXTURE);
	}

	// _______________________________________________________________ Animation

	setAnimationTime() {
		// time;

		// Camera
		const { CAMERA_CONTROLLER } = this;

		const BLUR_CENTER = 0.0;
		const FOV = 45.0 + Math.random() * BLUR_CENTER;

		CAMERA_CONTROLLER.setFov(FOV);
		CAMERA_CONTROLLER.setAperture(0.05);

		CAMERA_CONTROLLER.setPosition(0.0, 0.0, 10.0);
		CAMERA_CONTROLLER.setPositionTarget(0.0, 0.0, 0.0);
	}

	// ______________________________________________________________ Background

	getBackground(rayDirectionNormalized) {
		// Flip texture X
		const reversed = vec3.fromValues(
			rayDirectionNormalized[0],
			rayDirectionNormalized[1],
			-rayDirectionNormalized[2],
		);

		return this.ENVIRONMENT.getColour(reversed);

		// return vec3.fromValues(0.5, 0.5, 0.5);
	}
}
