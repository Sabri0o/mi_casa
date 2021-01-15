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

  /////////////////////////////////////////////////////////////////////// become a host feature

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


/////////////////////////////////////////////////////////////////////// search feature

// data = {
//   "currentpage": request.body.currentPage,
//   "gender": request.body.gender,
//   "age": request.body.age,
//   "nationality": request.body.nationality,
//   "space": request.body.space
// }

// {
//   "count": 8,
//   "rows": [
//       {
//           "id": 4,
//           "title": "bezkoder Tut#4 Rest Apis",
//           "description": "Tut#4 Description",
//           "published": false,
//           "createdAt": "2020-06-05T11:55:07.000Z",
//           "updatedAt": "2020-06-05T11:55:07.000Z"
//       },
//       {
//           "id": 5,
//           "title": "bezkoder Tut#5 MySQL",
//           "description": "Tut#5 Description",
//           "published": false,
//           "createdAt": "2020-06-05T11:55:11.000Z",
//           "updatedAt": "2020-06-05T11:55:11.000Z"
//       }
//   ]
// }


app.post('/search', function(request, response) {
  let conditions = Object.entries(request.body).filter(x=>(x[1]!=='' && x[0]!=='currentpage')) // keeping just the changed input 
  var pageNo = request.body.currentpage

   // updating the filterBy based on the conditions

  let filterBy = {status : 'free'} 

  for(var ele of conditions) {
    filterBy[ele[0]] = ele[1]
  }

  let query = {}

  var size = 5  // pagination size
  query.offset =  size * pageNo // pagination skip indicator
  query.limit = size // pagination size
  query.where = filterBy
  query.attributes = ['username','gender','age','nationality','profile_picture','room_space','contact']
  console.log(query)

//////////////// return the number of documents satisfy the query  

db.users.findAndCountAll(query).then(data => {
      console.log('searching results')
      response.send(data)
    }).catch(err => {
      console.log('searching failed')
      response.send(err)
    });
  })
};
