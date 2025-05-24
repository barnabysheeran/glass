





namespace UnityTest.UserInterface.DotMatrix.Dots
{
    export default class DotManager
    {
        private List<Dot> #dots;
        private int #dotPoolSize = 512;
        private int #dotPoolIndex = 0;

        // _____________________________________________________________________

        DotManager(GameObject container)
        {
            // Create Dot Pool
            #dots = new List<Dot>();

            for (int i = 0; i < #dotPoolSize; i++)
            {
                Dot dot = new Dot(i, container);
                #dots.Add(dot);
            }
        }

        // ______________________________________________________________ Update

        // Update()
        // {
        //     // foreach (Dot dot in #dots)
        //     // {
        //     //     dot.Update();
        //     // }
        // }

        // ____________________________________________________________ Dot Pool

        int GetNextFreeDotIndex()
        {
            int index = #dotPoolIndex;

            // Next
            #dotPoolIndex++;

            // Recycle from Start of Pool
            if (#dotPoolIndex >= #dotPoolSize)
            {
                #dotPoolIndex = 0;
            }

            return index;
        }

        // ____________________________________________________________ Position

        SetDotPosition(int dotIndex, Vector2Int positionGrid)
        {
            // Get Dot
            Dot dot = #dots[dotIndex];

            // Set Position
            dot.SetPosition(GridData.GetGridPixelPosition(positionGrid));
        }

        // ________________________________________________________________ Fill

        FillDot(int dotIndex)
        {
            // Get Dot
            Dot dot = #dots[dotIndex];

            // Fill
            dot.Fill();
        }

        // _______________________________________________________________ Clear

        ClearDot(int dotIndex)
        {
            // Get Dot
            Dot dot = #dots[dotIndex];

            // Clear
            dot.Clear();
        }

        // ______________________________________________________________ Status

        LogStatus()
        {
            Debug.Log("DotManager. Index " + #dotPoolIndex + " of " + #dotPoolSize + " Dots");
        }
    }
}