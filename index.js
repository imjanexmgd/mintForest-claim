import fs from 'fs';
import { checkEnergy, claimingEnergy, getUserInfo } from './func.js';
import { loggerFailed, loggerSuccess, loggerInfo } from './logger.js';
import delay from './delay.js';
import sendNotifTele from './notifTele.js';

const jsonFile = fs.readFileSync('token.json');
const listToken = JSON.parse(jsonFile);

(async () => {
   try {
      while (true) {
         process.stdout.write('\x1Bc');
         for (const i in listToken) {
            console.log(`ACCOUNT ${+i + 1} of ${listToken.length}`);
            console.log();
            const token = listToken[i];
            // get user info
            const userInfo = await getUserInfo(token);
            const { id, address, treeId, status, energy } = userInfo.result;
            loggerSuccess(`Success get acc info`);
            loggerInfo(`id      : ${id}`);
            loggerInfo(`address : ${address}`);
            loggerInfo(`treeId  : ${treeId}`);
            loggerInfo(`status  : ${status}`);
            loggerInfo(`energy  : ${energy}`);

            // check energy
            const energyList = await checkEnergy(token);
            loggerSuccess(`Success get energyList`);
            for (const energy of energyList.result) {
               loggerInfo(`amount : ${energy.amount}`);
               loggerInfo(`type   : ${energy.type}`);
               loggerInfo(`freeze : ${energy.freeze}`);
               if (energy.freeze == true) {
                  loggerInfo('skipping claiming energy because its freeze');
               } else {
                  await claimingEnergy(token, energy.amount);
                  await sendNotifTele(
                     `wallet ${address} success claim ${energy.amount}`
                  );
               }
            }
            console.log('\n\n');
         }
         const ms = Math.floor((Math.random() * 2 + 1) * 60000 * 10);
         loggerInfo(`delay ${ms / 1000} second or ${ms / 1000 / 60} minute`);
         console.log();
         await delay(ms);
      }
   } catch (error) {
      await sendNotifTele('process stopped because error');
      console.log(error);
   }
})();
