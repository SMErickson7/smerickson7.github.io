function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
    var a, b, i, val = this.value;
    /*close any already open lists of autocompleted values*/
    closeAllLists();
    if (!val) {
      return false;
    }
    currentFocus = -1;
    /*create a DIV element that will contain the items (values):*/
    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    /*append the DIV element as a child of the autocomplete container:*/
    this.parentNode.appendChild(a);
    /*for each item in the array...*/
    for (i = 0; i < arr.length; i++) {
      /*check if the item starts with the same letters as the text field value:*/
      if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        /*create a DIV element for each matching element:*/
        b = document.createElement("DIV");
        /*make the matching letters bold:*/
        b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
        b.innerHTML += arr[i].substr(val.length);
        /*insert a input field that will hold the current array item's value:*/
        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
        /*execute a function when someone clicks on the item value (DIV element):*/
        b.addEventListener("click", function(e) {
          /*insert the value for the autocomplete text field:*/
          inp.value = this.getElementsByTagName("input")[0].value;
          console.log(inp.value);
          addToList(inp.value);
          /*close the list of autocompleted values,
          (or any other open lists of autocompleted values:*/
          closeAllLists();
        });
        a.appendChild(b);
      }
    }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      /*If the arrow DOWN key is pressed,
      increase the currentFocus variable:*/
      currentFocus++;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 38) { //up
      /*If the arrow UP key is pressed,
      decrease the currentFocus variable:*/
      currentFocus--;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 13) {
      /*If the ENTER key is pressed, prevent the form from being submitted,*/
      e.preventDefault();
      if (currentFocus > -1) {
        /*and simulate a click on the "active" item:*/
        if (x) x[currentFocus].click();
      }
    }
  });

  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }

  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }

  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function(e) {
    closeAllLists(e.target);
    console.log(e.target);
  });
}


// End Autocomplete

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("serviceWorker.js")
      .then(res => console.log("service worker registered"))
      .catch(err => console.log("service worker not registered", err))
  })
}

var groceryStore = {
  produce: ["Apples", "Pears", "Peaches", "Bananas", "Oranges", "Lemons", "Limes", "Kiwis", "Clementines", "Strawberries", "Blueberries", "Raspberries", "Blackberries", "Honeydew melon", "Watermelon", "Cantaloupe", "Pineapple", "Tomatoes", "Avocados", "Cherry tomatoes", "Sweet peppers", "Beets", "Green beans", "Parsley", "Cilantro", "Fresh dill", "Rosemary", "Sage leaves", "Thyme", "Basil", "Radishes", "Broccoli", "Cauliflower", "Carrots", "Red cabbage", "Fennel", "Leek", "Swiss chard", "Celery", "Scallion", "Lettuce", "Arugula", "Romaine lettuce", "Spinach", "Asparagus", "Zucchini", "Bell pepper", "Corn", "Red onion", "Yellow onion", "Yukon gold potatoes", "Potatoes", "Sweet potatoes", "Garlic cloves", "Ginger"],
  deli: ["Giovanni Rana pasta", "Alfredo sauce", "Hummus", "Turkey", "Ham", "Roast beef", "Mortadella", "American cheese", "Swiss cheese", "Pita bread", "Dried cranberries", "In shell nuts", "Sliced almonds", "Walnuts", "Olives", "Feta cheese", "Monterey jack cheese", "Gorgonzola", "Goat cheese", "Gouda", "Grana padano", "Fig jam", "Egg salad", "Chicken salad", "Quiche", "Sushi"],
  meat: ["Salmon", "White fish", "Pork chops", "Ground beef", "Meatloaf meat", "Ground turkey", "Chicken", "Hot dogs", "Bacon"],
  organics: ["Cliff bars", "Potato chips"],
  snacks: ["Gum", "Snickers", "Graham crackers", "Crackers", "Popcorn"],
  breakfast: ["Cereal", "Granola", "Peppermint tea", "Earl grey"],
  beverage: ["Powerade", "La croix"],
  soup_condiments: ["Peppercorns", "Kosher salt", "Paprika", "Dried marjoram", "Chili powder", "Celery seed", "Cumin", "Sugar", "Light brown sugar", "Flour", "Semolina flour", "Baking soda", "Maple syrup", "Honey", "Apple sauce", "Scones mix"],
  spices_baking: ["Baked beans", "Pinto beans", "Canned salmon", "Tuna fish", "Dijon mustard", "Mayonnaise", "Ketchup", "Sriracha", "Sauerkraut", "Bleu cheese", "Pickles", "Chicken stock", "Beef broth", "Soups", "Red wine vinegar", "White wine vinegar", "Distilled vinegar", "Rice vinegar", "Miso soup", "Hoisin sauce", "Oyster sauce"],
  international: ["Artichoke hearts", "Jasmine rice", "Pearl couscous", "Coconut milk", "Chickpeas", "Tortillas", "Olive oil", "Polenta", "Spaghetti", "Tomato sauce", "Tomato paste", "Pomi"],
  pets: ["Cat food"],
  frozen: ["Frozen pizza", "Boca Burgers", "Eggos", "Ice cream", "Frozen fruit"],
  dairy: ["Noosa yogurt", "Yogurt", "Ricotta cheese", "Sour cream", "Cottage cheese", "Oat milk", "Milk", "Heavy cream", "Whipped cream", "Eggs", "Butter"],
  bread: ["Peanut butter", "Jam", "Nutella", "English muffins", "Hot dog buns", "Hamburger buns", "Bread"]
};

