class Counter {
  constructor(defaultCount=0) {
    this._defaultCount = defaultCount
    this.reset()
  }
  get defaultCount() {
    return this._defaultCount
  }
  reset() {
    this.count = this.defaultCount
  }
  up(by=1) {
    this.count += by
  }
  down(by=1) {
    this.count -= by
  }
}

const template = `
  <div class="counter">
    <div><slot></slot></div>
    <button>+</button><button>-</button>
  </div>
`

const CounterProxy = element => new Proxy(element.model, {
  set(target, property, value, receiver) {
    target[property] = value
    element.textContent = value
    return true
  }
})

class MyCounter extends HTMLElement {
  constructor(counter) {
    super()
    this.model = counter || new Counter(Number(this.textContent.trim()))
    this.proxy = CounterProxy(this)
    this.textContent = this.proxy.count
    this.attachShadow({mode:'open'})
    this.shadowRoot.innerHTML = template
    const buttons = this.shadowRoot.querySelectorAll('button')
    buttons[0].addEventListener('click', () => this.proxy.up(1))
    buttons[1].addEventListener('click', () => this.proxy.down(1))
  }
}

customElements.define('my-counter', MyCounter)

export { Counter, MyCounter }
