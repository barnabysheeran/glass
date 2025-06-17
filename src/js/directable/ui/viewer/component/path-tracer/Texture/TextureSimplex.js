import { vec3 } from 'gl-matrix';

import SimplexNoise from 'simplex-noise';

import Texture from './Texture';

export default class TextureSimplex extends Texture {
	constructor(scalar) {
		super();

		this.SCALAR = scalar;

		this.SIMPLEX = new SimplexNoise('random');
	}

	getValue(u, v, position) {
		const TURB = this.turbulence(position, 7);

		const MARBLE =
			0.5 * (1 + Math.sin(this.SCALAR + position[2] + 10.0 * TURB));

		return vec3.fromValues(MARBLE, MARBLE, MARBLE);
	}

	// ______________________________________________________________ Turbulence

	turbulence(position, depth) {
		const { SIMPLEX } = this;

		let accum = 0.0;
		let weight = 1.0;
		const tempPosition = vec3.clone(position);

		let i;
		for (i = 0; i < depth; i += 1) {
			accum +=
				weight *
				SIMPLEX.noise3D(tempPosition[0], tempPosition[1], tempPosition[2]);

			weight *= 0.5;

			tempPosition[0] *= 2.0;
			tempPosition[1] *= 2.0;
			tempPosition[2] *= 2.0;
		}

		return Math.abs(accum);
	}
}
