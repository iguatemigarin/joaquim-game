import { Renderable } from './renderable'
import { ctx } from './canvas'

class RenderTree {
  constructor(
    public id: string,
    public children: Renderable[] = [],
  ) {}

  render(timePassed: number) {
    this.children.forEach((child) => {
      ctx.translate(0, 0)
      ctx.fillStyle = 'black'
      child.tick(timePassed)
    })
  }
}

export const renderTree = new RenderTree('Root renderTree')
