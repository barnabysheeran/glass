using System.Collections.Generic;
using UnityEngine;

using UnityTest.UserInterface.DotMatrix.Dots;
using UnityTest.UserInterface.DotMatrix.Shapes.Fills;

namespace UnityTest.UserInterface.DotMatrix.Shapes.Glyphs
{
    public class ShapeGlyph_J : Shape
    {
        private Vector2Int[] m_positionGridGlyphs = new Vector2Int[]
        {
                                                                              new Vector2Int(3, 0),
                                                                              new Vector2Int(3, 1),
                                                                              new Vector2Int(3, 2),
            new Vector2Int(0, 3),                                             new Vector2Int(3, 3),
                                  new Vector2Int(1, 4), new Vector2Int(2, 4),
        };

        private int m_glyphWidth = 4;
        private int m_glyphHeight = 5;

        // _____________________________________________________________________

        public ShapeGlyph_J(DotManager dotManager,
                                   int gridX, int gridY,
                                   FillType fillType = FillType.PassThrough,
                                   FillStrategyType fillStrategyType = FillStrategyType.PassThrough)
            : base(dotManager)
        {
            // Store Initial Position Grids
            for (int x = 0; x < m_glyphWidth; x++)
            {
                for (int y = 0; y < m_glyphHeight; y++)
                {
                    if (getIsFilled(x, y))
                    {
                        m_positionGrids.Add(new Vector2Int(
                            gridX + x,
                            gridY + y
                        ));
                    }
                }
            }

            // Fill Type
            Fill.Apply(fillType, m_positionGrids);

            // Fill Strategy Type
            FillStrategy.Apply(fillStrategyType, m_positionGrids);
        }

        // _____________________________________________________________________

        private bool getIsFilled(int x, int y)
        {
            bool isFilled = false;

            for (int i = 0; i < m_positionGridGlyphs.Length; i++)
            {
                if (m_positionGridGlyphs[i].x == x && m_positionGridGlyphs[i].y == y)
                {
                    Debug.Log("getIsFilled: x: " + x + ", y: " + y);

                    isFilled = true;
                    break;
                }
            }

            return isFilled;
        }
    }
}
