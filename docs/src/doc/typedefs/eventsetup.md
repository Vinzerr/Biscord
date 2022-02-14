# Event Setup

Each of your event files should have this inside.

::: tip
  All settings are optional, if it is undefined or empty, default values will be submitted instead
:::

```js

  module.exports = {

    event: 'None' // No default 
    once: false,
  
    async execute ( params ) {
      /*
      You may put your code here to be executed
      when the event is fired.
      */
    }
  }

```

| Parameter | Description |
| :-------- | :---------- |
| event | The name of the event. |
| once | If the file will listen to the event once only. |
| Params ( < [Client Events Params](https://discord.js.org/#/docs/discord.js/stable/class/Client?scrollTo=e-apiRequest) > ) | These values are passed when the event is fired.| 