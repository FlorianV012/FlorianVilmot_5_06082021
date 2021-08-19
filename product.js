//Récupère les données de l'api en fonction de l’ID du produit
fetch(`http://localhost:3000/api/teddies/${localStorage.pageProduct}`)
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (product) {
    createProductPage(product);
    customisedProduct(product);
    document.querySelector(".btn-to-cart").onclick = () => {

      console.log("hello");
      const quantity = document.getElementById("Quantity").value;
// fonction à retirer après implémentation de la fonction de vérification de la présence du produit dans le panier
      clearCart();
      addCart(product, quantity);

      document.querySelector(".add-to-cart").style.display = "inherit"
      document.querySelector(".btn-to-cart").style.display = "none";
      document.querySelector("#product-detail").style.opacity = "0.3";
    };

    const quantityInput = document.getElementById("Quantity");
    quantityInput.addEventListener('change', function () {
      const quantity = this.value;

      if (quantity < 1) {
        disableSubmit(false);
      } else {
        disableSubmit(true)
      }
    });

  })

  .catch(function (err) {
    // Une erreur est survenue
    console.log(`Erreur : ${err}`);
  });

//Créer le contenu de la page
function createProductPage(product) {
  document.getElementById("product-detail").innerHTML += `<div class="row">
      <div class="col-md-5 col-12">
        <img src="${product.imageUrl}" class="rounded img-fluid mt-4" alt="" />
      </div>
      <div class="col-md-7 col-12 flex-column mt-4">
        <div class="m-2">${product.name}</div>
        <div class="m-2">Prix : ${price(product.price)}</div>          
        <div class="col-4 p-0">
          <select class="form-control" id="customisationOption"></select>
        </div>
        <div class="m-2">
          Description : <br />${product.description}
        </div>
        <form class="m-2" onsubmit="return false">
          <div class="form-group mt-3">
            <label for="Quantity">Quantité :</label>
            <input type="number" class="form-control col-2" id="Quantity" value="1" min="1" required>
          </div>
          <button type="submit" class="btn btn-dark btn-to-cart submit-btn">Ajouter au panier</button>
        </form>
      </div>
    </div>`;
}

// Génère les options de customisation du produit
function customisedProduct(product) {
  for (let i = 0; i < product.colors.length; i++) {
    document.getElementById(
      "customisationOption"
    ).innerHTML += `<option>${product.colors[i]}</option>`;
  }
}

// Désactive le bouton en fonction du paramètre reçu
function disableSubmit(disabled) {
  if (disabled) {
    document
      .querySelector(".submit-btn")
      .removeAttribute("disabled");
  } else {
    document
      .querySelector(".submit-btn")
      .setAttribute("disabled", true);
  }
}

// Gèrent le panier, ajout et purge

function addCart(product, quantity) {
  let listCart = getCart();
  listCart.push({ id: product._id, name: product.name, price: product.price, nb: `${quantity}` });
  saveCart(listCart);
}

function clearCart() {
  localStorage.removeItem("listCart");
}

function getCart() {
  let listCart = localStorage.getItem("listCart");
  if (listCart == null) {
    return [];
  } else {
    return JSON.parse(listCart);
  }
}

function saveCart(listCart) {
  localStorage.setItem("listCart", JSON.stringify(listCart));
}
