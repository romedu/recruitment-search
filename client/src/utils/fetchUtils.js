export const getFetchOptions = (method = "GET", token, body = null) => ({
   method,
   mode: 'cors',
   headers: {
         'Content-Type': 'application/json',
         "Authorization": token
   },
   body
});