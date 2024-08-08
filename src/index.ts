import type { Disposable } from 'vscode'
import type { LienState } from './types/lien'
import { getLinks } from './config'
import { disposeCommands, registerCommandForLien } from './helpers/commands'
import { addRepositoryStatusIcon } from './commands'

let registeredCommands: Disposable[] = []
let lienState: LienState[] = getLinks()

export function renderLien() {
  refreshState()
  disposeCommands(registeredCommands)
  registeredCommands = []

  if (!lienState.length)
    return

  registeredCommands = lienState.flatMap(registerCommandForLien)
}

export function activate() {
  addRepositoryStatusIcon()
  renderLien()
}

function refreshState() {
  lienState = getLinks()
}

export function deactivate() {
  disposeCommands(registeredCommands)
}
