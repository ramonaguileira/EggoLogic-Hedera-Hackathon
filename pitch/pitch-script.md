# Eggologic — Pitch Script & Video Production Guide

## Hedera Hello Future: Apex Hackathon 2026
### Track: Sustainability | Bounty: Hiero

---

## FORMATO DEL VIDEO

| Parámetro | Recomendación |
|---|---|
| Duración | **3:00–4:30 minutos** (sweet spot para hackathons) |
| Formato | Pantalla compartida + cámara frontal (picture-in-picture) |
| Idioma | **Inglés** (audiencia global, jueces internacionales) |
| Resolución | 1080p mínimo |
| Subtítulos | Sí — YouTube auto-captions o manual |
| Música | Suave de fondo, royalty-free |
| Herramientas | OBS Studio (gratis) o Loom |

---

## ESTRUCTURA DEL VIDEO (4 minutos)

### APERTURA — El Gancho (0:00 – 0:30)

**[PANTALLA: Foto real del hub de Eggologic con residuos llegando]**

> "Every day, restaurants throw away organic waste that ends up in landfills, producing methane — a greenhouse gas 80 times more potent than CO₂. But what if that waste could become eggs, compost, and verified carbon credits?
>
> I'm Rafael, from El Tesoro, Maldonado, Uruguay, and this is Eggologic — a real, operating circular economy hub where we turn restaurant waste into protein, eggs, and auditable environmental impact — verified on Hedera."

**NOTA DE DIRECCIÓN:** Hablá directo a la cámara. La palabra clave es **"real"** — repetila. Los jueces ven muchos conceptos teóricos; vos tenés algo funcionando.

---

### SECCIÓN 1 — El Problema + La Operación Real (0:30 – 1:15)

**[PANTALLA: Diagrama simple del ciclo: Residuo → BSF → Huevos → Compost]**

> "1.3 billion tonnes of food are wasted globally every year. In Latin America, there's no incentive for restaurants to separate waste, and no way to verify what happens after collection.
>
> Eggologic solves both problems. We collect organic waste from restaurants, feed it to Black Soldier Fly larvae — which become high-protein feed for our laying hens — and the remaining organic matter becomes compost for local agriculture."

**[PANTALLA: Fotos reales — baldes de residuo, larvas BSF, gallinas, huevos, compost]**

> "We process 300 to 600 kilograms per week. This is not a concept — it's running today in Uruguay."

**NOTA DE DIRECCIÓN:** Mostrá 3-4 fotos reales rápidas. Cada foto 2-3 segundos. El impacto visual de la operación real es enorme frente a jueces que ven mockups todo el día.

---

### SECCIÓN 2 — La Solución Blockchain (1:15 – 2:15)

**[PANTALLA: Diagrama de arquitectura — Dashboard → Guardian MGS → Hedera]**

> "The challenge is: how do you prove this cycle actually happened? How does a restaurant know their waste didn't end up in a landfill? And how do you generate credible carbon credits from composting?
>
> That's where Hedera comes in."

**[PANTALLA: Demo en vivo del dashboard — index.html]**

> "Our dashboard connects directly to Guardian — Hedera's MRV policy engine. When a supplier delivers waste, our Project Proponent fills a simple form: kilograms, contamination, waste type. That's it — 30 seconds.
>
> Guardian creates a Verifiable Credential — a cryptographically signed record of that delivery. Then a VVB — a Validation and Verification Body — reviews and approves it."

**[PANTALLA: HashScan mostrando la transacción de mint de EGGOCOIN en testnet]**

> "The moment the VVB approves, Guardian automatically mints EGGOCOIN — a fungible token on Hedera Token Service — directly to the supplier's account. Clean deliveries earn more tokens. Contaminated deliveries above 10% are rejected entirely."

**[PANTALLA: HashScan mostrando el NFT CIN]**

> "When we accumulate 1,000 kilograms of verified adjusted waste, the system issues a Circular Impact NFT — or CIN. One CIN equals one tonne of CO₂ equivalent avoided, following the CDM AMS-III.F composting methodology from the United Nations. Every CIN traces back to specific delivery records through Guardian's Trust Chain."

**NOTA DE DIRECCIÓN:** Esta es la sección más técnica. Mantené el ritmo. Los jueces quieren ver que funciona, no cómo funciona internamente. Mostrá una transacción real en HashScan con el token ID visible.

