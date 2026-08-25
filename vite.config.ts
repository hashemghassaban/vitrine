import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      "@emotion/stylis": path.resolve(__dirname, "node_modules/@emotion/stylis/dist/stylis.esm.js"),
      "@emotion/is-prop-valid": path.resolve(__dirname, "node_modules/@emotion/is-prop-valid/dist/emotion-is-prop-valid.esm.js"),
      "@emotion/hash": path.resolve(__dirname, "node_modules/@emotion/hash/dist/hash.esm.js")
    }
  },

  ssr: {
    noExternal: [
      "styled-components",
      "stylis",
      "antd",
      "@ant-design/icons",
      "@ant-design/cssinjs",
      "@ant-design/react-slick",
      /rc-.*/
    ]
  },

  build: {
    outDir: "dist/client",
    ssrManifest: true
  },

  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          "@primary-color": "#3ecf8e",
        },
        javascriptEnabled: true,
      },
    },
  },

  server: {
    proxy: {
      "/api": {
        target: "https://admin.vitrine.gallery",
        changeOrigin: true,
        secure: true,
      },
      "/captcha": {
        target: "https://admin.vitrine.gallery",
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
