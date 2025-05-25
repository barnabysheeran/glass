




namespace UnityTest.UserInterface.DotMatrix.Shapes.Lines
{
    export default class ShapeLineHorizontal : Shape
    {
        // _____________________________________________________________________

        ShapeLineHorizontal(DotManager dotManager,
                                   int gridX, int gridY,
                                   int gridLength,
                                   FillType fillType = FillType.PassThrough,
                                   FillStrategyType fillStrategyType = FillStrategyType.PassThrough)
            : base(dotManager)
        {
            // Store Initial Position Grids
            for (int i = 0; i < gridLength; i++)
            {
                #positionGrids.Add(new Vector2Int(gridX + i, gridY));
            }

            // Fill Type
            Fill.Apply(fillType, #positionGrids, gridLength, 1);

            // Fill Strategy Type
            FillStrategy.Apply(fillStrategyType, #positionGrids);
        }
    }
}
