// DOM helpers for the parts of the metadata form that are still built
// imperatively. Everything here uses createElement/textContent, never
// innerHTML, so stored values cannot inject markup.

/**
 * Append a checked checkbox + label to a "selected items" list element.
 * If the element holds no checkbox yet, its placeholder text is cleared first.
 * The checkbox `value` attribute is the plain value string, which is what the
 * submission code reads back.
 */
export function appendCheckboxListItem(listEl, { name, id, value }) {
  if (!listEl) return;
  const text = typeof value === "string" ? value : JSON.stringify(value);
  if (!listEl.querySelector('input[type="checkbox"]')) {
    listEl.textContent = "";
  } else {
    listEl.appendChild(document.createElement("br"));
  }
  const input = document.createElement("input");
  input.type = "checkbox";
  input.name = name;
  input.id = id;
  input.value = text;
  input.checked = true;
  input.className = "flexdatalist_checkbox";
  const label = document.createElement("label");
  label.htmlFor = id;
  label.textContent = " " + text;
  listEl.appendChild(input);
  listEl.appendChild(label);
}
