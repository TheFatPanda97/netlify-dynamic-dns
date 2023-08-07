import util from 'node:util';
const exec = util.promisify(require('node:child_process').exec);

export const getPublicIP = async () => {
  const command = 'dig +short myip.opendns.com @resolver1.opendns.com';
  return exec(command);
};
