import * as mc from 'mojang-minecraft'
import * as ui from 'mojang-minecraft-ui'

mc.world.events.beforeItemUse.subscribe(t => {
	if (t.item.id == 'minecraft:compass') {
		var player = t.source
		var date = new Date
		var H = date.getHours()
		var M = String(date.getMinutes()).padStart(2, '0')
		var S = String(date.getSeconds()).padStart(2, '0')
		if (H + 8 < 24) {
			H = String(H + 8).padStart(2, '0')
		}
		else {
			H = String(H - 16).padStart(2, '0')
		}
		var time = H + ':' + M + ':' + S
		function menu() {
			var menu = new ui.ActionFormData()
			menu = menu.title('菜单')
			menu = menu.body('测试中')
			menu = menu.button('1')
			menu = menu.button('2')
			menu.show(player)
		}
		menu()
	}
})