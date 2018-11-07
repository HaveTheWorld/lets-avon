export function sleep(ms) {
	return new Promise(resolve => {
		setTimeout(resolve, ms)
	})
}

export function formatDate(timestamp, withTime = false) {
	let date = new Date(timestamp)
		.toLocaleString('ru')
		.replace(/-/g, '.')
		.replace(',', '')
	if (!withTime) {
		date = date.split(' ')[0]
	}
	return date
}