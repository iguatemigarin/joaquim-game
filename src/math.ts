export class Vector {
  constructor(
    public x: number = 0,
    public y: number = 0,
  ) {}
  add(vector: Vector) {
    this.x = this.x + vector.x
    this.y = this.y + vector.y
  }
}
