import SceneExampleA from './Scenes/ExampleA';
import SceneExampleB from './Scenes/ExampleB';
import SceneCornell from './Scenes/Cornell';
import SceneSphereTest from './Scenes/SphereTest';

export default class World {
	constructor(cameraController) {
		this.CAMERA_CONTROLLER = cameraController;

		this.SCENES = [
			new SceneExampleA(cameraController),
			new SceneExampleB(cameraController),
			new SceneCornell(cameraController),
			new SceneSphereTest(cameraController),
		];

		// Default
		this.scene = undefined;
		// this.setScene(0);
	}

	// ___________________________________________________________________ Scene

	setScene(sceneId) {
		this.scene = this.SCENES[sceneId];
		this.scene.init();
	}

	initScene() {
		this.scene.init();
	}

	// _____________________________________________________________________ BVH

	buildBVH() {
		this.scene.buildBVH();
	}

	// ______________________________________________________________ Background

	getBackground(rayDirectionNormalized) {
		return this.scene.getBackground(rayDirectionNormalized);
	}

	// _____________________________________________________________________ Hit

	didHitAnything(ray, tMin, tMax, hitRecord) {
		return this.scene.bvhRoot.didHit(ray, tMin, tMax, hitRecord);
	}

	// _______________________________________________________________ Animation

	setAnimationTime(time) {
		this.scene.setAnimationTime(time);
	}

	getAnimationFrameMax() {
		return this.scene.getAnimationFrameMax();
	}

	// ________________________________________________________ TextureImageData

	setTextureImageDimensions(dimensions) {
		const { SCENES } = this;

		for (let i = 0; i < SCENES.length; i += 1) {
			SCENES[i].setTextureImageDimensions(dimensions);
		}
	}

	setTextureImageData(data) {
		const { SCENES } = this;

		for (let i = 0; i < SCENES.length; i += 1) {
			SCENES[i].setTextureImageData(data);
		}
	}

	// __________________________________________________________________ Meshes

	setMeshes(positions, normals, cells) {
		const { SCENES } = this;

		let i;

		for (i = 0; i < SCENES.length; i += 1) {
			SCENES[i].setMeshes(positions, normals, cells);
		}
	}

	// __________________________________________________________________ Access

	getSceneAnimationFrameMax(sceneId) {
		const { SCENES } = this;

		return SCENES[sceneId].getAnimationFrameMax();
	}
}
