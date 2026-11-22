import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import ts from "typescript";

// Exercise the actual component effect without contacting advertising services.
const compile = path => ts.transpileModule(fs.readFileSync(new URL(path, import.meta.url), "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
}).outputText;
const helper = { exports: {} };
vm.runInNewContext(compile("../src/lib/contact-events.ts"), { exports: helper.exports, URL });

function fixture(consent) {
  let handler;
  let removed = false;
  const cleanups = [];
  const pixels = [];
  const conversions = [];
  const window = { dataLayer: [], fbq: (...args) => pixels.push(args), gtag: (...args) => conversions.push(args) };
  class Element {
    constructor(href, textContent) { this.link = { href, textContent }; }
    closest() { return this.link; }
  }
  const exports = {};
  vm.runInNewContext(compile("../src/components/analytics.tsx"), {
    exports, window, Element,
    document: { addEventListener: (event, callback) => { assert.equal(event, "click"); handler = callback; }, removeEventListener: () => { removed = true; } },
    require: name => {
      if (name === "react") return { useSyncExternalStore: () => consent, useEffect: effect => { const cleanup = effect(); if (cleanup) cleanups.push(cleanup); } };
      if (name === "react/jsx-runtime") return { jsx: (type, props) => ({ type, props }), jsxs: (type, props) => ({ type, props }) };
      if (name === "next/script") return "script";
      if (name === "@/lib/contact-events") return helper.exports;
      throw new Error(`Unexpected import: ${name}`);
    },
  });
  const tree = exports.Analytics();
  return { tree, window, pixels, conversions, click: (href, label) => handler?.({ target: new Element(href, label) }), cleanup: () => { cleanups.forEach(fn => fn()); return removed; }, attached: () => Boolean(handler) };
}

test("no contact tracking or external scripts before consent or after rejection", () => {
  for (const consent of [null, "rejected"]) {
    const state = fixture(consent);
    assert.equal(state.attached(), false);
    assert.ok(!JSON.stringify(state.tree).includes("fbevents.js"));
  }
});
test("one booking click emits both data-layer events and exactly one conversion per provider", () => {
  const state = fixture("accepted");
  state.click("https://wa.me/5544991721222", "Agende sua avaliação respiratória ↗");
  assert.deepEqual(Array.from(state.window.dataLayer, item => item.event), ["contact_whatsapp", "schedule_evaluation"]);
  assert.equal(state.conversions.length, 1);
  assert.equal(state.conversions[0][2].send_to, "AW-11066995783/Wb-zCI3NpN0YEMfok50p");
  assert.equal(state.pixels.length, 1);
  assert.deepEqual(state.pixels[0].slice(0, 3), ["trackSingle", "625445269122554", "Lead"]);
  assert.ok(JSON.stringify(state.tree).includes("gtm.blocklist"));
  assert.equal(state.cleanup(), true);
});
test("telephone contacts work and unrelated links do not trigger conversions", () => {
  const state = fixture("accepted");
  state.click("tel:+554430311222", "Telefone");
  state.click("https://www.google.com/maps", "Ver no mapa");
  assert.equal(state.window.dataLayer.length, 1);
  assert.equal(state.window.dataLayer[0].event, "contact_phone");
  assert.equal(state.conversions.length, 1);
  assert.equal(state.pixels[0][2], "Contact");
});
