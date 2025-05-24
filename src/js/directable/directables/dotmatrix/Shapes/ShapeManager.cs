using System.Collections.Generic;

using UnityEngine;

using UnityTest.UserInterface.DotMatrix.Dots;
using UnityTest.UserInterface.DotMatrix.Shapes.Fills;
using UnityTest.UserInterface.DotMatrix.Shapes.Lines;
using UnityTest.UserInterface.DotMatrix.Shapes.Primitives;
using UnityTest.UserInterface.DotMatrix.Shapes.Glyphs;

namespace UnityTest.UserInterface.DotMatrix.Shapes
{
    public class ShapeManager
    {
        private DotManager m_dotManager;
        private List<Shape> m_shapes = new List<Shape>();
        private int m_shapeMax = 100;

        // _____________________________________________________________________

        public ShapeManager(DotManager dotManager)
        {
            // Store
            m_dotManager = dotManager;
        }

        // ______________________________________________________________ Update

        public void Update()
        {
            // Update All Shapes
            foreach (Shape shape in m_shapes)
            {
                shape.Update();
            }
        }

        // ________________________________________________________________ List

        public void EnsureSpaceInList()
        {
            // Ensure Space in List Removing Oldest
            while (m_shapes.Count >= m_shapeMax)
            {
                // TODO End Shape At 0 ?
                m_shapes.RemoveAt(0);
            }
        }

        // __________________________________________________________ Resolution

        public void SetResolution(Vector2Int resolution)
        {
            // TODO
        }

        // _____________________________________________________ Line Horizontal

        public Shape AddShapeLineHorizontal(int gridX, int gridY,
                                            int length,
                                            FillType fillType = FillType.PassThrough,
                                            FillStrategyType fillStrategyType = FillStrategyType.PassThrough)
        {
            EnsureSpaceInList();

            // Create Shape
            ShapeLineHorizontal shape = new ShapeLineHorizontal(m_dotManager,
                gridX, gridY,
                length,
                fillType,
                fillStrategyType);

            // Add
            m_shapes.Add(shape);

            // Return
            return shape;
        }

        // _______________________________________________________ Line Vertical

        public Shape AddShapeLineVertical(int gridX, int gridY,
                                         int length,
                                         FillType fillType = FillType.PassThrough,
                                         FillStrategyType fillStrategyType = FillStrategyType.PassThrough)
        {
            EnsureSpaceInList();

            // Create Shape
            ShapeLineVertical shape = new ShapeLineVertical(m_dotManager,
                gridX, gridY,
                length,
                fillType,
                fillStrategyType);

            // Add
            m_shapes.Add(shape);

            // Return
            return shape;
        }

        // ___________________________________________________________ Rectangle

        public Shape AddShapeRectangle(int gridX, int gridY,
                                       int gridWidth, int gridHeight,
                                       FillType fillType = FillType.PassThrough,
                                       FillStrategyType fillStrategyType = FillStrategyType.PassThrough)
        {
            EnsureSpaceInList();

            // Create Shape
            ShapeRectangle shape = new ShapeRectangle(m_dotManager,
                gridX, gridY,
                gridWidth, gridHeight,
                fillType,
                fillStrategyType);

            // Add
            m_shapes.Add(shape);

            // Return
            return shape;
        }

        // _____________________________________________________________ Glyph_A

        public Shape AddShapeGlyph_A(int gridX, int gridY,
                                     FillType fillType = FillType.PassThrough,
                                     FillStrategyType fillStrategyType = FillStrategyType.PassThrough)
        {
            EnsureSpaceInList();

            // Create Shape
            ShapeGlyph_A shape = new ShapeGlyph_A(m_dotManager,
                gridX, gridY,
                fillType,
                fillStrategyType);

            // Add
            m_shapes.Add(shape);

            // Return
            return shape;
        }

        // _____________________________________________________________ Glyph_B

        public Shape AddShapeGlyph_B(int gridX, int gridY,
                                     FillType fillType = FillType.PassThrough,
                                     FillStrategyType fillStrategyType = FillStrategyType.PassThrough)
        {
            EnsureSpaceInList();

            // Create Shape
            ShapeGlyph_B shape = new ShapeGlyph_B(m_dotManager,
                gridX, gridY,
                fillType,
                fillStrategyType);

            // Add
            m_shapes.Add(shape);

            // Return
            return shape;
        }

        // _____________________________________________________________ Glyph_C

