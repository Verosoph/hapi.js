// install also nodemon, then you dont have to restart the server each time if you made any changes
// install with sudo npm install nodemon (or: npm install -g nodemon for global install)
// start server then with: nodemon server.js 


const Hapi = require('hapi');
const inert = require('inert')
const mongoose = require('mongoose');

// MongoDB connection like the guide on the homepage 'mongoosejs.com'
mongoose.connect('mongodb://localhost/hapidb')
.then(() => console.log('MongoDB connected...'))
.catch(err => console.error(err));



const server = new Hapi.Server();
server.connection({
  port: 9000
});


//Homeroute
server.route({
  method: 'GET',
  path: '/',
  handler: (request, reply) => {
    //return reply('Hello  eee World');
    reply.view('index', {
      name:'JohnDoe'
    });
  }
});

// dyamic routes
server.route({ 
  method: 'GET',
  path: '/user/{name}',
  handler: (request, reply) => {
    return reply('Hello  '+request.params.name);
  }
});
 

//static routes

server.register(require('inert'), (err) => {
  if (err) {
    throw err;
  }

  server.route({
    method: 'GET',
    path: '/about',
    handler: (request, reply) => {
      reply.file('./public/about.html');
    }
  });
});

const start = async() => {
  await server.register(require('inert'));
};

start();



// Vision Templates
server.register(require('vision'), (err) => {
  if(err){
    throw err;
  }

  server.views({
    engines:{
      html:require('handlebars')
    }, 
    path:__dirname + '/views'
  }); 

});





server.start(() => {
  console.log('info', 'Server running at: ' + server.info.uri);
});





