# IP Blocker Middleware

`ip-blocker` is a Node.js middleware package designed for Express.js applications. It blocks incoming requests from IP addresses that are considered risky based on an external risk assessment API. If an IP address has a risk score above a configurable threshold, the middleware responds with a `403 Forbidden` status code.

## Features

- **Automatic IP Blocking:** Automatically blocks requests from IPs that exceed a specified risk threshold.
- **Configurable Risk Threshold:** Customize the risk score threshold to suit your security needs.
- **Seamless Integration:** Easily integrate the middleware into any Express.js application.

## Installation

Install the package via npm:

```bash
npm install ip-blocker
