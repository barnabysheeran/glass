
using UnityEngine;
using UnityTest.Display;

namespace UnityTest.UserInterface.DotMatrix.Grid
{
    public static class GridData
    {
        private static int m_gridWidth = 16;
        private static int m_gridHeight = 16;

        private static int m_resolutionWidth = 0;
        private static int m_resolutionHeight = 0;
        private static float m_resolutionAspect = 0.0f;

        private static float m_pixelWidth = 0.0f;
        private static float m_pixelHeight = 0.0f;

        private static float m_cameraOrthographicSizeDoubled = 10.0f;
        // TODO Repeated CameraUserInterfaceSize

        // __________________________________________________________ Initialize

        public static void Initialize()
        {
            SetResolution(DisplayController.GetResolution());
        }

        // ________________________________________________________________ Grid

        public static Vector2 GetGridPixelPosition(Vector2Int positionGrid)
        {
            float x = -m_cameraOrthographicSizeDoubled;
            float y = m_cameraOrthographicSizeDoubled / m_resolutionAspect;

            x += positionGrid.x * m_pixelWidth * m_gridWidth;
            y += positionGrid.y * m_pixelHeight * -m_gridHeight;

            return new Vector2(x, y);
        }

        public static int GetGridWidth()
        {
            return m_gridWidth;
        }

        public static int GetGridHeight()
        {
            return m_gridHeight;
        }

        // ____________________________________________________________ Max Grid

        public static Vector2Int GetGridMax()
        {
            return new Vector2Int(
                (m_resolutionWidth / m_gridWidth * 2),
                (m_resolutionHeight / m_gridHeight * 2) - 1
            );
        }

        public static Vector2Int GetGridMaxHalf()
        {
            return new Vector2Int(
                (m_resolutionWidth / m_gridWidth),
                (m_resolutionHeight / m_gridHeight) - 1
            );
        }

        // __________________________________________________________ Resolution

        public static void SetResolution(Vector2Int resolution)
        {
            // Store
            m_resolutionWidth = resolution.x;
            m_resolutionHeight = resolution.y;
            m_resolutionAspect = (float)resolution.x / (float)resolution.y;

            // Calculate Pixel Size
            m_pixelWidth = m_cameraOrthographicSizeDoubled / (float)resolution.x;
            m_pixelHeight = m_pixelWidth; // TODO Check
        }
    }
}