import { pinTitle, type CommunePin } from "./communePins";
import styles from "./CommunePin.module.css";

// DOM content for a Google Maps advanced marker. Markers live outside React,
// so the element is built imperatively with the same styles as <SchematicMap>.
export function createPinElement(pin: CommunePin): HTMLElement {
  const root = document.createElement("div");
  root.className = styles.pin ?? "";
  root.title = pinTitle(pin);
  if (pin.selected) root.dataset.selected = "";
  if (pin.count === 0) root.dataset.empty = "";

  const count = document.createElement("span");
  count.className = styles.count ?? "";
  count.textContent = pin.count.toLocaleString("es-CL");

  root.append(count, pin.commune.name);
  return root;
}
