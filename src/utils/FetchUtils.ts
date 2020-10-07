export const safeFetch = async (endpoint: RequestInfo, init: RequestInit) => {
  let response: any;

  try {
    response = await fetch(endpoint, init);
  } catch (error) {
    console.log('SAFE FETCH. CONNECTION ERROR: ', error);
    throw error;
  }
  if (response) {
    try {
      let json = await handleResponse(response);
      if (json) {
        return json;
      }
    } catch (error) {
      console.log('SAFE FETCH. ERROR: ', error);
      throw error;
    }
  }
};

export const handleResponse = async (response: any) => {
  if (__DEV__) {
    console.log(JSON.stringify(response));
  }

  if (response.status >= 200 && response.status < 400) {
    let body = await response.text();
    console.log('body: ', body);
    return body.length ? JSON.parse(body) : null;
  } else if (response.status === 401) {
    console.log('HANDLE RESPONSE. ERROR. RESPONSE: ', JSON.stringify(response));
    throw {name: 'Authentication error'};
  } else {
    console.log('HANDLE RESPONSE. ERROR. RESPONSE: ', JSON.stringify(response));
    throw {name: 'Something wrong'};
  }
};
