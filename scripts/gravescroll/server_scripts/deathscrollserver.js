EntityEvents.death(event =>{
    const {entity,player,server} = event
    if (!player) return;
    const {x, y, z} = player
    let pData = player.persistentData
    pData.deathx = x.toFixed(0)
    pData.deathy = y.toFixed(0)
    pData.deathz = z.toFixed(0)
    pData.deathreset = 1
})