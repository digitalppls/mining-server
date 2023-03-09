module.exports = {
  apps: [
    {
      name: 'mining',
      script: 'npm',
      args: 'start',
      log_date_format: 'DD-MM-YYYY HH:mm Z',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
}
