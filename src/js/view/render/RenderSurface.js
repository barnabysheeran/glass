import ApplicationLogger from '../../application/ApplicationLogger.js';

export default class RenderSurface {
	#CANVAS = null;
	#GL;
	#TEXTURE;
	#FRAMEBUFFER;

	#DISPLAY_SHADER_PROGRAM;
	#DISPLAY_QUAD_VBO;
	#DISPLAY_QUAD_VAO;
	#DISPLAY_POSITION_ATTRIB_LOCATION;
	#DISPLAY_TEX_COORD_ATTRIB_LOCATION;
	#DISPLAY_TEXTURE_UNIFORM_LOCATION;

	width = 512;
	height = 512;

	#LOG_LEVEL = 2;

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
			return;
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

		this.#initDisplayResources();
	}

	#initDisplayResources() {
		const gl = this.#GL;
		if (!gl) return;

		const vsSource = `
			attribute vec2 a_position;
			attribute vec2 a_texCoord;
			varying vec2 v_texCoord;
			void main() {
				gl_Position = vec4(a_position, 0.0, 1.0);
				v_texCoord = a_texCoord;
			}
		`;
		const fsSource = `
			precision mediump float;
			uniform sampler2D u_texture;
			varying vec2 v_texCoord;
			void main() {
				gl_FragColor = texture2D(u_texture, v_texCoord);
			}
		`;

		const vertexShader = this.#compileShader(gl.VERTEX_SHADER, vsSource); // Renamed from _compileShader
		const fragmentShader = this.#compileShader(gl.FRAGMENT_SHADER, fsSource); // Renamed from _compileShader

		if (!vertexShader || !fragmentShader) {
			ApplicationLogger.warn(
				'RenderSurface: Failed to compile display shaders.',
			);
			return;
		}

		this.#DISPLAY_SHADER_PROGRAM = gl.createProgram();
		gl.attachShader(this.#DISPLAY_SHADER_PROGRAM, vertexShader);
		gl.attachShader(this.#DISPLAY_SHADER_PROGRAM, fragmentShader);
		gl.linkProgram(this.#DISPLAY_SHADER_PROGRAM);

		if (!gl.getProgramParameter(this.#DISPLAY_SHADER_PROGRAM, gl.LINK_STATUS)) {
			ApplicationLogger.warn(
				'RenderSurface: Unable to initialize the display shader program: ' +
					gl.getProgramInfoLog(this.#DISPLAY_SHADER_PROGRAM),
			);
			gl.deleteProgram(this.#DISPLAY_SHADER_PROGRAM);
			this.#DISPLAY_SHADER_PROGRAM = null;
			return;
		}

		this.#DISPLAY_POSITION_ATTRIB_LOCATION = gl.getAttribLocation(
			this.#DISPLAY_SHADER_PROGRAM,
			'a_position',
		);
		this.#DISPLAY_TEX_COORD_ATTRIB_LOCATION = gl.getAttribLocation(
			this.#DISPLAY_SHADER_PROGRAM,
			'a_texCoord',
		);
		this.#DISPLAY_TEXTURE_UNIFORM_LOCATION = gl.getUniformLocation(
			this.#DISPLAY_SHADER_PROGRAM,
			'u_texture',
		);

		const quadVertices = new Float32Array([
			-1, -1, 0, 0, 1, -1, 1, 0, -1, 1, 0, 1, -1, 1, 0, 1, 1, -1, 1, 0, 1, 1, 1,
			1,
		]);
		this.#DISPLAY_QUAD_VBO = gl.createBuffer();

		// Setup VAO
		this.#DISPLAY_QUAD_VAO = gl.createVertexArray();
		gl.bindVertexArray(this.#DISPLAY_QUAD_VAO);

		gl.bindBuffer(gl.ARRAY_BUFFER, this.#DISPLAY_QUAD_VBO);
		gl.bufferData(gl.ARRAY_BUFFER, quadVertices, gl.STATIC_DRAW);

		gl.enableVertexAttribArray(this.#DISPLAY_POSITION_ATTRIB_LOCATION);
		gl.vertexAttribPointer(
			this.#DISPLAY_POSITION_ATTRIB_LOCATION,
			2,
			gl.FLOAT,
			false,
			4 * Float32Array.BYTES_PER_ELEMENT,
			0,
		);

		gl.enableVertexAttribArray(this.#DISPLAY_TEX_COORD_ATTRIB_LOCATION);
		gl.vertexAttribPointer(
			this.#DISPLAY_TEX_COORD_ATTRIB_LOCATION,
			2,
			gl.FLOAT,
			false,
			4 * Float32Array.BYTES_PER_ELEMENT,
			2 * Float32Array.BYTES_PER_ELEMENT,
		);

		gl.bindBuffer(gl.ARRAY_BUFFER, null); // Unbind VBO from current VAO config
		gl.bindVertexArray(null); // Unbind VAO
	}

	#compileShader(type, source) {
		const gl = this.#GL;
		const shader = gl.createShader(type);
		gl.shaderSource(shader, source);
		gl.compileShader(shader);
		if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
			ApplicationLogger.warn(
				`RenderSurface: An error occurred compiling the display shaders: ${gl.getShaderInfoLog(shader)}`,
			);
			gl.deleteShader(shader);
			return null;
		}
		return shader;
	}

	// __________________________________________________________________ Render

	beginRender(r = 0, g = 0, b = 0, a = 0) {
		if (!this.#GL || !this.#FRAMEBUFFER) return;
		const gl = this.#GL;
		gl.bindFramebuffer(gl.FRAMEBUFFER, this.#FRAMEBUFFER);
		gl.viewport(0, 0, this.width, this.height);
		gl.clearColor(r, g, b, a);
		gl.clear(gl.COLOR_BUFFER_BIT);
	}

	endRender() {
		if (!this.#GL) return;
		this.#GL.bindFramebuffer(this.#GL.FRAMEBUFFER, null);
	}

	render() {
		ApplicationLogger.log(
			'RenderSurface: render() called. Drawing a 10x10 red square at a random position.',
			this.#LOG_LEVEL,
		);

		if (!this.#GL) return;

		const squareSize = 10;
		const maxX = this.width - squareSize;
		const maxY = this.height - squareSize;

		if (maxX < 0 || maxY < 0) {
			ApplicationLogger.warn(
				'RenderSurface: Canvas too small to draw test square.',
			);
			return;
		}

		const randomX = Math.floor(Math.random() * (maxX + 1));
		const randomY = Math.floor(Math.random() * (maxY + 1));

		const squareData = new Uint8Array(squareSize * squareSize * 4);
		for (let i = 0; i < squareSize * squareSize; i++) {
			squareData[i * 4 + 0] = 255;
			squareData[i * 4 + 1] = 0;
			squareData[i * 4 + 2] = 0;
			squareData[i * 4 + 3] = 255;
		}

		this.setTextureData(randomX, randomY, squareSize, squareSize, squareData);
	}

	/**
	 * Draws the surface's texture to its canvas (the default framebuffer).
	 */
	displayOnCanvas() {
		if (
			!this.#GL ||
			!this.#DISPLAY_SHADER_PROGRAM ||
			!this.#TEXTURE ||
			!this.#DISPLAY_QUAD_VAO
		)
			return;

		const gl = this.#GL;
		gl.bindFramebuffer(gl.FRAMEBUFFER, null);
		gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);

		gl.useProgram(this.#DISPLAY_SHADER_PROGRAM);
		gl.bindVertexArray(this.#DISPLAY_QUAD_VAO); // Bind VAO

		gl.activeTexture(gl.TEXTURE0);
		gl.bindTexture(gl.TEXTURE_2D, this.#TEXTURE);
		gl.uniform1i(this.#DISPLAY_TEXTURE_UNIFORM_LOCATION, 0);

		gl.drawArrays(gl.TRIANGLES, 0, 6);

		gl.bindVertexArray(null); // Unbind VAO
		gl.bindTexture(gl.TEXTURE_2D, null); // Unbind texture
	}

	// ____________________________________________________________ Texture Data

	getTextureData(x, y, width, height) {
		if (!this.#GL || !this.#FRAMEBUFFER) return null;
		if (x < 0 || y < 0 || x + width > this.width || y + height > this.height) {
			ApplicationLogger.warn(
				'RenderSurface: getTextureData called with out-of-bounds coordinates.',
			);
			return null;
		}

		const gl = this.#GL;
		const buffer = new Uint8Array(width * height * 4);

		gl.bindFramebuffer(gl.FRAMEBUFFER, this.#FRAMEBUFFER);

		const yGL = this.height - (y + height);
		gl.readPixels(x, yGL, width, height, gl.RGBA, gl.UNSIGNED_BYTE, buffer);

		gl.bindFramebuffer(gl.FRAMEBUFFER, null);
		return buffer;
	}

	setTextureData(x, y, width, height, data) {
		if (!this.#GL || !this.#TEXTURE) return;
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

	// ____________________________________________________________________ Size

	setSize(newWidth, newHeight) {
		if (newWidth === this.width && newHeight === this.height) {
			return; // No change
		}

		ApplicationLogger.log(
			`RenderSurface: Resizing from ${this.width}x${this.height} to ${newWidth}x${newHeight}`,
			this.#LOG_LEVEL,
		);

		this.width = newWidth;
		this.height = newHeight;

		if (this.#CANVAS) {
			this.#CANVAS.width = this.width;
			this.#CANVAS.height = this.height;
		}

		if (!this.#GL) {
			ApplicationLogger.warn(
				'RenderSurface: setSize called, but GL context not available. Canvas resized, GL resources not updated.',
			);
			return;
		}

		const gl = this.#GL;

		// Recreate Texture
		if (this.#TEXTURE) {
			gl.deleteTexture(this.#TEXTURE);
		}
		this.#TEXTURE = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, this.#TEXTURE);
		gl.texImage2D(
			gl.TEXTURE_2D,
			0,
			gl.RGBA,
			this.width,
			this.height,
			0,
			gl.RGBA,
			gl.UNSIGNED_BYTE,
			null,
		);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

		// Recreate Framebuffer
		if (this.#FRAMEBUFFER) {
			gl.deleteFramebuffer(this.#FRAMEBUFFER);
		}
		this.#FRAMEBUFFER = gl.createFramebuffer();
		gl.bindFramebuffer(gl.FRAMEBUFFER, this.#FRAMEBUFFER);
		gl.framebufferTexture2D(
			gl.FRAMEBUFFER,
			gl.COLOR_ATTACHMENT0,
			gl.TEXTURE_2D,
			this.#TEXTURE,
			0,
		);

		const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
		if (status !== gl.FRAMEBUFFER_COMPLETE) {
			ApplicationLogger.warn(
				`RenderSurface: Framebuffer incomplete after resize: ${status.toString(16)}`,
			);
		}

		// Unbind
		gl.bindTexture(gl.TEXTURE_2D, null);
		gl.bindFramebuffer(gl.FRAMEBUFFER, null);

		ApplicationLogger.log(
			'RenderSurface: Resized successfully.',
			this.#LOG_LEVEL,
		);
	}

	// _________________________________________________________________ Destroy

	destroy() {
		ApplicationLogger.log(
			'RenderSurface: Destroying resources.',
			this.#LOG_LEVEL,
		);
		if (this.#GL) {
			const gl = this.#GL;
			if (this.#FRAMEBUFFER) {
				gl.deleteFramebuffer(this.#FRAMEBUFFER);
				this.#FRAMEBUFFER = null;
			}
			if (this.#TEXTURE) {
				gl.deleteTexture(this.#TEXTURE);
				this.#TEXTURE = null;
			}
			if (this.#DISPLAY_SHADER_PROGRAM) {
				gl.deleteProgram(this.#DISPLAY_SHADER_PROGRAM);
				this.#DISPLAY_SHADER_PROGRAM = null;
			}
			if (this.#DISPLAY_QUAD_VBO) {
				gl.deleteBuffer(this.#DISPLAY_QUAD_VBO);
				this.#DISPLAY_QUAD_VBO = null;
			}
			if (this.#DISPLAY_QUAD_VAO) {
				gl.deleteVertexArray(this.#DISPLAY_QUAD_VAO);
				this.#DISPLAY_QUAD_VAO = null;
			}
		}
		this.#GL = null;
		this.#CANVAS = null;
	}
}
