export default class Dot {
	// private GameObject #go;
	// private SpriteRenderer #spriteRenderer;
	// private Sprite #sprite;
	// private Vector3 #positionWorld = new Vector3(0, 0, 2);

	// _________________________________________________________________________

	dot(dotIndex, container) {
		// // Create Game Object
		// #go = new GameObject("DotMatrix_" + dotIndex);
		// #go.layer = LayerMask.NameToLayer("UserInterface");
		// #go.transform.position = new Vector3(0, 0, 0);
		// #go.transform.SetParent(container.transform);
		// // Add Sprite Renderer
		// #spriteRenderer = #go.AddComponent<SpriteRenderer>();
		// // Create Sprite
		// CreateSprite(new Vector2Int(GridData.GetGridWidth(), GridData.GetGridHeight()));
		// // Load Sprite
		// // LoadSprite("Sprites/DotMatrix/dot-white-64.png");
		// // Start Cleared
		// Clear();
	}

	// __________________________________________________________________ Update

	update() {}

	// ______________________________________________________________ Resolution

	setResolution(resolution) {
		// CreateSprite(resolution);
	}

	// ________________________________________________________________ Position

	setPosition(positionPixels) {
		// // Store
		// #positionWorld.x = positionPixels.x;
		// #positionWorld.y = positionPixels.y;
		// // Set
		// #go.transform.position = #positionWorld;
	}

	// ____________________________________________________________________ Fill

	fill() {
		// #spriteRenderer.color = Color.white;
	}

	// ___________________________________________________________________ Clear

	clear() {
		// #spriteRenderer.color = Color.clear;
	}

	// __________________________________________________________________ Sprite

	#createSprite(resolution) {
		// // Create a new texture with the specified resolution
		// Texture2D texture = new Texture2D(resolution.x, resolution.y);
		// texture.filterMode = FilterMode.Point;
		// // Fill with white pixels initially
		// Color[] pixels = new Color[resolution.x * resolution.y];
		// for (int i = 0; i < pixels.Length; i++)
		//     pixels[i] = Color.white;
		// texture.SetPixels(pixels);
		// texture.Apply();
		// // Create and assign sprite
		// #sprite = Sprite.Create(texture,
		//     new Rect(0, 0, resolution.x, resolution.y),
		//     new Vector2(0.0, 1.0));
		// #spriteRenderer.sprite = #sprite;
	}

	#loadSprite(path) {
		// // Load sprite from path
		// #sprite = Resources.Load<Sprite>(path);
		// #spriteRenderer.sprite = #sprite;
	}
}
