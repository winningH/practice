var request = require('request')

async function index() {
	var getAllcalssify = await new Promise(function() {
		request.get('http://localhost:3000/getAllcalssify', function(err, response, body) {
			if (!err && response.statusCode == 200) {
				var data = JSON.parse(body)
				resolve(data)
			}
		})
	})
}