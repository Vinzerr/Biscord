# Getting Started


## Installation

::: warning
  AutoBot is currently in heavy development, bugs and errors is expected in early released versions.
:::

As we have already read the [Introduction](/doc/introduction/) , you might have already installed AutoBot, incase if you haven't. You can install and update AutoBot from npm.

```bash

  # Install

  npm install biscord

  # Update

  npm update biscord

```

## Constructing AutoBot

To start autobot we first need your [Token](https://www.writebots.com/discord-bot-token/#:~:text=A%20Discord%20Bot%20Token%20is,in%20turn%20controls%20bot%20actions.) and [ClientOptions](https://discord.js.org/#/docs/discord.js/stable/typedef/ClientOptions).

```javascript

  var biscord = require('biscord);
  var Biscord = new biscord( Token , Clientoptions );

```

- ClientOptions is optional, if you want to have your own client options you may define this parameter, if not you may leave this empty.

## Initializing

To start your [Client](https://discord.js.org/#/docs/main/stable/class/Client) , you have to manually execute the following, in case you want to start your client by your way.

```javascript

  Biscord.initiliaze( );

```



