# Events

Listen to evens from a class or manager.

::: warning
  Some managers doesn't support events , please don't forget to read the classes and managers documentation. Otherwise the classes and managers will emit errors.
:::

::: tip Did you know?
  You can emit and listen to your own events in Biscord? Just use the emit and on method.
  Example: Biscord.emit( 'sunkissed' , --parameters ) , Biscord.on( 'sunkissed' , --parameters )
:::

## Parameters 

The parameter ( parameters ) vary from the events. Different and unique values are passed when an event is executed.

**Client Events**:  Visit [Client Events](https://discord.js.org/#/docs/discord.js/stable/class/Client?scrollTo=e-apiRequest) to view what values are passed when that event is fired.

**Classes & Managers Events**: Read the Class' or Managers documentation to know what in built events are registered.

## Methods

### on

Listens to an event.

```js

  < Class , Manager >.on( 'event' , ( parameters ) => {
    /* 
    You may put your code here to be executed
    when the event fires.
    */
 })

```

### once

Listens to an event once.

```js

  < Class , Manager >.once( 'event' , ( parameters ) => {
     /* 
    You may put your code here to be executed
    when the event fires.
    */
  })

```

### emit

Emits an event.

```js

  < Class , Manager >.emit( 'event' , parameters )

```