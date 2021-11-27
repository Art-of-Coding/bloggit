import { existsSync } from 'fs'
import mkdirp from 'mkdirp'
import { initializeGit, writeMeta } from '../lib/execute.js'

/**
 * Initialize a new `BlogGit` blog.
 */
export default async function () {
  if (existsSync('./meta.json')) {
    console.log('meta.json already exists in current working directory. Aborting')
    return
  }

  await initializeGit()
  await writeMeta()

  // Create the post directory
  mkdirp('./posts')

  console.log('Blog initialized')
}