var unirest = require('unirest');

module.exports = {
  store: function(data) {
    var tmp = data.split(',');
    var payload = {
      sensorId : tmp[0],
      heading : parseFloat(tmp[1]),
      pitch : parseFloat(tmp[2]),
      roll : parseFloat(tmp[3]),
    }

    unirest.post('http://localhost:3000/v1/api/sensor-log')
    .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
    .send(payload)
    .end(function (response) {
      // console.log(response.body);
      return true;
    });        
  }
};
