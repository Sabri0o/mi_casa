module.exports = (sequelize, Sequelize) => {
    const Favourite_hosts = sequelize.define("favourite_hosts", {
      user_id: {
        type: Sequelize.INTEGER
      },
      favourite_user_id: {
        type: Sequelize.INTEGER
      }
    });
  
    return Favourite_hosts;
  };