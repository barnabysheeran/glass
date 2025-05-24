




namespace UnityTest.UserInterface.DotMatrix.Shapes.Lines
{
    public class ShapeLineHorizontal : Shape
    {
        // _____________________________________________________________________

        public ShapeLineHorizontal(DotManager dotManager,
                                   int gridX, int gridY,
                                   int gridLength,
                                   FillType fillType = FillType.PassThrough,
                                   FillStrategyType fillStrategyType = FillStrategyType.PassThrough)
            : base(dotManager)
        {
            // Store Initial Position Grids
            for (int i = 0; i < gridLength; i++)
            {
                m_positionGrids.Add(new Vector2Int(gridX + i, gridY));
            }

            // Fill Type
            Fill.Apply(fillType, m_positionGrids, gridLength, 1);

            // Fill Strategy Type
            FillStrategy.Apply(fillStrategyType, m_positionGrids);
        }
    }
}
