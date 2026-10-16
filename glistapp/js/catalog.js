// Starting aisles and items, taken from the original app's index.html.
// Only used once, to seed the new database path the first time the app runs.
export const SEED_AISLES = [
  ["Produce", ["Apples", "Pears", "Peaches", "Bananas", "Oranges", "Lemons", "Limes", "Kiwis", "Clementines", "Strawberries", "Blueberries", "Raspberries", "Blackberries", "Honeydew melon", "Watermelon", "Cantaloupe", "Pineapple", "Tomatoes", "Avocados", "Cherry tomatoes", "Sweet peppers", "Beets", "Green beans", "Parsley", "Cilantro", "Fresh dill", "Rosemary", "Sage leaves", "Thyme", "Basil", "Radishes", "Broccoli", "Cauliflower", "Carrots", "Red cabbage", "Fennel", "Leek", "Swiss chard", "Celery", "Scallion", "Lettuce", "Arugula", "Romaine lettuce", "Spinach", "Asparagus", "Zucchini", "Bell pepper", "Corn", "Red onion", "Yellow onion", "Yukon gold potatoes", "Potatoes", "Sweet potatoes", "Garlic cloves", "Ginger"]],
  ["Deli", ["Giovanni Rana pasta", "Alfredo sauce", "Hummus", "Turkey", "Ham", "Roast beef", "Mortadella", "American cheese", "Swiss cheese", "Pita bread", "Dried cranberries", "In shell nuts", "Sliced almonds", "Walnuts", "Olives", "Feta cheese", "Monterey jack cheese", "Gorgonzola", "Goat cheese", "Gouda", "Grana padano", "Fig jam", "Egg salad", "Chicken salad", "Quiche", "Sushi"]],
  ["Meat", ["Salmon", "White fish", "Pork chops", "Ground beef", "Meatloaf meat", "Ground turkey", "Chicken", "Hot dogs", "Bacon"]],
  ["Organics", ["Cliff bars", "Potato chips"]],
  ["Snacks", ["Gum", "Snickers", "Graham crackers", "Popcorn"]],
  ["Breakfast", ["Cereal", "Granola", "Peppermint tea", "Earl grey"]],
  ["Beverage", ["Powerade", "La croix"]],
  ["Soup/Condiments", ["Artichoke hearts", "Baked beans", "Pinto beans", "Canned salmon", "Tuna fish", "Dijon mustard", "Mayonnaise", "Ketchup", "Sriracha", "Sauerkraut", "Bleu cheese", "Pickles", "Apple sauce", "Chicken stock", "Beef broth", "Soups", "Red wine vinegar", "White wine vinegar", "Distilled vinegar", "Rice vinegar", "Miso soup", "Hoisin sauce", "Oyster sauce"]],
  ["Spices/Baking", ["Peppercorns", "Kosher salt", "Paprika", "Dried marjoram", "Chili powder", "Celery seed", "Cumin", "Sugar", "Light brown sugar", "Flour", "Semolina flour", "Baking soda", "Maple syrup", "Honey", "Scones mix"]],
  ["International", ["Jasmine rice", "Pearl couscous", "Coconut milk", "Chickpeas", "Tortillas", "Olive oil", "Polenta", "Spaghetti", "Tomato sauce", "Tomato paste", "Pomi"]],
  ["Pets", ["Cat food"]],
  ["Frozen meals", ["Frozen pizza", "Boca Burgers", "Eggos"]],
  ["Frozen veg/Ice cream", ["Ice cream", "Frozen fruit"]],
  ["Dairy", ["Noosa yogurt", "Yogurt", "Ricotta cheese", "Sour cream", "Oat milk", "Milk", "Heavy cream", "Whipped cream", "Eggs", "Butter"]],
  ["Bread", ["Peanut butter", "Jam", "Nutella", "English muffins", "Hot dog buns", "Hamburger buns", "Bread"]]
];

// Builds the first version of the new data from the live app's data at /test:
//   test/Aisle = [{ item: "Produce" }, ...]            aisles in store order
//   test/<Aisle name> = [{ item: "Apples" }, ...]      items in store order
//   test/gList = ["Honey", "Eggs"]                     what's on the list now
export function buildSeedFromTest(test) {
  const vals = (v) => (Array.isArray(v) ? v : v && typeof v === "object" ? Object.values(v) : []);
  const aisles = {};
  const items = {};
  const byName = {};
  let n = 0;
  let walk = 0;
  vals(test.Aisle).forEach((a, ai) => {
    const aisleName = a && String(a.item || "").trim();
    if (!aisleName) return;
    const aid = "a" + ai;
    aisles[aid] = { name: aisleName, pos: ai };
    vals(test[aisleName]).forEach((entry, pos) => {
      const name = entry && String(entry.item || "").trim();
      if (!name || byName[name.toLowerCase()]) return;
      const id = "i" + n++;
      walk += 10;
      items[id] = { name, aisle: aid, pos, walk, qty: 1 };
      byName[name.toLowerCase()] = id;
    });
  });
  const list = {};
  vals(test.gList).forEach((name) => {
    const id = byName[String(name).toLowerCase()];
    if (id) {
      list[id] = { qty: 1, done: false, t: Date.now() };
      items[id].uses = 1;
    }
  });
  return { aisles, items, list, meta: { seededAt: Date.now(), from: "test" } };
}

// Fallback: builds the first version from the built-in seed list, plus whatever
// is on the old app's list right now (an array of item names).
export function buildSeed(oldList) {
  const aisles = {};
  const items = {};
  const byName = {};
  let n = 0;
  SEED_AISLES.forEach(([aisleName, names], ai) => {
    const aid = "a" + ai;
    aisles[aid] = { name: aisleName, pos: ai };
    names.forEach((name, pos) => {
      const id = "i" + n++;
      items[id] = { name, aisle: aid, pos, qty: 1 };
      byName[name.toLowerCase()] = id;
    });
  });
  const list = {};
  (Array.isArray(oldList) ? oldList : []).forEach((name) => {
    const id = byName[String(name).toLowerCase()];
    if (id) {
      list[id] = { qty: 1, done: false, t: Date.now() };
      items[id].uses = 1;
    }
  });
  return { aisles, items, list, meta: { seededAt: Date.now(), from: "gList" } };
}
