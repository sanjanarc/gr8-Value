itemsInCart = [];

window.onload = () => {
  loadItems();

  updateTotals();
  updateLabels();

  for(i = 0; i < itemsInCart.length; i++)
      createProductInCart(itemsInCart[i]);
}

function createProductInCart(product){
    // hr pagebreak
    var pagebreak = document.createElement("hr");
    pagebreak.className = "my-4";
  
    // div main item
    var mainItem = document.createElement("div");
    mainItem.className = "row mb-4 d-flex justify-content-between align-items-center";

    // div that contains the image
    var imageDiv = document.createElement("div");
    imageDiv.className = "col-md-2 col-lg-2 col-xl-2";

    // image
    var image = document.createElement("img");
    var srcName = product.name.replace(/ /g, "_");
    image.src = "../static/assets/img/assets/"+ srcName + ".jpg";
    image.className = "img-fluid rounded-3";
    image.alt = product.name;

    imageDiv.appendChild(image);

    // div name
    var nameDiv = document.createElement("div");
    nameDiv.className = "col-md-3 col-lg-3 col-xl-3";

    // p2 Name
    var name = document.createElement("p2");
    name.className = "text-black mb-0";
    name.innerHTML = product.name;

    nameDiv.appendChild(name);

    // div for add/subtract buttons
    var btnDiv = document.createElement("div");
    btnDiv.className = "col-md-3 col-lg-3 col-xl-2 d-flex";

    // form itemQuantity
    var itemQuantInput = document.createElement("input");
    itemQuantInput.className = "form-control form-control-sm";
    itemQuantInput.min = "0";
    itemQuantInput.name = "quantity";
    itemQuantInput.value = product.quantity;
    itemQuantInput.type = "number";
    itemQuantInput.inputmode = "numeric";
    itemQuantInput.addEventListener("keyup", ()=>inputQuantity(itemQuantInput,product));
    itemQuantInput.addEventListener("click", ()=>inputQuantity(itemQuantInput,product));

    // subtract button
    var btnSub = document.createElement("button");
    btnSub.type = "button";
    btnSub.addEventListener("click", ()=>{
      decrement(itemQuantInput,product);
    });

    // sub button icon
    var subIcon = document.createElement("i");
    subIcon.className = "bi bi-dash";

    btnSub.appendChild(subIcon);

    // add button
    var btnAdd = document.createElement("button");
    btnAdd.type = "button";
    btnAdd.addEventListener("click", ()=>{
      increment(itemQuantInput,product);
    });

    // add button icon
    var addIcon = document.createElement("i");
    addIcon.className = "bi bi-plus";

    btnAdd.appendChild(addIcon);

    btnDiv.appendChild(btnSub);
    btnDiv.appendChild(itemQuantInput);
    btnDiv.appendChild(btnAdd);

    // div cost
    var costDiv = document.createElement("div");
    costDiv.className = "col-md-3 col-lg-2 col-xl-2 offset-lg-1";

    // p1 cost
    var cost = document.createElement("p2");
    cost.className = "mb-0";
    var totalCost = product.price * product.quantity;
    totalCost = totalCost.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    cost.innerHTML = totalCost;

    costDiv.appendChild(cost);

    // trash div
    var trashDiv = document.createElement("div");
    trashDiv.className = "col-md-1 col-lg-1 col-xl-1 text-end";

    // trash a
    var trashLink = document.createElement("a");
    trashLink.href = "#!";
    trashLink.className = "text-muted";
    trashLink.addEventListener("click", ()=>removeFromCart(mainItem,pagebreak, product));

    // trash i
    var trashIcon = document.createElement("i");
    trashIcon.className = "bi bi-trash";

    trashLink.appendChild(trashIcon);
    trashDiv.appendChild(trashLink);

    mainItem.appendChild(imageDiv);
    mainItem.appendChild(nameDiv);
    mainItem.appendChild(btnDiv);
    mainItem.appendChild(costDiv);
    mainItem.appendChild(trashDiv);

    var mainFeed = document.getElementById("tempCart");

    mainFeed.appendChild(pagebreak);
    mainFeed.appendChild(mainItem);
  }

  function updateLabels(){
    var tax = document.getElementById("taxLabel");
    var service = document.getElementById("serviceLabel");
    var total = document.getElementById("totalLabel");

    var priceCounter = 0;
    for(i = 0; i < itemsInCart.length; i++)
        priceCounter += itemsInCart[i].price * itemsInCart[i].quantity;

    var taxAmt = priceCounter * 0.12;
    var serviceAmt = priceCounter * 0.05;
    var totalAmt = priceCounter + taxAmt + serviceAmt;

    taxAmt = taxAmt.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    serviceAmt = serviceAmt.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    totalAmt = totalAmt.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

    tax.innerHTML = "Tax: " + taxAmt;
    service.innerHTML = "Service Fee: " + serviceAmt;
    total.innerHTML = "Total: " + totalAmt;
  }

  function inputQuantity(input, product){
    var amt = input.value;

    if(amt != "")
    {
      console.log(amt);
      product.quantity = parseInt(amt);

      updateLabels();
      updateTotals();
    }
  }

  function increment(input, product){
    product.quantity++;
    input.value = product.quantity;
    updateLabels();
    updateTotals();
  }
  
  function decrement(input, product){
    product.quantity = Math.max(product.quantity - 1, 0);
    input.value = product.quantity;
    updateLabels();
    updateTotals();
  }

  function removeFromCart(input, pagebreak, product){
    var mainFeed = document.getElementById("tempCart");

    mainFeed.removeChild(input);
    mainFeed.removeChild(pagebreak);

    for(i = 0; i < itemsInCart.length; i++)
    {
      if(itemsInCart[i].name == product.name)
        itemsInCart.splice(i,1);
    }
    
    updateLabels();
    updateTotals();
  }

  function toHyperlink(){
    var str = document.getElementById("urltext").value;
    createListItem(str);
    shoppinglist.push(str);
  
    document.getElementById("urltext").value = "";
  
  }
  
  function recallList(){
    for(i = 0; i < shoppinglist.length; i++)
      createListItem(shoppinglist[i]);
  }
  
  function createListItem(text){
      var newListItem = document.createElement("div");
      newListItem.id = "result"+a;
      newListItem.className = "lead";
  
      // new list item
  
      var str = text;
      var link = document.createElement("a");
      link.href = '#';
      link.id = 'listItem' + a;
      link.innerHTML = str;
  
      link.addEventListener("click", () => {
        goToInteralLink(null,null,str,link);
      });
  
      newListItem.appendChild(link);
      a++;
  
      // delete from list button
      var deleteButton = document.createElement("button");
      deleteButton.type = "button";
      deleteButton.addEventListener("click", ()=>{deleteFromList(newListItem.id); removeReference(str);});
  
      // dash icon
      var icon = document.createElement("i");
      icon.className = "bi bi-dash";
  
      deleteButton.appendChild(icon);
  
      newListItem.appendChild(deleteButton);
  
      document.getElementById("mainList").appendChild(newListItem);
  
      
  }