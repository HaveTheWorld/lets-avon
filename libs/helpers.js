export function sleep(ms) {
	return new Promise(resolve => {
		setTimeout(resolve, ms)
	})
}

export function getValueSafely(obj, path) {
	path = path.split('.')
	if (!path[0]) { return obj }
	const field = path.shift()
	return obj[field]
		? obj[field].constructor.name === 'Object'
			? getValueSafely(obj[field], path.join('.'))
			: obj[field]
		: false
}

export function reduceObjectValues(array, object) {
	return Object.entries(object).reduce((acc, [key, value]) => {
		if (array.includes(key)) { acc[key] = value }
		return acc
	}, {})
}