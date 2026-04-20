import type { NextConfig } from "next";
import fs from "node:fs";
import path from "node:path";

const nodeModulesPath = path.join(process.cwd(), "node_modules");
const usesSymlinkedNodeModules =
  fs.existsSync(nodeModulesPath) && fs.lstatSync(nodeModulesPath).isSymbolicLink();

const nextConfig: NextConfig = {
  output: "standalone",
  turbopack: {
    root: usesSymlinkedNodeModules ? path.resolve(process.cwd(), "..") : process.cwd(),
  },
};

export default nextConfig;
