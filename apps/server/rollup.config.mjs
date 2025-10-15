import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import { builtinModules } from "module";

const config = [
  {
    input: "src/main.ts",
    output: {
      file: "build/server.js",
      format: "cjs",
    },
    external: builtinModules.concat(builtinModules.map(m => `node:${m}`)),
    plugins: [
      typescript({
        tsconfig: "./tsconfig.json",
      }),
      commonjs({
        extensions: [".js", ".ts"],
        strictRequires: 'auto',
        ignoreDynamicRequires: true,
        ignore: (id) => {
          return id.startsWith('node:') || builtinModules.includes(id);
        },
      }),
      nodeResolve({
        preferBuiltins: true,
      }),
      json(),
    ],
  },
];

export default config;
