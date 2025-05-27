import FillType from '../../shape/fill/FillType.js';

export default class Fill {
	static apply(fillType, positionGrids, gridWidth = 0, gridHeight = 0) {
		switch (fillType) {
			case FillType.PassThrough:
				// Do Nothing
				break;
			case FillType.Random:
				// Randomize
				this.#applyRandom(positionGrids);
				break;
			case FillType.Border:
				// Border
				this.#applyBorder(positionGrids, gridWidth, gridHeight);
				break;
		}
	}

	// __________________________________________________________________ Random

	static #applyRandom(positionGrids) {
		// TODO Fill Apply Random
		// List<Vector2Int> itemsToRemove = new List<Vector2Int>();
		// // Remove Randomly
		// foreach (var positionGrid in positionGrids)
		// {
		//     if (Random.value < 0.5f)
		//     {
		//         itemsToRemove.Add(positionGrid);
		//     }
		// }
		// foreach (var item in itemsToRemove)
		// {
		//     positionGrids.Remove(item);
		// }
	}

	// __________________________________________________________________ Border

	static #applyBorder(positionGrids, gridWidth, gridHeight) {
		// TODO Fill Apply Border
		// List<Vector2Int> itemsToRemove = new List<Vector2Int>();
		// int xSmallest = int.MaxValue;
		// int ySmallest = int.MaxValue;
		// foreach (var positionGrid in positionGrids)
		// {
		//     if (positionGrid.x < xSmallest)
		//     {
		//         xSmallest = positionGrid.x;
		//     }
		//     if (positionGrid.y < ySmallest)
		//     {
		//         ySmallest = positionGrid.y;
		//     }
		// }
		// // Remove if Not Border
		// foreach (var positionGrid in positionGrids)
		// {
		//     if (positionGrid.x != xSmallest &&
		//         positionGrid.x != xSmallest + gridWidth - 1 &&
		//         positionGrid.y != ySmallest &&
		//         positionGrid.y != ySmallest + gridHeight - 1)
		//     {
		//         itemsToRemove.Add(positionGrid);
		//     }
		// }
		// foreach (var item in itemsToRemove)
		// {
		//     positionGrids.Remove(item);
		// }
	}
}
