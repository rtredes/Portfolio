const {random, floor, round, ceil, PI} = Math

function randomFloat(min,max){
  return random() * (max - min) + min
}
var create = {
  'element': function (tagName, attributes){
    var el = document.createElement(tagName)
    
    for(let attr in attributes){
      var value = attributes[attr]
      switch (attr){
        case 'event':
          const events = value
          for (let event in events) {
            el.addEventListener(event, events[event])
          }
        break;
        case 'innerHTML': el.innerHTML = value
        break;
        case 'innerText': el.innerText = value
        break;
        case 'append': value.append(el) 
        break;
        case 'insertAt': 
          value.target.insertBefore(
            el,
            value.target.childNodes[value.index]
          )
        break;
        default: el.setAttribute(attr, value)
        break;
      }
    }
    
    return el
  },
  'textNode': function (text, parent){
    return parent.append(document.createTextNode(text))
  }
}

function collided(obj1, obj2, aRange) {
  return (Math.hypot(obj2.x - obj1.x, obj2.y - obj1.y) - (aRange ? aRange : obj1.radius + obj2.radius)) < 1
}

const filters = {
  'even': function(number){
    return !(number % 2)
  },
  'odd': function(number){
    return !(number % 0) && number
  }
}
function toCurrency(number) {
  var fn = number.toFixed(2).split(".")
  var number = fn[0]
  var newNum = ""
  
  number.split("").reverse().forEach((n, i) => {
    if (!(i % 3) && (i != 0)) newNum += ","
    newNum += n
  })
  return newNum.split("").reverse().join("") + "." + fn[1]
}

function setMediaThumbnail (title, artist, album, artwork, events){
  navigator.mediaSession.metadata = new MediaMetadata({
    title,
    artist,
    album,
    artwork// Object array of {src, type, sizes}
  });
  
  for(var key in events){
    navigator.mediaSession.setActionHandler(key, events[key])
  }
  //Key list [play, pause, seekbackward, seekforward, previoustrack, nexttrack]
}


