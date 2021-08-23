// Fonction du message de confirmation de la commande
function orderConfirmation(OrderAmount, orderId){
    document.getElementById("order-confirmation").innerHTML =
    `<p class="h3 text-center">Nous vous remercions de votre commande.
        <br>Celle-ci est d’un montant de ${OrderAmount} et porte l'identifiant:
        <br>${orderId}.
    </p>`;
  }

  orderConfirmation(localStorage.getItem("OrderAmount"), localStorage.getItem("orderId"));