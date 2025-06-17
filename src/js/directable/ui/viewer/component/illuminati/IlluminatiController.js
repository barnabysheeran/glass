import IlluminatiVisual from './IlluminatiVisual';

export default class IlluminatiController {
	#visual;

	// _________________________________________________________________________

	constructor(holder) {
		// Visual
		this.#visual = new IlluminatiVisual(holder);
		this.#visual.update();
	}

	// __________________________________________________________________ Update

	tick() {
		// let w;
		// let h;
		// // FPS
		// this._now = Date.now();
		// this._delta = this._now - this._then;
		// if (this._delta > this._interval) {
		// 	// FPS
		// 	this._then = this._now - (this._delta % this._interval);
		// 	if (w !== this._width_current || h !== this._height_current) {
		// 		// Update
		// 		this._visual.update(w, h);
		// 	}
		// }
	}

	// _________________________________________________________________________

	onLayoutChanged() {
		//
	}
}
