module.exports = {
  reactStrictMode: true,
  images: {
    // Mock placeholder photos. picsum.photos redirects to fastly.picsum.photos.
    // TODO: replace with the S3/R2 bucket domain once real uploads exist.
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos", pathname: "/seed/**" },
      { protocol: "https", hostname: "fastly.picsum.photos", pathname: "/id/**" },
    ],
  },
  turbopack: {
    resolveAlias: {
      "react-native": "react-native-web",
    },
    resolveExtensions: [
      ".web.js",
      ".web.jsx",
      ".web.ts",
      ".web.tsx",
      ".js",
      ".jsx",
      ".ts",
      ".tsx",
      ".json",
    ],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      // Transform all direct `react-native` imports to `react-native-web`
      "react-native$": "react-native-web",
    };
    config.resolve.extensions = [
      ".web.js",
      ".web.jsx",
      ".web.ts",
      ".web.tsx",
      ...config.resolve.extensions,
    ];
    return config;
  },
};
