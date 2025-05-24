using System.Collections.Generic;

using UnityEngine;

using UnityTest.Display;
using UnityTest.UserInterface.DotMatrix.Dots;
using UnityTest.UserInterface.DotMatrix.Grid;
using UnityTest.UserInterface.DotMatrix.Shapes;

namespace UnityTest.UserInterface.DotMatrix.Views
{
    public class ViewManager
    {
        // private GridRenderer m_gridRenderer;
        private DotManager m_dotManager;
        private ShapeManager m_shapeManager;
        private List<View> m_views = new List<View>();

        // _____________________________________________________________________

        public ViewManager(GameObject container)
        {
            // Initialize Grid Data
            GridData.Initialize();

            // DEV
            // m_gridRenderer = new GridRenderer(container);

            // Create Dot Manager
            m_dotManager = new DotManager(container);

            // Create Shape Manager
            m_shapeManager = new ShapeManager(m_dotManager);

            // Dev - Create View Test
            ViewTest viewTest = new ViewTest(m_shapeManager);
            m_views.Add(viewTest);

            ViewFloor viewFloor = new ViewFloor(m_shapeManager);
            m_views.Add(viewFloor);

            ViewTextTest viewTextTest = new ViewTextTest(m_shapeManager);
            m_views.Add(viewTextTest);

            // Set Initial Resolution
            SetResolution(DisplayController.GetResolution());
        }

        // ______________________________________________________________ Update

        public void Update()
        {
            // Update All Views
            for (int i = 0; i < m_views.Count; i++)
            {
                m_views[i].Update();
            }
        }

        // __________________________________________________________ Resolution

        public void SetResolution(Vector2Int resolution)
        {
            Debug.Log("ViewManager.SetResolution: " + resolution);

            // Set Resolution
            GridData.SetResolution(resolution);

            // DEV
            // m_gridRenderer.SetResolution(resolution);

            // m_textureWrapper.SetResolution(resolution);
            m_shapeManager.SetResolution(resolution);
        }
    }
}