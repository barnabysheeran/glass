import ApplicationLogger from '../../../application/ApplicationLogger.js';

import FillType from './fill/FillType.js';
import FillStrategyType from './fill/FillStrategyType.js';

import ShapeLineHorizontal from './line/ShapeLineHorizontal.js';
import ShapeLineVertical from './line/ShapeLineVertical.js';

import ShapeRectangle from './primative/ShapeRectangle.js';

export default class ShapeManager {
	#DOT_MANAGER;

	#SHAPES = [];
	#SHAPE_MAX = 100;

	#LOG_LEVEL = 5;

	// _________________________________________________________________________

	constructor(dotManager) {
		ApplicationLogger.log('ShapeManager', this.#LOG_LEVEL);

		// Store
		this.#DOT_MANAGER = dotManager;
	}

	// __________________________________________________________________ Update

	tick() {
		ApplicationLogger.log('ShapeManager tick');

		// Update All Shapes
		for (let i = 0; i < this.#SHAPES.length; i += 1) {
			this.#SHAPES[i].tick();
		}
	}

	// ____________________________________________________________________ List

	#ensureSpaceInList() {
		ApplicationLogger.log('ShapeManager ensureSpaceInList');

		// Ensure Space in List Removing Oldest
		while (this.#SHAPES.length >= this.#SHAPE_MAX) {
			// TODO End Shape At 0 ?
			this.#SHAPES.shift();
		}
	}

	// _________________________________________________________ Line Horizontal

	addShapeLineHorizontal(
		gridX,
		gridY,
		length,
		fillType = FillType.PassThrough,
		fillStrategyType = FillStrategyType.PassThrough,
	) {
		ApplicationLogger.log(
			`ShapeManager addShapeLineHorizontal`,
			this.#LOG_LEVEL,
		);

		// Ensure Space in List
		this.#ensureSpaceInList();

		// Create Shape
		const shape = new ShapeLineHorizontal(
			this.#DOT_MANAGER,
			gridX,
			gridY,
			length,
			fillType,
			fillStrategyType,
		);

		// Store
		this.#SHAPES.push(shape);

		// Return
		return shape;
	}

	// ___________________________________________________________ Line Vertical

