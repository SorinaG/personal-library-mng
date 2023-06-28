'use strict'

// hanlde not found error
exports.handleNotFound = (req, res, next) => {
  res.status(404)
  res.json({
    'message': 'Requested resource not found'
  })
  res.end()
}

// handle errors
exports.handleError = (err, req, res, next) => {
  res.status(err.status || 500)
  res.json({
    message: err.message,
    extra: err.extra,
    errors: err
  })
  res.end()
}