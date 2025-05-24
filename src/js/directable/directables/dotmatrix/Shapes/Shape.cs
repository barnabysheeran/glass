using System.Collections.Generic;

using UnityEngine;

using UnityTest.UserInterface.DotMatrix.Dots;

namespace UnityTest.UserInterface.DotMatrix.Shapes
{
    public class Shape
    {
        public DotManager m_dotManager;
        public List<Vector2Int> m_positionGrids = new List<Vector2Int>();
        public int m_positionGridsIndex = 0;

        public bool m_isComplete = false;

        // _____________________________________________________________________

        public Shape(DotManager dotManager)
        {
            // Store
            m_dotManager = dotManager;
        }

        // ______________________________________________________________ Update

        public virtual void Update()
        {
            // Debug.Log("Shape. Update " + m_positionGridsIndex);

            // Complete ?
            if (m_isComplete)
            {
                return;
            }

            // Get Dot Index
            int dotIndex = m_dotManager.GetNextFreeDotIndex();

            // Clear Current Dot
            m_dotManager.ClearDot(dotIndex);

            // if (dotIndex == -1)
            // {
            //     Debug.Log("ShapeLineHorizontal. No more free Dots");
            //     break;
            // }

            // TODO -1 Off Grid ?

            // Position
            m_dotManager.SetDotPosition(dotIndex, m_positionGrids[m_positionGridsIndex]);

            // Fill Dot
            m_dotManager.FillDot(dotIndex);

            // Increment Index
            m_positionGridsIndex++;

            // Check Complete
            if (m_positionGridsIndex >= m_positionGrids.Count)
            {
                m_isComplete = true;
                return;
            }
        }
    }
}