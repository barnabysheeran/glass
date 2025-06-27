export default class Hitable {
	constructor() {
		this.boundingBox = null;
	}

	// _____________________________________________________________________ Hit

	didHit() {
		// ray, tMin, tMax, hitRecord
	}

	// ____________________________________________________________________ AABB

	createBoundingBox() {}

	// __________________________________________________________________ Access

	getPositionCenter() {}
}
