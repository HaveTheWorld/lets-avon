export const required = value => {
	const message = 'Обязательное поле.'
	return !value
		? message
		: value.constructor.name === 'FileList' && !value.length
			? message
			: undefined
}
export const format = (regexp, message) => value => regexp.test(value) ? undefined : `Формат: ${message}`
export const digits1to2 = format(/^\d{1,2}$/, 'Однозначное или двухзначное число')
export const digits4 = format(/^\d{4}$/, 'Четырёхзначное число')
export const latinNoSpace = format(/^[A-Za-z]+$/, 'Только латинские буквы без пробелов')
export const alpanumeric = format(/^[A-Za-zА-Яа-я0-9 \-]+$/, 'Только буквы и цифры')