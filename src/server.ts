import 'reflect-metadata';
import http from 'http';
import config from './config';

const main = async () => {
  await config();
  const server = http.createServer(require('./app').default);
  const socket = require('./socket');
  socket.default.mount(server);
  server.listen(process.env.PORT || 8080, () => {
    console.log('Start server at port :', process.env.PORT || 8080);
  });
};

main().catch(e => console.error(e));