        public Shape AddShapeGlyph_C(int gridX, int gridY,
                                     FillType fillType = FillType.PassThrough,
                                     FillStrategyType fillStrategyType = FillStrategyType.PassThrough)
        {
            EnsureSpaceInList();

            // Create Shape
            ShapeGlyph_C shape = new ShapeGlyph_C(m_dotManager,
                gridX, gridY,
                fillType,
                fillStrategyType);

            // Add
            m_shapes.Add(shape);

            // Return
            return shape;
        }

        // _____________________________________________________________ Glyph_D

        public Shape AddShapeGlyph_D(int gridX, int gridY,
                                     FillType fillType = FillType.PassThrough,
                                     FillStrategyType fillStrategyType = FillStrategyType.PassThrough)
        {
            EnsureSpaceInList();

            // Create Shape
            ShapeGlyph_D shape = new ShapeGlyph_D(m_dotManager,
                gridX, gridY,
                fillType,
                fillStrategyType);

            // Add
            m_shapes.Add(shape);

            // Return
            return shape;
        }

        // _____________________________________________________________ Glyph_E

        public Shape AddShapeGlyph_E(int gridX, int gridY,
                                     FillType fillType = FillType.PassThrough,
                                     FillStrategyType fillStrategyType = FillStrategyType.PassThrough)
        {
            EnsureSpaceInList();

            // Create Shape
            ShapeGlyph_E shape = new ShapeGlyph_E(m_dotManager,
                gridX, gridY,
                fillType,
                fillStrategyType);

            // Add
            m_shapes.Add(shape);

            // Return
            return shape;
        }

        // _____________________________________________________________ Glyph_F

        public Shape AddShapeGlyph_F(int gridX, int gridY,
                                     FillType fillType = FillType.PassThrough,
                                     FillStrategyType fillStrategyType = FillStrategyType.PassThrough)
        {
            EnsureSpaceInList();

            // Create Shape
            ShapeGlyph_F shape = new ShapeGlyph_F(m_dotManager,
                gridX, gridY,
                fillType,
                fillStrategyType);

            // Add
            m_shapes.Add(shape);

            // Return
            return shape;
        }

        // _____________________________________________________________ Glyph_G

        public Shape AddShapeGlyph_G(int gridX, int gridY,
                                     FillType fillType = FillType.PassThrough,
                                     FillStrategyType fillStrategyType = FillStrategyType.PassThrough)
        {
            EnsureSpaceInList();

            // Create Shape
            ShapeGlyph_G shape = new ShapeGlyph_G(m_dotManager,
                gridX, gridY,
                fillType,
                fillStrategyType);

            // Add
            m_shapes.Add(shape);

            // Return
            return shape;
        }

        // _____________________________________________________________ Glyph_H

        public Shape AddShapeGlyph_H(int gridX, int gridY,
                                     FillType fillType = FillType.PassThrough,
                                     FillStrategyType fillStrategyType = FillStrategyType.PassThrough)
        {
            EnsureSpaceInList();

            // Create Shape
            ShapeGlyph_H shape = new ShapeGlyph_H(m_dotManager,
                gridX, gridY,
                fillType,
                fillStrategyType);

            // Add
            m_shapes.Add(shape);

            // Return
            return shape;
        }

        // _____________________________________________________________ Glyph_I

        public Shape AddShapeGlyph_I(int gridX, int gridY,
                                     FillType fillType = FillType.PassThrough,
                                     FillStrategyType fillStrategyType = FillStrategyType.PassThrough)
        {
            EnsureSpaceInList();

            // Create Shape
            ShapeGlyph_I shape = new ShapeGlyph_I(m_dotManager,
                gridX, gridY,
                fillType,
                fillStrategyType);

            // Add
            m_shapes.Add(shape);

            // Return
            return shape;
        }

        // _____________________________________________________________ Glyph_J

        public Shape AddShapeGlyph_J(int gridX, int gridY,
                                     FillType fillType = FillType.PassThrough,
                                     FillStrategyType fillStrategyType = FillStrategyType.PassThrough)
        {
            EnsureSpaceInList();

            // Create Shape
            ShapeGlyph_J shape = new ShapeGlyph_J(m_dotManager,
                gridX, gridY,
                fillType,
                fillStrategyType);

            // Add
            m_shapes.Add(shape);

            // Return
            return shape;
        }

        // _____________________________________________________________ Glyph_K

        public Shape AddShapeGlyph_K(int gridX, int gridY,
                                     FillType fillType = FillType.PassThrough,
                                     FillStrategyType fillStrategyType = FillStrategyType.PassThrough)
        {
            EnsureSpaceInList();

            // Create Shape
            ShapeGlyph_K shape = new ShapeGlyph_K(m_dotManager,
                gridX, gridY,
                fillType,
                fillStrategyType);

            // Add
            m_shapes.Add(shape);

            // Return
            return shape;
        }
    }
}
