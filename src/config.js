/**
 * Global configuration and externally injected variables.
 * Unfilled prompt variables remain exported as single constants here.
 */

export const WHATSAPP_NUMBER = "551151969134";

export const WHATSAPP_MESSAGE =
  "Olá! Quero solicitar um diagnóstico gratuito para o meu negócio.";

export const PROJECT_METRICS = {};

export const SOCIAL_LINKS = {};

/**
 * Builds the canonical WhatsApp click-to-chat URL.
 * Every WhatsApp link across the application MUST use this helper.
 *
 * @param {string} [customMessage] Optional custom message override
 * @returns {string} Formatted https://wa.me/ URL
 */
export function buildWhatsAppUrl(customMessage) {
  const sanitizedNumber = String(WHATSAPP_NUMBER).replace(/\D/g, "");
  const phoneSegment =
    sanitizedNumber.length > 0 ? sanitizedNumber : WHATSAPP_NUMBER;
  const textToEncode =
    typeof customMessage === "string" && customMessage.trim().length > 0
      ? customMessage
      : WHATSAPP_MESSAGE;

  return `https://wa.me/${phoneSegment}?text=${encodeURIComponent(textToEncode)}`;
}
