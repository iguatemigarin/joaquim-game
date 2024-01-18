import { WorldEntity } from '../physics/world-entity.ts'
import { Stage } from '../stage.ts'

interface IRenderable {
  id: string
  physics?: WorldEntity
  render(stage?: Stage): void
  children?: Renderable[]
}

export abstract class Renderable implements IRenderable {
  constructor(
    public id: string,
    public physics?: WorldEntity,
    public children?: Renderable[],
  ) {}
  abstract render(stage?: Stage): void
  loop() {
    if (this.physics) {
      this.physics.update()
    }
    if (this.children) {
      this.children.forEach((child) => {
        child.loop()
      })
    }
  }
}
