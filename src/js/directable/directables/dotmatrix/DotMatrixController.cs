using UnityEngine;

using UnityTest.UserInterface.DotMatrix.Views;

namespace UnityTest.UserInterface.DotMatrix
{
    public class DotMatrixController
    {
        private GameObject m_go;
        private ViewManager m_viewManager;

        // _____________________________________________________________________

        public DotMatrixController(GameObject container)
        {
            // Create Game Object
            m_go = new GameObject("DotMatrix");
            m_go.layer = LayerMask.NameToLayer("UserInterface");
            m_go.transform.position = Vector3.zero;
            m_go.transform.SetParent(container.transform);

            // Create View Manager
            m_viewManager = new ViewManager(m_go);
        }

        // ______________________________________________________________ Update

        public void Update()
        {
            m_viewManager.Update();
        }

        // __________________________________________________________ Resolution

        public void SetResolution(Vector2Int resolution)
        {
            m_viewManager.SetResolution(resolution);
        }
    }
}
