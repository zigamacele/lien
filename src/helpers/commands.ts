import type { Disposable } from 'vscode'
import { StatusBarAlignment, Uri, commands, env, window } from 'vscode'
import type { LienState } from '../types/lien'
import { getCommandText, makeId } from '../utils/commands'

export function registerCommandForLien({ name, icon, link, tooltip }: LienState): Disposable[] {
  const COMMAND_ID = makeId(15)
  const command = commands.registerCommand(COMMAND_ID, () => {
    env.openExternal(Uri.parse(link))
  })

  const statusBar = window.createStatusBarItem(StatusBarAlignment.Left, 0)
  statusBar.command = COMMAND_ID

  statusBar.text = getCommandText(name, icon)
  statusBar.tooltip = tooltip ?? name
  statusBar.show()

  return [command, statusBar]
}

export function disposeCommands(commands: Disposable[]) {
  commands.forEach(command => command.dispose())
}
