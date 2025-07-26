import AsyncStorage from "@react-native-async-storage/async-storage";
import { StateCreator } from "zustand";

export type State = {
    Auth: {
    User?: Partial<IUser>;
    Token?: string;
 
  };
  setToken(data: string): void;
  setAuthData(Obj: State["Auth"]): void;
  resetAuth(): void;
};

export const AuthSlice: StateCreator<State> = (set) => {
  return {
    Auth: { UserInfo: {}, Token: "", Permission: {}, Functions: [] },
    setToken(Token) {
      AsyncStorage.setItem("jwt", Token);
      set((state) => ({ ...state, Auth: { ...state.Auth, Token } }));
    },
    setAuthData(Obj) {
      set((state) => ({ ...state, Auth: { ...state.Auth, ...Obj } }));
    },
    resetAuth() {
      set({ Auth: {} });
    },
  } as const;
};
