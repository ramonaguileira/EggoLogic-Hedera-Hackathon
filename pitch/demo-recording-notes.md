# Eggologic — Demo Recording Notes

## Guía técnica para grabar el demo del hackathon

---

## ANTES DE GRABAR: Setup técnico

### 1. Verificar que todo está live en testnet:

```
# Tokens en HashScan
https://hashscan.io/testnet/token/0.0.8287358  → EGGOCOIN
https://hashscan.io/testnet/token/0.0.8287362  → CIN NFT

# Policy topic
https://hashscan.io/testnet/topic/0.0.8291451  → EWD-RB v0.3

# Dashboard live
https://c4p5.github.io/EggoLogic-Hedera-Hackathon/
```

### 2. Tener abierto en pestañas del navegador:

- **Pestaña 1:** Dashboard index.html (live o local)
- **Pestaña 2:** Dashboard wallet.html
- **Pestaña 3:** Dashboard impact.html
- **Pestaña 4:** Guardian MGS (guardianservice.app) — logueado como VVB
- **Pestaña 5:** HashScan — página del token EGGOCOIN
- **Pestaña 6:** HashScan — página del token CIN NFT

### 3. Datos pre-cargados:

Antes de grabar, tener al menos 3-4 entregas ya aprobadas por VVB en Guardian para que:
- El dashboard muestre métricas reales (waste diverted, CO₂ avoided)
- El wallet muestre balance de EGGOCOIN
- El impact report muestre barras en el chart
- El marketplace muestre stats de H₂O

---

## SECUENCIA DEL DEMO (screencast)

### Toma 1: Dashboard Overview (10 seg)

**Qué mostrar:**
- Abrir c4p5.github.io/EggoLogic-Hedera-Hackathon/
- Hero metrics: Waste Diverted, CO₂ Avoided, Eggs Produced
- Señalar que estos datos vienen de Guardian + Mirror Node en tiempo real

**Narración sugerida:**
> "This is our live dashboard. These metrics update in real-time from Guardian's Verifiable Credentials and Hedera's Mirror Node."

### Toma 2: Login como Project_Proponent (10 seg)

**Qué mostrar:**
- Click en login
- Seleccionar "Project_Proponent" → email: eggologic-proponent@outlook.com
- Dashboard se actualiza: aparece balance de $EGGO, delivery form se habilita

**Narración sugerida:**
> "I'm logging in as a Project Proponent — that's the restaurant or supplier delivering waste."

### Toma 3: Llenar Delivery Form (15 seg)

**Qué mostrar:**
- Formulario de entrega: kg bruto = 80, kg impropios = 3
- Live preview muestra:
  - kg netos: 77.0 kg
  - kg ajustados: 53.90 kg
  - +54 $EGGO
  - Cat. A (badge verde)
- Botón dice "Submit Delivery (+54 $EGGO)"

**Narración sugerida:**
> "The supplier enters the weight — 80 kilos gross, 3 kilos contamination. The dashboard calculates the adjusted weight using our 70% conservative factor and shows the estimated EGGOCOIN reward. Category A — clean delivery."

### Toma 4: Submit (5 seg)

**Qué mostrar:**
- Click "Submit Delivery"
- Botón cambia a "Submitting to Guardian..."
- Toast notification: "Delivery ENT-005 submitted successfully!"

**Narración sugerida:**
> "One click — the delivery is now a Verifiable Credential in Guardian, waiting for VVB approval."

### Toma 5: Cambiar a Guardian MGS como VVB (15 seg)

**Qué mostrar:**
- Abrir pestaña de Guardian MGS (guardianservice.app)
- Login como VVB (eggologic-vvb@outlook.com)
- Mostrar la entrega pendiente en la lista de aprobación
- Click "Approve"

**Narración sugerida:**
> "Now I switch to our VVB — the Validation and Verification Body. They see the pending delivery, review the data, and approve it. The moment they approve, Guardian's policy engine automatically mints EGGOCOIN."

**NOTA:** Si no podés acceder a Guardian MGS durante la grabación, narrá sobre una captura de pantalla de la interfaz de aprobación.

### Toma 6: Verificar en HashScan (10 seg)

**Qué mostrar:**
- Abrir HashScan → token EGGOCOIN (0.0.8287358)
- Mostrar la transacción de mint más reciente
- Zoom in al monto y timestamp

**Narración sugerida:**
> "And here it is on HashScan — the EGGOCOIN mint transaction. Verifiable, immutable, on Hedera testnet."

### Toma 7: Wallet Screen (10 seg)

**Qué mostrar:**
- Abrir wallet.html
- Balance actualizado de $EGGO
- Transaction history con la nueva transacción
- CIN NFT section (si hay algún CIN minted)
- All holders list

**Narración sugerida:**
> "The supplier's wallet shows their updated balance, full transaction history, and any Circular Impact NFTs. All data comes from Hedera's Mirror Node — public, verifiable, no backend required."

### Toma 8: Impact Report (10 seg)

**Qué mostrar:**
- Abrir impact.html
- Aggregate score (% approved)
- CO₂ avoidance ring chart
- Waste delivery bar chart
- Milestones (EGGOCOIN minted, NFT threshold)

**Narración sugerida:**
> "Our impact report aggregates all verified deliveries. You can see the approval rate, CO₂ avoided, and progress toward the next Circular Impact NFT — which represents one tonne of CO₂ equivalent."

---

## DEMO ALTERNATIVO: Sin acceso a Guardian MGS

Si Guardian MGS tiene problemas de CORS o downtime durante la grabación:

1. **Mostrar el dashboard con datos cacheados** — el offline mode funciona con guardian-cache.json
2. **Mostrar HashScan directamente** — tokens y transacciones siempre son visibles
3. **Narrar el flujo de aprobación** sobre una captura de pantalla de Guardian

El Mirror Node siempre funciona — balances, transacciones, NFTs están disponibles sin auth.

---

## TIPS DE EDICIÓN

1. **Cortar silencios y tiempos de carga** — Nadie quiere ver un spinner
2. **Agregar anotaciones/flechas** señalando datos importantes (token ID, montos, block IDs)
3. **Highlight boxes** alrededor de los valores clave en HashScan
4. **Transiciones simples** — Fade o cut directo
5. **Música de fondo** suave — buscar "lo-fi background music royalty free"
6. **Subtítulos** — Importante si tu acento en inglés es fuerte

---

## TIMING TOTAL DEL DEMO

| Toma | Duración | Acumulado |
|---|---|---|
| Dashboard overview | 10s | 0:10 |
| Login | 10s | 0:20 |
| Delivery form | 15s | 0:35 |
| Submit | 5s | 0:40 |
| VVB approval | 15s | 0:55 |
| HashScan verify | 10s | 1:05 |
| Wallet screen | 10s | 1:15 |
| Impact report | 10s | 1:25 |

**Total demo: ~1:25** — encaja perfecto en la Sección 4 del pitch (2:50 – 3:40 = 50 segundos disponibles). Podés cortar algunas tomas o acelerar el video a 1.5x en partes donde se ven spinners.

---

## ERRORES COMUNES A EVITAR

| Error | Solución |
|---|---|
| Guardian API CORS error en vivo | Tener screencast pre-grabado de backup |
| Token balance no se actualiza | Mirror Node tiene ~3-5 seg de delay — esperar y refresh |
| Login falla | Verificar credenciales antes de grabar, tener offline mode como backup |
| Dashboard muestra fallback data | Regenerar guardian-cache.json con datos frescos |
| HashScan no muestra la tx | Puede tardar 5-10 seg — tener la pestaña ya abierta y refresh |
