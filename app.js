fetch("http://localhost:3000/api/teddies")
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (products) {
    console.log(products);
    for (let i = 0; i < products.length; i++) {
      createCard(products[i].imageUrl, products[i].name, products[i].price);
    }
  })
  .catch(function (err) {
    // Une erreur est survenue
    console.log(`Erreur : ${err}`);
  });

function createCard(productImageUrl, productName, productPrice) {
  let card = document.createElement("article");
  document.getElementById("main").appendChild(card);

  card.innerHTML = `<div class="card mx-2 my-4">
     <img src="${productImageUrl}" alt="" class="card-img-top" />
     <div class="card-body">
       <h4 class="card-title">Produit : ${productName}</h4>
       <p class="card-text">Prix : ${productPrice}€</p>
     </div>
   </div>`;

  card.classList.add("col-12", "col-md-4");
}
