
using UnityEngine.UIElements;


namespace UnityTest.UserInterface.DotMatrix.Dots
{
    export default class Dot
    {
        private GameObject #go;
        private SpriteRenderer #spriteRenderer;
        private Sprite #sprite;
        private Vector3 #positionWorld = new Vector3(0, 0, 2);

        // _____________________________________________________________________

        Dot(int dotIndex, GameObject container)
        {
            // Create Game Object
            #go = new GameObject("DotMatrix_" + dotIndex);
            #go.layer = LayerMask.NameToLayer("UserInterface");
            #go.transform.position = new Vector3(0, 0, 0);
            #go.transform.SetParent(container.transform);

            // Add Sprite Renderer
            #spriteRenderer = #go.AddComponent<SpriteRenderer>();

            // Create Sprite
            CreateSprite(new Vector2Int(GridData.GetGridWidth(), GridData.GetGridHeight()));

            // Load Sprite
            // LoadSprite("Sprites/DotMatrix/dot-white-64.png");

            // Start Cleared
            Clear();
        }

        // ______________________________________________________________ Update

        Update()
        {

        }

        // __________________________________________________________ Resolution

        SetResolution(Vector2Int resolution)
        {
            CreateSprite(resolution);
        }

        // ____________________________________________________________ Position

        SetPosition(Vector2 positionPixels)
        {
            // Store
            #positionWorld.x = positionPixels.x;
            #positionWorld.y = positionPixels.y;

            // Set
            #go.transform.position = #positionWorld;
        }

        // ________________________________________________________________ Fill

        Fill()
        {
            #spriteRenderer.color = Color.white;
        }

        // _______________________________________________________________ Clear

        Clear()
        {
            #spriteRenderer.color = Color.clear;
        }

        // ______________________________________________________________ Sprite

        private CreateSprite(Vector2Int resolution)
        {
            // Create a new texture with the specified resolution
            Texture2D texture = new Texture2D(resolution.x, resolution.y);
            texture.filterMode = FilterMode.Point;

            // Fill with white pixels initially
            Color[] pixels = new Color[resolution.x * resolution.y];
            for (int i = 0; i < pixels.Length; i++)
                pixels[i] = Color.white;

            texture.SetPixels(pixels);
            texture.Apply();

            // Create and assign sprite
            #sprite = Sprite.Create(texture,
                new Rect(0, 0, resolution.x, resolution.y),
                new Vector2(0.0f, 1.0f));

            #spriteRenderer.sprite = #sprite;
        }

        private LoadSprite(string path)
        {
            // Load sprite from path
            #sprite = Resources.Load<Sprite>(path);
            #spriteRenderer.sprite = #sprite;
        }
    }
}
