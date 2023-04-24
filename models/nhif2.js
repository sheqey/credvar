const axios = require('axios');
const qs = require('qs');
const cheerio = require('cheerio')

function extractText(number) {
    return new Promise((resolve, reject) => {
      const loginData = {
        login: 'dispatch@eplus.co.ke',
        password: 'di0080'
      };
  
      // Make a POST request to the login page to log in
      axios.post('https://hospitals.nhif.or.ke/nhifwww-mas/hosp-app/index.html', qs.stringify(loginData))
        .then(response => {
      
          // If login was successful, you can get the cookies from the response headers
          const cookies = response.headers['set-cookie'];
  
          // Set the cookies in the headers for the next request
          const config = {
            headers: {
              Cookie: cookies.join(';')
            }
          };
  
          // Make a POST request to the page you want to navigate to, passing in the data you want to post in FormUrlEncodedContent format
          const postData = {
            ntype: 'ID/PP No',
            number: number
          };
          axios.post('https://hospitals.nhif.or.ke/nhifwww-mas/hosp-app/member/meminfo.html', qs.stringify(postData), config)
            .then(response => {
              // Handle the response here
            
              // Parse the HTML from the response
              const $ = cheerio.load(response.data);
  
              // Use a CSS selector to select the p element
              const pElement = $('body > div.shiftcontainer > div > div > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > table:nth-child(4) > tbody > tr > td:nth-child(1) > table > tbody > tr:nth-child(2) > td > p');
  
              // Extract the text from the p element
              const text = pElement.text();
  
              // Resolve the promise with the text
              resolve(text);
            })
            .catch(error => {
              // Reject the promise with the error
              reject(error);
            });
        })
        .catch(error => {
          // Reject the promise with the error
          reject(error);
        });
    });
  }
  
module.exports = { extractText };