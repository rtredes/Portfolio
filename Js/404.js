import SunAndMoon from "/projects/Scenery/scripts/SunAndMoon.js"
import Land from "/projects/Scenery/scripts/Land.js"
import Star from "/projects/Scenery/scripts/Star.js"
import Ambient from "/projects/Scenery/scripts/Ambient.js"
import Cloud from "/projects/Scenery/scripts/Cloud.js"
import CnvText from "/projects/Scenery/scripts/Text.js"
import loadImages, {sprites} from "/projects/Scenery/scripts/sprites.js"
var mainBG = null

window.addEventListener("load", function() {
  loadImages(sprites, function(imgs) {
    images = imgs
    try {
      mainBG = new CanvasAnimation(
        document.getElementsByClassName("head")[0], "black", "Scenery")
      initializeAnimations()

    } catch (e) {
      console.error(e)
    }
  })
})

function initializeAnimations() {
  //Background
  var mainBG = new CanvasAnimation(
    document.getElementsByClassName("head")[0], "black", "Scenery")
  mainBG.bgColor = gradient(mainBG, [
    { 'offSet': .5, color: 'black' },
    { 'offSet': 1, color: 'red' }
  ])
  mainBG.objects = {
    'stars': [],
    'ambient': [],
    'sunAndMoon': [],
    'clouds': [],
    'lands': [],
    'cloudsFront': [],
    'texts': []
  }
  
  mainBG.insert({
    'name': 'texts',
    'object': new CnvText({
      'canvas': mainBG,
      'x': mainBG.cw/2,
      'y': mainBG.ch/2,
      'position': 'center',
      'font': "bold 18px 'Courier New', Courier, monospace",
      'label': '404: Page not found.',
      'color': '#FFFDD5',
      'fill': true,
      'isCentered': true
    })
  })
  
  mainBG.insert({
    'name': 'ambient',
    'object': new Ambient({
      'canvas': mainBG,
      'color': gradient(mainBG, [
        { 'offSet': .65, 'color': 'black' },
        { 'offSet': 1, 'color': 'orange' }
      ])
    })
  })
  mainBG.insert({
    'name': 'sunAndMoon',
    'object': new SunAndMoon({
      'canvas': mainBG,
      'eclipse': true
    })
  })
  for (let i = 0; i < round(randomFloat(3, 10)); i++)
    mainBG.insert({
      'name': round(random()) ? 'clouds' : 'cloudsFront',
      'object': new Cloud({
        'canvas': mainBG,
        'x': randomFloat(0, mainBG.cw),
        'y': randomFloat(150, 170),
        'image': images.clouds.other[floor(randomFloat(0, images.clouds.other.length))]
      })
    })
  for (let i = 0; i < round(randomFloat(100, 200)); i++)
    mainBG.insert({
      'name': 'stars',
      'object': new Star({
        'canvas': mainBG,
        'y': randomFloat(0, mainBG.ch / 1.25),
        'x': randomFloat(0, mainBG.cw),
        'twinkle': round(random()) ? true : false
      })
    })

  images.lands.other.reverse().forEach((land, index) => {
    mainBG.insert({
      'name': 'lands',
      'object': new Land({
        'canvas': mainBG,
        'y': mainBG.ch - 130 + (index * 10),
        'image': land,
        'eclipse': true
      })
    })
  })

  canvasArray.push(mainBG)

  //Animate all


  animation()

  window.addEventListener("resize", function() {
    handleResize()

    var toHandle = ["stars", "clouds", "cloudsFront", "sunAndMoon", "texts"]

    toHandle.forEach(obj => {
      mainBG.objects[obj].forEach(o => o.resetObject(true))
    })

  })

}
document.querySelector("#back").addEventListener("click", function(){
  window.history.back()
})