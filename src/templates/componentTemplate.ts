export function componentTemplate(componentName: string) {
  return `import * as S from './${componentName}.styled';
  
interface ${componentName}Props {

}

export default function ${componentName}({}: ${componentName}Props) {

}`
}
