document.addEventListener('DOMContentLoaded', () => {
  const templateUrl = 'markdown.template.html';
  const style = document.createElement('style');
  style.textContent = 'body{margin:0;padding:0;}iframe{border:0;width:100%;height:100%;}';
  const script = document.createElement('script');
  script.src = 'https://cdn.rawgit.com/chjj/marked/master/marked.min.js';
  script.onload = async () => {
    const i = document.createElement('iframe');
    document.body.appendChild(i);
    const t = await (await fetch(templateUrl)).text();
    const n = document.querySelector('noscript');
    const c = window.marked(n.textContent);
    const d = i.contentWindow.document;
    d.open();
    d.write(t.replace('${content}', c));
    d.close();
    document.title = document.title || d.title || d.body.firstElementChild.innerText.trim();
  };
  document.body.appendChild(style);
  document.body.appendChild(script);
});