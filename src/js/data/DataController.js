import DATA_JSON from './data.json';

export default class DataController {
	static #DATA = DATA_JSON;

	static #DATA_PROJECTS = DataController.#DATA.projects;

	static getProjects() {
		return DataController.#DATA_PROJECTS;
	}
}
