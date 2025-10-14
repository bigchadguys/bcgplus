ServerEvents.recipes((event) => {
  event.shapeless(Item.of("kubejs:joe_coin_half", 2), ["bcg_smp:joe_coin"]);
});

ServerEvents.recipes((event) => {
  event.shapeless(Item.of("kubejs:joe_coin_quarter", 2), [
    "kubejs:joe_coin_half",
  ]);
});

ServerEvents.recipes((event) => {
  event.shapeless(Item.of("bcg_smp:joe_coin", 1), [
    "kubejs:joe_coin_quarter",
    "kubejs:joe_coin_quarter",
    "kubejs:joe_coin_quarter",
    "kubejs:joe_coin_quarter",
  ]);
});

ServerEvents.recipes((event) => {
  event.shapeless(Item.of("bcg_smp:joe_coin", 1), [
    "kubejs:joe_coin_half",
    "kubejs:joe_coin_quarter",
    "kubejs:joe_coin_quarter",
  ]);
});

ServerEvents.recipes((event) => {
  event.shapeless(Item.of("kubejs:joe_coin_half", 1), [
    "kubejs:joe_coin_quarter",
    "kubejs:joe_coin_quarter",
  ]);
});

ServerEvents.recipes((event) => {
  event.shapeless(Item.of("bcg_smp:joe_coin", 1), [
    "kubejs:joe_coin_half",
    "kubejs:joe_coin_half",
  ]);
});
