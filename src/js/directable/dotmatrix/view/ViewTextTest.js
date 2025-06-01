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

		// Second Row of Letters

		this.#SHAPE_MANAGER.addShapeGlyph_L(
			10,
			27,
			FillType.PassThrough,
			FillStrategyType.PassThrough,
		);

		this.#SHAPE_MANAGER.addShapeGlyph_M(
			15,
			27,
			FillType.PassThrough,
			FillStrategyType.PassThrough,
		);

		this.#SHAPE_MANAGER.addShapeGlyph_N(
			20,
			27,
			FillType.PassThrough,
			FillStrategyType.PassThrough,
		);

		this.#SHAPE_MANAGER.addShapeGlyph_O(
			25,
			27,
			FillType.PassThrough,
			FillStrategyType.PassThrough,
		);

		this.#SHAPE_MANAGER.addShapeGlyph_P(
			30,
			27,
			FillType.PassThrough,
			FillStrategyType.PassThrough,
		);

		this.#SHAPE_MANAGER.addShapeGlyph_Q(
			35,
			27,
			FillType.PassThrough,
			FillStrategyType.PassThrough,
		);

		this.#SHAPE_MANAGER.addShapeGlyph_R(
			40,
			27,
			FillType.PassThrough,
			FillStrategyType.PassThrough,
		);

		this.#SHAPE_MANAGER.addShapeGlyph_S(
			45,
			27,
			FillType.PassThrough,
			FillStrategyType.PassThrough,
		);

		this.#SHAPE_MANAGER.addShapeGlyph_T(
			50,
			27,
			FillType.PassThrough,
			FillStrategyType.PassThrough,
		);

		this.#SHAPE_MANAGER.addShapeGlyph_U(
			55,
			27,
			FillType.PassThrough,
			FillStrategyType.PassThrough,
		);

		// Third Row of Letters

		this.#SHAPE_MANAGER.addShapeGlyph_V(
			10,
			33,
			FillType.PassThrough,
			FillStrategyType.PassThrough,
		);

		this.#SHAPE_MANAGER.addShapeGlyph_W(
			15,
			33,
			FillType.PassThrough,
			FillStrategyType.PassThrough,
		);

		this.#SHAPE_MANAGER.addShapeGlyph_X(
			20,
			33,
			FillType.PassThrough,
			FillStrategyType.PassThrough,
		);

		this.#SHAPE_MANAGER.addShapeGlyph_Y(
			25,
			33,
			FillType.PassThrough,
			FillStrategyType.PassThrough,
		);

		this.#SHAPE_MANAGER.addShapeGlyph_Z(
			30,
			33,
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
