export default class Ambient {
  constructor(json) {
    this.canvas = json.canvas
    this.opacity = this.getOpacity()
    this.parseJson(json)
  }
  getOpacity() {
    var now = this.date ? this.date : new Date()
    var hours = now.getHours()
    var minutes = now.getMinutes()
    var night = new Date(`${now.toDateString()} 18:05`)
    var morning = new Date(`${now.toDateString()} 6:25`)
    var result = this.opacity
    if ((hours == 18 && minutes < 5) || (hours == 17 && minutes >= 20))
      result = (100 / 45) * ((night - now) / 1000 / 60)
    else if ((hours == 6 && minutes < 25) || (hours == 5 && minutes >= 40))
      result = ((100 / 45) * ((morning - now) / 1000 / 60)) - 100
    else if (hours > 6 && hours < 18 || (hours == 6 && minutes >= 25))
      result = 100
    else if (hours < 6 || hours > 18 || (hours >= 18 && minutes >= 5))
      result = 0

    return result
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
    c.globalAlpha = Math.abs(this.opacity * 0.01)
    c.fillStyle = this.color
    c.fillRect(0, 0, cw, ch)
    c.closePath()
    c.restore()
  }

  update() {
    this.draw()
    this.opacity = this.getOpacity()
  }
}