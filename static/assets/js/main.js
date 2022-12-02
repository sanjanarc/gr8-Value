class produce {
  constructor(name, price, category){
      this.name = name;
      this.price = price;
      this.category = category;
  }

  name;
  quantity = 0;
  price;
  category;
  deal = false;

}

(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Feed isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.feed-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.feed-item'
      });

      let portfolioFilters = select('#feed-flters li', true);

      on('click', '#feed-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate feed lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.feed-lightbox'
  });

  /**
   * Initiate feed details lightbox 
   */
  const portfolioDetailsLightbox = GLightbox({
    selector: '.feed-details-lightbox',
    width: '90%',
    height: '90vh'
  });

  /**
   * Feed details slider
   */
  new Swiper('.feed-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });


  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
  });

})()

// our database - !! FINISH HARD-CODING - each product is initialized with name, price, category !!
// name of product matches the name of the jpg asset file
const products = [
  new produce("apple ambrosia", 1.16, "Fruits and Vegetables"),
  new produce("apple gala", 1.53, "Fruits and Vegetables"),
  new produce("apple granny", 1.26, "Fruits and Vegetables"),
  new produce("apple honey crisp", 1.36, "Fruits and Vegetables"),
  new produce("apple lady", 1.32, "Fruits and Vegetables"),
  new produce("bagel cinnamon raisin", 3.99, "Bakery"),
  new produce("bagel everything", 5.49, "Bakery"),
  new produce("bagel original", 3.39, "Bakery"),
  new produce("bagel sesame", 3.99, "Bakery"),
  new produce("banana baby nino", 0.59, "Fruits and Vegetables"),
  new produce("banana organic", 0.26, "Fruits and Vegetables"),
  new produce("banana plantains",0.66, "Fruits and Vegetables"),
  new produce("banana yellow", 0.20, "Fruits and Vegetables"),
  new produce("beef ground", 1.65, "Meat and Seafood"),
  new produce("beef ground lean", 1.87, "Meat and Seafood"),
  new produce("beef sliced", 2.86, "Meat and Seafood"),
  new produce("beef tenderloin", 7.93, "Meat and Seafood"),
  new produce("bread bakeshop", 5.49, "Bakery"),
  new produce("bread grain", 4.99, "Bakery"),
  new produce("bread squirrelly", 6.49, "Bakery"),
  new produce("bread white", 7.99, "Bakery"),
  new produce("butter salted", 7.49, "Dairy"),
  new produce("butter unsalted", 7.49, "Dairy"),
  new produce("carrot bulk", 0.66, "Fruits and Vegetables"),
  new produce("carrot bunches", 4.49, "Fruits and Vegetables"),
  new produce("carrot mini", 3.49, "Fruits and Vegetables"),
  new produce("carrot organic", 3.99, "Fruits and Vegetables"),
  new produce("catfood fancy", 12.99, "Pet Care"),
  new produce("catfood fancy sea", 12.99, "Pet Care"),
  new produce("catfood friskies", 8.99, "Pet Care"),
  new produce("catfood one", 15.99, "Pet Care"),
  new produce("catfood purina", 11.29, "Pet Care"),
  new produce("cereal cheerios", 8.69, "Pantry"),
  new produce("cereal life", 5.79, "Pantry"),
  new produce("cereal shreddies", 6.79, "Pantry"),
  new produce("cereal small", 6.29, "Pantry"),
  new produce("cereal vector", 11.99, "Pantry"),
  new produce("cheese cheddar", 20.38, "Dairy and Eggs"),
  new produce("cheese feta", 9.22, "Dairy and Eggs"),
  new produce("cheese old cheddar", 20.38, "Dairy and Eggs"),
  new produce("cheese parm", 10.49, "Dairy and Eggs"),
  new produce("chicken breast", 8.87, "Meat and Seafood"),
  new produce("chicken breast2", 19.73, "Meat and Seafood"),
  new produce("chicken wings", 19.65, "Meat and Seafood"),
  new produce("chip lays classic", 2.19, "Candy and Snacks"),
  new produce("chip lays oven", 3.99, "Candy and Snacks"),
  new produce("chip lays wavey", 6.49, "Candy and Snacks"),
  new produce("chip original kettle", 5.29, "Candy and Snacks"),
  new produce("chip ss kettle",  5.29, "Candy and Snacks"),
  new produce("chocolate aero", 5.49, "Candy and Snacks"),
  new produce("chocolate chip cookie", 6.29, "Candy and Snacks"),
  new produce("chocolate kitkat", 1.69, "Candy and Snacks"),
  new produce("chocolate oatmeal cookies", 6.29, "Candy and Snacks"),
  new produce("chocolate kitkat mini", 5.29,"Candy and Snacks"),
  new produce("curry beans", 4.99, "International Foods" ),
  new produce("curry mild paste", 7.29, "International Foods"),
  new produce("curry paste", 6.29, "International Foods"),
  new produce("curry powder", 1.89, "International Foods"),
  new produce("curry sauce", 6.29, "International Foods" ),
  new produce("curry sauce2", 7.29, "International Foods"),
  new produce("dip mexican",7.29,"Candy and Snacks"),
  new produce("dip seven layer",10.99,"Candy and Snacks"),
  new produce("dip tzatziki",4.99,"Candy and Snacks"),
  new produce("dogfood iams", 55.99, "Pet Care"),
  new produce("dogfood leancuts", 4.79, "Pet Care"),
  new produce("dogfood pedigree", 12.99, "Pet Care"),
  new produce("dogfood purina", 36.49, "Pet Care"),
  new produce("dogfood rollover", 13.99, "Pet Care"),
  new produce("egg organic brown", 8.49, "Dairy and Eggs"),
  new produce("egg white", 3.99, "Diary and Eggs"),
  new produce("frozen corn", 3.79, "Frozen"),
  new produce("frozen mixed", 3.79, "Frozen"),
  new produce("frozen peas", 3.79, "Frozen"),
  new produce("ice cream almond bar", 7.49, "Frozen"),
  new produce("ice cream chocolate", 6.49, "Frozen"),
  new produce("ice cream double chocolate bar", 7.49, "Frozen"),
  new produce("ice cream vanilla", 6.99, "Frozen"),
  new produce("ice cream vanilla2", 6.99, "Frozen"),
  new produce("laundry tide", 19.49, "Cleaning, Paper"),
  new produce("laundry tide2", 32.99, "Cleaning, Paper"),
  new produce("laundry tide3", 19.49, "Cleaning, Paper"),
  new produce("laundry tide4", 32.99, "Cleaning, Paper"),
  new produce("lentils green", 3.49, "International Foods"),
  new produce("lentils red", 3.49, "International Foods"),
  new produce("lentils soup", 5.69, "International Foods"),
  new produce("lotion moisturizing", 17.99, "Health & Beauty"),
  new produce("lotion moisturizing2", 8.99, "Health & Beauty"),
  new produce("lotion moisturizing3", 19.99, "Health & Beauty"),
  new produce("lotion moisturizing4", 19.99, "Health & Beauty"),
  new produce("milk 1", 5.75, "Milk and Eggs"),
  new produce("milk 2", 5.75, "Milk and Eggs"),
  new produce("milk homo", 6.25, "Milk and Eggs"),
  new produce("milk lac free", 9.99, "Milk and Eggs"),
  new produce("milk skim", 5.75, "Milk and Eggs"),
  new produce("muffin blueberry", 5.79, "Bakery"), 
  new produce("muffin chocolate chip", 5.79, "Bakery"),
  new produce("muffin lemon poppy", 5.79, "Bakery"),
  new produce("muffin english sourdough", 3.99, "Bakery"),
  new produce("naan garlic pkg", 3.49, "Bakery"),
  new produce("naan pepper", 5.29, "Bakery"),
  new produce("naan plain", 5.29, "Bakery"),
  new produce("naan whole grain", 5.29, "Bakery"),
  new produce("orange juice", 5.49, "Drinks"), 
  new produce("orange mandarins", 1.76, "Fruits and Vegetables"),
  new produce("orange navel extra large", 2.54, "Fruits and Vegetables"),
  new produce("orange navel large", 2.64, "Fruits and Vegetables"),
  new produce("pop canada dry", 5.29, "Drinks"),
  new produce("pop coke", 5.29, "Drinks"),
  new produce("pop doc pepper", 3.49, "Drinks"),
  new produce("pork ground", 6.71 ,"Meat and Seafood"),
  new produce("pork ribs", 16.99 ,"Meat and Seafood"),
  new produce("pork ribs2", 30.06 ,"Meat and Seafood"),
  new produce("pork tenderloin", 8.37 ,"Meat and Seafood"),
  new produce("potato russet", 1.40, "Fruits and Vegetables"),
  new produce("potato sweet", 4.26, "Fruits and Vegetables"),
  new produce("potato white", 1.78, "Fruits and Vegetables"),
  new produce("potato yukon gold", 1.42, "Fruits and Vegetables"),
  new produce("rice fancy", 16.99, "International Foods"),
  new produce("rice sushi", 7.29, "International Foods"),
  new produce("rice white basmati", 11.49, "International Foods"),
  new produce("rotasserie chicken", 12.99, "Deli & Ready Made Meals"),
  new produce("rotasserie chicken2", 12.99, "Deli & Ready Made Meals"),
  new produce("rotasserie chicken3", 12.99, "Deli & Ready Made Meals"),
  new produce("sandwich egg", 7.49, "Deli & Ready Made Meals"),
  new produce("sandwich ham cheese", 7.49, "Deli & Ready Made Meals"),
  new produce("sandwich roast beef", 7.49, "Deli & Ready Made Meals"),
  new produce("sandwich turkey", 7.49, "Deli & Ready Made Meals"),
  new produce("sandwich veggie", 7.49, "Deli & Ready Made Meals"),
  new produce("sd gatorade 8", 6.99, "Drinks"),
  new produce("sd gatorade red 8", 6.99, "Drinks"),
  new produce("sd powerade", 2.79, "Drinks"),
  new produce("sd powerade orange", 2.79, "Drinks"),
  new produce("sd powerade red", 2.79, "Drinks"),
  new produce("shampoo aussie", 7.69, "Health and Beauty"),
  new produce("shampoo baby", 7.69, "Health and Beauty"),
  new produce("shampoo hs", 16.29, "Health and Beauty"),
  new produce("shampoo marc", 12.49, "Health and Beauty"),
  new produce("shampoo tresemme", 7.69, "Health and Beauty"),
  new produce("sip spanish",7.29,"Candy and Snacks"),
  new produce("soy sauce 2", 7.69, "International Foods"),
  new produce("soy sauce lite", 9.99, "International Foods"),
  new produce("soy sauce low salt", 7.69, "International Foods"),
  new produce("soy sauce reg", 7.69, "International Foods"),
  new produce("tomato cherry", 4.99, "Fruits and Vegetables"),
  new produce("tomato grape", 4.99, "Fruits and Vegetables"),
  new produce("tomato roma", 0.69, "Fruits and Vegetables"),
  new produce("tomato vine", 1.15, "Fruits and Vegetables"),
  new produce("toothpaste crest", 5.99, "Health and Beauty"),
  new produce("toothpaste for kids", 5.49, "Health and Beauty"),
  new produce("toothpaste sensodyne", 5.49, "Health and Beauty"),
  new produce("toothpaste sensodyne2", 8.29, "Health and Beauty"),
  new produce("toothpaste whitening", 8.29, "Health and Beauty"),
  new produce("tp double", 11.99, "Cleaning, Paper"),
  new produce("tp soft", 8.99, "Cleaning, Paper"),
  new produce("tp strong", 17.99, "Cleaning, Paper"),
  new produce("tp supersoft", 8.99, "Cleaning, Paper"),
  new produce("tp triple8", 11.99, "Cleaning, Paper"),
  new produce("water aquafina", 8.49, "Drinks"),
  new produce("water sparkling", 7.49, "Drinks"),
  new produce("water sparkling grapefruit", 7.49, "Drinks"),
  new produce("water spring 12", 5.59, "Drinks"),
  new produce("water spring 12 2", 4.47, "Drinks")
];

