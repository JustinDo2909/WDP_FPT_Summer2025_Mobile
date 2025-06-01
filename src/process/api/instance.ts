import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosInstance } from "axios";
import { assign } from "lodash";
import { eventBus } from "../utils";

type InstanceCustom = AxiosInstance & {
  set: (data: any) => void;
};

const instance = axios.create({
  headers: {
    accept: "*/*",
    "Content-Type": "application/json",
  },
  withCredentials: false,
}) as InstanceCustom;

// set config cho instance
assign(instance, {
  set: (data = {}) => {
    instance.defaults.headers.common = {
      ...instance?.defaults.headers.common,
      ...data,
    };
  },
} as const);

// tiền điều kiện
instance.interceptors.request.use(
  async function (config) {
    try {
      const jwt = await AsyncStorage.getItem("jwt");
      config.headers.Authorization = `Bearers ${jwt}`;

      return config;
    } catch (error) {
      console.error("error xx :>> ", error);
      return config;
    }
  },
  function (error) {
    console.error("error request :>> ", error);
    return Promise.reject(error);
  }
);

// hậu điều kiện
instance.interceptors.response.use(
  (config) => {
    return config;
  },
  (error: any) => {
    // nếu token 401, token hết hạn, kiểm tra và renew token.
    if (error?.response?.status === 401) {
      eventBus.emit("logout");
    }
    throw error;
  }
);

export { instance };