---

### SECCIÓN 3 — Por Qué Hedera (2:15 – 2:50)

**[PANTALLA: Tabla de costos con los $0.20/mes resaltados]**

> "Why Hedera? Three reasons.
>
> First: cost. Our entire monthly blockchain operation costs 20 cents. Not 20 dollars — 20 cents. Even at ten times our current volume, it's under 3 dollars.
>
> Second: Guardian. It's the only open-source MRV policy engine that handles Verifiable Credentials, trust chains, and token minting in a single workflow. We didn't build any verification infrastructure from scratch — Guardian does it all.
>
> Third: transparency. Every delivery, every approval, every mint is on-chain. Any auditor can verify the full chain of evidence through Hedera Mirror Node — for free, with a single API call."

**NOTA DE DIRECCIÓN:** Pausa dramática después de "20 cents." Dejá que el número impacte.

---

### SECCIÓN 4 — Demo Rápida (2:50 – 3:40)

**[PANTALLA: Screencast del flujo completo]**

> "Let me show you the pipeline in action."

**Mostrar en secuencia rápida (10 segundos cada paso):**

1. **Dashboard login** → Seleccionar rol "Project_Proponent", ingresar email/password
2. **Delivery form** → Llenar: 80 kg brutos, 4 kg impropios → preview muestra "+53 $EGGO", Cat A
3. **Submit** → "Delivery ENT-005 submitted successfully!" toast notification
4. **Guardian MGS** → Mostrar el VC creado con status "Waiting for approval"
5. **VVB approves** → Login como VVB, aprobar la entrega
6. **Wallet screen** → Mostrar el balance actualizado de EGGOCOIN
7. **HashScan** → La transacción de mint visible en el explorador de Hedera testnet

> "From delivery form to verified token — no middleware, no servers, no databases. Just a static website talking to Guardian and Hedera. The supplier sees their rewards. The auditor sees the trust chain. And the planet gets verified impact data."

**NOTA DE DIRECCIÓN:** Practicá este demo varias veces. Si algo falla en vivo, usá un screencast pre-grabado. Un demo grabado que funciona > un demo en vivo que se traba.

---

### CIERRE — Impacto + Llamada a Acción (3:40 – 4:10)

**[PANTALLA: Volvé a la cámara frontal, con el diagrama del ciclo de fondo]**

> "Eggologic is the first waste-to-BSF-to-eggs circular economy verified on Hedera Guardian. It's running today in Uruguay, and the architecture scales to any organic waste hub — anywhere in the world.
>
> Zero middleware. Zero infrastructure cost. Two tokens — EGGOCOIN for incentives, CIN for carbon impact. Eight schemas covering the complete methodology from supplier registration to carbon credit issuance.
>
> We're building a future where every kilogram of waste diverted from a landfill is verified, rewarded, and counted toward real climate action.
>
> Thank you — and let's build the circular economy on Hedera."

**[PANTALLA: Logo Eggologic + links]**

```
GitHub:   github.com/c4p5/EggoLogic-Hedera-Hackathon
Live:     c4p5.github.io/EggoLogic-Hedera-Hackathon
EGGOCOIN: hashscan.io/testnet/token/0.0.8287358
CIN NFT:  hashscan.io/testnet/token/0.0.8287362
Policy:   hashscan.io/testnet/topic/0.0.8291451
```

---

## VERSIÓN COMPACTA (2 minutos — si necesitás una versión corta)

> "Eggologic is a real circular economy hub in Uruguay. We take organic waste from restaurants, feed it to Black Soldier Fly larvae, those larvae feed our hens which produce eggs, and the remaining matter becomes compost.
>
> The problem: no one can verify this cycle happened, and restaurants have no incentive to separate waste properly.
>
> Our solution uses Hedera. Every delivery is recorded as a Verifiable Credential through a Guardian MRV policy. A VVB — a validator — reviews and approves each delivery. On approval, Guardian automatically mints EGGOCOIN — a fungible token that rewards suppliers for clean waste.
>
> When we accumulate enough verified waste, the system issues a Circular Impact NFT — one tonne of CO₂ avoided, following the UN's CDM AMS-III.F methodology. Every NFT traces back to specific deliveries through Guardian's Trust Chain.
>
> The architecture is radically simple: a static dashboard on GitHub Pages that talks directly to Guardian's API and Hedera's Mirror Node. No middleware, no servers, no databases. Total blockchain cost: 20 cents per month.
>
> This is running today — not a concept. 300 to 600 kilos per week, processed in El Tesoro, Maldonado, Uruguay. Thank you."