itemsInCart = [];
dealIndices = [];

function addToCart(product){
  var newProduce = new produce(product.name, product.price, product.category)
  newProduce.quantity = 1;

  var foundMatch = false;
  for(i = 0; i < itemsInCart.length; i++)
  {
    if(itemsInCart[i].name == newProduce.name){
      itemsInCart[i].quantity++;
      foundMatch = true;
      break;
    }
  }

  if(!foundMatch)
    itemsInCart.push(newProduce)

  if(itemsInCart.length == 0)
    itemsInCart.push(newProduce);

  updateTotals();

}

function updateTotals(){
  var iTotal = document.getElementById("itemTotal");
  var pTotal = document.getElementById("costTotal");

  var counter = 0;
  var priceCounter = 0;
  var itemCounter = 0;

  while(counter < itemsInCart.length)
  {
    priceCounter += itemsInCart[counter].price * itemsInCart[counter].quantity;
    itemCounter += itemsInCart[counter].quantity;
    counter++;
  }

  priceCounter = priceCounter.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

  iTotal.innerHTML = "Items in cart: " + itemCounter;
  pTotal.innerHTML = "Subtotal: " + priceCounter;
}

function goToInteralLink(){
  var myDomain = 'http://127.0.0.1:5500/.venv/focUS/index.html';
  window.location.href = myDomain;
}

