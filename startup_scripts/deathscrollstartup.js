StartupEvents.registry('item', e => {
    e.create('grave_scroll').displayName('Grave Scroll')
    .use((level, player, hand) => true)
    .useAnimation("bow")
    .useDuration((itemstack) => 64)
    .finishUsing((itemstack, level, entity) => {
        if (entity.player) global.gravescroll(entity)
        return itemstack;
    })
})

global.gravescroll = entity => {
    let pData = entity.persistentData
    let offHandItem = entity.getHeldItem('off_hand');
    let item = entity.getHeldItem('main_hand');
    if(pData.deathreset != 1) {return}
    pData.deathreset = 0
    if (item.id == 'kubejs:grave_scroll') {
        item.count--
        Utils.server.runCommand(`tp ${entity.username} ${pData.deathx} ${pData.deathy} ${pData.deathz}`)
    }else if (offHandItem.id == 'kubejs:grave_scroll') {
        offHandItem.count--
        Utils.server.runCommand(`tp ${entity.username} ${pData.deathx} ${pData.deathy} ${pData.deathz}`)
    }
}