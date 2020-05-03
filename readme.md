## Prerequisites

 Node.js v10.16.0 _or higher_
 Git v2.25.0 _or higher_
 Terminal/Command Line
 Heroku CLI (only for deployment)

## Installation

1. Clone GitHub repository:
   `$ git clone https://github.com/agitaev/devpro.git && cd devpro/`
2. Install dependencies:
   `$ npm install && cd client/ && npm install && cd ..`
3. Run development server:
   `$ npm run dev`
   If the last command didn’t open the browser automatically, then go to
   http://localhost:3000 in any browser.

## Available scripts

- Install client-side application dependencies:
  `$ npm run client-install`

- Run client-side application:
  `$ npm run client`

- Run server-side application:
  `$ npm run server`

- Run development server:
  `$ npm run dev`

- Run Tensorflow testing environment:
  `$ npm run brain`

- Run playground/testing environment:
  `$ npm run play`

## Running Lighthouse audits

1. Install Lighthouse:
   `$ sudo npm install -g lighthouse`
2. Run Lighthouse:
   `$ lighthouse https://devpro-v2.herokuapp.com/ --verbose – view`

## Deployment

Followings commands must be executed in root folder.

1. Login to Heroku account:
   `$ heroku login`
2. Create new application in Heroku:
   `$ heroku create agitaev-s-software`
3. Add remote branch:
   `$ heroku git:remote -a agitaev-s-software`
4. Deploy to Heroku:
   `$ git add . && git commit -m 'testing deployment' && git push heroku master`

   After successful deployment, you can execute following command to see logs:
   `$ heroku logs –tail`
