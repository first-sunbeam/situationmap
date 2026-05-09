export function hasOther(selected: string[] = [], value = ""): boolean {
  return selected.some((item) => item.toLowerCase() === "inne") || String(value || "").trim() !== "";
}

export function hasSelectedOther(selected: string[] = []): boolean {
  return selected.some((item) => item.toLowerCase() === "inne");
}
