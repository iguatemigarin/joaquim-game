import { resetCanvas } from './canvas'
import { renderTree } from './render-tree'

export const loop = (lastUpdate: number) => {
  const timePassed = Date.now() - lastUpdate

  // don't render if less than 1ms has passed, it breaks the calcs
  if (timePassed < 1) {
    requestAnimationFrame(() => loop(lastUpdate))
    return
  }
  resetCanvas()
  renderTree.render(timePassed)

  requestAnimationFrame(() => loop(Date.now()))
}
