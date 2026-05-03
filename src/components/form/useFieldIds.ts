import { computed, toValue, useId, type MaybeRefOrGetter } from "vue";

export function useFieldIds(
  hint?: MaybeRefOrGetter<string | undefined>,
  error?: MaybeRefOrGetter<string | undefined>
) {
  const hintId = useId();
  const errorId = useId();

  const describedBy = computed(() => {
    return [
      toValue(hint) ? hintId : undefined,
      toValue(error) ? errorId : undefined
    ].filter(Boolean).join(" ") || undefined;
  });

  return { hintId, errorId, describedBy };
}
