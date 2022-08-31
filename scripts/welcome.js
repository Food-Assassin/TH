import * as mc from "mojang-minecraft"

mc.world.events.beforeChat.subscribe(z => {
    if (z.message = 'test') {
        
    }
})

mc.world.events.playerJoin.subscribe(p => {
    p.player.runCommandAsync('say 欢迎回来！')
})