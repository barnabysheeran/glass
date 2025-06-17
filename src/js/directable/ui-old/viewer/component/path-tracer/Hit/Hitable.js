export default class Hitable {
	constructor() {
		this.boundingBox = null;
	}

	// _____________________________________________________________________ Hit

	/* eslint-disable-next-line class-methods-use-this */
	didHit() {
		// ray, tMin, tMax, hitRecord
	}

	// ____________________________________________________________________ AABB

	/* eslint-disable-next-line class-methods-use-this */
	createBoundingBox() {}

	// __________________________________________________________________ Access

	/* eslint-disable-next-line class-methods-use-this */
	getPositionCenter() {}
}
