Platform.mods.kubejs.name = "BigChadGuys";

StartupEvents.registry("item", (e) => {
  e.create("shrinkifier")
    .displayName("Shrink-ifier")
    .unstackable()
    .maxDamage(1000);
});

StartupEvents.registry("item", (e) => {
  e.create("wallet").displayName("Wallet").unstackable();
});

StartupEvents.registry("item", (e) => {
  e.create("create_guide").displayName("Create Guide").unstackable();
});

StartupEvents.registry("item", (e) => {
  e.create("joe_coin_half").displayName("Joe Coin Half");
});

StartupEvents.registry("item", (e) => {
  e.create("joe_coin_quarter").displayName("Joe Coin Quarter");
});
