import AsyncStorage from "@react-native-async-storage/async-storage";
import { reduce } from "lodash";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { AuthSlice } from "./slice/Auth";
import { JointSlice } from "./slice/Joint";
import { PickSlice } from "./slice/Pick";

const sliceFunctions = [AuthSlice, JointSlice, PickSlice];

type UnionToIntersection<U> = (
  U extends unknown ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;

type State = UnionToIntersection<ReturnType<(typeof sliceFunctions)[number]>>;

export const sStore = create<State>()(
  devtools(
    persist(
      (...a) =>
        reduce(
          sliceFunctions,
          (prev, cur) => ({
            ...prev,
            ...cur(...a),
          }),
          {} as State
        ),
      {
        name: "store",
        storage: createJSONStorage(() => AsyncStorage),

        merge: (persistedState, currentState) =>
          Object.assign(currentState, persistedState),

        partialize: ({ Auth, Pick }) => {
          return {
            Auth,
            Pick,
          };
        },
      }
    )
  )
);
