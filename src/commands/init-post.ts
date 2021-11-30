import { readFileSync, writeFileSync } from 'fs'
import Inquirer from 'inquirer'
import slugify from 'slugify'

interface Options {
  editor: boolean,
}

interface Post {
  slug: string,
  title: string,
  description: string,
  author: {
    name: string,
    email: string,
  },
  tags: string[],
  published: string,
  content: string,
}

interface Answers {
  title: string,
  description: string,
  author: {
    name: string,
    email: string,
  },
  tags: string,
}

/**
 * Create a new blog post.
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

  const answers = await Inquirer.prompt<Answers>([
    {
      name: 'title',
      message: 'Title',
      suffix: ':',
    },
    {
      name: 'description',
      message: 'Description',
      suffix: ':',
    },
    {
      name: 'author.name',
      message: 'Author name',
      suffix: ':',
    },
    {
      name: 'author.email',
      message: 'Author email',
      suffix: ':',
    },
    {
      name: 'tags',
      message: 'Tags',
      suffix: ':',
    }
  ])

  const content = options.editor ? (await Inquirer.prompt<{ content: string}>({
    type: 'editor',
    name: 'content',
    message: 'Content',
    suffix: ':',
  })).content : undefined

  const slug = slugify(answers.title).toLowerCase()
  const post = {
    slug,
    title: answers.title,
    description: answers.description,
    author: answers.author,
    tags: answers.tags.split(',').map(tag => tag.trim()),
    published: new Date().toISOString(),
    content: `./posts/${slug}.md`
  }

  meta.unshift(post)

  // Write the post
  writeFileSync(post.content, content ?? '_Write your post here_.', 'utf-8')

  // Update the metadata file
  writeFileSync('./meta.json', JSON.stringify(meta, null, 2), 'utf-8')
}