import { isEqual } from "lodash";
import { RegisterOptions } from "react-hook-form";

type Rules = Omit<
  RegisterOptions,
  "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
>;

export const valid = {
  required: (label = "", skip = false) => {
    if (skip) {
      return { required: false } as Rules;
    }

    return {
      required: {
        value: true,
        message: `Vui lòng nhập ${label} đầy đủ!`,
      },
    };
  },
  rePwd: ({ pwd, repwd }: { pwd: string; repwd: string }) => {
    return {
      validate() {
        if (!isEqual(pwd, repwd)) {
          return "Mật khẩu mới không khớp nhau";
        }
      },
    } as Rules;
  },
  dateValidator: ({ label = "" }: { label?: string } = {}) => {
    return {
      validate: {
        required: (v: string | null | undefined) => {
          if (!v) return true;

          try {
            const [day, month, year] = v.split("/").map(Number);
            const inputDate = new Date(year, month - 1, day);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (inputDate > today) {
              return `${label || "Ngày"} phải nhỏ hơn hoặc bằng hôm nay`;
            }
          } catch (e) {
            console.error("Invalid date format", e);
            return "Định dạng ngày không hợp lệ (dd/MM/yyyy)";
          }

          return true;
        },
      },
    } as Rules;
  },

  timeValidator: ({ label = "" }: { label?: string } = {}) => {
    return {
      validate: {
        required: (v: string | null | undefined) => {
          if (!v) return true;

          try {
            const [hours, minutes] = v.split(":").map(Number);
            const now = new Date();
            const inputTime = new Date();
            inputTime.setHours(hours, minutes, 0, 0);

            if (inputTime > now) {
              return `${label || "Giờ"} phải nhỏ hơn giờ hiện tại`;
            }
          } catch (e) {
            console.error("Invalid time format", e);
            return "Định dạng giờ không hợp lệ (HH:mm)";
          }

          return true;
        },
      },
    } as Rules;
  },

  valueGreaterThanZero: ({ label }: { label: string }) => {
    return {
      validate: {
        required: (v: number) => {
          if (v === null || v === undefined) return true;
          if (Number(v) === null) return true;
          if (Number(v) <= 0) {
            return `Giá trị ${label} phải lớn hơn 0!`;
          }
        },
      },
    };
  },
  valueInRange: ({
    value,
    minValue,
    label,
    maxValue,
  }: {
    value: number;
    label: string;
    minValue: number;
    maxValue: number;
  }) => {
    return {
      validate() {
        if (value >= maxValue || value <= minValue) {
          return `Gia trị ${label} phải bé hơn ${maxValue} và lớn hơn ${minValue}!`;
        }
      },
    } as Rules;
  },
  valueInRangeOrEqual: ({
    value,
    minValue,
    label,
    maxValue,
  }: {
    value: number;
    label: string;
    minValue: number;
    maxValue: number;
  }) => {
    return {
      validate() {
        if (value > maxValue || value < minValue) {
          return `Gia trị ${label} phải bé hơn hoặc bằng ${maxValue} và lớn hơn ${minValue}!`;
        }
      },
    } as Rules;
  },

  validateTemperature: () => {
    return {
      validate: {
        required: (v: number) => {
          if (v === null || v === undefined) return true;
          if (Number(v) <= 0) {
            return "Giá trị phải lớn hơn 0!";
          }
        },
        warning: (v: number) => {
          if (v === null || v === undefined) return true;
          if (Number(v) > 37.5) return "Thân nhiệt cao/Sốt!";
          if (Number(v) < 36) return "Thân nhiệt thấp!";
        },
      },
    };
  },

  validatePulse: () => {
    return {
      validate: {
        required: (v: number) => {
          if (v === null || v === undefined) return true;
          if (Number(v) <= 0) return "Giá trị phải lớn hơn 0!";
        },
        warning: (v: number) => {
          if (v === null || v === undefined) return true;
          if (Number(v) > 80) return "Nhịp mạch nhanh!";
          else if (Number(v) < 40) return "Nhịp mạch chậm!";
        },
      },
    };
  },
  validateSystolicBP: ({ value2 }: { value2: number | null }) => {
    return {
      validate: {
        required: (v: number) => {
          if (v === null || v === undefined) return true;
          if (Number(v) <= 0) return "Giá trị phải lớn hơn 0!";
          if (Number(value2) && Number(v) <= Number(value2))
            return "Huyết áp tâm thu phải lớn hơn huyết áp tâm trương!";
          return true;
        },
        warning: (v: number) => {
          if (!v) return true; // Bỏ qua nếu chưa nhập
          if (Number(v) > 140) return "Huyết áp tâm thu cao!";
          if (Number(v) < 90) return "Huyết áp tâm thu thấp!";
          return true;
        },
      },
    };
  },
  validateDiastolicBP: () => {
    return {
      validate: {
        required: (v: number) => {
          if (v === null || v === undefined) return true;
          if (Number(v) <= 0) return "Giá trị phải lớn hơn 0!";
        },
        warning: (v: number) => {
          if (v === null || v === undefined) return true;
          if (Number(v) > 100) return "Huyết áp tâm trương cao!";
          if (Number(v) < 50) return "Huyết áp tâm trương thấp!";
        },
      },
    };
  },
  validateSpO2: () => {
    return {
      validate: {
        required: (v: number) => {
          if (v === null || v === undefined) return true;
          if (Number(v) <= 0) return "Giá trị phải lớn hơn 0!";
          if (Number(v) > 100) return "Giá trị phải bé hơn hoặc bằng 100!";
        },
        warning: (v: number) => {
          if (v === null || v === undefined) return true;
          if (Number(v) < 90) return "Cấp cứu!";
          if (Number(v) < 97) return "Oxy trong máu thấp!";
        },
      },
    };
  },
  validateRespiration: () => {
    return {
      validate: {
        required: (v: number) => {
          if (v === null || v === undefined) return true;
          if (Number(v) <= 0) return "Giá trị phải lớn hơn 0!";
          if (Number(v) % 1 === 0) return "Giá trị phải là số thập phân!";
        },
        warning: (v: number) => {
          if (v === null || v === undefined) return true;
          if (Number(v) < 12) return "Nhịp thở chậm!";
          if (Number(v) > 22) return "Nhịp thở nhanh!";
        },
      },
    };
  },
  validateRespirationByAge: ({
    value,
    ageInDays,
  }: {
    value: number;
    ageInDays: number;
  }) => {
    const ranges = [
      { minAge: 0, maxAge: 30, min: 40, max: 60 },
      { minAge: 31, maxAge: 180, min: 35, max: 40 },
      { minAge: 181, maxAge: 365, min: 30, max: 35 },
      { minAge: 366, maxAge: 1460, min: 25, max: 30 },
      { minAge: 1461, maxAge: 2555, min: 20, max: 25 },
      { minAge: 2556, maxAge: 5840, min: 18, max: 20 },
      { minAge: 5841, maxAge: 24090, min: 16, max: 20 },
      { minAge: 24091, maxAge: 29565, min: 12, max: 28 },
      { minAge: 29566, maxAge: Infinity, min: 10, max: 30 },
    ];

    const range = ranges.find(
      (r) => ageInDays >= r.minAge && ageInDays <= r.maxAge
    );
    if (!range) return {};

    return {
      validate: {
        warning: () => {
          if (value < range.min || value > range.max) {
            return "Nhịp thở bất thường so với tuổi!";
          }
        },
      },
    };
  },
};
