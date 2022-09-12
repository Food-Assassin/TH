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