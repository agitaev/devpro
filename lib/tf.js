const tf = require('@tensorflow/tfjs-node');
const { importUsers, importTags, tagsToArray } = require('./utils');

// create an architecture
const model = tf.sequential();

// create dense "fully connected" layers
// units       => no. tags
// inputShape  => no. attributes
const hiddenLayer = tf.layers.dense({
	units: 4, // no. of users
	inputShape: [5], // no. of tags
	activation: 'sigmoid',
});
const outputLayer = tf.layers.dense({ units: 5 });

model.add(hiddenLayer);
model.add(outputLayer);

// compile configurations
// optimizer function: Stochastic Gradient Descent
// loss function: Mean Squared Error
const learningRate = 0.01;
const optimizer = tf.train.sgd(learningRate);
const loss = tf.losses.meanSquaredError;

model.compile({ optimizer, loss });

// train models
const xs = tf.tensor2d([
	[0, 0, 1, 1, 0],
	[1, 0, 0, 1, 0],
	[0, 1, 1, 1, 0],
	[0, 1, 0, 1, 0],
]);

const ys = tf.tensor2d([
	[0, 1, 1, 1, 0],
	[1, 1, 0, 1, 0],
	[0, 0, 1, 1, 0],
	[1, 1, 1, 0, 1],
]);

const train = async () => {
	const trainConfig = {
		verbose: 1,
		epochs: 4,
		shuffle: true,
	};

	for (let i = 0; i < 100; i++) {
		const history = await model
			.fit(xs, ys, trainConfig)
			.then((res) => console.log(res.history.loss[0]));
	}
};
