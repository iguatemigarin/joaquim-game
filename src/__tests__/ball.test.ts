import { Ball } from '../ball';
import { Stage } from '../stage';
import { WorldEntityOptions } from '../physics/world-entity';
import { Vector } from '../math';
import { Renderable } from '../render/renderable';

describe('Ball', () => {
  let stage: Stage;
  let ball: Ball;
  let physicsOptions: WorldEntityOptions;
  let ctx: CanvasRenderingContext2D;
  let mockParent: Renderable;

  beforeEach(() => {
    stage = new Stage();
    stage.origin.x = 0;
    stage.origin.y = 0;
    physicsOptions = {
      velocity: new Vector(0, 0),
      acceleration: new Vector(0, 0),
    };

    ctx = {
      translate: jest.fn(),
      beginPath: jest.fn(),
      arc: jest.fn(),
      fillStyle: '',
      fill: jest.fn(),
      setTransform: jest.fn(),
    } as unknown as CanvasRenderingContext2D;

    mockParent = {
      children: [],
      id: 'mock-parent',
      destroy: jest.fn(),
    } as unknown as Renderable;

    ball = new Ball(stage, 'test-ball', 5, 'blue', physicsOptions, ctx);
    ball.parent = mockParent;
    mockParent.children.push(ball);
  });

  it('should initialize with correct properties', () => {
    expect(ball.id).toBe('test-ball-ball');
    expect(ball.radius).toBe(5);
    expect(ball.color).toBe('blue');
    expect(ball.physics).toBeDefined();
    expect(ball.physics.center).toEqual(new Vector(0, 0));
  });

  it('should update physics and render on loop', () => {
    const renderSpy = jest.spyOn(ball, 'render');
    ball.loop(1);
    expect(renderSpy).toHaveBeenCalled();
  });

  it('should render the ball correctly', () => {
    ball.render();
    expect(ctx.translate).toHaveBeenCalledWith(stage.origin.x, stage.origin.y);
    expect(ctx.beginPath).toHaveBeenCalled();
    expect(ctx.arc).toHaveBeenCalledWith(
      ball.physics.center.x * stage.xUnit,
      ball.physics.center.y * stage.yUnit,
      ball.radius * stage.xUnit,
      0,
      2 * Math.PI
    );
    expect(ctx.fillStyle).toBe('blue');
    expect(ctx.fill).toHaveBeenCalled();
    expect(ctx.setTransform).toHaveBeenCalledWith(1, 0, 0, 1, 0, 0);
  });

  it('should call destroy when ball reaches certain condition', () => {
    const destroySpy = jest.spyOn(ball, 'destroy');
    ball.physics.center.y = 100 + ball.radius + 0.01; // Adjusted to ensure condition is met
    console.log('Ball physics center y:', ball.physics.center.y);
    try {
      ball.loop(1);
    } catch (error) {
      console.error('Error during loop execution:', error);
    }
    console.log('Destroy spy call count:', destroySpy.mock.calls.length);
    expect(destroySpy).toHaveBeenCalled();
  });
});
