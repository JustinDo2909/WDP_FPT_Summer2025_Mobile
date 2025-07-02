import 'dotenv/config';

export default ({ config }) => ({
  ...config,
  extra: {
    GHN_API_TOKEN: process.env.GHN_API_TOKEN,
    GHN_CLIENT_ID: process.env.GHN_CLIENT_ID,
    GHN_SHOP_ID: process.env.GHN_SHOP_ID,
  },
});
