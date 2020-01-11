var supertest = require("supertest");
var should = require("should");

var server = supertest.agent("http://localhost:8080");

describe("Verify forecast text", function () {

  it("should verify 'Mount Buller' and Ballarat text are as expected", function (done) {

    // calling home page api
    server
      .get("/")
      .expect("Content-type", /json/)
      .expect(200) // THis is HTTP response
      .end(function (err, res) {
        res.error.should.equal(false);

        const rspJson = JSON.parse(res.text);
        rspJson['Mount Buller'].should.equal(`Partly cloudy. Slight (20%) chance of a shower, most likely in the morning and afternoon. The chance of a thunderstorm with little or no rainfall in the morning and afternoon. Winds northwesterly 25 to 35 km/h tending westerly 20 to 25 km/h during the morning then tending southwesterly 15 to 20 km/h during the afternoon.`)
        rspJson['Ballarat'].should.equal(`Partly cloudy. Slight (20%) chance of a shower in the morning and afternoon. The chance of a thunderstorm in the morning and afternoon. Winds westerly 15 to 20 km/h turning south to southwesterly 20 to 25 km/h during the morning.`)
        done();
      });
  });

});