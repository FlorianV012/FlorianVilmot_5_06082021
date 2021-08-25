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
  validOrder();
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

// Crée la ligne du prix total de la commande et stock celui-ci dans le localStorage
function total(totalCart) {
  document.getElementById("total-cart").innerHTML += `
    <tr>
      <td></td>
      <td></td>
      <td></td>
      <th>Total (TTC) :</th>
      <td>${totalCart}</td>
    </tr>`;
  localStorage.setItem("OrderAmount", `${totalCart}`);
}

// Purge le panier et recharge la page
function validOrder() {
  document.querySelector('#clear-cart').addEventListener('click', () => {
    clearCart();
    document.location.reload();
  })

  const btnSubmit = document.querySelector('.submit-btn');
  btnSubmit.addEventListener("click", function () {
    // Vérifie si le formulaire est valide
    var valid = true;
    for (let input of document.querySelectorAll("form input")) {
      valid = valid && input.reportValidity();
      if (!valid) {
        break;
      }
      if (valid) {
        // Récupère les données du formulaire
        let inputFirstName = document.querySelector("#firstName");
        let inputLastName = document.querySelector("#lastName");
        let inputCity = document.querySelector("#city");
        let inputAdress = document.querySelector("#address");
        let inputMail = document.querySelector("#email");

        // Génère le corps de la requête
        const order = {
          contact: {
            firstName: inputFirstName.value,
            lastName: inputLastName.value,
            address: inputAdress.value,
            city: inputCity.value,
            email: inputMail.value,
          },
          products: getCartId(),
        };

        // Envoie la commande a la partie Back-End, récupère l’identifiant de commande
        fetch("http://localhost:3000/api/teddies/order", {
          method: "POST",
          body: JSON.stringify(order),
          headers: { "Content-Type": "application/json" },
        })
          .then((response) => response.json())
          .then((data) => {
            clearCart()
            localStorage.setItem("orderId", data.orderId);
            // Envoie vers la page de confirmation de la commande
            document.location.href = "confirmation.html"
          })
          .catch(function (err) {
            console.log(`Erreur : ${err}`);
            localStorage.setItem("Erreur", `${err}`);
            window.alert("Il y a eu un problème, veuillez réessayer.");
            document.location.reload();
          });
      }
    }
  });
}