import { defineConfig } from "vite-plus";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  build: {
    minify: "esbuild",
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/vue")) {
            return "vue";
          }
        },
      },
    },
  },
});
