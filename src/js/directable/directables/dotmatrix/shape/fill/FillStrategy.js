import FillStrategyType from './FillStrategyType.js';

export default class FillStrategy {
	static apply(fillStrategyType, positionGrids) {
		switch (fillStrategyType) {
			case FillStrategyType.PassThrough:
				// Do Nothing
				break;
			case FillStrategyType.Reverse:
				// Reverse
				// TODO: Implement reverse logic
				// positionGrids.Reverse();
				break;
			case FillStrategyType.Random:
				// Randomize
				this.applyRandom(positionGrids);
				break;
		}
	}

	// ______________________________________________________________ Random

	applyRandom(positionGrids) {
		// Randomize positionGrid order
		for (let i = 0; i < positionGrids.Count; i++) {
			// int randomIndex = Random.Range(0, positionGrids.Count);
			// Vector2Int temp = positionGrids[i];
			// positionGrids[i] = positionGrids[randomIndex];
			// positionGrids[randomIndex] = temp;
		}
	}
}
