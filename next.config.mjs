/** @type {import('next').NextConfig} */
const nextConfig = {
  //   webpack: (config) => {
  //     config.module.rules.push({
  //       test: /\.node/,
  //       use: "raw-loader",
  //     });
  //     return config;
  //   },
  webpack: (config) => {
    config.externals = [...config.externals, "jsdom"];
    return config;
  },
};

export default nextConfig;
