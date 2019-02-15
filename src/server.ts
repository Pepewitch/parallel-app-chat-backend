import app from './app';
import Socket from './socket';
import http from 'http';
const server = http.createServer(app);
Socket.mount(server);
server.listen(process.env.PORT || 3000, () => {
  console.log('Start server at port :', process.env.PORT || 3000);
});
