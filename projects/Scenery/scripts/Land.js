export default class Land {
  constructor(json) {
    this.canvas = json.canvas
    this.image = json.image
    this.width = this.image.width
    this.height = this.image.height
    this.y = 0

    this.bgx = randomFloat(10000, 100000)
    this.position = images.lands.other.indexOf(this.image)
    this.default = {
      y: this.position != images.lands.other.length - 1 ? this.canvas.ch + 50 : json.y + 75
    }
    this.acceleration = 3
    this.ok = false
    this.gravity = 0.01
    this.gradient = gradient(this.canvas, [
      { 'offSet': 0.8 - (this.position * .1), 'color': 'transparent' },
      { 'offSet': 1, 'color': json.eclipse ? 'red' : 'lightblue' }
    ])
    this.parseJson(json)

  }
  parseJson(json) {
    for (let object in json) {
      this[object] = json[object]
    }
  }
  draw() {
    var { c, cw, ch } = this.canvas
    c.save()
    c.beginPath()
    for (var i = 0; i < ceil(cw / this.width) + 1; i++) {
      c.drawImage(
        this.image, i * this.width - (
          this.bgx * (.22 + (this.position * .22))
        ) % this.width,
        this.default.y
      )
    }
    if (this.position != images.lands.other.length - 1) {
      c.globalAlpha = .25
      c.fillStyle = this.gradient
      c.fillRect(0, 0, cw, ch)
    }
    c.closePath()
    c.restore()
  }
  update() {
    this.draw()

    if (this.accel < 0) {
      this.accel += 0.01
      this.bgx -= this.accel
    }
    if (!this.ok) {
      this.default.y -= this.acceleration
      this.acceleration *= this.acceleration <= 0.4 ? 1 : 0.99
      if (this.default.y < this.y + 10) this.ok = true
    } else if (this.ok && this.default.y < this.y + 10) {
      this.acceleration *= 0.90
      this.default.y -= this.acceleration
    }
  }

}