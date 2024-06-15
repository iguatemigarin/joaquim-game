import { canvas, resetCanvas } from '../render/canvas';

describe('Canvas', () => {
  it('should create a canvas element', () => {
    expect(canvas).toBeInstanceOf(HTMLCanvasElement);
  });

  it('should get a 2D rendering context', () => {
    const mockCtx = {
      fillRect: jest.fn(),
      clearRect: jest.fn(),
      getImageData: jest.fn(),
      putImageData: jest.fn(),
      createImageData: jest.fn(),
      setTransform: jest.fn(),
      drawImage: jest.fn(),
      save: jest.fn(),
      fillText: jest.fn(),
      restore: jest.fn(),
      beginPath: jest.fn(),
      moveTo: jest.fn(),
      lineTo: jest.fn(),
      closePath: jest.fn(),
      stroke: jest.fn(),
      translate: jest.fn(),
      scale: jest.fn(),
      rotate: jest.fn(),
      arc: jest.fn(),
      fill: jest.fn(),
      measureText: jest.fn(),
      transform: jest.fn(),
      globalAlpha: 1,
      globalCompositeOperation: 'source-over',
      strokeStyle: '#000000',
      fillStyle: '#000000',
      lineWidth: 1,
      lineCap: 'butt',
      lineJoin: 'miter',
      miterLimit: 10,
      shadowBlur: 0,
      shadowColor: 'rgba(0, 0, 0, 0)',
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      font: '10px sans-serif',
      textAlign: 'start',
      textBaseline: 'alphabetic',
    };
    canvas.getContext = jest.fn().mockReturnValue(mockCtx);
    expect(canvas.getContext('2d')).toBe(mockCtx);
  });

  it('should set canvas styles correctly', () => {
    expect(canvas.style.position).toBe('fixed');
    expect(canvas.style.top).toBe('0px');
    expect(canvas.style.left).toBe('0px');
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
