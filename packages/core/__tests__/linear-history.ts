import { LinearHistory } from '../src/linear-history'

describe('Linear History', () => {
  test('1 undo', () => {
    const history = new LinearHistory(0)

    expect(history.undo()).toEqual(null)
  })

  test('1 commit', () => {
    const history = new LinearHistory(0)
    history.commit(1)
  })

  test('1 commit, 1 undo', () => {
    const history = new LinearHistory(0)
    history.commit(1)
    expect(history.undo()).toEqual(0)
  })

  test('2 commits, 1 undo', () => {
    const history = new LinearHistory(0)
    history.commit(1)
    history.commit(2)
    expect(history.undo()).toEqual(1)
  })

  test('2 commits, 2 undos', () => {
    const history = new LinearHistory(0)
    history.commit(1)
    history.commit(2)
    history.undo()
    expect(history.undo()).toEqual(0)
  })

  test('2 commits, 1 undo, 1 commit, 1 undo', () => {
    const history = new LinearHistory(0)
    history.commit(1)
    history.commit(2)
    history.undo()
    history.commit(3)
    expect(history.undo()).toEqual(1)
  })

  test('1 redo', () => {
    const history = new LinearHistory(0)

    expect(history.redo()).toEqual(null)
  })

  test('1 commit, 1 undo, 1 redo', () => {
    const history = new LinearHistory(0)
    history.commit(1)
    history.undo()
    expect(history.redo()).toEqual(1)
  })

  test('2 commits, 2 undos, 1 redo', () => {
    const history = new LinearHistory(0)
    history.commit(1)
    history.commit(2)
    history.undo()
    history.undo()
    expect(history.redo()).toEqual(1)
  })

  test('2 commits, 2 undos, 2 redos', () => {
    const history = new LinearHistory(0)
    history.commit(1)
    history.commit(2)
    history.undo()
    history.undo()
    history.redo()
    expect(history.redo()).toEqual(2)
  })

  test('2 commits, 1 undo, 1 commit, 1 redo', () => {
    const history = new LinearHistory(0)
    history.commit(1)
    history.commit(2)
    history.undo()
    history.commit(3)
    expect(history.redo()).toEqual(null)
  })

  test('1 commit, 2 undos, 1 redo', () => {
    const history = new LinearHistory(0)
    history.commit(1)
    history.undo()
    history.undo()
    expect(history.redo()).toEqual(1)
  })
})
