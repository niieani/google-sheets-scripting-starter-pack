# Google Sheets Scripting Starter Pack

Everything to get you quickly up and running with modern tooling that supports imports and
exports right inside of your Google Spreadsheet scripts (Google Apps Script).

## Features

All of below technologies preconfigured to work with Google Apps Script:

- TypeScript
- rollup (for imports and exports)
- axios as a standardized fetch library (instead of the Google proprietary fetch)
- jest
- clasp
- some example code

## quick start

- Clone the repo.
- Run `yarn`
- Authenticate with your Google Account: `yarn google:login`
- Ensure your Google account allows API access, by [switching it on](https://script.google.com/home/usersettings)
- Create the linked Spreadsheet in your account: `yarn google:create --title "My new Spreadsheet"`
- Publish the code after making changes using: `yarn google:publish`
- Follow [Google's developer
  reference](https://developers.google.com/apps-script/reference/spreadsheet)
  and their [guides](https://developers.google.com/apps-script/overview),
  but remember to `export` the functions in `index.ts` to expose them.
- Remember to set relevant `oauthScopes` in `build/appsscript.json`
