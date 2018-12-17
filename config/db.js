
let dbuser = 'dev';
let dbpasswd = 'dev123dev123';

const self = {
    url: `mongodb://${dbuser}:${dbpasswd}@ds135974.mlab.com:35974/sporttribe`,
};

module.exports = self;