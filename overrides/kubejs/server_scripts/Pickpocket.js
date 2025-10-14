const PICKPOCKET_COOLDOWN_TIMER = 2400; // In Ticks
const BASE_PICKPOCKET_CHANCE = 0.25; // Min 25% Success
const MAX_PICKPOCKET_LUCK = 0.9; // Max 90% Success
const LUCK_MULTIPLIER = 0.05; // 1:0.5 per luck level

ItemEvents.entityInteracted((e) => {
  const { player, target, server } = e;

  let villagerName;

  if (target.nbt.firstName) {
    villagerName = target.nbt.firstName;
  } else if (target.nbt.CustomName) {
    villagerName =
      target.nbt.CustomName.match(/"text":"([^"]+)"/)[1].toString();
  } else {
    villagerName = "They";
  }

  if (
    player.isCrouching() ||
    player.mainHandItem !== "air" ||
    target.type !== "minecraft:villager"
  )
    return;

  const profession = target.nbt.VillagerData.profession;
  if (profession !== "minecraft:none" && profession !== "minecraft:nitwit")
    return;

  if (player.persistentData.pickPocketCooldown) {
    player.statusMessage = Text.of("§6Pickpocket §7is on cooldown.");
    return;
  }

  if (target.getPlayerReputation(player) <= -100) {
    player.statusMessage = Text.of(
      `§c${villagerName} §7${villagerName == "They" ? "are" : "is"} suspicious of you.`
    );
    return;
  }

  Math.random() < luckCalculator(player)
    ? pickPocketSuccess(player, server)
    : pickPocketFail(player, target, server, villagerName);
});

function luckCalculator(player) {
  let calculatedLuck =
    player.getLuck() * LUCK_MULTIPLIER + BASE_PICKPOCKET_CHANCE;

  return Math.min(calculatedLuck, MAX_PICKPOCKET_LUCK);
}

function applyCooldown(player, server) {
  player.persistentData.pickPocketCooldown = true;
  server.scheduleInTicks(PICKPOCKET_COOLDOWN_TIMER, () => {
    player.persistentData.pickPocketCooldown = false;
  });
}

function pickPocketSuccess(player, server) {
  applyCooldown(player, server);

  let { x, y, z } = player;
  player.server.runCommandSilent(
    `playsound minecraft:block.note_block.bell master @p ${x} ${y} ${z}`
  );

  FTBQuests.getServerDataFromPlayer(player).addProgress("085947F74194D11A", 1);
  const emeraldAmount = Math.floor(Math.random() * 5) + 2;
  player.give(Item.of("minecraft:emerald", emeraldAmount));

  player.statusMessage = Text.of(
    `§7You've stolen §a${emeraldAmount} Emerald${emeraldAmount > 1 ? "s" : ""}§7.`
  );
}

function pickPocketFail(player, target, server, villagerName) {
  const ReputationEventType = Java.loadClass(
    "net.minecraft.world.entity.ai.village.ReputationEventType"
  );

  applyCooldown(player, server);

  let { x, y, z } = player;
  player.server.runCommandSilent(
    `playsound minecraft:item.shield.break master @p ${x} ${y} ${z}`
  );

  player.attack(2.5);
  target.onReputationEventFrom(ReputationEventType.VILLAGER_HURT, player);

  player.statusMessage = Text.of(
    `§7You were caught! §c${villagerName} §7will remember this.`
  );
}
