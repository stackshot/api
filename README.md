# Tucao API

```bash
$ npm install

$ npm run dev
```

## Generating RSA keys

```bash
$ openssl genrsa -out development.rsa 1024
$ openssl rsa -in development.rsa -pubout > development.rsa.pub
```
