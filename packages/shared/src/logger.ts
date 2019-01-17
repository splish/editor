export function warn(assert: boolean, message: string): void {
  if (assert) {
    return
  }

  // Check if `console` is available, see https://caniuse.com/#feat=console-basic
  if (typeof console !== 'undefined') {
    console.error(`Warning: ${message}`)
  }
}
