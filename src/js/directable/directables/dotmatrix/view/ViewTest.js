






namespace UnityTest.UserInterface.DotMatrix.Views
{
    public class ViewTest : View
    {
        // _____________________________________________________________________

        public ViewTest(ShapeManager shapeManager) : base(shapeManager)
        {
            Vector2Int gridMax = GridData.GetGridMax();
            Vector2Int gridMaxHalf = GridData.GetGridMaxHalf();

            // Debug.Log("ViewTest: gridMax: " + gridMax);

            // int blockWidth = gridMaxHalf.x;
            // int blockHeight = gridMaxHalf.y;

            int lineWidth = gridMaxHalf.x - 2;

            // 
            // m_shapeManager.AddShapeLineHorizontal(1, 1, gridMax.x - 2, FillType.PassThrough, FillStrategyType.PassThrough);

            // Top Left
            m_shapeManager.AddShapeLineHorizontal(1, 1, lineWidth, FillType.PassThrough, FillStrategyType.PassThrough);
            m_shapeManager.AddShapeLineHorizontal(1, gridMaxHalf.y - 1, lineWidth, FillType.PassThrough, FillStrategyType.PassThrough);

            // Top Right
            // m_shapeManager.AddShapeLineHorizontal(gridMaxHalf.x + 1, 1, lineWidth, FillType.PassThrough, FillStrategyType.PassThrough);
            // m_shapeManager.AddShapeLineHorizontal(gridMaxHalf.x + 1, gridMaxHalf.y - 1, lineWidth, FillType.PassThrough, FillStrategyType.PassThrough);

            // Bottom Left
            // m_shapeManager.AddShapeLineHorizontal(1, gridMaxHalf.y + 2, lineWidth, FillType.PassThrough, FillStrategyType.PassThrough);
            // m_shapeManager.AddShapeLineHorizontal(1, gridMax.y - 1, lineWidth, FillType.PassThrough, FillStrategyType.PassThrough);

            // Bottom Right
            // m_shapeManager.AddShapeLineHorizontal(gridMaxHalf.x + 1, gridMaxHalf.y + 2, lineWidth, FillType.PassThrough, FillStrategyType.PassThrough);
            // m_shapeManager.AddShapeLineHorizontal(gridMaxHalf.x + 1, gridMax.y - 1, lineWidth, FillType.PassThrough, FillStrategyType.PassThrough);
        }

        // ______________________________________________________________ Update

        public override void Update()
        {
            base.Update();

            Vector2Int gridMax = GridData.GetGridMax();

            int randomChance = Random.Range(0, 500);
            int randomRow = Random.Range(1, gridMax.y - 1);

            if (randomChance < 1)
            {
                m_shapeManager.AddShapeLineHorizontal(1, randomRow, gridMax.x - 2, FillType.PassThrough, FillStrategyType.PassThrough);
            }
        }
    }
}