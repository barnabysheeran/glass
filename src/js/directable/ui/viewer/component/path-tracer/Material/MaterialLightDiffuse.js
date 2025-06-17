import Material from './Material';

export default class MaterialLightDiffuse extends Material {
	constructor(albedo) {
		super();

		this.ALBEDO = albedo;
	}

	// _________________________________________________________________ Scatter

	/* eslint-disable-next-line class-methods-use-this */
	scatter() {
		// rayIn, hitRecord, attenuation, scattered

		return false;
	}

	// _________________________________________________________________ Emitted

	emitted(u, v, position) {
		return this.ALBEDO.getValue(u, v, position);
	}
}
