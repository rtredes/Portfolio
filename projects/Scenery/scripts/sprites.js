export var sprites = {
  'sam': {
    'main': 'SaM.png'
  },
  'samE': {
    'main': 'samE.png'
  },
  'lands': {
    'other': ['land1.png', 'land2.png', 'land3.png', 'land4.png', 'land5.png']
  },
  'clouds': {
    'other': ["1 - cloud.png", "2 - cloud.png", "3 - cloud.png", "4 - cloud.png", "5 - cloud.png", "6 - cloud.png", "7 - cloud.png"]
  }
}
// preload all images before starting the app
export default function loadImages(imgSprites, callback) {
  var imgPath = `/projects/Scenery/images/`
  var nm = 0
  var loadedSprites = {}
  var loaded = 0
  for (let i in imgSprites) {
    var spriteSet = imgSprites[i]
    loadedSprites[i] = {}
    for (let o in spriteSet) {
      if (o === 'main') {
        nm++
        var imgSrc = spriteSet[o]
        loadedSprites[i][o] = new Image()
        loadedSprites[i][o].src = imgPath + imgSrc
        loadedSprites[i][o].onload = spritesLoaded
      } else if (o === 'other') {
        var deadSet = []
        spriteSet[o].forEach(sprt => {
          nm++
          var img = new Image()
          img.src = imgPath + sprt
          deadSet.push(img)
          img.onload = spritesLoaded
        })
        loadedSprites[i][o] = deadSet
      }
    }
  }

  function spritesLoaded() {
    loaded++
    if (nm === loaded) {
      callback(loadedSprites)
    }
  }
}