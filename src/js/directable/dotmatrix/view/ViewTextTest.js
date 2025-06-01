import ApplicationLogger from '../../../application/ApplicationLogger.js';

export default class ViewTextTest {
	#SHAPE_MANAGER;

	#LOG_LEVEL = 5;

	// _____________________________________________________________________

	ViewTextTest(shapeManager) {
		ApplicationLogger.log('ViewTest', this.#LOG_LEVEL);

		// Store
		this.#SHAPE_MANAGER = shapeManager;

		// TODO Add Text Glyphs

		// Alphabet
		// this.#SHAPE_MANAGER.AddShapeGlyph_A(
		// 	10,
		// 	10,
		// 	FillType.PassThrough,
		// 	FillStrategyType.Reverse,
		// );

		// this.#SHAPE_MANAGER.AddShapeGlyph_B(
		// 	15,
		// 	10,
		// 	FillType.PassThrough,
		// 	FillStrategyType.Random,
		// );

		// this.#SHAPE_MANAGER.AddShapeGlyph_C(
		// 	20,
		// 	10,
		// 	FillType.PassThrough,
		// 	FillStrategyType.PassThrough,
		// );

		// this.#SHAPE_MANAGER.AddShapeGlyph_D(
		// 	25,
		// 	10,
		// 	FillType.PassThrough,
		// 	FillStrategyType.PassThrough,
		// );

		// this.#SHAPE_MANAGER.AddShapeGlyph_E(
		// 	30,
		// 	10,
		// 	FillType.PassThrough,
		// 	FillStrategyType.PassThrough,
		// );

		// this.#SHAPE_MANAGER.AddShapeGlyph_F(
		// 	35,
		// 	10,
		// 	FillType.PassThrough,
		// 	FillStrategyType.PassThrough,
		// );

		// this.#SHAPE_MANAGER.AddShapeGlyph_G(
		// 	40,
		// 	10,
		// 	FillType.PassThrough,
		// 	FillStrategyType.PassThrough,
		// );

		// this.#SHAPE_MANAGER.AddShapeGlyph_H(
		// 	45,
		// 	10,
		// 	FillType.PassThrough,
		// 	FillStrategyType.PassThrough,
		// );

		// this.#SHAPE_MANAGER.AddShapeGlyph_I(
		// 	50,
		// 	10,
		// 	FillType.PassThrough,
		// 	FillStrategyType.PassThrough,
		// );

		// this.#SHAPE_MANAGER.AddShapeGlyph_J(
		// 	55,
		// 	10,
		// 	FillType.PassThrough,
		// 	FillStrategyType.PassThrough,
		// );

		// this.#SHAPE_MANAGER.AddShapeGlyph_K(
		// 	60,
		// 	10,
		// 	FillType.PassThrough,
		// 	FillStrategyType.PassThrough,
		// );

		// Numbers

		// Symbols
	}

	// ____________________________________________________________________ tick

	tick() {
		// Shape Manager
		this.#SHAPE_MANAGER.tick();
	}
}
