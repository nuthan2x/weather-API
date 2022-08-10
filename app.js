const express = require('express');
const app = express();
const https = require('https');
const bodyParser = require('body-parser')


app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html")
})


app.post("/",function(req,res){

    const x = req.body.cityname;
    const url = "https://api.openweathermap.org/data/2.5/weather?appid=9a303d42bc76bddf4397708608aac6f9&q="+x+"&units=metric";



    https.get(url,function(resourse){
            console.log(resourse.statusCode); 

            resourse.on("data", function(data){
            const icon = "http://openweathermap.org/img/wn/" + JSON.parse(data).weather[0].icon+ "@2x.png"
            res.write("<h1><center>humidity is " + JSON.parse(data).main.humidity + "</center></h1>");
            res.write("<p><center>the weather is " + JSON.parse(data).weather[0].description + "</center></p>");
            res.write("<center><img src=" + icon + "></center></img>")
            res.send();
        })});

    
    
});




app.listen(3000,function(){});

