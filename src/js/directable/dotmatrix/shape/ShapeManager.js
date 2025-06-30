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

const GLYPH_MAP = {
	A: ShapeGlyph_A,
	B: ShapeGlyph_B,
	C: ShapeGlyph_C,
	D: ShapeGlyph_D,
	E: ShapeGlyph_E,
	F: ShapeGlyph_F,
	G: ShapeGlyph_G,
	H: ShapeGlyph_H,
	I: ShapeGlyph_I,
	J: ShapeGlyph_J,
	K: ShapeGlyph_K,
	L: ShapeGlyph_L,
	M: ShapeGlyph_M,
	N: ShapeGlyph_N,
	O: ShapeGlyph_O,
	P: ShapeGlyph_P,
	Q: ShapeGlyph_Q,
	R: ShapeGlyph_R,
	S: ShapeGlyph_S,
	T: ShapeGlyph_T,
	U: ShapeGlyph_U,
	V: ShapeGlyph_V,
	W: ShapeGlyph_W,
	X: ShapeGlyph_X,
	Y: ShapeGlyph_Y,
	Z: ShapeGlyph_Z,
	0: ShapeGlyph_0,
	1: ShapeGlyph_1,
	2: ShapeGlyph_2,
	3: ShapeGlyph_3,
	4: ShapeGlyph_4,
	5: ShapeGlyph_5,
	6: ShapeGlyph_6,
	7: ShapeGlyph_7,
	8: ShapeGlyph_8,
	9: ShapeGlyph_9,
};

export default class ShapeManager {
	#DOT_MANAGER;

	#SHAPES = [];
	#SHAPE_MAX = 1024;

	#LOG_LEVEL = -1; // 4;

	// TODO Do we need shape max ?

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

	// _____________________________________________________________________ Add

	#addShape(shape) {
		ApplicationLogger.log(
			`ShapeManager addShape ${shape.getShapeId()}`,
			this.#LOG_LEVEL,
		);

		// Ensure space in list
		this.#ensureSpaceInList();

		// Add to list
		this.#SHAPES.push(shape);

		// Return the shape
		return shape;
	}

	// __________________________________________________________________ Remove

	removeShape(shapeId) {
		ApplicationLogger.log(
			`ShapeManager removeShape ${shapeId}`,
			this.#LOG_LEVEL,
		);

		// Find Index by ID
		for (let i = 0; i < this.#SHAPES.length; i += 1) {
			if (this.#SHAPES[i].getShapeId() === shapeId) {
				// TODO Tell the Shape to Undraw here on in a new method

				// Remove Shape
				this.#SHAPES.splice(i, 1);

				ApplicationLogger.log(` - removed ${shapeId}`, this.#LOG_LEVEL);

				return true;
			}
		}
	}

	// __________________________________________________________________ Redraw

	// TODO Should this be here or replaced by Component Manager

	redraw() {
		ApplicationLogger.log('ShapeManager redraw', this.#LOG_LEVEL);

		// Redraw All Shapes
		for (let i = 0; i < this.#SHAPES.length; i += 1) {
			this.#SHAPES[i].redraw();
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
		// Create Shape
		const shape = new ShapeLineHorizontal(
			this.#DOT_MANAGER,
			gridX,
			gridY,
			length,
			fillType,
			fillStrategyType,
		);

		// Add and return
		return this.#addShape(shape);
	}

	// ___________________________________________________________ Line Vertical

	addShapeLineVertical(
		gridX,
		gridY,
		length,
		fillType = FillType.PassThrough,
		fillStrategyType = FillStrategyType.PassThrough,
	) {
		// Create Shape
		const shape = new ShapeLineVertical(
			this.#DOT_MANAGER,
			gridX,
			gridY,
			length,
			fillType,
			fillStrategyType,
		);

		// Add and return
		return this.#addShape(shape);
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

		// Add and return
		return this.#addShape(shape);
	}

	// ___________________________________________________________________ Glyph

	addShapeGlyph(
		character,
		gridX,
		gridY,
		fillType = FillType.PassThrough,
		fillStrategyType = FillStrategyType.PassThrough,
	) {
		const upperChar = character.toUpperCase();
		const ShapeClass = GLYPH_MAP[upperChar];

		if (!ShapeClass) {
			ApplicationLogger.log(
				`ShapeManager addShapeGlyph Unknown character '${character}'`,
				this.#LOG_LEVEL,
			);
			return null;
		}

		ApplicationLogger.log(
			`ShapeManager addShapeGlyph ${upperChar}`,
			this.#LOG_LEVEL,
		);

		// Create Shape
		const shape = new ShapeClass(
			this.#DOT_MANAGER,
			gridX,
			gridY,
			fillType,
			fillStrategyType,
		);

		// Add and return
		return this.#addShape(shape);
	}
}
