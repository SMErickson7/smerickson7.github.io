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
  dairy: ["Noosa yogurt", "Yogurt", "Ricotta cheese", "Sour cream", "Oat milk", "Milk", "Heavy cream", "Whipped cream", "Eggs", "Butter"],
  bread: ["Peanut butter", "Jam", "Nutella", "English muffins", "Hot dog buns", "Hamburger buns", "Bread"]
};

var itemPriority = groceryStore.produce.concat(groceryStore.deli, groceryStore.meat, groceryStore.organics, groceryStore.breakfast, groceryStore.beverage, groceryStore.soup_condiments, groceryStore.spices_baking, groceryStore.international, groceryStore.pets, groceryStore.frozen, groceryStore.dairy, groceryStore.bread);


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
