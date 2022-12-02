window.onload = () => {
    loadItems();
  
      displayAllDeals();
  }

  function displayAllDeals(){
    for(i = 0; i < dealIndices.length; i++)
    {
      createProduct(products[dealIndices[i]]);
    }
  }