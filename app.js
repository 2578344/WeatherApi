const express = require('express');
const https = require("https");
const { send } = require('process');
const bodyParser = require('body-parser');
const app = express()

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    // "https://" must be included
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=Glasgow,uk&units=metric&APPID=ddd4ab1e25d65712a538b513c8b5de73#';
    https.get(url, function(response){
        console.log(response);
        response.on('data',function(data){
            const weatherData = JSON.parse(data);
            console.log(weatherData);
            const temp = weatherData.main.temp;
            const desc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const iconURL =  "http://openweathermap.org/img/wn/" + icon + "@2x.png"; 
            console.log("Current temp in Glasgow: " + temp);
            console.log("Description: " + desc);
            res.write("<h1>Current temperature in Glasgow: " + temp + "</h1>");
            res.write("<h3>The weather is: " + desc + "</h3>");
            // use + sth.. + to treat it as a variable instead of string 
            res.write("<img src=" + iconURL + " >");
            res.send();
        })
    });


    // u can only have one send method otherwise it will crash
    //res.send("Server is up and running");
})

app.get("/index", function(req,res){
    res.sendFile(__dirname + "/index.html");
})

app.post("/index" , function(req,res){
    city = req.body.cityName;
    const url = 'https://api.openweathermap.org/data/2.5/weather?q='+ city +',uk&units=metric&APPID=ddd4ab1e25d65712a538b513c8b5de73#';
    https.get(url, function(response){
        response.on('data', function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const desc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const iconURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"; 
            res.write("<h1>Current temperature in " + city + " is: " + temp + "</h1>");
            res.write("<h3>The weather is " + desc + "</h3>");
            res.write("<img src =" + iconURL + ">");
            res.send();

        })

    })
    

    
})

app.listen(3000, function(){
    console.log("Server is running on port 3000");
})