if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("serviceWorker.js")
      .then(res => console.log("service worker registered"))
      .catch(err => console.log("service worker not registered", err))
  })
}

var itemPriority = ['Apples', 'Pears', 'Peaches', 'Bananas', 'Oranges', 'Lemons', 'Limes', 'Kiwis', 'Clementines', 'Strawberries', 'Blueberries', 'Raspberries', 'Blackberries', 'Honeydew melon', 'Watermelon', 'Cantaloupe', 'Pineapple', 'Tomatoes', 'Avocados', 'Cherry tomatoes', 'Sweet peppers', 'Beets', 'Green beans', 'Parsley', 'Cilantro', 'Fresh dill', 'Rosemary', 'Sage leaves', 'Thyme', 'Basil', 'Radishes', 'Broccoli', 'Cauliflower', 'Carrots', 'Red cabbage', 'Fennel', 'Leek', 'Swiss chard', 'Celery', 'Scallion', 'Lettuce', 'Arugula', 'Romaine lettuce', 'Spinach', 'Asparagus', 'Zucchini', 'Bell pepper', 'Corn', 'Red onion', 'Yellow onion', 'Yukon gold potatoes', 'Potatoes', 'Sweet potatoes', 'Garlic cloves', 'Ginger', 'Giovanni Rana pasta', 'Alfredo sauce', 'Hummus', 'Turkey', 'Ham', 'Roast beef', 'Mortadella', 'American cheese', 'Swiss cheese', 'Pita bread', 'Dried cranberries', 'In shell nuts', 'Sliced almonds', 'Walnuts', 'Olives', 'Feta cheese', 'Monterey jack cheese', 'Gorgonzola', 'Goat cheese', 'Gouda', 'Grana padano', 'Fig jam', 'Egg salad', 'Chicken salad', 'Quiche', 'Sushi', 'Salmon', 'White fish', 'Pork chops', 'Ground beef', 'Meatloaf meat', 'Ground turkey', 'Chicken', 'Hot dogs', 'Bacon', 'Cliff bars', 'Potato chips', 'Gum', 'Snickers', 'Graham crackers', 'Popcorn', 'Cereal', 'Granola', 'Peppermint tea', 'Earl grey', 'Powerade', 'La croix', 'Artichoke hearts', 'Baked beans', 'Pinto beans', 'Canned salmon', 'Tuna fish', 'Dijon mustard', 'Mayonnaise', 'Ketchup', 'Sriracha', 'Sauerkraut', 'Bleu cheese', 'Pickles', 'Apple sauce', 'Chicken stock', 'Beef broth', 'Soups', 'Red wine vinegar', 'White wine vinegar', 'Distilled vinegar', 'Rice vinegar', 'Miso soup', 'Hoisin sauce', 'Oyster sauce', 'Peppercorns', 'Kosher salt', 'Paprika', 'Dried marjoram', 'Chili powder', 'Celery seed', 'Cumin', 'Sugar', 'Light brown sugar', 'Flour', 'Semolina flour', 'Baking soda', 'Maple syrup', 'Honey', 'Scones mix', 'Jasmine rice', 'Pearl couscous', 'Coconut milk', 'Chickpeas', 'Tortillas', 'Olive oil', 'Polenta', 'Spaghetti', 'Tomato sauce', 'Tomato paste', 'Pomi', 'Cat food', 'Frozen pizza', 'Boca Burgers', 'Eggos', 'Ice cream', 'Frozen fruit', 'Noosa yogurt', 'Yogurt', 'Ricotta cheese', 'Sour cream', 'Oat milk', 'Milk', 'Heavy cream', 'Whipped cream', 'Eggs', 'Butter', 'Peanut butter', 'Jam', 'Nutella', 'English muffins', 'Hot dog buns', 'Hamburger buns', 'Bread']

/*function addSaveToList(gData) {
  for(var key in gData){
    for (var i = 0; i < gData[key].length; i++) {
      console.log(gData[key][i]);
      addToList(gData[key][i]);
    }
    console.log(gData[key])
  }
}*/

var groceryList = [];
var gListObj = {};
var groceryListJSON

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

function loadSavedList(){
  firebase.database().ref('gList').once('value').then(function(snapshot) {
    var gData = snapshot.val();
    var obj = JSON.stringify(gData);
    if (gData != null) {

      for (var i = 0; i < gData.length; i++) {
        groceryList.push(gData[i]);
        console.log("Initial: ", groceryList);
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
  console.log(x);
  if (groceryList.length == 0) {
    gListObj= x;
    groceryList.push(x);
    document.getElementById("toggleSwitch").disabled = false;
    console.log("1: ", groceryList);
  } else if (!groceryList.includes(x)) {
    gListObj = x
    groceryList.push(x);
    console.log("2: ", groceryList);
  } else {
    console.log("3: ", groceryList);
    console.log(groceryList.indexOf(x));
   groceryList.splice(groceryList.indexOf(x), 1);
    document.getElementById(x).checked = false;
  }
  groceryList.sort(function(a, b) {
    return itemPriority.indexOf(a) - itemPriority.indexOf(b);

  });
  console.log("Sorted: ", groceryList);
  firebase.database().ref('gList').set(groceryList);
  document.getElementById("mydiv").innerHTML = "";
  for (var i = 0; i < groceryList.length; i++) {
    console.log("Add to list");
    nameList = '<label class="container-checkbox">' + groceryList[i] + '<input onclick="addToList(\'' + groceryList[i] + '\')" type="checkbox" value="' + groceryList[i] + '" checked><span class= "checkmark"></span>';
    document.getElementById("mydiv").innerHTML += nameList;
  }
};

console.log(groceryList);


/*
function addToList(x) {
  document.getElementById(x).checked = true;
  console.log(x);
  if (groceryList.length == 0) {
    groceryList.push(x);
    document.getElementById("toggleSwitch").disabled = false;
    console.log("add first item");
  } else if (!groceryList.includes(x)) {
    groceryList.push(x);
  } else {
    groceryList.splice(groceryList.indexOf(x), 1);
    document.getElementById(x).checked = false;
  }
  groceryList.sort(function(a, b) {
    return itemPriority.indexOf(a) - itemPriority.indexOf(b);
  });

  document.getElementById("mydiv").innerHTML = "";
  for (var i = 0; i < groceryList.length; i++) {
    nameList = '<label class="container-checkbox">' + groceryList[i] + '<input onclick="addToList(\'' + groceryList[i] + '\')" type="checkbox" value="' + groceryList[i] + '" checked><span class= "checkmark"></span>';
    document.getElementById("mydiv").innerHTML += nameList;
  }
}
*/


function toggleList() {
  var myList = document.getElementById("mydiv");
  var btn = document.getElementById("toggleSwitch");
  if (myList.style.display === "none") {
    if (groceryList.length == 0) {
      document.getElementById("mydiv").innerHTML = "No items have been added to the grocery list";
    }
    myList.style.display = "block";
    btn.innerText = "Hide List";
    btn.style.color = "#DDDDDD";
    btn.style.backgroundColor = "#E94560";
  } else {
    myList.style.display = "none";
    btn.innerText = "Show List"
    btn.style.backgroundColor = "#627D98";
  }
}
