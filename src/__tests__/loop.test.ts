import { loop } from '../render/loop';
import { resetCanvas } from '../render/canvas';
import { renderTree } from '../render/render-tree';

jest.mock('../render/canvas', () => ({
  resetCanvas: jest.fn(),
}));

jest.mock('../render/render-tree', () => ({
  renderTree: {
    render: jest.fn(),
  },
}));

describe('loop', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(global, 'requestAnimationFrame').mockImplementation((cb) => {
      setTimeout(() => cb(0), 0);
      return 0;
    });
  });

  it('should call resetCanvas and renderTree.render if more than 1ms has passed', () => {
    const lastUpdate = Date.now() - 2;
    loop(lastUpdate);
    expect(resetCanvas).toHaveBeenCalled();
    expect(renderTree.render).toHaveBeenCalledWith(expect.any(Number));
  });

  it('should not call resetCanvas and renderTree.render if less than 1ms has passed', () => {
    const lastUpdate = Date.now();
    loop(lastUpdate);
    expect(resetCanvas).not.toHaveBeenCalled();
    expect(renderTree.render).not.toHaveBeenCalled();
  });

  it('should call requestAnimationFrame recursively', () => {
    const lastUpdate = Date.now() - 2;
    const requestAnimationFrameSpy = jest.spyOn(global, 'requestAnimationFrame');
    loop(lastUpdate);
    expect(requestAnimationFrameSpy).toHaveBeenCalled();
  });
});
