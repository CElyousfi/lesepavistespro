/**
 * WhatsApp deep links.
 *
 * wa.me expects the number in international format WITHOUT a leading '+' —
 * https://wa.me/+33602427345 is invalid and 21 pages were emitting it. Every
 * WhatsApp URL in the app must be built through this helper so the format
 * cannot drift again.
 */

/** Business WhatsApp number, digits only, country code included. */
export const WHATSAPP_NUMBER = '33602427345';

/**
 * Build a wa.me link, URL-encoding the prefilled message.
 *
 * @example whatsappUrl("Bonjour, je souhaite un devis")
 *          → https://wa.me/33602427345?text=Bonjour%2C%20je%20souhaite%20un%20devis
 */
export function whatsappUrl(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Default prefilled message for the floating button and generic CTAs. */
export const WHATSAPP_DEFAULT_MESSAGE =
  "Bonjour, je souhaite un devis pour l'enlèvement d'une épave";
