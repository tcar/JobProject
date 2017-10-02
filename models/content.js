const Sequelize = require('sequelize')

module.exports =(connection)=>{
    const Content = connection.define('content', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true 
    },
    content_uid: {
      type: Sequelize.STRING
    },
    expires:{
        type:Sequelize.DATE
    }
  });
}
  