import fs from 'node:fs'
import envPaths from 'env-paths'
import semver from 'semver'

function readdir(root) {
  try { return fs.readdirSync(root, { recursive: true }) }
  catch { return [] }
}

/**
 * Get cached electron versions from your local cache.
 * @return {string[]} Cached versions array, may be empty.
 */
export function cachedElectronVersions() {
  let root = envPaths('electron', { suffix: '' }).cache
  let files = readdir(root)

  let index = -1, end = -1, result = [''], k = -1, tag = false
  for (let p of files) if ((index = p.indexOf('electron-v')) >= 0) {
    index += 10
    end = p.indexOf('-', index)
    if (end < 0) continue

    // '-beta.1'
    for (k = end + 1, tag = false; k < p.length && p[k] !== '-'; k++) {
      if (p[k] === '.') tag = true
    }
    if (tag) end = k

    result.push(p.slice(index, end))
  }

  return result.slice(1)
}

/**
 * Find latest version from `versions` that satisfies `specifier`.
 * @param  {string}   specifier  Version range, e.g. `"^30"`.
 * @param  {string[]} versions   Candidates, get it from `cachedElectronVersions()`.
 * @return {string}              Found version or empty string which means not found.
 */
export function findLatestVersion(specifier = '*', versions) {
  let latest = ''
  for (let version of versions) if (semver.satisfies(version, specifier)) {
    if (!latest || semver.gte(version, latest)) latest = version
  }
  return latest
}
