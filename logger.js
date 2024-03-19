import chalk from 'chalk';

export const loggerSuccess = (msg) => {
   try {
      const formattedMsg = chalk.green(`${msg}`);
      console.log(`${formattedMsg}`);
   } catch (error) {
      console.log(error + 'failed logger success');
   }
};
export const loggerFailed = (msg) => {
   try {
      const formattedMsg = chalk.red(`${msg}`);
      console.log(`${formattedMsg}`);
   } catch (error) {
      console.log(error + 'failed logger success');
   }
};
export const loggerInfo = (msg) => {
   try {
      const formattedMsg = chalk.rgb(255, 102, 179)(`${msg}`);
      console.log(`${formattedMsg}`);
   } catch (error) {
      console.log(error + 'failed logger info');
   }
};
