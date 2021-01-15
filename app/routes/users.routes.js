const db = require("../models");

const cloudinary = require("cloudinary").v2;

// cloudinary configuration

cloudinary.config({
  cloud_name: "testing-mctc-project",
  api_key: "591627645258192",
  api_secret: "38izIqLk7vqZhs9MLVGj3aRqBx0"
});

// module.exports = function(app) {
  
//   // persist image
// app.post("/profile-picture", (request, response) => {
//   // collected image from a user
//   const data = {
//     image: request.body.image
//   }
//   console.log('post request sent to cloudinary')
//   // upload image here
//   cloudinary.uploader.upload(data.image)
//   .then((image) => {
//     console.log('cloudinary stored it successfully')
//     db.pool.connect((err, client) => {
//       // insert query to run if the upload to cloudinary is successful
//       const updateQuery = 'UPDATE users SET room_picture = $1  WHERE (id = 1)';
//       const values = [image.secure_url];
//       console.log('we are here')

//       // execute query
//       client.query(updateQuery, values)
//       // console.log('we are here')
//       .then((result) => {
//         result = result.rows[0];

//         // send success response
//         response.status(201).send({
//           status: "success",
//           data: {
//             message: "Image Uploaded Successfully",
//             //title: result.title,
//             //cloudinary_id: result.cloudinary_id,
//             image_url: result.room_picture,
//           },
//         })
//       }).catch((e) => {
//         response.status(500).send({
//           message: "failure",
//           e,
//         });
//       })
//     })  
//   }).catch((error) => {
//     response.status(500).send({
//       message: "db connection failure",
//       error,
//     });
//   });
// });

// };

module.exports = function(app) {
  
  // persist image
app.post("/profile-picture", (request, response) => {
  // collected image from a user
  const data = {
    image: request.body.image
  }
  console.log('post request sent to cloudinary')
  // upload image here
  cloudinary.uploader.upload(data.image)
  .then((image) => {
    console.log('cloudinary stored it successfully')
//////////////
    db.users.update(
      { room_picture: 'a very different title now' },
      { where: { id: 1 } })
      .then(result =>{
        console.log('done')
        response.send(result)
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

// db.users.update(
//   { room_picture: 'a very different title now' },
//   { where: { id: 1 } }
// )
//   .then(result =>
//     console.log('done')
//   )
//   .catch(err =>
//     console.log('error)
//   )