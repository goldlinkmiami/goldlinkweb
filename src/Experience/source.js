export default [
  {
    name: "object",
    type: "gltfLoader",
    path: "/models/self_gold.glb",
  },

  {
    name: "environmentTexture",
    type: "cubeTextureLoader",
    path: [
      "/textures/envTexture/px.webp",
      "/textures/envTexture/nx.webp",
      "/textures/envTexture/py.webp",
      "/textures/envTexture/ny.webp",
      "/textures/envTexture/pz.webp",
      "/textures/envTexture/nz.webp",
    ],
  },

  {
    name: "africaTexture",
    type: "textureLoader",
    path: "/textures/africa2.webp",
  },

  {
    name: "poster",
    type: "textureLoader",
    path: "/textures/poster.webp",
  },
];
