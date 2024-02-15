import { config } from "../../config/config.service";
import { ID } from "../../shared/abstract-repository/repository.interface";
import { User } from "../../user/domain/user.interface";
interface HashMap<T> {
  [key: string]: T;
}

/**
 * This is for controling sessions
 */

class SessionService {
  protected sessions: HashMap<ID> = {};
  protected blackList: HashMap<ID> = {};
  protected disabledLogins: HashMap<ID> = {};

  getSessions() {
    return this.sessions;
  }

  getBlackList() {
    return this.blackList;
  }

  isblocked(userId: ID): boolean {
    if (!userId) return false;
    return !!this.blackList[userId];
  }

  registerSession(userId: ID, session: string): void {
    if (!userId)
      throw new Error(
        "UserId parameter most be specified to register a new session.",
      );

    if (!session)
      throw new Error(
        "Session parameter most be specified to register a new session.",
      );

    if (this.isblocked(userId))
      throw new Error(`Userid ${userId} is blocked, and can not be register.`);

    console.log(`Registering session [${session}] for user [${userId}]`);
    this.sessions[session] = userId;
  }

  unRegisterSession(session: string): void {
    console.log(`Unregistering session [${session}]`);
    delete this.sessions[session];
  }

  isValidSession(userId: ID, session: string): boolean {
    return this.sessions[session] === userId;
  }

  removeSessionsFromUser(user_id: ID) {
    if (!user_id) return;
    console.log(`Removing sessions from user ${user_id}`);
    const sessionsToRemove = Object.entries(this.sessions)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .filter(([session, userId]) => user_id === userId)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .map(([session, userId]) => session);
    if (sessionsToRemove.length > 0) {
      sessionsToRemove.map((session) => delete this.sessions[session]);
    }
  }

  blockUser(userId: ID): void {
    this.removeSessionsFromUser(userId);

    if (userId) {
      console.log(`Blocking user ${userId}`);
      this.blackList[userId] = "blocked";
    }
  }

  unblockUser(userId: ID): void {
    console.log(`Unblocking user ${userId}`);
    delete this.blackList[userId];
  }

  atempToDisableUserLogin(user: User) {
    const restoreLoginAfter = parseInt(
      config.get("disabledLoginExpireTimestamp") as string,
    );
    const disableLogin = () => config.get("disabledLogin") === "yes";
    const failedAttempsAllowed = parseInt(
      config.get("disabledLoginAttempsAllowed") as string,
    );

    if (disableLogin() && user.failedLogin >= failedAttempsAllowed) {
      this.disabledLogins[user.id] = "disabled login";
      setTimeout(() => {
        delete this.disabledLogins[user.id];
      }, restoreLoginAfter);
    }
  }

  canLogin(userId: ID) {
    return !this.disabledLogins[userId];
  }
}

export const sessionService = new SessionService();

export class TestingSessionService extends SessionService {}
