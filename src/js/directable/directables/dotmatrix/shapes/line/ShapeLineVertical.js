




namespace UnityTest.UserInterface.DotMatrix.Shapes.Lines
{
    export default class ShapeLineVertical : Shape
    {
        // _____________________________________________________________________

        ShapeLineVertical(DotManager dotManager,
                                 int gridX, int gridY,
                                 int length,
                                 FillType fillType,
                                 FillStrategyType fillStrategyType)
            : base(dotManager)
        {
            // Store Initial Position Grids
            for (int i = 0; i < length; i++)
            {
                #positionGrids.Add(new Vector2Int(gridX, gridY + i));
            }

            // Fill Type
            Fill.Apply(fillType, #positionGrids);

            // Fill Strategy Type
            FillStrategy.Apply(fillStrategyType, #positionGrids);
        }
    }
}
