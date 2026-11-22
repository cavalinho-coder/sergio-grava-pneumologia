import test from "node:test";
import assert from "node:assert/strict";
import { contactEvents } from "../src/lib/contact-events.ts";

test("WhatsApp booking records both requested events with one conversion decision", () => {
  assert.deepEqual(contactEvents("https://wa.me/5544991721222", "Agende sua avaliação respiratória ↗"), {
    channel: "whatsapp", scheduling: true, events: ["contact_whatsapp", "schedule_evaluation"],
  });
});
test("phone and plain WhatsApp links record a contact without a booking event", () => {
  assert.deepEqual(contactEvents("tel:+554430311222", "Telefone"), { channel: "phone", scheduling: false, events: ["contact_phone"] });
  assert.deepEqual(contactEvents("https://wa.me/5544991721222", "WhatsApp"), { channel: "whatsapp", scheduling: false, events: ["contact_whatsapp"] });
});
test("internal, mail, maps and lookalike URLs cannot become contact conversions", () => {
  for (const href of ["/programas/asma", "mailto:sergiogravapneumo@gmail.com", "https://maps.google.com", "https://wa.me.example.com", "http://wa.me/5544991721222"]) {
    assert.equal(contactEvents(href, "Agende sua avaliação"), null);
  }
});
