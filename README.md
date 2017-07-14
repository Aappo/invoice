# Invoice service

Invoice service provides different functionality for customers and suppliers fucntionality (may be will be refactored in the future).
Sellside (supplier) functionality:
* InvoiceRecipt CRUD application 
* Invoice Receipt impor/export (json format)

Buyside (customer) functionality (TBD/under development):
* approval & invoice wokflow part

For further information on how to create, configure, document and access this service, please have a close look at the [Service Template](https://github.com/OpusCapitaBusinessNetwork/service-template/blob/master/README.md) this service is made with.

## Development
Running service locally:

```bash
git clone https://github.com/OpusCapita/invoice;

git checkout develop;

docker build -t opuscapita/invoice-base:dev -f Dockerfile.base . ;

docker-compose up;

```

Cloning dependent images might take some time some time (for very first time about 5 minutes).
Then go to _localhost:8080/invoice_

## Deployment (Swarm)
```
docker service create --name invoice --log-driver gelf --log-opt gelf-address=udp://10.0.0.12:12201 --log-opt tag="invoice" --publish mode=host,target=3003,published=3003 --env SERVICE_3003_NAME=invoice --env SERVICE_3003_CHECK_HTTP=/api/invoices --env SERVICE_3003_CHECK_INTERVAL=15s --env SERVICE_3003_CHECK_TIMEOUT=3s --host consul:172.17.0.1 ocbesbn/invoice:dev
```
