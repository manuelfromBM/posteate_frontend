import type { PostStatus } from "@/domain";

import { unavailableCopy } from "../lib/availability";
import styles from "./UnavailableNotice.module.css";

interface UnavailableNoticeProps {
  status: Exclude<PostStatus, "active">;
}

export function UnavailableNotice({ status }: UnavailableNoticeProps) {
  const copy = unavailableCopy[status];
  return (
    <div className={styles.notice} role="status">
      <p className={styles.title}>{copy.title}</p>
      <p className={styles.description}>{copy.description}</p>
    </div>
  );
}
