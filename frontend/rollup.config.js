import mdx from "@mdx-js/rollup";
import { babel } from "@rollup/plugin-babel";

const config = {
  plugins: [
    mdx({}),
    babel({
      extensions: [".js", ".jsx", ".cjs", ".mjs", ".md", ".mdx"],
    }),
  ],
};

export default config;
