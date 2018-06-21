import { Counter, MyCounter } from './counter.js'

class MultipleCounter extends Array {
  push(options={defaultCount:0}) {
    return super.push(new Counter(options.defaultCount))
  }
  last() {
    return this[this.length-1]
  }
}

const template = `
  <button>add</button>
  <button>rem</button>
  <button>log</button>
  <hr>
  <div class="counters"></div>
`

const makeProxy = that => new Proxy(that.model, {
  set(target, property, value, receiver) {
    target[property] = value
    if (property == 'length') {
      const c = that.counters.querySelectorAll('my-counter')
      if (value != c.length) c[c.length-1].remove()
    } else {
      that.counters.appendChild(new MyCounter(target[property]))
    }
    return true
  }
})

class MyMultipleCounter extends HTMLElement {
  constructor(multipleCounter) {
    super()
    this.model = multipleCounter || new MultipleCounter()
    this.proxy = makeProxy(this)
    this.attachShadow({mode:'open'})
    this.shadowRoot.innerHTML = template
    const shadow = this.shadowRoot
    const buttons = shadow.querySelectorAll('button')
    buttons[0].addEventListener('click', () => this.push())
    buttons[1].addEventListener('click', () => this.pop())
    buttons[2].addEventListener('click', () => this.log())
    this.counters = shadow.querySelector('.counters')
  }
  push(options={defaultCount:0}) {
    this.proxy.push(options)
  }
  pop() {
    this.proxy.pop()
  }
  log() {
    console.log(this.proxy)
  }
}

customElements.define('my-multiple-counter', MyMultipleCounter)

export { MyCounter, MyMultipleCounter }