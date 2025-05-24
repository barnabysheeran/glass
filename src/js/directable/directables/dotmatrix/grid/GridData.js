



namespace UnityTest.UserInterface.DotMatrix.Grid
{
    static class GridData
    {
        private static int #gridWidth = 16;
        private static int #gridHeight = 16;

        private static int #resolutionWidth = 0;
        private static int #resolutionHeight = 0;
        private static float #resolutionAspect = 0.0f;

        private static float #pixelWidth = 0.0f;
        private static float #pixelHeight = 0.0f;

        private static float #cameraOrthographicSizeDoubled = 10.0f;
        // TODO Repeated CameraUserInterfaceSize

        // __________________________________________________________ Initialize

        static Initialize()
        {
            SetResolution(DisplayController.GetResolution());
        }

        // ________________________________________________________________ Grid

        static Vector2 GetGridPixelPosition(Vector2Int positionGrid)
        {
            float x = -#cameraOrthographicSizeDoubled;
            float y = #cameraOrthographicSizeDoubled / #resolutionAspect;

            x += positionGrid.x * #pixelWidth * #gridWidth;
            y += positionGrid.y * #pixelHeight * -#gridHeight;

            return new Vector2(x, y);
        }

        static int GetGridWidth()
        {
            return #gridWidth;
        }

        static int GetGridHeight()
        {
            return #gridHeight;
        }

        // ____________________________________________________________ Max Grid

        static Vector2Int GetGridMax()
        {
            return new Vector2Int(
                (#resolutionWidth / #gridWidth * 2),
                (#resolutionHeight / #gridHeight * 2) - 1
            );
        }

        static Vector2Int GetGridMaxHalf()
        {
            return new Vector2Int(
                (#resolutionWidth / #gridWidth),
                (#resolutionHeight / #gridHeight) - 1
            );
        }

        // __________________________________________________________ Resolution

        static SetResolution(Vector2Int resolution)
        {
            // Store
            #resolutionWidth = resolution.x;
            #resolutionHeight = resolution.y;
            #resolutionAspect = (float)resolution.x / (float)resolution.y;

            // Calculate Pixel Size
            #pixelWidth = #cameraOrthographicSizeDoubled / (float)resolution.x;
            #pixelHeight = #pixelWidth; // TODO Check
        }
    }
}