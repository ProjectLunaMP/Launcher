import { app } from 'electron'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

interface BuildConfig {
  VersionID: string
  buildPath: string
  buildID: string
  played: string
}

export async function handleBuildConfig(
  buildID: string,
  VersionID: string,
  buildPath: string
): Promise<string> {
  const lunaFolderPath = join(app.getPath('userData'), 'Luna')
  const FilePath = join(lunaFolderPath, 'builds.json')

  if (!existsSync(lunaFolderPath)) {
    mkdirSync(lunaFolderPath, { recursive: true })
  }

  let jsonArray: BuildConfig[]

  if (existsSync(FilePath)) {
    const jsonData = await readFileSync(FilePath, 'utf-8')
    jsonArray = JSON.parse(jsonData) as BuildConfig[]
  } else {
    jsonArray = []
    await writeFileSync(FilePath, JSON.stringify(jsonArray))
    console.log('Created File Path -> ' + FilePath)
  }

  const existingEntry = jsonArray.find((item) => item.buildID === buildID)

  if (existingEntry) {
    console.log('BUILD ID IS ' + existingEntry.buildID)
    console.log('BUILD NAME IS ' + existingEntry.VersionID)

    existingEntry.buildPath = buildPath
    existingEntry.played = new Date().toISOString()

    await writeFileSync(FilePath, JSON.stringify(jsonArray, null, 2))
    return 'already~build'
  } else {
    console.log('BUILD ID IS ' + buildID)

    const buildConfig: BuildConfig = {
      VersionID,
      buildPath,
      buildID,
      played: new Date().toISOString()
    }

    jsonArray.push(buildConfig)

    await writeFileSync(FilePath, JSON.stringify(jsonArray, null, 2))
    return 'added'
  }
}
