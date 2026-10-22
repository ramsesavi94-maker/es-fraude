import assert from "node:assert/strict";
import { test } from "node:test";
import { mentions } from "../src/analyze.js";

test("matches whole words only", () => {
  assert.equal(mentions("El SAT alerta sobre correos falsos", "SAT"), true);
  assert.equal(mentions("Garantiza el derecho a una educación satisfactoria", "SAT"), false);
  assert.equal(mentions("Secretaría de Finanzas", "SAT"), false);
});

test("ignores case and accents, and matches multi-word names", () => {
  assert.equal(mentions("Alerta de BBVA México por mensajes falsos", "BBVA Mexico"), true);
  assert.equal(mentions("bbva-mx-seguridad.com fue reportado", "bbva-mx-seguridad.com"), true);
});

test("phone numbers compare digits only", () => {
  assert.equal(mentions("Llamadas del 55 4821 9037 reportadas", "48219037"), true);
});
