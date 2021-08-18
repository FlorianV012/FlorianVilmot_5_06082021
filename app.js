 
  // Converti le prix en euro
  function price(productPrice){
    let priceEuro =  new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    }).format(productPrice / 100);
    return priceEuro
  }
  

