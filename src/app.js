const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const requests = require('requests');
const { request } = require('express');

const staticPath = path.join(__dirname,"../public");
const tempPath = path.join(__dirname,"../templates/views");
const partialPath = path.join(__dirname,"../templates/partials");
app.set('view engine', 'hbs');
app.set('views',tempPath);

app.use(express.static(staticPath))

hbs.registerPartials(partialPath);

const date = new Date();
  const week = ['Sun','Mon','Tue','Wed','Thurs','Fri','Sat',];
  const months = ['January','Febraury','March','April','May','June','July','August','September','October','November','December'];

  const day = date.getDay();
  const month = date.getMonth();

app.get('/',(req, res)=>{
      res.render('index');
})
app.get('/wheather',(req, res)=>{
  const queryString = req.query.city ;
  if (!req.query.city) {
    res.render('wheather',{
      city:'City',
      country:'IN',
      day:week[day],
      date:date.getDate(),
      month:months[month],
    })
  }else{
  requests(`http://api.openweathermap.org/data/2.5/weather?q=${queryString}&appid=8ee7c33b440791aa5105c78b66d94e6b`).on('data',(chunk)=>{
    let obj = JSON.parse(chunk);
    let arrData = [obj];      
    
    console.log(chunk);
    res.render('wheather',{
      city:arrData[0].name,
      country:arrData[0].sys.country,
      temp:Math.ceil(arrData[0].main.temp-273),
      day:week[day],
      date:date.getDate(),
      month:months[month],
    });
    console.log(arrData[0].name);
  }).on('end',(err)=>{
    if (err) { 
      res.render('wheather',{
          temp:'Please enter an valid city',
      })
    }
  })
}
})
app.get('/wheather/',(req, res)=>{
      res.render('errorPage');
})
app.get('/about',(req, res)=>{
      res.render('about');
})
app.get('*',(req, res)=>{
      res.render('errorPage');
})

app.listen(3000,()=>{
  console.log('listening');
})








































































// const express = require('express');
// const path = require('path');
// const hbs = require('hbs');
// const app = express();
// const requests = require('requests')

// const temppath = path.join(__dirname,'../templates/views');
// const partialPath = path.join(__dirname,'../templates/partials');
// app.set('view engine','hbs');
// app.set('views',temppath);

// hbs.registerPartials(partialPath)
// // console.log(temppath);
//  let date = new Date();
// // const obj = {
// //                id:1,
// //                name:"abhishek",
// //                lastname:"singh",
// //                age:21,
// // };
// app.get('/', function (req, res) {
//   res.render('index',{
//     ownername:"abhishek singh",
//     year: date.getFullYear(),  

//   });
//   // res.send('Hello World');
// })
 
// app.get('/about', function (req, res) {
//   const cityname = req.query.name
//    reqdata =  requests(`http://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=8ee7c33b440791aa5105c78b66d94e6b`)
//    reqdata.on('data',(chunk)=>{
//        let objData = JSON.parse(chunk);
//        let arrData = objData;
//        res.write(arrData.name)
//       //  res.write(chunk)
//        console.log(arrData.main.temp);
//     })
//     .on('end',(err)=>{
//       if (err) return console.log('connection closed due to errors', err);
//     res.end() 
//     });
//  }
// )
 
// app.get('/contact', function (req, res) {
//   // res.send('Hello contact');
//     res.render('contact',{
//       ownername:"abhishek singh",
//       year: date.getFullYear(),  
//     });
// })
 
// app.get('*', function (req, res) {
//   res.render('errorPage')
// })

// app.listen(3000,()=>{
//    console.log('listening');
// })

