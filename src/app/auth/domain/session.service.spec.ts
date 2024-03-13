import * as dotenv from "dotenv";
dotenv.config();
import { describe } from "node:test";
import { TestingSessionService } from "./session.service";

let srv: TestingSessionService;

describe("SESSION SERVICE TEST SUITE", () => {
  beforeEach(() => {
    srv = new TestingSessionService();
  });

  describe("REGISTER SESSION", () => {
    test("it should throw error registering a falsy user", () => {
      const session = "<< SESSION-ID >>";
      const user = undefined;
      try {
        srv.registerSession(user, session);
      } catch (error) {
        const errorMessage = `UserId parameter most be specified to register a new session.`;
        expect(error.message).toBe(errorMessage);
      }
    });

    test("it should throw error registering a falsy session", () => {
      const session = undefined;
      const user = "<< USER-ID >>";
      try {
        srv.registerSession(user, session);
      } catch (error) {
        const errorMessage = `Session parameter most be specified to register a new session.`;
        expect(error.message).toBe(errorMessage);
      }
    });

    test("it should throw error registering a blocked user", () => {
      const session = "<< SESSION-ID >>";
      const user = "<< USER-ID >>";
      srv.blockUser(user);
      try {
        srv.registerSession(user, session);
      } catch (error) {
        const errorMessage = `Userid ${user} is blocked, and can not be register.`;
        expect(error.message).toBe(errorMessage);
      }
    });

    test("it should register a session", () => {
      const session = "<< SESSION-ID >>";
      const user = "<< USER-ID >>";
      srv.registerSession(user, session);
      const sessions = srv.getSessions();
      expect(Object.keys(sessions).length).toBe(1);
      expect(sessions[session]).toBe(user);
    });
  });

  describe("UNREGISTER SESSION", () => {
    test("it should un-register a session", () => {
      const session = "<< SESSION-ID >>";
      const user = "<< USER-ID >>";
      srv.registerSession(user, session);
      srv.unRegisterSession(session);
      expect(Object.keys(srv.getSessions()).length).toBe(0);
    });
  });

  describe("BLOCKING AND UN-BLOCKING USER", () => {
    test("it should block an user", () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const session = "<< SESSION-ID >>";
      const user = "<< USER-ID >>";
      srv.blockUser(user);
      expect(Object.keys(srv.getBlackList()).length).toBe(1);
    });

    test("it should un-block an user", () => {
      const session = "<< SESSION-ID >>";
      const user = "<< USER-ID >>";
      srv.blockUser(user);
      expect(Object.keys(srv.getBlackList()).length).toBe(1);

      srv.unblockUser(user);
      expect(Object.keys(srv.getBlackList()).length).toBe(0);

      srv.registerSession(user, session);
      expect(Object.keys(srv.getSessions()).length).toBe(1);
    });
  });

  describe("HANDLING SESSIONS", () => {
    test("it should be a valid session", () => {
      const session = "<< SESSION-ID >>";
      const user = "<< USER-ID >>";
      srv.registerSession(user, session);
      const valid = srv.isValidSession(user, session);
      expect(valid).toBe(true);
    });

    test("it should be a non valid session", () => {
      const session = "<< SESSION-ID >>";
      const user = "<< USER-ID >>";
      srv.registerSession(user, session);
      srv.unRegisterSession(session);
      const valid2 = srv.isValidSession(user, session);
      expect(valid2).toBe(false);
    });
  });
});
