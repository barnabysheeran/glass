import ApplicationLogger from '../../application/ApplicationLogger.js';

export default class RenderSurface {
	#LOG_LEVEL = 2;

	#CANVAS = null;
	#GL;
	#TEXTURE;
	#FRAMEBUFFER;

	width = 512;
	height = 512;

	// _________________________________________________________________________

	constructor() {
		ApplicationLogger.log(
			`RenderSurface: Initializing with default width: ${this.width}, height: ${this.height}`,
			this.#LOG_LEVEL,
		);

		// Create Canvas
		this.#CANVAS = document.createElement('canvas');
		this.#CANVAS.width = this.width;
		this.#CANVAS.height = this.height;

		// Get WebGL2 Context
		this.#GL = this.#CANVAS.getContext('webgl2');

		if (!this.#GL) {
			ApplicationLogger.warn(
				'RenderSurface: WebGL2 not supported or context creation failed.',
			);
		}

		// Create Texture
		this.#TEXTURE = this.#GL.createTexture();
		this.#GL.bindTexture(this.#GL.TEXTURE_2D, this.#TEXTURE);
		this.#GL.texImage2D(
			this.#GL.TEXTURE_2D,
			0,
			this.#GL.RGBA,
			this.width,
			this.height,
			0,
			this.#GL.RGBA,
			this.#GL.UNSIGNED_BYTE,
			null,
		);

		// Set Texture Parameters
		this.#GL.texParameteri(
			this.#GL.TEXTURE_2D,
			this.#GL.TEXTURE_MIN_FILTER,
			this.#GL.NEAREST,
		);
		this.#GL.texParameteri(
			this.#GL.TEXTURE_2D,
			this.#GL.TEXTURE_MAG_FILTER,
			this.#GL.NEAREST,
		);
		this.#GL.texParameteri(
			this.#GL.TEXTURE_2D,
			this.#GL.TEXTURE_WRAP_S,
			this.#GL.CLAMP_TO_EDGE,
		);
		this.#GL.texParameteri(
			this.#GL.TEXTURE_2D,
			this.#GL.TEXTURE_WRAP_T,
			this.#GL.CLAMP_TO_EDGE,
		);

		// Create Framebuffer
		this.#FRAMEBUFFER = this.#GL.createFramebuffer();
		this.#GL.bindFramebuffer(this.#GL.FRAMEBUFFER, this.#FRAMEBUFFER);
		this.#GL.framebufferTexture2D(
			this.#GL.FRAMEBUFFER,
			this.#GL.COLOR_ATTACHMENT0,
			this.#GL.TEXTURE_2D,
			this.#TEXTURE,
			0,
		);

		// Check Framebuffer Status
		const status = this.#GL.checkFramebufferStatus(this.#GL.FRAMEBUFFER);
		if (status !== this.#GL.FRAMEBUFFER_COMPLETE) {
			ApplicationLogger.warn(
				`RenderSurface: Framebuffer incomplete: ${status.toString(16)}`,
			);
		}

		// Unbind
		this.#GL.bindTexture(this.#GL.TEXTURE_2D, null);
		this.#GL.bindFramebuffer(this.#GL.FRAMEBUFFER, null);
	}

	// __________________________________________________________________ Render

	beginRender(r = 0, g = 0, b = 0, a = 0) {
		const gl = this.#GL;
		gl.bindFramebuffer(gl.FRAMEBUFFER, this.#FRAMEBUFFER);
		gl.viewport(0, 0, this.width, this.height);
		gl.clearColor(r, g, b, a);
		gl.clear(gl.COLOR_BUFFER_BIT);
	}

	endRender() {
		this.#GL.bindFramebuffer(this.#GL.FRAMEBUFFER, null);
	}

	render() {
		ApplicationLogger.log(
			'RenderSurface: render() called. Implement drawing logic if this surface is to be drawn elsewhere.',
			this.#LOG_LEVEL,
		);
	}

	// ____________________________________________________________ Texture Data

	getTextureData(x, y, width, height) {
		if (x < 0 || y < 0 || x + width > this.width || y + height > this.height) {
			ApplicationLogger.warn(
				'RenderSurface: getTextureData called with out-of-bounds coordinates.',
			);
			return null;
		}

		const gl = this.#GL;
		const buffer = new Uint8Array(width * height * 4);

		gl.bindFramebuffer(gl.FRAMEBUFFER, this.#FRAMEBUFFER);

		// gl.readPixels reads from bottom-left, so we need to adjust y
		const yGL = this.height - (y + height);
		gl.readPixels(x, yGL, width, height, gl.RGBA, gl.UNSIGNED_BYTE, buffer);

		gl.bindFramebuffer(gl.FRAMEBUFFER, null);
		return buffer;
	}

	setTextureData(x, y, width, height, data) {
		if (x < 0 || y < 0 || x + width > this.width || y + height > this.height) {
			ApplicationLogger.warn(
				'RenderSurface: setTextureData called with out-of-bounds coordinates.',
			);
			return;
		}
		if (!data || data.byteLength !== width * height * 4) {
			ApplicationLogger.warn(
				'RenderSurface: setTextureData called with invalid data size.',
			);
			return;
		}

		const gl = this.#GL;
		gl.bindTexture(gl.TEXTURE_2D, this.#TEXTURE);
		// gl.texSubImage2D y-coordinate is from top-left, which matches our convention.
		gl.texSubImage2D(
			gl.TEXTURE_2D,
			0,
			x,
			y,
			width,
			height,
			gl.RGBA,
			gl.UNSIGNED_BYTE,
			data,
		);
		gl.bindTexture(gl.TEXTURE_2D, null);
	}

	// __________________________________________________________________ Access

	getCanvas() {
		return this.#CANVAS;
	}
}
