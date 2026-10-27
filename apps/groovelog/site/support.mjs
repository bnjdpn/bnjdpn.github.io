// Exact existing forms, retained from the read-only reference stage.
// overlay() checks equality before rendering, so endpoint, fields and Turnstile cannot drift.
export const forms = {
  "en-US": "<form class=\"support-form\" action=\"/api/contact\" method=\"POST\" data-sending=\"Sending…\" data-success=\"Message sent. Thank you.\" data-error=\"The message could not be sent. Please try again.\">\n        <input type=\"hidden\" name=\"app\" value=\"GrooveLog\"><input type=\"hidden\" name=\"_subject\" value=\"GrooveLog support request\"><label class=\"honeypot\" aria-hidden=\"true\">Leave empty<input type=\"text\" name=\"_gotcha\" tabindex=\"-1\" autocomplete=\"off\"></label>\n        <label><span>Category</span><select name=\"category\" required><option value=\"\" selected disabled>—</option><option value=\"Question\">Question</option><option value=\"Bug\">Bug</option><option value=\"Accessibility\">Accessibility</option><option value=\"Privacy\">Privacy</option><option value=\"Other\">Other</option></select></label>\n        <label><span>Your email</span><input type=\"email\" name=\"email\" autocomplete=\"email\" required></label>\n        <label><span>App version</span><input type=\"text\" name=\"app_version\"></label><label><span>OS version</span><input type=\"text\" name=\"os_version\"></label>\n        <label class=\"message-field\"><span>Message</span><textarea name=\"message\" required></textarea></label>\n        <div class=\"cf-turnstile\" data-sitekey=\"0x4AAAAAAFb8sZbCULV4skmB\" data-action=\"contact\"></div>\n        <button type=\"submit\">Send message</button><p class=\"form-status\" role=\"status\" aria-live=\"polite\"></p>\n      </form>",
  "fr-FR": "<form class=\"support-form\" action=\"/api/contact\" method=\"POST\" data-sending=\"Envoi…\" data-success=\"Message envoyé. Merci.\" data-error=\"Le message n’a pas pu être envoyé. Réessayez.\">\n        <input type=\"hidden\" name=\"app\" value=\"GrooveLog\"><input type=\"hidden\" name=\"_subject\" value=\"GrooveLog support request\"><label class=\"honeypot\" aria-hidden=\"true\">Leave empty<input type=\"text\" name=\"_gotcha\" tabindex=\"-1\" autocomplete=\"off\"></label>\n        <label><span>Catégorie</span><select name=\"category\" required><option value=\"\" selected disabled>—</option><option value=\"Question\">Question</option><option value=\"Bug\">Bug</option><option value=\"Accessibilité\">Accessibilité</option><option value=\"Confidentialité\">Confidentialité</option><option value=\"Autre\">Autre</option></select></label>\n        <label><span>Votre e-mail</span><input type=\"email\" name=\"email\" autocomplete=\"email\" required></label>\n        <label><span>Version de l’app</span><input type=\"text\" name=\"app_version\"></label><label><span>Version du système</span><input type=\"text\" name=\"os_version\"></label>\n        <label class=\"message-field\"><span>Message</span><textarea name=\"message\" required></textarea></label>\n        <div class=\"cf-turnstile\" data-sitekey=\"0x4AAAAAAFb8sZbCULV4skmB\" data-action=\"contact\"></div>\n        <button type=\"submit\">Envoyer</button><p class=\"form-status\" role=\"status\" aria-live=\"polite\"></p>\n      </form>",
  "de-DE": "<form class=\"support-form\" action=\"/api/contact\" method=\"POST\" data-sending=\"Wird gesendet…\" data-success=\"Nachricht gesendet. Danke.\" data-error=\"Die Nachricht konnte nicht gesendet werden. Bitte erneut versuchen.\">\n        <input type=\"hidden\" name=\"app\" value=\"GrooveLog\"><input type=\"hidden\" name=\"_subject\" value=\"GrooveLog support request\"><label class=\"honeypot\" aria-hidden=\"true\">Leave empty<input type=\"text\" name=\"_gotcha\" tabindex=\"-1\" autocomplete=\"off\"></label>\n        <label><span>Kategorie</span><select name=\"category\" required><option value=\"\" selected disabled>—</option><option value=\"Frage\">Frage</option><option value=\"Fehler\">Fehler</option><option value=\"Barrierefreiheit\">Barrierefreiheit</option><option value=\"Datenschutz\">Datenschutz</option><option value=\"Sonstiges\">Sonstiges</option></select></label>\n        <label><span>Ihre E-Mail</span><input type=\"email\" name=\"email\" autocomplete=\"email\" required></label>\n        <label><span>App-Version</span><input type=\"text\" name=\"app_version\"></label><label><span>Betriebssystemversion</span><input type=\"text\" name=\"os_version\"></label>\n        <label class=\"message-field\"><span>Nachricht</span><textarea name=\"message\" required></textarea></label>\n        <div class=\"cf-turnstile\" data-sitekey=\"0x4AAAAAAFb8sZbCULV4skmB\" data-action=\"contact\"></div>\n        <button type=\"submit\">Nachricht senden</button><p class=\"form-status\" role=\"status\" aria-live=\"polite\"></p>\n      </form>",
  "es-ES": "<form class=\"support-form\" action=\"/api/contact\" method=\"POST\" data-sending=\"Enviando…\" data-success=\"Mensaje enviado. Gracias.\" data-error=\"No se pudo enviar el mensaje. Inténtalo de nuevo.\">\n        <input type=\"hidden\" name=\"app\" value=\"GrooveLog\"><input type=\"hidden\" name=\"_subject\" value=\"GrooveLog support request\"><label class=\"honeypot\" aria-hidden=\"true\">Leave empty<input type=\"text\" name=\"_gotcha\" tabindex=\"-1\" autocomplete=\"off\"></label>\n        <label><span>Categoría</span><select name=\"category\" required><option value=\"\" selected disabled>—</option><option value=\"Pregunta\">Pregunta</option><option value=\"Error\">Error</option><option value=\"Accesibilidad\">Accesibilidad</option><option value=\"Privacidad\">Privacidad</option><option value=\"Otro\">Otro</option></select></label>\n        <label><span>Tu correo</span><input type=\"email\" name=\"email\" autocomplete=\"email\" required></label>\n        <label><span>Versión de la app</span><input type=\"text\" name=\"app_version\"></label><label><span>Versión del sistema</span><input type=\"text\" name=\"os_version\"></label>\n        <label class=\"message-field\"><span>Mensaje</span><textarea name=\"message\" required></textarea></label>\n        <div class=\"cf-turnstile\" data-sitekey=\"0x4AAAAAAFb8sZbCULV4skmB\" data-action=\"contact\"></div>\n        <button type=\"submit\">Enviar mensaje</button><p class=\"form-status\" role=\"status\" aria-live=\"polite\"></p>\n      </form>"
};
export const legacyIds = {
  "en-US": [
    "main",
    "practice-title",
    "hero-title",
    "rhythm",
    "rhythm-title",
    "features",
    "features-title",
    "journal-guide-title",
    "shelf-title",
    "more-apps",
    "related-title",
    "contact",
    "contact-title"
  ],
  "fr-FR": [
    "main",
    "practice-title",
    "hero-title",
    "rhythm",
    "rhythm-title",
    "features",
    "features-title",
    "journal-guide-title",
    "shelf-title",
    "more-apps",
    "related-title",
    "contact",
    "contact-title"
  ],
  "de-DE": [
    "main",
    "practice-title",
    "hero-title",
    "rhythm",
    "rhythm-title",
    "features",
    "features-title",
    "journal-guide-title",
    "shelf-title",
    "more-apps",
    "related-title",
    "contact",
    "contact-title"
  ],
  "es-ES": [
    "main",
    "practice-title",
    "hero-title",
    "rhythm",
    "rhythm-title",
    "features",
    "features-title",
    "journal-guide-title",
    "shelf-title",
    "more-apps",
    "related-title",
    "contact",
    "contact-title"
  ]
};
