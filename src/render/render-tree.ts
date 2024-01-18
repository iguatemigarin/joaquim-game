import { Renderable } from './renderable'
import { ctx } from './canvas'

class RenderTree {
  constructor(
    public id: string,
    public children: Renderable[] = [],
  ) {}

  render() {
    const max = this.children.length
    for (let i = 0; i < max; i = i + 1) {
      ctx.translate(0, 0)
      ctx.fillStyle = 'black'
      this.children[i].loop()
      this.children[i].render()
    }
  }
}
export const renderTree = new RenderTree('Root renderTree')
