const Login = require("../models/Login");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let returnToken = (login, res) => {
    const token = jwt.sign(
      {
        _id: login._id,
        email: login.email,
      },
      process.env.JWT_KEY
    );
    return res
      .status(200)
      .json({ message: "Auth succeed", token: token, data: login });
  };

    //Register Login 
    exports.register = async(req, res)=>{
        try{
          let login = await Login.find({email: req.body.email});
          if(login.length>0)
          return res.status(422).json({message: "User with similar email already exists"});
          else {
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(req.body.password, salt);
            
            const user = new Login({
              fname: req.body.fname,
              lname: req.body.lname,
              contact: req.body.contact,
              role: req.body.role,
              email: req.body.email,
              password: hash
            })
            await user.save()
                .then((result)=>{
                  res.status(200).json({data: result});
                })
                .catch((err)=>{
                  console.log(err);
                  res.status(500).json({message: "Could not Create User"});
                });
          }
        }catch(e){
          res.status(500).json({message: "Something weng wrong"});
        }
      };


    //Login Controller
  exports.login = async ( req, res)=>{
    try{
       let login = await Login.findOne({email: req.body.email});
       
      if(bcrypt.compareSync(req.body.password, login.password)){
        returnToken(login, res);
      }else {
        res.status(422).json({message: "Incorrect Email or Password"});
      }
    }catch (e){
      // console.log(e)
       res.status(500).json({message: "Incorrect Email or Password"});
    }
  };

  //Get Users Controller
  exports.users = async (req, res)=>{
    try {
      const users = await Login.find();
      await res.status(200).send(users);
    } catch (e) {
      res.status(500).send(e);
    }
  };

  //Get User By ID Controller
  exports.findUser = async (req, res) => {
    try {
      const user = await Login.findById(req.params.id);
      await res.status(200).send(user);
    } catch (e) {
      await res.status(500).json({message: "Something went wrong!"});
    }
  }

  //Update User Controller
  exports.updateUser = async (req, res) => {
    try {
      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync("12345", salt);

      const user = await Login.findById(req.params.id);
      user.fname = req.body.fname;
      user.lname = req.body.lname;
      user.contact = req.body.contact;
      user.role = req.body.role;
      user.email = req.body.email;
      user.password = hash;

      await user.save()
      .then((result)=>{
        res.status(200).json({
          message: "User updated successfully",
          data: result});
      }).catch((err)=>{
        console.log(err);
        res.status(400).json({message: "Could not Update User"});
      });
      
    } catch (e) {
      await res.status(500).json({message: "Something weng wrong"});
    }
  }

  //Delete User Controller
  exports.deleteUser = async (req, res) => {
    try {
      const user = await Login.findByIdAndDelete(req.params.id);
      await res.status(200).send(user);
    } catch (e) {
      res.status(400).json({message: "Something went wrong"});
    }
  }