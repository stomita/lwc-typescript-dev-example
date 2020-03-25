import fs from "fs";
import path from "path";

import rollupBabel from "rollup-plugin-babel";
import rollupExtensions from "rollup-plugin-extensions";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import nodeResolve from "@rollup/plugin-node-resolve";
import nodeBuiltins from "rollup-plugin-node-builtins";
import nodeGlobals from "rollup-plugin-node-globals";
import {
  rollupLwcBundlePlugin,
  babelLwcPreprocessPlugin
} from "rollup-plugin-lwc-bundle";

const extensions = [".ts", ".js"];

// Plugins for rollup.
const plugins = [
  // to include ".ts" files in the rollup target
  rollupExtensions({ extensions }),

  // Use rollup-plugin-babel, not @rollup/plugin-typescript.
  // Babel will strip the type annotation in its @preset/typescript preset,
  // Addition to presets/plugins in babel.config.js, you need plugin to preprocess the lwc code 
  // and the babelLwcPreprocessPlugin will do magic for following rollup plugins to work properlly.
  rollupBabel({
    extensions,
    plugins: [babelLwcPreprocessPlugin]
  }),

  nodeResolve(),
  commonjs(),
  nodeBuiltins(),
  nodeGlobals({ buffer: false }),

  // You may need to minify the bundled script file when you are using large size npm libs
  // to avoid the "Error: Value too long for field: Source maximum length is:131072" when pushing to org.
  terser({
    mangle: {
      // should reserve the variable name which is imported from platform provided function
      // if not, variable which shadows the func name may corrupt the lwc compiler
      reserved: ['getRecord'],
    }
  }),

  // Finally, the rollupLwcBundlePlugin will adjust the bundled code to work in platform.
  rollupLwcBundlePlugin(),
];

// Even if minified the bundle script, it may raise "Error: Value too long for field: Source maximum length is:131072"
// So using deps files to reduce the bundled file size by code splitting feature of rollup.
const deps = fs
  .readdirSync(path.resolve(__dirname, "src/deps"))
  .map(file => path.resolve(__dirname, "src/deps", file));

//
export default {
  input: [path.resolve(__dirname, "src/myCompBundle.ts"), ...deps],
  external: [
    "lwc",
    // include all imported modules under lightning/* and @salesforce/* to suppress the warning
    "lightning/uiRecordApi",
    "@salesforce/user/Id",
  ],
  output: {
    dir: path.resolve(__dirname, "force-app/main/default/lwc/myCompBundle"),
    format: "es"
  },
  plugins
};
