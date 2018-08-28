## react-native-pjbank-checkout-input

### Componente para auxiliar obtenção de token para o checkout em aplicações react-native.

| Prop | type | Description |
|--|--|--|
| credencial | string | dever ser fornecida uma credencial para a geração de token |
| homologacao | boolean | Se for passado `true` é trocado para o ambiente de homologação |
| placeholder | string | Placeholder do componente input |
| onData | function | Retorna um objeto no formato: `{token:'xxxxxx', bandeira:'xxxxxx'}`, que contém o token e a bandeira do cartão |
| containerStyle | object | componente de estilo para o componente pai do input (wrapper) |
| inputStyle | object | objeto com propriedades para o input, podem ser passadas a maioria das propriedades validas de um componente \<TextInput/>. As propriedades serão merjadas  para o input | 

#### Como utilizar
Começe instalando o componente.

    npm install --save react-native-pjbank-checkout-input

---

Importe o componente 

    import  CheckoutInput  from  'react-native-pjbank-checkout-input';

Depois de importado o componente basta utiliza-lo em seu componente.

   
    <CheckoutInput
	    inputStyle={{
		    fontSize: 20
		    ...
	    }}
	    containerStyle:{{
	        height: 20,
	        width: 300,
	        ...
	    }}
	    credencial='xxxxxxxxxxxxxxxxxxx'
	    onData={(data)=>console.log('O token: '+ data.token + 'bandeira'+ data.bandeira)}
    />
