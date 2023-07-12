import * as vscode from 'vscode'
import * as fs from 'fs'
import * as path from 'path'
import { componentTemplate, indexTemplate, styleTemplate } from './templates'

function pascalToKebab(str: string) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    'component-generator-for-dt.generate',
    async (uri) => {
      const fp = uri.fsPath
      const componentName = await vscode.window.showInputBox({
        placeHolder: '컴포넌트 이름을 입력해주세요.',
        validateInput: (value: string) => {
          if (!value) {
            return '컴포넌트 이름을 입력해주세요.'
          }
          return undefined
        }
      })

      if (componentName) {
        const folderPath =
          vscode.workspace.workspaceFolders?.[0].uri.fsPath || ''
        const componentPath = path.join(fp, pascalToKebab(componentName))

        if (!fs.existsSync(componentPath)) {
          fs.mkdirSync(componentPath)

          const indexFilePath = path.join(componentPath, `${componentName}.tsx`)
          const indexPath = path.join(componentPath, 'index.ts')
          const styledPath = path.join(
            componentPath,
            `${componentName}.styled.tsx`
          )

          fs.writeFileSync(indexFilePath, componentTemplate(componentName))
          fs.writeFileSync(indexPath, indexTemplate(componentName))
          fs.writeFileSync(styledPath, styleTemplate(componentName))
        } else {
          vscode.window.showInformationMessage(
            `같은 이름의 컴포넌트가 폴더 내에 존재해요.`
          )
        }
      }
    }
  )

  context.subscriptions.push(disposable)
}

export function deactivate() {}
