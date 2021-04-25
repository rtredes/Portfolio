export class Portfolio {
  constructor(parent) {
    this.parent = parent
    this.container = create.element('div', {
      'class': 'portfolio',
      'append': this.parent
    })

    this.aboutMe = new AboutMe('about me', [
      [
        'My name is ',
        {
          'tag': 'strong',
          'main': 'Reiniel',
          'alt': 'Tredes'
        },
        ` , a ${calculateAge('10/01/98')} years old self-taught `,
        {
          'tag': 'strong',
          'main': 'Web',
          'alt': 'Full-stack'
        },
        ' Developer, from ',
        {
          'tag': 'strong',
          'main': 'Philippines',
          'alt': 'Dasmariñas, Cavite'
        }
      ],
      [
        'I am a 2nd year undergrad student of ',
        {
          'tag': 'b',
          'innerHTML': `<i><q>Bachelor of Science in Information Technology</q></i>`
        },
        `, and I have to `,
        { 'tag': 'b', 'innerText': 'stop' },
        ` because of financial problem, but that's okay, because the last semester on my school is when I learnt the basics of `,
        { 'tag': 'b', 'innerText': 'Html' },
        ` , `,
        { 'tag': 'b', 'innerText': 'Css' },
        `, and `,
        {
          'tag': 'strong',
          'main': "Js",
          'alt': 'JavaScript'
        }
      ],
      [
        `For some reason I am only using pure `,
        { 'tag': 'b', 'innerText': 'Html' },
        ` , `,
        { 'tag': 'b', 'innerText': 'Css' },
        `, and `,
        { 'tag': 'b', 'innerText': 'Js' },
        ', I am avoiding the use of things that makes it easier like ',
        { 'tag': 'b', 'innerText': 'Bootstrap' }, ', ',
        { 'tag': 'b', 'innerText': 'JQuery' }, ', etc. ',
        'I think easy and comfortable things will stop me from ',
        {
          'tag': 'strong',
          'main': "Growing",
          'alt': 'Learning'
        }
      ],
      [
        `I'm `,
        { 'tag': 'b', 'innerText': 'Hardworking' },
        ', ', { 'tag': 'b', 'innerText': 'Passionate' },
        ', ', { 'tag': 'b', 'innerText': 'Fast learner' },
        ', and ', { 'tag': 'b', 'innerText': 'Honest' },
        `. I'm always willing to learn new things to expand my knowledge, and to achieve my dream of becoming a successful `, {
          'tag': 'strong',
          'main': "Developer",
          'alt': 'Person'
        },
        ' someday.'
      ]
    ], this.container)

    this.stacks = new Stacks(
      `My current stack of 
      <strong main="Languages" alt="Technologies"></strong>`,
      `HTML5 - CSS3 - JS - ES6 - NODEJS - FIREBASE - PHP - MYSQL`,
      this.container
    )

    this.myWorks = new Myworks(
      'Portfolio',
      this.container
    )

    this.contact = new Contact(
      'Contact Me',
      'rtredes2@gmail.com',
      [{
          'icon': 'facebook',
          'href': 'facebook.com/rtredes'
      },
        {
          'icon': 'twitter',
          'href': 'twitter.com/rtredes'
      },
        {
          'icon': 'instagram',
          'href': 'instagram.com/reiniel26'
      },
        {
          'icon': 'github',
          'href': 'github.com/rtredes'
      },
        {
          'icon': 'steam',
          'href': 'steamcommunity.com/id/rtredes'
      }],
      this.container
    )
  }
}

class Contact {
  constructor(title, email, links, parent) {
    this.parent = parent
    this.container = create.element('div', {
      'class': 'contact',
      'append': this.parent
    })
    this.title = createTitle(title, this.container)
    this.email = create.element('a', {
      'class': 'email',
      'href': `mailto:${email}`,
      'innerText': email,
      'append': this.container
    })
    this.social = create.element('div', {
      'class': 'social',
      'append': this.container
    })
    links.forEach(link => this.linkWithIcon(link))
  }

  linkWithIcon({ href, icon }) {
    const a = create.element('a', {
      'target': '_blank',
      'href': `https://${href}`,
      'append': this.social
    })
    const i = create.element('i', {
      'class': `fab fa-${icon}-square`,
      'append': a
    })
  }
}

class Myworks {
  constructor(title, parent) {
    this.parent = parent
    this.withScrollEvent = []
    this.works = []
    this.container = create.element('div', {
      'class': 'myworks',
      'append': this.parent
    })
    this.title = createTitle(title, this.container)

  }

