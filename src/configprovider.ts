import * as vscode from "vscode";

import {
    getMesonTargets
} from "./meson/introspection"

export class DebugConfigurationProvider implements vscode.DebugConfigurationProvider {
    private path: string;

    constructor(path: string) {
        this.path = path
    }

    async provideDebugConfigurations(folder: vscode.WorkspaceFolder | undefined, token?: vscode.CancellationToken): Promise<vscode.DebugConfiguration[]> {
        let targets = await getMesonTargets(this.path);

        let executables = targets.filter(target => target.type == "executable");

        return executables.map(target => {return {
            type: 'cppdbg',
            name: target.name,
            request: "launch",
            cwd: this.path,
            program: target.filename[0]
            //preLaunchTask: 
        }; });
    }

    resolveDebugConfiguration(folder: vscode.WorkspaceFolder | undefined, debugConfiguration: vscode.DebugConfiguration, token?: vscode.CancellationToken): vscode.ProviderResult<vscode.DebugConfiguration> {
        return debugConfiguration
    }

    resolveDebugConfigurationWithSubstitutedVariables(folder: vscode.WorkspaceFolder, debugConfiguration: vscode.DebugConfiguration, token?: vscode.CancellationToken): vscode.ProviderResult<vscode.DebugConfiguration> {
        return debugConfiguration
    }

}