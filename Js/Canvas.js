class CanvasAnimation {
  constructor(target, bgColor, className) {
    this.canvas = create.element('canvas', {
      'append': target,
      'class': className || "canvas"
    })
    this.c = this.canvas.getContext("2d")
    this.cw = this.canvas.width = this.canvas.parentNode.clientWidth
    this.ch = this.canvas.height = this.canvas.parentNode.clientHeight
    this.objects = {}
    this.bgColor = bgColor
    
  }
  destroy() {
    canvasArray.splice(1, canvasArray.indexOf(this))
    this.canvas.remove()
  }
  insert(obj){
    this.objects[obj.name].push(obj.object)
  }
}

function handleResize() {
  canvasArray.forEach((c, i) => {
    if (c.canvas.parentNode) {
      c.cw = c.canvas.width = c.canvas.parentNode.clientWidth
      c.ch = c.canvas.height = c.canvas.parentNode.clientHeight
    }
  })
}


function animation() {
  requestAnimationFrame(animation)
  canvasArray.forEach(c => {
    c.c.fillStyle = c.bgColor
    c.c.fillRect(0, 0, c.cw, c.ch)
    for (let i in c.objects) {
      c.objects[i].forEach((obj, index) => {
        if (!obj.destroyed) obj.update()
        else c.objects[i].splice(index, 1)
      })
    }
  })
}

function destroyCanvas(className) {
  canvasArray.forEach((c, i) => {
    if (c.canvas.className == className) {
      c.destroy()
    }
  })
}

function gradient(canvas, cs) {
  var gradient = canvas.c.createLinearGradient(0, 0, 0, canvas.ch)

  cs.forEach(s => {
    gradient.addColorStop(s.offSet, s.color)
  })

  return gradient
}

var canvasArray = []
var images = {}