	addShapeLineVertical(
		gridX,
		gridY,
		length,
		fillType = FillType.PassThrough,
		fillStrategyType = FillStrategyType.PassThrough,
	) {
		ApplicationLogger.log(`ShapeManager addShapeLineVertical`, this.#LOG_LEVEL);

		// Ensure Space in List
		this.#ensureSpaceInList();

		// Create Shape
		const shape = new ShapeLineVertical(
			this.#DOT_MANAGER,
			gridX,
			gridY,
			length,
			fillType,
			fillStrategyType,
		);

		// Add
		this.#SHAPES.push(shape);

		// Return
		return shape;
	}

	// _______________________________________________________________ Rectangle

	addShapeRectangle(
		gridX,
		gridY,
		gridWidth,
		gridHeight,
		fillType = FillType.PassThrough,
		fillStrategyType = FillStrategyType.PassThrough,
	) {
		// Ensure Space in List
		this.#ensureSpaceInList();

		// Create Shape
		const shape = new ShapeRectangle(
			this.#DOT_MANAGER,
			gridX,
			gridY,
			gridWidth,
			gridHeight,
			fillType,
			fillStrategyType,
		);

		// Add
		this.#SHAPES.push(shape);

		// Return
		return shape;
	}

	// _________________________________________________________________ Glyph_A

	// Shape AddShapeGlyph_A(int gridX, int gridY,
	//                              FillType fillType = FillType.PassThrough,
	//                              FillStrategyType fillStrategyType = FillStrategyType.PassThrough)
	// {
	//     EnsureSpaceInList();

	//     // Create Shape
	//     ShapeGlyph_A shape = new ShapeGlyph_A(#dotManager,
	//         gridX, gridY,
	//         fillType,
	//         fillStrategyType);

	//     // Add
	//     #shapes.Add(shape);

	//     // Return
	//     return shape;
	// }

	// _________________________________________________________________ Glyph_B

	// Shape AddShapeGlyph_B(int gridX, int gridY,
	//                              FillType fillType = FillType.PassThrough,
	//                              FillStrategyType fillStrategyType = FillStrategyType.PassThrough)
	// {
	//     EnsureSpaceInList();

	//     // Create Shape
	//     ShapeGlyph_B shape = new ShapeGlyph_B(#dotManager,
	//         gridX, gridY,
	//         fillType,
	//         fillStrategyType);

	//     // Add
	//     #shapes.Add(shape);

	//     // Return
	//     return shape;
	// }

	// _________________________________________________________________ Glyph_C

	// Shape AddShapeGlyph_C(int gridX, int gridY,
	//                              FillType fillType = FillType.PassThrough,
	//                              FillStrategyType fillStrategyType = FillStrategyType.PassThrough)
	// {
	//     EnsureSpaceInList();

	//     // Create Shape
	//     ShapeGlyph_C shape = new ShapeGlyph_C(#dotManager,
	//         gridX, gridY,
	//         fillType,
	//         fillStrategyType);

	//     // Add
	//     #shapes.Add(shape);

	//     // Return
	//     return shape;
	// }

	// _________________________________________________________________ Glyph_D

	// Shape AddShapeGlyph_D(int gridX, int gridY,
	//                              FillType fillType = FillType.PassThrough,
	//                              FillStrategyType fillStrategyType = FillStrategyType.PassThrough)
	// {
	//     EnsureSpaceInList();

	//     // Create Shape
	//     ShapeGlyph_D shape = new ShapeGlyph_D(#dotManager,
	//         gridX, gridY,
	//         fillType,
	//         fillStrategyType);

	//     // Add
	//     #shapes.Add(shape);

	//     // Return
	//     return shape;
	// }

	// _________________________________________________________________ Glyph_E

	// Shape AddShapeGlyph_E(int gridX, int gridY,
	//                              FillType fillType = FillType.PassThrough,
	//                              FillStrategyType fillStrategyType = FillStrategyType.PassThrough)
	// {
	//     EnsureSpaceInList();

	//     // Create Shape
	//     ShapeGlyph_E shape = new ShapeGlyph_E(#dotManager,
	//         gridX, gridY,
	//         fillType,
	//         fillStrategyType);

	//     // Add
	//     #shapes.Add(shape);

	//     // Return
	//     return shape;
	// }

	// _________________________________________________________________ Glyph_F

	// Shape AddShapeGlyph_F(int gridX, int gridY,
	//                              FillType fillType = FillType.PassThrough,
	//                              FillStrategyType fillStrategyType = FillStrategyType.PassThrough)
	// {
	//     EnsureSpaceInList();

	//     // Create Shape
	//     ShapeGlyph_F shape = new ShapeGlyph_F(#dotManager,
	//         gridX, gridY,
	//         fillType,
	//         fillStrategyType);

	//     // Add
	//     #shapes.Add(shape);

	//     // Return
	//     return shape;
	// }

	// _________________________________________________________________ Glyph_G

	// Shape AddShapeGlyph_G(int gridX, int gridY,
	//                              FillType fillType = FillType.PassThrough,
	//                              FillStrategyType fillStrategyType = FillStrategyType.PassThrough)
	// {
	//     EnsureSpaceInList();

	//     // Create Shape
	//     ShapeGlyph_G shape = new ShapeGlyph_G(#dotManager,
	//         gridX, gridY,
	//         fillType,
	//         fillStrategyType);

	//     // Add
	//     #shapes.Add(shape);

	//     // Return
	//     return shape;
	// }

	// _________________________________________________________________ Glyph_H

	// Shape AddShapeGlyph_H(int gridX, int gridY,
	//                              FillType fillType = FillType.PassThrough,
	//                              FillStrategyType fillStrategyType = FillStrategyType.PassThrough)
	// {
	//     EnsureSpaceInList();

	//     // Create Shape
	//     ShapeGlyph_H shape = new ShapeGlyph_H(#dotManager,
	//         gridX, gridY,
	//         fillType,
	//         fillStrategyType);

	//     // Add
	//     #shapes.Add(shape);

	//     // Return
	//     return shape;
	// }

	// _________________________________________________________________ Glyph_I

	// Shape AddShapeGlyph_I(int gridX, int gridY,
	//                              FillType fillType = FillType.PassThrough,
	//                              FillStrategyType fillStrategyType = FillStrategyType.PassThrough)
	// {
	//     EnsureSpaceInList();

	//     // Create Shape
	//     ShapeGlyph_I shape = new ShapeGlyph_I(#dotManager,
	//         gridX, gridY,
	//         fillType,
	//         fillStrategyType);

	//     // Add
	//     #shapes.Add(shape);

	//     // Return
	//     return shape;
	// }

	// _________________________________________________________________ Glyph_J

	// Shape AddShapeGlyph_J(int gridX, int gridY,
	//                              FillType fillType = FillType.PassThrough,
	//                              FillStrategyType fillStrategyType = FillStrategyType.PassThrough)
	// {
	//     EnsureSpaceInList();

	//     // Create Shape
	//     ShapeGlyph_J shape = new ShapeGlyph_J(#dotManager,
	//         gridX, gridY,
	//         fillType,
	//         fillStrategyType);

	//     // Add
	//     #shapes.Add(shape);

	//     // Return
	//     return shape;
	// }

	// _________________________________________________________________ Glyph_K

	// Shape AddShapeGlyph_K(int gridX, int gridY,
	//                              FillType fillType = FillType.PassThrough,
	//                              FillStrategyType fillStrategyType = FillStrategyType.PassThrough)
	// {
	//     EnsureSpaceInList();

	//     // Create Shape
	//     ShapeGlyph_K shape = new ShapeGlyph_K(#dotManager,
	//         gridX, gridY,
	//         fillType,
	//         fillStrategyType);

	//     // Add
	//     #shapes.Add(shape);

	//     // Return
	//     return shape;
	// }
}
