# Documentação da API

## Verification Routes

### Enviar código de verificação para o email

```http
  POST /send_email
```

| Body   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `email`      | `string` | **Obrigatório:** Email do usuário. |

### Checar código de verificação por email

| Body   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `email`      | `string` | **Obrigatório:** Email utilizado anteriormente. |
| `code`      | `string` | **Obrigatório:** Código recebido nesse email. |


### Registrar usuário

Obs.: Todas as propriedades nessa rota são opcionais exceto `email`

Body           | Tipo        | Descrição
---------------|-------------|----------------------------------------------
`email`        | `string`    | **Obrigatório:** Email do usuário.
`name`         | `string`    | Nome do usuário.
`lastName`     | `string`    | Sobrenome do usuário.
`github`       | `string`    | Perfil do GitHub do usuário.
`linkedin`     | `string`    | Perfil do LinkedIn do usuário.
`about`        | `string`    | Descrição sobre o usuário.
`location`     | `string`    | Localização do usuário.
`birth_date`   | `date`      | Data de nascimento do usuário.
`gender`       | `string`    | Gênero do usuário.
`phone`        | `string`    | Número de telefone do usuário.
`languages`    | `array`     | Lista de idiomas do usuário.
`photo`        | `string`    | URL da foto do usuário.
`scholar`      | `array`     | Lista de informações acadêmicas do usuário.
`experience`   | `array`     | Lista de experiências do usuário.
`projects`     | `array`     | Lista de projetos do usuário.
`skills`       | `array`     | Lista de habilidades do usuário.




#### Primeira etapa da troca de senha

```http
  POST /change_password_send
```

| Body   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `email`      | `string` | **Obrigatório:** Email do usuário. |

#### Retorna 3 possíveis respostas:

status(200): 
```json
"data": {
  "message": "confirmation code sent to email box"
}
```


status(404): 
```json
"data": {
  "message": "Email not registered"
}
```


status(500): Unexpected server error

#

#### Segunda etapa da troca de senha

```http
  POST /change_password_check
```

| Body   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `code`      | `string` | **Obrigatório:** Código enviado por e-mail. |
| `email`      | `string` | **Obrigatório:** Email do usuário. |
| `newPassword`      | `string` | **Obrigatório:** Nova senha do usuário. |

#### Retorna 4 possíveis respostas:

status(202): 
```json
"data": {
  "message": "Successfully changed password"
}
```


status(401): 
```json
"data": {
  "message": "Incorrect verification code"
}
```


status(409): 
```json
"data": {
  "message": "New password same as old"
}
```


status(500): Unexpected server error



## Adm Routes

**ATENÇÃO.:** Em toda rota em que o objeto `property` é obrigatório, o mesmo sempre tem que ser o **PRIMEIRO** no corpo da requisição.

## Respostas da rotas:

Todas as rotas retornarão um objeto com as seguintes propriedades:

| Chave   | Tipo      | Valor possível | Descrição                                   |
| :---------- | :--------- | :--------- | :------------------------------------------ |
| `query`      | `object` | "propriedade": "valorPropriedade" | Propriedade selecionada. |
| `quantity`      | `integer` | 0 ~ N |  Quantidade de estudante(s) selecionado(s). |
| `message`      | `string` | *"..."* |  Mensagem indicando o sucesso ou parâmetro(s) incorreto(s). |
| `response`      | `array` | [ *{...}, {...}* ] |  Objeto(s) dos estudante(s) selecionados. |

`message` retorna 4 possíveis respostas:
```
"Sucesso"
```
```
"Nenhum estudante encontrado"
```
```
"Nome de propriedade inexistente"
```
```
"Acesso negado"
```

Obs.: Exceção onde a rota não retornará um objeto com essas propriedades: Erro capturado pelo try-catch.

### Editar estudante
```http
  PATCH /edit_student
```
#### Parâmetro(s) necessário(s):



| Body   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `propriety`                        | `object` | **Obrigatório:** Valor da propriedade selecionada. |
| `propriedade a ser editada 1`      | `any` | valor da propriedade 1 |
| `propriedade a ser editada 2`      | `any` | valor da propriedade 2|
| `propriedade a ser editada 3`      | `any` | valor da propriedade 3|
| `. . .`      | `. . .` | . . . |


Obs.: Nessa rota você pode editar quantos e quaisquer propriedades do(s) Estudante(s).

### Obter todos os estudantes

```http
  GET /all_students
```

### Obter apenas um estudante
```http
  GET /search_student
```
#### Parâmetro(s) necessário(s):

| Body   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `propriety`                        | `object` | **Obrigatório:** Valor da propriedade selecionada. |



### Apagar um estudante
```http
  DELETE /delete_student
```
#### Parâmetro(s) necessário(s):

| Body   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `propriety`                        | `object` | **Obrigatório:** Valor da propriedade selecionada. |



### Registrar um estudante (sem precisar verificar o email)
Obs.: só use essa rota para fins de desenvolvimento e preencha todas as propriedades para evitar problemas ao usar o documento desse objeto.

```http
  POST /raw_register
```

Todas as propriedades do Schema Student:

Body           | Tipo        | Descrição
---------------|-------------|----------------------------------------------
`email`        | `string`    | Email do usuário.
`password`     | `string`    | Senha do usuário. 
`verifiedUser` | `boolean`   | Se o usuário é verificado ou não.
`name`         | `string`    | Nome do usuário.
`lastName`     | `string`    | Sobrenome do usuário.
`github`       | `string`    | Perfil do GitHub do usuário.
`linkedin`     | `string`    | Perfil do LinkedIn do usuário.
`about`        | `string`    | Descrição sobre o usuário.
`location`     | `string`    | Localização do usuário.
`birth_date`   | `date`      | Data de nascimento do usuário.
`gender`       | `string`    | Gênero do usuário.
`phone`        | `string`    | Número de telefone do usuário.
`languages`    | `array`     | Lista de idiomas do usuário.
`photo`        | `string`    | URL da foto do usuário.
`scholar`      | `array`     | Lista de informações acadêmicas do usuário.
`experience`   | `array`     | Lista de experiências do usuário.
`projects`     | `array`     | Lista de projetos do usuário.
`skills`       | `array`     | Lista de habilidades do usuário.

## Exemplo de requisição:

```http
  POST /edit_student
```

### Corpo da requisição:
```json
{

  "name": "João",
  "location": "Realengo"
  "about": "Olá, sou o João."
  "phone": "21999999999"

}
```
Todo Estudante com o `name` "João" terá seu `location`, `about` e `phone` editados.
