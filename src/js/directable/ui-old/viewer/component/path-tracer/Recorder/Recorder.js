import { saveAs } from 'file-saver';

export default class Recorder {
	constructor(canvas) {
		this.CANVAS = canvas;
	}

	saveImage(imageName) {
		this.CANVAS.toBlob((blob) => {
			saveAs(blob, imageName);
		});
	}
}
