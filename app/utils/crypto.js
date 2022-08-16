// const Encrypt = {
//     cryptPassword: (password) =>
//         bcrypt.genSalt(10)
//         .then((salt => bcrypt.hash(password, salt)))
//         .then(hash => hash),
//     }
// app.post('/users', async (req, res) => {
//   const {name, email, password, image} = req.body;
//   const myEncryptPassword = await Encrypt.cryptPassword(password);
//   await User.create({
//     name,
//     email,
//     password: myEncryptPassword, 
//     image
//   });
//   res.send("success");
// });