docs
====

もしかしてタイトルはなしでいきなり始めていいんじゃね？

嘘でした。タイトルは必要でした。


```js
var Person = function (firstname, lastname, age) {
  this.firstName = firstname;
  this.lastName = lastname;
  this.age = age;
  
  this.setAge = function (age) {
    this.age = age;
  };
  
  this.toString = function () {
    return ["Hi ! I'm ", this.firstName, " ", this.lastName, " and I'm ", this.age, " year old."].join("");
  };
};
```
