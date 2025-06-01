import ApplicationLogger from '../../../application/ApplicationLogger.js';

import FillType from './fill/FillType.js';
import FillStrategyType from './fill/FillStrategyType.js';

import ShapeLineHorizontal from './line/ShapeLineHorizontal.js';
import ShapeLineVertical from './line/ShapeLineVertical.js';

import ShapeRectangle from './primative/ShapeRectangle.js';

// Import Glyph Shapes
import ShapeGlyph_A from './glyph/ShapeGlyph_A.js';
import ShapeGlyph_B from './glyph/ShapeGlyph_B.js';
import ShapeGlyph_C from './glyph/ShapeGlyph_C.js';
import ShapeGlyph_D from './glyph/ShapeGlyph_D.js';
import ShapeGlyph_E from './glyph/ShapeGlyph_E.js';
import ShapeGlyph_F from './glyph/ShapeGlyph_F.js';
import ShapeGlyph_G from './glyph/ShapeGlyph_G.js';
import ShapeGlyph_H from './glyph/ShapeGlyph_H.js';
import ShapeGlyph_I from './glyph/ShapeGlyph_I.js';
import ShapeGlyph_J from './glyph/ShapeGlyph_J.js';
import ShapeGlyph_K from './glyph/ShapeGlyph_K.js';

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

	addShapeGlyph_A(
		gridX,
		gridY,
		fillType = FillType.PassThrough,
		fillStrategyType = FillStrategyType.PassThrough,
	) {
		ApplicationLogger.log(`ShapeManager addShapeGlyph_A`, this.#LOG_LEVEL);

		// Ensure Space in List
		this.#ensureSpaceInList();

		// Create Shape
		const shape = new ShapeGlyph_A(
			this.#DOT_MANAGER,
			gridX,
			gridY,
			fillType,
			fillStrategyType,
		);

		// Add
		this.#SHAPES.push(shape);

		// Return
		return shape;
	}

	// _________________________________________________________________ Glyph_B

	addShapeGlyph_B(
		gridX,
		gridY,
		fillType = FillType.PassThrough,
		fillStrategyType = FillStrategyType.PassThrough,
	) {
		ApplicationLogger.log(`ShapeManager addShapeGlyph_B`, this.#LOG_LEVEL);

		// Ensure Space in List
		this.#ensureSpaceInList();

		// Create Shape
		const shape = new ShapeGlyph_B(
			this.#DOT_MANAGER,
			gridX,
			gridY,
			fillType,
			fillStrategyType,
		);

		// Add
		this.#SHAPES.push(shape);

		// Return
		return shape;
	}

	// _________________________________________________________________ Glyph_C

	addShapeGlyph_C(
		gridX,
		gridY,
		fillType = FillType.PassThrough,
		fillStrategyType = FillStrategyType.PassThrough,
	) {
		ApplicationLogger.log(`ShapeManager addShapeGlyph_C`, this.#LOG_LEVEL);

		// Ensure Space in List
		this.#ensureSpaceInList();

		// Create Shape
		const shape = new ShapeGlyph_C(
			this.#DOT_MANAGER,
			gridX,
			gridY,
			fillType,
			fillStrategyType,
		);

		// Add
		this.#SHAPES.push(shape);

		// Return
		return shape;
	}

	// _________________________________________________________________ Glyph_D

	addShapeGlyph_D(
		gridX,
		gridY,
		fillType = FillType.PassThrough,
		fillStrategyType = FillStrategyType.PassThrough,
	) {
		ApplicationLogger.log(`ShapeManager addShapeGlyph_D`, this.#LOG_LEVEL);

		// Ensure Space in List
		this.#ensureSpaceInList();

		// Create Shape
		const shape = new ShapeGlyph_D(
			this.#DOT_MANAGER,
			gridX,
			gridY,
			fillType,
			fillStrategyType,
		);

		// Add
		this.#SHAPES.push(shape);

		// Return
		return shape;
	}

	// _________________________________________________________________ Glyph_E

	addShapeGlyph_E(
		gridX,
		gridY,
		fillType = FillType.PassThrough,
		fillStrategyType = FillStrategyType.PassThrough,
	) {
		ApplicationLogger.log(`ShapeManager addShapeGlyph_E`, this.#LOG_LEVEL);

		// Ensure Space in List
		this.#ensureSpaceInList();

		// Create Shape
		const shape = new ShapeGlyph_E(
			this.#DOT_MANAGER,
			gridX,
			gridY,
			fillType,
			fillStrategyType,
		);

		// Add
		this.#SHAPES.push(shape);

		// Return
		return shape;
	}

	// _________________________________________________________________ Glyph_F

	addShapeGlyph_F(
		gridX,
		gridY,
		fillType = FillType.PassThrough,
		fillStrategyType = FillStrategyType.PassThrough,
	) {
		ApplicationLogger.log(`ShapeManager addShapeGlyph_F`, this.#LOG_LEVEL);

		// Ensure Space in List
		this.#ensureSpaceInList();

		// Create Shape
		const shape = new ShapeGlyph_F(
			this.#DOT_MANAGER,
			gridX,
			gridY,
			fillType,
			fillStrategyType,
		);

		// Add
		this.#SHAPES.push(shape);

		// Return
		return shape;
	}

	// _________________________________________________________________ Glyph_G

	addShapeGlyph_G(
		gridX,
		gridY,
		fillType = FillType.PassThrough,
		fillStrategyType = FillStrategyType.PassThrough,
	) {
		ApplicationLogger.log(`ShapeManager addShapeGlyph_G`, this.#LOG_LEVEL);

		// Ensure Space in List
		this.#ensureSpaceInList();

		// Create Shape
		const shape = new ShapeGlyph_G(
			this.#DOT_MANAGER,
			gridX,
			gridY,
			fillType,
			fillStrategyType,
		);

		// Add
		this.#SHAPES.push(shape);

		// Return
		return shape;
	}

	// _________________________________________________________________ Glyph_H

	addShapeGlyph_H(
		gridX,
		gridY,
		fillType = FillType.PassThrough,
		fillStrategyType = FillStrategyType.PassThrough,
	) {
		ApplicationLogger.log(`ShapeManager addShapeGlyph_H`, this.#LOG_LEVEL);

		// Ensure Space in List
		this.#ensureSpaceInList();

		// Create Shape
		const shape = new ShapeGlyph_H(
			this.#DOT_MANAGER,
			gridX,
			gridY,
			fillType,
			fillStrategyType,
		);

		// Add
		this.#SHAPES.push(shape);

		// Return
		return shape;
	}

	// _________________________________________________________________ Glyph_I

	addShapeGlyph_I(
		gridX,
		gridY,
		fillType = FillType.PassThrough,
		fillStrategyType = FillStrategyType.PassThrough,
	) {
		ApplicationLogger.log(`ShapeManager addShapeGlyph_I`, this.#LOG_LEVEL);

		// Ensure Space in List
		this.#ensureSpaceInList();

		// Create Shape
		const shape = new ShapeGlyph_I(
			this.#DOT_MANAGER,
			gridX,
			gridY,
			fillType,
			fillStrategyType,
		);

		// Add
		this.#SHAPES.push(shape);

		// Return
		return shape;
	}

	// _________________________________________________________________ Glyph_J

	addShapeGlyph_J(
		gridX,
		gridY,
		fillType = FillType.PassThrough,
		fillStrategyType = FillStrategyType.PassThrough,
	) {
		ApplicationLogger.log(`ShapeManager addShapeGlyph_J`, this.#LOG_LEVEL);

		// Ensure Space in List
		this.#ensureSpaceInList();

		// Create Shape
		const shape = new ShapeGlyph_J(
			this.#DOT_MANAGER,
			gridX,
			gridY,
			fillType,
			fillStrategyType,
		);

		// Add
		this.#SHAPES.push(shape);

		// Return
		return shape;
	}

	// _________________________________________________________________ Glyph_K

	addShapeGlyph_K(
		gridX,
		gridY,
		fillType = FillType.PassThrough,
		fillStrategyType = FillStrategyType.PassThrough,
	) {
		ApplicationLogger.log(`ShapeManager addShapeGlyph_K`, this.#LOG_LEVEL);

		// Ensure Space in List
		this.#ensureSpaceInList();

		// Create Shape
		const shape = new ShapeGlyph_K(
			this.#DOT_MANAGER,
			gridX,
			gridY,
			fillType,
			fillStrategyType,
		);

		// Add
		this.#SHAPES.push(shape);

		// Return
		return shape;
	}
}
