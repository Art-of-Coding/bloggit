import { spawn } from 'child_process'
import { writeFileSync } from 'fs'

export async function initializeGit() {
  return new Promise<void>(resolve => {
    const child = spawn('git', ['init', '-b', 'main'])
    process.stdin.pipe(child.stdin)
    child.stdout!.pipe(process.stdout)
    child.stderr!.pipe(process.stderr)
    child.stdout!.once('close', resolve)
  })
}

export async function writeMeta() {
  writeFileSync('./meta.json', JSON.stringify([]), 'utf-8')
}