import type { Dictionary } from './types'
import en from './en'

export async function getDictionary(): Promise<Dictionary> {
  return en
}
