export const canvas = document.createElement('canvas')
export const ctx = <CanvasRenderingContext2D>canvas.getContext('2d')

Object.assign(canvas.style, {
  position: 'fixed',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
})

export const resetCanvas = () => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}
