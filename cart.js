// Génére la partir "votre panier" de la page
let cart = JSON.parse(localStorage.getItem("listCart"));
// Vérifie si le panier est vide
if (cart == null) {
  console.log('panier vide');
  document.getElementById("cart").innerHTML = `
    <h2 class="my-4">Votre panier est vide</h2>
    <p class="h3">Visitez <a href="index.html">notre boutique</a> pour le remplir</p>`
} else {
  let totalCart = 0;
  for (let i = 0; i < cart.length; i++) {
    // Créé une ligne par produit dans le panier
    createProductLign(i + 1, cart[i].name, cart[i].price, cart[i].nb);
    // Calcul le prix total de la commande
    totalCart += cart[i].price * cart[i].nb;
  };
  // Affiche le prix total de la commande
  total(price(totalCart));
};

// Créé une ligne par produit dans le panier
function createProductLign(lignNb, productName, productPrice, productQuantity) {
  document.getElementById("products-cart").innerHTML += `
    <tr>
      <th scope="row">${lignNb}</th>
      <td>${productName}</td>
      <td>${price(productPrice)}</td>
      <td>${productQuantity}</td>
      <td>${price(productQuantity * productPrice)}</td>
    </tr>`;
}

// Crée la ligne du prix total de la commande
function total(totalCart) {
  document.getElementById("total-cart").innerHTML += `
    <tr>
      <td></td>
      <td></td>
      <td></td>
      <th>Total (TTC) :</th>
      <td>${totalCart}</td>
    </tr>`;
}
