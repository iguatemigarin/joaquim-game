import { FPS } from '../debug/fps';
import { ctx } from '../render/canvas';

describe('FPS', () => {
  let fps: FPS;

  beforeEach(() => {
    fps = new FPS('fps');
    jest.spyOn(ctx, 'fillText').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with correct properties', () => {
    expect(fps.tock).toBeDefined();
    expect(fps.now).toBeDefined();
    expect(fps.msSinceLastCount).toBe(0);
    expect(fps.framesInS).toBe(0);
    expect(fps.text).toBe('');
  });

  it('should update now property', () => {
    const initialNow = fps.now;
    jest.spyOn(Date, 'now').mockReturnValueOnce(initialNow + 1000);
    fps.updateNow();
    expect(fps.now).not.toBe(initialNow);
  });

  it('should update msSinceLastCount property', () => {
    const initialMsSinceLastCount = fps.msSinceLastCount;
    jest.spyOn(Date, 'now').mockReturnValueOnce(fps.tock + 1000);
    fps.updateNow();
    fps.updateMsSinceLastCount();
    expect(fps.msSinceLastCount).toBeGreaterThan(initialMsSinceLastCount);
  });

  it('should update tock property', () => {
    const initialTock = fps.tock;
    jest.spyOn(Date, 'now').mockReturnValueOnce(initialTock + 1000);
    fps.updateNow();
    fps.updateTick();
    expect(fps.tock).toBe(fps.now);
    expect(fps.tock).not.toBe(initialTock);
  });

  it('should reset FPS counter when needed', () => {
    fps.msSinceLastCount = 1000;
    fps.framesInS = 10;
    fps.resetFPSCounter();
    expect(fps.text).toBe('20fps');
    expect(fps.msSinceLastCount).toBe(0);
    expect(fps.framesInS).toBe(0);
  });

  it('should increment FPS counter', () => {
    const initialFramesInS = fps.framesInS;
    fps.incrementFPSCounter();
    expect(fps.framesInS).toBe(initialFramesInS + 1);
  });

  it('should draw text on canvas', () => {
    fps.text = '60fps';
    fps.drawText();
    expect(ctx.fillText).toHaveBeenCalledWith('60fps', 10, 50);
  });

  it('should call render method in loop', () => {
    const renderSpy = jest.spyOn(fps, 'render');
    fps.loop(1);
    expect(renderSpy).toHaveBeenCalled();
  });
});
