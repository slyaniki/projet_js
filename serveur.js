//initialisation des requires
var mysql = require('promise-mysql');
var express = require('express');
const session = require('express-session');
var cookieParser = require('cookie-parser')
const babel = require('babel-register');
const crypto = require('crypto');
const expressValidator = require('express-validator');
 
let bodyParser = require('body-parser');
var twig = require('twig');
 
mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'millenia'
}).then(function(db){
    console.log('Etablie bd');
    const User = require('./model/Users')(db)
    // debut midleware
        var app = express()
        var http = require('http').createServer(app)
        const io = require('socket.io')(http);
        app.use(expressValidator())
        app.use(session({
            secret: 'keyboard cat',
            resave: false,
            saveUninitialized: true
        }))
        app.use(express.static(`${__dirname}/views`));
        app.use(session({
            secret: "kjgvrehvkjebhrkbvrkevhjrktvhbrkgbhvkrbvhrgvkrgrtvkrgtkvgrtkvgrvjrtgvkrtgvkjrtvhtrkjvhktrghtkjrgvjkrtgvhkjrvhkjrv",
            resave: false,
            saveUninitialized: false
        }));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));
        //|DEbut rout
        app.get('/', function (req, res) {
        res.render('index.twig');
        })
        app.post('/', function (req, res) {
            res.render('index.twig');
            })
            app.post('/', function (req, res) {
                res.render('index.twig');
                })
       
        app.get('/register', function (req, res){
           
            res.render('register.twig');
            
        })
         
        app.post('/#contact', function (req, res){
           
            res.render('index.twig/#contact');
            
        })
        app.post('/inscription', function (req, res){
           
            res.render('register.twig');
        })   
        app.get('/inscription', function (req, res){
           
            res.render('register.twig');
        })   

        app.get('/communaute', function (req, res){
           
            res.render('login.twig');
        })
        app.get('/index', function (req, res){
           
            res.render('index.twig');
        })
        app.post('/communaute', function (req, res){
           
            res.render('PROJET_TCHAT/public/index1.twig');
        })
        app.get('/loggin', function (req, res){ 
            res.render('login.twig');
        })
        app.post('/loggin', async function (req, res){
            const element = req.body;
            req.check('email',"l'email ne doit pas être vide").notEmpty
            req.check('password',"le mot de passe ne doit pas être vide").notEmpty
            const error = req.validationErrors
            if(error) 
            {
                res.render('login.twig',{errors:error}) 
            }
            else
            {
                const connect =await User.connection(element.email,element.password)
                console.log(JSON.stringify(element))
                if(connect.id)
                {
                    req.session.vivrier = connect 
                    res.render('/communaute')
                }
                else
                {
                    res.render('/register')
                }
            }

        })
       
       
 

       
     /*ajouter un utilisateur */
 
app.get('/register',function (req, res) {
	/* get the event list*/
res.render('',{
			siteTitle : siteTitle,
			pageTitle : "ajouter user",
			items : ''
		});
});
 //liaison des serveurs



/* requete pour inserer dans la base de donnee*/
app.post('/register',function(req,res){
console.log(req.body);
   const Ele = User.setUser(req.body.nom,req.body.prenom,req.body.email,req.body.password)
   if(Ele){
       res.redirect('/loggin');
   }
});



        //Port en ecoute
        http.listen(3000, function(){
            console.log("ecoute sur 3000")
        })

        //**ecoute de la connection cote serveur cc
io.on('connection', (socket) => {

    //**ecout de la req envoye par le client rr
    socket.on('chat', (data) => {

        io.emit('chatRes', data) //envoi a ts le monde ee
        console.log(data);
    });

        //**typing: recu tt
    socket.on('typing', (data) => {

        socket.broadcast.emit('typing', data); //broadcast = alert all
    });
     
});
})



