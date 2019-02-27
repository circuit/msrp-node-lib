// Dependencies
var util = require('util');
var EventEmitter = require('events').EventEmitter;

module.exports = function(MsrpSdk) {
  // Private variables
  var sessions = {}; // Sessions dictionary by session ID

  /**
   * Session controller
   */
  var SessionController = function() {};
  util.inherits(SessionController, EventEmitter);

  /**
   * Creates a session
   * @return {Session} Session
   */
  SessionController.prototype.createSession = function() {
    var sessionController = this;
    var session = new MsrpSdk.Session();
    forwardSessionEvents(session, sessionController);
    sessions[session.sid] = session;
    return session;
  };

  /**
   * Gets a session by session ID
   * @param  {String} sessionId Session ID
   * @return {Session}          Session
   */
  SessionController.prototype.getSession = function(sessionId) {
    return sessions[sessionId];
  };

  /**
   * Removes a session by session ID
   * @param  {String} sessionId Session ID
   */
  SessionController.prototype.removeSession = function(sessionId) {
    var sessionController = this;
    var session = sessionController.getSession(sessionId);
    if (session) {
      session.end();
      delete sessions[sessionId];
    }
  };

  /**
   * Helper function for forwarding a session's events to the session controller
   * @param  {Session} session Session
   * @param  {SessionController} sessionController Session controller
   */
  function forwardSessionEvents(session, sessionController) {
    session.on('message', function(msg, session) {
      sessionController.emit('message', msg, session);
    });

    session.on('response', function(msg, session) {
      sessionController.emit('response', msg, session);
    });

    session.on('reinvite', function(session) {
      sessionController.emit('reinvite', session);
    });

    session.on('socketClose', function(hadError, session) {
      sessionController.removeSession(session.sid);
      sessionController.emit('socketClose', hadError, session);
    });

    session.on('socketConnect', function(session) {
      sessionController.emit('socketConnect', session);
    });

    session.on('socketEnd', function(session) {
      sessionController.removeSession(session.sid);
      sessionController.emit('socketEnd', session);
    });

    session.on('socketError', function(error, session) {
      sessionController.removeSession(session.sid);
      sessionController.emit('socketError', error, session);
    });

    session.on('socketTimeout', function(session) {
      sessionController.removeSession(session.sid);
      sessionController.emit('socketTimeout', session);
    });
  }

  MsrpSdk.SessionController = new SessionController();
};
