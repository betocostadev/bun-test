console.log('Hello via Bun!')

const server = Bun.serve({
  port: 3000,
  fetch: async (req, res) => {
    const url = new URL(req.url)

    if (url.pathname === '/') {
      return new Response('Bun server is running!')
    }

    if (url.pathname === '/posts') {
      const posts = [
        { id: 1, title: 'Post 1' },
        { id: 2, title: 'Post 2' },
      ]
      return new Response(JSON.stringify(posts), {
        headers: { 'content-type': 'application/json' },
      })
    }

    if (url.pathname === '/test') {
      throw new Error('Test error')
    }

    if (url.pathname === '/greet') {
      return new Response(Bun.file('./greet.txt'))
    }

    return new Response('Not found', { status: 404 })
  },

  error(error) {
    console.error('Error:', error.message)

    return new Response(
      `<pre>${error}
    ${error.stack}
    <h3>Go back to <a href="/">home</a></h3>
    </pre>`,
      {
        headers: {
          'content-type': 'text/html',
        },
        status: 500,
      }
    )
  },
})

console.log(`Listening on http://localhost:${server.port} ...`)
