// Runs a few invented sample messages and prints a compact summary of each verdict.
// Usage: npx tsx --env-file=.env scripts/samples.ts
import { analyze } from "../src/analyze.js";

const SAMPLES: { label: string; text: string }[] = [
  {
    label: "falso SAT",
    text: "SAT: Tienes una devolucion de impuestos pendiente por $4,850. Para recibirla confirma tus datos bancarios antes de 24 hrs en sat-devoluciones-mx.com/confirmar o se cancelara.",
  },
  {
    label: "aviso real del Buzón (no debe ser alto)",
    text: "SAT informa: Tienes un nuevo mensaje en tu Buzon Tributario. Consultalo ingresando a sat.gob.mx con tu RFC y contrasena.",
  },
  {
    label: "familiar suplantado",
    text: "Hola tía, soy Andrés, cambié de número porque se me cayó el cel. Oye me urge que me prestes 3,500 para pagar algo hoy, te los regreso el lunes. Te paso la cuenta: 4152 3138 0000 0000 a nombre de Luis Pérez.",
  },
  {
    label: "montadeudas",
    text: "PRESTAMO EXPRESS: tu deuda de $2,300 vence HOY. Si no pagas antes de las 6pm enviaremos a todos tus contactos que eres un deudor y un estafador, con tu foto. Paga al 55 4821 9037 por transferencia.",
  },
];

for (const s of SAMPLES) {
  const started = Date.now();
  const { verdict, checks, trace } = await analyze({ kind: "message", text: s.text });
  console.log(`\n### ${s.label} → ${verdict.risk.toUpperCase()} (${Date.now() - started} ms)`);
  console.log(verdict.summary);
  console.log(`Patrones: ${verdict.patterns.map((p) => p.id).join(", ") || "(ninguno)"}`);
  for (const sig of verdict.signals) console.log(`  - ${sig.signal} «${sig.quote}»`);
  for (const c of checks) console.log(`  ✓ ${c.check}: ${c.result}${c.evidence?.length ? ` [${c.evidence.map((e) => e.url).join(", ")}]` : ""}`);
  console.log(`  ⏱ ${trace.map((t) => `${t.step} ${t.ms}ms`).join(" | ")}`);
  console.log(`Canales: ${verdict.channels.map((c) => `${c.name} ${c.contact}`).join(" | ")}`);
}
