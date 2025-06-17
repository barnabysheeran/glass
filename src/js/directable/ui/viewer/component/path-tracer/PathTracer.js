import ApplicationLogger from '../../../../application/ApplicationLogger';
import AssetController from './Asset/AssetController';
import ApplicationDispatcher from '../../../../application-dispatcher/ApplicationDispatcher';

import PathRenderer from './Renderer/PathRenderer';

export default class PathTracer {
	static #CANVAS_ELEMENT;
	static #PATH_RENDERER;

	// _________________________________________________________________________

	static initialise(container) {
		ApplicationLogger.log('PathTracer. initialise', 1);

		// Create Canvas
		this.#CANVAS_ELEMENT = document.createElement('canvas');
		this.#CANVAS_ELEMENT.id = 'path-tracer';
		this.#CANVAS_ELEMENT.classList.add('path-tracer');
		container.appendChild(this.#CANVAS_ELEMENT);

		// Preload Assets
		ApplicationDispatcher.on(
			'path-tracer-assets-preloaded',
			this.#onPreloaded.bind(this),
		);

		AssetController.initialise();
	}

	// _________________________________________________________________ Preload

	static #onPreloaded() {
		ApplicationLogger.log('PathTracer. onPreloaded', 1);

		// Create Path Renderer
		this.#PATH_RENDERER = new PathRenderer(
			this.#CANVAS_ELEMENT,
			this.#onRenderComplete.bind(this),
		);

		// Set Size
		this.setSize(500, 500);

		// Start
		this.#start();
	}

	// _______________________________________________ Overlay Dispatcher Events

	static #onOverlayButtonClear() {
		this.#clear();
	}

	static #onOverlayButtonStart() {
		this.#start();
	}

	static #onOverlayButtonStop() {
		this.#stop();
	}

	// ___________________________________________________________________ Clear

	static #clear() {
		ApplicationLogger.log('ViewPathTracer. clear ', 1);

		// Clear
		this.#PATH_RENDERER.clear();
	}

	// ____________________________________________________________ Start / Stop

	static #start() {
		ApplicationLogger.log('ViewPathTracer. start ', 1);

		// TODO Hard Coded Renderer Settings

		// Scene
		this.#PATH_RENDERER.setScene(3);

		// AA
		this.#PATH_RENDERER.setAASamples(1);

		// Bounce
		this.#PATH_RENDERER.setBounceMax(100);

		// Save
		// this.#PATH_RENDERER.setSaveOutput(false);

		// Start
		this.#PATH_RENDERER.startAnimation();
	}

	static #stop() {
		ApplicationLogger.log('ViewPathTracer. stop ', 1);

		// Stop
		this.#PATH_RENDERER.stop();
	}

	static #onRenderComplete() {
		ApplicationLogger.log('ViewPathTracer. onRenderComplete ', 1);

		// TODO update images

		// Re-start
		// this.#start();
	}

	// ____________________________________________________________________ Size

	static setSize(width, height) {
		ApplicationLogger.log(`ViewPathTracer. setSize ${width} ${height}`, 1);

		// Canvas
		this.#CANVAS_ELEMENT.width = width;
		this.#CANVAS_ELEMENT.height = height;

		// Path Renderer
		this.#PATH_RENDERER.setSize(width, height);
	}
}
