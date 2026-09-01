'use strict'

/**
 * Runtime detection for the coc service process.
 *
 * The service process runs on Node.js or Bun. Both expose the Node.js API
 * surface coc.nvim relies on, but a few details differ: Bun reports a fixed
 * Node compatibility string as `process.version` regardless of the actual
 * version, so runtime-specific code must use the helpers here instead of
 * `process.version`.
 */

interface BunGlobal {
  readonly version: string
}

const bunGlobal = (globalThis as { Bun?: BunGlobal }).Bun

/**
 * `true` when the service process runs on the Bun runtime.
 */
export const isBun: boolean = bunGlobal !== undefined

/**
 * Human readable runtime name and version, e.g. `bun 1.3.14` or
 * `node v26.7.0`. Use for logs and user facing info instead of
 * `process.version`, which Bun reports as a fixed Node compat string.
 */
export const runtimeName: string = isBun ? `bun ${bunGlobal.version}` : `node ${process.version}`
