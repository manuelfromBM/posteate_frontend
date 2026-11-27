import Link from "next/link";

import { searchHref, toggleValue, type SearchState } from "../lib/searchState";
import { pinTitle, type CommunePin } from "./communePins";
import type { LatLngBoundsLiteral } from "./google/types";
import styles from "./CommuneMap.module.css";
import pinStyles from "./CommunePin.module.css";

interface SchematicMapProps {
  state: SearchState;
  pins: CommunePin[];
  bounds: LatLngBoundsLiteral;
}

const PADDING = 0.12;

// Server-rendered fallback: places each commune by its relative position,
// without map tiles. Works with no API key and without JavaScript.
export function SchematicMap({ state, pins, bounds }: SchematicMapProps) {
  const latSpan = bounds.north - bounds.south || 1;
  const lngSpan = bounds.east - bounds.west || 1;

  const position = ({ lat, lng }: { lat: number; lng: number }) => ({
    left: `${(PADDING + ((lng - bounds.west) / lngSpan) * (1 - 2 * PADDING)) * 100}%`,
    top: `${(PADDING + ((bounds.north - lat) / latSpan) * (1 - 2 * PADDING)) * 100}%`,
  });

  return (
    <div className={styles.canvas}>
      <div className={styles.schematic}>
        {pins.map((pin) => (
          <Link
            key={pin.commune.id}
            href={searchHref(state, {
              communes: toggleValue(state.communes, pin.commune.slug),
            })}
            className={`${pinStyles.pin} ${styles.schematicPin}`}
            style={position(pin.commune.center)}
            title={pinTitle(pin)}
            aria-label={pinTitle(pin)}
            data-selected={pin.selected || undefined}
            data-empty={pin.count === 0 || undefined}
            scroll={false}
          >
            <span className={pinStyles.count}>{pin.count.toLocaleString("es-CL")}</span>
            {pin.commune.name}
          </Link>
        ))}
        <span className={styles.badge}>Mapa referencial</span>
      </div>
    </div>
  );
}
