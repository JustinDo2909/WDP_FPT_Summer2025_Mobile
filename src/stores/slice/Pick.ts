import { StateCreator } from "zustand";

export type State = {
  Pick: {
    NavHeading?: string;
    Svg?: Record<string, string>;
    ActiveTab?: string;
  };
  setPickData(Obj: State["Pick"]): void;
  resetPick(): void;
};

export const PickSlice: StateCreator<State> = (set) => {
  return {
    Pick: {},
    setPickData(Obj) {
      set((state) => ({ ...state, Pick: { ...state.Pick, ...Obj } }));
    },
    resetPick() {
      set((state) => ({ ...state, Pick: { Svg: state.Pick.Svg } }));
    },
  } as const;
};