window.onload = () => {
  loadItems();

  var toCategory = sessionStorage.getItem("category");
  var toItem = sessionStorage.getItem("item");

  if(toCategory != null){
    displayCategory(toCategory);
    sessionStorage.removeItem("category");
  }
  else if (toItem != null){
    displaySearch(toItem);

    var str2 = "Results for"; 
    var str3 = str2 + " "+ toItem; 
    document.getElementById("itemName").innerHTML = str3;

    for(i = 0; i < a; i++){
      var checkListItem = document.getElementById('listItem' + i);
      if(checkListItem.innerHTML == toItem){
        createArrow(checkListItem);
        break;
      }
    }

    sessionStorage.removeItem("item");
  }
  else
    displayAllProducts();
}

function displayAllProducts(){
  for(i = 0; i < products.length; i++)
  {
    createProduct(products[i]);
  }
}

function displayAllDeals(){
  for(i = 0; i < dealIndices.length; i++)
  {
    createProduct(products[dealIndices[i]]);
  }
}

function createDeals(){
  for(i = 0; i < 20; i++){
    var rand = Math.floor((Math.random() + i) * products.length/20);
    dealIndices.push(rand);

    products[rand].deal = true;
  }
}

function applyDeals(){
  for(i = 0; i < dealIndices.length; i++)
    products[dealIndices[i]].deal = true;
}

