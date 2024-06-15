import { Vector } from '../math';

describe('Vector', () => {
  it('should initialize with default values', () => {
    const vector = new Vector();
    expect(vector.x).toBe(0);
    expect(vector.y).toBe(0);
  });

  it('should add another vector correctly', () => {
    const vector1 = new Vector(1, 2);
    const vector2 = new Vector(3, 4);
    vector1.add(vector2);
    expect(vector1.x).toBe(4);
    expect(vector1.y).toBe(6);
  });

  it('should multiply by a scalar correctly', () => {
    const vector = new Vector(2, 3);
    vector.multiply(2);
    expect(vector.x).toBe(4);
    expect(vector.y).toBe(6);
  });
});
