




namespace UnityTest.UserInterface.DotMatrix.Shapes.Primitives
{
    export default class ShapeRectangle : Shape
    {
        // _____________________________________________________________________

        ShapeRectangle(DotManager dotManager,
                              int gridX, int gridY,
                              int gridWidth, int gridHeight,
                              FillType fillType,
                              FillStrategyType fillStrategyType)
            : base(dotManager)
        {
            // Store Initial Position Grids
            for (int w = 0; w < gridWidth; w++)
            {
                for (int h = 0; h < gridHeight; h++)
                {
                    #positionGrids.Add(new Vector2Int(gridX + w, gridY + h));
                }
            }

            // Fill Type
            Fill.Apply(fillType, #positionGrids, gridWidth, gridHeight);

            // Fill Strategy Type
            FillStrategy.Apply(fillStrategyType, #positionGrids);
        }
    }
}
