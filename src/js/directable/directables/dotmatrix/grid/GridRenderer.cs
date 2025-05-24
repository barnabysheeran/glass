using UnityEngine;

namespace UnityTest.UserInterface.DotMatrix.Grid
{
    public class GridRenderer
    {
        private GameObject m_go;
        private GridRendererComponent m_gridRendererComponent;

        public GridRenderer(GameObject container)
        {
            // Create GameObject
            m_go = new GameObject("GridRenderer");
            m_go.transform.SetParent(container.transform);

            // Create Component
            m_gridRendererComponent = m_go.AddComponent<GridRendererComponent>();
        }

        public void SetResolution(Vector2Int resolution)
        {
            m_gridRendererComponent.SetResolution(resolution);
        }

        // public void Update()
        // {
        // }
    }
}
