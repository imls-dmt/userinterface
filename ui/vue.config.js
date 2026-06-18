const proxyTarget = process.env.DEV_API_PROXY;

module.exports = {
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
