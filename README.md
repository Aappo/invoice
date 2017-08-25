[![CircleCI Status](https://circleci.com/gh/OpusCapita/invoice/tree/develop.svg?style=shield&circle-token=:circle-token)](https://circleci.com/gh/OpusCapita/i18n)
[![Coverage Status](https://coveralls.io/repos/github/OpusCapita/invoice/badge.svg?branch=develop)](https://coveralls.io/github/OpusCapita/invoice?branch=develop)

# Invoice service

Invoice service provides different functionality for customers and suppliers fucntionality (may be will be refactored in the future).
Sellside (supplier) functionality:
* InvoiceRecipt CRUD application 
* Invoice Receipt impor/export (json format)

Buyside (customer) functionality (TBD/under development):
* approval & invoice wokflow part

For further information on how to create, configure, document and access this service, please have a close look at the [Service Template](https://github.com/OpusCapitaBusinessNetwork/service-template/blob/master/README.md) this service is made with.

## Configuration
For proper working _blob_ service requires two environment variables:

* BLOB_ACCOUNT
* BLOB_SECRET

Both of them are secrets and should not be stored in repo.
For correct work of _blob_ service create *blob.env* file at project root.
It should look like:
```
BLOB_ACCOUNT=dev_account_name
 BLOB_KEY=secret_token

```
This file is ignored by git (added to .gitignore), so there will be no risk to commit it to repo by mistake.

## Development
Running service locally:

```bash
git clone https://github.com/OpusCapita/invoice;

git checkout develop;

docker build -t opuscapita/invoice:base -f Dockerfile.base . ;

docker-compose -f docker-compose.yml -f docker-compose.override.yml up;

```

## Running tests
```bash
docker-compose -f docker-compose.override.yml run main npm run test
```

Cloning dependent images might take some time some time (for very first time about 5 minutes).
Then go to _localhost:8080/invoice_

## Deployment (Swarm)
```
docker service create --name invoice --log-driver gelf --log-opt gelf-address=udp://10.0.0.12:12201 --log-opt tag="invoice" --publish mode=host,target=3003,published=3003 --env SERVICE_3003_NAME=invoice --env SERVICE_3003_CHECK_HTTP=/api/invoices --env SERVICE_3003_CHECK_INTERVAL=15s --env SERVICE_3003_CHECK_TIMEOUT=3s --host consul:172.17.0.1 ocbesbn/invoice:dev
```
