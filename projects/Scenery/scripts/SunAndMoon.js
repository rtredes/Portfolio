export default class SunAndMoon {
  constructor(json) {
    this.canvas = json.canvas
    this.image = json.eclipse ? images.samE.main : images.sam.main
    this.width = this.image.width
    this.height = this.image.height
    this.x = (this.canvas.cw / 2) - this.width / 2
    this.y = this.canvas.ch - 230
    this.ok = false
    this.opacity = 0
    
    this.parseJson(json)
  }
  parseJson(json) {
    for (let object in json) {
      this[object] = json[object]
    }
  }
  resetObject() {
    this.x = (this.canvas.cw / 2) - this.width / 2
  }
  draw(degrees) {
    let c = this.canvas.c
    c.save()
    c.beginPath()
    c.globalAlpha = this.opacity
    c.translate(this.x + this.width / 2, this.y + this.height / 2)
    c.rotate(degrees * Math.PI / 180)
    c.drawImage(this.image, -this.width / 2, -this.height / 2)
    c.stroke()
    c.closePath()
    c.restore()
  }
  update() {
    this.draw(this.calculate_angle())
    this.opacity += this.ok && this.opacity < 1 ? 0.01 : 0
    this.ok = this.canvas.objects.lands[0].ok
  }
  calculate_angle() {
    var time = new Date()
    let hour = time.getHours()
    let minute = time.getMinutes()
    let anglePerHour = 360/24
    return ((anglePerHour * hour) + ((anglePerHour / 60) * minute))
  }
}