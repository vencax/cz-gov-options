var port = process.env.PORT || 3000
var app = require('./lib/app')

app.listen(port, function() {
  console.log('shitstorm started on ' + port)
})
