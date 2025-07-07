import ApplicationLogger from '../../application/ApplicationLogger.js';

import DotManager from './dot/DotManager.js';
import ShapeManager from './shape/ShapeManager.js';

import DotMatrixViewHeader from './view/view/DotMatrixViewHeader.js';
import DotMatrixViewProjectMenu from './view/view/DotMatrixViewProjectMenu.js';
import DotMatrixViewProject from './view/view/DotMatrixViewProject.js';
import DotMatrixViewIntro from './view/view/DotMatrixViewIntro.js';
// import DotMatrixViewTest from './view/view/DotMatrixViewTest.js';
// import DotMatrixViewHolding from './view/view/DotMatrixViewHolding.js';

export default class DirectableDotMatrix {
	#DOT_MANAGER;
	#SHAPE_MANAGER;

	#VIEWS = [];

	#viewIdCurrent = 'intro';

	#LOG_LEVEL = 3;

	// Views create Components, which create Shapes, which create Dots

	// _________________________________________________________________________

	constructor() {
		ApplicationLogger.log('DirectableDotMatrix', this.#LOG_LEVEL);

		// Create Dot Manager
		this.#DOT_MANAGER = new DotManager();

		// Create Shape Manager
		this.#SHAPE_MANAGER = new ShapeManager(this.#DOT_MANAGER);

		// Create Views
		this.#VIEWS.push(new DotMatrixViewHeader(this.#SHAPE_MANAGER, 'header'));
		this.#VIEWS.push(new DotMatrixViewIntro(this.#SHAPE_MANAGER, 'intro'));
		this.#VIEWS.push(new DotMatrixViewProjectMenu(this.#SHAPE_MANAGER, 'menu'));
		this.#VIEWS.push(new DotMatrixViewProject(this.#SHAPE_MANAGER, 'project'));

		// this.#VIEWS.push(new DotMatrixViewTest(this.#SHAPE_MANAGER, 'test'));
		// this.#VIEWS.push(new DotMatrixViewHolding(this.#SHAPE_MANAGER, 'holding'));

		// Start Initial View
		this.#getViewById('header').start();
		this.#getViewById(this.#viewIdCurrent).start();
	}

	// ____________________________________________________________________ Tick

	tick(frameDeltaMS) {
		// Tick Views
		for (let i = 0; i < this.#VIEWS.length; i += 1) {
			this.#VIEWS[i].tick(frameDeltaMS);
		}
	}

	// ____________________________________________________________________ View

	showProject(projectId) {
		ApplicationLogger.log(
			'DirectableDotMatrix showProject ' + projectId,
			this.#LOG_LEVEL,
		);

		// Reset Views
		for (let i = 0; i < this.#VIEWS.length; i += 1) {
			this.#VIEWS[i].reset();
		}

		// Show Project View
		this.#getViewById('project').setProjectId(projectId);
		this.#getViewById('project').start();

		this.#viewIdCurrent = 'project';
	}

	setMenuActive() {
		ApplicationLogger.log('DirectableDotMatrix setMenuActive', this.#LOG_LEVEL);

		// Reset Views
		for (let i = 0; i < this.#VIEWS.length; i += 1) {
			this.#VIEWS[i].reset();
		}

		// Show Menu View
		this.#getViewById('menu').start();

		this.#viewIdCurrent = 'menu';
	}

	setMenuInactive() {
		ApplicationLogger.log(
			'DirectableDotMatrix setMenuInactive',
			this.#LOG_LEVEL,
		);

		// Reset Views
		for (let i = 0; i < this.#VIEWS.length; i += 1) {
			this.#VIEWS[i].reset();
		}

		// Show Intro View
		this.#getViewById('intro').start();

		this.#viewIdCurrent = 'intro';
	}

	// ____________________________________________________________________ Size

	setSize(width, height) {
		ApplicationLogger.log(
			'DirectableDotMatrix setSize ' + width + ' ' + height,
			this.#LOG_LEVEL,
		);

		// Set Size requires a full Reset Redraw

		// Reset Views
		for (let i = 0; i < this.#VIEWS.length; i += 1) {
			this.#VIEWS[i].reset();
		}

		// Reset Shape Manager
		this.#SHAPE_MANAGER.reset();

		// Reset Dot Manager
		this.#DOT_MANAGER.reset();

		// Start Current View
		this.#getViewById('header').start();
		this.#getViewById(this.#viewIdCurrent).start();
	}

	// ____________________________________________________________________ Util

	#getViewById(viewId) {
		for (let i = 0; i < this.#VIEWS.length; i += 1) {
			if (this.#VIEWS[i].getViewId() === viewId) {
				return this.#VIEWS[i];
			}
		}

		return null;
	}
}
