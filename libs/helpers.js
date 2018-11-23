export async function handleMutationError(error, callback) {
	if (error.graphQLErrors) {
		const messages = error.graphQLErrors.map(({ message }) => message)
		for (let i = 0; i < messages.length; i++) {
			callback(messages[i])
			await sleep(100)
		}
	} else {
		callback(error.message)
	}
}

export function getCookie(name) {
	const matches = document.cookie.match(new RegExp(
		`(?:^|; )${name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')}=([^;]*)`
	))
	return matches ? decodeURIComponent(matches[1]) : undefined
}

export function setCookie(name, value, options = {}) {
	let expires = options.expires

	if (typeof expires == "number" && expires) {
		const date = new Date()
		date.setTime(date.getTime() + expires * 1000)
		expires = options.expires = date
	}
	if (expires && expires.toUTCString) {
		options.expires = expires.toUTCString()
	}
	if (!options.path) {
		options.path = '/'
	}

	value = encodeURIComponent(value);

	let updatedCookie = `${name}=${value}`

	for (let propName in options) {
		updatedCookie += `; ${propName}`
		let propValue = options[propName]
		if (propValue !== true) {
			updatedCookie += `=${propValue}`
		}
	}

	document.cookie = updatedCookie
}

export function deleteCookie(name) {
	setCookie(name, '', { expires: -1 })
}

export function getNestedValue(nestedObj, path) {
	return path.split('.').reduce((obj, key) => {
		return (obj && obj[key] !== 'undefined') ? obj[key] : undefined
	}, nestedObj)
}

export function reduceObjectValues(array, object) {
	return Object.entries(object).reduce((acc, [key, value]) => {
		if (array.includes(key)) { acc[key] = value }
		return acc
	}, {})
}

export function sleep(ms) {
	return new Promise(resolve => {
		setTimeout(resolve, ms)
	})
}