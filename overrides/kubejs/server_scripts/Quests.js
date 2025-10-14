// Gimmeghoul Chest
FTBQuestsEvents.customTask("5550CC8357B66AD9", (e) => {
  e.maxProgress = 1;
});

// Gimmeghoul Chest
BlockEvents.rightClicked("cobblemon:gimmighoul_chest", (e) => {
  const { player } = e;
  FTBQuests.getServerDataFromPlayer(player).addProgress("5550CC8357B66AD9", 1);
});
