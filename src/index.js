import React, { PureComponent }  from 'react';
import PropTypes from 'prop-types';
import { View, WebView, TextInput } from 'react-native';
import fns  from './functions';

class CheckoutInput extends PureComponent{

    handleMessage = ({nativeEvent})=>{
        if(nativeEvent.data)
            this.props.onData( JSON.parse(nativeEvent.data) );
    }

    render(){
        const { credencial, homologacao, inputStyle, placeholder } = this.props;
        const _inputStyle = fns.mapRnStyleToHtmlStyle(inputStyle);
        const options = {
            credencial,
            homologacao
        }

        return(
            <View style={this.props.containerStyle}>
                <WebView
                    source={{
                        baseUrl: '',
                        html: fns.generateHtmlCode(options)(_inputStyle, placeholder)
                    }}
                    style={{flex:1, width: null, height: null }}
                    injectedJavaScript={fns.patchPostMessageFunction()}
                    onMessage={this.handleMessage}
                    javaScriptEnabled
                    bounces={false}
                    mixedContentMode={'always'}
                />
            </View>
        )
    }
}

CheckoutInput.defaultProps = {
    onData: ()=>{},
    homologacao: false,
    containerStyle: { height: 40, width: 350 },
    placeholder: 'Valid card number'

}

CheckoutInput.propTypes = {
    credencial: PropTypes.string.isRequired,
    homologacao: PropTypes.bool,
    onData: PropTypes.func.isRequired,
    inputStyle: PropTypes.style,
    containerStyle: PropTypes.style,
    placeholder: PropTypes.string
}


export default CheckoutInput;
