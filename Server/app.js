const express = require('express');

const app = express();

const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

const cors = require('cors');

const dbUrl = 'mongodb://127.0.0.1/27017';

app.use(express.json());
app.use(cors());

MongoClient.connect(dbUrl, (error, client) => {
	if (error) {
		return console.log(error);
	}

	db = client.db('Node-Test');
});

//GET all Cuisines
app.get('/cuisine', (req, res) => {
	db.collection('restaurants').find({}, { projection: { cuisine: 1 } }).toArray((error, cuisine) => {
		if (error) {
			return console.log(error);
		}

		res.json(cuisine);
	});
});

//GET particular Cuisines
app.get('/cuisine/:name', (req, res) => {
	db.collection('restaurants').find({ cuisine: req.params.name }).toArray((error, restaurant) => {
		if (error) {
			return console.log(error);
		}

		res.json(restaurant);
	});
});

//POST - Validate User
app.post('/user', (req, res) => {
	db.collection('users').findOne({ username: req.body['username'] }, (error, user) => {
		if (error) {
			return console.log(error);
		}

		if (user) {
			if (user['password'] !== req.body['password']) {
				res.send({
					status: 'invalid password',
					msg: 'Invalid Password'
				});
			} else {
				res.send({
					status: 'success',
					msg: 'User exists! Login Successful'
				});
			}
		} else {
			res.send({
				status: 'no user',
				msg: 'User does not exist'
			});
		}
	});
});

//POST - Add User
app.post('/addUser', (req, res) => {
	db.collection('users').insertOne(req.body, (error, result) => {
		if (error) {
			return console.log(error);
		}
		res.send({
			status: true,
			msg: 'User added to Database'
		});
	});
});

app.listen(3003, (error) => {
	if (error) {
		return console.log('Error establishing connection to server!');
	}

	console.log('Server is up and running on port 3003');
});
