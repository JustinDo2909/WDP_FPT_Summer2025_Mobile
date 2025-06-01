export function ApplyMask(
  text: string,
  mask?: string
): { masked: string; raw: string } {
  if (typeof text !== "string") {
    text = ""; // nếu không phải string thì gán rỗng
  }
  const raw = text.replace(/\D/g, "");

  if (!mask) return { masked: raw, raw };

  let masked = "";
  let rawIndex = 0;

  for (let i = 0; i < mask.length; i++) {
    const m = mask[i];

    if (m === "9") {
      if (raw[rawIndex]) {
        masked += raw[rawIndex];
        rawIndex++;
      } else {
        break;
      }
    } else {
      masked += m;
    }
  }

  return { masked, raw };
}
