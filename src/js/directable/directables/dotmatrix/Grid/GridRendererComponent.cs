using UnityEngine;

namespace UnityTest.UserInterface.DotMatrix.Grid
{
    public class GridRendererComponent : MonoBehaviour
    {
        private ComputeShader m_computeShader;
        private Material m_material;
        private RenderTexture m_renderTexture;
        private Vector2Int m_resolution;
        private MeshRenderer m_meshRenderer;

        void Start()
        {
            m_computeShader = Resources.Load<ComputeShader>("Shaders/Grid/GridCompute");

            Debug.Log("GridRenderer: " + m_computeShader);

            if (m_computeShader == null)
            {
                Debug.LogError(" - Failed to load ComputeShader");
                return;
            }

            // Create quad for rendering
            GameObject quad = GameObject.CreatePrimitive(PrimitiveType.Quad);
            quad.transform.SetParent(transform);
            quad.transform.localPosition = Vector3.zero;
            quad.transform.localScale = new Vector3(10, 10, 10);

            // Setup material
            m_material = new Material(Shader.Find("Custom/GridRender"));

            if (m_material == null)
            {
                Debug.LogError(" - Failed to load Material");
                return;
            }

            m_meshRenderer = quad.GetComponent<MeshRenderer>();
            m_meshRenderer.material = m_material;
        }

        public void SetResolution(Vector2Int resolution)
        {
            m_resolution = resolution;

            // Create render texture
            if (m_renderTexture != null)
                m_renderTexture.Release();

            m_renderTexture = new RenderTexture(resolution.x, resolution.y, 0);
            m_renderTexture.enableRandomWrite = true;
            m_renderTexture.Create();

            // Update material
            m_material.mainTexture = m_renderTexture;
            m_material.SetTexture("_GridTex", m_renderTexture); // Set grid texture
        }

        void Update()
        {
            if (m_renderTexture == null) return;

            Debug.Log("Update");

            float resolutionX = 1024;
            float resolutionY = 1024;

            // Dispatch compute shader
            int kernelHandle = m_computeShader.FindKernel("CSMain");

            Debug.Log("GridRenderer: " + kernelHandle);

            m_computeShader.SetTexture(kernelHandle, "Result", m_renderTexture);
            // m_computeShader.SetVector("Resolution", new Vector4(m_resolution.x, m_resolution.y, 0, 0));
            m_computeShader.SetVector("Resolution", new Vector4(resolutionX, resolutionY, 0, 0));

            m_computeShader.SetFloat("Time", Time.time);

            m_computeShader.Dispatch(kernelHandle,
                Mathf.CeilToInt(resolutionX / 8f),
                Mathf.CeilToInt(resolutionY / 8f),
                1);
        }
    }
}
