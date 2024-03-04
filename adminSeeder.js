const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const env = require('dotenv').config();
const adminModel = require('./model/adminModel'); // Updated import statement

mongoose.connect(`mongodb+srv://siyad:12345@siyad-cluster.gvtvydb.mongodb.net/Ecommerce-SamsungStore?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Mongo connection opened");
  })
  .catch((err) => {
    console.error(err);
  });

const seedAdmin = [
  {
    userName: 'Samsung',
    email: 'samsungstore@gmail.com',
  }
];

const seedDb = async () => {
  try {
    const hashedPassword = await bcrypt.hash("password", 10);

    seedAdmin[0].password = hashedPassword;

    await adminModel.insertMany(seedAdmin);

    console.log("Seeding complete");
  } catch (error) {
    console.error("Error seeding database:", error.message);
  } finally {
    mongoose.connection.close();
  }
};

seedDb();
