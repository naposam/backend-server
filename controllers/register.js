const handleRegister = (req, res, db, bcrypt)=>{
	const {fname,lname,email ,mobile_number,password}= req.body
   db('register')

   const hash = bcrypt.hashSync(password);
//    db('register').insert({
//        fname: fname,
//        lname: lname,
//        email: email,
//        mobile_number: mobile_number,
//        joined: new Date(),
//        password:hash
//    })
//    .then(response =>{
//     res.json(response[0])
//     console.log(response)
//         })



   //the transaction help to insert into both table
  db.transaction(trx => {
    trx.insert({
      password: hash,
      email: email
    })
    .into('login')
    .returning('email')
    .then(loginEmail =>{
      //login end here
      //users table start here
      return trx('register')
      .returning('*')
      .insert({
        fname: fname,
        lname: lname,
        email: email,
        mobile_number: mobile_number,
        joined: new Date(),
      })
      .then(user =>{
      res.json(user[0])
      })
    })
    .then(trx.commit)
    .catch(trx.rollback)
  })
   .catch(err => res.status(400).json('unable to register'))
 }


module.exports ={
  handleRegister: handleRegister
}