// use to display items that belong to a category (ex: Fruits and Vegetables, Dairy, etc)
function displayCategory(category){
  clearProducts();
  removeArrow();

  var str2 = "Results for"; 
  var str3 = str2 + " " + category; 
  document.getElementById("itemName").innerHTML = str3;

  for(i = 0; i < products.length; i++)
  {
    if(products[i].category == category)
      createProduct(products[i]);
  }
}

// use to display items that match a search query (item is a match if query is a substring of item name)
function displaySearch(query){
  for(i = 0; i < products.length; i++)
  {
    if(query.trim() !== "" && products[i].name.replace(" ", "s ").includes(query.trim().toLowerCase()))
    {
      createProduct(products[i]);
    }
  }
}

/*
function displaySearchAll() { // see var addButton
  // 5 is hardcoded for now... should probably compute how many we can fit on the screen
  var feed_row = document.createElement("div");
  for(i = 0; i < shoppinglist.length; i++) {
    var numFound = 0;
    for(j = 0; numFound <= 5 && j < products.length; j++) {
      if(query.trim() !== "" && products[j].name.replace(" ", "s ").includes(shoppinglist[i].trim().toLowerCase()))
      {
        numFound++;
        createProduct(products[j]);
      }
    }
  }
}*/

// displays a product on the main feed of the page (on the div with id "main")
function createProduct(product){
  // div feed-item
  var feed_item = document.createElement("div");
  feed_item.className = "col-lg-4 col-md-6 feed-item filter-card";

  // div feed-wrap
  var feed_wrap = document.createElement("div");
  feed_wrap.className = "feed-wrap";

  // div feed-info
  var feed_info = document.createElement("div");
  feed_info.className = "feed-info";

  //div feed-link
  var feed_links = document.createElement("div");
  feed_links.className = "feed-links";

  //Sanjana
  //add icon
  var add = document.createElement("i");
  add.className = "bx bx-plus";

  var a = document.createElement("a");
  a.addEventListener("click", ()=>{createPopupWin('feed-details.html','Additional Info', 1200, 650);});
  a.title="Additional Info"
  a.appendChild(add);
  feed_links.appendChild(a);
  feed_info.appendChild(feed_links);



  // img
  var image = document.createElement("img");
  var srcName = product.name.replace(/ /g, "_");
  image.src = "../static/assets/img/assets/"+ srcName + ".jpg";
  image.className = "img-fluid";
  image.alt = "";

  // p deal
  var p = document.createElement("p");
  p.innerHTML = "ON SALE"

  // p1 price
  var price = document.createElement("p1");
  price.innerHTML = "$" + product.price;

  // p2 name
  var name = document.createElement("p2");
  name.innerHTML = product.name;

  // button
  var addButton = document.createElement("button");
  addButton.style = "width:100%; background-color: #1D3557; border-color: #1D3557; border-radius:10px; font-size: large; color: #c4e8e9; font-weight: 300;";
  addButton.className = "item button fluid button-big button-buy js-open-size-selector";
  addButton.addEventListener("click", func=>{addToCart(product)});
  addButton.addEventListener("mouseover", func=>{addButton.style = "width:100%; background-color:#E63946; border-color: #E63946; border-radius:10px; font-size: large; color: #c4e8e9; font-weight: 300;"});
  addButton.addEventListener("mouseout", func=>{addButton.style = "width:100%; background-color: #1D3557; border-color: #1D3557; border-radius:10px; font-size: large; color: #c4e8e9; font-weight: 300;"});
  addButton.addEventListener("focus", func=>{
    addButton.style = "width:100%; background-color:#E63946; border-color: #E63946; border-radius:10px; font-size: large; color: #c4e8e9; font-weight: 300; outline-color:transparent; outline-style:solid; box-shadow: 0 0 0 4px #eec9cc;";
  });


  // span
  var span = document.createElement("span");
  span.innerHTML = "Add to Cart";

  feed_wrap.appendChild(image);
  addButton.appendChild(span);
  feed_info.appendChild(addButton);
  feed_wrap.appendChild(feed_info);
  feed_item.appendChild(feed_wrap);
  feed_item.appendChild(price);
  feed_item.appendChild(name);
  if(product.deal)
    feed_item.appendChild(p);

  document.getElementById("main").appendChild(feed_item);
}

