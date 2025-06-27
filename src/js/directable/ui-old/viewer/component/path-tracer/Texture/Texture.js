import { vec3 } from 'gl-matrix';

export default class Texture {
	/* eslint-disable-next-line no-useless-constructor */
	constructor() {
		//
	}

	// __________________________________________________________________ Access

	/* eslint-disable-next-line class-methods-use-this */
	getValue() {
		// u, v, p

		return vec3.create();
	}
}
