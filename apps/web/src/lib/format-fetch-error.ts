/**
 * Format errors for UI. Solid's `createResource` wraps non-`Error` rejections in
 * `Error("Unknown error", { cause })` — unwrap `cause` for API `{ message }` bodies.
 */
export const formatFetchError = (err: unknown): string => {
  if (err instanceof Error) {
    if (err.cause !== undefined) {
      return formatFetchError(err.cause);
    }
    return err.message;
  }
  if (
    typeof err === 'object' &&
    err !== null &&
    'message' in err &&
    typeof (err as { message: unknown }).message === 'string'
  ) {
    return (err as { message: string }).message;
  }
  return String(err);
};
