const axios = require("axios");
const rateLimit = require("express-rate-limit");

/**
 * Middleware to check and block risky IPs with added rate limiting.
 * @param {object} options - Configuration options for the middleware.
 * @param {number} [options.riskThreshold=70] - The risk score threshold to trigger blocking.
 * @param {number} [options.maxRequests=100] - Maximum number of requests allowed within the window.
 * @param {number} [options.windowMs=15 * 60 * 1000] - Time window in milliseconds for rate limiting (default: 15 minutes).
 * @param {string} [options.forbiddenPage] - Optional a default 403 page to show uses
 */
function yourwebshield({
  riskThreshold = 70,
  maxRequests = 100,
  windowMs = 15 * 60 * 1000,
  forbiddenPage = '/403'
} = {}) {

  // Rate limiting middleware
  const limiter = rateLimit({
    windowMs: windowMs,
    max: maxRequests,
    message: "Too many requests from this IP, please try again later.",
    keyGenerator: (req) => req.ip, // Use IP address as the key for rate limiting
  });

  return async (req, res, next) => {
    const ip = req.ip; // Get the client's IP address

    try {
      // Request to the external API to check the risk of the IP
      const response = await axios.get(
        `https://data.yourwebshield.co.uk/api/v1/lookup?ip_address=${ip}`
      );
      
      // Correct status code check
      if (response.status !== 200) {
        console.error(`Failed to fetch IP data: ${ip}`);
        // Apply rate limiting and move to the next middleware
        limiter(req, res, next);
        return next();
      }

      // Extract the average_risk and bot_info from the API response
      const { average_risk, bot_info } = response.data;

      // If bot_info is not null, skip all checks and proceed to the next middleware
      if (bot_info !== null) {
        return next();
      }

      if (average_risk >= riskThreshold) {
        // If the average risk score is above the threshold, return a 403 response
        return res.redirect(forbiddenPage);
      }
    } catch (error) {
      console.error(`Failed to check IP: ${ip}`, error.message || error);
      // Optionally continue to the next middleware in case of an error
    }

    // Apply rate limiting if the risk check passes and bot_info is null
    limiter(req, res, next);
  };
}

module.exports = yourwebshield;
