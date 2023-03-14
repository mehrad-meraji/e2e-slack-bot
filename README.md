# Daemon Bot Slack
A slack bot to manage some tasks in a slack channel.

## Installation
1. Clone the repository
```bash
$ git clone https://github.com/tpl-eservices/daemon-bot-slack.git
```
2. Install the dependencies with `npm install`
3. Create a new bot in slack
4. Create a new file called `.env`
5. Add the following variables to the `.env` file
```
SLACK_BOT_TOKEN=xoxb-SOME_SLACK_BOT_TOKEN
SLACK_SIGNING_SECRET=SOME_SLACK_SIGNING_SECRET
SLACK_APP_TOKEN=xapp-SOME_SLACK_APP_TOKEN
```

## Running the app
```bash
# development
$ npm run start:dev
```
```bash
# production
$ npm run start:prod
```

## Test
```bash
# unit tests
$ npm run test
```
```bash
# e2e tests
$ npm run test:e2e
```
```bash
# test coverage
$ npm run test:cov
```

