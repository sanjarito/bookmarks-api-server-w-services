require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const logger = require('./logger.js')
const bookmarksRouter = require('./bookmarks/bookmarks-router')
const app = express()
const morganOption = (NODE_ENV === 'production') ? 'tiny' : 'common';
const BookmarksService = require('./bookmarks/bookmarks-service')

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())
app.use(function validateBearerToken(req, res, next) {
   // move to the next middleware
   const authToken = req.get('Authorization')
   const apiToken = process.env.API_TOKEN

   if (!authToken || authToken.split(' ')[1] !== apiToken) {
     logger.error(`Unauthorized request to path: ${req.path}`);
     return res.status(401).json({ error: 'Unauthorized request' })
   }
  next()
 })

app.get('/bookmarks', (req, res, next) => {
  const knexInstance = req.app.get('db')
  BookmarksService.getAllBookmarks(knexInstance)
     .then(bookmarks => {
       res.json(bookmarks)
     })
     .catch(next)
}),

app.get('/bookmarks/:bookmark_id', (req, res, next) => {
  const knexInstance = req.app.get('db')
   BookmarksService.getById(knexInstance, req.params.bookmark_id)
     .then(bookmark => {
       if (!bookmark) {
         return res.status(404).json({
           error: { message: `Bookmark doesn't exist` }
         })
       }
       res.json(bookmark)
     })
     .catch(next)
 })

// app.use(bookmarksRouter)
// app.get('/', (req, res) => {
//     res.send('Hello, world!')
//   })

module.exports = app
