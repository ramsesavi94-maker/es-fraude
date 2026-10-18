import assert from "node:assert/strict";
import { test } from "node:test";
import { reportPlan } from "../src/report.js";
import type { Extraction } from "../src/types.js";

const base: Extraction = { text: "", channel: "sms", claimedEntity: null, entityType: "desconocido", urls: [], phones: [], amounts: [], requests: [], urgency: false };

test("fake SAT starts with the SAT fake-email route and includes state complaints", () => {
  const plan = reportPlan(["sat_impersonation"], base, "es");
  assert.equal(plan.routes[0].id, "sat_correos_falsos");
  assert.ok(plan.routes.some((r) => r.id === "cdmx_denuncia_digital" && r.type === "denuncia_penal"));
  assert.ok(plan.routes.some((r) => r.id === "denuncia_anonima_089" && r.script?.length));
});

test("WhatsApp cases add the in-app report and the account recovery step", () => {
  const plan = reportPlan(["family_impersonation"], { ...base, channel: "whatsapp" }, "es");
  assert.equal(plan.routes[0].id, "whatsapp_reportar");
  assert.ok(plan.urgent.some((u) => u.text.includes("WhatsApp")));
});

test("the WhatsApp recovery step is not shown for unrelated cases", () => {
  const plan = reportPlan(["bank_impersonation"], base, "es");
  assert.ok(!plan.urgent.some((u) => u.text.includes("código de WhatsApp")));
});

test("routes are never duplicated", () => {
  const plan = reportPlan(["loan_app_extortion", "phone_extortion"], base, "es");
  const ids = plan.routes.map((r) => r.id);
  assert.equal(new Set(ids).size, ids.length);
});

test("English plan translates names and steps but keeps targets", () => {
  const es = reportPlan(["sat_impersonation"], base, "es");
  const en = reportPlan(["sat_impersonation"], base, "en");
  assert.equal(en.routes[0].target, es.routes[0].target);
  assert.notEqual(en.routes[0].name, es.routes[0].name);
  assert.match(en.urgent[0].text, /bank/);
});
