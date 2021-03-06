'use strict';

module.exports = function (MsrpSdk) {
  /** @constant */
  MsrpSdk.Status = {
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    REQUEST_TIMEOUT: 408,
    STOP_SENDING: 413,
    UNSUPPORTED_MEDIA: 415,
    INTERVAL_OUT_OF_BOUNDS: 423,
    MALFORMED_NICKNAME: 424,
    NICKNAME_RESERVED: 425,
    PRIVATE_MSG_NOT_SUPPORTED: 428,
    SESSION_DOES_NOT_EXIST: 481,
    INTERNAL_SERVER_ERROR: 500, // Not actually defined in spec/registry!
    NOT_IMPLEMENTED: 501,
    WRONG_CONNECTION: 506
  };

  /** @constant */
  MsrpSdk.StatusComment = {
    200: 'OK',
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
    408: 'Request Timeout',
    413: 'Stop Sending Message',
    415: 'Unsupported Media Type',
    423: 'Interval Out-of-Bounds',
    424: 'Malformed Nickname',
    425: 'Nickname Reserved',
    428: 'Private Messages Not Supported',
    481: 'Session Does Not Exist',
    500: 'Internal Server Error', // Not actually defined in spec/registry!
    501: 'Not Implemented',
    506: 'Wrong Connection'
  };
};
