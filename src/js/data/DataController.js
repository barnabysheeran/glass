import DATA_JSON from './Data.json';

export default class DataController {
	static #DATA = DATA_JSON;

	static #DATA_PROJECTS = DataController.#DATA.projects;

	// TODO: Add more data
	// static #DATA_ABOUT = DataController.#DATA.about;
	// static #DATA_EDUCATION = DataController.#DATA.education;
	// static #DATA_EXPERIENCE = DataController.#DATA.experience;
	// static #DATA_SKILLS = DataController.#DATA.skills;
	// static #DATA_CONTACT = DataController.#DATA.contact;

	static getProjects() {
		return DataController.#DATA_PROJECTS;
	}
}
