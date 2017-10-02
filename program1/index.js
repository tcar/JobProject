const Sequelize = require('sequelize')




const sequelize = new Sequelize('jobdb', 'tcar', 'b8ebcccd', {
    host: 'localhost',
    dialect: 'postgres',
  
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
  
  });sequelize
.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});

const Content = sequelize.define('content', {
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

  sequelize.sync({force: true}).then(()=>{

    const nats = require('nats').connect();
    
    nats.on('connect',(nats)=>{
        console.log('connected');
        
        nats.subscribe('foo', {'queue':'content.add'}, function(data) {
            const obj = JSON.parse(data)
            const future = new Date()
            future.setDate(future.getDate() + 2);
           Content.create({
            id:obj.id,
            content_uid:obj.content_uid,
            expires:future
    
        }).then(task => {
            console.log(task.dataValues)
         })
    })
    
 
    
      });

  })
  



