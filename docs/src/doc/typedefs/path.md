# Path

Path to your folders and files, path will start from your root directory.

> **Root Directory**: The directory where your main file ( index.js or start file ) is.

## Examples

`Root Directory / index.js` <br>
`Root Directory / commands / help.js ` <br> 
`Root Directory / commands / ban.js ` <br>

```javascript

  var Handler = new Biscord.<Handler>( '/commands' );

```

`Root Directory / index.js` <br>
`Root Directory / resources /commands / help.js ` <br> 
`Root Directory / resources / commands / ban.js ` <br>

```javascript

  var Handler = new Biscord.<Handler>( '/resources/commands' );

```

## Handled Categories

`Root Directory / index.js` <br>
`Root Directory / resources /commands / information / help.js ` <br> 
`Root Directory / resources / commands / ban.js ` <br>

Handler that supports Handled Categories ( base folder with another folder inside ) detects folder and files.

The packgae will automatically read the category files and register them.
