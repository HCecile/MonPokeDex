import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import twig from 'twig';
import bodyParser from 'body-parser';
import Pokemon from "./models/Pokemon.js"

const app = express();
const db = "mongodb+srv://HCecile:Aubagne13@cluster0.0wqfu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(db, (err) =>{
    if(err){
        console.error('error' + err);
    }else{
        console.log('connected at mongoDb');
    }
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./assets'));
app.listen(8100, () => {
    console.log("le serveur marche !");
});

app.get('/', async (req, res) =>{
    const poks = await Pokemon.find();
    res.render('./pokemon/listPoke.html.twig',{
        poks: poks
    })
})
app.get('/addPoke', async (req, res) => {
    res.render('./pokemon/addPoke.html.twig', {
      
    })
})

app.post('/addPoke', async (req, res) => {
    const poke = new Pokemon(req.body)
    poke.save()
    res.redirect('/')
})

app.get('/updatePoke/:id', async (req, res) =>{
    const poks = await Pokemon.findOne({ _id: req.params.id })
    res.render('pokemon/addPoke.html.twig',{
        poks: poks,
        action: "/updatePoke"
    })
 })
 
 app.post('/updatePoke/:id', async (req, res) =>{
    Pokemon.updateOne({ _id: req.params.id }, req.body, (error, poks) => {
         if(error){
             console.log(error);
             res.status(404);
         }else{
             res.redirect('/')
         }
     })  
  })
 
  app.get('/deletePoke/:id', async (req, res) =>{
     Pokemon.deleteOne({ _id: req.params.id }, (error, poks) => {
         if(error){
             console.log(error)
             res.status(404);
         }else{
             res.redirect('/')
         }
     })
  })