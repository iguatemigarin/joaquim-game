import { canvas, ctx, resetCanvas } from '../render/canvas';

describe('Canvas', () => {
  it('should create a canvas element', () => {
    expect(canvas).toBeInstanceOf(HTMLCanvasElement);
  });

  it('should get a 2D rendering context', () => {
    expect(ctx).toBeInstanceOf(CanvasRenderingContext2D);
  });

  it('should set canvas styles correctly', () => {
    expect(canvas.style.position).toBe('fixed');
    expect(canvas.style.top).toBe('0');
    expect(canvas.style.left).toBe('0');
    expect(canvas.style.width).toBe('100%');
    expect(canvas.style.height).toBe('100%');
  });

  it('should reset canvas dimensions to match window size', () => {
    window.innerWidth = 800;
    window.innerHeight = 600;
    resetCanvas();
    expect(canvas.width).toBe(800);
    expect(canvas.height).toBe(600);
  });
});
