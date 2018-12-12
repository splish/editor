// Version 0: ory-editor >= 0.0.1 <= 0.5.0
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

/* Represents a single row in a 12 column grid */
interface Row {
  id: Uuid
  cells: Cell[]
  hasInlineChildren: boolean
}

/* Represents a single cell of a row */
type Cell =
  | C
  | C & {
      hasInlineNeighbour: Uuid
      inline: 'left' | 'right'
    }
type C = ContentCell | LayoutCell

interface LayoutCell {
  id: Uuid
  size: number
  layout: Plugin
  rows: Row[]
}

const Row: t.RecursiveType<t.Type<Row>, Row> = t.recursion<Row>('Row', () => {
  return t.interface({
    id: Uuid,
    cells: t.array(Cell),
    hasInlineChildren: t.boolean
  })
})

const ContentCell = t.interface({
  id: Uuid,
  size: t.number,
  content: Plugin
})
type ContentCell = t.TypeOf<typeof ContentCell>

const LayoutCell: t.RecursiveType<t.Type<LayoutCell>, LayoutCell> = t.recursion<
  LayoutCell
>('LayoutCell', () => {
  return t.interface({
    id: Uuid,
    size: t.number,
    layout: Plugin,
    rows: t.array(Row)
  })
})

const C = t.union([ContentCell, LayoutCell])
const Cell = t.union([
  C,
  t.intersection([
    C,
    t.interface({
      hasInlineNeighbour: Uuid,
      inline: t.union([t.literal('left'), t.literal('right')])
    })
  ])
])

/* Represents a (serialized) editor document */
export const Document = Row
export type Document = Row
