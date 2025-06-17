import { Vector2 } from 'three';

export default class UIGridCell {
	#CELL_INDEX;

	#CELL_POSITION_X;
	#CELL_POSITION_Y;
	#CELL_POSITION = new Vector2();

	#POSITION_X_PX;
	#POSITION_Y_PX;
	#POSITION_PX = new Vector2();

	#isEmpty = true;

	// _________________________________________________________________________

	constructor(
		cellIndex,
		cellPositionX,
		cellPositionY,
		positionXPx,
		positionYPx,
	) {
		// Store
		this.#CELL_INDEX = cellIndex;

		this.#CELL_POSITION_X = cellPositionX;
		this.#CELL_POSITION_Y = cellPositionY;
		this.#CELL_POSITION.set(cellPositionX, cellPositionY);

		this.#POSITION_X_PX = positionXPx;
		this.#POSITION_Y_PX = positionYPx;
		this.#POSITION_PX.set(positionXPx, positionYPx);
	}

	// ____________________________________________________________________ Empty

	setEmpty() {
		this.#isEmpty = true;
	}

	setOccupied() {
		this.#isEmpty = false;
	}

	getIsEmpty() {
		return this.#isEmpty;
	}

	// __________________________________________________________________ Access

	getCellIndex() {
		return this.#CELL_INDEX;
	}

	getCellPositionX() {
		return this.#CELL_POSITION_X;
	}

	getCellPositionY() {
		return this.#CELL_POSITION_Y;
	}

	getCellPosition() {
		return this.#CELL_POSITION;
	}

	getPositionXPx() {
		return this.#POSITION_X_PX;
	}

	getPositionYPx() {
		return this.#POSITION_Y_PX;
	}
}
