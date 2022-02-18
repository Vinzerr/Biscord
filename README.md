# Biscord 

The most advance framework yet.

# Getting Started

## Installation And Update

```bash
  npm install biscord
```

```bash
  npm update biscord
```

## Basic Start Up

```javascript
  var biscord = require('biscord');

  var Biscord = new biscord();

  /*

    You can modify your ClientOptions by .configure function 
    shown below, but this is an optional configuration.

  */

  Biscord.configure({
    intents: [
      // Client Intents
    ]
  })

  var Client = Biscord.initialize( Token < string > );

  /*

    On line 4 ( var Client ... ), it is optional to add an 
    assignment on the initialization process.

    And you're all set! Your bot will be online.

  */

```

For more functions visit our Documentation.

# Important Links

[Documentation](https://biscord.js.org)<br>
[Guide](https://biscord.js.org/guide/)<br>
[Repository](https://github.com/Vinzerr/biscord)