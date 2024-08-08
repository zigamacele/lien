export function makeId(length: number) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length

  let counter = 0
  let result = ''

  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
    counter += 1
  }

  return result
}

export function getCommandText(name: string, icon: string) {
  if (!name && !icon)
    return '$(extensions-warning-message)'

  if (!icon)
    return name

  if (!name)
    return `$(${icon})`

  return `$(${icon}) ${name}`
}
