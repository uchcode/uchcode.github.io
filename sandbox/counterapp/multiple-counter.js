import { Counter, MyCounter } from './counter.js'

const template = `
  <button>add</button>
  <button>rem</button>
  <button>info</button>
  <hr>
  <div class="counters"></div>
`

class MultipleCounter extends Array {
  push(options={defaultCount:0}) {
    return super.push(new Counter(options.defaultCount))
  }
}

const MultipleCounterProxy = element => new Proxy(element.model, {
  set(target, property, value, receiver) {
    target[property] = value
    const counters = element.shadowRoot.querySelector('.counters')
    if (property == 'length') {
      const c = counters.querySelectorAll('my-counter')
      if (value != c.length) c[c.length-1].remove()
    } else {
      counters.appendChild(new MyCounter(target[property]))
    }
    return true
  }
})

class MyMultipleCounter extends HTMLElement {
  constructor(multipleCounter) {
    super()
    this.model = multipleCounter || new MultipleCounter()
    this.proxy = MultipleCounterProxy(this)
    this.attachShadow({mode:'open'})
    this.shadowRoot.innerHTML = template
    const buttons = this.shadowRoot.querySelectorAll('button')
    buttons[0].addEventListener('click', () => this.proxy.push())
    buttons[1].addEventListener('click', () => this.proxy.pop())
    buttons[2].addEventListener('click', () => this.info())
  }
  info() {
    console.info(this.proxy)
  }
}

customElements.define('my-multiple-counter', MyMultipleCounter)

export { MyCounter, MyMultipleCounter }
