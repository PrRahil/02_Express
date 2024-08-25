import express from "express";

const app = express();

const port = 3000;

app.use(express.json());

let data = [];
let nextId = 1;

//#TODO: Adding new item
app.post("/product", (req, res) => {
  const { name, price } = req.body;
  const newItem = { id: nextId++, name, price };
  data.push(newItem);
  res.status(201).send(newItem);
});

//#TODO: Get item with id
app.get("/product/:id", (req, res) => {
  const item = data.find((i) => i.id === parseInt(req.params.id));
  if (!item) {
    return res.status(404).send("Item not found");
  }
  res.status(200).send(item);
});

//#TODO: Get all items
app.get("/product", (req, res) => {
  res.status(200).send(data);
});

//#TODO: Update item
app.put("/product/:id", (req, res) => {
  const item = data.find((i) => i.id === parseInt(req.params.id));

  if (!item) {
    return res.status(404).send("Item not found while updating");
  }
  const { name, price } = req.body;
  item.name = name;
  item.price = price;
  res.status(200).send(item);
});

//#TODO: Delete item
app.delete("/product/:id", (req,res) => {
    const index =req.params.id //#FIXME: indexing start from Zero , whether we shoul use data.find((i) => i.id === (req.params.id)); ??
    
    if(index === -1)
            return res.status(404).send("Item not found while deleting")
    data.splice(index,1)
    return res.status(204).send("Item Deleted")
})

app.listen(port, () => {
  console.log(`server running at ${port}....`);
});

app.get("/", (req, res) => {
  res.send("Hello there !!");
});

app.get("/login", (req, res) => {
  res.send("login here !!");
});
