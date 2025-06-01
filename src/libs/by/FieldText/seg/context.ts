import { GenCtx } from "@/src/process/hooks";
import { eq, get, includes, size } from "lodash";
import { useRef, useState } from "react";
import { useFormContext } from "react-hook-form";

export default GenCtx({
  useLogic(props: IFieldText) {
    const {
      name,
      textArea,
      onKeyDown,
      mode,
      decimalPlaces = 1,
      trending = textArea ? "vertical" : "horizontal",
      width = "100%",
      kindStyle = "underline",
      isNotShowError = false,
      hidden,
      isNumber,
    } = props;

    const {
      formState: { errors },
      getValues,
      reset,
      setValue,
      watch,
    } = useFormContext();

    const val = getValues(name);
    const wVal = watch(name);
    const error = get(errors, name);

    const inputRef = useRef<any>(null);

    const [showPwd, setShowPwd] = useState<boolean>(false);

    const onSetShowPwd = () => {
      setShowPwd((prev) => !prev);
    };

    const onCheckNumber = (event: any) => {
      if (!mode) return;

      onKeyDown?.(event);

      const key = event?.nativeEvent?.key;
      const value = event?.nativeEvent?.text || "";

      const nonNumericKeys = [
        "Backspace",
        "Delete",
        "ArrowLeft",
        "ArrowRight",
        "Tab",
      ];
      if (includes(nonNumericKeys, key)) return;

      if (eq(mode, "integer") && /^\d$/.test(key)) {
        return;
      }

      if (eq(mode, "decimal")) {
        const decimalPart = value?.split?.(".")[1] || "";
        if (/^[0-9.]$/.test(key) && size(decimalPart) < decimalPlaces) {
          return;
        }
      }
    };

    const isHorizontal = eq(trending, "horizontal");

    const onClear = () => {
      props?.onClear?.();
      setValue(name, "", { shouldValidate: true });
      reset(
        {
          ...getValues(),
          [name]: "",
        },
        { keepErrors: true }
      );
    };

    return {
      ...props,
      isHorizontal,
      error,
      showPwd,
      onCheckNumber,
      onSetShowPwd,
      inputRef,
      width,
      onClear,
      val,
      kindStyle,
      trending,
      isTextCenter: props?.isTextCenter,
      wVal,
      isNotShowError,
      hidden,
      isNumber,
    };
  },
});
