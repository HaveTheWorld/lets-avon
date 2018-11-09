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

export function reduceObject(array, object) {
	return Object.entries(object).reduce((acc, [key, value]) => {
		if (array.includes(key)) { acc[key] = value }
		return acc
	}, {})
}