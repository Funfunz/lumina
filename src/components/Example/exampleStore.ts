import { atom } from 'nanostores'

export const data = atom<{[key:string]: {text: string}}>({})

export function setText(id: string, text: string) {
  data.set({
    ...data.get(),
    [id]: { text }
  });
}

export function getText(id: string) {
  return data.get()[id].text
}