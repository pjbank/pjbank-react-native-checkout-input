## react-native-pjbank-checkout-input

### Componente para auxiliar obtenção de token para o checkout em aplicações react-native.

| Prop | type | Description |
|--|--|--|
| credencial | string | dever ser fornecida uma credencial para a geração de token |
| onToken | function | função invocada quando o componente recebe o token |
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
	    onToken={(token)=>console.log('O token: '+token)}
    />
