// Next version
import * as t from 'io-ts'

/* Represents a UUID Version 4 */
const Uuid = t.string
type Uuid = t.TypeOf<typeof Uuid>

/* Represents a Semantic Versioning version number */
const Semver = t.string
type Semver = t.TypeOf<typeof Semver>

/* Represents a single cell */
const Cell = t.interface({
  id: Uuid,
  plugin: t.interface({
    name: t.string,
    version: Semver
  }),
  state: t.any
})
type Cell = t.TypeOf<typeof Cell>

/* Represents a (serialized) editor document */
export const Document = Cell
export type Document = Cell
