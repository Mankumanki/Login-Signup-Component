Login/SignUp Component

Approach2 Branch:

1) It contains the Login/Signup Page with JWT strategy authentication.
2) The approach saves the access Token in context of react.
3) The token is persisted in react memory with help of Persistent login component that sets the token in context of react when page is refreshed.
4) Added axios interceptors to the pages that uses authorization. So that when switching between protected routes we can persist the access Token if refresh token is still valid.
5) Refresh Token is stored in as https only cookie.
6) In backend folder src/index.js you can change the expiration time of the token.


How To Use

1) Download the files
2) Run 'npm i' command in terminal inside both main folder and backend folder to download all the dependencies.
3) index.js in backend/src folder contains the api where you can change the token expiration and all.
4) Replace the login image under src/components/LoginTemp.jsx it is something I have retrieved from github avatar using git api.
5) Start the client side with command under main folder '\Login_Signup' with 'npm run dev'
6) For Server side change the directory to '/backend/src' folder and run 'nodemon index.js' or 'node index.js'.


![Screenshot 2024-12-12 192029](https://github.com/user-attachments/assets/91213a73-4d95-4fbe-8206-6b613ead08f0)

![Screenshot 2024-12-12 192007](https://github.com/user-attachments/assets/1c6fedf5-d3de-4c10-ad46-899c71dcf347)
