import {endpoints} from "../constants/endpoints";
import {safeFetch} from "../utils/FetchUtils";

export class AuthService {
  private readonly _token: string;

  constructor(token: string) {
    this._token = token;
  }

  sendDevice = async (firebaseToken: string) => {
    const endpoint = endpoints.base + endpoints.devices;
    const body = {
      token: firebaseToken,
    };

    const init = {
      method : 'POST',
      headers : {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: this._token
      },
      body: JSON.stringify(body),
    };

    try {
      const json = await safeFetch(endpoint, init);
      console.log('json: ', json);
    } catch (error) {
      console.log('send device error: ', error);
      throw error;
    }
  }
}
