




namespace UnityTest.UserInterface.DotMatrix.Shapes.Glyphs
{
    export default class ShapeGlyph_A : Shape
    {
        private Vector2Int[] #positionGridGlyphs = new Vector2Int[]
        {
                                  new Vector2Int(1, 0), new Vector2Int(2, 0),
            new Vector2Int(0, 1),                                             new Vector2Int(3, 1),
            new Vector2Int(0, 2), new Vector2Int(1, 2), new Vector2Int(2, 2), new Vector2Int(3, 2),
            new Vector2Int(0, 3),                                             new Vector2Int(3, 3),
            new Vector2Int(0, 4),                                             new Vector2Int(3, 4),
        };

        private int #glyphWidth = 4;
        private int #glyphHeight = 5;

        // _____________________________________________________________________

        ShapeGlyph_A(DotManager dotManager,
                                   int gridX, int gridY,
                                   FillType fillType = FillType.PassThrough,
                                   FillStrategyType fillStrategyType = FillStrategyType.PassThrough)
            : base(dotManager)
        {
            // Store Initial Position Grids
            for (int x = 0; x < #glyphWidth; x++)
            {
                for (int y = 0; y < #glyphHeight; y++)
                {
                    if (getIsFilled(x, y))
                    {
                        #positionGrids.Add(new Vector2Int(
                            gridX + x,
                            gridY + y
                        ));
                    }
                }
            }

            // Fill Type
            Fill.Apply(fillType, #positionGrids);

            // Fill Strategy Type
            FillStrategy.Apply(fillStrategyType, #positionGrids);
        }

        // _____________________________________________________________________

        private bool getIsFilled(int x, int y)
        {
            bool isFilled = false;

            for (int i = 0; i < #positionGridGlyphs.Length; i++)
            {
                if (#positionGridGlyphs[i].x == x && #positionGridGlyphs[i].y == y)
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
