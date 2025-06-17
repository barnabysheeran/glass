import ApplicationDispatcher from '../../../../application-dispatcher/ApplicationDispatcher';
import ApplicationLogger from '../../../../application/ApplicationLogger';

import Block from '../Block';

export default class BlockRGB extends Block {
	#hue = 0;
	#saturation = 0;
	#lightness = 0;

	#LOG_LEVEL = 4;

	// _________________________________________________________________________

	constructor(container, hue, saturation, lightness) {
		super(container, 1, 1, 2);

		ApplicationLogger.log('BlockRGB', this.#LOG_LEVEL);

		// Store
		this.#hue = hue;
		this.#saturation = saturation;
		this.#lightness = lightness;

		// Set Fill Style
		this.fillStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
	}

	// ____________________________________________________________________ Tick

	tick() {
		super.tick();
	}

	// _____________________________________________________________ Interaction

	onHolderOver() {
		super.onHolderOver();

		ApplicationLogger.log('BlockRGB onHolderOver', this.#LOG_LEVEL);

		this.draw();
	}

	onHolderOut() {
		super.onHolderOut();

		ApplicationLogger.log('BlockRGB onHolderOut', this.#LOG_LEVEL);

		this.draw();
	}

	onHolderClick() {
		super.onHolderClick();

		// TODO

		ApplicationDispatcher.dispatch('environment-set-colour', {
			hue: this.#hue,
			saturation: this.#saturation,
			lightness: this.#lightness,
		});
	}

	// ____________________________________________________________________ Load

	load() {
		super.load();

		ApplicationLogger.log('BlockRGB. load', this.#LOG_LEVEL);

		// No Load Required
		this.setLoadBarTarget(1);
	}

	onLoadComplete() {
		super.onLoadComplete();

		ApplicationLogger.log('BlockRGB. onLoadComplete', this.#LOG_LEVEL);

		// Draw
		this.draw();
	}
}
