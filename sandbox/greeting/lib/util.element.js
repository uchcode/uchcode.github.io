export const output = (...args) => {
  const e = document.createElement('pre')
  e.className = 'output'
  e.textContent = args.reduce((a,b)=>a+' '+b,'')
  document.body.appendChild(e)
}

export const setProperties = (element, properties) => {
  for (const k in properties) {
    switch (k) {
      case 'className': {
        if (Array.isArray(properties.className)) {
          element.className = properties.className.join(' ')
        } else {
          element.className = properties.className
        }
        break
      }
      case 'style': {
        if ('object' == typeof properties.style) {
          Object.assign(element.style, properties.style)
        } else {
          element.setAttribute('style', properties.style)
        }
        break
      }
      case 'dataset': {
        Object.assign(element.dataset, properties.dataset)
        break
      }
      default: {
        element[k] = properties[k]
        break
      }
    }
  }
}

export const setLayoutPropeties = (element, properties) => {
  if (!properties.position) return
  const position = properties.position
  
  //console.log(window.getComputedStyle(element).display)
  if (window.getComputedStyle(element).display == 'block') {
    element.style.width = '100%'
  }
  element.style.position  = 'absolute'
  
  if (position.top)    element.style.top    = position.top
  if (position.left)   element.style.left   = position.left
  if (position.bottom) element.style.bottom = position.bottom
  if (position.right)  element.style.right  = position.right
  
  if (!!position.x || !!position.y) {
    element.style.transform = 'translate(-50%, -50%)'
    element.style.textAlign = 'center'
    if (!position.top && !position.bottom) {
      element.style.top  = position.y ? `calc(50% + ${position.y})` : '50%'
      if (!element.style.top) element.style.top = '50%'
    }
    if (!position.left && !position.right) {
      element.style.left = position.x ? `calc(50% + ${position.x})` : '50%'
      if (!element.style.left) element.style.left = '50%'
    }
  }
  
  if ( (!!position.x || !!position.y) && (!!position.top || !!position.bottom || !!position.left || !!position.right) ) {
    if ( !!position.x && (!!position.top || !!position.bottom) ) {
      element.style.transform = 'translate(-50%, 0)'
    } else {
      element.style.transform = 'translate(0, -50%)'
    }
  }
  
  //console.log(element.style.position, element.style.transform)
  //console.log(element.style.top, element.style.left, element.style.bottom, element.style.right, '\n')
}

export const assign = (selector, properties) => {
  const e = selector instanceof HTMLElement ? selector : document.querySelector(selector)
  setLayoutPropeties(e, properties)
  setProperties(e, properties)
  return e
}

export const create = (tagName, properties) => {
  const e = document.createElement(tagName)
  setLayoutPropeties(e, properties)
  setProperties(e, properties)
  document.body.appendChild(e)
  return e
}
