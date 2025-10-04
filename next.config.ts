import type { NextConfig } from "next";

const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1];

const base = repoName ? `/${repoName}` : "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: `${base}`,
  assetPrefix: `${base}/`,
};

export default nextConfig;
