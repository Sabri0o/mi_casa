module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
      email: { type: Sequelize.STRING } ,
      password: { type: Sequelize.STRING },
      username: { type: Sequelize.STRING },
      gender: { type: Sequelize.STRING },
      age: { type: Sequelize.INTEGER },
      room_space: { type: Sequelize.STRING ,defaultValue: 'private'},
      guest_or_host: { type: Sequelize.STRING ,defaultValue: 'guest'},
      room_picture: {type: Sequelize.STRING,defaultValue: null},
      nationality : {type: Sequelize.STRING},
      contact: {type: Sequelize.STRING},
      profile_picture: {type: Sequelize.STRING ,defaultValue:"https://www.seekpng.com/png/detail/413-4139803_unknown-profile-profile-picture-unknown.png"},
      status: { type: Sequelize.STRING,defaultValue: 'occupied' }
    });

    return User;
  };



  
 /*type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: null,
    validate: { min: -90, max: 90 }*/