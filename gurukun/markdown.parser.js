document.addEventListener("DOMContentLoaded", async () => {

    var templateUrl = 'https://uchcode.github.io/gurukun/markdown.template.html'
    var template = await (await fetch(templateUrl)).text()


    var sheet = document.createElement('style')
    var styles = 'body{margin:0;padding:0;}'
    styles += 'iframe{width:100%;height:100%;border:0;}'
    sheet.innerHTML = styles
    document.head.appendChild(sheet);


    var markdown = document.querySelector('noscript').innerText

    var converter = new showdown.Converter({
        emoji: true,
        underline: true,
    })
    converter.setFlavor('github')

    converter.addExtension(function () {
        return [{
            type: 'output',
            regex: /<a\shref.+">/g,
            replace : function (text) {
                var url = text.match(/"(.*?)"/)[1]
                if(url.includes(window.location.hostname) || url[0] == '/' || url[0] == '.' || url[0] == '#'){
                    return text
                }
                return '<a href="' + url + '" target="_blank">'
            }
        }]
    }, 'externalLink')

    converter.addExtension(function () {
        return [{
            type: 'output',
            regex: /<a\shref.+">/g,
            replace : function (text) {
                var url = text.match(/"(.*?)"/)[1]
                if(url.includes(window.location.hostname) || url[0] == '/' || url[0] == '.' || url[0] == '#'){
                    return '<a href="' + url + '" target="_top">'
                }
                return text
            }
        }]
    }, 'internalLink')


    var html = converter.makeHtml(markdown)
    var i = document.createElement('iframe')
    document.body.appendChild(i)
    var d = i.contentWindow.document
    d.open()
    d.write(template.replace('${html}', html))
    d.close()
    document.title = document.title || d.title || d.body.firstElementChild.firstElementChild.innerText.trim()


    //handle hash linking
    setTimeout(function() {
        var hash = window.location.hash
        window.location.hash = ''
        window.location.hash = hash
    }, 100)
})
