const path = require("path")
const CracoLessPlugin = require("craco-less")

const resolve = (pathname) => path.resolve(__dirname, pathname)

module.exports = {
  // less
  plugins: [
    {
      plugin: CracoLessPlugin,
        options: {
          lessLoaderOptions: {
            lessOptions: {
              modifyVars: { "@primary-color": "#1DA57A" },
              javascriptEnabled: true,
            },
          },
        },
    },
  ],
  // webpack
  webpack: {
    alias: {
      //   "@": "src",
      //   "@": path.resolve(__dirname, "src"),
      "@": resolve("src"),
      "components": resolve("components"),
      "utils": resolve("utils"),
      // '@mui/styled-engine': '@mui/styled-engine-sc',
      '~antd': resolve("node_modules/antd")
    },
  },
}
