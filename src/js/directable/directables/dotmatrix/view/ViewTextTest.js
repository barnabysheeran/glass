



namespace UnityTest.UserInterface.DotMatrix.Views
{
    public class ViewTextTest : View
    {
        // _____________________________________________________________________

        public ViewTextTest(ShapeManager shapeManager) : base(shapeManager)
        {
            // Alphabet
            m_shapeManager.AddShapeGlyph_A(10, 10, FillType.PassThrough, FillStrategyType.Reverse);
            m_shapeManager.AddShapeGlyph_B(15, 10, FillType.PassThrough, FillStrategyType.Random);
            m_shapeManager.AddShapeGlyph_C(20, 10, FillType.PassThrough, FillStrategyType.PassThrough);
            m_shapeManager.AddShapeGlyph_D(25, 10, FillType.PassThrough, FillStrategyType.PassThrough);
            m_shapeManager.AddShapeGlyph_E(30, 10, FillType.PassThrough, FillStrategyType.PassThrough);
            m_shapeManager.AddShapeGlyph_F(35, 10, FillType.PassThrough, FillStrategyType.PassThrough);
            m_shapeManager.AddShapeGlyph_G(40, 10, FillType.PassThrough, FillStrategyType.PassThrough);
            m_shapeManager.AddShapeGlyph_H(45, 10, FillType.PassThrough, FillStrategyType.PassThrough);
            m_shapeManager.AddShapeGlyph_I(50, 10, FillType.PassThrough, FillStrategyType.PassThrough);
            m_shapeManager.AddShapeGlyph_J(55, 10, FillType.PassThrough, FillStrategyType.PassThrough);
            m_shapeManager.AddShapeGlyph_K(60, 10, FillType.PassThrough, FillStrategyType.PassThrough);

            // Numbers

            // Symbols
        }

        // ______________________________________________________________ Update

        public override void Update()
        {
            base.Update();
        }
    }
}