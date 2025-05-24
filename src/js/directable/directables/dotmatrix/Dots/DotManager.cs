using System.Collections.Generic;

using UnityEngine;

using UnityTest.UserInterface.DotMatrix.Grid;

namespace UnityTest.UserInterface.DotMatrix.Dots
{
    public class DotManager
    {
        private List<Dot> m_dots;
        private int m_dotPoolSize = 512;
        private int m_dotPoolIndex = 0;

        // _____________________________________________________________________

        public DotManager(GameObject container)
        {
            // Create Dot Pool
            m_dots = new List<Dot>();

            for (int i = 0; i < m_dotPoolSize; i++)
            {
                Dot dot = new Dot(i, container);
                m_dots.Add(dot);
            }
        }

        // ______________________________________________________________ Update

        // public void Update()
        // {
        //     // foreach (Dot dot in m_dots)
        //     // {
        //     //     dot.Update();
        //     // }
        // }

        // ____________________________________________________________ Dot Pool

        public int GetNextFreeDotIndex()
        {
            int index = m_dotPoolIndex;

            // Next
            m_dotPoolIndex++;

            // Recycle from Start of Pool
            if (m_dotPoolIndex >= m_dotPoolSize)
            {
                m_dotPoolIndex = 0;
            }

            return index;
        }

        // ____________________________________________________________ Position

        public void SetDotPosition(int dotIndex, Vector2Int positionGrid)
        {
            // Get Dot
            Dot dot = m_dots[dotIndex];

            // Set Position
            dot.SetPosition(GridData.GetGridPixelPosition(positionGrid));
        }

        // ________________________________________________________________ Fill

        public void FillDot(int dotIndex)
        {
            // Get Dot
            Dot dot = m_dots[dotIndex];

            // Fill
            dot.Fill();
        }

        // _______________________________________________________________ Clear

        public void ClearDot(int dotIndex)
        {
            // Get Dot
            Dot dot = m_dots[dotIndex];

            // Clear
            dot.Clear();
        }

        // ______________________________________________________________ Status

        public void LogStatus()
        {
            Debug.Log("DotManager. Index " + m_dotPoolIndex + " of " + m_dotPoolSize + " Dots");
        }
    }
}