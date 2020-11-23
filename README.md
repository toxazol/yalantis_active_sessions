## A service that counts users which opened current page of website


#### Requrements:
* http
* util
* redis
* express
* socket.io
* express-session
* express-socket.io-session

#### To run:
* git clone
* npm install ????????
* `npm run start`
* Open or close `http://localhost:3000/` in new incognito tabs 
to chage active sessions counter. Opening new tabs in a window
with an active connection won't affect the counter because server
counts only unique users by assigning cookies to them.
