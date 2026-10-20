import assert from "node:assert/strict";
import { test } from "node:test";
import { emailFacts, extractEmails, urlFacts } from "../src/linkcheck.js";

test("shorteners, IP hosts and insecure links are flagged", () => {
  assert.equal(urlFacts("https://bit.ly/3xYz")?.shortener, true);
  assert.equal(urlFacts("http://185.23.4.10/banco")?.isIp, true);
  assert.equal(urlFacts("http://185.23.4.10/banco")?.insecure, true);
  assert.equal(urlFacts("https://www.sat.gob.mx")?.insecure, false);
});

test("look-alike letters are detected through punycode", () => {
  assert.equal(urlFacts("https://bbvа.mx/login")?.disguised, true); // Cyrillic "а"
  assert.equal(urlFacts("https://bbva.mx/login")?.disguised, false);
});

test("risky TLDs are reported, ordinary ones are not", () => {
  assert.equal(urlFacts("premio-liverpool.xyz")?.riskyTld, "xyz");
  assert.equal(urlFacts("liverpool.com.mx")?.riskyTld, null);
});

test("emails are split out so their domain is not read as a link", () => {
  const { emails, rest } = extractEmails('De: "SAT Notificaciones" <avisos@sat-notifica.com> revisa sat-notifica.com/pago');
  assert.deepEqual(emails, [{ address: "avisos@sat-notifica.com", displayName: "SAT Notificaciones" }]);
  assert.ok(rest.includes("sat-notifica.com/pago"));
  assert.ok(!rest.includes("@"));
});

test("free accounts and mismatched display names are caught", () => {
  assert.equal(emailFacts("sat.mexico.avisos@gmail.com", null, "SAT").freeProvider, true);
  assert.equal(emailFacts("avisos@notificaciones-mx.com", "SAT Notificaciones", "SAT").displayMismatch, true);
  assert.equal(emailFacts("avisos@sat.gob.mx", "SAT", "SAT").displayMismatch, false);
  assert.equal(emailFacts("ana@empresa.com", "Ana López", null).displayMismatch, false);
});
