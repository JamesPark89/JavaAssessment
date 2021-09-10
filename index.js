const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const allData =[]
const Database = require('nedb')
app.use(express.static('public'));
app.use(bodyParser.json());

const database = new Database('database.db');
database.loadDatabase();

app.post('/api',(req,res)=>{
  const data = req.body
  database.insert(data)
  res.json(data)
})
app.get('/api',(req,res)=>{
  database.find({},(err,data)=>{
    if(err){
      res.end();
    }
    res.json(data)
  })
})

app.listen(3000, ()=> console.log('listening on port 3000'))