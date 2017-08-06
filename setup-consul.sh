curl -X PUT -d ${MYSQL_DATABASE} http://consul:8500/v1/kv/invoice/db-init/database ;
curl -X PUT -d 'root' http://consul:8500/v1/kv/invoice/db-init/user ;
curl -X PUT -d ${MYSQL_ROOT_PASSWORD} http://consul:8500/v1/kv/invoice/db-init/password ;
curl -X PUT -d 'true' http://consul:8500/v1/kv/invoice/db-init/populate-test-data ;
curl -X PUT -d ${REDIS_AUTH} http://consul:8500/v1/kv/invoice/redis-auth ;
curl -X PUT -d ${REDIS_AUTH} http://consul:8500/v1/kv/invoice/redis/password ;
curl -X PUT -d 'svc_invoice' http://consul:8500/v1/kv/invoice/service-client/username ;
curl -X PUT -d 'test' http://consul:8500/v1/kv/invoice/service-client/password ;
curl -X PUT -d 'oidcCLIENT' http://consul:8500/v1/kv/invoice/service-client/client-key ;
curl -X PUT -d '91c0fabd17a9db3cfe53f28a10728e39b7724e234ecd78dba1fb05b909fb4ed98c476afc50a634d52808ad3cb2ea744bc8c3b45b7149ec459b5c416a6e8db242' http://consul:8500/v1/kv/invoice/service-client/client-secret ;
curl -X PUT -d ${GATEWAY_SCHEME} http://consul:8500/v1/kv/invoice/ext-url/scheme ;
curl -X PUT -d ${GATEWAY_IP} http://consul:8500/v1/kv/invoice/ext-url/host ;
curl -X PUT -d ${GATEWAY_PORT} http://consul:8500/v1/kv/invoice/ext-url/port
