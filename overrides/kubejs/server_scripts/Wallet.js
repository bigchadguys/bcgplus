const MAX_WITHDRAWAL_AMOUNT = 5184; // Emeralds
const INTEREST_TIMER = 36000; // In ticks
const INTEREST_RATE = 1.03;

function depositEmeralds(player, depositAmount) {
  const bankData = player.persistentData;

  if (depositAmount === 0) {
    player.statusMessage = Text.of(
      `§7You have §a${bankData.PersonalBank} Emerald${bankData.PersonalBank > 1 || bankData.PersonalBank === 0 ? "s" : ""}§7.`
    );
    return;
  }

  bankData.PersonalBank = (bankData.PersonalBank || 0) + depositAmount;
  player.inventory.clear("minecraft:emerald");
  player.inventory.clear("minecraft:emerald_block");

  player.statusMessage = Text.of(
    `§7You've deposited §a${depositAmount} Emerald${depositAmount > 1 ? "s" : ""}§7!`
  );
}

function withdrawEmeralds(player, bankAmount) {
  if (bankAmount === 0) {
    player.statusMessage = Text.of(
      `§7You have §a${bankAmount} Emerald${bankAmount > 1 || bankAmount === 0 ? "s" : ""}§7.`
    );
    return 0;
  }

  let bankAmountCopy = bankAmount;

  if (bankAmountCopy >= MAX_WITHDRAWAL_AMOUNT) {
    bankAmountCopy = MAX_WITHDRAWAL_AMOUNT;
  }

  let emeraldBlockReturn = Math.floor(bankAmountCopy / 9);
  let emeraldReturn = bankAmountCopy % 9;
  let withdrawalAmount = emeraldReturn + emeraldBlockReturn * 9;

  player.give(Item.of("minecraft:emerald", emeraldReturn));
  player.give(Item.of("minecraft:emerald_block", emeraldBlockReturn));

  player.statusMessage = Text.of(
    `§7You've withdrawn §a${withdrawalAmount} Emerald${withdrawalAmount > 1 ? "s" : ""}§7!`
  );

  return bankAmount - withdrawalAmount;
}

ItemEvents.rightClicked((e) => {
  if (e.item.id !== "kubejs:wallet") return;

  const { player } = e;
  const bankData = player.persistentData;

  if (bankData.PersonalBank == undefined) bankData.PersonalBank = 0;

  let { x, y, z } = player;
  player.server.runCommandSilent(
    `playsound minecraft:block.amethyst_block.hit master @p ${x} ${y} ${z}`
  );

  if (!player.isCrouching()) {
    const emeraldCount = player.inventory.count("minecraft:emerald");
    const emeraldBlockCount = player.inventory.count("minecraft:emerald_block");
    const depositAmount = emeraldCount + emeraldBlockCount * 9;

    depositEmeralds(player, depositAmount);
  } else {
    let bankAmount = bankData.PersonalBank || 0;
    bankData.PersonalBank = withdrawEmeralds(player, bankAmount);
  }
});

let tick = 0;
ServerEvents.tick((e) => {
  tick += 1;
  if (tick === INTEREST_TIMER) {
    e.server.players.forEach((player) => {
      let bankAmount = player.persistentData.PersonalBank;
      if (bankAmount < 24) return;

      const depositAmount = Math.floor(bankAmount * INTEREST_RATE) - bankAmount;

      if (depositAmount > 0) {
        player.statusMessage = Text.of(
          `§7You've earned §a${depositAmount} Emerald${depositAmount > 1 ? "s" : ""} §7as interest!`
        );
      }

      player.persistentData.PersonalBank += depositAmount;
    });
    tick = 0;
  }
});
