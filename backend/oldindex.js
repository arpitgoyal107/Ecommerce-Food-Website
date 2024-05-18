// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  
  async function run() {
    try {
      await client.connect();
  
      // database & collections
      const menuCollections = client.db("foodi-client").collection("menus");
      const cartCollections = client.db("foodi-client").collection("cartItems");
  
      // all menu items operations
      app.get('/menu', async (req, res) => {
        const menuItems = await menuCollections.find().toArray();
        res.send(menuItems);
      })
  
      // all cart items operations
  
      // posting cart to db
      app.post('/cart', async (req, res) => {
        const cartItem = req.body;
        const result = await cartCollections.insertOne(cartItem);
        res.send(result);
      })
  
      // get cart using email
      app.get('/cart', async (req, res) => {
        const email = req.query.email;
        const filter = { email: email}
        const cartItems = await cartCollections.find(filter).toArray();
        res.send(cartItems);
      })
  
      // get specific cart item
      app.get('/cart/:id', async (req, res) => {
        const id = req.params.id;
        const filter = { _id: new ObjectId(id)}
        const cartItem = await cartCollections.findOne(filter);
        res.send(cartItem);
      })
  
      // delete cart item
      app.delete('/cart/:id', async (req, res) => {
        const id = req.params.id;
        const filter = { _id: new ObjectId(id)}
        const result = await cartCollections.deleteOne(filter);
        res.send(result);
      })
  
      // update cart quantity
      app.put('/cart/:id', async (req, res) => {
        const id = req.params.id;
        const {quantity} = req.body;
        const filter = { _id: new ObjectId(id)}
        const options = { upsert: true }
        const updateDoc = {
          $set: {
            quantity: parseInt(quantity, 10)
          }
        }
        const result = await cartCollections.updateOne(filter, updateDoc, options);
        res.send(result);
      })
  
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
      // await client.close();
    }
  }
  run().catch(console.dir);