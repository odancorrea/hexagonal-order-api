# Welcome to StackEdit!


# hexagonal-order-api


Esta aplicacao fornece uma API construida com base nas boas praticas de desenvolvimento.

Para subir a aplicacao em ambiente de desenvolvimento:

- Utilize o Docker Compose para subir o ambiente completo
- - Rode `docker compose build`
- - Rode `docker compose up`


Em ambientes produtivos, temos uma pasta *terraform* com a estrutura criada para deploy em Cloud. nesta pasta estão separados os scripts para deploy baseado na stack a seguir:

- RDS com Postgres
- ECR e ECS
- API Gateway com autenticação com Cognito

O video de explicação e integração funcionando esta a seguir: https://youtu.be/olK175MmdOU