  loadWorks() {
    this.works.forEach(
      project =>
      this.project(
        project
      )
    )
  }

  buttonLink({ title, icon, href }, parent) {
    const button = create.element('button', {
      'event': {
        'click': () => location.href = href
      },
      'innerText': ` ${title}`,
      'append': parent
    })
    const i = create.element('i', {
      'class': icon,
      'insertAt': { 'target': button, 'index': 0 }
    })

    return button
  }

  project({ image, title, info, links }) {
    const container = create.element('div', {
      'class': 'container',
      'append': this.container
    })
    const img = create.element('img', {
      'src': image,
      'append': container
    })
    const description = create.element('div', {
      'class': 'description',
      'append': container
    })
    const _title = create.element('div', {
      'class': 'title',
      'innerText': title,
      'append': description
    })
    const _info = create.element('div', {
      'class': 'info',
      'innerText': info,
      'append': description
    })
    const buttons = create.element('div', {
      'class': 'buttons',
      'append': description
    })

    links.forEach(
      link =>
      this.withScrollEvent.push(
        this.buttonLink(link, buttons)
      )
    )
    this.withScrollEvent.push(img)
    this.withScrollEvent.push(_title)
    this.withScrollEvent.push(_info)

    return container
  }
}

class Stacks {
  constructor(title, languages, parent) {
    this.parent = parent
    this.container = create.element('div', {
      'class': 'stacks',
      'append': this.parent
    })

    this.title = create.element('b', {
      'innerHTML': title,
      'append': this.container
    })

    this.languages = create.element('div', {
      'class': 'languages',
      'innerText': languages,
      'append': this.container
    })
  }
}

class AboutMe {
  constructor(title, paragraphs, parent) {
    this.parent = parent
    this.withScrollEvent = []
    this.container = create.element('div', {
      'class': 'aboutme',
      'append': parent
    })
    this.title = createTitle(title, this.container)

    paragraphs.forEach(
      _p => this.withScrollEvent.push(
        p(_p, this.container)
      )
    )
  }

}

export class ToTop{
  constructor(parent){
    this.button = create.element('button', {
      'class': 'to-top',
      'event': {
        'click': this.scrollTop
      },
      'hide': 'true',
      'append': parent
    })
    create.element('i', {
      'class': 'fas fa-angle-up',
      'append': this.button
    })
  }
  
  scrollTop(){
    window.scrollTo(0,0)
  }
}

export class Introduction {
  constructor(parent, animation, initiation) {
    this.parent = parent
    this.animation = animation
    this.initiation = initiation

    this.container = create.element('div', {
      'class': 'intro',
      'append': this.parent
    })
    this.name = create.element('div', {
      'class': 'name',
      'innerText': 'Reiniel Tredes',
      'append': this.container
    })
    this.message = create.element('div', {
      'class': 'message',
      'innerText': 'He who writes in the language of logic',
      'append': this.container
    })
    this.button = create.element('button', {
      'innerText': 'Explore ',
      'append': this.container,
      'event': {
        'click': () => this.onclick()
      }
    })
    this.icon = create.element('i', {
      'class': 'fas fa-hiking',
      'append': this.button
    })
  }

  async onclick() {
    var velocity = -3
    var anim = this.animation.objects

    anim.cloudsFront.forEach(o => o.accel = velocity)
    anim.lands.forEach(o => o.accel = velocity)
    this.container.style.animation = "5s side-left ease"
    this.button.disabled = true
    await this.wait(4000)
    this.container.remove()
    await this.waitMountains()
    this.initiation()
  }
  wait(ms) {
    return new Promise(
      resolve => setTimeout(() => resolve(true), ms)
    )
  }
  waitMountains() {
    return new Promise(resolve => {
      var checker = setInterval(() => {
        if (this.animation.objects.lands[4].accel > 0) {
          clearInterval(checker)
          resolve(true)
        }
      }, 100)
    })
  }
}

//Functions

function calculateAge(date) {
  const today = new Date()
  const birthdate = new Date(date)

  return Math.floor(
    (today - birthdate) / 1000 / 60 / 60 / 24 / 365
  )
}

function createTitle(text, parent) {
  return create.element('div', {
    'class': 'title',
    'innerText': text,
    'append': parent
  })
}

function p(elements, parent) {
  var paragraph = create.element('p', {
    'append': parent
  })
  elements.forEach(el => {
    if (typeof el === 'object') {
      var { tag } = el
      create.element(tag, {
        ...el,
        'append': paragraph
      })
    } else create.textNode(el, paragraph)
  })
  return paragraph
}