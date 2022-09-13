class List {
  constructor () {
    this.listSize = 0;
    this.pos = 0;
    this.dataStore = [];
  }
  insert(node){
    this.dataStore.unshift(node)
    this.listSize = this.dataStore.length
  }
  show() {
    this.dataStore[this.pos] ? this.dataStore[this.pos].img.style.display = 'inline' : null;
    this.dataStore[this.pos] ? this.dataStore[this.pos].p.style.display = 'inline' : null;
  }
  increment() {
    this.pos ++
    this.hidePrev()
    this.show()
  }
  decrement() {
    this.pos --
    this.hideNext()
    this.show()
  }
  front(){
    this.pos = 0
    this.hideLast()
    this.show()
  }
  find(element) {
    return this.dataStore.findIndex(item => item == element)
  }
  prev(){
    return this.hasPrev() ? this.decrement() : null
  }
  next(){
    return this.hasNext() ? this.increment() : this.front()
  }
  hasNext(){
    return (this.pos >= this.listSize - 1) ? false : true
  }
  hasPrev(){
    return (this.pos <= 0) ? false : true
  }
  hidePrev(){
    this.dataStore[this.pos - 1].p.style.display = 'none'
    this.dataStore[this.pos - 1].img.style.display = 'none'
  }
  hideNext(){
    this.dataStore[this.pos + 1].p.style.display = 'none'
    this.dataStore[this.pos + 1].img.style.display = 'none'
  }
  hideLast(){
    this.dataStore[this.dataStore.length - 1].p.style.display = 'none'
    this.dataStore[this.dataStore.length - 1].img.style.display = 'none'
  }
}

function UIComponent(type, name){
  this.node = document.createElement(type);
  this.name = name;

  createId = (name) => {
    let serial = Math.round((Math.random() * 1000));
    return `${name}-${serial}`
  }

  createUIAttribute = (node, attr, value) => {
    let appendage = document.createAttribute(attr);
    appendage.value = value;
    node.setAttributeNode(appendage);
  }

  this.assignId = () => {
    let id = document.createAttribute('id');
    id.value = createId(this.name);
    this.node.setAttributeNode(id);
  }

  this.setAttribute = (attr, value) => {
    createUIAttribute(this.node, attr, value)
  }

  this.get = () => {
    return this.node;
  }
}

function Carousel(){
  this.list = new List();
  this.counter = [];
  
  this.createCounter = () => {
    let i = this.list.listSize
    while (i > 0) {
      this.counter.push(new UIComponent('div', 'counter-item'));
      i --;
    }
  }
}


let path = 'assets/graphics/imgs/';

const carousel_data = [
    {
      img: {
        src: `${path}nice-house.jpg`
      },
      p: {
        src: '"We feel so lucky to have found Ben. His patience, strong network, hard-work and clear guidance were invaluable in helping us purchase our first home in an intimidating seller\'s market. Throughout the process, he was understanding, communicative, dependable, and we never felt pressured or rushed into making any decisions."'
      }
    },
    {
      img: {
        src: `${path}courtyard.jpg`
      },
      p: {
        src: '"Ben was an amazing agent for us. He knew the area very well and went above and beyond on helping us sell our house. He was extremely communicative, which was especially helpful for us because we live out of town. He dropped everything multiple times to answer our questions or requests. He is positive and energetic, and we loved his personality!"'
      }
    },
    {
      img: {
        src: `${path}kitchen-island.jpeg`
      },
      p: {
        src: '"Ben gave us sound advice. Whenever a problem arose with the preparation and marketing of our home, Ben was on top of it with a \'can-do\' and enthusiastic plan. At our first meeting, Ben got out of his car and saved my wife and me $10,000. Would I recommend Ben to friends or family? darn tootin! If I were trying to buy a house in Olympia, Ben would be my agent!"'
      }
    },
    {
      img: {
        src: `${path}backyard.jpeg`
      },
      p: {
        src: '"Ben is awesome - he has helped me buy and sell 2 homes in Olympia and Ocean Shores. His in-depth knowledge of the South Sound makes him an invaluable resource. He\'s a negotiation pro and goes above and beyond in every way  - helping to relocate a massive antique stove, making the trek out to the beach,and navigating details of a house sale and purchase!"'
      }
    },
    {
      img: {
        src: `${path}sub-house.jpg`
      },
      p: {
        src: '"We were lucky to find Ben for our first home. He was always available when we wanted to see a home even if it was last minute. He is extremely knowledgeable on building practices and products which was comforting as first time home buyers. If you\'re looking for someone who is respectful, knowledgeable and fun to be around, Ben is the right person for you."'
      }
    }
]

// Helpers

appendClasses = (el, styleClasses, op) => {
  
  // ==========
  // appends or removes an array of classes
  // based on the string passed as 'op' variable
  // ==========
  
  styleClasses.forEach((classStyle) => {
    op === 'add' ? el.classList.add(classStyle) : 
    op === 'remove' ? el.classList.remove(classStyle): null
  })
}

// ====================
// togglePrevious
// toggleNext
// incrementCounter
// decrementCounter

togglePrevious = (idx) => {
  appendClasses(counterRoot.children[idx], ['active'], 'remove')
  appendClasses(counterRoot.children[idx], ['inactive'], 'add')
}

toggleNext = (idx) => {
  appendClasses(counterRoot.children[idx], ['inactive'], 'remove')
  appendClasses(counterRoot.children[idx], ['active'], 'add')
}

incrementCounter = (idx) => {
  if (idx) {
    togglePrevious(idx - 1)
    toggleNext(idx)
  } else {
    togglePrevious(carousel.list.listSize - 1)
    toggleNext(idx)
  }
}

decrementCounter = (idx) => {
  togglePrevious(idx + 1)
  toggleNext(idx)
}
// ====================

// DOM appendage  ====================
let carouselRoot = document.getElementById('carousel');
let carouselImgs = document.getElementById('carousel-imgs');
let carouselReviews = document.getElementById('carousel-reviews');
let counterRoot = document.getElementById('counter');

let carousel = new Carousel();

for (let i = 0; i < carousel_data.length; i++) {
  let carousel_item = {};
  
  let review = new UIComponent(Object.keys(carousel_data[i])[1], 'carousel-review');
  review.assignId();
  review.node.innerText = Object.values(carousel_data[i])[1].src;
  review.setAttribute('style', 'display:none');
  
  let img = new UIComponent(Object.keys(carousel_data[i])[0], 'carousel-img');
  img.assignId();
  img.setAttribute('src', Object.values(carousel_data[i])[0].src);
  img.setAttribute('style', 'display:none');

  carouselImgs.appendChild(img.get());
  carouselReviews.appendChild(review.get());
  
  carousel_item.p = review.get();
  carousel_item.img = img.get();
  
  carousel.list.insert(carousel_item);
}

carousel.createCounter();
carousel.counter.forEach((el) => {
  counterRoot.appendChild(el.get())
})

document.querySelector('.next').addEventListener('click', () => {
  carousel.list.next();
  incrementCounter(carousel.list.pos);
});

document.querySelector('.prev').addEventListener('click', () => {
  carousel.list.prev();
  decrementCounter(carousel.list.pos);
  // clearInterval(cycle);
});


// ====================

// Responsive Layout Handlers
let resizeHandler = () => {
  let el = document.getElementById("desktop")
  let classArr = ['flex-row', 'center', 'g-15']

  if(window.innerWidth > 750){
    appendClasses(el, classArr, 'add')
  } else {
    appendClasses(el, classArr, 'remove')
  }
}

toggleNext(0)
carousel.list.show()
resizeHandler();
window.onresize = resizeHandler;
// ====================