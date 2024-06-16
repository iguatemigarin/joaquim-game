import { Stage } from '../stage';
import { Vector } from '../math';
import { canvas, ctx } from '../render/canvas';

const parts = 100;
const ratio = 16 / 9;

describe('Stage', () => {
  let stage: Stage;

  beforeEach(() => {
    stage = new Stage();
  });

  it('should initialize with default values', () => {
    expect(stage.xUnit).toBe(1);
    expect(stage.yUnit).toBe(1);
    expect(stage.width).toBe(canvas.width);
    expect(stage.height).toBe(canvas.height);
    expect(stage.origin).toEqual(new Vector());
  });

  it('should update origin correctly', () => {
    stage.updateOrigin();
    expect(stage.origin).toEqual(
      new Vector(
        canvas.width / 2 - stage.width / 2,
        canvas.height / 2 - stage.height / 2
      )
    );
  });

  it('should update dimensions correctly', () => {
    const { width, height } = canvas;
    stage.updateDimentions();
    if (stage.width > width) {
      expect(stage.width).toBe(width);
      expect(stage.height).toBe(width / ratio);
    } else {
      expect(stage.width).toBe(height * ratio);
      expect(stage.height).toBe(height);
    }
  });

  it('should update unit scales correctly', () => {
    stage.updateUnitsScale();
    expect(stage.xUnit).toBe(stage.width / parts);
    expect(stage.yUnit).toBe(stage.height / parts);
  });

  it('should convert screen coordinates to stage coordinates correctly', () => {
    const screenX = 100;
    const screenY = 100;
    const stageCoords = stage.screenToStage(screenX, screenY);
    expect(stageCoords).toEqual({
      x: ((screenX - stage.origin.x) / stage.width) * parts,
      y: ((screenY - stage.origin.y) / stage.height) * parts,
    });
  });

  it('should draw the stage rectangle correctly', () => {
    const translateSpy = jest.spyOn(ctx, 'translate');
    const strokeRectSpy = jest.spyOn(ctx, 'strokeRect');
    const setTransformSpy = jest.spyOn(ctx, 'setTransform');

    stage.drawRect();

    expect(translateSpy).toHaveBeenCalledWith(stage.origin.x, stage.origin.y);
    expect(strokeRectSpy).toHaveBeenCalledWith(0, 0, stage.width, stage.height);
    expect(setTransformSpy).toHaveBeenCalledWith(1, 0, 0, 1, 0, 0);

    translateSpy.mockRestore();
    strokeRectSpy.mockRestore();
    setTransformSpy.mockRestore();
  });
});
