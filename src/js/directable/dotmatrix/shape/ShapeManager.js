import ApplicationLogger from '../../../application/ApplicationLogger.js';

import FillType from './fill/FillType.js';
import FillStrategyType from './fill/FillStrategyType.js';

import ShapeLineHorizontal from './line/ShapeLineHorizontal.js';
import ShapeLineVertical from './line/ShapeLineVertical.js';

import ShapeRectangle from './primative/ShapeRectangle.js';

// Import Glyph Shapes - Letters
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
import ShapeGlyph_L from './glyph/ShapeGlyph_L.js';
import ShapeGlyph_M from './glyph/ShapeGlyph_M.js';
import ShapeGlyph_N from './glyph/ShapeGlyph_N.js';
import ShapeGlyph_O from './glyph/ShapeGlyph_O.js';
import ShapeGlyph_P from './glyph/ShapeGlyph_P.js';
import ShapeGlyph_Q from './glyph/ShapeGlyph_Q.js';
import ShapeGlyph_R from './glyph/ShapeGlyph_R.js';
import ShapeGlyph_S from './glyph/ShapeGlyph_S.js';
import ShapeGlyph_T from './glyph/ShapeGlyph_T.js';
import ShapeGlyph_U from './glyph/ShapeGlyph_U.js';
import ShapeGlyph_V from './glyph/ShapeGlyph_V.js';
import ShapeGlyph_W from './glyph/ShapeGlyph_W.js';
import ShapeGlyph_X from './glyph/ShapeGlyph_X.js';
import ShapeGlyph_Y from './glyph/ShapeGlyph_Y.js';
import ShapeGlyph_Z from './glyph/ShapeGlyph_Z.js';

