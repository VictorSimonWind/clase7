const express = require('express')
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser')
const { send } = require('process');
const app = express()
const parser = bodyParser.json();
const port = 4000
/* https://expressjs.com/en/resources/middleware/cors.html 
   https://www.npmjs.com/package/body-parser#installation

*/

app.use(cors());
//app.use(bodyParser);
app.get('/products', (req, res) => {
    var json = fs.readFileSync('./list.json',"utf8",(err,content) =>{
        if (err) {
            console.log(err);
        } else {
            //JSON.parse(content);
            JSON.stringify(content.toString());
        }
    });
    console.log(json);
    res.send(json)
    

   // res.send(json);
    //res.send(JSON.stringify(data));

});
app.get('/product/:id', (req, res) => {

    let json = fs.readFileSync('./list.json',"utf8");
       json = JSON.parse(json);
       json = json.filter(filter => filter.id == req.query.id);
       json = JSON.stringify(json);
            /* console.log('procesando JSON')
    jso = JSON.parse(content);
            console.log(content)
            content = content.filter(filter => filter.id == req.query.id);
            JSON.stringify(content.toString()); */
        
    
    res.send(json); 

});
app.post('/newProduct',parser,(req,res) =>{
    console.log(req.body);
    let json = fs.readFileSync('./list.json',"utf8");
    json = JSON.parse(json);
    json.push(req.body);
    json = JSON.stringify(json);
    
    try {
        fs.writeFileSync('./list.json',json);
        res.send("ok"); 

    } catch (error) {
        res.send(error)
    }
    



    res.send("ok"); 
})
app.listen(port, () => console.log(`Example app listening on port port!`))
