import mongoose from 'mongoose';
import debug from 'debug';
import chalk from 'chalk';

import config from '../config';

const debugConnection = debug('connection:mongodb');

export default function connectDatabase() {
  mongoose.set('useFindAndModify', false);
  mongoose.set('useCreateIndex', true);
  mongoose.set('useNewUrlParser', true);
  mongoose.set('useUnifiedTopology', true);

  mongoose.connection.on('connected', () => {
    debugConnection('Connected database.');
  });
  mongoose.connection.on('error', err => {
    debugConnection('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
    debugConnection(err.message);
  });

  mongoose.connect(config.MONGODB_URI);
}
