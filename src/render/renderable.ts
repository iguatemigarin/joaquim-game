import { WorldEntity } from '../physics/world-entity.ts'
import { Stage } from '../stage.ts'

export interface Renderable {
  id: string
  physics?: WorldEntity
  render(stage?: Stage): void
}
