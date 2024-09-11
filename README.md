# IP Blocker Middleware

`yourwebshield` is a Node.js middleware package designed for Express.js applications. It blocks incoming requests from IP addresses that are considered risky based on an external risk assessment API. If an IP address has a risk score above a configurable threshold, the middleware responds with a `403 Forbidden` status code.


## Features

- **Automatic IP Blocking:** Automatically blocks requests from IPs that exceed a specified risk threshold.
- **Configurable Rate Limiting:** Limits the number of requests an IP can make within a certain time window.
- **Seamless Integration:** Easily integrate the middleware into any Express.js application.

## Changes
1.1.0 - Rate Limiting added
1.0.1 - initial version
## Installation

Install the package via npm:

```bash
npm i yourwebshield
