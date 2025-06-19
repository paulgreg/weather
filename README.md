# Weather

A PWA weather app using OpenWeatherMap API, build with React, react-select, TypeScript and using vite for build.

I’m using `cities.json` package to build static lists of cities by country, allowing static hosting (no need for APIs).

Run `npm run build-data` to generate city data before launching `npm run dev`

## Configuration

Copy `public/parameters.dist.json` to `public/parameters.json`.

You will then need to create an account on [OpenWeatherMap](https://openweathermap.org/), create an API key and then add it key in `public/parameters.json` .

Icons are from :
 - [Makin-Thinkgs/weather-icons](https://github.com/Makin-Things/weather-icons)
 - [bootstrap icons](https://github.com/twbs/icons)
