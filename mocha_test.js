var assert = require('assert');
var test = require('selenium-webdriver/testing');
var webdriver = require('selenium-webdriver');

var driver;

test.describe('Google Search', function() {
    test.beforeEach( function(done) {
        this.timeout(20000);
        driver =  new webdriver.Builder()
                    .withCapabilities(webdriver.Capabilities.chrome()).build();
        driver.get('http://www.google.com');

        done();
    });

    test.afterEach(function(done){
        driver.quit();
        done();
    });

    test.it('Webpage should have title value', function(done) {
        var promise = driver.getTitle();
        promise.then((title) => {
            assert.equal(title, 'Google');
        });

        done();
    });

    test.it('Searchbox should have expected text', function(done) {
        var searchBox = driver.findElement(wendriver.By.name('q'));
        searchBox.sendkeys('powerfront');
        searchBox.getAttribute('value')
            .then((value) => {
                assert.equal(value, 'powerfront');
            })

        done();
    });
})