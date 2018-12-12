// Version 1: @splish-me/editor
import * as t from 'io-ts'

/* Represents a UUID Version 4 */
const Uuid = t.string
type Uuid = t.TypeOf<typeof Uuid>

/* Represents a Semantic Versioning version number */
const Semver = t.string
type Semver = t.TypeOf<typeof Semver>

/* Represents a plugin */
const Plugin = t.interface({
  plugin: t.interface({
    name: t.string,
    version: Semver
  }),
  state: t.any
})
type Plugin = t.TypeOf<typeof Plugin>

/* Represents a single cell of a row */
const Cell = t.interface({
  id: Uuid,
  size: t.number,
  content: Plugin
})
type Cell = t.TypeOf<typeof Cell>


/* Represents a single row in a 12 column grid */
const Row = t.interface({
    id: Uuid,
    cells: t.array(Cell)
  })
type Row = t.TypeOf<typeof Row>

/* Represents a (serialized) editor document */
export const Document = Row
export type Document = Row
