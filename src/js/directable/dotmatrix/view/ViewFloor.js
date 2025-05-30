





using System.Numerics;

namespace UnityTest.UserInterface.DotMatrix.Views
{
    export default class ViewFloor : View
    {
        // _____________________________________________________________________

        ViewFloor(ShapeManager shapeManager) : base(shapeManager)
        {
            Vector2Int gridMaxHalf = GridData.GetGridMaxHalf();

            // Debug.Log("ViewTest: gridMax: " + gridMax);

            int lineTotal = 3;

            int x = gridMaxHalf.x + 1;
            int xOffset = 1;

            int y = gridMaxHalf.y - 1;
            int yOffset = -5;

            for (int i = 0; i < lineTotal; i += 1)
            {
                #shapeManager.AddShapeLineHorizontal(
                    x + xOffset,
                    y + yOffset,
                    gridMaxHalf.x - 1 - xOffset * 2,
                    FillType.PassThrough,
                    FillStrategyType.PassThrough);

                // Next
                xOffset += 2;
                yOffset -= 2;
            }
        }

        // ______________________________________________________________ Update

        override Update()
        {
            base.Update();
        }
    }
}