import 'dotenv/config';

export default ({ config }) => ({
  ...config,
  extra: {
    ...config.expo?.extra, // Preserve existing properties
    GHN_API_TOKEN: process.env.GHN_API_TOKEN,
    GHN_CLIENT_ID: process.env.GHN_CLIENT_ID,
    GHN_SHOP_ID: process.env.GHN_SHOP_ID,
    eas: {
      projectId: "19089fc5-380a-4467-acb3-2c08563bb339", // Ensure projectId is included
    },
  },
});
