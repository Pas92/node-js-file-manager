import { Writable } from 'node:stream';

export class CustomStdout extends Writable {
  _write(chunk, enc, cb) {
    process.stdout.write(chunk.toString());
    cb();
  }
}
