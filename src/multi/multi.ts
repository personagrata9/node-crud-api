import cluster from 'cluster';
import { cpus, EOL } from 'os';
import UsersRouter from '../resources/users/UsersRouter';
import createHttpServer from '../server/createServer';

const usersRouter = new UsersRouter();

(() => {
  if (cluster.isPrimary) {
    process.stdout.write(`Master proccess started${EOL}`);
    cpus().map(() => cluster.fork());

    cluster.on('online', (worker) => {
      const { pid } = worker.process;
      if (pid) process.stdout.write(`Worker with id ${pid} has been forked${EOL}`);
    });
  } else {
    const workerId = process.pid;
    createHttpServer(usersRouter, workerId);
  }
})();
