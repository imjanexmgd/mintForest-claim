import chalk from 'chalk';

export const loggerSuccess = (msg) => {
  try {
    const formattedMsg = chalk.green.italic(`${msg}`);
    console.log(`${formattedMsg}`);
  } catch (error) {
    console.log(error + 'failed logger success');
  }
};
export const loggerFailed = (msg) => {
  try {
    const formattedMsg = chalk.red.italic(`${msg}`);
    console.log(`${formattedMsg}`);
  } catch (error) {
    console.log(error + 'failed logger success');
  }
};
export const loggerInfo = (msg) => {
  try {
    const formattedMsg = chalk.rgb(255,102,179).italic(`${msg}`);
    console.log(`${formattedMsg}`);
  } catch (error) {
    console.log(error + 'failed logger info');
  }
};
