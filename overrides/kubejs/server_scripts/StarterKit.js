PlayerEvents.loggedIn((e) => {
  if (!e.player.stages.has("started")) {
    e.player.stages.add("started");
    e.player.give("ftbquests:book");
    e.player.give("minecraft:compass");
    e.player.give(Item.of("farmersdelight:fruit_salad", 3));
  }
});
