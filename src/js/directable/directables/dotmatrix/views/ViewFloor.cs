
using UnityTest.UserInterface.DotMatrix.Shapes;
using UnityTest.UserInterface.DotMatrix.Shapes.Fills;

using UnityEngine;
using UnityTest.UserInterface.DotMatrix.Grid;
using System.Numerics;

namespace UnityTest.UserInterface.DotMatrix.Views
{
    public class ViewFloor : View
    {
        // _____________________________________________________________________

        public ViewFloor(ShapeManager shapeManager) : base(shapeManager)
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
                m_shapeManager.AddShapeLineHorizontal(
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

        public override void Update()
        {
            base.Update();
        }
    }
}