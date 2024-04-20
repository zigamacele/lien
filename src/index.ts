import type { Disposable, ExtensionContext } from 'vscode'
import { StatusBarAlignment, Uri, commands, env, window } from 'vscode'

let registeredCommands: Disposable[] = []

export function activate(context: ExtensionContext) {
  interface LienState {
    name: string
    icon: string
    link: string
  }

  let lienState: LienState[] | undefined = context.workspaceState.get('lien')

  const disposeCommands = () => {
    registeredCommands.forEach(command => command.dispose())
    registeredCommands = []
  }

  const registerCommandForLien = ({ name, icon, link }: LienState): Disposable[] => {
    const command = commands.registerCommand(`lien.${name}`, () => {
      env.openExternal(Uri.parse(link))
    })

    const statusBar = window.createStatusBarItem(StatusBarAlignment.Left, 0)
    statusBar.command = `lien.${name}`
    statusBar.text = `$(${icon}) ${name}`
    statusBar.tooltip = name
    statusBar.show()

    return [command, statusBar]
  }

  const addRepositoryConnection = () => {
    const statusBar = window.createStatusBarItem(StatusBarAlignment.Left, 0)
    statusBar.command = 'openInGitHub.openProject'
    statusBar.text = '$(git-pull-request) Repo'
    statusBar.tooltip = 'Open projects repository'
    statusBar.show()
  }

  const refreshState = () => {
    lienState = context.workspaceState.get('lien')
  }

  const clearState = () => {
    context.workspaceState.update('lien', [])
  }

  const renderLien = () => {
    refreshState()
    disposeCommands()

    if (!lienState)
      return

    registeredCommands = lienState.flatMap(registerCommandForLien)
  }

  const showInformationMessage = (message: string) => {
    window.showInformationMessage(message)
  }

  commands.registerCommand('lien.clear', () => {
    clearState()
    renderLien()
    showInformationMessage('Lien cleared')
  })

  commands.registerCommand('lien.addConnection', async () => {
    const userInput = await window.showInputBox({
      prompt: 'Enter in format: name,icon,link',
    })

    if (!userInput)
      return

    const strippedUserInput = userInput.replace(/\s/g, '')
    const [name, icon, link] = strippedUserInput.split(',')
    const newConnection = { name, icon, link }

    context.workspaceState.update('lien', [...lienState ?? [], newConnection])
    showInformationMessage(`Lien added: ${name}`)
    renderLien()
  })

  addRepositoryConnection()
  renderLien()
}

export function deactivate() {
  registeredCommands.forEach(command => command.dispose())
}
