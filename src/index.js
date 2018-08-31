import React, { PureComponent }  from 'react';
import PropTypes from 'prop-types';
import { View, WebView, TextInput } from 'react-native';
import fns  from './functions';

export const EVENT_TYPE_ON_DATA = 'onData';
export const EVENT_TYPE_ON_FOCUS = 'onFocus';
export const EVENT_TYPE_ON_BLUR = 'onBlur';
export const EVENT_TYPE_ON_CHANGE = 'onChange';

class CheckoutInput extends PureComponent{

    
    handleMessage = ({nativeEvent})=>{
        if (nativeEvent.data) {
            let data = JSON.parse(nativeEvent.data);
            if (data.event == EVENT_TYPE_ON_DATA) {
                this.props.onData(data);
            } else if (data.event == EVENT_TYPE_ON_FOCUS) {
                this.props.onFocus(data);
            } else if (data.event == EVENT_TYPE_ON_BLUR) {
                this.props.onBlur(data);
            } else if (data.event == EVENT_TYPE_ON_CHANGE) {
                this.props.onChange(data);
            } 
        }
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
    onData: () => {},
    onFocus: () => {},
    onBlur: () => {},
    onChange: () => {},
    homologacao: false,
    containerStyle: { height: 40, width: 350 },
    placeholder: 'Valid card number'

}

CheckoutInput.propTypes = {
    credencial: PropTypes.string.isRequired,
    homologacao: PropTypes.bool,
    inputStyle: PropTypes.style,
    containerStyle: PropTypes.style,
    placeholder: PropTypes.string,
    onData: PropTypes.func.isRequired,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
}


export default CheckoutInput;