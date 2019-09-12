# NPM CI Login

Logs you to an NPM registry on CI machines, uses `npm login` in the background.

### Usage:
```
NPM_USERNAME=Snoop \
NPM_PASSWORD=Dogg \
NPM_EMAIL=snoop@420.com \
npm-ci-login
```

### Supported environment variables:

| Name           | Description                                                     | Required |
| -------------- | --------------------------------------------------------------- | -------- |
| `NPM_USERNAME` | Username on the registry                                        | yes      |
| `NPM_PASSWORD` | Password for the user (or token on some registries like Github) | yes      |
| `NPM_EMAIL`    | Email for the user                                              | yes      |
| `NPM_REGISTRY` | Registry url - if you have a custom registry                    | no       |
| `NPM_SCOPE`    | Organisation scope                                              | no       |
