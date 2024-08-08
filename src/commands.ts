import { StatusBarAlignment, window } from 'vscode'

export function addRepositoryStatusIcon() {
  const statusBar = window.createStatusBarItem(StatusBarAlignment.Left, 0)
  statusBar.command = 'openInGitHub.openProject'
  statusBar.text = '$(github)'
  statusBar.tooltip = 'Open project repository'
  statusBar.show()
}
