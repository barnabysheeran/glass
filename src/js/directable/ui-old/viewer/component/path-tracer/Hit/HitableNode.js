import { vec3 } from 'gl-matrix';

import AABB from './AABB';
import HitRecord from './HitRecord';
import Hitable from './Hitable';

export default class HitableNode extends Hitable {
	constructor(hitables, depth) {
		super();

		// Left/Right
		this.nodeLeft = null;
		this.nodeRight = null;

		// BB
		this.boundingBox = null;

		// Sort on random axis
		const AXIS_ID = Math.floor(Math.random() * 3);

		switch (AXIS_ID) {
			case 0:
				hitables.sort(this.compareX);
				break;
			case 1:
				hitables.sort(this.compareY);
				break;
			case 2:
				hitables.sort(this.compareZ);
				break;
			default:
				break;
		}

		// End nodes ?
		const ITEM_TOTAL = hitables.length;

		if (ITEM_TOTAL === 1) {
			this.nodeLeft = hitables[0];
			this.nodeRight = hitables[0];
			return;
		}

		if (ITEM_TOTAL === 2) {
			this.nodeLeft = hitables[0];
			this.nodeRight = hitables[1];
			return;
		}

		// Split
		const hitablesLeft = [];
		const hitablesRight = [];

		const LIST_CENTER = Math.floor(ITEM_TOTAL / 2);

		let i;

		for (i = 0; i < ITEM_TOTAL; i += 1) {
			if (i < LIST_CENTER) {
				hitablesLeft.push(hitables[i]);
			} else {
				hitablesRight.push(hitables[i]);
			}
		}

		// Create nodes
		this.nodeLeft = new HitableNode(hitablesLeft, depth + 1);
		this.nodeRight = new HitableNode(hitablesRight, depth + 1);
	}

	// _______________________________________________________________________ Hit

	didHit(ray, tMin, tMax, hitRecord) {
		const BOUNDINGBOX = this.boundingBox;
		const NODE_LEFT = this.nodeLeft;
		const NODE_RIGHT = this.nodeRight;

		if (BOUNDINGBOX.didHit(ray, tMin, tMax, hitRecord) === true) {
			const hitRecordLeft = new HitRecord();
			const hitRecordRight = new HitRecord();

			const hitLeft = NODE_LEFT.didHit(ray, tMin, tMax, hitRecordLeft);
			const hitRight = NODE_RIGHT.didHit(ray, tMin, tMax, hitRecordRight);

			if (hitLeft === true && hitRight === true) {
				if (hitRecordLeft.t < hitRecordRight.t) {
					hitRecordLeft.cloneThisInto(hitRecord);
					return true;
				}
				hitRecordRight.cloneThisInto(hitRecord);
				return true;
			}
			if (hitLeft === true) {
				hitRecordLeft.cloneThisInto(hitRecord);
				return true;
			}
			if (hitRight === true) {
				hitRecordRight.cloneThisInto(hitRecord);
				return true;
			}
			return false;
		}

		return false;
	}

	// ______________________________________________________________________ BB

	createBoundingBox() {
		const NODE_LEFT = this.nodeLeft;
		const NODE_RIGHT = this.nodeRight;

		// Left / Right
		NODE_LEFT.createBoundingBox();
		NODE_RIGHT.createBoundingBox();

		// This
		const min = vec3.create(Infinity, Infinity, Infinity);
		const max = vec3.create(-Infinity, -Infinity, -Infinity);

		const bbLeft = NODE_LEFT.boundingBox;
		const bbRight = NODE_RIGHT.boundingBox;

		// Min X
		if (bbLeft.MIN[0] < min[0]) {
			min[0] = bbLeft.MIN[0];
		}

		if (bbRight.MIN[0] < min[0]) {
			min[0] = bbRight.MIN[0];
		}

		// Min Y
		if (bbLeft.MIN[1] < min[1]) {
			min[1] = bbLeft.MIN[1];
		}

		if (bbRight.MIN[1] < min[1]) {
			min[1] = bbRight.MIN[1];
		}

		// Min Z
		if (bbLeft.MIN[2] < min[2]) {
			min[2] = bbLeft.MIN[2];
		}

		if (bbRight.MIN[2] < min[2]) {
			min[2] = bbRight.MIN[2];
		}

		// Max X
		if (bbLeft.MAX[0] > max[0]) {
			max[0] = bbLeft.MAX[0];
		}

		if (bbRight.MAX[0] > max[0]) {
			max[0] = bbRight.MAX[0];
		}

		// Max Y
		if (bbLeft.MAX[1] > max[1]) {
			max[1] = bbLeft.MAX[1];
		}

		if (bbRight.MAX[1] > max[1]) {
			max[1] = bbRight.MAX[1];
		}

		// Max Z
		if (bbLeft.MAX[2] > max[2]) {
			max[2] = bbLeft.MAX[2];
		}

		if (bbRight.MAX[2] > max[2]) {
			max[2] = bbRight.MAX[2];
		}

		//
		this.boundingBox = new AABB(min, max);
	}

	// ____________________________________________________________________ Sort

	compareX(a, b) {
		const BB_A = a.boundingBox;
		const BB_B = b.boundingBox;

		if (BB_A.MIN[0] - BB_B.MIN[0] < 0.0) {
			return -1;
		}

		return 1;
	}

	compareY(a, b) {
		const BB_A = a.boundingBox;
		const BB_B = b.boundingBox;

		if (BB_A.MIN[1] - BB_B.MIN[1] < 0.0) {
			return -1;
		}

		return 1;
	}

	compareZ(a, b) {
		const BB_A = a.boundingBox;
		const BB_B = b.boundingBox;

		if (BB_A.MIN[2] - BB_B.MIN[2] < 0.0) {
			return -1;
		}

		return 1;
	}
}
