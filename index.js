import fs from 'fs';
import {
   checkEnergy,
   claimingEnergy,
   getUserInfo,
   injectTree,
} from './func.js';
import { loggerFailed, loggerSuccess, loggerInfo } from './logger.js';

const jsonFile = fs.readFileSync('token.json');
const listToken = JSON.parse(jsonFile);

(async () => {
   try {
      process.stdout.write('\x1Bc');
      console.log(`MintChain claimer and inject\nmade with ♡ by janexmgd`);
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
         let totalEnergy;
         let energyClaimed;
         loggerSuccess(`Success get energyList`);
         for (const energy of energyList.result) {
            loggerInfo(`amount : ${energy.amount}`);
            loggerInfo(`type   : ${energy.type}`);
            loggerInfo(`freeze : ${energy.freeze}`);
            if (energy.freeze == true) {
               loggerInfo('skipping claiming energy because its freeze');
            } else {
               await claimingEnergy(token, energy.amount);
               energyClaimed = energy.amount;
               loggerSuccess(
                  `wallet ${address} success claim ${energy.amount}`
               );
            }
         }
         totalEnergy = energy + energyClaimed;
         if (totalEnergy > 0) {
            const r = await injectTree(token, totalEnergy, address);
            if (r.msg == 'ok') {
               loggerSuccess(
                  `Success inject ${totalEnergy} to ${address} tree`
               );
            }
         } else {
            loggerInfo(`skipping inject tree ${address}`);
         }
         console.log('\n');
      }
   } catch (error) {
      loggerFailed(error.message);
   }
})();
