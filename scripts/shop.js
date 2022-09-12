import * as mc from "mojang-minecraft"
import * as ui from "mojang-minecraft-ui"

export function shop(player) {
    var shop = new ui.ActionFormData
    shop = shop.title('市场')
    shop = shop.button('购买')
    shop = shop.button('出售')
    shop.show(player).then((arg) => {
        switch (arg.selection) {
            case 0:
                buylist(player)
                break
            case 1:
                break
        }
    })
}

function buylist(player) {
    var buylist = new ui.ActionFormData
    buylist = buylist.title('购买')
    buylist = buylist.button('钻石 10积分/个')
    buylist.show(player).then((arg) => {
        switch (arg.selection) {
            case 0:
                buy(player)
                break
        }
    })
}

function buy(player) {
    var buy = new ui.ModalFormData
    buy = buy.title('购买')
    buy = buy.textField('数量', '请填写正整数')
    buy.show(player).then((arg) => {
        var b = Number(arg.formValues[0])
        if (b % 1 !== 0 || b <= 0 || isNaN(b)) {
            buy2(player)
        } else if (b * 10 > mc.world.scoreboard.getObjective('积分').getScore(player.scoreboard)) {
            buy3(player)
        } else {
            mc.world.getDimension('overworld').runCommand(`scoreboard players remove ${player.name} 积分 ${b * 10}`)
            mc.world.getDimension('overworld').runCommand(`give ${player.name} diamond ${b}`)
        }
    })
}

function buy2(player) {
    var buy2 = new ui.MessageFormData
    buy2 = buy2.title('警告')
    buy2 = buy2.body('请填写正整数')
    buy2 = buy2.button1('返回')
    buy2 = buy2.button2('关闭')
    buy2.show(player).then((arg) => {
        switch (arg.selection) {
            case 1:
                buy(player)
                break
        }
    })
}

function buy3(player) {
    var buy3 = new ui.MessageFormData
    buy3 = buy3.title('警告')
    buy3 = buy3.body('余额不足')
    buy3 = buy3.button1('返回')
    buy3 = buy3.button2('关闭')
    buy3.show(player).then((arg) => {
        switch (arg.selection) {
            case 1:
                buy(player)
                break
        }
    })
}