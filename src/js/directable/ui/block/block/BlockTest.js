import ApplicationDispatcher from '../../../application-dispatcher/ApplicationDispatcher';

import Block from './Block';

export default class BlockTest extends Block {
	// _________________________________________________________________________

	constructor(container, gridCellWidth, gridCellHeight, frameThicknessPx) {
		super(container, gridCellWidth, gridCellHeight, frameThicknessPx);
	}

	// ____________________________________________________________________ Load

	load() {
		super.load();

		// No Load Required
		this.setLoadBarTarget(1);
	}

	// _____________________________________________________________ Interaction

	onHolderClick() {
		super.onHolderClick();

		console.log('BlockTest onHolderClick');
	}
}
