export default (function(){

    const normalizeKey = key => key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

    const normalizeValue = value => typeof value == 'number'? `${value}px` : value;

    mapRnStyleToHtmlStyle = (styleObj) => {
        if(!styleObj) return '';
        const keys = Object.keys(styleObj);    
        return keys.reduce((acc, next)=>{
            return `${acc}${acc&&';'} ${ normalizeKey(next) }: ${ normalizeValue(styleObj[next]) }`;
        },'');
    }

    patchPostMessageFunction = ()=>{
        const _patchPostMessageFunction = function() {
            var originalPostMessage = window.postMessage;
            
            var patchedPostMessage = function(message, targetOrigin, transfer) { 
                originalPostMessage(message, targetOrigin, transfer);
            };
            
            patchedPostMessage.toString = function() { 
                return String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage');
            };
            
            window.postMessage = patchedPostMessage;
        
        };
        return '(' + String(_patchPostMessageFunction) + ')();';
    }

    generateHtmlCode = config => inputStyle => `
        <html>
            <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0"> 
            <script src="https://s3-sa-east-1.amazonaws.com/widgets.superlogica.net/embed.js" ></script>
            <script type="text/javascript">
                superlogica.require("pjbank");
                superlogica.pjbank("checkout_transparente","${config.credencial}");
                function handleChange(e){window.postMessage(e)}
            </script>
            <body style='margin: 0; padding: 0'>
                <input type='number' class="pjbank-cartao" id="cartao" placeholder="${config.placeholder}" required style='width:100%; height: 100%; border-color: transparent; ${inputStyle}'>
                <input type="hidden" name="pjbank-token" class="pjbank-token" onchange='handleChange(this.value)'>
            </body>
        </html>
    `;

    return{
        mapRnStyleToHtmlStyle,
        patchPostMessageFunction,
        generateHtmlCode
    }
})();
