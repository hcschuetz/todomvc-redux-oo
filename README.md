[Redux](https://github.com/rackt/redux)-Based [TodoMVC](http://todomvc.com/) in an Object-Oriented Style
===============================

The first commit of this repository is a copy of the TodoMVC
[example code](https://github.com/rackt/redux) in the Redux repository.

In later commits the business logic (state representation, actions,
reducers) is transformed to an object-oriented style.

A first version used quite a bit of boilerplate code.  In later versions
some utilities have been introduced to reduce the amount of boilerplate
code.

Once `utils.js` is in a reasonable shape it will go to its own
repository.  (`redux-oo` would be an appropriate name.)

Notes:
- Attaching code to data (to the state) makes hot reloading harder: New
  code will not be applied to old objects.  But replaying with
  redux-devtools should work, provided that already the initial state is
  rebuilt with new code.
- ...
