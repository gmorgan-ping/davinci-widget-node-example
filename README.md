# PingOne DaVinci Sample Flow Embed

This glitch application allows you to embed your PingOne DaVinci widget within an HTML page while protecting your API key.

## skdToken

The access token is retrieved server-side (server.js), then passed to the HTML page

## Env Vars

When you remix a Glitch project, environment variables are not copied over to your new app. You'll
need to create the following variables and set their values for your flow policy.

- BASE_URL
  - The base url for your environment's API service (eg. https://orch-training-examples-api.pingidentity-sk.com)
- COMPANY_ID
- API_KEY
- POLICY_ID

## Glitch Project
https://glitch.com/~davinci-widget-node-example

## GitHub Repo
https://github.com/gmorgan-ping/davinci-widget-node-example
