import ApplicationLogger from '../../application/ApplicationLogger.js';

import DotManager from './dot/DotManager.js';
import ShapeManager from './shape/ShapeManager.js';
import ComponentManager from './component/ComponentManager.js';

import DotMatrixViewHeader from './view/view/DotMatrixViewHeader.js';
import DotMatrixViewProjectMenu from './view/view/DotMatrixViewProjectMenu.js';
import DotMatrixViewProject from './view/view/DotMatrixViewProject.js';
import DotMatrixViewIntro from './view/view/DotMatrixViewIntro.js';
import DotMatrixViewTest from './view/view/DotMatrixViewTest.js';
import DotMatrixViewHolding from './view/view/DotMatrixViewHolding.js';

export default class DirectableDotMatrix {
	#VIEW_IDS = Object.freeze({
		TEST: 'test',
		HOLDING: 'holding',
		HEADER: 'header',
		INTRO: 'intro',
		MENU: 'menu',
		PROJECT: 'project',
	});

	#DOT_MANAGER;
	#SHAPE_MANAGER;
	#COMPONENT_MANAGER;

	#VIEW_HEADER;
	#VIEWS = [];

	#viewIdCurrent = this.#VIEW_IDS.TEST;

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

		// Create View Header
		this.#VIEW_HEADER = new DotMatrixViewHeader(
			this.#SHAPE_MANAGER,
			this.#COMPONENT_MANAGER,
			this.#VIEW_IDS.HEADER,
		);

		// Create Views
		this.#VIEWS.push(
			new DotMatrixViewIntro(
				this.#SHAPE_MANAGER,
				this.#COMPONENT_MANAGER,
				this.#VIEW_IDS.INTRO,
			),
		);

		this.#VIEWS.push(
			new DotMatrixViewProjectMenu(
				this.#SHAPE_MANAGER,
				this.#COMPONENT_MANAGER,
				this.#VIEW_IDS.MENU,
			),
		);

		this.#VIEWS.push(
			new DotMatrixViewProject(
				this.#SHAPE_MANAGER,
				this.#COMPONENT_MANAGER,
				this.#VIEW_IDS.PROJECT,
			),
		);

		this.#VIEWS.push(
			new DotMatrixViewTest(
				this.#SHAPE_MANAGER,
				this.#COMPONENT_MANAGER,
				this.#VIEW_IDS.TEST,
			),
		);

		this.#VIEWS.push(
			new DotMatrixViewHolding(
				this.#SHAPE_MANAGER,
				this.#COMPONENT_MANAGER,
				this.#VIEW_IDS.HOLDING,
			),
		);

		// Start Initial View
		this.#VIEW_HEADER.draw();
		this.#getViewById(this.#viewIdCurrent).draw();
	}

	// Getter for view IDs
	getViewIds() {
		return this.#VIEW_IDS;
	}

	// ____________________________________________________________________ Tick

	tick(frameDeltaMS) {
		// Tick Views
		for (let i = 0; i < this.#VIEWS.length; i += 1) {
			this.#VIEWS[i].tick(frameDeltaMS);
		}

		// Component Manager
		this.#COMPONENT_MANAGER.tick();
	}

	// ____________________________________________________________________ View

	showProject(projectId) {
		ApplicationLogger.log(
			'DirectableDotMatrix showProject ' + projectId,
			this.#LOG_LEVEL,
		);

		// Undraw Current View
		this.#getViewById(this.#viewIdCurrent).undraw();

		// Draw Project View
		this.#getViewById(this.#VIEW_IDS.PROJECT).setProjectId(projectId);
		this.#getViewById(this.#VIEW_IDS.PROJECT).draw();

		// Store
		this.#viewIdCurrent = this.#VIEW_IDS.PROJECT;
	}

	setMenuActive() {
		ApplicationLogger.log('DirectableDotMatrix setMenuActive', this.#LOG_LEVEL);

		// Show Menu View
		this.#getViewById(this.#VIEW_IDS.MENU).draw();

		// Store
		this.#viewIdCurrent = this.#VIEW_IDS.MENU;
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
		this.#getViewById(this.#VIEW_IDS.INTRO).draw();

		this.#viewIdCurrent = this.#VIEW_IDS.INTRO;
	}

	// ___________________________________________________________________ Reset

	setSize(width, height) {
		// Reset Views
		for (let i = 0; i < this.#VIEWS.length; i += 1) {
			this.#VIEWS[i].reset();
		}

		// Reset Component Manager
		this.#COMPONENT_MANAGER.reset();

		// Reset Shape Manager
		this.#SHAPE_MANAGER.reset();

		// Reset Dot Manager
		this.#DOT_MANAGER.reset();
		this.#DOT_MANAGER.setSize(width, height);

		// Start Current View
		this.#VIEW_HEADER.start();
		this.#getViewById(this.#viewIdCurrent).draw();
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
