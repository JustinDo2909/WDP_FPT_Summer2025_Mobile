import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { ReactNode, useEffect, useState } from "react";
import { Modal, Pressable, StyleSheet, View, ViewStyle } from "react-native";
import { Loading } from "../Loading";
import { eventEmitter } from "@/src/process/utils";
import { init } from "@/src/process/constants";
import { Array2Enum } from "@/src/process/helper";
declare global {
  type NameModal = keyof typeof RModal.EModal | "Dynamic";

  namespace IRModal {
    type IOpen = {
      name: NameModal;
      status: boolean;
      data?: string;
    };

    type IChildren = {
      open: IOpen;
      onClose: (cb?: () => Promise<void> | void) => void;
    };

    type IArgs = {
      name: NameModal;
      _set?: {
        overlay?: {
          zIndex: number;
        };
        isFull?: boolean;
        modal?: ViewStyle;
      };
      children?: (args: IChildren) => ReactNode;
      duration?: number;
      isConfirmClose?: boolean;
      isBottomSheet?: boolean;
    };
  }
}

export const onShowBottomSheet = ({
  status,
}: {
  status: boolean;
  data?: string;
}) => {
  eventEmitter.emit(status ? "openModal" : "closeModal");
};

export function RModal(props: IRModal.IArgs) {
  const { children, name } = props;
  const { open, onClose } = RModal.useModal(props);
  const passing = { onClose, open: open?.[name] };
  return (
    <>
      <Modal
        visible={open?.[name]?.status || false}
        transparent={true}
        animationType="fade"
        onRequestClose={() => {
          onClose?.();
        }}
      >
        <Pressable
          style={sheetStyles.backdrop}
          onPress={() => {
            onClose?.();
          }}
        >
          {/* Chặn sự kiện lan ra ngoài để không đóng modal khi bấm trong nội dung */}
          <View
            onStartShouldSetResponder={() => true}
            onTouchEnd={(e) => e.stopPropagation()}
            style={[
              sheetStyles.sheet,
              props.isBottomSheet ? sheetStyles.isBottomSheet : {},
              { ...props?._set?.modal },
            ]}
          >
            <>{children?.(passing)}</>
          </View>
        </Pressable>
        <Loading />
      </Modal>
    </>
  );
}

const root = "libs::modal";

RModal.useModal = function ({ name }: IRModal.IArgs) {
  const [open, setOpen] = useState({} as Record<NameModal, IRModal.IOpen>);

  useEffect(() => {
    const setModal = function (data: Record<NameModal, IRModal.IOpen>): void {
      setOpen(data);
    };

    AsyncStorage.removeItem(root);
    eventEmitter.addListener(name, setModal);
  }, [name]);

  const onClose = (cb?: () => Promise<void> | void) => {
    RModal.onShow({ name, status: false });
    cb?.();
  };

  return { open, setOpen, onClose };
};

RModal.EModal = Array2Enum([
  "Test"
] as const);

RModal.onClear = function () {
  AsyncStorage.removeItem(root);
};

RModal.onLive = function ({ name }: Pick<IRModal.IOpen, "name">) {
  const [state, setState] = useState(
    {} as Pick<IRModal.IOpen, "status" | "data">
  );

  useEffect(() => {
    (async function () {
      const JSONS = await AsyncStorage.getItem(root);
      const storage = JSON.parse(JSONS || "{}");
      setState(storage[name]);
    })();
  }, []);

  return state;
};

RModal.onShow = async function ({ name, data, status }: IRModal.IOpen) {
  const JSONS = await AsyncStorage.getItem(root);
  const storage = JSON.parse(JSONS || "{}");
  const value = {
    ...storage,
    [name]: {
      ...storage[name],
      status,
      data,
    },
  } as Record<NameModal, IRModal.IOpen>;

  AsyncStorage.setItem(root, JSON.stringify(value));
  eventEmitter.emit(name, value);
};

const sheetStyles = StyleSheet.create({
  sheet: {
    position: "absolute",
    backgroundColor: init?.Color?.BgTeriary,
    flexDirection: "row",
  },
  isBottomSheet: {
    bottom: 0,
  },
  isNotBottomSheet: {
    alignItems: "center",
    justifyContent: "center",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
});
