const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true }));

app.get("/", function(req, res){
    res.sendFile(__dirname+"/index.html");

})

app.post("/", function(req,res){

     const query = req.body.cityName;
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=84e549195277c1d6aa6f1ebba3bdf3c6&units=metric#"
    https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
    const weatherData = JSON.parse(data)
    const temp = weatherData.main.temp
    const des = weatherData.weather[0].description
    const icon = weatherData.weather[0].icon
    const imageURL = "http://openweathermap.org/img/wn/"+ icon+ "@2x.png"
    res.write("<h1 >The temperature in "+query+" is " +temp+ " Degree Celcius </h1> ")
    res.write("<p >Weather is " + des + " today</p>")
    res.write("<img src="+imageURL+">")
    res.send();

    })
    });

})


app.listen(3000, function(){
    console.log("Server is runing on port 3000")
})