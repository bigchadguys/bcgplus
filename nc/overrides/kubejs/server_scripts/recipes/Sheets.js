ServerEvents.recipes((event) => {
  event
    .shapeless(Item.of("create:iron_sheet", 1), [
      "minecraft:iron_ingot",
      "#c:hammers",
    ])
    .damageIngredient("#c:hammers", "10");
});

ServerEvents.recipes((event) => {
  event
    .shapeless(Item.of("create:copper_sheet", 1), [
      "minecraft:copper_ingot",
      "#c:hammers",
    ])
    .damageIngredient("#c:hammers", "10");
});

ServerEvents.recipes((event) => {
  event
    .shapeless(Item.of("create:brass_sheet", 1), [
      "create:brass_ingot",
      "#c:hammers",
    ])
    .damageIngredient("#c:hammers", "10");
});

ServerEvents.recipes((event) => {
  event
    .shapeless(Item.of("create:golden_sheet", 1), [
      "minecraft:gold_ingot",
      "#c:hammers",
    ])
    .damageIngredient("#c:hammers", "10");
});

ServerEvents.recipes((event) => {
  event
    .shapeless(Item.of("createaddition:electrum_sheet", 1), [
      "createaddition:electrum_ingot",
      "#c:hammers",
    ])
    .damageIngredient("#c:hammers", "10");
});

ServerEvents.recipes((event) => {
  event
    .shapeless(Item.of("createaddition:zinc_sheet", 1), [
      "create:zinc_ingot",
      "#c:hammers",
    ])
    .damageIngredient("#c:hammers", "10");
});

ServerEvents.recipes((event) => {
  event
    .shapeless(Item.of("createdeco:andesite_sheet", 1), [
      "create:andesite_alloy",
      "#c:hammers",
    ])
    .damageIngredient("#c:hammers", "10");
});

ServerEvents.recipes((event) => {
  event
    .shapeless(Item.of("createdeco:netherite_sheet", 1), [
      "minecraft:netherite_ingot",
      "#c:hammers",
    ])
    .damageIngredient("#c:hammers", "10");
});

ServerEvents.recipes((event) => {
  event
    .shapeless(Item.of("createdeco:industrial_iron_sheet", 1), [
      "#c:fried_iron",
      "#c:hammers",
    ])
    .damageIngredient("#c:hammers", "10");
});
