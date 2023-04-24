const axios = require('axios');

let aksestoken = '';

async function authenticate() {
  // setting authorization token consumer key plus ":" plus secret key
  const ck = 'PjFSVobmQMTVvhJxnkAZpcnvlnEnJ67c';
  const sc = 'crsJbMouw62ADBYF';
  const auth = `${ck}:${sc}`;
  const p = Buffer.from(auth).toString('base64');
  // storing encoded auth token in x variable
  // console.log(x);
  const response = await axios.get('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
    headers: {
      Authorization: `Basic ${p}`,
    },
  });
  console.log(response.data);
  aksestoken = response.data.access_token;
}

async function sendMoney(cutomerphone, transacctiondescription) {
  await authenticate();
  console.log(`this is the ${aksestoken}`);
  // setting authorization token consumer key plus ":" plus secret key
  const shortcode = '174379';
  const passkey = 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919';
  const tst = new Date().toISOString().substr(0, 14);
  const pass = `${shortcode}${passkey}${tst}`;
  const password1 = Buffer.from(pass).toString('base64');
  try {
    const response = await axios.post('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', {
      BusinessShortCode: 174379,
      Password: password1,
      Timestamp: tst,
      TransactionType: 'CustomerPayBillOnline',
      Amount: 1,
      PartyA: cutomerphone,
      PartyB: 174379,
      PhoneNumber: cutomerphone,
      CallBackURL: 'https://64b3-105-27-239-179.in.ngrok.io/callbackurl',
      AccountReference: 'company  name',
      TransactionDesc: transacctiondescription,
    }, {
      headers: {
        Authorization: `Bearer ${aksestoken}`,
      },
    });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  sendMoney,
};
