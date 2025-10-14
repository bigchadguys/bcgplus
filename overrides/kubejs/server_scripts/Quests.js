
// Pickpocket
FTBQuestsEvents.customTask('085947F74194D11A', (e) => {
  e.maxProgress = 5;
})

FTBQuestsEvents.customTask('5550CC8357B66AD9', (e) => {
  e.maxProgress = 1;
})

// Gimmeghoul Chest
BlockEvents.rightClicked('cobblemon:gimmighoul_chest', (e) => {
  const { player } = e;
  FTBQuests.getServerDataFromPlayer(player).addProgress('5550CC8357B66AD9', 1)

})