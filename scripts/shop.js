import * as mc from "mojang-minecraft"
import * as ui from "mojang-minecraft-ui"
import { itemID } from "./ID"

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
                selllist(player)
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

function selllist(player) {
    var selllist = new ui.ActionFormData
    selllist = selllist.title('出售')
    selllist = selllist.button('钻石 8积分/个')
    selllist = selllist.button('自建交易')
    selllist.show(player).then((arg) => {
        switch (arg.selection) {
            case 0:
                
                break
            case 1:
                sell(player)
                break
        }
    })
}

function sell(player) {
    var inv = player.getComponent('minecraft:inventory').container
    var invlist = []
    var selllist = []
    for (let i = 0; i < 36; i++) {
        if (inv.getItem(i) !== undefined) {
            invlist.push(inv.getItem(i))
            selllist.push(itemID(inv.getItem(i).id, inv.getItem(i).data))
        }
    }
    if (selllist.length === 0) {
        selllist.push(itemID())
    }
    var sell = new ui.ModalFormData
    sell = sell.title('出售')
    sell = sell.dropdown('出售物品', selllist)
    sell.show(player)
}

function buy(player) {
    var buy = new ui.ModalFormData
    buy = buy.title('购买')
    buy = buy.textField('购买数量', '请填写正整数')
    buy.show(player).then((arg) => {
        var b = Number(arg.formValues[0])
        if (b % 1 !== 0 || b <= 0 || isNaN(b)) {
            buyerr1(player)
        } else if (b * 10 > mc.world.scoreboard.getObjective('积分').getScore(player.scoreboard)) {
            buyerr2(player)
        } else {
            mc.world.getDimension('overworld').runCommand(`scoreboard players remove ${player.name} 积分 ${b * 10}`)
            mc.world.getDimension('overworld').runCommand(`give ${player.name} diamond ${b}`)
        }
    })
}

function buyerr1(player) {
    var buyerr1 = new ui.MessageFormData
    buyerr1 = buyerr1.title('警告')
    buyerr1 = buyerr1.body('请填写正整数')
    buyerr1 = buyerr1.button1('返回')
    buyerr1 = buyerr1.button2('关闭')
    buyerr1.show(player).then((arg) => {
        switch (arg.selection) {
            case 1:
                buy(player)
                break
        }
    })
}

function buyerr2(player) {
    var buyerr2 = new ui.MessageFormData
    buyerr2 = buyerr2.title('警告')
    buyerr2 = buyerr2.body('余额不足')
    buyerr2 = buyerr2.button1('返回')
    buyerr2 = buyerr2.button2('关闭')
    buyerr2.show(player).then((arg) => {
        switch (arg.selection) {
            case 1:
                buy(player)
                break
        }
    })
}