export class Vector {
  constructor(
    public x: number = 0,
    public y: number = 0,
  ) {}
  add(vector: Vector) {
    return new Vector(this.x + vector.x, this.y + vector.y)
  }
}
