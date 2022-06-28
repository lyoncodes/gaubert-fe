class List {
  constructor () {
    this.listSize = 0;
    this.pos = 0;
    this.dataStore = [];
  }
  populate(nodes) {
    for (let i = nodes.length; i--; this.dataStore.unshift(nodes[i]));
    this.listSize = this.dataStore.length
    this.show()
  }
  show() {
    this.dataStore[this.pos] ? this.dataStore[this.pos].node.style.display = 'inline' : null;
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
    this.dataStore[this.pos - 1].node.style.display = 'none'
  }
  hideNext(){
    this.dataStore[this.pos + 1].node.style.display = 'none'
  }
  hideLast(){
    this.dataStore[this.dataStore.length - 1].node.style.display = 'none'
  }
}

// class DOMfactory {
//   constructor () {

//   }
// }

const carousel_data = [
    {
      src: '',
      text: '"We feel so lucky to have found Ben. His patience, strong network, hard-work and clear guidance were invaluable in helping us purchase our first home in an intimidating seller\'s market. Throughout the process, he was understanding, communicative, dependable, and we never felt pressured or rushed into making any decisions."'
    },
    {
      src: '',
      text: '"Ben was an amazing agent for us. He knew the area very well and went above and beyond on helping us sell our house. He was extremely communicative, which was especially helpful for us because we live out of town. He dropped everything multiple times to answer our questions or requests. He is positive and energetic, and we loved his personality!"',
    },
    {
      src: '',
      text: '"Ben gave us sound advice. Whenever a problem arose with the preparation and marketing of our home, Ben was on top of it with a \'can-do\' and enthusiastic plan. At our first meeting, Ben got out of his car and saved my wife and me $10,000. Would I recommend Ben to friends or family? darn tootin! If I were trying to buy a house in Olympia, Ben would be my agent!"',
    },
    {
      src: '',
      text: '"Ben is awesome - he has helped me buy and sell 2 homes in Olympia and Ocean Shores. His in-depth knowledge of the South Sound makes him an invaluable resource He\'s a negotiation pro and goes above and beyond in every way  - including helping to relocate a massive antique stove, making the trek out to the beach,and navigating details of a house sale and purchase!"',
    },
    {
      src: '',
      text: '"We were lucky to find Ben for our first home. He was always available when we wanted to see a home even if it was last minute. He is extremely knowledgeable on building practices and products which was comforting as first time home buyers. If you\'re looking for someone who is respectful, knowledgeable and fun to be around, Ben is the right person for you."',
    }
]

// DOM Node Factory
appendClasses = (el, styleClasses, op) => {
  styleClasses.forEach((classStyle) => {
    op === 'add' ? el.classList.add(classStyle) : 
    op === 'remove' ? el.classList.remove(classStyle): null
  })
}

defineNodeAttribute = (node, attr, value) => {
  let link = document.createAttribute(attr)
  link.value = value
  node.setAttributeNode(link)
}

nodeId = (type, node, DOMId, idx, el) => {
  let id = document.createAttribute('id')
  id.value = `${DOMId}${idx + 1}`
  node.setAttributeNode(id)
  DOMId === 'carousel-item' ? defineNodeAttribute(node, 'style', 'display: none') : appendClasses(node, ['inactive'], 'add')
}

newNode = (type, DOMId, el, idx) => {
  let node = document.createElement(type)
  nodeId(type, node, DOMId, idx, el)
  return { node }
}

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
    togglePrevious(carousel.listSize - 1)
    toggleNext(idx)
  }
}

decrementCounter = (idx) => {
  togglePrevious(idx + 1)
  toggleNext(idx)
}

// ====================

// DOM appendage  ====================
let carousel = new List()
let nodeList = []
let counterRoot = document.getElementById('counter')
let root = document.getElementById('root')

carousel_data.forEach((el, idx) => {
  nodeList.push(newNode('div','carousel-item', el, idx))
})

nodeList.forEach((el, idx) => {
  let img = document.createElement('img')
  let review = document.createElement('p')
  let counter = newNode('div', 'counter-item', {}, idx)
  
  img.src = carousel_data[idx].src
  review.innerText = carousel_data[idx].text
  
  el.node.appendChild(img)
  el.node.appendChild(review)
  counterRoot.appendChild(counter.node)
})

carousel.populate(nodeList)

for (let i = 0; i < carousel.dataStore.length; i++){
  root.appendChild(carousel.dataStore[i].node)
}

toggleNext(0)

document.querySelector('.next').addEventListener('click', () => {
  carousel.next();
  incrementCounter(carousel.pos);
});

document.querySelector('.prev').addEventListener('click', () => {
  carousel.prev();
  decrementCounter(carousel.pos);
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

window.onresize = resizeHandler;
// ====================