function goToInteralLink(option, category, item, link)  {

  if(option == 'sign') {
    var myDomain = "signup_page.html";
      window.location.href = myDomain;
  }


  if(option == 'home') {
    var myDomain = "index.html";
      window.location.href = myDomain;


  }


  if(option == 'login') {
    var myDomain = "login_page.html";
      window.location.href = myDomain;
  }

  if(category != null){
    saveItems();
    sessionStorage.setItem("category", category);
    var myDomain = "index.html";
      window.location.href = myDomain;
    console.log("test");
  }

  if(item != null){
    saveItems();
    sessionStorage.setItem("item", item);
    var myDomain = "index.html";
      window.location.href = myDomain;
  }
}


    
