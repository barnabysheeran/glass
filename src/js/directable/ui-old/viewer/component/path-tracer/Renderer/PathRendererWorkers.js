import ApplicationLogger from '../../../../../application/ApplicationLogger';
import AssetController from '../Asset/AssetController';

import PathRenderWorker from './PathRenderer.worker';

export default class Workers {
	#WORKER_POOL = [];
	#WORKER_TOTAL = 0;

	#isRendering = false;

	// _________________________________________________________________________

	constructor(renderer) {
		this.RENDERER = renderer;

		// Worker total
		this.#WORKER_TOTAL = navigator.hardwareConcurrency || 4;

		// DEV
		// this.#WORKER_TOTAL = 4;

		// Get Texture Details
		const IMAGE_DIMENSIONS = AssetController.getImageDimensions();
		const IMAGE_DATA = AssetController.getImageData();

		ApplicationLogger.log(`Workers. Creating ${this.#WORKER_TOTAL} Workers`, 2);

		// Create worker pool
		let renderWorker;

		for (let i = 0; i < this.#WORKER_TOTAL; i += 1) {
			// Create Render Worker
			renderWorker = new PathRenderWorker();

			// Init
			renderWorker.postMessage({ messageType: 'init', threadId: i });

			// Set Texture Image Data
			renderWorker.postMessage({
				messageType: 'setTextureImageData',
				imageDimensions: IMAGE_DIMENSIONS,
				imageData: IMAGE_DATA,
			});

			// Receive
			renderWorker.onmessage = this.onWorkerMessage.bind(this);

			// Store Worker
			this.#WORKER_POOL[i] = renderWorker;
		}

		// Time
		this.timeFrameStart = 0;
		this.timeFrameInterval = 0;

		// Reuse
		this.rowTotal = 0;
		this.row = 0;
		this.workersActive = 0;

		// Rendering
		this.#isRendering = false;
	}

	// _________________________________________________________________ Message

	onWorkerMessage(e) {
		const { data } = e;

		switch (data.message) {
			case 'complete':
				this.onWorkerRowComplete(data.threadId, data.row, data.imageDataData);

				break;

			default:
				break;
		}
	}

	// ____________________________________________________________________ Init

	init() {
		for (let i = 0; i < this.#WORKER_TOTAL; i += 1) {
			this.#WORKER_POOL[i].postMessage({
				messageType: 'initScene',
			});
		}
	}

	// __________________________________________________________________ Render

	startFrame(timeFrameStart) {
		// Time
		this.timeFrameStart = timeFrameStart;

		// Rendering
		this.#isRendering = true;

		// Build BVH
		this.buildBVH();

		// Workers
		this.workersActive = this.#WORKER_TOTAL;
		this.row = this.#WORKER_TOTAL - 1;

		// Render
		for (let i = 0; i < this.#WORKER_TOTAL; i += 1) {
			this.startWorkerRow(i, i);
		}
	}

	startWorkerRow(workerId, row) {
		this.#WORKER_POOL[workerId].postMessage({
			messageType: 'render',
			timeFrameStart: this.timeFrameStart,
			row,
		});
	}

	onWorkerRowComplete(threadId, row, imageDataData) {
		// console.log(`PathRendererWorkers. onWorkerRowComplete ${threadId} ${row}`);

		// Stopped ?
		if (this.#isRendering === false) {
			return;
		}

		// Draw pixels
		this.RENDERER.drawPixels(row, imageDataData);

		// Next
		if (this.row < this.rowTotal) {
			this.startWorkerRow(threadId, (this.row += 1));
		} else {
			this.workersActive -= 1;

			if (this.workersActive === 0) {
				this.onFrameComplete();
			}
		}
	}

	onFrameComplete() {
		this.#isRendering = false;

		this.RENDERER.onFrameComplete();
	}

	stop() {
		this.#isRendering = false;
	}

	// _____________________________________________________________________ BVH

	buildBVH() {
		for (let i = 0; i < this.#WORKER_TOTAL; i += 1) {
			this.#WORKER_POOL[i].postMessage({
				messageType: 'buildBVH',
			});
		}
	}

	// ___________________________________________________________________ Scene

	setScene(sceneId, timeFrameInterval) {
		// Time
		this.timeFrameInterval = timeFrameInterval;

		// Workers
		for (let i = 0; i < this.#WORKER_TOTAL; i += 1) {
			this.#WORKER_POOL[i].postMessage({
				messageType: 'setScene',
				sceneId,
				timeFrameInterval: this.timeFrameInterval,
			});
		}
	}

	// ___________________________________________________________________ Shape

	shape(w, h) {
		// Rows
		this.rowTotal = h;

		// Workers
		for (let i = 0; i < this.#WORKER_TOTAL; i += 1) {
			this.#WORKER_POOL[i].postMessage({
				messageType: 'shape',
				pixelWidth: w,
				pixelHeight: h,
			});
		}
	}

	// ________________________________________________________________ Settings

	setAASamples(samples) {
		for (let i = 0; i < this.#WORKER_TOTAL; i += 1) {
			this.#WORKER_POOL[i].postMessage({
				messageType: 'setSamplesAA',
				samples,
			});
		}
	}

	setBounceMax(bounceMax) {
		for (let i = 0; i < this.#WORKER_TOTAL; i += 1) {
			this.#WORKER_POOL[i].postMessage({
				messageType: 'setBounceMax',
				bounceMax,
			});
		}
	}

	setAperture(aperture) {
		for (let i = 0; i < this.#WORKER_TOTAL; i += 1) {
			this.#WORKER_POOL[i].postMessage({
				messageType: 'setAperture',
				aperture,
			});
		}
	}

	setFov(fov) {
		for (let i = 0; i < this.#WORKER_TOTAL; i += 1) {
			this.#WORKER_POOL[i].postMessage({
				messageType: 'setFov',
				fov,
			});
		}
	}

	// __________________________________________________________________ Assets

	// onImageLibraryLoaded(imageDimensions, imageData) {
	// 	// console.log('PathRenderWorkers. onImageLibraryLoaded');

	// 	// const IMAGE_DIMENSIONS = this.IMAGE_LIBRARY.getImageDimensions();
	// 	// const IMAGE_DATA = this.IMAGE_LIBRARY.getImageData();

	// 	for (let i = 0; i < this.#WORKER_TOTAL; i += 1) {
	// 		this.#WORKER_POOL[i].postMessage({
	// 			messageType: 'setTextureImageData',
	// 			imageDimensions,
	// 			imageData,
	// 		});
	// 	}
	// }

	onMeshLibraryLoaded(positions, normals, cells) {
		// const POSITIONS = this.MESH_LIBRARY.getPositions();
		// const NORMALS = this.MESH_LIBRARY.getNormals();
		// const CELLS = this.MESH_LIBRARY.getCells();

		for (let i = 0; i < this.#WORKER_TOTAL; i += 1) {
			this.#WORKER_POOL[i].postMessage({
				messageType: 'setMeshData',
				positions,
				normals,
				cells,
			});
		}
	}

	// ______________________________________________________________ Statistics

	statisticsReset() {
		for (let i = 0; i < this.#WORKER_TOTAL; i += 1) {
			this.#WORKER_POOL[i].postMessage({
				messageType: 'statisticsReset',
			});
		}
	}

	statisticsPoll() {
		for (let i = 0; i < this.#WORKER_TOTAL; i += 1) {
			this.#WORKER_POOL[i].postMessage({
				messageType: 'statisticsPoll',
			});
		}
	}

	// __________________________________________________________________ Access

	getWorkerTotal() {
		return this.#WORKER_TOTAL;
	}
}
