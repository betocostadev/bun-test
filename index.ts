console.log('Hello via Bun!')

const server = Bun.serve({
  port: 3000,
  fetch: async (req, res) => {
    const url = new URL(req.url)

    if (url.pathname === '/') {
      return new Response(
        `<pre>
          <h3>Bun Development</h3>
          <p>Check the <a href="/greet">greet.txt file</a>.</p>
          <p>Check the <a href="/posts">posts</a>.</p>
          <p>Throw <a href="/test">an error</a>.</p>
          <p>Nowhere <a href="/nowhere">or 404</a>.</p>
      </pre>`,
        {
          headers: {
            'content-type': 'text/html',
          },
          status: 200,
        }
      )
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

    return new Response('404 - Page not found', { status: 404 })
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
