import DevelopmentGuides from './guide/DevelopmentGuides';

export default class UIDevelopmentController {
	static #DEVELOPMENT_GUIDES;

	// _________________________________________________________________________

	static initialise() {
		// Create Development Guides
		this.#DEVELOPMENT_GUIDES = new DevelopmentGuides();
	}
}
