## A service that counts users which opened current page of website

#### To run:
* [install redis if not installed](https://redis.io/topics/quickstart)
* git clone
* npm install
* `npm run start`
* Open or close `http://localhost:3000/` in new incognito tabs 
to chage active sessions counter. Opening new tabs in a window
with an active connection won't affect the counter because server
counts only unique users by assigning cookies to them.
