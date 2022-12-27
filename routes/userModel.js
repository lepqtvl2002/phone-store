const { MongoClient, ServerApiVersion } = require("mongodb");
const fs = require("fs");
const credentials = "./routes/X509-cert-4641367357363314800.pem";
const client = new MongoClient(
  "mongodb+srv://cluster0.tqz3n44.mongodb.net/?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority",
  {
    sslKey: credentials,
    sslCert: credentials,
    serverApi: ServerApiVersion.v1,
  }
);

async function get(query = {}) {
  try {
    await client.connect();
    const database = client.db("phoneStore");
    const collection = database.collection("users");
    const data = collection.find(query);
    const arr = [];
    await data.forEach((e) => arr.push(e));
    return arr;
    // perform actions using client
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

async function isEmailAlreadyExit(email) {
  try {
    await client.connect();
    const database = client.db("phoneStore");
    const collection = database.collection("users");
    console.log(email);
    const data = collection.find({ email: email });
    let result = false;
    await data.forEach((e) => {
      console.log(e);
      result = true;
    });
    return result;
    // perform actions using client
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

async function isValidate(email, password) {
  try {
    await client.connect();
    const database = client.db("phoneStore");
    const collection = database.collection("users");
    console.log(email, password);
    const data = collection.find({ email: email, password: password });
    let result = false;
    await data.forEach((e) => {
      console.log(e);
      result = true;
    });
    return result;
    // perform actions using client
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

async function create(email, password) {
  try {
    await client.connect();
    const database = client.db("phoneStore");
    const collection = database.collection("users");
    console.log(email, password);
    await collection.insertOne({ email: email, password: password });
    // perform actions using client
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

module.exports = { get, isEmailAlreadyExit, isValidate, create };
