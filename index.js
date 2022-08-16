#!/usr/bin/env node
const { spawn } = require("child_process");

const validate = ({ username, password, email }) => {
  if (!username) {
    console.log("Please provide username via NPM_USERNAME");
    process.exit(1);
  }

  if (!password) {
    console.log("Please provide password via NPM_PASSWORD");
    process.exit(1);
  }

  if (!email) {
    console.log("Please provide email via NPM_EMAIL");
    process.exit(1);
  }
};

const login = props => {
  const { username, password, email, scope, registry } = props;

  validate(props);

  const npmLogin = spawn(
    "npm",
    [
      "login",
      scope && `--scope=${scope}`,
      registry && `--registry=${registry}`
    ].filter(Boolean)
  );

  let consoleOutput = '';
  npmLogin.stderr.on("data", data => {
    consoleOutput += data.toString("utf-8");
  });

  npmLogin.on("close", () => {
    if(/ERR!/.test(consoleOutput)) {
      console.error(`User ${username} could not login to npm registry ${registry}`);
      console.error(consoleOutput)
      process.exit(1);
    } else {
      console.info(`User ${username} successfully logged into the npm registry ${registry}`);
      process.exit(0);
    }
  });

  npmLogin.stdin.write(username + "\n");
  setTimeout(() => {
    npmLogin.stdin.write(password + "\n");
  }, 2000);
  setTimeout(() => {
    npmLogin.stdin.write(email + "\n");
  }, 4000);
};

login({
  username: process.env.NPM_USERNAME,
  password: process.env.NPM_PASSWORD,
  email: process.env.NPM_EMAIL,
  scope: process.env.NPM_SCOPE,
  registry: process.env.NPM_REGISTRY
});
