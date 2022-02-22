const express = require('express');
const app = express();
const axios = require('axios').default;
require('dotenv').config();

const baseUrl = process.env.BASEURL
const PORT = process.env.PORT || 3000;
var url = ''

app.get("/",(req, res) => {
    res.send({
      "home route": "/api",
      "Search specific place": "/api/goa",
      "data limit": "/api/goa?limit=10" 
    })
})


app.get("/api", (req, res) => {
  axios.get(baseUrl)
    .then(function (response) {
      res.send({
        "status": 200,
        "message": "ok",
        "data": response.data
      })
    })
    .catch(function (error) {
      console.log(error);
      res.send({
        "status": 500,
        "message": "Failed",
      })
    })
})

app.get("/api/:place", (req, res) => {
  url = `${baseUrl}?pattern=${req.params.place}`
  if(req.query.limit){
    url = `${url}&limit=${req.query.limit}`;
  }else{
    url = `${url}`;
  }
  axios.get(url)
    .then(function (response) {
      res.send({
        "status": 200,
        "message": "ok",
        "data": response.data
      })
    })
    .catch(function (error) {
      console.log(error);
      res.send({
        "status": 500,
        "message": "Failed",
      })
    })
})

app.listen(PORT, () => {
  console.log(`listining to port ${PORT}`);
})