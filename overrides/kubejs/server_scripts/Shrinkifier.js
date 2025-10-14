ItemEvents.rightClicked((e) => {
  if (e.item.id == "kubejs:shrinkifier") {
    const { entity, player } = e;
    player.damageHeldItem(e.hand, 50);
    player.persistentData.Size = player.persistentData.Size || 1;
    player.persistentData.Size = (player.persistentData.Size % 4) + 1;
    let { x, y, z } = player;
    player.server.runCommandSilent(
      `playsound minecraft:block.amethyst_block.hit master @p ${x} ${y} ${z}`
    );

    let active_size;
    switch (player.persistentData.Size) {
      case 1:
        active_size = 1; // Normal
        break;
      case 2:
        active_size = 0.9; // Small
        break;
      case 3:
        active_size = 0.5; // Tiny
        break;
      case 4:
        active_size = 0.0625; // Bits And Chisels
        break;
    }

    entity.mergeNbt({
      "pehkui:scale_data_types": {
        "pehkui:base": {
          scale: active_size,
        },
      },
    });
  }
});
