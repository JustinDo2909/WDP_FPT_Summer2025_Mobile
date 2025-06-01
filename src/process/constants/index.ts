export * from "./base";
export * from "./env";
export * from "./UISize";

export const _FDate = {
  "/DMY": "DD/MM/YYYY",
  "/DM": "DD/MM",
  "/DMYHM": "DD/MM/YYYY HH:mm",
  "/DMYHMS": "DD/MM/YYYY HH:mm:ss",
  "/HMDMY": "HH:mm DD/MM/YYYY",
  "-/HMDMY": "HH:mm - DD/MM/YYYY",
  "/YMD": "YYYY/MM/DD",
  "/YMDHM": "YYYY/MM/DD HH:mm",
  "/YMDHMS": "YYYY/MM/DD HH:mm:ss",
  "-DMY": "DD-MM-YYYY",
  "-DMYHM": "DD-MM-YYYY HH:mm",
  "-YMD": "YYYY-MM-DD",
  "-YMDHM": "YYYY-MM-DD HH:mm",
  "-YMDHMS": "YYYY-MM-DD HH:mm:ss",
  ":HHmm": "HH:mm",
} as const;

export const ALL: any = [
  {
    Code: null,
    CodeID: null,
    CodeName: "(Tất cả)",
    ShortText: "(Tất cả)",
  },
];
