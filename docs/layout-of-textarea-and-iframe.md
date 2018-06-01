# textareaとiframeのレイアウトのコツ

ポイントは`height`で、`継承できる%以外の値`で制御する。

```
<style>
  /* theme */
  textarea-wrapper {
    font-family:monospace;
  }
  iframe-wrapper {
    box-shadow:0 0 8px #dfdfdf;
  }
  /* layout */
  custom-component {
    display:block;
  }
  textarea-wrapper>textarea,iframe-wrapper>iframe {
    resize:none;
    margin:0; padding:0; border:0;
    width:100%; height:100%;
  }
  textarea-wrapper {
    display:block;
    padding:0px; height:100%;
  }
  iframe-wrapper {
    display:block;
    padding:0px; height:100%;
  }
  @media screen and (max-width: 499px) {
    textarea-wrapper {
      margin-top:1em;
    }
  }
  @media screen and (min-width: 500px) {
    textarea-wrapper {
      float:left;
      width:48%;          
    }
    iframe-wrapper {
      float:right;
      width:50%;          
    }
  }
</style>

<style>
  @media screen and (max-width: 499px) {
    custom-component {
      height:200px;
    }
  }
  @media screen and (min-width: 500px) {
    custom-component {
      /*
      height:300px;
      */
      position:fixed;
      top:10em; right:1em; bottom:1em; left:1em;
    }
  }
</style>
<custom-component>
  <iframe-wrapper><iframe></iframe></iframe-wrapper>
  <textarea-wrapper><textarea>a</textarea></textarea-wrapper>
</custom-component>
```
