---
layout: home
---

<textarea style="border: 1px solid silver;
            padding: 0.5em;
            font-family: monospace;
            position: fixed;
            top   : 1em;
            bottom: 1em;
            left  : 1em;
            right : 1em;"
            contenteditable="true"
            id="editor"><textarea>

<script type="text/javascript">
function enableIndentHandler(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        var elementValue = this.value;
        var selectionEnd = this.selectionEnd;
        var lastIndexOfLineFeed = elementValue.lastIndexOf('\n', selectionEnd-1);
        var isNoneLineFeed = lastIndexOfLineFeed === -1 ? true:false;
        var currentLine = elementValue.substring(lastIndexOfLineFeed, elementValue.length);
        var indentSpace = currentLine.match(/^\s*/gi)[0];
        var contentsBefore = elementValue.substring(0, selectionEnd);
        var contentsAfter = elementValue.substring(selectionEnd, elementValue.length);
        if (isNoneLineFeed) {
            elementValue = contentsBefore + '\n' + indentSpace + contentsAfter;
        } else {
            elementValue = contentsBefore + indentSpace + contentsAfter;
        }
        this.value = elementValue;
        if (isNoneLineFeed) {
            this.setSelectionRange(selectionEnd+indentSpace.length+1, selectionEnd+indentSpace.length+1);
        } else {
            this.setSelectionRange(selectionEnd+indentSpace.length, selectionEnd+indentSpace.length);
        }
    }
}
try {
    Object.defineProperty(Element.prototype, 'enableIndent', {
        get: function() {
            return this._enableIndentValue || false;
        },
        set: function(isEnable=false) {
            if (isEnable) {
                this.addEventListener('keydown', enableIndentHandler, false);
            } else {
                this.removeEventListener('keydown', enableIndentHandler, false);
            }
            this._enableIndentValue = isEnable;
        }
    });
} catch(e) {
    console.log(e);
}
</script>

<script type="text/javascript">
document.querySelector('#editor').enableIndent = true;
</script>
