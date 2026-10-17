// Patch notes, newest first. The first entry's version is the app version
// shown in the footer. Add a new entry at the top for each update.
export const RELEASES = [
  {
    version: "2.4",
    date: "2026-10-17",
    title: "Shopping mode",
    notes: [
      "New Shopping mode on the phone: tap Start shopping and the list takes over the whole screen.",
      "The header, tabs and search bar step aside. A slim bar on top shows what's left to get.",
      "Need to add something mid-trip? Tap Quick add. The search bar tucks away again once it's added.",
      "Shopping mode stays on if your phone locks or the app reloads. Tap Done when you're finished."
    ]
  },
  {
    version: "2.3",
    date: "2026-10-17",
    title: "Big list for the cart",
    notes: [
      "List items on the phone are big again, like the original app, so you can read them from the cart.",
      "Tap anywhere on an item to check it off, not just the circle.",
      "Quantities show as a bold badge next to the name.",
      "To change how many, move an item to another aisle, or remove it, tap the ⋯ button on that item."
    ]
  },
  {
    version: "2.2",
    date: "2026-10-16",
    title: "New icon",
    notes: [
      "New home screen icon: a route through the aisles that ends at the cart.",
      "The home screen label now reads \"Grocery List\", with a space.",
      "To see the new icon, delete the old shortcut and add the app to your home screen again."
    ]
  },
  {
    version: "2.1",
    date: "2026-10-16",
    title: "It learns your route",
    notes: [
      "Check things off in the order you grab them, and the list rearranges itself for next time.",
      "Doubling back to an aisle (Meat, then Soup, then Meat again) shows up as its own stop.",
      "A message tells you when your route changes, and Undo puts it back.",
      "The Saved items page is now \"Your route\", with a switch to turn learning off."
    ]
  },
  {
    version: "2.0",
    date: "2026-10-16",
    title: "The redesign",
    notes: [
      "New dark look in cobalt, built for both the phone and the laptop.",
      "Items are grouped by aisle, in store order.",
      "Quantities: type \"2 lemons\", or use the − and + buttons.",
      "Undo for every change (Ctrl+Z works on the laptop too).",
      "Add new items straight from the search bar. The \"Add to the database\" screen is gone.",
      "A new Saved items & aisles page replaces the old Settings and Sort pages.",
      "Your aisles, items and current list came over automatically."
    ]
  }
];

export const VERSION = RELEASES[0].version;
