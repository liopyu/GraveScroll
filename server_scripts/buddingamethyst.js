global.amethystblock = tick => {
    let { block, level } = tick;
    let pos = block.getPos();
    let Direction = Java.loadClass('net.minecraft.core.Direction');

    let growAmethystBuds = () => {
        Direction.values().forEach(face => {
            let offsetPos = pos.relative(face);
            let adjacentBlockId = level.getBlock(offsetPos).id;
            let chanceOfGrowth = 0.1;
            let randomValue = Math.random();

            let blockTypes = {
                'minecraft:air': 'small_amethyst_bud',
                'minecraft:small_amethyst_bud': 'medium_amethyst_bud',
                'minecraft:medium_amethyst_bud': 'large_amethyst_bud',
                'minecraft:large_amethyst_bud': 'amethyst_cluster',
            };

            let blockType = blockTypes[adjacentBlockId];
            if (blockType && randomValue < chanceOfGrowth) {
                let command = `setblock ${offsetPos.getX()} ${offsetPos.getY()} ${offsetPos.getZ()} minecraft:${blockType}[facing=${face}]`;
                tick.server.runCommandSilent(command);
            }
        });
    };

    growAmethystBuds();
};

StartupEvents.registry("block", (event) => {
    event.create('rose_quartz_budding_block')
        .material('amethyst')
        .soundType('amethyst')
        .hardness(0.5)
        .displayName('Rose Quartz Budding Block')
        .randomTick(tick => global.amethystblock(tick));
})
