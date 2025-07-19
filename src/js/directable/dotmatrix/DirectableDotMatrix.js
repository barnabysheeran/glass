import ApplicationLogger from '../../application/ApplicationLogger.js';

import DotManager from './dot/DotManager.js';
import ShapeManager from './shape/ShapeManager.js';
import ComponentManager from './component/ComponentManager.js';

import DotMatrixViewTest from './view/test/DotMatrixViewTest.js';

import DotMatrixViewHeader from './view/header/DotMatrixViewHeader.js';
import DotMatrixViewIntro from './view/intro/DotMatrixViewIntro.js';
import DotMatrixViewProjectMenu from './view/project/DotMatrixViewProjectMenu.js';

import DotMatrixViewProject_battlebuilder from './view/projects/DotMatrixViewProject_battlebuilder.js';
import DotMatrixViewProject_greenpeace from './view/projects/DotMatrixViewProject_greenpeace.js';
import DotMatrixViewProject_postmatter from './view/projects/DotMatrixViewProject_postmatter.js';

import DirectableDotMatrixDelays from './DirectableDotMatrixDelays.js';
import DataController from '../../data/DataController.js';

export default class DirectableDotMatrix {
	#DOT_MANAGER;
	#SHAPE_MANAGER;
	#COMPONENT_MANAGER;

	#VIEW_HEADER;
	#VIEWS = [];

	#viewIdCurrent = 'intro';

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
			'header',
		);

		// Create View Intro
		this.#VIEWS.push(
			new DotMatrixViewIntro(
				this.#SHAPE_MANAGER,
				this.#COMPONENT_MANAGER,
				'intro',
			),
		);

		// Create View Project Menu
		this.#VIEWS.push(
			new DotMatrixViewProjectMenu(
				this.#SHAPE_MANAGER,
				this.#COMPONENT_MANAGER,
				'project-menu',
			),
		);

		// Create Project Views
		const projectViewClasses = new Map([
			['battlebuilder', DotMatrixViewProject_battlebuilder],
			['greenpeace', DotMatrixViewProject_greenpeace],
			['postmatter', DotMatrixViewProject_postmatter],
		]);

		PROJECT_DATA.forEach((project) => {
			const ProjectViewClass = projectViewClasses.get(project.id);

			if (ProjectViewClass) {
				ApplicationLogger.log(
					`DirectableDotMatrix - Creating Project View '${project.id}'`,
					this.#LOG_LEVEL,
				);

				this.#VIEWS.push(
					new ProjectViewClass(
						this.#SHAPE_MANAGER,
						this.#COMPONENT_MANAGER,
						project.id,
					),
				);
			} else {
				ApplicationLogger.warn(
					`DirectableDotMatrix - No View Found for Project '${project.id}'`,
					this.#LOG_LEVEL,
				);
			}
		});

		// Create Test View
		this.#VIEWS.push(
			new DotMatrixViewTest(
				this.#SHAPE_MANAGER,
				this.#COMPONENT_MANAGER,
				'test',
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

		// Tick Component Manager
		this.#COMPONENT_MANAGER.tick();

		// Get Active Component Total
		const ACTIVE_COMPONENT_TOTAL =
			this.#COMPONENT_MANAGER.getActiveComponentTotal();

		// Components Complete ?
		// if (ACTIVE_COMPONENT_TOTAL === 0) {
		// 	// View Draw Complete
		// 	this.#getViewById(this.#viewIdCurrent).onDrawComplete();
		// }
	}

	// ____________________________________________________________________ View

	projectShow(projectId) {
		ApplicationLogger.log(
			'DirectableDotMatrix projectShow ' + projectId,
			this.#LOG_LEVEL,
		);

		const DELAY_PAGE_TRANSITION =
			DirectableDotMatrixDelays.getDelayPageTransition();

		// Order Important

		// Stop Any Active Components
		this.#COMPONENT_MANAGER.stopUnstartedShapes();

		// Stop Current View
		this.#getViewById(this.#viewIdCurrent).stop();

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
			DirectableDotMatrixDelays.getDelayPageTransition();

		// Order Important

		// Stop Any Active Components
		this.#COMPONENT_MANAGER.stopUnstartedShapes();

		// Stop Current View
		this.#getViewById(this.#viewIdCurrent).stop();

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

		// Order Important

		const DELAY_PAGE_TRANSITION =
			DirectableDotMatrixDelays.getDelayPageTransition();

		// Stop Any Active Components
		this.#COMPONENT_MANAGER.stopUnstartedShapes();

		// Stop Current View
		this.#getViewById(this.#viewIdCurrent).stop();

		// Show Intro View
		this.#getViewById('intro').start(DELAY_PAGE_TRANSITION);

		// Store
		this.#viewIdCurrent = 'intro';
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
