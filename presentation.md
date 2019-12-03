
# Lodash

## What is lodash?

Lodash - is a JavaScript library which provides utility functions for common programming tasks using the functional programming paradigm.

Lodash is instant productivity kit when you’re working with JavaScript

## History?

In 2009 Underscore.js (common JS library) was first released and, for a guite long period of time, played first fiddle. Nowdays it has been retaken by Lodash.

Lodash draws most of its ideas from Underscore.js and now receives maintenance from the original contributors to Underscore.js.

## Quick install

1. Go to project folder

2. Initialize package (if haven't yet)

	```bash
	npm init
	```

3. Install Lodash into your package

	```bash
	npm install lodash
	```
4. Add script to your html file with script tag

	```html
	<script src="lodash.js"></script>
	```


## Lodash structure

Lodash has a groups of general functions for simplifying common programming tasks. Including functions for:

1. Array
2. Collection
3. Date
4. Function
5. Lang
6. Math
7. Number
8. Object
9. Seq
10. String
11. Util
12. Properties
13. Methods


## Do I need Lodash?

### Advantages:
* improves style of code
* highly readable
* increases programmer's productivity
* extends built into JS methods

### Disadvantages:
* you'll probably like this library and use it all over
* library overuse may lead to worse performance

It's useful and awesome. You just shouldn't get into it so much. Remember that JS itself still provides a lot of methods on its own. Its Lodash features that JS doesn't have, that you should definitely use when needed.

## Lets look at it

### Array

Naturally, all Lodash array methods works on... arrays. It's probably the biggest collection of Lodash methods, and for good reason. It includes methods allowing you to easily get the difference of two arrays `_.difference()`, ensures all values are unique `_.uniq()`, and remove any of them with ease `_.remove()`. Just remember that there are some "useless" methods too. Examples of such are `_.join()`, `_.reverse()`, and `_.indexOf()` - all of which are natively built into JS in the same form! With ES6 this list becomes even longer!

### Collection

Collection, in Lodash vocabulary, seems to be used to reference an object or an array (sometimes even a string). And this group includes methods that can be used to work with them. Combining the ease-of-use of array methods with objects can be especially useful. Of course, such collections even with nice API cannot be considered a data structure on its own. E.g. when iterating over an object, you cannot be sure of the order of its properties (like with arrays). If real data structures are what you want, then you might have to use a different library (e.g. Immutable.js). Otherwise, these methods truly simplify any kind of interaction with objects (arrays have most of these methods built-in).

### Date

When it comes to date collection, there's only one, "useless" method -  `_.now()`. Just don't bother at all and, please, use  `Date.now()`  instead.


### Function

Function collection most probably includes some of the most complex methods. Here, Lodash provides us with many helpful shorthands for some of the functions-related stuff. Examples of this include often used  **throttling** and  **memoization**. Of course, these methods may not be used as often as others, but definitely provides something that's (mostly) not available in vanilla JS in such  **convenient form**.

### Lang

Lang collection is very diversified. It contains methods that work on a variety of data types. These cover various  **is checks**  (e.g.  `_.isArray()`_,_ `_.isNumber()`),  **value conversions**  (e.g.  `_.toNumber()`,  `_.toString()`),  **cloning**  and  **deep cloning**  functionalities. While the first two categories don't require much boilerplate when used with plain JS (recommended), the cloning methods are very useful. They provide a nice alternative for unavailable in some browsers  `Object.assign()`, and, when it comes to the deep version, they provide features that even mentioned native method doesn't cover!

### Math

While I will leave using Lodash methods like  `_.add()`  without a comment 😅, methods from Math collection that operates on  **number arrays**  can prove to be quite useful. Of course, you can just use the native  `.map()`  or  `.reduce()`  methods from built-in Array API, but, arguably, the convenience of just calling e.g.  `_.max()`  or  `_.mean()`  is just too high to ignore.

### Number

Number collection, in fact, includes only 3 methods i.e.  `_.clamp()`,  `_.inRange()`  and  `_.random()`, all of which provide some casual functionalities with  **additional features**. Take  `_.random()`  for example. Instead of outputting completely random number (like usual), you can easily limit it to a  **certain range**  and decide whether you want it to be an  **integer or floating-point**  number with just a simple set of arguments. It is for such details that many developers have fallen in love with Lodash.

### Object

Object collection, just like the array one, groups methods that work primarily on objects. What about their usefulness? Well, I can say that there actually are quite a few methods here that I find really helpful (in between numerous native API duplicates). Pretty much all of them are connected with the  **iteration capabilities**, highly limited in native API. Other than that, methods for  **object assignment**  (remember native  `Object.assign()`),  **merging**,  **cloning**  and  **differentiating**  (from Collection methods) are very useful too.

### Seq

Seq is a collection of prototype methods, centered around one functionality -  **Lodash value wrapper**  `_()`! With such wrapper in place, you can omit the repeating  `_.`  and use your methods directly on your value (e.g.  `_(1).add(1)`) - now that's something! And, imagine how good can it feel to use such wrapper, especially with some  **chainable methods**! Of course, you should use it with care, as creating many Lodash wrappers can result in  **high memory usage**, and thus -  **lower performance**. Other functionalities from seq collection are meant to be used with mentioned wrappers.

### String

Beyond providing standard, native API copies, methods from string collection cover some pretty useful capabilities. I'm mainly talking about converting between  **different case types**, which may seem really easy but isn't implemented natively, requiring developers to create quite a big boilerplate for such simple cases.  Of course, there are also methods for **swapping letters)** - `_.deburr()`,  **string-array conversion** - `_.words()`,  **regex integration** - `_.replace()`  and more, but still... it's not really something that would require much effort in plain JS.

### Util

The last important collection of methods in Lodash is called utils. And, as the name suggests, there isn't really any rule that groups all this stuff together. Thus, there's almost no method that has its direct native equivalent... which is good. Here, beyond all the useful stuff, there are some methods that make me smile, e.g.  `_.noop()`  with all it does is simply  **returning undefined**. You wanted to know how far you can go with using Lodash - here's the answer.

### Links
- [Documentation](https://lodash.com/docs/4.17.15)
- [Lodash tutorial](http://zetcode.com/javascript/lodash/)
- [Article: "10 Lodash functions everyone should know"](https://medium.com/voobans-tech-stories/10-lodash-functions-everyone-should-know-334b372aec5d)
- [Article: "Lodash: 10 Javascript Utility Functions That You Should Probably Stop Rewriting"](https://colintoh.com/blog/lodash-10-javascript-utility-functions-stop-rewriting)
