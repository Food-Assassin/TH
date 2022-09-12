import * as mc from 'mojang-minecraft'
import * as ui from 'mojang-minecraft-ui'
import { shop } from './shop'

var player
function menu() {
	var menu = new ui.ActionFormData
	menu = menu.title('菜单')
	menu = menu.button('自杀')
	menu = menu.button('市场')
	menu.show(player).then((arg) => {
		switch (arg.selection) {
			case 0:
				player.kill()
				break
			case 1:
				shop(player)
				break
		}
	})
}

mc.world.events.beforeItemUse.subscribe(t => {
	if (t.item.id == 'minecraft:compass') {
		player = t.source
		menu()
	}
})