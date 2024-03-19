import axios from 'axios';
import { loggerFailed, loggerInfo, loggerSuccess } from './logger.js';
import delay from './delay.js';
const sendNotifTele = async (text) => {
  const maxRetries = 3;
  let retryCount = 0;
  const BOT_TOKEN = '6701785242:AAGC3SHYytL54ln9VTWk8g8wqi50cExjI5U';
  const CHANNEL_CHAT_ID = '-1002064846885';
  while (retryCount < maxRetries) {
    try {
      await axios.post(
        `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
        `chat_id=${CHANNEL_CHAT_ID}&text=${text}`,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      loggerSuccess('success send log to telegram');
      await delay(2000);
      break;
    } catch (error) {
      loggerFailed('fail send notif');
      retryCount++;
      loggerInfo(`Retry attempt ${retryCount}`);
      if (error.message == 'Request failed with status code 429') {
        console.log(error.response.data.description);
        const ratelimitparam = `${error.response.data.parameters.retry_after}000`;
        await delay(parseInt(ratelimitparam));
      }
      if (retryCount === maxRetries) {
        loggerFailed('Max retries reached. Unable to send notification.');
        throw error;
      }
      await new Promise((resolve) => setTimeout(resolve, 10000));
    }
  }
};

// sendNotifTele();
export default sendNotifTele;
