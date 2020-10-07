import * as Keychain from 'react-native-keychain';
import {UserCredentials} from 'react-native-keychain';
import base64 from 'base-64';
import {endpoints} from "../constants/endpoints";
import {Credentials} from "../models/Credentials";

export const getCredentialsFromKeychain = async (): Promise<UserCredentials | null> => {
  const company = endpoints.base;
  if (await Keychain.hasInternetCredentials(company)) {
    return await Keychain.getInternetCredentials(company) || null;
  }
  return null;
};

export const setCredentialsToKeychain = async (credentials: Credentials): Promise<Credentials> => {
  const company = endpoints.base;
  await Keychain.setInternetCredentials(company, credentials.username, credentials.password);
  return credentials;
};

export const createToken = (credentials: Credentials): string => {
  return `Basic ${base64.encode(
    credentials.username + ':' + credentials.password,
  )}`;
};

export const deleteCredentials = async () => {
  const company = endpoints.base;
  if (company) {
    await Keychain.resetInternetCredentials(company);
  }
};
