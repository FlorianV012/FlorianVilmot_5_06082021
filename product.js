fetch("http://localhost:3000/api/teddies/5beaa8bf1c9d440000a57d94")
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (product) {
    createProductPage(product)
    customisedProduct(product)
  })
  .catch(function (err) {
    // Une erreur est survenue
    console.log(`Erreur : ${err}`);
  });

  function createProductPage(product) {  
        document.getElementById("product-detail").innerHTML += 
  `<div class="row">
        <div class="col-5">
          <img src="${product.imageUrl}" class="rounded img-fluid mt-4" alt="" />
        </div>
        <div class="col-7 flex-column mt-4">
          <div class="m-2">${product.name}</div>
          <div class="m-2">Prix : ${product.price}€</div>
          
          <div class="col-4 p-0">
            <select class="form-control" id="customisationOption">
              
            </select>
          </div>

          <div class="m-2">
            Description : <br />${product.description}
          </div>
          <button type="button" class="btn btn-dark m-2">Ajouter au panier</button>
        </div>
      </div>`;
}


function customisedProduct(product){
  for(let i = 0; i < product.colors.length; i++){
  document.getElementById("customisationOption").innerHTML += `<option>${product.colors[i]}</option>`
  }  
}