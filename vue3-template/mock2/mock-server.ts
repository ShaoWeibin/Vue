import express from 'express'
import compression from 'compression'
import morgan from 'morgan'
import cors from 'cors'
import http from 'http'
import chokidar from 'chokidar'
import bodyParser from 'body-parser'
import chalk from 'chalk'
import path from 'path'
import Mock from 'mockjs'

// import { mockServerPort } from '../src/config/default/vue.custom.config'

const mockDir = path.join(process.cwd(), 'mock')

const app = express()
const port = 9999

// Compression
app.use(compression())
// Logger
app.use(morgan('dev'))
// Enable CORS
app.use(cors())
// POST, PUT, DELETE body parser
app.use(express.json({ limit: '20mb' }))
app.use(
  express.urlencoded({
    limit: '20mb',
    extended: false,
  }),
)
// No cache
app.use((req, res, next) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate')
  res.header('Pragma', 'no-cache')
  res.header('Expires', '-1')
  next()
})

// parse app.body
// https://expressjs.com/en/4x/api.html#req.body
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
)

// Catch 404 error
app.use((req, res) => {
  const err = new Error('Not Found')
  res.status(404).json({
    message: err.message,
    error: err,
  })
})

// Create HTTP server.
const server = http.createServer(app)

// Listen on provided port, on all network interfaces.
server.listen(port)
server.on('error', onError)
console.log('Mock server started on port ' + port + '!')

// Register Routes
const mockRoutes = registerRoutes(app)
var mockRoutesLength = mockRoutes.mockRoutesLength
var mockStartIndex = mockRoutes.mockStartIndex

// watch files, hot reload mock server
chokidar
  .watch(mockDir, {
    ignored: /mock-server/,
    ignoreInitial: true,
  })
  .on('all', (event, path) => {
    if (event === 'change' || event === 'add') {
      try {
        // remove mock routes stack
        app._router.stack.splice(mockStartIndex, mockRoutesLength)

        // clear routes cache
        unregisterRoutes()

        const mockRoutes = registerRoutes(app)
        mockRoutesLength = mockRoutes.mockRoutesLength
        mockStartIndex = mockRoutes.mockStartIndex

        console.log(chalk.magentaBright(`\n > Mock Server hot reload success! changed  ${path}`))
      } catch (error) {
        console.log(chalk.redBright(error))
      }
    }
  })

function registerRoutes(app: any) {
  let mockLastIndex
  const { mocks } = require('./index.js')
  const mocksForServer = mocks.map((route: any) => {
    return responseFake(route.url, route.type, route.response)
  })
  for (const mock of mocksForServer) {
    app[mock.type](mock.url, mock.response)
    mockLastIndex = app._router.stack.length
  }
  const mockRoutesLength = Object.keys(mocksForServer).length
  return {
    mockRoutesLength: mockRoutesLength,
    mockStartIndex: mockLastIndex - mockRoutesLength,
  }
}

function unregisterRoutes() {
  Object.keys(require.cache).forEach((i) => {
    if (i.includes(mockDir)) {
      delete require.cache[require.resolve(i)]
    }
  })
}

// for mock server
const responseFake = (url: string, type: string, respond: any) => {
  return {
    url: new RegExp(`${process.env.VUE_APP_BASE_API}${url}`),
    type: type || 'get',
    response(req: any, res: any) {
      console.log('request invoke:' + req.path)
      res.json(Mock.mock(respond instanceof Function ? respond(req, res) : respond))
    },
  }
}

// Event listener for HTTP server "error" event.
function onError(error: any) {
  if (error.syscall !== 'listen') {
    throw error
  }
  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error('Express ERROR (app) : %s requires elevated privileges', bind)
      process.exit(1)
    case 'EADDRINUSE':
      console.error('Express ERROR (app) : %s is already in use', bind)
      process.exit(1)
    default:
      throw error
  }
}

/*export default (app) => {
  // parse app.body
  // https://expressjs.com/en/4x/api.html#req.body
  app.use(bodyParser.json())
  app.use(
    bodyParser.urlencoded({
      extended: true,
    }),
  )

  const mockRoutes = registerRoutes(app)
  var mockRoutesLength = mockRoutes.mockRoutesLength
  var mockStartIndex = mockRoutes.mockStartIndex

  // watch files, hot reload mock server
  chokidar
    .watch(mockDir, {
      ignored: /mock-server/,
      ignoreInitial: true,
    })
    .on('all', (event, path) => {
      if (event === 'change' || event === 'add') {
        try {
          // remove mock routes stack
          app._router.stack.splice(mockStartIndex, mockRoutesLength)

          // clear routes cache
          unregisterRoutes()

          const mockRoutes = registerRoutes(app)
          mockRoutesLength = mockRoutes.mockRoutesLength
          mockStartIndex = mockRoutes.mockStartIndex

          console.log(chalk.magentaBright(`\n > Mock Server hot reload success! changed  ${path}`))
        } catch (error) {
          console.log(chalk.redBright(error))
        }
      }
    })
}*/
