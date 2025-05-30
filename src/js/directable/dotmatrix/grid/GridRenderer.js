

namespace UnityTest.UserInterface.DotMatrix.Grid
{
    export default class GridRenderer
    {
        private GameObject #go;
        private GridRendererComponent #gridRendererComponent;

        GridRenderer(GameObject container)
        {
            // Create GameObject
            #go = new GameObject("GridRenderer");
            #go.transform.SetParent(container.transform);

            // Create Component
            #gridRendererComponent = #go.AddComponent<GridRendererComponent>();
        }

        SetResolution(Vector2Int resolution)
        {
            #gridRendererComponent.SetResolution(resolution);
        }

        // Update()
        // {
        // }
    }
}
