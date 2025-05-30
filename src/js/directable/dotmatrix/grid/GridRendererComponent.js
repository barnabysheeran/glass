

namespace UnityTest.UserInterface.DotMatrix.Grid
{
    export default class GridRendererComponent : MonoBehaviour
    {
        private ComputeShader #computeShader;
        private Material #material;
        private RenderTexture #renderTexture;
        private Vector2Int #resolution;
        private MeshRenderer #meshRenderer;

        Start()
        {
            #computeShader = Resources.Load<ComputeShader>("Shaders/Grid/GridCompute");

            Debug.Log("GridRenderer: " + #computeShader);

            if (#computeShader == null)
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
            #material = new Material(Shader.Find("Custom/GridRender"));

            if (#material == null)
            {
                Debug.LogError(" - Failed to load Material");
                return;
            }

            #meshRenderer = quad.GetComponent<MeshRenderer>();
            #meshRenderer.material = #material;
        }

        SetResolution(Vector2Int resolution)
        {
            #resolution = resolution;

            // Create render texture
            if (#renderTexture != null)
                #renderTexture.Release();

            #renderTexture = new RenderTexture(resolution.x, resolution.y, 0);
            #renderTexture.enableRandomWrite = true;
            #renderTexture.Create();

            // Update material
            #material.mainTexture = #renderTexture;
            #material.SetTexture("_GridTex", #renderTexture); // Set grid texture
        }

        Update()
        {
            if (#renderTexture == null) return;

            Debug.Log("Update");

            float resolutionX = 1024;
            float resolutionY = 1024;

            // Dispatch compute shader
            int kernelHandle = #computeShader.FindKernel("CSMain");

            Debug.Log("GridRenderer: " + kernelHandle);

            #computeShader.SetTexture(kernelHandle, "Result", #renderTexture);
            // #computeShader.SetVector("Resolution", new Vector4(#resolution.x, #resolution.y, 0, 0));
            #computeShader.SetVector("Resolution", new Vector4(resolutionX, resolutionY, 0, 0));

            #computeShader.SetFloat("Time", Time.time);

            #computeShader.Dispatch(kernelHandle,
                Mathf.CeilToInt(resolutionX / 8f),
                Mathf.CeilToInt(resolutionY / 8f),
                1);
        }
    }
}