var itemPriority = groceryStore.produce.concat(groceryStore.deli, groceryStore.meat, groceryStore.organics, groceryStore.breakfast, groceryStore.beverage, groceryStore.soup_condiments, groceryStore.spices_baking, groceryStore.international, groceryStore.pets, groceryStore.frozen, groceryStore.dairy, groceryStore.bread);
var groceryList = [];
var itemsLeftList = groceryStore.produce.concat(groceryStore.deli, groceryStore.meat, groceryStore.organics, groceryStore.breakfast, groceryStore.beverage, groceryStore.soup_condiments, groceryStore.spices_baking, groceryStore.international, groceryStore.pets, groceryStore.frozen, groceryStore.dairy, groceryStore.bread);



function populatePage() {
  for (var i = 0; i < Object.keys(groceryStore).length; i++) {
    const itemContainer = document.getElementById(Object.keys(groceryStore)[i] + "-list");
    let arrayName = Object.keys(groceryStore)[i];
    //console.log(arrayName);
    for (var j = 0; j < groceryStore[arrayName].length; j++) {
      let itemLabel = document.createElement("label");
      itemLabel.classList.add("container-checkbox");
      itemLabel.innerHTML = groceryStore[arrayName][j];
      let itemInput = document.createElement("input");
      itemInput.setAttribute('id', groceryStore[arrayName][j]);
      itemInput.setAttribute('value', groceryStore[arrayName][j]);
      itemInput.setAttribute('type', 'checkbox');
      itemInput.setAttribute('onclick', 'addToList("' + groceryStore[arrayName][j] + '")');
      let itemSpan = document.createElement("span");
      itemSpan.classList.add("checkmark");
      itemLabel.appendChild(itemInput);
      itemLabel.appendChild(itemSpan);
      itemContainer.appendChild(itemLabel);
    }
  }
}

populatePage();



var config = {
  apiKey: "AIzaSyD-WoETx4P8BPtfxuKIVvr38tp0x0z7fVM",
  authDomain: "grocerylist-e012f.firebaseapp.com",
  databaseURL: "https://grocerylist-e012f-default-rtdb.firebaseio.com",
  projectId: "grocerylist-e012f",
  storageBucket: "grocerylist-e012f.appspot.com",
  messagingSenderId: "320470919045",
  appId: "1:320470919045:web:8a94b3e93c0290c1b546ec",
  measurementId: "G-6W4QL6Z2RS"
};
firebase.initializeApp(config);

var ref = firebase.database().ref('gList');

function loadSavedList() {
  firebase.database().ref('gList').once('value').then(function(snapshot) {
    var gData = snapshot.val();
    var obj = JSON.stringify(gData);
    if (gData != null) {

      for (var i = 0; i < gData.length; i++) {
        const index = itemsLeftList.indexOf(gData[i]);
        groceryList.push(gData[i]);
        itemsLeftList.splice(index, 1);
        itemsLeftList = itemsLeftList.sort();
        //console.log(itemsLeftList);
        //console.log("Initial: ", groceryList);
        document.getElementById("toggleSwitch").disabled = false;
        document.getElementById(gData[i]).checked = true;
        nameList = '<label class="container-checkbox">' + groceryList[i] + '<input onclick="addToList(\'' + groceryList[i] + '\')" type="checkbox" value="' + groceryList[i] + '" checked><span class= "checkmark"></span>';
        document.getElementById("mydiv").innerHTML += nameList;
      }
    }
  }, function(error) {
    console.log("Error: " + error.code);
  });
};



function addToList(x) {
  document.getElementById(x).checked = true;
  //console.log(x);
  if (groceryList.length == 0) {
    groceryList.push(x)
    const index = itemsLeftList.indexOf(x)
    itemsLeftList.splice(index, 1);
    document.getElementById("toggleSwitch").disabled = false;
    //console.log("1: ", groceryList, itemsLeftList);
  } else if (!groceryList.includes(x)) {
    groceryList.push(x);
    const index = itemsLeftList.indexOf(x)
    itemsLeftList.splice(index, 1);
    //console.log("2: ", groceryList, itemsLeftList);
  } else {
    //console.log(groceryList.indexOf(x));
    groceryList.splice(groceryList.indexOf(x), 1);
    itemsLeftList.push(x);
    document.getElementById(x).checked = false;
    //console.log("3: ", groceryList, itemsLeftList);
  }
  groceryList.sort(function(a, b) {
    return itemPriority.indexOf(a) - itemPriority.indexOf(b);
  });
  itemsLeftList = itemsLeftList.sort();
  //console.log("Sorted: ", groceryList, itemsLeftList);
  firebase.database().ref('gList').set(groceryList);
  document.getElementById("mydiv").innerHTML = "";
  for (var i = 0; i < groceryList.length; i++) {
    //console.log("Add to list");
    nameList = '<label class="container-checkbox">' + groceryList[i] + '<input onclick="addToList(\'' + groceryList[i] + '\')" type="checkbox" value="' + groceryList[i] + '" checked><span class= "checkmark"></span>';
    document.getElementById("mydiv").innerHTML += nameList;
  }
};

function toggleList(y, z) {
  console.log(y, z);
  //console.log("toggle" + x);
  const toggleHeader = document.getElementById("toggle" + y)
  toggleHeader.classList.toggle("is-active");
  if (y == 0) {
    var myList = document.getElementById("mydiv");
    if (myList.style.display === "none") {
      if (groceryList.length == 0) {
        document.getElementById("mydiv").innerHTML = "No items have been added to the grocery list";
      }
      myList.style.display = "block";
      return
    } else {
      myList.style.display = "none";
      return
    }
  } else {
    var aisleList = document.getElementById(z);
    if (aisleList.style.display === "none") {
      aisleList.style.display = "block";
      return
    } else {
      aisleList.style.display = "none";
      return
    }
  }
}
