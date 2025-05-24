









namespace UnityTest.UserInterface.DotMatrix.Shapes
{
    export default class ShapeManager
    {
        private DotManager #dotManager;
        private List<Shape> #shapes = new List<Shape>();
        private int #shapeMax = 100;

        // _____________________________________________________________________

        ShapeManager(DotManager dotManager)
        {
            // Store
            #dotManager = dotManager;
        }

        // ______________________________________________________________ Update

        Update()
        {
            // Update All Shapes
            foreach (Shape shape in #shapes)
            {
                shape.Update();
            }
        }

        // ________________________________________________________________ List

        EnsureSpaceInList()
        {
            // Ensure Space in List Removing Oldest
            while (#shapes.Count >= #shapeMax)
            {
                // TODO End Shape At 0 ?
                #shapes.RemoveAt(0);
            }
        }

        // __________________________________________________________ Resolution

        SetResolution(Vector2Int resolution)
        {
            // TODO
        }

        // _____________________________________________________ Line Horizontal

        Shape AddShapeLineHorizontal(int gridX, int gridY,
                                            int length,
                                            FillType fillType = FillType.PassThrough,
                                            FillStrategyType fillStrategyType = FillStrategyType.PassThrough)
        {
            EnsureSpaceInList();

            // Create Shape
            ShapeLineHorizontal shape = new ShapeLineHorizontal(#dotManager,
                gridX, gridY,
                length,
                fillType,
                fillStrategyType);

            // Add
            #shapes.Add(shape);

            // Return
            return shape;
        }

        // _______________________________________________________ Line Vertical

        Shape AddShapeLineVertical(int gridX, int gridY,
                                         int length,
                                         FillType fillType = FillType.PassThrough,
                                         FillStrategyType fillStrategyType = FillStrategyType.PassThrough)
        {
            EnsureSpaceInList();

            // Create Shape
            ShapeLineVertical shape = new ShapeLineVertical(#dotManager,
                gridX, gridY,
                length,
                fillType,
                fillStrategyType);

            // Add
            #shapes.Add(shape);

            // Return
            return shape;
        }

        // ___________________________________________________________ Rectangle

        Shape AddShapeRectangle(int gridX, int gridY,
                                       int gridWidth, int gridHeight,
                                       FillType fillType = FillType.PassThrough,
                                       FillStrategyType fillStrategyType = FillStrategyType.PassThrough)
        {
            EnsureSpaceInList();

            // Create Shape
            ShapeRectangle shape = new ShapeRectangle(#dotManager,
                gridX, gridY,
                gridWidth, gridHeight,
                fillType,
                fillStrategyType);

            // Add
            #shapes.Add(shape);

            // Return
            return shape;
        }

        // _____________________________________________________________ Glyph_A

        Shape AddShapeGlyph_A(int gridX, int gridY,
                                     FillType fillType = FillType.PassThrough,
                                     FillStrategyType fillStrategyType = FillStrategyType.PassThrough)
        {
            EnsureSpaceInList();

            // Create Shape
            ShapeGlyph_A shape = new ShapeGlyph_A(#dotManager,
                gridX, gridY,
                fillType,
                fillStrategyType);

            // Add
            #shapes.Add(shape);

            // Return
            return shape;
        }

        // _____________________________________________________________ Glyph_B

        Shape AddShapeGlyph_B(int gridX, int gridY,
                                     FillType fillType = FillType.PassThrough,
                                     FillStrategyType fillStrategyType = FillStrategyType.PassThrough)
        {
            EnsureSpaceInList();

            // Create Shape
            ShapeGlyph_B shape = new ShapeGlyph_B(#dotManager,
                gridX, gridY,
                fillType,
                fillStrategyType);

            // Add
            #shapes.Add(shape);

            // Return
            return shape;
        }

        // _____________________________________________________________ Glyph_C

        Shape AddShapeGlyph_C(int gridX, int gridY,
                                     FillType fillType = FillType.PassThrough,
                                     FillStrategyType fillStrategyType = FillStrategyType.PassThrough)
        {
            EnsureSpaceInList();

            // Create Shape
            ShapeGlyph_C shape = new ShapeGlyph_C(#dotManager,
                gridX, gridY,
                fillType,
                fillStrategyType);

            // Add
            #shapes.Add(shape);

            // Return
            return shape;
        }

        // _____________________________________________________________ Glyph_D

        Shape AddShapeGlyph_D(int gridX, int gridY,
                                     FillType fillType = FillType.PassThrough,
                                     FillStrategyType fillStrategyType = FillStrategyType.PassThrough)
        {
            EnsureSpaceInList();

            // Create Shape
            ShapeGlyph_D shape = new ShapeGlyph_D(#dotManager,
                gridX, gridY,
                fillType,
                fillStrategyType);

            // Add
            #shapes.Add(shape);

            // Return
            return shape;
        }

        // _____________________________________________________________ Glyph_E

        Shape AddShapeGlyph_E(int gridX, int gridY,
                                     FillType fillType = FillType.PassThrough,
                                     FillStrategyType fillStrategyType = FillStrategyType.PassThrough)
        {
            EnsureSpaceInList();

            // Create Shape
            ShapeGlyph_E shape = new ShapeGlyph_E(#dotManager,
                gridX, gridY,
                fillType,
                fillStrategyType);

            // Add
            #shapes.Add(shape);

            // Return
            return shape;
        }

        // _____________________________________________________________ Glyph_F

        Shape AddShapeGlyph_F(int gridX, int gridY,
                                     FillType fillType = FillType.PassThrough,
                                     FillStrategyType fillStrategyType = FillStrategyType.PassThrough)
        {
            EnsureSpaceInList();

            // Create Shape
            ShapeGlyph_F shape = new ShapeGlyph_F(#dotManager,
                gridX, gridY,
                fillType,
                fillStrategyType);

            // Add
            #shapes.Add(shape);

            // Return
            return shape;
        }

        // _____________________________________________________________ Glyph_G

        Shape AddShapeGlyph_G(int gridX, int gridY,
                                     FillType fillType = FillType.PassThrough,
                                     FillStrategyType fillStrategyType = FillStrategyType.PassThrough)
        {
            EnsureSpaceInList();

            // Create Shape
            ShapeGlyph_G shape = new ShapeGlyph_G(#dotManager,
                gridX, gridY,
                fillType,
                fillStrategyType);

            // Add
            #shapes.Add(shape);

            // Return
            return shape;
        }

        // _____________________________________________________________ Glyph_H

        Shape AddShapeGlyph_H(int gridX, int gridY,
                                     FillType fillType = FillType.PassThrough,
                                     FillStrategyType fillStrategyType = FillStrategyType.PassThrough)
        {
            EnsureSpaceInList();

            // Create Shape
            ShapeGlyph_H shape = new ShapeGlyph_H(#dotManager,
                gridX, gridY,
                fillType,
                fillStrategyType);

            // Add
            #shapes.Add(shape);

            // Return
            return shape;
        }

        // _____________________________________________________________ Glyph_I

        Shape AddShapeGlyph_I(int gridX, int gridY,
                                     FillType fillType = FillType.PassThrough,
                                     FillStrategyType fillStrategyType = FillStrategyType.PassThrough)
        {
            EnsureSpaceInList();

            // Create Shape
            ShapeGlyph_I shape = new ShapeGlyph_I(#dotManager,
                gridX, gridY,
                fillType,
                fillStrategyType);

            // Add
            #shapes.Add(shape);

            // Return
            return shape;
        }

        // _____________________________________________________________ Glyph_J

        Shape AddShapeGlyph_J(int gridX, int gridY,
                                     FillType fillType = FillType.PassThrough,
                                     FillStrategyType fillStrategyType = FillStrategyType.PassThrough)
        {
            EnsureSpaceInList();

            // Create Shape
            ShapeGlyph_J shape = new ShapeGlyph_J(#dotManager,
                gridX, gridY,
                fillType,
                fillStrategyType);

            // Add
            #shapes.Add(shape);

            // Return
            return shape;
        }

        // _____________________________________________________________ Glyph_K

        Shape AddShapeGlyph_K(int gridX, int gridY,
                                     FillType fillType = FillType.PassThrough,
                                     FillStrategyType fillStrategyType = FillStrategyType.PassThrough)
        {
            EnsureSpaceInList();

            // Create Shape
            ShapeGlyph_K shape = new ShapeGlyph_K(#dotManager,
                gridX, gridY,
                fillType,
                fillStrategyType);

            // Add
            #shapes.Add(shape);

            // Return
            return shape;
        }
    }
}
