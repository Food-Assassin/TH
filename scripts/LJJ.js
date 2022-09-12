import * as mc from 'mojang-minecraft';
import * as net from 'mojang-net';
const 通讯端口 = 3000;
const host = 'http://localhost:'+通讯端口;

mc.world.events.chat.subscribe(event => {
	// console.log("8888")
	const { message, sender } = event;
	const request = new net.HttpRequest(`${host}/${(sender.name.replaceAll(' ','_'))}/${(encodeURI(message.replaceAll('/','／')))}`)
		.setMethod(net.HttpRequestMethod.GET);
        // console.log(`${host}/${sender.name.replaceAll(' ','_').toString('base64') }/${message.toString('base64') }`)
	net.http.request(request)
});

mc.world.events.tick.subscribe(evd => {
	if (evd.currentTick % 20 != 0) return;
	const request = new net.HttpRequest(`${host}`).setMethod(net.HttpRequestMethod.GET);
	net.http.request(request).then(res => {
		if (res.status == 402 || res.status == 3) {
			net.http.cancelAll('~')
		};
		const body = JSON.parse(res.body);
		body.r.forEach(element => {
			mc.world.getDimension('overworld').runCommand(`tellraw @a { "rawtext": [{ "text": "<${element[0]}>${element[1]}" }]}`)
		});
		// body.forEach(message => mc.world.getDimension('overworld').runCommand(`tellraw @a { "rawtext": [{ "text": "<${message.name}> (${message.user}) ${message.message}" }]}`));
 	});
});