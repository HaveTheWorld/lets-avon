export const toNumber = value => /^\d+$/.test(value) ? Number(value) : value
export const toLower = value => value ? value.toLowerCase() : value
export const toUpper = value => value ? value.toUpperCase() : value
export const toCapitalFirst = value => value ? value.replace(/^[a-zа-я]/, l => l.toUpperCase()) : value