---
layout: home
---

<textarea style="font-family:monospace;width:100%;height:100%;"></textarea>

<script>
function enableIndentHandler(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        var elementValue = this.value;
        var selectionEnd = this.selectionEnd;
        var lastIndexOfLineFeed = elementValue.lastIndexOf('\n', selectionEnd-1);
        var isNoneLineFeed = lastIndexOfLineFeed === -1 ? true : false;
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
            var selectionStart = selectionEnd + indentSpace.length + 1;
            var selectionEnd = selectionEnd + indentSpace.length + 1;
        } else {
            var selectionStart = selectionEnd + indentSpace.length;
            var selectionEnd = selectionEnd + indentSpace.length;
        }
        this.setSelectionRange(selectionStart, selectionEnd);
    }
}
try {
    Object.defineProperty(HTMLTextAreaElement.prototype, 'enableIndent', {
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
    console.error(e);
}
</script>

<script>
document.querySelector('textarea').enableIndent = true;
/* or
document.querySelector('textarea').addEventListener('keydown', enableIndentHandler, false);
*/
</script>
