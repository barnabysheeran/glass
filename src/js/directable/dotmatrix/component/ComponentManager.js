import ApplicationLogger from '../../../application/ApplicationLogger.js';

import FillType from '../shape/fill/FillType.js';
import FillStrategyType from '../shape/fill/FillStrategyType.js';

import ComponentLineWidthFull from './line/ComponentLineWidthFull.js';
import ComponentTextBox from './text/ComponentTextBox.js';

export default class ComponentManager {
	#SHAPE_MANAGER;

	#COMPONENTS = [];

	#LOG_LEVEL = 4;

	// _________________________________________________________________________

	constructor(shapeManager) {
		ApplicationLogger.log('ComponentManager', this.#LOG_LEVEL);

		// Store
		this.#SHAPE_MANAGER = shapeManager;
	}

	// __________________________________________________________________ Redraw

	redraw() {
		// Redraw Components
		for (let i = 0; i < this.#COMPONENTS.length; i += 1) {
			this.#COMPONENTS[i].redraw();
		}
	}

	// _________________________________________________________ Line Width Full

	addComponentLineWidthFull(
		gridY,
		fillType = FillType.PassThrough,
		fillStrategyType = FillStrategyType.PassThrough,
		delay,
	) {
		// Create Component
		const COMPONENT_LINE_WIDTH_FULL = new ComponentLineWidthFull(
			this.#SHAPE_MANAGER,
			gridY,
			fillType,
			fillStrategyType,
			delay,
		);

		// Store
		this.#COMPONENTS.push(COMPONENT_LINE_WIDTH_FULL);
	}

	// ________________________________________________________________ Text Box

	addComponentTextBox(
		text,
		gridX,
		gridY,
		gridWidth,
		gridHeight,
		fillType = FillType.PassThrough,
		fillStrategyType = FillStrategyType.PassThrough,
		delay,
	) {
		// Create Component
		const COMPONENT_TEXT_BOX = new ComponentTextBox(
			this.#SHAPE_MANAGER,
			text,
			gridX,
			gridY,
			gridWidth,
			gridHeight,
			fillType,
			fillStrategyType,
			delay,
		);

		// Store
		this.#COMPONENTS.push(COMPONENT_TEXT_BOX);
	}
}
