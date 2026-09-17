// Only http(s) URLs may be used as link targets for submitter-supplied
// values. Anything else (javascript:, data:, relative junk) returns null and
// callers render the raw text instead of a link.
export function safeHttpUrl(value) {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return /^https?:\/\/[^\s]+$/i.test(trimmed) ? trimmed : null;
}
