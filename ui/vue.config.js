const proxyTarget = process.env.DEV_API_PROXY;

module.exports = {
  // Strip console.* from production bundles: the app logs session state and
  // full submissions while debugging, which should not reach visitors' consoles.
  chainWebpack: (config) => {
    if (process.env.NODE_ENV === "production") {
      config.optimization.minimizer("terser").tap((args) => {
        args[0].terserOptions.compress = {
          ...(args[0].terserOptions.compress || {}),
          drop_console: true,
        };
        return args;
      });
    }
  },
  devServer: {
    port: 8080,
    host: "0.0.0.0",
    ...(proxyTarget && {
      proxy: {
        "/api": {
          target: proxyTarget,
          changeOrigin: true,
        },
      },
    }),
  },
};
