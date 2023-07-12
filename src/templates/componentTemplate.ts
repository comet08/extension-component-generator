export function componentTemplate(componentName: string) {
  return `import * from './${componentName}.styled';
  
export default function ${componentName} {

}`
}
