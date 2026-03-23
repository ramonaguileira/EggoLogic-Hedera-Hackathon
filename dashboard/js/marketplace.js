// Eggologic — Marketplace
// Mostly static - hella boring. 
// This WILL get pumped up in later stages since it's very user attractive. 
// Market should be able to run tx's, Venues pop-up multicard menue when pressed, dynamic stock of products, etc
// I should save up $EGGO's for those bins - Ramón has no clue yet, but those type of gadgets are coolASF
// Also - Bins decentralizes at smol, individual-household scale!! (and I get to play with Arduino's, hehe)

async function loadMarketplace() {
  try {
    const supply = await HederaMirror.getEggocoinSupply();
    const wasteKg = Math.round(supply / 0.70);
    UI.setText('stat-compost', UI.fmt(wasteKg));
    const mintEvents = await HederaMirror.getMintEvents();
    const uniqueAccounts = new Set(mintEvents.map(e => e.account)).size;
    UI.setText('stat-restaurants', String(uniqueAccounts || 1));
  } catch {
    UI.setText('stat-restaurants', '1');
    UI.setText('stat-compost', '—');
  }
}

function onLogin() {
  loadMarketplace();
}

document.addEventListener('DOMContentLoaded', () => {
  loadMarketplace();
});
