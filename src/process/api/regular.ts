import { AxiosRequestConfig } from "axios";
import { filter, get } from "lodash";
import Toast from "react-native-toast-message";
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
  const err = get(error, "response.data", {} as any); // IResult

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

  BaseURL = "https://cosme-play-be.vercel.app/api" ,
}: {
  Name?: string;
  BaseURL?: string;
}) {
  return filter([BaseURL, Name], Boolean).join("/");
}

function onCRUD({
  Name,

  BaseURL = "https://cosme-play-be.vercel.app/api",
}: {
  Name?: string;
  BaseURL?: string;
}) {
  type Args = {
    payload?: Record<string, unknown> | Record<string, unknown>[];
    config?: AxiosRequestConfig;
  };

  const url = onEndPoint({ Name, BaseURL });

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

    async Put({ payload, config }: Args) {
      return await instance?.put(url, payload, config);
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

