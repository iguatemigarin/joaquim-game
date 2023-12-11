import { resetCanvas } from './canvas'
import { renderTree } from './render-tree'

export const loop = () => {
  resetCanvas()
  renderTree.render()

  requestAnimationFrame(loop)
}
