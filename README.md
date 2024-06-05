# @hyrious/install-electron

Requires Node.js &ge; 20.1.0 to use `fs.readdir({ recursive: true })`.

## Usage

### Install electron from the cache, or fallback to the latest

```bash
npx @hyrious/install-electron
```

### Install electron within a version range, prefer from cache

```bash
npx @hyrious/install-electron ^30
```

> [!NOTE]
> If the range is a tag, like `latest`, `30-x-y`.
> They are pointing to some specific version, which often changes and this package can't help.
> You should not use them to install packages. However, ranges like `30.x` are fine.

### Options

```console
> npx @hyrious/install-electron --dry-run
30.0.9, not cached

> npx @hyrious/install-electron --dry-run --json
{ "version": "30.0.9", "cached": false }
```

## How It Works

`@electron/get` downloads electron to [a known place](https://github.com/electron/get#how-it-works).
`@hyrious/install-electron` examines this place to find a proper version that you have cached.

## License

MIT @ [hyrious](https://github.com/hyrious)
