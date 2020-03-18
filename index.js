const express = require('express');
const bodyParser = require('body-parser');

const app = express();
require('./db/mongoose');

app.use(bodyParser.json());

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
	console.log(`app running on port ${PORT}`);
});
