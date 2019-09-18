/*const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});*/

const {Builder, By, Key, until} = require('selenium-webdriver');
 
(async function example() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    console.log(Math.round(+new Date()/1000));
    await driver.get('http://www.google.com/');
    await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
    await driver.wait(until.titleIs('webdriver - Penelusuran Google'), 1000);
    
    
  } finally {
    //await driver.quit();
    console.log(Math.round(+new Date()/1000));
  }
})();


/*const webdriver  = require('selenium-webdriver');

testGoogle();

async function testGoogle() {
  var browser = new webdriver.Builder()
  .withCapabilities(webdriver.Capabilities.chrome()).build();

browser.get('http://www.google.com')

var browserTitle =  await browser.getTitle()
                        .then( (title) => {
                          console.log("get: ", title);
                          return(title);
                        });

console.log("after: ", browserTitle);

};
*/


