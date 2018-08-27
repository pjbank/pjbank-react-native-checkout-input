import React, { PureComponent }  from 'react';
import PropTypes from 'prop-types';
import { View, WebView, TextInput } from 'react-native';
import fns  from './functions';


class CheckoutInput extends PureComponent{

    handleMessage = ({nativeEvent})=>{
        if(nativeEvent.data)
            this.props.onToken(nativeEvent.data)
    }

    render(){
        const { inputStyle, placeholder } = this.props;
        const _inputStyle = fns.mapRnStyleToHtmlStyle(inputStyle);
        return(
            <View style={this.props.containerStyle}>
                <WebView
                    ref={w=>this.wview = w}
                    source={{
                        html: fns.generateHtmlCode({credencial: this.props.credencial, placeholder})(_inputStyle)
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
    onToken: ()=>{},
    containerStyle: { height: 40, width: 350 },
    placeholder: 'Valid card number'

}

CheckoutInput.propTypes = {
    credencial: PropTypes.string.isRequired,
    onToken: PropTypes.func.isRequired,
    inputStyle: TextInput.propTypes.style,
    containerStyle: View.propTypes.style,
    placeholder: PropTypes.string
}


export default CheckoutInput;