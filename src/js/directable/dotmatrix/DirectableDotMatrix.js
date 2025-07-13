import ApplicationLogger from '../../application/ApplicationLogger.js';

import DotManager from './dot/DotManager.js';
import ShapeManager from './shape/ShapeManager.js';
import ComponentManager from './component/ComponentManager.js';

import DotMatrixViewHeader from './view/header/DotMatrixViewHeader.js';
import DotMatrixViewIntro from './view/intro/DotMatrixViewIntro.js';
import DotMatrixViewProject from './view/project/DotMatrixViewProject.js';
import DotMatrixViewProjectMenu from './view/project/DotMatrixViewProjectMenu.js';
import DotMatrixViewTest from './view/test/DotMatrixViewTest.js';

import DirectableDotMatrixDelays from './DirectableDotMatrixDelays.js';
import DataController from '../../data/DataController.js';

export default class DirectableDotMatrix {
	#VIEW_IDS = Object.freeze({
		HEADER: 'header',
		INTRO: 'intro',
		PROJECT: 'project',
		PROJECT_MENU: 'project-menu',
		TEST: 'test',
	});

	#DOT_MANAGER;
	#SHAPE_MANAGER;
	#COMPONENT_MANAGER;

	#VIEW_HEADER;
	#VIEWS = [];

	#viewIdCurrent = this.#VIEW_IDS.INTRO;

	#LOG_LEVEL = 3;

	// Views create Components, which create Shapes, which create Dots

	// _________________________________________________________________________

	constructor(displayWidthPx, displayHeightPx) {
		ApplicationLogger.log(
			'DirectableDotMatrix ' + displayHeightPx + ' ' + displayHeightPx,
			this.#LOG_LEVEL,
		);

		// Get Project Data
		const PROJECT_DATA = DataController.getProjects();

		console.log('DirectableDotMatrix PROJECT_DATA', PROJECT_DATA);

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

		// Create Project Views
		for (let i = 0; i < PROJECT_DATA.length; i += 1) {
			const PROJECT = PROJECT_DATA[i];
			const PROJECT_ID = PROJECT.id;

			ApplicationLogger.log(
				'DirectableDotMatrix create project view ' + PROJECT_ID,
				this.#LOG_LEVEL,
			);
		}

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

		// Start Initial View
		this.#VIEW_HEADER.start();
		this.#getViewById(this.#viewIdCurrent).start();
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

		const DELAY_PAGE_TRANSITION =
			DirectableDotMatrixDelays.getDelayPageTransition();

		// Stop Current View
		this.#getViewById(this.#viewIdCurrent).stop();

		// Start Project View
		this.#getViewById(this.#VIEW_IDS.PROJECT).setProjectId(projectId);
		this.#getViewById(this.#VIEW_IDS.PROJECT).start(DELAY_PAGE_TRANSITION);

		// Store
		this.#viewIdCurrent = this.#VIEW_IDS.PROJECT;
	}

	setMenuActive() {
		ApplicationLogger.log('DirectableDotMatrix setMenuActive', this.#LOG_LEVEL);

		const DELAY_PAGE_TRANSITION =
			DirectableDotMatrixDelays.getDelayPageTransition();

		// Stop Current View
		this.#getViewById(this.#viewIdCurrent).stop();

		// Show Menu View
		this.#getViewById(this.#VIEW_IDS.MENU).start(DELAY_PAGE_TRANSITION);

		// Store
		this.#viewIdCurrent = this.#VIEW_IDS.MENU;
	}

	setMenuInactive() {
		ApplicationLogger.log(
			'DirectableDotMatrix setMenuInactive',
			this.#LOG_LEVEL,
		);

		const DELAY_PAGE_TRANSITION =
			DirectableDotMatrixDelays.getDelayPageTransition();

		// Stop Current View
		this.#getViewById(this.#viewIdCurrent).stop();

		// Show Intro View
		this.#getViewById(this.#VIEW_IDS.INTRO).start(DELAY_PAGE_TRANSITION);

		// Store
		this.#viewIdCurrent = this.#VIEW_IDS.INTRO;
	}

	// ___________________________________________________________________ Reset

	// Set Size Requires a Reset - Redraw Current View

	setSize(width, height) {
		// Stop
		this.#VIEW_HEADER.stop();
		this.#getViewById(this.#viewIdCurrent).stop();

		// Reset Component Manager
		this.#COMPONENT_MANAGER.reset();

		// Reset Shape Manager
		this.#SHAPE_MANAGER.reset();

		// Reset Dot Manager
		this.#DOT_MANAGER.reset();
		this.#DOT_MANAGER.setSize(width, height);

		// Start Current View
		this.#VIEW_HEADER.start();
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
