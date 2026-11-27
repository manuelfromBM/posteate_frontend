import type { Post } from "@/domain";
import { contactEmailSubject, contactMessage } from "@/features/posts";
import { EmailButton } from "@/shared/ui/EmailButton";
import { WhatsAppButton } from "@/shared/ui/WhatsAppButton";

import styles from "./FloatingContact.module.css";

interface FloatingContactProps {
  post: Post;
  authorName: string;
}

// Round contact buttons fixed to the bottom corner, so contacting is always one
// tap away while reading. Email only when the author entered one.
export function FloatingContact({ post, authorName }: FloatingContactProps) {
  return (
    <div className={styles.floating} role="group" aria-label="Contactar">
      {post.contactEmail && (
        <EmailButton
          email={post.contactEmail}
          subject={contactEmailSubject(post)}
          body={contactMessage(post)}
          label={`Enviar correo a ${authorName}`}
          size="lg"
        />
      )}
      <WhatsAppButton
        phone={post.contactWhatsapp}
        message={contactMessage(post)}
        label={`Contactar por WhatsApp a ${authorName}`}
        size="lg"
      />
    </div>
  );
}
