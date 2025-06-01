import ApplicationLogger from '../../../application/ApplicationLogger.js';

import FillType from '../shape/fill/FillType.js';
import FillStrategyType from '../shape/fill/FillStrategyType.js';

export default class ViewTextTest {
	#SHAPE_MANAGER;

	#LOG_LEVEL = 5;

	// _________________________________________________________________________

	constructor(shapeManager) {
		ApplicationLogger.log('ViewTest', this.#LOG_LEVEL);

		// Store
		this.#SHAPE_MANAGER = shapeManager;

		// Alphabet
		this.#SHAPE_MANAGER.addShapeGlyph_A(
			10,
			21,
			FillType.PassThrough,
			FillStrategyType.Reverse,
		);

		this.#SHAPE_MANAGER.addShapeGlyph_B(
			15,
			21,
			FillType.PassThrough,
			FillStrategyType.Random,
		);

		this.#SHAPE_MANAGER.addShapeGlyph_C(
			20,
			21,
			FillType.PassThrough,
			FillStrategyType.PassThrough,
		);

		this.#SHAPE_MANAGER.addShapeGlyph_D(
			25,
			21,
			FillType.PassThrough,
			FillStrategyType.PassThrough,
		);

		this.#SHAPE_MANAGER.addShapeGlyph_E(
			30,
			21,
			FillType.PassThrough,
			FillStrategyType.PassThrough,
		);

		this.#SHAPE_MANAGER.addShapeGlyph_F(
			35,
			21,
			FillType.PassThrough,
			FillStrategyType.PassThrough,
		);

		this.#SHAPE_MANAGER.addShapeGlyph_G(
			40,
			21,
			FillType.PassThrough,
			FillStrategyType.PassThrough,
		);

		this.#SHAPE_MANAGER.addShapeGlyph_H(
			45,
			21,
			FillType.PassThrough,
			FillStrategyType.PassThrough,
		);

		this.#SHAPE_MANAGER.addShapeGlyph_I(
			50,
			21,
			FillType.PassThrough,
			FillStrategyType.PassThrough,
		);

		this.#SHAPE_MANAGER.addShapeGlyph_J(
			52,
			21,
			FillType.PassThrough,
			FillStrategyType.PassThrough,
		);

		this.#SHAPE_MANAGER.addShapeGlyph_K(
			57,
			21,
			FillType.PassThrough,
			FillStrategyType.PassThrough,
		);

		// Numbers

		// Symbols
	}

	// ____________________________________________________________________ tick

	tick() {
		// Shape Manager
		this.#SHAPE_MANAGER.tick();
	}
}
