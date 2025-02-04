const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const registrationRoutes = require('./routes/registrationRoutes');


const app = express();
const port = 3000;

const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'personalBudgetTracker';

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));

app.use(authRoutes);

app.use(dashboardRoutes);

app.use(transactionRoutes);

app.use(registrationRoutes); 

async function main() {
  try {
      await client.connect();
      console.log("Connected successfully to MongoDB");
      const db = client.db(dbName);
      const transactionsCollection = db.collection('transactions');

      // Additional routes setup goes here

  } catch (e) {
      console.error(e);
  }
}


main().catch(console.error);

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('login');
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});