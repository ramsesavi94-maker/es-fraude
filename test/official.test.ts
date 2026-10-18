import assert from "node:assert/strict";
import { test } from "node:test";
import { brandMatch, officialOwner, registrableDomain } from "../src/official.js";

test("registrable domain keeps country second-level domains", () => {
  assert.equal(registrableDomain("app.cfe.mx"), "cfe.mx");
  assert.equal(registrableDomain("www.liverpool.com.mx"), "liverpool.com.mx");
  assert.equal(registrableDomain("sat.gob.mx.validacion.com"), "validacion.com");
});

test("a company's own domain matches its name", () => {
  assert.equal(brandMatch("app.cfe.mx", "CFE"), "matches");
  assert.equal(brandMatch("www.estafeta.com", "Estafeta"), "matches");
  assert.equal(brandMatch("liverpool.com.mx", "Liverpool"), "matches");
  assert.equal(brandMatch("bbva.mx", "BBVA México"), "matches");
});

test("lookalike domains are flagged as imitations", () => {
  assert.equal(brandMatch("bbva-mx-seguridad.com", "BBVA Mexico"), "imitates");
  assert.equal(brandMatch("sat-devoluciones-mx.com", "SAT"), "imitates");
  assert.equal(brandMatch("sat.gob.mx.validacion.com", "SAT"), "imitates");
});

test("unrelated domains are neither", () => {
  assert.equal(brandMatch("rastreo-paquetes.net", "DHL"), "unrelated");
  assert.equal(brandMatch("ejemplo.com", null), "unrelated");
});

test("official owner compares the real host, not text inside it", () => {
  assert.equal(officialOwner("www.sat.gob.mx"), "SAT");
  assert.equal(officialOwner("sat.gob.mx.validacion.com"), null);
});
