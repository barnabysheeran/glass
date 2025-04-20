/*

  Director is a Superclass for all Directors

*/

export default class Director {
	LOG_LEVEL = 2;

	// _________________________________________________________________________

	constructor() {}

	// ____________________________________________________________________ Tick

	tick(frameDeltaMS) {}

	// _________________________________________________________ Tick Frame Rate

	tickFrameRate() {}
}
