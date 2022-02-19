# Biscord 

The most advance framework yet.

[![created by](https://img.shields.io/badge/Created%20By-Vinzerr-blue.svg?longCache=true&style=flat)](https://github.com/Vinzerr) [![Discord](https://img.shields.io/discord/944534636250406912?color=%235865F2&label=Discord&logo=discord&logoColor=white&style=flat)](https://discord.gg/PBjknh5vVC) ![Downloads](https://img.shields.io/npm/dt/biscord?color=blue)

## Getting Started

### Installation And Update

Install and update bicord via NPM.

```bash
  npm install biscord
```

```bash
  npm update biscord
```

### Basic Start Up

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

    ( var Client ... ), it is optional to add an 
    assignment on the initialization process.

    And you're all set! Your bot will be online.

  */

```

For more functions visit our Documentation.

## Important Links

[![docs](https://img.shields.io/badge/docs-discord.js.org-blue.svg?longCache=true&style=for-the-badge)](discord.js.org) <br>
[![guide](https://img.shields.io/badge/guide-discord.js.org/guide-green.svg?longCache=true&style=for-the-badge)](discord.js.org/guide) <br>
[![repository](https://img.shields.io/badge/repositoy-github.com/Vinzerr/biscord-lightgray.svg?longCache=true&style=for-the-badge)](https://github.com/Vinzerr/biscord) <br>

## Contribution & Supporters

[![BuyMeACoffee](https://img.shields.io/badge/Buymeacoffee-%23FFDD00.svg?&style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoff.ee/vinzerr)

#### Contribution

If you encounter an error or wish for an improvement of biscord, you may request a pull and push on our repository.

#### Supporters

Unable to buy me a book? Don't worry! You can instead nominate me for a __[GitHub Star](https://stars.github.com/nominate)__ instead ^-^.