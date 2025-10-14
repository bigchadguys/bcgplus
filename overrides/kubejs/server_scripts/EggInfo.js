ItemEvents.rightClicked((e) => {
  if (e.item.id == "cobbreeding:pokemon_egg") {
    let tickToTime = (tick) => {
      const date = new Date(null);
      date.setSeconds(tick / 20);
      return date.toISOString().slice(14, 19);
    };

    let eggNbt = e.item.getNbt();
    if (eggNbt.species) {
      e.player.tell("§6----- §2Egg Info §6-----");
      e.player.tell(``);
      e.player.tell(
        `§eSpecies§f: ${eggNbt.species.charAt(0).toUpperCase() + eggNbt.species.slice(1)}`
      );
      e.player.tell(
        `§eForm§f: ${eggNbt.form.charAt(0).toUpperCase() + eggNbt.form.slice(1)}`
      );
      e.player.tell(
        `§eAbility§f: ${eggNbt.ability.charAt(0).toUpperCase() + eggNbt.ability.slice(1)}`
      );
      e.player.tell(
        `§eNature§f: ${eggNbt.nature.split(":")[1].charAt(0).toUpperCase() + eggNbt.nature.split(":")[1].slice(1)}`
      );
      e.player.tell("§eShiny§f: " + (eggNbt.shiny == 0 ? "§c✘" : "§a✔"));
      e.player.tell(`§eHatch Time§f: §b${tickToTime(eggNbt.timer)}`);
      e.player.tell(``);
      e.player.tell("§6-------- §2IV §6--------");
      e.player.tell(``);
      e.player.tell(`§9Health§f: ${eggNbt.ivs[0]}`);
      e.player.tell(`§cAttack§f: ${eggNbt.ivs[1]}`);
      e.player.tell(`§aDefense§f: ${eggNbt.ivs[2]}`);
      e.player.tell(`§4Special Attack§f: ${eggNbt.ivs[3]}`);
      e.player.tell(`§2Special Defense§f: ${eggNbt.ivs[4]}`);
      e.player.tell(`§bSpeed§f: ${eggNbt.ivs[5]}`);
      e.player.tell(``);
      e.player.tell("§6-------------------");
    } else {
      e.player.tell("§cBad Egg: Missing Data");
    }
  }
});
