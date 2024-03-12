import User from "./User";

export default interface Auth {
  token: string;
  user: User;
}
