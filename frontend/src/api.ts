import axios from "axios";
import { UserData } from "./types/user";
import { LoginForm, RegistrationForm } from "./types/form";
import { Quiz } from "./types/quiz";


const BASE_URL = `http://localhost:3001`;

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class UserApi {
  // the token for interactive with the API will be stored here.
  static token: string;

  static async request(endpoint: string, data = {}, method = "get") {

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${UserApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err: any) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get the current user. */
  static async getCurrentUser(username: string): Promise<UserData> {
    let res = await this.request(`users/user/${username}`);
    return res;
  }

  /** Signup for site. */
  static async register(data: RegistrationForm): Promise<string> {
    let res = await this.request("auth/register", data, "post");
    return res.token;
  }

  /** Get token for login from username, password. */
  static async login(data: LoginForm): Promise<string> {
    let res = await this.request("auth/login", data, "post");
    return res.token;
  }

  /** Saves quiz results to db*/
  static async saveQuiz(category: string, score: number, user_id: number): Promise<Quiz> {
    let res = await this.request('quizes', { category, score, user_id }, "post")
    return res.quiz
  }

  /** Gets all quizes for th user */
  static async getUsersQuizes(user_id: number): Promise<Quiz[]> {
    let res = await this.request(`quizes/user/${user_id}`)
    return res
  }

  /**Updates score */
  static async updateScores(id: number, score: number): Promise<Quiz> {
    let res = await this.request(`quizes/${id}`, { score }, "patch")
    return res
  }
}

export default UserApi;