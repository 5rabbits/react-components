export const padLeft = (string, padCharacter, padLength) =>
  Array(padLength)
    .join(padCharacter)
    .substring(0, padLength - string.toString().length) + string

export const parseString = value => {
  const matches = value
    .toString()
    .trim()
    .match(/^((\d*)h)?\s*((\d*)m)?$/i)

  if (!matches || !matches[0].trim()) {
    return false
  }

  return {
    hours: parseInt(matches[2] || 0, 10),
    minutes: parseInt(matches[4] || 0, 10),
  }
}

export const minutesToString = value => {
  if (value == null) {
    return ''
  }

  const hours = Math.floor(value / 60)
  const minutes = value % 60

  return `${padLeft(hours, '0', 2)}h ${padLeft(minutes, '0', 2)}m`
}

export const isValidString = value => !value || !!parseString(value)

export const stringToMinutes = value => {
  const parsed = parseString(value)

  if (parsed === false) {
    return false
  }

  return parsed.hours * 60 + parsed.minutes
}
