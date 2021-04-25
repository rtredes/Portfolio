export default class Star {
  constructor(json) {
    this.canvas = json.canvas
    this.color = "white"
    this.radius = random()
    this.x = 0
    this.y = 0
    this.twinkle = false
    this.tr = false
    this.opacity = randomFloat(0, 100)
    this.hidden = true
    this.parseJson(json)
  }
  parseJson(json) {
    for (let object in json) this[object] = json[object]
  }
  draw() {
    var { c, cw, ch } = this.canvas
    c.save()
    c.beginPath()
    c.globalAlpha = Math.abs(this.opacity * 0.01)
    c.fillStyle = this.color
    c.arc(this.x, this.y, this.radius, 0, PI * 2)
    c.fill()
    c.closePath()
    c.restore()
  }
  update() {
    this.hidden = this.canvas.objects.ambient[0].opacity == 100
    if (!this.hidden) {
      this.draw()
      if (this.accel < 0)
        this.x += (this.accel += 0.06)
      else
        this.x = this.x + this.radius > 0 ? this.x - 0.001 : randomFloat(this.canvas.cw + this.radius, this.canvas.cw * 1.1)
      if (this.twinkle) {
        this.opacity += this.tr ? random() : -random()
        if (this.opacity >= 100 || this.opacity <= 0)
          this.tr = !this.tr
      }
      if (this.x - this.radius < 0) this.mirror()
    }
  }
  resetObject() {
    this.x = randomFloat(0, this.canvas.cw)
    this.y = randomFloat(0, this.canvas.ch * .8)
  }

  mirror() {
    this.x = this.canvas.cw + this.radius
  }
}