export const getFetchOptions = (method = "GET", token, body) => ({
   method,
   headers: {
         'Content-Type': 'application/json',
         "Authorization": token
   },
   body: body ? JSON.stringify(body) : null
});