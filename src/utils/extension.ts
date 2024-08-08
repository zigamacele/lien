import { window } from 'vscode'

export function showInformationMessage(message: string) {
  window.showInformationMessage(message)
}
