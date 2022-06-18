import cluster from 'cluster';
import { cpus, EOL } from 'os';
import { server, port } from '../server';

(() => {
  if (cluster.isPrimary) {
    process.stdout.write(`Master proccess started${EOL}`);
    cpus().map(() => cluster.fork());

    cluster.on('online', (worker) => {
      const { pid } = worker.process;
      if (pid) process.stdout.write(`Worker with id ${pid} has been forked${EOL}`);
    });
  } else {
    server.listen(port);
  }
})();
