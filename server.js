/**
 * This is the main Node.js server script for your project
 */

const path = require("path");
const fs = require("fs");
const got = require("got");

// Require the fastify framework and instantiate it
const fastify = require("fastify")({
  // Set this to true for detailed logging:
  logger: false
});

// Setup our static files
fastify.register(require("fastify-static"), {
  root: path.join(__dirname, "public"),
  prefix: "/"
});

// fastify-formbody lets us parse incoming forms
fastify.register(require("fastify-formbody"));

// point-of-view is a templating manager for fastify
fastify.register(require("point-of-view"), {
  engine: {
    handlebars: require("handlebars")
  }
});

/**
 * Renders Orchestrate Example
 *
 * Returns src/pages/index.hbs with data built into it
 */
fastify.get("/", function(request, reply) {

  const token_url =
    process.env.BASE_URL +
    "/v1/company/" +
    process.env.COMPANY_ID +
    "/sdkToken";

  got
    .get(token_url, {
      headers: {
        "X-SK-API-KEY": process.env.API_KEY
      }
    })
    .json()
    .then(data => {
      let params = {
        access_token: data.access_token,
        company_id: process.env.COMPANY_ID,
        policy_id: process.env.POLICY_ID,
        base_url: process.env.BASE_URL,
        site_title: "Hello World - Orchestrate Example"
      };

      reply.view("/src/pages/index.hbs", params);
    })
    .catch(err => {
      console.log("SK Error: ", JSON.stringify(err));
      reply.send(err);
    });
});


// Run the server and report out to the logs
fastify.listen(process.env.PORT, function(err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Your app is listening on ${address}`);
  fastify.log.info(`server listening on ${address}`);
});
