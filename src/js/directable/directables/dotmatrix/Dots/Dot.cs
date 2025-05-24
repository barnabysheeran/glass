using UnityEngine;
using UnityEngine.UIElements;
using UnityTest.UserInterface.DotMatrix.Grid;

namespace UnityTest.UserInterface.DotMatrix.Dots
{
    public class Dot
    {
        private GameObject m_go;
        private SpriteRenderer m_spriteRenderer;
        private Sprite m_sprite;
        private Vector3 m_positionWorld = new Vector3(0, 0, 2);

        // _____________________________________________________________________

        public Dot(int dotIndex, GameObject container)
        {
            // Create Game Object
            m_go = new GameObject("DotMatrix_" + dotIndex);
            m_go.layer = LayerMask.NameToLayer("UserInterface");
            m_go.transform.position = new Vector3(0, 0, 0);
            m_go.transform.SetParent(container.transform);

            // Add Sprite Renderer
            m_spriteRenderer = m_go.AddComponent<SpriteRenderer>();

            // Create Sprite
            CreateSprite(new Vector2Int(GridData.GetGridWidth(), GridData.GetGridHeight()));

            // Load Sprite
            // LoadSprite("Sprites/DotMatrix/dot-white-64.png");

            // Start Cleared
            Clear();
        }

        // ______________________________________________________________ Update

        public void Update()
        {

        }

        // __________________________________________________________ Resolution

        public void SetResolution(Vector2Int resolution)
        {
            CreateSprite(resolution);
        }

        // ____________________________________________________________ Position

        public void SetPosition(Vector2 positionPixels)
        {
            // Store
            m_positionWorld.x = positionPixels.x;
            m_positionWorld.y = positionPixels.y;

            // Set
            m_go.transform.position = m_positionWorld;
        }

        // ________________________________________________________________ Fill

        public void Fill()
        {
            m_spriteRenderer.color = Color.white;
        }

        // _______________________________________________________________ Clear

        public void Clear()
        {
            m_spriteRenderer.color = Color.clear;
        }

        // ______________________________________________________________ Sprite

        private void CreateSprite(Vector2Int resolution)
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
            m_sprite = Sprite.Create(texture,
                new Rect(0, 0, resolution.x, resolution.y),
                new Vector2(0.0f, 1.0f));

            m_spriteRenderer.sprite = m_sprite;
        }

        private void LoadSprite(string path)
        {
            // Load sprite from path
            m_sprite = Resources.Load<Sprite>(path);
            m_spriteRenderer.sprite = m_sprite;
        }
    }
}
