Login/SignUp Component

Approach2 Branch:

1) It contains the Login/Signup Page with JWT strategy authentication.
2) The approach saves the access Token in context of react.
3) The token is persisted in react memory with help of Persistent login component that sets the token in context of react when page is refreshed.
4) Added axios interceptors to the pages that uses authorization. So that when switching between protected routes we can persist the access Token if refresh token is still valid.
5) Refresh Token is stored in as https only cookie.
6) In backend folder src/index.js you can change the expiration time of the token.
