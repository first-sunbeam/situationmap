import { useId } from "vue";

export function useFieldIds(hint: string | undefined, error: string | undefined) {
  const hintId = hint ? useId() : undefined;
  const errorId = error ? useId() : undefined;

  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return { hintId, errorId, describedBy };
}
