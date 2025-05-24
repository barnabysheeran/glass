



namespace UnityTest.UserInterface.DotMatrix.Shapes.Fills
{
    public static class FillStrategy
    {
        public static void Apply(FillStrategyType fillType,
                                 List<Vector2Int> positionGrids)
        {
            switch (fillType)
            {
                case FillStrategyType.PassThrough:
                    // Do Nothing
                    break;
                case FillStrategyType.Reverse:
                    // Reverse
                    positionGrids.Reverse();
                    break;
                case FillStrategyType.Random:
                    // Randomize
                    ApplyRandom(positionGrids);
                    break;
            }
        }

        // ______________________________________________________________ Random

        private static void ApplyRandom(List<Vector2Int> positionGrids)
        {
            // Randomize positionGrid order
            for (int i = 0; i < positionGrids.Count; i++)
            {
                int randomIndex = Random.Range(0, positionGrids.Count);
                Vector2Int temp = positionGrids[i];
                positionGrids[i] = positionGrids[randomIndex];
                positionGrids[randomIndex] = temp;
            }
        }
    }
}