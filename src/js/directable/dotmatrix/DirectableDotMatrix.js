import ApplicationLogger from '../../application/ApplicationLogger.js';

import DotManager from './dot/DotManager.js';
import ShapeManager from './shape/ShapeManager.js';
import ComponentManager from './component/ComponentManager.js';

import ViewTest from './view/test/ViewTest.js';

import DirectableDotMatrixConstants from './DirectableDotMatrixConstants.js';

export default class DirectableDotMatrix {
	#DOT_MANAGER;
	#SHAPE_MANAGER;
	#COMPONENT_MANAGER;

	#VIEWS = [];

	#viewIdCurrent = 'test';
	#hasDrawCompleted = false;

	#LOG_LEVEL = 3;

	// Views create Components, which create Shapes, which create Dots

	// _________________________________________________________________________

	constructor(displayWidthPx, displayHeightPx) {
		ApplicationLogger.log(
			'DirectableDotMatrix ' + displayHeightPx + ' ' + displayHeightPx,
			this.#LOG_LEVEL,
		);

		// Create Dot Manager
		this.#DOT_MANAGER = new DotManager(displayWidthPx, displayHeightPx);

		// Create Shape Manager
		this.#SHAPE_MANAGER = new ShapeManager(this.#DOT_MANAGER);

		// Create Component Manager
		this.#COMPONENT_MANAGER = new ComponentManager();

		// Create View Test
		this.#VIEWS.push(
			new ViewTest(this.#SHAPE_MANAGER, this.#COMPONENT_MANAGER, 'test'),
		);

		// Start Initial View
		this.#getViewById(this.#viewIdCurrent).start(0);
	}

	// ____________________________________________________________________ Tick

	tick(frameDeltaMS) {
		// Tick Views
		for (let i = 0; i < this.#VIEWS.length; i += 1) {
			this.#VIEWS[i].tick(frameDeltaMS);
		}

		// Tick Component Manager
		this.#COMPONENT_MANAGER.tick();

		// Get Active Component Total
		const ACTIVE_COMPONENT_TOTAL =
			this.#COMPONENT_MANAGER.getActiveComponentTotal();

		// Components Complete ?
		if (ACTIVE_COMPONENT_TOTAL === 0 && this.#hasDrawCompleted === false) {
			// View Draw Complete
			this.#getViewById(this.#viewIdCurrent).onDrawComplete();

			// Set Dot Manager Draw Complete
			this.#hasDrawCompleted = true;
		}

		if (ACTIVE_COMPONENT_TOTAL > 0 && this.#hasDrawCompleted === true) {
			// Draw Not Complete
			this.#hasDrawCompleted = false;
		}
	}

	// ____________________________________________________________________ View

	#stopCurrentView() {
		ApplicationLogger.log(
			`DirectableDotMatrix stopCurrentView '${this.#viewIdCurrent}'`,
			this.#LOG_LEVEL,
		);

		// Order Important

		// Stop Any Active Components
		this.#COMPONENT_MANAGER.reset();

		// Stop any Active Shapes
		this.#SHAPE_MANAGER.reset();

		// Stop Current View
		this.#getViewById(this.#viewIdCurrent).stop();
	}

	projectShow(projectId) {
		ApplicationLogger.log(
			'DirectableDotMatrix projectShow ' + projectId,
			this.#LOG_LEVEL,
		);

		const DELAY_PAGE_TRANSITION =
			DirectableDotMatrixConstants.getDelayPageTransition();

		// Stop Current View
		this.#stopCurrentView();

		// Show Project View
		const PROJECT_VIEW = this.#getViewById(projectId);

		if (PROJECT_VIEW) {
			PROJECT_VIEW.start(DELAY_PAGE_TRANSITION);
		} else {
			ApplicationLogger.log(
				'DirectableDotMatrix: No view found for project ' + projectId,
				this.#LOG_LEVEL,
			);
		}

		// Store
		this.#viewIdCurrent = projectId;
	}

	projectMenuOpen() {
		ApplicationLogger.log(
			'DirectableDotMatrix projectMenuOpen',
			this.#LOG_LEVEL,
		);

		const DELAY_PAGE_TRANSITION =
			DirectableDotMatrixConstants.getDelayPageTransition();

		// Stop Current View
		this.#stopCurrentView();

		// Show Project Menu View
		this.#getViewById('project-menu').start(DELAY_PAGE_TRANSITION);

		// Store
		this.#viewIdCurrent = 'project-menu';
	}

	projectMenuClose() {
		ApplicationLogger.log(
			'DirectableDotMatrix projectMenuShow',
			this.#LOG_LEVEL,
		);

		const DELAY_PAGE_TRANSITION =
			DirectableDotMatrixConstants.getDelayPageTransition();

		// Stop Current View
		this.#stopCurrentView();

		// Show Intro View
		this.#getViewById('intro').start(DELAY_PAGE_TRANSITION);

		// Store
		this.#viewIdCurrent = 'intro';
	}

	// ___________________________________________________________________ Reset

	// Set Size Requires a Reset - Redraw Current View

	setSize(width, height) {
		// Stop
		this.#getViewById(this.#viewIdCurrent).stop();

		// Reset Component Manager
		this.#COMPONENT_MANAGER.reset();

		// Reset Shape Manager
		this.#SHAPE_MANAGER.reset();

		// Reset Dot Manager
		this.#DOT_MANAGER.reset();
		this.#DOT_MANAGER.setSize(width, height);

		// Start Current View
		this.#getViewById(this.#viewIdCurrent).start(0);
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
