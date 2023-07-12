export function componentTemplate(componentName: string) {
  return `import * as S from './${componentName}.styled';
  
export default function ${componentName}() {

}`
}
