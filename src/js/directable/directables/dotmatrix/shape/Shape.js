





namespace UnityTest.UserInterface.DotMatrix.Shapes
{
    export default class Shape
    {
        DotManager #dotManager;
        List<Vector2Int> #positionGrids = new List<Vector2Int>();
        int #positionGridsIndex = 0;

        bool #isComplete = false;

        // _____________________________________________________________________

        Shape(DotManager dotManager)
        {
            // Store
            #dotManager = dotManager;
        }

        // ______________________________________________________________ Update

        virtual Update()
        {
            // Debug.Log("Shape. Update " + #positionGridsIndex);

            // Complete ?
            if (#isComplete)
            {
                return;
            }

            // Get Dot Index
            int dotIndex = #dotManager.GetNextFreeDotIndex();

            // Clear Current Dot
            #dotManager.ClearDot(dotIndex);

            // if (dotIndex == -1)
            // {
            //     Debug.Log("ShapeLineHorizontal. No more free Dots");
            //     break;
            // }

            // TODO -1 Off Grid ?

            // Position
            #dotManager.SetDotPosition(dotIndex, #positionGrids[#positionGridsIndex]);

            // Fill Dot
            #dotManager.FillDot(dotIndex);

            // Increment Index
            #positionGridsIndex++;

            // Check Complete
            if (#positionGridsIndex >= #positionGrids.Count)
            {
                #isComplete = true;
                return;
            }
        }
    }
}