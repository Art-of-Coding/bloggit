import type { Post } from './init-post'
import Inquirer from 'inquirer'
import { existsSync, readFileSync, writeFileSync } from 'fs'

type Options = {
  out?: string,
}

/**
 * Generate a table of contents from the meta file.
 */
export default async function (options: Options) {
  const meta = function () {
    try {
      return JSON.parse(readFileSync('./meta.json', 'utf-8')) as Post[]
    } catch (err) {}
  }()

  if (!meta) {
    console.log('meta.json not found. Aborting')
    return
  }

  
  const out = options.out ?? 'POSTS.md'
  if (existsSync(out) && !(await Inquirer.prompt<{ overwrite: boolean }>({
    type: 'confirm',
    name: 'overwrite',
    message: `${out} already exists. Overwrite?`
  })).overwrite) {
    console.log('Aborted')
    return
  }

  const content = '# Posts\n\n' + meta.map(post => {
    return `## [${post.title}](./posts/${post.slug}.md)\n\n${post.description}`
  }).join('\n')
  
  console.log(`Writing posts lists to ${out}...`)
  writeFileSync(out, content, 'utf-8')
  console.log('Posts list written')
}