// Three-state yes/no fields (access_cost, credential_status). The API stores
// and returns "yes", "no" or "n/a" (unknown) since the October 2026 change;
// records written before that may still carry the legacy forms (true/false,
// 0/1, "true"/"false") until the reindex has migrated them, so every reader
// goes through normalizeYesNo (issues #52, #78, #86).
export function normalizeYesNo(value) {
  if (value === true) return "yes";
  if (value === false) return "no";
  if (typeof value === "number") return value ? "yes" : "no";
  const text = String(value == null ? "" : value).trim().toLowerCase();
  if (["yes", "y", "true", "t", "1", "fee"].includes(text)) return "yes";
  if (["no", "n", "false", "f", "0", "no fee"].includes(text)) return "no";
  return "n/a";
}

export function accessCostLabel(value) {
  return { yes: "Fee", no: "No fee", "n/a": "Unknown" }[normalizeYesNo(value)];
}

export function yesNoLabel(value) {
  return { yes: "Yes", no: "No", "n/a": "Unknown" }[normalizeYesNo(value)];
}
