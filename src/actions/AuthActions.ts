import API from '../Api'

export function login(email: string, password: string) {
  console.log('in here')
  const request: any = API.post('/token/', {'email': email, 'password': password})
  request.then((response: any) => console.log(response.data.access))
  // return request.then((response: any) => setAuthToken(dispatch, response.data.access))
  //
  return setUser(email)
}

function setUser(email: string) {
  return {
    type: 'SET_USER',
    email
  }
}

function setAuthToken(authToken: string) {
  console.log('setting', authToken)
  return {
    type: 'SET_AUTH_TOKEN',
    authToken
  }
}
