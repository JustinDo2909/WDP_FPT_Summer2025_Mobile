import { StateCreator } from "zustand";

export type State = {
  Joint: {
    Product? : IProduct,
    Products? : IProduct[],
    Cart?: ICart,
    User?: IUser,
    cartSpin?: boolean,
    CheckoutCartItems?: ICartLineItem[],
  };
  setJointData(Obj: State["Joint"]): void;
  resetJoint(): void;
};

export const JointSlice: StateCreator<State> = (set) => {
  return {
    Joint: {},

    setJointData(Obj) {
      set((state) => ({ ...state, Joint: { ...state.Joint, ...Obj } }));
    },
    resetJoint() {
      set({ Joint: {} });
    },
  } as const;
};
