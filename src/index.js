import React, { PureComponent }  from 'react';
import PropTypes from 'prop-types';
import { View, WebView, TextInput } from 'react-native';
import fns  from './functions';

export const EVENT_TYPE_ON_DATA = 'onData';
export const EVENT_TYPE_ON_FOCUS = 'onFocus';
export const EVENT_TYPE_ON_BLUR = 'onBlur';
export const EVENT_TYPE_ON_CHANGE = 'onChange';
export const EVENT_TYPE_ON_DONE = 'onDone';

class CheckoutInput extends PureComponent{

    
    handleMessage = ({nativeEvent})=>{        
        if (nativeEvent.data) {
            let data = JSON.parse(nativeEvent.data);
            if (data.event == EVENT_TYPE_ON_DATA) {
                delete data.event;
                this.props.onData(data);
            } else if (data.event == EVENT_TYPE_ON_FOCUS) {
                this.props.onFocus();
            } else if (data.event == EVENT_TYPE_ON_BLUR) {
                this.props.onBlur();
            } else if (data.event == EVENT_TYPE_ON_CHANGE) {
                this.props.onChange(data.text);
            } else if (data.event == EVENT_TYPE_ON_DONE) {
                this.props.onDone();
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
                        baseUrl: '',
                        html: fns.generateHtmlCode(options)(_inputStyle, placeholder)
                    }}
                    style={{flex:1, width: null, height: null }}
                    injectedJavaScript={fns.patchPostMessageFunction()}
                    onMessage={this.handleMessage}
                    javaScriptEnabled
                    bounces={false}
                    mixedContentMode={'always'}
                    originWhitelist={['*']}
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
    onDone: () => {},
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
    onDone: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
}


export default CheckoutInput;