function clearProducts(){
  var main = document.getElementById("main");

  while (main.hasChildNodes())
  {
    main.removeChild(main.firstChild);
  }
}

function clearAndDisplay(name){
  clearProducts();
  displaySearch(name);
}


// LIST ITEMS 

let a = 0;

function toHyperlink(){
  var str = document.getElementById("urltext").value;
  if(str.trim() !== "" && str.length > 0) {
    createListItem(str);
    shoppinglist.push(str);
  }
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
      var str2 = "Results for"; 
      var str3 = str2 + " "+ str; 
      document.getElementById("itemName").innerHTML = str3;

      clearAndDisplay(str);
      createArrow(link);
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

// delete from list

function deleteFromList(whichItem){
  var deleteThis = document.getElementById(whichItem);
  var parent = document.getElementById("mainList");

  parent.removeChild(deleteThis);
}



// when user presses enter while typing into list, it will add that item to list
var textArea = document.getElementById("urltext");

textArea.addEventListener("keypress", function(event){
  if(event.key === "Enter"){
    event.preventDefault();
    toHyperlink();
  }
});

//Sanjana

$('.menu a').click(function() {
  $('.menu a').removeClass('active');
  $('this').addClass('active');
});


function openNav() {
  document.getElementById("profileSB").style.width = "250px";
  document.getElementById("body").style.marginRight = "250px";
}

/* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
function closeNav() {
  document.getElementById("profileSB").style.width = "0";
  document.getElementById("body").style.marginRight = "0";
}


function toCart(){
  saveItems();
  var myDomain = "cart_page.html";
  window.location.href = myDomain; }
  

function createArrow(whichItem){
  removeArrow();

  var newArrow = document.createElement("i");
  newArrow.id = "selectedItem";
  newArrow.className = "bi bi-arrow-right-short";
  newArrow.style = "font-size: 25px; color: #E63946; font-width:60px;"

  whichItem.appendChild(newArrow);
}

function removeArrow(){
  var currentArrow = document.getElementById("selectedItem");
  if(currentArrow != null)
    currentArrow.parentNode.removeChild(currentArrow);
}


function createPopupWin(pageURL, pageTitle,
  popupWinWidth, popupWinHeight) {
var left = (screen.width - popupWinWidth) / 2;
var top = (screen.height - popupWinHeight) / 4;

var myWindow = window.open(pageURL, pageTitle,
  'resizable=yes, width=' + popupWinWidth
  + ', height=' + popupWinHeight + ', top='
  + top + ', left=' + left);
}

function removeReference(str){
  for(i = 0; i < shoppinglist.length; i++)
    if(shoppinglist[i] == str)
      shoppinglist.splice(i,1);

  console.log(shoppinglist);
}
//tutorial 2

// let homeTime =0;

// var url= window.location.href;

// if(homeTime==0) {
//   homeTime++;
//   if(url.split("/").length>3){
//     createPopupWin('tutorial1.html',
//     'Additional Info', 400, 200);
//   }

// }

function saveItems(){
  sessionStorage.setItem('list',JSON.stringify(itemsInCart));
  sessionStorage.setItem('deals',JSON.stringify(dealIndices));
  sessionStorage.setItem('shopping list',JSON.stringify(shoppinglist));
}


function toTutorial() {
    createPopupWin('tutorial2.html',
          'Additional Info', 600, 400);
  
}

function loadItems(){
  itemsInCart = JSON.parse(sessionStorage.getItem('list'));
  dealIndices = JSON.parse(sessionStorage.getItem('deals'));
  shoppinglist = JSON.parse(sessionStorage.getItem('shopping list'));
  if(itemsInCart == null)
    itemsInCart = [];
  else  
    updateTotals();

  if(dealIndices == null || dealIndices.length == 0){
    dealIndices = [];
    createDeals();
  }
  else  
    applyDeals();

  if(shoppinglist == null)
    shoppinglist = [];
  else  
    recallList();
}
