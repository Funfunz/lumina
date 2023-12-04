const loadedComponents: {
  [type: string]: (_props: any) => any
} = {}

export function getComponent(componentType: string) {
  return loadedComponents[componentType]
}

export function loadComponent(type: string, component) {
  return loadedComponents[type] = component
}