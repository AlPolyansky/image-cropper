const express = require('express')
const path = require('path')
const port = process.env.PORT || 8080
const app = express()
const isDevelopment = true
const folders = new (require('./webpack.path.js'))(__dirname)



if (isDevelopment) {
  const webpack = require('webpack')
  const webpackConfig = require('../webpack.config')
  const compiler = webpack(webpackConfig)

  console.log(compiler)

  app.use(require('webpack-dev-middleware')(compiler, {
    hot: true,
    stats: {
      colors: true
    }
  }))

  app.use(require('webpack-hot-middleware')(compiler));

} else {
  app.use(express.static(path.join(__dirname, '/static')))
}

app.get('*', function (request, response) {
  response.sendFile(path.join(folders.server.root, 'index.html'))
})

app.listen(port)

console.log(`server started on port: ${port}`)