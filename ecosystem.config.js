module.exports = {
  apps: [
    {
      name: "mediconnect-web",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3000",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
        DATABASE_URL: "postgresql://admindb:VUma51pepo@127.0.0.1:5432/mediconnect",
      },
    },
  ],
};
