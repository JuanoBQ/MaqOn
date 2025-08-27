export default {
  upload: {
    config: {
      provider: 'local',
      providerOptions: {
        sizeLimit: 100000,
      },
      actionOptions: {
        upload: {},
        delete: {},
      },
    },
  },
};
