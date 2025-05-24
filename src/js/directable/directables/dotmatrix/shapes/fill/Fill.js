



namespace UnityTest.UserInterface.DotMatrix.Shapes.Fills
{
    static class Fill
    {
        static Apply(FillType fillType,
                                 List<Vector2Int> positionGrids,
                                 int gridWidth = 0,
                                 int gridHeight = 0)
        {
            switch (fillType)
            {
                case FillType.PassThrough:
                    // Do Nothing
                    break;
                case FillType.Random:
                    // Randomize
                    ApplyRandom(positionGrids);
                    break;
                case FillType.Border:
                    // Border
                    ApplyBorder(positionGrids, gridWidth, gridHeight);
                    break;
            }

        }

        // ______________________________________________________________ Random

        private static ApplyRandom(List<Vector2Int> positionGrids)
        {
            List<Vector2Int> itemsToRemove = new List<Vector2Int>();

            // Remove Randomly
            foreach (var positionGrid in positionGrids)
            {
                if (Random.value < 0.5f)
                {
                    itemsToRemove.Add(positionGrid);
                }
            }

            foreach (var item in itemsToRemove)
            {
                positionGrids.Remove(item);
            }
        }

        // ______________________________________________________________ Border

        private static ApplyBorder(List<Vector2Int> positionGrids,
                                        int gridWidth,
                                        int gridHeight)
        {
            List<Vector2Int> itemsToRemove = new List<Vector2Int>();

            int xSmallest = int.MaxValue;
            int ySmallest = int.MaxValue;

            foreach (var positionGrid in positionGrids)
            {
                if (positionGrid.x < xSmallest)
                {
                    xSmallest = positionGrid.x;
                }

                if (positionGrid.y < ySmallest)
                {
                    ySmallest = positionGrid.y;
                }
            }

            // Remove if Not Border
            foreach (var positionGrid in positionGrids)
            {
                if (positionGrid.x != xSmallest &&
                    positionGrid.x != xSmallest + gridWidth - 1 &&
                    positionGrid.y != ySmallest &&
                    positionGrid.y != ySmallest + gridHeight - 1)
                {
                    itemsToRemove.Add(positionGrid);
                }
            }

            foreach (var item in itemsToRemove)
            {
                positionGrids.Remove(item);
            }
        }
    }
}