


namespace UnityTest.UserInterface.DotMatrix.Views
{
    public class View
    {
        public ShapeManager m_shapeManager;

        // _____________________________________________________________________

        public View(ShapeManager shapeManager)
        {
            // Store
            m_shapeManager = shapeManager;
        }

        // ______________________________________________________________ Update

        public virtual void Update()
        {
            m_shapeManager.Update();
        }
    }
}