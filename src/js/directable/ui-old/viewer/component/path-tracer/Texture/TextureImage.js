import { vec3 } from 'gl-matrix';

import Texture from './Texture';

export default class TextureImage extends Texture {
	constructor(dimensions, data) {
		super();

		this.TEXTURE_IMAGE_DIMENSIONS = dimensions;
		this.TEXTURE_IMAGE_DATA = data;
	}

	getValue(u, v) {
		// u, v, position

		const PIXELS_X = this.TEXTURE_IMAGE_DIMENSIONS[0];
		const PIXELS_Y = this.TEXTURE_IMAGE_DIMENSIONS[1];
		const { TEXTURE_IMAGE_DATA } = this;

		let i = Math.floor(u * PIXELS_X);
		let j = Math.floor((1 - v) * PIXELS_Y - 0.001);

		if (i < 0) {
			i = 0;
		}

		if (j < 0) {
			j = 0;
		}

		if (i > PIXELS_X - 1) {
			i = PIXELS_X - 1;
		}

		if (j > PIXELS_Y - 1) {
			j = PIXELS_Y - 1;
		}

		const INDEX = 4 * i + 4 * PIXELS_X * j;

		const R = TEXTURE_IMAGE_DATA[INDEX] / 255.0;
		const G = TEXTURE_IMAGE_DATA[INDEX + 1] / 255.0;
		const B = TEXTURE_IMAGE_DATA[INDEX + 2] / 255.0;

		return vec3.fromValues(R, G, B);
	}
}
