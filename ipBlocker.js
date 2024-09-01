const axios = require('axios');

/**
 * Middleware to check and block risky IPs.
 * @param {number} riskThreshold - The average risk score threshold to trigger blocking.
 */
function ipBlocker(riskThreshold = 70) {
  return async (req, res, next) => {
    const ip = req.ip; // Get the client's IP address

    try {
      // Request to the external API to check the risk of the IP
      const response = await axios.get(`https://data.yourwebshield.co.uk/api/lookup?ip_address=${ip}`);
      
      // Extract the average_risk from the API response
      const { average_risk } = response.data;

      if (average_risk >= riskThreshold) {
        // If the average risk score is above the threshold, return a 403 response
        return res.status(403).send('Forbidden: Your IP is blocked due to high risk.');
      }
    } catch (error) {
      console.error(`Failed to check IP: ${ip}`, error);
      // Optionally continue to the next middleware in case of an error
    }

    // If the IP is not risky, continue to the next middleware
    next();
  };
}

module.exports = ipBlocker;
