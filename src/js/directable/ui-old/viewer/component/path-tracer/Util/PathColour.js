export default function HSVtoRGB(h, s, v) {
	let r;
	let g;
	let b;

	// if (arguments.length === 1) {
	// 	(s = h.s), (v = h.v), (h = h.h);
	// }

	const I = Math.floor(h * 6);
	const F = h * 6 - I;
	const P = v * (1 - s);
	const Q = v * (1 - F * s);
	const T = v * (1 - (1 - F) * s);

	switch (I % 6) {
		case 0:
			r = v;
			g = T;
			b = P;
			break;

		case 1:
			r = Q;
			g = v;
			b = P;
			break;

		case 2:
			r = P;
			g = v;
			b = T;
			break;

		case 3:
			r = P;
			g = Q;
			b = v;
			break;

		case 4:
			r = T;
			g = P;
			b = v;
			break;

		case 5:
			r = v;
			g = P;
			b = Q;
			break;

		default:
			break;
	}

	return { r, g, b };
}

// export function rainbow(t) {
//   // TODO Test
//   let r = t * 2.1 - 1.8;
//   let g = t * 2.1 - 1.14;
//   let b = t * 2.1 - 0.3;

//   return [1.0 - r * r, 1.0 - g * g, 1.0 - b * b];
// }

// vec3 Geoffrey(float t)
// {
//     vec3 r = t * 2.1 - vec3(1.8, 1.14, 0.3);
//     return 1.0 - r * r;
// }
