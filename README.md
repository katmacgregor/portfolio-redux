This repo contains two versions of the site.

### `new-portfolio/` — current site (static HTML/CSS/JS)

No build step. Open `new-portfolio/preview/index.html` directly in a browser, or serve the folder locally, e.g.:

```
npx serve new-portfolio/preview
```

Deploy: `npm run deploy:new-portfolio`

### Legacy site — Create React App

The original site, bootstrapped with [Create React App](https://github.com/facebook/create-react-app), still lives in `public/` and `src/`.

Get up and running: `npm install` then `npm start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

- `npm test`
- `npm run build`
- `npm run eject`
- `npm run deploy`

### Deploying

Both `npm run deploy` and `npm run deploy:new-portfolio` push to the same `gh-pages` branch (what `katrinamacgregor.com` serves), so only one site is live at a time. Whichever you run most recently wins — running the other command later switches back, nothing is lost either way.

Use a GitHub token to authenticate before deploying if prompted.
