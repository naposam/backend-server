const handleSignin = (req,res, db, bcrypt) =>{
	db.select('password','email').from('login')
  .where('email', '=', req.body.email)
   .then(data =>{
    
    const isValid = bcrypt.compareSync(req.body.password, data[0].password)
    if(isValid){
      return db.select('*').from('register')
      .where('email', '=', req.body.email)
      .then(user =>{
         res.json(user[0])
      })
      .catch(err => res.status(400).json('unable to get user'))
    }else{
       res.status(400).json('Wrong Credential')
    }
   
   })
	 .catch(err => res.status(400).json('wrong user or password'))
}


module.exports ={
  handleSignin: handleSignin
}