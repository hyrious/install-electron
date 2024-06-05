#!/usr/bin/env node
import sade from 'sade'
import fs from 'node:fs'
import { installPackage } from '@antfu/install-pkg'
import * as mod from './index.js'

const pkg = JSON.parse(fs.readFileSync(new URL('./package.json', import.meta.url), 'utf8'))

sade(pkg.name)
  .version(pkg.version)
  .describe('Install electron from cache')
  .example('^30')
  .example('--dry-run --json')
  .example('list')

  .command('install [range]', 'Install electron', { default: true })
  .option('--json', 'Output in JSON format', false)
  .option('--dry-run', 'Do not really install electron', false)
  .action(function action(specifier = '*', options) {
    let versions = mod.cachedElectronVersions()
    let version = mod.findLatestVersion(specifier, versions)

    if (options['json']) {
      console.info(JSON.stringify({ version: version || specifier, cached: !!version }))
    } else {
      console.info(`${version || specifier}, ${version ? 'cached' : 'not cached'}`)
    }

    if (options['dry-run']) return;

    return installPackage(`electron@${version || specifier}`, { dev: true }).catch(console.error)
  })

  .command('list', 'List cached versions', { alias: 'ls' })
  .option('--json', 'Output in JSON format', false)
  .action(function action(options) {
    let versions = mod.cachedElectronVersions()
    if (options['json']) {
      console.info(JSON.stringify(versions))
    } else {
      console.info(versions.join('\n'))
    }
  })

  .parse(process.argv)

