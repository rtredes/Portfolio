export default class Cloud {
  constructor(json) {
    this.canvas = json.canvas
    this.image = json.image
    this.width = this.image.width
    this.height = this.image.height
    this.velocity = -random() * .1
    this.vd = this.velocity
    this.opacity = 0
    this.ok = false
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
    c.translate(this.x + this.width / 2, this.y + this.height / 2)
    c.rotate((PI * 2) + rotation / 57.3) //360 Angle true rotation
    c.drawImage(this.image, -this.width / 2, -this.height / 2)

    c.stroke()
    c.closePath()
    c.restore()
  }
  update() {

    this.draw()
    if (this.accel < 0) {
      this.velocity = (this.accel += 0.01) *.88
    } else this.velocity = this.vd
    this.x += this.velocity
    if (this.x + this.width < 0) this.resetObject()
    this.opacity += this.opacity < 1 && this.ok ? 0.01 : 0
    this.ok = this.canvas.objects.lands[0].ok
  }
  resetObject(isTrue) {
    var { c, cw, ch } = this.canvas

    this.velocity = -random() * .1
    this.y = randomFloat(150, 160)
    this.x = isTrue ? randomFloat(0, cw) : randomFloat(cw + this.width, cw + this.width * 2)
  }
}