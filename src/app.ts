import { canvas } from './render/canvas'
import { FPS } from './debug/fps'
import { loop } from './render/loop'
import { Stage } from './stage'
import { RenderTree } from './render/render-tree'

const stage = new Stage()

const fps = new FPS('fps')

export function boot() {
  const renderTree = new RenderTree('root')
  document.body.appendChild(canvas)
  renderTree.children.push(stage)
  renderTree.children.push(fps)
  loop(Date.now(), renderTree)
}
