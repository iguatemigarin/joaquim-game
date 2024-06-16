import { RenderTree } from '../render/render-tree';
import { Renderable } from '../render/renderable';
import { ctx } from '../render/canvas';

jest.mock('../render/canvas', () => ({
  ctx: {
    translate: jest.fn(),
    fillStyle: '',
  },
}));

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
    renderTree.render(100);

    expect(ctx.fillStyle).toBe('black');
  });
});
