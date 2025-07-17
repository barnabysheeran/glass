import ApplicationLogger from '../../application/ApplicationLogger.js';

import DotManager from './dot/DotManager.js';
import ShapeManager from './shape/ShapeManager.js';
import ComponentManager from './component/ComponentManager.js';

import DotMatrixViewTest from './view/test/DotMatrixViewTest.js';

import DotMatrixViewHeader from './view/header/DotMatrixViewHeader.js';
import DotMatrixViewIntro from './view/intro/DotMatrixViewIntro.js';
import DotMatrixViewProjectMenu from './view/project/DotMatrixViewProjectMenu.js';

import DotMatrixViewBattleBuilder from './view/projects/DotMatrixViewBattleBuilder.js';
import DotMatrixViewGreenpeace from './view/projects/DotMatrixViewGreenpeace.js';

import DirectableDotMatrixDelays from './DirectableDotMatrixDelays.js';
import DataController from '../../data/DataController.js';

export default class DirectableDotMatrix {
	#DOT_MANAGER;
	#SHAPE_MANAGER;
	#COMPONENT_MANAGER;

	#VIEW_HEADER;
	#VIEWS = [];

	#viewIdCurrent = 'Test';

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
		);

		// Create Views
		this.#VIEWS.push(
			new DotMatrixViewIntro(this.#SHAPE_MANAGER, this.#COMPONENT_MANAGER),
		);

		this.#VIEWS.push(
			new DotMatrixViewProjectMenu(
				this.#SHAPE_MANAGER,
				this.#COMPONENT_MANAGER,
			),
		);

		// Create Project Views
		const PROJECT_VIEW_CLASSES = {
			BattleBuilder: DotMatrixViewBattleBuilder,
			Greenpeace: DotMatrixViewGreenpeace,
			// Add more project view classes as needed
		};

		for (let i = 0; i < PROJECT_DATA.length; i += 1) {
			const PROJECT = PROJECT_DATA[i];
			const PROJECT_ID = PROJECT.id;

			ApplicationLogger.log(
				'DirectableDotMatrix create project view ' + PROJECT_ID,
				this.#LOG_LEVEL,
			);

			// Get Project Class
			const ProjectViewClass = PROJECT_VIEW_CLASSES[PROJECT_ID];

			if (ProjectViewClass) {
				// Create Project View
				this.#VIEWS.push(
					new ProjectViewClass(this.#SHAPE_MANAGER, this.#COMPONENT_MANAGER),
				);
			} else {
				ApplicationLogger.log(
					'DirectableDotMatrix: No view class found for project ' + PROJECT_ID,
					this.#LOG_LEVEL,
				);
			}
		}

		this.#VIEWS.push(
			new DotMatrixViewTest(this.#SHAPE_MANAGER, this.#COMPONENT_MANAGER),
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

		// Tick Component Manager
		this.#COMPONENT_MANAGER.tick();

		// Get Active Component Total
		const ACTIVE_COMPONENT_TOTAL =
			this.#COMPONENT_MANAGER.getActiveComponentTotal();

		// Components Complete ?
		if (ACTIVE_COMPONENT_TOTAL === 0) {
			// View Draw Complete
			this.#getViewById(this.#viewIdCurrent).onDrawComplete();
		}
	}

	// ____________________________________________________________________ View

	projectShow(projectId) {
		ApplicationLogger.log(
			'DirectableDotMatrix projectShow ' + projectId,
			this.#LOG_LEVEL,
		);

		const DELAY_PAGE_TRANSITION =
			DirectableDotMatrixDelays.getDelayPageTransition();

		// Stop Any Active Components
		this.#COMPONENT_MANAGER.stopUnstartedShapes();

		// Stop Current View
		this.#getViewById(this.#viewIdCurrent).stop();

		// Start Project View
		// this.#getViewById(this.#VIEW_IDS.PROJECT).setProjectId(projectId);
		// this.#getViewById(this.#VIEW_IDS.PROJECT).start(DELAY_PAGE_TRANSITION);

		// Store
		// this.#viewIdCurrent = this.#VIEW_IDS.PROJECT;
	}

	projectMenuOpen() {
		ApplicationLogger.log(
			'DirectableDotMatrix projectMenuOpen',
			this.#LOG_LEVEL,
		);

		const DELAY_PAGE_TRANSITION =
			DirectableDotMatrixDelays.getDelayPageTransition();

		// Order Important

		// Stop Any Active Components
		this.#COMPONENT_MANAGER.stopUnstartedShapes();

		// Stop Current View
		this.#getViewById(this.#viewIdCurrent).stop();

		// Show Menu View
		// this.#getViewById(this.#VIEW_IDS.PROJECT_MENU).start(DELAY_PAGE_TRANSITION);

		// Store
		// this.#viewIdCurrent = this.#VIEW_IDS.PROJECT_MENU;
	}

	projectMenuClose() {
		ApplicationLogger.log(
			'DirectableDotMatrix projectMenuShow',
			this.#LOG_LEVEL,
		);

		const DELAY_PAGE_TRANSITION =
			DirectableDotMatrixDelays.getDelayPageTransition();

		// Stop Any Active Components
		this.#COMPONENT_MANAGER.stopUnstartedShapes();

		// Stop Current View
		this.#getViewById(this.#viewIdCurrent).stop();

		// Show Intro View
		// this.#getViewById(this.#VIEW_IDS.INTRO).start(DELAY_PAGE_TRANSITION);

		// Store
		// this.#viewIdCurrent = this.#VIEW_IDS.INTRO;
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
