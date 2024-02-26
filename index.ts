console.log('Hello via Bun!')

const server = Bun.serve({
  port: 3000,
  fetch: async (req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`)

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

    return new Response('Not found', { status: 404 })
  },
})

console.log(`Listening on http://localhost:${server.port} ...`)
