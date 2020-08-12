import path from 'path';
import { loadFilesSync, mergeTypeDefs } from 'graphql-tools';

const typesArray = loadFilesSync(path.join(__dirname, './**/*.type.*'), { extensions: ['graphql'] });

const typeDefs = mergeTypeDefs(typesArray, { all: true });

export default typeDefs;
