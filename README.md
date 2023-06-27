## Documentação da API

#### Primeira etapa da troca de senha

```http
  POST /change_password_part1
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
<br/>

status(404): 
```json
"data": {
  "message": "Email not registered"
}
```
<br/>

status(500): Unexpected server error

#

#### Segunda etapa da troca de senha

```http
  POST /change_password_part2
```

| Body   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `code`      | `string` | **Obrigatório**. Código enviado por e-mail. |
| `email`      | `string` | **Obrigatório**. Email do usuário. |
| `newPassword`      | `string` | **Obrigatório**. Nova senha do usuário. |

#### Retorna 3 possíveis respostas:

status(202): 
```json
"data": {
  "message": "Successfully changed password"
}
```
<br/>

status(400): 
```json
"data": {
  "message": "Incorrect verification code"
}
```
<br/>

status(500): Unexpected server error
