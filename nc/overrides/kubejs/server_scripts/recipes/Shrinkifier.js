ServerEvents.recipes((e) => {
  e.shaped(Item.of("kubejs:shrinkifier", 1), [" I ", "IEI", " I "], {
    I: "minecraft:iron_ingot",
    E: "minecraft:echo_shard",
  });
});
