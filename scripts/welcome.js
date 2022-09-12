import * as mc from "mojang-minecraft"
import * as ui from 'mojang-minecraft-ui'

var player
var pn = Array.from(mc.world.getPlayers()).length
function welcome() {
    var welcome = new ui.MessageFormData
    welcome = welcome.title('洛卷卷')
    welcome = welcome.body(`${player.name}，欢迎回来！`)
    welcome = welcome.button1('关闭')
    welcome = welcome.button2('关闭')
    welcome = welcome.show(player).then((arg) => {
        if (arg.selection > -1) {
            pn = Array.from(mc.world.getPlayers()).length
        }
    })
}

mc.world.events.playerJoin.subscribe(p => {
    player = p.player
})

mc.world.events.tick.subscribe(t => {
    if (t.currentTick % 20 !== 0) return
    if (pn < Array.from(mc.world.getPlayers()).length) {
        welcome()
    } else {
        pn = Array.from(mc.world.getPlayers()).length
    }
})
