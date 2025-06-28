import DevelopmentGuides from './guide/DevelopmentGuides.js';

export default class Development {
	static #DEVELOPMENT_GUIDES;

	// _________________________________________________________________________

	static initialise() {
		// Create Development Guides
		this.#DEVELOPMENT_GUIDES = new DevelopmentGuides();
	}
}
