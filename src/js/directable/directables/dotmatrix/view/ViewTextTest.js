



namespace UnityTest.UserInterface.DotMatrix.Views
{
    export default class ViewTextTest : View
    {
        // _____________________________________________________________________

        ViewTextTest(ShapeManager shapeManager) : base(shapeManager)
        {
            // Alphabet
            #shapeManager.AddShapeGlyph_A(10, 10, FillType.PassThrough, FillStrategyType.Reverse);
            #shapeManager.AddShapeGlyph_B(15, 10, FillType.PassThrough, FillStrategyType.Random);
            #shapeManager.AddShapeGlyph_C(20, 10, FillType.PassThrough, FillStrategyType.PassThrough);
            #shapeManager.AddShapeGlyph_D(25, 10, FillType.PassThrough, FillStrategyType.PassThrough);
            #shapeManager.AddShapeGlyph_E(30, 10, FillType.PassThrough, FillStrategyType.PassThrough);
            #shapeManager.AddShapeGlyph_F(35, 10, FillType.PassThrough, FillStrategyType.PassThrough);
            #shapeManager.AddShapeGlyph_G(40, 10, FillType.PassThrough, FillStrategyType.PassThrough);
            #shapeManager.AddShapeGlyph_H(45, 10, FillType.PassThrough, FillStrategyType.PassThrough);
            #shapeManager.AddShapeGlyph_I(50, 10, FillType.PassThrough, FillStrategyType.PassThrough);
            #shapeManager.AddShapeGlyph_J(55, 10, FillType.PassThrough, FillStrategyType.PassThrough);
            #shapeManager.AddShapeGlyph_K(60, 10, FillType.PassThrough, FillStrategyType.PassThrough);

            // Numbers

            // Symbols
        }

        // ______________________________________________________________ Update

        override Update()
        {
            base.Update();
        }
    }
}