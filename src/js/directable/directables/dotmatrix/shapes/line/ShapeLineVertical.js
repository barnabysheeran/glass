




namespace UnityTest.UserInterface.DotMatrix.Shapes.Lines
{
    public class ShapeLineVertical : Shape
    {
        // _____________________________________________________________________

        public ShapeLineVertical(DotManager dotManager,
                                 int gridX, int gridY,
                                 int length,
                                 FillType fillType,
                                 FillStrategyType fillStrategyType)
            : base(dotManager)
        {
            // Store Initial Position Grids
            for (int i = 0; i < length; i++)
            {
                m_positionGrids.Add(new Vector2Int(gridX, gridY + i));
            }

            // Fill Type
            Fill.Apply(fillType, m_positionGrids);

            // Fill Strategy Type
            FillStrategy.Apply(fillStrategyType, m_positionGrids);
        }
    }
}
