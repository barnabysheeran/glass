import Material from './Material';

export default class MaterialLightDiffuse extends Material {
	constructor(albedo) {
		super();

		this.ALBEDO = albedo;
	}

	// _________________________________________________________________ Scatter

	scatter() {
		// rayIn, hitRecord, attenuation, scattered

		return false;
	}

	// _________________________________________________________________ Emitted

	emitted(u, v, position) {
		return this.ALBEDO.getValue(u, v, position);
	}
}
