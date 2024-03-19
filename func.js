import axios from 'axios';

export const checkEnergy = async (token) => {
  try {
    const r = await axios.get('https://www.mintchain.io/api/tree/energy-list', {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/115.0',
        Accept: 'application/json, text/plain, */*',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate, br',
        Authorization: token,
        Connection: 'keep-alive',
        Referer: 'https://www.mintchain.io/mint-forest',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
        TE: 'trailers',
      },
    });
    return r.data;
  } catch (error) {
    throw error;
  }
};
export async function getUserInfo(token) {
  try {
    const response = await axios.get(
      'https://www.mintchain.io/api/tree/user-info',
      {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/115.0',
          Accept: 'application/json, text/plain, */*',
          'Accept-Language': 'en-US,en;q=0.5',
          'Accept-Encoding': 'gzip, deflate, br',
          Authorization: token,
          Connection: 'keep-alive',
          Referer: 'https://www.mintchain.io/mint-forest',
          'Sec-Fetch-Dest': 'empty',
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Site': 'same-origin',
          TE: 'trailers',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
export const claimingEnergy = async (token, amount) => {
  try {
    const response = await axios.post(
      'https://www.mintchain.io/api/tree/claim',
      {
        uid: [],
        amount: amount,
        includes: [],
        type: 'daily',
        freeze: false,
        id: '500_',
      },
      {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/115.0',
          'Accept-Language': 'en-US,en;q=0.5',
          'Accept-Encoding': 'gzip, deflate, br',
          Authorization: token,
          Origin: 'https://www.mintchain.io',
          Connection: 'keep-alive',
          Referer: 'https://www.mintchain.io/mint-forest',
          'Sec-Fetch-Dest': 'empty',
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Site': 'same-origin',
        },
      }
    );
    console.log(response.data.msg);
  } catch (error) {
    throw error;
  }
};
