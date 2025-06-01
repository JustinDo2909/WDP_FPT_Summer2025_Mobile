import { AxiosRequestConfig } from "axios";
import { filter, get } from "lodash";
import Toast from "react-native-toast-message";
import { init } from "../constants";
import { onSetLoading } from "../utils";
import { instance } from "./instance";

function onError(
  {
    error,
  }: {
    error: any;
  },
  isToast = true
) {
  console.info("error", error?.response);
  const err = get(
    error,
    "response.data",
    {} as // IResult
    any
  );

  if (isToast) {
    Toast.show({
      type: "error",
      text1: err?.Message,
    });
  }
  onSetLoading(false);
  return err;
}

function onEndPoint({
  Name,
  Cluster = "api",
  FuncID,
  BaseURL = init?.Env?.URL_BE,
}: {
  Name?: string;
  Cluster?: string;
  BaseURL?: string;
  FuncID?: string;
}) {
  return filter([BaseURL, Cluster, FuncID, Name], Boolean).join("/");
}

function onCRUD({
  Name,
  Cluster,
  BaseURL,
  FuncID,
}: {
  Name?: string;
  BaseURL?: string;
  Cluster?: string;
  FuncID?: string;
}) {
  type Args = {
    payload?: Record<string, unknown> | Record<string, unknown>[];
    config?: AxiosRequestConfig;
  };

  const url = onEndPoint({ Name, Cluster, FuncID, BaseURL });

  return {
    async Get({ payload, config }: Args) {
      return await instance?.get(url, {
        params: {
          ...payload,
        },
        ...config,
      });
    },

    async Post({ payload, config }: Args) {
      return await instance?.post(url, payload, config);
    },

    async Delete({ payload, config }: Args) {
      return await instance?.delete(url, {
        params: {
          ...payload,
        },
        data: {
          ...payload,
        },
        ...config,
      });
    },
  };
}

export { onCRUD, onError };

