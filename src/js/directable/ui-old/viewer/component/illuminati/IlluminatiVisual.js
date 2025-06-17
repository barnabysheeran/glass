import ApplicationConfiguration from '../../../../application/ApplicationConfiguration';

export default class IlluminatiVisual {
	#HOLDER;

	#sourceWidth;
	#sourceHeight;
	#sourcePixelTotal;

	#sourceCanvas;
	#sourceContext;
	#source;

	#assetWidth;
	#assetHeight;
	#assetTotal;
	#assets = [];

	#layout = [];

	#canvas;
	#context;

	// _________________________________________________________________________

	constructor(holder) {
		let i;

		//
		this.#HOLDER = holder;

		// Dimensions
		this.#sourceWidth = 100;
		this.#sourceHeight = 100;
		this.#sourcePixelTotal = this.#sourceWidth * this.#sourceHeight;

		// Assets
		this.#assetWidth = 10;
		this.#assetHeight = 10;
		this.#assetTotal = 4;
		this.#assets = [];

		const assetPath = `${ApplicationConfiguration.getPathAsset()}illuminati/`;

		for (i = 0; i < this.#assetTotal; i += 1) {
			this.#assets[i] = new Image();
			this.#assets[i].src = `${assetPath}asset_${i}.png`;
		}

		// Init layout to random
		for (i = 0; i < this.#sourcePixelTotal; i += 1) {
			this.#layout[i] = Math.floor(Math.random() * this.#assetTotal);
		}

		this.#sourceCanvas = document.createElement('canvas');
		this.#sourceCanvas.width = this.#sourceWidth;
		this.#sourceCanvas.height = this.#sourceHeight;

		this.#sourceContext = this.#sourceCanvas.getContext('2d', {
			willReadFrequently: true,
		});

		this.#source = new Image();
		this.#source.onload = this.#parseSourceImage.bind(this);
		this.#source.src = `${assetPath}source.png`;

		// Canvas
		this.#canvas = document.createElement('canvas');
		this.#canvas.width = 100;
		this.#canvas.height = 100;
		this.#HOLDER.appendChild(this.#canvas);

		// Context
		this.#context = this.#canvas.getContext('2d', {
			willReadFrequently: true,
		});
	}

	// ___________________________________________________________________ Parse

	#parseSourceImage() {
		let x;
		let y;
		let index = 0;
		let rgba;

		// Draw
		this.#sourceContext.drawImage(this.#source, 0, 0);

		// Parse
		for (x = 0; x < this.#sourceWidth; x += 1) {
			for (y = 0; y < this.#sourceHeight; y += 1) {
				rgba = this.#sourceContext.getImageData(y, x, 1, 1).data;

				if (rgba[0] < 64) {
					this.#layout[index] = 0;
				} else if (rgba[0] < 128) {
					this.#layout[index] = 1;
				} else if (rgba[0] < 192) {
					this.#layout[index] = 2;
				} else {
					this.#layout[index] = 3;
				}

				// Next
				index += 1;
			}
		}
	}

	// __________________________________________________________________ Update

	update() {
		const w = 1000;
		const h = 1000;

		let i;
		let x = 0;
		let y = 0;

		// Shape
		this.#canvas.width = w;
		this.#canvas.height = h;

		// Draw
		this.#context.save();

		for (i = 0; i < this.#layout.length; i += 1) {
			// console.log(this.#layout[i]);

			// Tint Colour
			// const assetTinted = this.#tintAsset(
			// 	this.#assets[this.#layout[i]],
			// 	[255, 0, 0],
			// );

			const assetTinted = this.#assets[this.#layout[i]];

			// console.log(assetTinted);

			// Draw
			this.#context.drawImage(assetTinted, x, y);

			// Next
			x += this.#assetWidth;
			if (x > w - this.#assetWidth) {
				x = 0;
				y += this.#assetHeight;
			}
		}

		this.#context.restore();
	}

	// _________________________________________________________________________

	#tintAsset(img, tint) {
		// console.log(img);
		// console.log(tint);

		// Create offscreen canvas
		const buffer = document.createElement('canvas');
		const bufferContext = buffer.getContext('2d');

		// Set width and height
		buffer.width = img.width;
		buffer.height = img.height;

		// Draw the image
		bufferContext.drawImage(img, 0, 0);

		// Get the image data object
		const imageData = bufferContext.getImageData(0, 0, img.width, img.height);

		// Get the image data values
		const data = imageData.data;

		// Iterate over all the pixels
		for (let i = 0; i < data.length; i += 4) {
			// If the pixel is not transparent
			if (data[i + 3] > 0) {
				// Change the pixel data
				data[i] = tint[0];
				data[i + 1] = tint[1];
				data[i + 2] = tint[2];
			}
		}
	}
}