---

## CHECKLIST PRE-GRABACIÓN

### Assets que necesitás tener listos ANTES de grabar:

- [ ] **Fotos reales de la operación** (mínimo 4-5): residuos llegando, larvas BSF, gallinas, huevos, compost
- [ ] **Dashboard live** funcionando en c4p5.github.io/EggoLogic-Hedera-Hackathon
- [ ] **Tokens verificables en HashScan**:
  - [ ] EGGOCOIN: hashscan.io/testnet/token/0.0.8287358
  - [ ] CIN NFT: hashscan.io/testnet/token/0.0.8287362
- [ ] **Al menos 3-4 entregas** ya procesadas en Guardian (para que el dashboard muestre datos reales)
- [ ] **Al menos 1 VVB approval** visible (para mostrar el flujo completo)
- [ ] **Demo pre-grabado de backup** (screencast del flujo completo por si el live falla)
- [ ] **Diagrama de arquitectura** limpio (Excalidraw o similar)
- [ ] **Diagrama del ciclo circular** visual (Residuo → BSF → Huevos → Compost)

### Cuentas listas para el demo:

| Rol | Email | Password |
|---|---|---|
| Project_Proponent | eggologic-proponent@outlook.com | (tu password) |
| VVB | eggologic-vvb@outlook.com | (tu password) |
| OWNER | r.aguileira88@gmail.com | (tu password) |

### Tips de grabación:

- [ ] Fondo limpio y buena iluminación si mostrás la cámara
- [ ] Micrófono externo o auriculares con mic (audio > video en importancia)
- [ ] Practicar el script 3 veces completo antes de grabar
- [ ] Grabar en secciones — no intentar todo de una toma
- [ ] Velocidad de habla: más lento de lo que creés necesario
- [ ] Zoom in al navegador (Ctrl++) para que IDs sean legibles

---

## NOTAS PARA LA SUBMISSION

| Campo | Qué poner |
|---|---|
| **Project Name** | Eggologic — Circular Economy Verified on Hedera |
| **Track** | Sustainability |
| **Bounty** | Hiero |
| **Short Description** | A real circular economy hub in Uruguay that verifies organic waste-to-BSF-to-eggs operations on Hedera using Guardian MRV, rewarding suppliers with EGGOCOIN tokens and issuing Circular Impact NFTs for verified carbon avoidance — at $0.20/month total blockchain cost |
| **GitHub Repo** | https://github.com/c4p5/EggoLogic-Hedera-Hackathon |
| **Live Dashboard** | https://c4p5.github.io/EggoLogic-Hedera-Hackathon/ |
| **Demo Video** | YouTube link |
| **Hedera Services** | HTS (Fungible + NFT), HCS, Guardian MGS, Mirror Node |
| **Testnet Tokens** | EGGOCOIN 0.0.8287358, CIN 0.0.8287362 |
| **Policy Topic** | 0.0.8291451 |

### Judging criteria mapping:

| Criterion | Eggologic Strength |
|---|---|
| **Innovation** | First waste-to-BSF-to-eggs circular economy on Guardian. Zero-middleware architecture. |
| **Technical Implementation** | Published Guardian policy (8 schemas, 5 roles). Live dashboard. Real token mints on testnet. |
| **Real-World Impact** | Running operation in Uruguay. 300-600 kg/week. Physical outputs (larvae, eggs, compost). |
| **Presentation** | Live dashboard, HashScan verification, photo evidence of real operations. |
| **Scalability** | Static frontend (zero infra cost). Guardian MGS (managed). $0.20/month at current scale. |

---

## HERRAMIENTAS GRATUITAS

| Necesidad | Herramienta | Link |
|---|---|---|
| Grabar pantalla + cámara | OBS Studio | obsproject.com |
| Grabar pantalla rápido | Loom (gratis 5min) | loom.com |
| Editar video | DaVinci Resolve (gratis) | blackmagicdesign.com |
| Editar video (simple) | CapCut (gratis) | capcut.com |
| Subtítulos automáticos | YouTube Studio | studio.youtube.com |
| Diagramas | Excalidraw | excalidraw.com |
| Thumbnails | Canva (gratis) | canva.com |
