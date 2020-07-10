Two dockerable services are created

#AUTH SERVICE

GET route /auth/google allows to login/signup with Google OAuth2. It returns a JWT token to the client which can be used to authorize user on other services/

#PUBLISH SERVICE

POST route /publish/new allows to publish new article. It takes JWT token from client to authorize user.