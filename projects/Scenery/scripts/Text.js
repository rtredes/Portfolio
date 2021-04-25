export default class CnvText {
  constructor(json) {
    this.canvas = json.canvas
    this.font = "10px Arial"
    this.position = "justify"
    this.color = "white"
    this.label = "TextDemo"
    this.isCentered = false
    this.x = 0
    this.y = 0
    this.fill = false
    this.textWidth = this.canvas.cw
    this.opacity = 0
    this.ok = false
    setTimeout(() => this.ok = true, 2000)
    this.parseJson(json)
    
  }

  parseJson(json) {
    for (let object in json) {
      this[object] = json[object]
    }
  }
  draw(rotation) {
    var { c, cw, ch } = this.canvas
    c.save()
    c.beginPath()
    c.globalAlpha = this.opacity
    c.font = this.font
    c.textAlign = this.position
    c.fillStyle = c.strokeStyle = this.color

    if (this.shadow && this.fill) {
      c.strokeStyle = this.shadow
      
      c.strokeText(this.label, this.x + 1, this.y + 1, this.textWidth)
      c.fillText(this.label, this.x, this.y, this.textWidth)
      
    } else if (!this.fill) {
      c.strokeText(this.label, this.x, this.y, this.textWidth)
    } else {
      c.fillText(this.label, this.x, this.y, this.textWidth)
    }
    c.closePath()
    c.restore()
  }
  update() {
    this.draw()
    this.opacity += this.opacity < 1 && this.ok ? 0.01 : 0
  }
  resetObject() {
    var { c, cw, ch } = this.canvas
    if (this.isCentered) {
      this.x = cw / 2
      this.y = ch / 2
    }
    
  }
}