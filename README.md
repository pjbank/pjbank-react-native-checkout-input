## react-native-pjbank-checkout-input

### Componente para auxiliar obtenção de token para o checkout em aplicações react-native.

| Prop | type | Description |
|--|--|--|
| credencial | string | dever ser fornecida uma credencial para a geração de token |
| placeholder | string | Placeholder do componente input |
| homologacao | boolean | Se for passado `true` é trocado para o ambiente de homologação |
| blurOnDone | boolean | Remover teclado quando sair de foco |
| containerStyle | object | componente de estilo para o componente pai do input (wrapper) |
| inputStyle | object | objeto com propriedades para o input, podem ser passadas a maioria das propriedades validas de um componente \<TextInput/>. As propriedades serão merjadas  para o input | 
| onData | function | Retorna um objeto no formato: `{token:'xxxxxx', bandeira:'xxxxxx'}`, que contém o token e a bandeira do cartão |
| onFocus | function | Callback invocado quando o input entra em foco | 
| onBlur | function | Callback invocado quando o input sai de foco | 
| onChange | function | `{(text) => console.log('text')}` Callback invocado quando o há alguma alteração de texto no input | 
| onDone | function | `{() => console.log('onDone')}` Callback invocado quando o clica no `actionButton` do teclado nativo | 

#### Como utilizar
Começe instalando o componente.

```bash
npm install --save react-native-pjbank-checkout-input
```
---

Importe o componente 
```js
import  CheckoutInput  from  'react-native-pjbank-checkout-input';
```
Depois de importado o componente basta utiliza-lo em seu componente.

```javascript
<CheckoutInput
    inputStyle={{
	    fontSize: 20
	    ...
    }}
    containerStyle={{
	height: 20,
	width: 300,
	...
    }}
    credencial='xxxxxxxxxxxxxxxxxxx'
    onData={(data) => console.log('O token: ' + data.token + 'bandeira' + data.bandeira)}
/>
```
