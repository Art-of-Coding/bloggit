# BlogGit

`BlogGit` is a headless blog which uses `Git`.

The idea is to have a public GitHub repository which serves as the blog store.

## Usage

Requirements:

- Node.js 16 or higher
- Git 2 or higher

### Initialize a new blog

```
npx bloggit init
```

### Create a new post

```
npx bloggit init:post
```

### Generate a list of posts

Generates a list of posts in markdown format.

```
npx bloggit generate
```

## To do

These are a list of features which will need to be added. Pull requests are
welcome!

- [ ] Post draft status
- [ ] Publish and unpublish posts
- [ ] Publish (i.e. commit) through the CLI
- [ ] List and modify post metadata

Misc:

- [ ] Browser client (support GitHub)
