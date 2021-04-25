import SunAndMoon from "/projects/Scenery/scripts/SunAndMoon.js"
import Land from "/projects/Scenery/scripts/Land.js"
import Star from "/projects/Scenery/scripts/Star.js"
import Ambient from "/projects/Scenery/scripts/Ambient.js"
import Cloud from "/projects/Scenery/scripts/Cloud.js"
import CnvText from "/projects/Scenery/scripts/Text.js"
import loadImages, {sprites} from "/projects/Scenery/scripts/sprites.js"
window.addEventListener("load", function() {
  loadImages(sprites, function(imgs) {
    images = imgs
    try {
      initializeAnimations()
    } catch (e) {
      console.error(e)
    }
  })
})

function initializeAnimations() {
  //Background
  var mainBG = new CanvasAnimation(
    document.body, "black", "Scenery")
  mainBG.bgColor = gradient(mainBG, [
    {'offSet': .5, color: 'black'},
    {'offSet': 1, color: 'darkblue'}
  ])
  mainBG.objects = {
    'stars': [],
    'ambient': [],
    'sunAndMoon': [],
    'clouds': [],
    'lands': [],
    'cloudsFront': []
  }
  
  mainBG.insert({
    'name': 'ambient',
    'object': new Ambient({
      'canvas': mainBG,
      'color': gradient(mainBG, [
        {'offSet': .5, 'color': '#FFFDD5'},
        {'offSet': 1, 'color': 'white'}
      ])
    })
  })
  
  mainBG.insert({
    'name': 'sunAndMoon',
    'object': new SunAndMoon({
      'canvas': mainBG
    })
  })
  for(let i = 0; i < round(randomFloat(3,10)); i++)
  mainBG.insert({
    'name': round(random()) ? 'clouds' : 'cloudsFront',
    'object': new Cloud({
      'canvas': mainBG,
      'x': randomFloat(0, mainBG.cw),
      'y': randomFloat(150, 170),
      'image': images.clouds.other[floor(randomFloat(0,images.clouds.other.length))]
    })
  })
  for (let i = 0; i < round(randomFloat(100,200)); i++)
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
        'y': mainBG.ch - 130 + (index* 10),
        'image': land
      })
    })
  })
  
  canvasArray.push(mainBG)

  //Animate all
  
  
  animation()
  
  window.addEventListener("resize", function(){
    handleResize()
    
    var toHandle = ["stars","clouds","cloudsFront","sunAndMoon"]
    
    toHandle.forEach(obj => {
     mainBG.objects[obj].forEach(o => o.resetObject(true))
    })
    
  })

}