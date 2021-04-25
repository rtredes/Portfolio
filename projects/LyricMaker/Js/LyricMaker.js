export default class {
  constructor(target) {
    this.target = target
    this.progression = "Waiting"
    this.file_name = ""
    this.lyric = []
    this.generated_lyric = []

    var container = create.element("div", {
      'class': 'lyrics-container',
      'append': target
    })
    this.music = create.element("audio", {
      'append': container,
      'event': {
        'play': () => this.changeState(true),
        'pause': () => this.changeState(false),
        'timeupdate': () => this.displayGenerated(),
        'durationchange': () => {
          this.reset()
        },
        'ended': () => this.play_button.disabled = this.record_button.disabled = true
      }
    })

    var div1 = create.element("div", {
      'append': container
    })
    var lyric_file = create.element("div", {
      'class': "lyrics-file",
      'append': div1
    })
    this.file = create.element("input", {
      'type': "file",
      'filename': 'Click To Choose Music',
      'accept': 'audio/*',
      'event': {
        'input': (e) => this.loadFile(e)
      },
      'append': lyric_file
    })
    this.lyric_output = create.element("div", {
      'class': "lyrics-progress",
      'append': div1
    })
    var controls = create.element("div", {
      'class': "controls",
      'append': div1
    })
    this.play_button = create.element("button", {
      'event': {
        'click': () => this.initiate()
      },
      'innerHTML': "Start",
      'disabled': true,
      'append': controls
    })
    this.record_button = create.element("button", {
      'event': {
        'click': () => this.record(
          this.convertTime(this.music.currentTime),
          this.lyric[this.generated_lyric.length])
      },
      'innerHTML': "Record",
      'append': controls,
      'disabled': true
    })
    this.undo_button = create.element("button", {
      'event': {
        'click': () => this.undo()
      },
      'innerHTML': "Undo",
      'append': controls,
      'disabled': true
    })

    var div2 = create.element("div", {
      'append': container
    })

    var lyric_file2 = create.element("div", {
      'class': "lyrics-file",
      'append': div2
    })

    this.lyric_input = create.element("textarea", {
      'placeholder': "Input the lyrics here...",
      'append': div2,
      'required': 'true',
      'event': {
        'input': () => {
          this.lyric = this.splitLyric(this.lyric_input.value)
          this.progress.max = this.lyric.length
          this.disableDownload()
        }
      }
    })
    var controls2 = create.element("div", {
      'class': "controls",
      'append': div2
    })

    this.download_button = create.element("a", {
      "innerHTML": "Download",
      'append': controls2,
      'disabled': true
    })

    this.progress = create.element("progress", {
      'value': "0",
      'max': "1",
      'append': this.download_button
    })


  }

  disableDownload() {
    if (this.progress.value != this.progress.max &&
      this.progression != "Waiting") {
      this.download_button.setAttribute("disabled", "true")
      this.download_button.removeAttribute("href")
      this.record_button.disabled = false
    } else if(this.progression != "Waiting"){
      this.record_button.disabled = true
      this.download_button.href = this.makeLyricFile(this.lyric_output.innerText)
      this.download_button.download = `${this.file_name}.lrc`
      this.download_button.removeAttribute("disabled")
    }
  }

  reset() {
    this.play_button.innerHTML = "Start"
    this.play_button.disabled = false
    this.undo_button.disabled = this.record_button.disabled = true
    this.progression = "Waiting"
    this.lyric = []
    this.generated_lyric = []
    this.lyric_output.innerHTML = this.lyric_input.value = ""
    this.download_button.setAttribute("disabled", "true")
    this.download_button.removeAttribute("href")
    this.download_button.removeAttribute("download")
    this.progress.value = 0
  }

  loadFile(e) {
    const file = this.file.files[0]
    this.music.src = URL.createObjectURL(file)
    this.file_name = file.name
    this.music.load()
    this.music.disabled = true
    this.file.setAttribute("filename", this.file_name)
  }

  initiate() {
    switch (this.progression) {
      case "Waiting":
        if (this.lyric_input.value && this.playMusic()) {
          this.progression = "Playing"
          this.record(
            this.convertTime(this.music.currentTime),
            this.lyric[this.generated_lyric.length]
          )
        } else {
          this.lyric_input.focus()
          this.lyric_input.reportValidity()
        }
        break;
      case "Playing":
        this.music.pause()
        break;
      case "Paused":
        this.music.play()
        break;
    }
  }
  changeState(playing) {
    if (this.progression != "Finished") {
      if (playing) {
        this.progression = "Playing"
        this.play_button.innerHTML = "Pause"
        this.record_button.removeAttribute("disabled")
      } else {
        this.progression = "Paused"
        this.play_button.innerHTML = "Play"
      }
    }
  }
  playMusic() {
    if (this.music.src) {
      this.music.play().then(_ => {
        var file_name = this.file_name.split(".mp")
        var title = file_name[0]
        var album = "TredesReiniel.web.app"
        var artist = ""

        setMediaThumbnail(
          title.trim(),
          album.trim(),
          artist.trim(),
          [{
            'src': '/Images/Scenery512.png',
            'sizes': "512x512",
            'type': "image/png"
          }], {
            'seekbackward': () => {
              this.undo()
            },
            'seekforward': () => this.music.currentTime += 10
          })
      })
      return true
    } else {
      return false
    }
  }
  convertTime(sec) {
    return `${Math.floor(sec/60)}:${(sec%60).toFixed(1)}`
  }
  splitLyric(lrc) {
    var lyric = lrc

    return lyric.split('\n').filter(
      function(str) {
        return str != ''
      }
    )
  }
  record(time, text) {
    if (this.generated_lyric.length < this.lyric.length) {
      this.generated_lyric.push(`[${time}] ${text}`)
      this.undo_button.removeAttribute("disabled")
      this.progress.value = this.generated_lyric.length
      this.disableDownload()
    }
  }
  undo() {
    var time = this.generated_lyric.length <= 1 ? 0 : this.convertToSeconds(
      this.getTime(
        this.generated_lyric.pop()
      )
    )

    this.music.currentTime = time
    this.progress.value = this.generated_lyric.length
    this.record_button.removeAttribute("disabled")
    this.download_button.setAttribute("disabled", "true")
    this.download_button.removeAttribute("href")
  }
  getTime(str) {
    return str.substring(
      str.indexOf('[') + 1,
      str.indexOf(']')
    )
  }
  convertToSeconds(t) {
    var time = t.split(':')
    return (Number(time[0] * 60)) + Number(time[1])
  }
  makeLyricFile(text) {
    var data = new Blob([text], { type: 'Text/Lyric' })
    return window.URL.createObjectURL(data)
  }
  displayGenerated() {
    if (this.music.currentTime) {
      this.lyric_output.innerHTML = `${this.generated_lyric.join('<br>')}`
      this.lyric_output.innerHTML += this.generated_lyric.length < this.lyric.length ? `<br> <span class='last'>[${this.convertTime(this.music.currentTime)}] ${this.lyric[this.generated_lyric.length]}</span>` : ''
      this.lyric_output.scrollBy(0, 50)
    }
  }

}