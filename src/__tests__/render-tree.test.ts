import { RenderTree } from '../render/render-tree';
import { Renderable } from '../render/renderable';

describe('RenderTree', () => {
  let renderTree: RenderTree;
  let mockChild: Renderable;

  beforeEach(() => {
    mockChild = {
      tick: jest.fn(),
    } as unknown as Renderable;

    renderTree = new RenderTree('Test renderTree', [mockChild]);
  });

  it('should call tick on each child during render', () => {
    const timePassed = 100;
    renderTree.render(timePassed);

    expect(mockChild.tick).toHaveBeenCalledWith(timePassed);
  });

  it('should set the fill style to black during render', () => {
    const ctx = {
      translate: jest.fn(),
      fillStyle: '',
    };

    global.ctx = ctx as unknown as CanvasRenderingContext2D;

    renderTree.render(100);

    expect(ctx.fillStyle).toBe('black');
  });
});