// Import Glyph Shapes - Numbers
import ShapeGlyph_0 from './glyph/ShapeGlyph_0.js';
import ShapeGlyph_1 from './glyph/ShapeGlyph_1.js';
import ShapeGlyph_2 from './glyph/ShapeGlyph_2.js';
import ShapeGlyph_3 from './glyph/ShapeGlyph_3.js';
import ShapeGlyph_4 from './glyph/ShapeGlyph_4.js';
import ShapeGlyph_5 from './glyph/ShapeGlyph_5.js';
import ShapeGlyph_6 from './glyph/ShapeGlyph_6.js';
import ShapeGlyph_7 from './glyph/ShapeGlyph_7.js';
import ShapeGlyph_8 from './glyph/ShapeGlyph_8.js';
import ShapeGlyph_9 from './glyph/ShapeGlyph_9.js';

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

	// _________________________________________________________________ Glyph_L

	addShapeGlyph_L(
		gridX,
		gridY,
		fillType = FillType.PassThrough,
		fillStrategyType = FillStrategyType.PassThrough,
	) {
		ApplicationLogger.log(`ShapeManager addShapeGlyph_L`, this.#LOG_LEVEL);

		// Ensure Space in List
		this.#ensureSpaceInList();

		// Create Shape
		const shape = new ShapeGlyph_L(
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

	// _________________________________________________________________ Glyph_M

	addShapeGlyph_M(
		gridX,
		gridY,
		fillType = FillType.PassThrough,
		fillStrategyType = FillStrategyType.PassThrough,
	) {
		ApplicationLogger.log(`ShapeManager addShapeGlyph_M`, this.#LOG_LEVEL);

		// Ensure Space in List
		this.#ensureSpaceInList();

		// Create Shape
		const shape = new ShapeGlyph_M(
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

	// _________________________________________________________________ Glyph_N

	addShapeGlyph_N(
		gridX,
		gridY,
		fillType = FillType.PassThrough,
		fillStrategyType = FillStrategyType.PassThrough,
	) {
		ApplicationLogger.log(`ShapeManager addShapeGlyph_N`, this.#LOG_LEVEL);

		// Ensure Space in List
		this.#ensureSpaceInList();

		// Create Shape
		const shape = new ShapeGlyph_N(
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

	// _________________________________________________________________ Glyph_O

	addShapeGlyph_O(
		gridX,
		gridY,
		fillType = FillType.PassThrough,
		fillStrategyType = FillStrategyType.PassThrough,
	) {
		ApplicationLogger.log(`ShapeManager addShapeGlyph_O`, this.#LOG_LEVEL);

		// Ensure Space in List
		this.#ensureSpaceInList();

		// Create Shape
		const shape = new ShapeGlyph_O(
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

	// _________________________________________________________________ Glyph_P

	addShapeGlyph_P(
		gridX,
		gridY,
		fillType = FillType.PassThrough,
		fillStrategyType = FillStrategyType.PassThrough,
	) {
		ApplicationLogger.log(`ShapeManager addShapeGlyph_P`, this.#LOG_LEVEL);

		// Ensure Space in List
		this.#ensureSpaceInList();

		// Create Shape
		const shape = new ShapeGlyph_P(
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

	// _________________________________________________________________ Glyph_Q

	addShapeGlyph_Q(
		gridX,
		gridY,
		fillType = FillType.PassThrough,
		fillStrategyType = FillStrategyType.PassThrough,
	) {
		ApplicationLogger.log(`ShapeManager addShapeGlyph_Q`, this.#LOG_LEVEL);

		// Ensure Space in List
		this.#ensureSpaceInList();

		// Create Shape
		const shape = new ShapeGlyph_Q(
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

	// _________________________________________________________________ Glyph_R

	addShapeGlyph_R(
		gridX,
		gridY,
		fillType = FillType.PassThrough,
		fillStrategyType = FillStrategyType.PassThrough,
	) {
		ApplicationLogger.log(`ShapeManager addShapeGlyph_R`, this.#LOG_LEVEL);

		// Ensure Space in List
		this.#ensureSpaceInList();

		// Create Shape
		const shape = new ShapeGlyph_R(
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

	// _________________________________________________________________ Glyph_S

	addShapeGlyph_S(
		gridX,
		gridY,
		fillType = FillType.PassThrough,
		fillStrategyType = FillStrategyType.PassThrough,
	) {
		ApplicationLogger.log(`ShapeManager addShapeGlyph_S`, this.#LOG_LEVEL);

		// Ensure Space in List
		this.#ensureSpaceInList();

		// Create Shape
		const shape = new ShapeGlyph_S(
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

	// _________________________________________________________________ Glyph_T

	addShapeGlyph_T(
		gridX,
		gridY,
		fillType = FillType.PassThrough,
		fillStrategyType = FillStrategyType.PassThrough,
	) {
		ApplicationLogger.log(`ShapeManager addShapeGlyph_T`, this.#LOG_LEVEL);

		// Ensure Space in List
		this.#ensureSpaceInList();

		// Create Shape
		const shape = new ShapeGlyph_T(
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

	// _________________________________________________________________ Glyph_U

	addShapeGlyph_U(
		gridX,
		gridY,
		fillType = FillType.PassThrough,
		fillStrategyType = FillStrategyType.PassThrough,
	) {
		ApplicationLogger.log(`ShapeManager addShapeGlyph_U`, this.#LOG_LEVEL);

		// Ensure Space in List
		this.#ensureSpaceInList();

		// Create Shape
		const shape = new ShapeGlyph_U(
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

	// _________________________________________________________________ Glyph_V

	addShapeGlyph_V(
		gridX,
		gridY,
		fillType = FillType.PassThrough,
		fillStrategyType = FillStrategyType.PassThrough,
	) {
		ApplicationLogger.log(`ShapeManager addShapeGlyph_V`, this.#LOG_LEVEL);

		// Ensure Space in List
		this.#ensureSpaceInList();

		// Create Shape
		const shape = new ShapeGlyph_V(
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

	// _________________________________________________________________ Glyph_W

	addShapeGlyph_W(
		gridX,
		gridY,
		fillType = FillType.PassThrough,
		fillStrategyType = FillStrategyType.PassThrough,
	) {
		ApplicationLogger.log(`ShapeManager addShapeGlyph_W`, this.#LOG_LEVEL);

		// Ensure Space in List
		this.#ensureSpaceInList();

		// Create Shape
		const shape = new ShapeGlyph_W(
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

	// _________________________________________________________________ Glyph_X

	addShapeGlyph_X(
		gridX,
		gridY,
		fillType = FillType.PassThrough,
		fillStrategyType = FillStrategyType.PassThrough,
	) {
		ApplicationLogger.log(`ShapeManager addShapeGlyph_X`, this.#LOG_LEVEL);

		// Ensure Space in List
		this.#ensureSpaceInList();

		// Create Shape
		const shape = new ShapeGlyph_X(
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

	// _________________________________________________________________ Glyph_Y

	addShapeGlyph_Y(
		gridX,
		gridY,
		fillType = FillType.PassThrough,
		fillStrategyType = FillStrategyType.PassThrough,
	) {
		ApplicationLogger.log(`ShapeManager addShapeGlyph_Y`, this.#LOG_LEVEL);

		// Ensure Space in List
		this.#ensureSpaceInList();

		// Create Shape
		const shape = new ShapeGlyph_Y(
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

	// _________________________________________________________________ Glyph_Z

	addShapeGlyph_Z(
		gridX,
		gridY,
		fillType = FillType.PassThrough,
		fillStrategyType = FillStrategyType.PassThrough,
	) {
		ApplicationLogger.log(`ShapeManager addShapeGlyph_Z`, this.#LOG_LEVEL);

		// Ensure Space in List
		this.#ensureSpaceInList();

		// Create Shape
		const shape = new ShapeGlyph_Z(
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

	// _________________________________________________________________ Glyph_0

	addShapeGlyph_0(
		gridX,
		gridY,
		fillType = FillType.PassThrough,
		fillStrategyType = FillStrategyType.PassThrough,
	) {
		ApplicationLogger.log(`ShapeManager addShapeGlyph_0`, this.#LOG_LEVEL);

		// Ensure Space in List
		this.#ensureSpaceInList();

		// Create Shape
		const shape = new ShapeGlyph_0(
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

	// _________________________________________________________________ Glyph_1

	addShapeGlyph_1(
		gridX,
		gridY,
		fillType = FillType.PassThrough,
		fillStrategyType = FillStrategyType.PassThrough,
	) {
		ApplicationLogger.log(`ShapeManager addShapeGlyph_1`, this.#LOG_LEVEL);

		// Ensure Space in List
		this.#ensureSpaceInList();

		// Create Shape
		const shape = new ShapeGlyph_1(
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

	// _________________________________________________________________ Glyph_2

	addShapeGlyph_2(
		gridX,
		gridY,
		fillType = FillType.PassThrough,
		fillStrategyType = FillStrategyType.PassThrough,
	) {
		ApplicationLogger.log(`ShapeManager addShapeGlyph_2`, this.#LOG_LEVEL);

		// Ensure Space in List
		this.#ensureSpaceInList();

		// Create Shape
		const shape = new ShapeGlyph_2(
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

	// _________________________________________________________________ Glyph_3

	addShapeGlyph_3(
		gridX,
		gridY,
		fillType = FillType.PassThrough,
		fillStrategyType = FillStrategyType.PassThrough,
	) {
		ApplicationLogger.log(`ShapeManager addShapeGlyph_3`, this.#LOG_LEVEL);

		// Ensure Space in List
		this.#ensureSpaceInList();

		// Create Shape
		const shape = new ShapeGlyph_3(
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

	// _________________________________________________________________ Glyph_4

	addShapeGlyph_4(
		gridX,
		gridY,
		fillType = FillType.PassThrough,
		fillStrategyType = FillStrategyType.PassThrough,
	) {
		ApplicationLogger.log(`ShapeManager addShapeGlyph_4`, this.#LOG_LEVEL);

		// Ensure Space in List
		this.#ensureSpaceInList();

		// Create Shape
		const shape = new ShapeGlyph_4(
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

	// _________________________________________________________________ Glyph_5

	addShapeGlyph_5(
		gridX,
		gridY,
		fillType = FillType.PassThrough,
		fillStrategyType = FillStrategyType.PassThrough,
	) {
		ApplicationLogger.log(`ShapeManager addShapeGlyph_5`, this.#LOG_LEVEL);

		// Ensure Space in List
		this.#ensureSpaceInList();

		// Create Shape
		const shape = new ShapeGlyph_5(
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

	// _________________________________________________________________ Glyph_6

	addShapeGlyph_6(
		gridX,
		gridY,
		fillType = FillType.PassThrough,
		fillStrategyType = FillStrategyType.PassThrough,
	) {
		ApplicationLogger.log(`ShapeManager addShapeGlyph_6`, this.#LOG_LEVEL);

		// Ensure Space in List
		this.#ensureSpaceInList();

		// Create Shape
		const shape = new ShapeGlyph_6(
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

	// _________________________________________________________________ Glyph_7

	addShapeGlyph_7(
		gridX,
		gridY,
		fillType = FillType.PassThrough,
		fillStrategyType = FillStrategyType.PassThrough,
	) {
		ApplicationLogger.log(`ShapeManager addShapeGlyph_7`, this.#LOG_LEVEL);

		// Ensure Space in List
		this.#ensureSpaceInList();

		// Create Shape
		const shape = new ShapeGlyph_7(
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

	// _________________________________________________________________ Glyph_8

	addShapeGlyph_8(
		gridX,
		gridY,
		fillType = FillType.PassThrough,
		fillStrategyType = FillStrategyType.PassThrough,
	) {
		ApplicationLogger.log(`ShapeManager addShapeGlyph_8`, this.#LOG_LEVEL);

		// Ensure Space in List
		this.#ensureSpaceInList();

		// Create Shape
		const shape = new ShapeGlyph_8(
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

	// _________________________________________________________________ Glyph_9

	addShapeGlyph_9(
		gridX,
		gridY,
		fillType = FillType.PassThrough,
		fillStrategyType = FillStrategyType.PassThrough,
	) {
		ApplicationLogger.log(`ShapeManager addShapeGlyph_9`, this.#LOG_LEVEL);

		// Ensure Space in List
		this.#ensureSpaceInList();

		// Create Shape
		const shape = new ShapeGlyph_9(
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
