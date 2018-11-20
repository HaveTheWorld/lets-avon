export const required = value => {
	const message = 'Обязательное поле.'
	return !value
		? message
		: value.constructor.name === 'FileList' && !value.length
			? message
			: undefined
}

const format = (regexp, message) => value => regexp.test(value) ? undefined : `Формат: ${message}`
export const digits1to2 = format(/^\d{1,2}$/, 'Однозначное или двухзначное число.')
export const digits4 = format(/^\d{4}$/, 'Четырёхзначное число.')
export const latinNoSpace = format(/^[A-Za-z]+$/, 'Только латинские буквы без пробелов.')
export const alpanumeric = format(/^[A-Za-zА-Яа-я0-9 \-]+$/, 'Только буквы и цифры.')
export const latinAlpanumeric = format(/^[A-Za-z0-9 \-]+$/, 'Только латинские буквы и цифры.')

export const minLength = min => value => value && value.length >= min ? undefined : `Не менее ${min} символов.`
export const maxLength = max => value => value && value.length <= max ? undefined : `Не более ${max} символов.`

export const confirmPassword = (value, allValues) => {
	return allValues.password && allValues.password !== value
		? 'Пароли не совпадают'
		: undefined
}