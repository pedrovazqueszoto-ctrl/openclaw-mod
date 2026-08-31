# 🇵🇪 Peru Conet — Paquete Bug Bounty para OpenClaw

Paquete **completo y sanitizado** (sin API keys, sin tokens) del agente de bug bounty **peru-conet**, listo para que cada auditor de la comunidad lo monte en su propio OpenClaw con **sus propias claves**.

## 📦 ¿Qué trae?

```
config-comunidad/
├── README.md                  ← este archivo
├── INSTALACION.md             ← paso a paso para montarlo
├── openclaw.example.json      ← configuración OpenClaw (modelo MiniMax M3 free/pago)
├── AGENTS.md                  ← política del agente (autorización, arsenal, flujo)
├── SOUL.md                    ← personalidad y reglas clave
├── skills/
│   └── bug-bounty-agent/
│       └── SKILL.md           ← skill orquestador (recon→enum→scan→explotación→reporte)
└── sandbox/
    ├── Dockerfile
    ├── Dockerfile.sandbox
    ├── Dockerfile.sandbox-common
    └── Dockerfile.sandbox-browser
```

## 🚀 Resumen de instalación

1. Crea una cuenta **GRATIS** en [OpenRouter](https://openrouter.ai) y genera tu API key.
2. Copia `openclaw.example.json` → `C:\Users\TU_USUARIO\.openclaw\openclaw.json`.
3. Edítalo y reemplaza los placeholders `TU_...` por **TUS** claves.
4. Copia `AGENTS.md` y `SOUL.md` a la carpeta de workspace de tu agente (`...\.openclaw\workspace-peru-conet\`).
5. Copia `skills\bug-bounty-agent` a `C:\Users\TU_USUARIO\.openclaw\skills\bug-bounty-agent\`.
6. Construye la imagen del sandbox con el arsenal (ver `INSTALACION.md`, Paso 5).
7. Reinicia el gateway y recrea el sandbox del agente.

El paso a paso detallado está en [`INSTALACION.md`](INSTALACION.md).

## ⚠️ Uso legal y ético (LEER)

Este paquete es para **auditores legales** y pruebas de seguridad **autorizadas**.

- Solo contra objetivos que tengas **autorizados por escrito** (en este setup el operador autoriza con la palabra **"jefe"**).
- El alcance es **estrictamente** los objetivos autorizados. **NUNCA ataques hosts fuera de alcance.**
- Las pruebas destructivas están **permitidas SOLO** dentro del objetivo autorizado (por decisión del operador), nunca contra sistemas ajenos.
- El uso indebido contra sistemas sin permiso es **ilegal**. La responsabilidad es de quien lo usa.

## 💰 Costo

- El modelo principal `minimax/minimax-m3:free` es **GRATIS** (contexto 1M) — funciona con cualquier key de OpenRouter.
- El respaldo `minimax/minimax-m3` (de pago, $0.30/M in, $1.20/M out) es **opcional**.
- Alternativa gratuita de respaldo: `deepseek/deepseek-v4-flash` (más barato aún) — puedes cambiar el fallback.

## 🔐 Seguridad

- **NUNCA subas tu `openclaw.json` con claves reales** a GitHub (ni siquiera a un repo privado). Usa este ejemplo con placeholders.
- El token del gateway debe ser **único por persona** (genéralo nuevo, no uses el de otro).
- Cada miembro usa sus propias API keys de OpenRouter (gratis).

## 📝 Notas técnicas

- El shell del sandbox es `/bin/sh` (dash): **no expande llaves `{}`** → usa directorios explícitos (`mkdir -p /workspace/recon /workspace/enum /workspace/scan /workspace/report`).
- `openrouter/qwen/qwen3-8b` ya no existe en OpenRouter (fue retirado) — no lo uses como modelo; el agente peru-conet usa minimax.
- El modelo por defecto de un agente "main" es qwen/groq; para bug bounty usa el agente **peru-conet** que ya apunta a minimax.
