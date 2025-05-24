




namespace UnityTest.UserInterface.DotMatrix.Shapes.Primitives
{
    public class ShapeRectangle : Shape
    {
        // _____________________________________________________________________

        public ShapeRectangle(DotManager dotManager,
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
                    m_positionGrids.Add(new Vector2Int(gridX + w, gridY + h));
                }
            }

            // Fill Type
            Fill.Apply(fillType, m_positionGrids, gridWidth, gridHeight);

            // Fill Strategy Type
            FillStrategy.Apply(fillStrategyType, m_positionGrids);
        }
    }
}
