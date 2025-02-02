import { OutputChannel, Uri, workspace } from "vscode";

/**
 * Determines if the current workspace contains
 * @returns true if the workspace is not mounted on a regular filesystem.
 */
export function isVirtualWorkspace(): boolean {
  return workspace.workspaceFolders && workspace.workspaceFolders.every((f) => f.uri.scheme !== "file");
}

/**
 * Determines the correct document URI scheme depending on the current type of workspace.
 * @returns Current workspace scheme
 */
export function getWorkspaceScheme() {
  return isVirtualWorkspace() ? "vscode-vfs" : "file";
}

/**
 * Returns a copy of the URI with the new URI scheme instead of the original.
 * @param uri The URI to be modified.
 * @param targetScheme The new scheme.
 * @returns A new copy of the URI with the new scheme.
 */
export function replaceUriScheme(uri: Uri, targetScheme: string): Uri {
  return Uri.parse(uri.toString().replace(uri.scheme, targetScheme));
}

/** Just for debugging */
export function debugPrintCommandArgs(command: string, args: any[], outputChannel: OutputChannel) {
  outputChannel.appendLine(`Command ${command} args:`);
  for (let index = 0; index < args.length; index++) {
    const element = args[index];
    outputChannel.appendLine(` [${index}] ${JSON.stringify(element)}`);
  }
  outputChannel.appendLine(`---\n`);
}
