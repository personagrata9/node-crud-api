import UsersRouter from './resources/users/UsersRouter';
import createHttpServer from './server/createServer';

const usersRouter = new UsersRouter();

createHttpServer(usersRouter);
