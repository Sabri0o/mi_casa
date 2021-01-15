const db = require("../models");
//const connectedUser = require('../controllers/auth.controller')
const cloudinary = require("cloudinary").v2;

// cloudinary configuration

cloudinary.config({
  cloud_name: "testing-mctc-project",
  api_key: "591627645258192",
  api_secret: "38izIqLk7vqZhs9MLVGj3aRqBx0"
});

module.exports = function(app) {
  
  // persist image
app.post("/become_a_host", (request, response) => {
  // collected image from a user
  const data = {
    image: request.body.image,
    room_space : request.body.space
  }
  console.log('connected user: ',connectedId)
  console.log('post request sent to cloudinary')
  // upload image here
  cloudinary.uploader.upload(data.image)
  .then((image) => {
    console.log('cloudinary stored it successfully')
////////////// console.log the loged in user id
    db.users.update(
      {room_picture: image.secure_url,
      status:'free',
      room_space:data.room_space,
      guest_or_host:'host'},
     
      { where: { id: connectedId } }) //// change id value with thisUserid later
      .then(result =>{
        response.send('update done')
      })
      .catch(err =>{
        console.log('error')
      })
//////////
  }).catch((error) => {
    response.status(500).send({
      message: "db connection failure",
      error,
    });
  });
});

};
