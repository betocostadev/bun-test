# Bun Test

Simple Bun application for testing purposes

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.0.29. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

### Endpoints

- **/** Hello message
- **/posts** Stringfied posts array
- **/test** Error throwing
- **/greet** Reading _greet.txt_ file

---

## Docker Container

This application can be run in a docker container. Run:

```
docker run -d -p 3000:3000 bun-test
```
