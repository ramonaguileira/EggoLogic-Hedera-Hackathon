// Eggologic — Marketplace
// Mostly static - hella boring. 
// This WILL get pumped up in later stages since it's very user attractive. 
// Market should be able to run tx's, Venues pop-up multicard menue when pressed, dynamic stock of products, etc
// I should save up $EGGO's for those bins - Ramón has no clue yet, but those type of gadgets are coolASF
// Also - Bins decentralizes at smol, individual-household scale!! (and I get to play with Arduino's, hehe)

async function loadMarketplace() {
  UI.setText('stat-restaurants', '3');    // Restaurants Joined
  UI.setText('stat-compost', '724');      // Kilograms Composted
}

function onLogin() {
  loadMarketplace();
}

document.addEventListener('DOMContentLoaded', () => {
  loadMarketplace();
});
