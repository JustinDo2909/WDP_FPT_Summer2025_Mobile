import Constants from "expo-constants";
import Color from "../../../assets/color.json";
import env from "../../../assets/env.json";

const BucketTarget = "minio/targetimage";
const Cluster = {
  STRAPI: "api",
} as const;

export { BucketTarget, Cluster };

export const init = {
  Color,
  Env: Constants.expoConfig?.extra?.Env as (typeof env)["DEVELOP"],
};
