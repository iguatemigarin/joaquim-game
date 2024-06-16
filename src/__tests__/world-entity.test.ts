import { WorldEntity, WorldEntityOptions } from '../physics/world-entity';
import { Vector } from '../math';

describe('WorldEntity', () => {
  let worldEntity: WorldEntity;
  let options: WorldEntityOptions;

  beforeEach(() => {
    options = {
      mass: 1,
      center: new Vector(0, 0),
      velocity: new Vector(1, 1),
      acceleration: new Vector(0.1, 0.1),
    };
    worldEntity = new WorldEntity('test', options);
  });

  it('should initialize with the correct properties', () => {
    expect(worldEntity.id).toBe('test-world-entity');
    expect(worldEntity.mass).toBe(1);
    expect(worldEntity.center).toEqual(new Vector(0, 0));
    expect(worldEntity.velocity).toEqual(new Vector(1, 1));
    expect(worldEntity.acceleration).toEqual(new Vector(0.1, 0.1));
  });

  it('should update velocity and center based on acceleration and time passed', () => {
    worldEntity.update(1);
    expect(worldEntity.velocity).toEqual(new Vector(1.1, 1.1));
    expect(worldEntity.center).toEqual(new Vector(1.1, 1.1));
  });

  it('should handle zero acceleration correctly', () => {
    worldEntity.acceleration = new Vector(0, 0);
    worldEntity.update(1);
    expect(worldEntity.velocity).toEqual(new Vector(1, 1));
    expect(worldEntity.center).toEqual(new Vector(1, 1));
  });

  it('should handle zero velocity correctly', () => {
    worldEntity.velocity = new Vector(0, 0);
    worldEntity.update(1);
    expect(worldEntity.velocity).toEqual(new Vector(0.1, 0.1));
    expect(worldEntity.center).toEqual(new Vector(0.1, 0.1));
  });
});
