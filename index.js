//recuperation des données de l'api
fetch("http://localhost:3000/api/teddies")
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (products) {
    console.log(products);

    //Créer une carte par produit
    for (let i = 0; i < products.length; i++) {
      createCard(products[i].imageUrl, products[i].name, products[i].price, products[i]._id);
    }
  })
  .catch(function (err) {
    // Une erreur est survenue
    console.log(`Erreur : ${err}`);
  });

// fonction de création des cartes de produit
function createCard(productImageUrl, productName, productPrice,productId) {  
  document.getElementById("products").innerHTML += 
  `<div class="col-12 col-md-6 col-lg-4">
      <div class="card mx-2 my-4 shadow" id="${productId}">
        <div class="embed-responsive embed-responsive-4by3">
        <img src="${productImageUrl}" alt="" class="card-img-top card-header embed-responsive-item"/>
        </div>
      <div class="card-body">
        <a href="#" class="text-dark stretched-link card-title h4">${productName}</a>
        <p class="card-text">Prix : ${productPrice}€</p>
      </div>
    </div>
  </div>`;
}
