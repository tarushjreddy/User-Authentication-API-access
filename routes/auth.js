const router = require('express').Router();
const User = require('../initial/models.js'); 
const {registrationValid, loginValidation} = require('../routes/resitration.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


router.post('/register', async (req, res) =>{
const {error} = registrationValid(req.body);
   if(error) return res.status(400).send(error.details[0].message);
   const emailexist = await User.findOne({email: req.body.email});
   if (emailexist) return res.status(400).send("Email already is present")
    
const salt = await bcrypt.genSalt(10);

const hashedPassword =  await bcrypt.hash(req.body.password, salt);

 
    const cast = new User({
        name: req.body.name,
        email: req.body.email,
        password : hashedPassword
    });
    try{
        const SavedDataUser = await cast.save();
         res.send({user: cast._id});
        res.send(SavedDataUser);
       
    }catch(err){
        res.status(400).send(err);
    }
    
});
router.post('/login',async (req,res) =>{
    const {error} = loginValidation(req.body);

   if(error) return res.status(400).send(error.details[0].message);

   const user = await User.findOne({email: req.body.email});
   if (! user) return res.status(400).send("Email is wrong or does not exist");

   const validpass = await bcrypt.compare(req.body.password, user.password)
   if(! validpass)return res.status(400).send("invalid password");

   const token = jwt.sign({_id : user._id}, process.env.TOKEN_SECRET);
   res.header('auth-token', token).send(token);
//    res.send("logged in the server!!")

})
module.exports = router;