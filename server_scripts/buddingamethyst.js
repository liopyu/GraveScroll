global.amethystblock = tick => {
    const { block, level } = tick;
    const pos = block.getPos();
    const Direction = java('net.minecraft.core.Direction');

    const growAmethystBuds = () => {
        Direction.values().forEach(face => {
            const offsetPos = pos.relative(face);
            const adjacentBlockId = level.getBlock(offsetPos).id;
            const chanceOfGrowth = 0.1;
            const randomValue = Math.random();

            const blockTypes = {
                'minecraft:air': 'small_amethyst_bud',
                'minecraft:small_amethyst_bud': 'medium_amethyst_bud',
                'minecraft:medium_amethyst_bud': 'large_amethyst_bud',
                'minecraft:large_amethyst_bud': 'amethyst_cluster',
            };

            const blockType = blockTypes[adjacentBlockId];
            if (blockType && randomValue < chanceOfGrowth) {
                const command = `setblock ${offsetPos.getX()} ${offsetPos.getY()} ${offsetPos.getZ()} minecraft:${blockType}[facing=${face}]`;
                tick.server.runCommandSilent(command);
            }
        });
    };

    growAmethystBuds();
};

onEvent('block.registry', event => {
    event.create('rose_quartz_budding_block')
        .material('amethyst')
        .hardness(0.5)
        .displayName('Rose Quartz Budding Block')
        .randomTick(tick => global.amethystblock(tick));
});
