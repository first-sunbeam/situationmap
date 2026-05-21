# Backlog

Non-blocking improvements found during the code-quality review.

## Accessibility and validation UX

- Add `role="alert"` or `aria-labelledby` to the validation summary panel in `src/App.vue`.
- Consider moving shared checkbox-group description/error IDs from every checkbox to the surrounding `fieldset` in `ChoiceGroupField.vue`.
- Keep `FieldShell.vue` limited to single native controls (`input`, `select`, `textarea`); use a separate fieldset wrapper if checkbox/radio groups need extraction later.

## Performance

- Lazy-load PDF generation (`pdfmake`) only when the user clicks PDF preview/download. The production PDF chunk is currently large and is the biggest potential performance win.

## Code quality

- Replace route-sync `watchEffect` usage in `src/views/SimpleFormView.vue` and `src/views/ExtendedView.vue` with more explicit `onMounted`/`watch` logic if these views become more complex.
- Add a typed persisted-state helper in e2e tests instead of using `as any` when inspecting localStorage.
- Consider splitting large config files (`formLabels.ts`, `exportSections.ts`, `aboutPage.ts`, `options.ts`) by domain/language if editing them becomes difficult.
