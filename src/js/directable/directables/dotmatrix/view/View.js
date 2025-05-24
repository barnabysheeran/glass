


namespace UnityTest.UserInterface.DotMatrix.Views
{
    export default class View
    {
        ShapeManager #shapeManager;

        // _____________________________________________________________________

        View(ShapeManager shapeManager)
        {
            // Store
            #shapeManager = shapeManager;
        }

        // ______________________________________________________________ Update

        virtual Update()
        {
            #shapeManager.Update();
        }
    }
}