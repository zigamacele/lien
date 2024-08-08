import { workspace } from 'vscode'
import type { LienState } from './types/lien'
import { CONFIG_USER_LINKS, CONFIG_WORKSPACE_LINKS, EXTENSION_NAME } from './constants/config'
import { renderLien } from '.'

export const getWorkspaceConfiguration = () => workspace.getConfiguration(EXTENSION_NAME)

export function getLinks() {
  const workspaceConfiguration = getWorkspaceConfiguration()

  const globalLinks = workspaceConfiguration.get<LienState[]>(CONFIG_USER_LINKS, [])
  const workspaceLinks = workspaceConfiguration.get<LienState[]>(CONFIG_WORKSPACE_LINKS, [])
  return [...globalLinks, ...workspaceLinks]
}

workspace.onDidChangeConfiguration((event) => {
  if (event.affectsConfiguration(`${EXTENSION_NAME}.${CONFIG_USER_LINKS}`) || event.affectsConfiguration(`${EXTENSION_NAME}.${CONFIG_WORKSPACE_LINKS}`))
    renderLien()
})
