const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const bcrypt = require('bcrypt-nodejs')

const cors = require('cors')
const knex = require('knex')

const register = require('./controllers/register')
const signin = require('./controllers/signin')
// const profile = require('./controllers/profile')
// const image = require('./controllers/image')
const db = knex({
  client: 'mysql',
  connection: {
    host : '127.0.0.1',
    user : 'root',
    password : '',
    database : 'my_practices'
  }
});
//const app = express()
app.use(bodyParser.json())
app.use(cors())
// db.select('*').from('user').then(data =>{
//   console.log(data);

// });

app.post('/register',(req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.post('/signin',(req,res) =>{ signin.handleSignin(req,res, db, bcrypt)})
// app.post('/register',(req, res) => { register.handleRegister(req, res, db, bcrypt) })
// app.get('/profile/:id',(req, res) =>{profile.handleProfileGet(req, res, db)})


const PORT = process.env.PORT || 3000
app.listen(PORT, err =>{
	if(err){
		console.log(err)
	}else{
		console.log(`App listen to port: ${PORT}`)
	}
	
});
