import * as uuid from 'uuid'

export const createStateForPlugin = ({
  children,
  plugin,
  initialState,
  kind
}: // FIXME:
any) => {
  return {
    id: uuid.v4(),
    cells: [
      {
        id: uuid.v4(),
        [kind]: {
          plugin,
          state:
            initialState ||
            (plugin.createInitialState
              ? plugin.createInitialState()
              : undefined)
        },
        rows:
          children ||
          (plugin.createInitialChildren
            ? plugin.createInitialChildren().rows
            : undefined)
      }
    ]
  }
}

// FIXME:
export const createStateForContentPlugin = (props: any) =>
  createStateForPlugin({ ...props, kind: 'content' })
// FIXME:
export const createStateForLayoutPlugin = (props: any) =>
  createStateForPlugin({ ...props, kind: 'layout' })
