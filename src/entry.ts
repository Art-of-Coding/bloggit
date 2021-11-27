import { Command } from 'commander'

const program = new Command

program
  .name('bloggit')
  .version('0.1.0')

program
  .command('init')
  .description('initialize a new blog')
  .action(async () => {
    await (await import('./commands/init.js')).default()
  })

program
  .command('init:post')
  .description('create a new post')
  .action(async () => {
    await (await import('./commands/init-post.js')).default()
  })

program.parse(process.argv)