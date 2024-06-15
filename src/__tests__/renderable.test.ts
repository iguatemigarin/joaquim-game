import { Renderable } from '../render/renderable';

class TestRenderable extends Renderable {
  render(): void {
    // Mock implementation
  }

  loop(): void {
    // Mock implementation
  }
}

describe('Renderable', () => {
  let parent: TestRenderable;
  let child: TestRenderable;

  beforeEach(() => {
    parent = new TestRenderable('parent');
    child = new TestRenderable('child', parent);
    parent.children.push(child);
  });

  it('should initialize with correct properties', () => {
    const renderable = new TestRenderable('test-id');
    expect(renderable.id).toBe('test-id');
    expect(renderable.children).toEqual([]);
    expect(renderable.parent).toBeUndefined();
    expect(renderable.physics).toBeUndefined();
  });

  it('should call loop and tick on children', () => {
    const loopSpy = jest.spyOn(child, 'loop');
    const tickSpy = jest.spyOn(child, 'tick');
    parent.tick(1);
    expect(loopSpy).toHaveBeenCalledWith(1);
    expect(tickSpy).toHaveBeenCalledWith(1);
  });

  it('should remove child from parent on destroy', () => {
    child.destroy();
    expect(parent.children).not.toContain(child);
  });

  it('should throw error if destroy is called without parent', () => {
    const renderable = new TestRenderable('test-id');
    expect(() => renderable.destroy()).toThrow('Cannot destroy renderable without parent');
  });
});
