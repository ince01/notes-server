import path from 'path';
import { loadFilesSync, mergeResolvers } from 'graphql-tools';

const resolversArray = loadFilesSync(path.join(__dirname, './**/*.resolver.*'));

const resolvers = mergeResolvers(resolversArray);

export default resolvers;
