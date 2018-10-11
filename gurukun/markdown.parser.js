document.addEventListener('DOMContentLoaded', function () {

    var sheet = document.createElement('style')
    var styles = 'body{margin:0;padding:0;}'
    styles += 'iframe{width:100%;height:100%;border:0;}'
    sheet.innerHTML = styles


    var script = document.createElement('script')
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/showdown/1.8.6/showdown.min.js'
    script.onload = async function () {

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
                    if(url.includes(window.location.hostname) || url[0] == '/' || url[0] == '.'){
                        return '<a href="' + url + '" target="_top">'
                    }
                    if(url[0] == '#'){
                        return text
                    }
                    return '<a href="' + url + '" target="_blank">'
                }
            }]
        }, 'linkExtension')

        var templateUrl = 'https://uchcode.github.io/gurukun/markdown.template.html'
        var template = await (await fetch(templateUrl)).text()
        var markdown = document.querySelector('noscript').innerText
        var html = converter.makeHtml(markdown)
        var content = template.replace('${html}', html)
        var iframe = document.createElement('iframe')

        document.body.appendChild(iframe)

        var doc = iframe.contentWindow.document
        doc.open()
        doc.write(content)
        doc.close()
        document.title = document.title || doc.title || doc.body.firstElementChild.firstElementChild.innerText.trim()

        //handle hash linking
        setTimeout(function() {
            var hash = window.location.hash
            window.location.hash = ''
            window.location.hash = hash
            iframe.contentWindow.location.hash = ''
            iframe.contentWindow.location.hash = hash
        }, 100)
    }


    document.head.appendChild(sheet)
    document.body.appendChild(script)
})
