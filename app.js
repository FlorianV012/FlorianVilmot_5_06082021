
// Converti le prix en euro
function price(productPrice) {
  let priceEuro = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(productPrice / 100);
  return priceEuro
}

// Désactive le bouton en fonction du paramètre reçu
function disableSubmit(disabled) {
  if (disabled) {
    document
      .querySelector(".submit-btn")
      .setAttribute("disabled", true);
  } else {
    document
      .querySelector(".submit-btn")
      .removeAttribute("disabled");
  }
}

// Gèrent le panier, ajout, supression d'un produit et purge du panier

function addCart(product, quantity) {
  let listCart = getCart();
  let quantityInCart = getCartId().indexOf(product._id);
  if (quantityInCart === -1) {
    listCart.push({ id: product._id, name: product.name, price: product.price, nb: `${quantity}` });
    saveCart(listCart);
  } else {
    listCart[quantityInCart].nb = listCart[quantityInCart].nb += parseInt(quantity);
    saveCart(listCart);
  }
}

function clearCart() {
  localStorage.removeItem("listCart");
}

function removeCart(productId) {
  let listCart = getCart();
  //Retourne un tableau sans le produit avec l'id en paramètre
  listCart = listCart.filter(product => product.id != productId);
  saveCart(listCart);
}

function getCart() {
  let listCart = localStorage.getItem("listCart");
  if (listCart == null) {
    return [];
  } else {
    return JSON.parse(listCart);
  }
}

function getCartId() {
  return getCart().map(cart => cart.id);
}

function saveCart(listCart) {
  localStorage.setItem("listCart", JSON.stringify(listCart));
}


