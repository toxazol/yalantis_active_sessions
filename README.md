## A service that counts users which opened current page of website

### Try:
[active-sess-counter](https://active-sess-counter.glitch.me/)
> request link from several devices/browsers/incognito tabs simultaniously
> to test counter update.

#### To build and run:
* [install redis if not installed](https://redis.io/topics/quickstart)
* git clone
* npm install
* `npm run start`
* Open or close `http://localhost:3000/` in new incognito tabs 
to chage active sessions counter. Opening new tabs in a window
with an active connection won't affect the counter because server
counts only unique users by assigning cookies to them.
