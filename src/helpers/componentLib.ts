const loadedComponents: {
  [type: string]: {
    Component: (_props: any) => any
    framework: string
  }
} = {}

export function getComponent(componentType: string) {
  return loadedComponents[componentType]
}

export function loadComponent(type: string, Component, framework: 'react' | 'astro' = 'astro') {
  return loadedComponents[type] = {Component, framework}
}