# Biscord

Construct Biscord framework for your Discord Bot.

## Installation

```bash

  # Install

  npm install biscord

  # Update

  npm update biscord

```

## New Instance

```javascript

  var biscord = require('biscord');

  var Biscord = new biscord( Token , ClientOptions );

```

| Parameter        | Optional     | Description       |
| :------------- | :-------------: | :------------- |
| [Token](https://www.writebots.com/discord-bot-token/#:~:text=A%20Discord%20Bot%20Token%20is,in%20turn%20controls%20bot%20actions.) | false | Your Discord Bot application token. |
| [ClientOptions](https://discord.js.org/#/docs/discord.js/stable/typedef/ClientOptions) | true | Client Options for Discord Bot Client. |

Returns: [Client Object](https://discord.js.org/#/docs/main/stable/class/Client)

## Initializing

::: warning
  Before you intialize your Client, make sure the managers you wish to use is constructed.
:::

To add Managers visit the [Managers](/doc/classes/managers) section.

Initialize your Biscord Client to put in online.

```javascript

  Biscord.intialize();

```
Returns: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)<Boolean , Client>

## Event Methods

Biscord supports Event Listener and Emitter, read more at [Events](/doc/typedefs/events.md).

| Event   | Parameters | Descripiton |
| :-----: | :--------: | ----------- |
| ready | None | The client is ready. |
| destroy | None | The client was destroyed. |