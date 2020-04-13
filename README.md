# User Manual

> Deployed application can be found at https://devpro-v2.herokuapp.com

### Prerequisites

- Node.js v10.16.0 and higher
- Git v2.25.0 and higher
- Terminal/Command Line
- Heroku CLI (only for deployment)

### Installation

The following codes should be executed one at a time.

1. Clone GitHub repository:

```sh
$ git clone https://github.com/agitaev/devpro.git
$ cd devpro/
```

2. Install dependencies:

```sh
$ npm install && cd client/ && npm install && cd ..
```

3. Run development server:

```sh
$ npm run dev MONGODB_URI=mongodb://admin:agitaev5494@ds125041.mlab.com:25041/devpro_v2
```

If the last command didn’t open the browser automatically, then navigate to http://localhost:3000 in any browser.

### Running Lighthouse Audits

1. Install Lighthouse:

```sh
$ sudo npm install -g lighthouse
```

2. Run Lighthouse:

```sh
$ lighthouse https://devpro-v2.herokuapp.com/ --verbose –view
```

### Deployment

1. Login to Heroku account:

```sh
$ heroku login
```

2. Create new application in Heroku:

```sh
$ heroku create agitaev-s-software
```

3. Add remote branch:

```sh
$ heroku git:remote -a agitaev-s-software
```

4. Deploy to Heroku:

```sh
$ git add . && git commit -m ‘testing deployment’ && git push heroku master
```

After successful deployment, you can execute following command to see logs:

```sh
$ heroku logs –tail
```
