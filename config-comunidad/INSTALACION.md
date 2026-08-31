# Instalación paso a paso (Windows)

## Requisitos previos
- OpenClaw instalado y funcionando (gateway).
- Docker instalado y corriendo (para el sandbox del agente).
- (Opcional) git instalado.

---

## Paso 1 — Cuenta y API key de OpenRouter (GRATIS)
1. Ve a <https://openrouter.ai/keys> y crea una cuenta.
2. Crea una API key y cópiala (empieza con `sk-or-v1-...`).
3. (Opcional) Clave de Groq en <https://console.groq.com/keys> si quieres el respaldo groq del agente "main".

## Paso 2 — Copiar la configuración
1. Abre tu carpeta de OpenClaw: pulsa `Win+R`, escribe `%USERPROFILE%\.openclaw` y Enter.
2. Copia `openclaw.example.json` a esa carpeta y renómbralo a `openclaw.json` (si ya tienes uno, **respáldalo** antes).
3. Ábrelo con el Bloc de notas y reemplaza los placeholders:
   - `sk-or-v1-TU_OPENROUTER_API_KEY_AQUI` → tu key real de OpenRouter.
   - `gsk_TU_GROQ_API_KEY_AQUI` → tu key de Groq (o déjala tal cual si no la usas).
   - `TU_TOKEN_GATEWAY_GENERA_UNO_NUEVO` → un token nuevo (cadena aleatoria larga). Puedes generarla con PowerShell:
     ```
     -join ((48..57)+(97..122) | Get-Random -Count 48 | ForEach-Object {[char]$_})
     ```
   - (Opcional) Si tu usuario no es `LENOVO`, ajusta las rutas de `agents.defaults.workspace` y `agents.list[].workspace`.
   - Si no tienes la carpeta `D:\10h\skills`, borra o cambia la línea `extraDirs` dentro de `skills.load`.

## Paso 3 — Copiar la política del agente
1. En `%USERPROFILE%\.openclaw\`, crea la carpeta `workspace-peru-conet\` si no existe.
2. Copia `AGENTS.md` y `SOUL.md` dentro.

## Paso 4 — Instalar el skill
1. Crea la carpeta `C:\Users\TU_USUARIO\.openclaw\skills\bug-bounty-agent\`.
2. Copia `skills\bug-bounty-agent\SKILL.md` dentro (es la ubicación canónica que OpenClaw usa).

## Paso 5 — Construir el sandbox con el arsenal (IMPORTANTE)
La imagen `openclaw-sandbox-pentest:bookworm-slim` (con nmap, ffuf, sqlmap, nuclei, katana, gau, waybackurls, whatweb, theHarvester, dalfox, commix, nikto, wpscan, hydra, netexec, msfconsole, etc.) se construye con los Dockerfiles de la carpeta `sandbox\`:

```
cd config-comunidad\sandbox
docker build -f Dockerfile.sandbox -t openclaw-sandbox-pentest:bookworm-slim .
```

> Si el Dockerfile no instala alguna herramienta de la lista de `AGENTS.md`, añádela al Dockerfile y reconstruye.

## Paso 6 — Activar el agente
1. Reinicia el gateway: `openclaw gateway restart`.
2. Recrea el sandbox: `openclaw sandbox recreate --agent peru-conet --force`.
3. Prueba:
   - Escribe `hola` (debe responder con texto, sin herramientas).
   - Contra tu objetivo autorizado: `jefe, busca vulnerabilidades en TU_OBJETIVO`.

## Paso 7 — (Opcional) Compartir con tu comunidad
Crea un repo **PRIVADO** en GitHub y sube **solo la carpeta `config-comunidad`**. **NUNCA** subas tu `openclaw.json` con claves reales. Solo las personas que invites podrán clonarlo.

---

## Solución de problemas

| Problema | Causa / solución |
|---|---|
| El agente no responde | Gateway caído (revisa el puerto 18789) o API key mal pegada. |
| `413 Request too large` | Estás usando un modelo con TPM bajo (Groq free). Usa minimax (ya está configurado). |
| `Nmap couldn't split the subnet mask` | Le pasaste la URL con `https://` a nmap. Pasa solo el host (`ejemplo.com`). |
| El shell no expande `{}` | Usa directorios explícitos (`mkdir -p /workspace/recon /workspace/enum ...`). |
| Error `openrouter/qwen/qwen3-8b is not a valid model ID` | Ese modelo fue retirado de OpenRouter; no lo uses (peru-conet ya usa minimax). |
