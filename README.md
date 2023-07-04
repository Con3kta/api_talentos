# Documentação da API

## Verification Routes

### Enviar código de verificação para o email

```http
  POST /send_email
```

| Body   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `email`      | `string` | **Obrigatório**. Email do usuário. |

### Checar código de verificação por email

| Body   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `email`      | `string` | **Obrigatório**. Email utilizado anteriormente. |
| `code`      | `string` | **Obrigatório**. Código recebido nesse email. |


### Registrar usuário

Obs.: Todas as propriedades nessa rota são opcionais exceto `email`

Body           | Tipo        | Descrição
---------------|-------------|----------------------------------------------
`email`        | `string`    | **Obrigatório**. Email do usuário.
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
| `email`      | `string` | **Obrigatório**. Email do usuário. |

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
| `code`      | `string` | **Obrigatório**. Código enviado por e-mail. |
| `email`      | `string` | **Obrigatório**. Email do usuário. |
| `newPassword`      | `string` | **Obrigatório**. Nova senha do usuário. |

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

## Parâmetros necessários:

Todas as rotas com ``/:property`` necessitam obrigatoriamente de:

| Propriedade   | Tipo       | Campo | Descrição                                   |
| :---------- | :--------- |  :--------- | :------------------------------------------ |
| `property`      | `string` | Parâmetro de url | Nome da propriedade a ser selecionada. |
| `target`      | `string` | Corpo da requisição  |Valor da propriedade a ser selecionada. |

## Resposta da rota:

Todas as rotas retornarão um objeto com as seguintes propriedades:

| Body   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `query`      | `object` | Consulta realizada. |
| `quantity`      | `integer` |  Quantidade de estudante(s) selecionado(s). |
| `message`      | `string` |  Mensagem indicando o sucesso ou parâmetro(s) incorretos. |
| `response`      | `array` |  Objeto(s) dos estudante(s) selecionados. |

Obs.: Exceção onde a rota não retornará um objeto com essas propriedades: Erro capturado pelo try-catch.

### Editar estudante

```http
  PATCH /edit_student/:property
```

### Obter todos os estudantes

```http
  GET /all_students
```

### Obter apenas um estudante

```http
  GET /search_student/:property
```

### Apagar um estudante

```http
  DELETE /delete_student/:property
```

### Registrar um estudante (sem precisar verificar o email)
Obs.: só use essa rota para fins de desenvolvimento e preencha todas as propriedades para evitar problemas ao usar o documento desse objeto.

```http
  POST /raw_register
```

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