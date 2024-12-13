//import axios from 'axios';
import { readFileSync } from 'fs'
import { join } from 'path'

const getAppVersion = (): string => {
  const packageJsonPath = join(__dirname, '../package.json')
  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'))
  return packageJson.version
}

export async function update(): Promise<void> {
  console.log('UPDATE' + getAppVersion())
}
