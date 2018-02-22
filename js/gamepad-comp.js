var gamepads = {};

//game-pad web component class
class GamepadWrapper extends HTMLElement {

    constructor(){
        super();

        var shadow = this.attachShadow({mode:'open'});

        var wrapper = document.createElement('div');
        wrapper.setAttribute('class', 'wrapper');
        wrapper.classList.add('not_connected');
        //gamepad icon
        var gpadicon = document.createElement('img');
        gpadicon.setAttribute('src', 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" baseProfile="full" viewBox="0 0 85.23 59.66"><path fill="#FFF" fill-opacity="1" d="M12.6901 6.8103c-.651.39514-2.1576 1.45533-2.79191 3.12476-.02502.06564-7.01526 18.76624-8.33069 24.81714C.252075 40.803-.887939 46.7661.339844 51.3262c1.227656 4.56 3.858396 7.2784 8.155396 8.3308 0 0 2.27986-.6139 5.70006-4.7355 3.4199-4.1216 6.7522-9.383 9.2077-10.6108 2.4554-1.2277 3.3885-1.4031 5.3492-1.4031h28.4126c1.2278 0 3.4202.2631 4.9109 1.6663 1.4907 1.403 4.56 4.4722 5.963 6.6645 1.4032 2.1924 6.4894 7.8925 8.1554 8.3309 1.6663.4384 9.0325-3.9461 9.0325-10.6986 0-6.7523-1.4908-15.4339-4.3847-23.9402-2.8939-8.5062-5.6123-14.99544-5.6123-14.99544s-1.1181-1.97315-2.3458-2.76233l-.4177-.26709.1053.00012c-.1973-.98657-1.118-2.43347-1.118-2.43347C64.2188-.0657959 58.2776 0 58.0583 0c-.2192 0-3.0693 1.71008-3.0693 1.71008l-24.543.02185-1.017-.57629L27.8048.129883l-.7833.056274c-.7449.006836-2.1475.104248-4.731.493408-.3501.052857-.6922.115967-1.0256.187989-.4308.084717-.8059.176026-1.0923.273806 0 0-1.4809.21338-3.7329 1.55859-1.4771.82617-2.4484 1.65051-2.7794 2.00354l-.0728.06177.0202-.00354c-.5525.63928-.8889 1.93591-.9176 2.04858zm49.351 15.4501c0-1.6165 1.3105-2.9268 2.9268-2.9268s2.9268 1.3103 2.9268 2.9268c0 1.6164-1.3105 2.9267-2.9268 2.9267s-2.9268-1.3103-2.9268-2.9267zm5.8028-5.4259c0-1.6164 1.3104-2.9268 2.9267-2.9268 1.6166 0 2.9268 1.3104 2.9268 2.9268s-1.3102 2.9267-2.9268 2.9267c-1.6163 0-2.9267-1.3103-2.9267-2.9267zm-11.8789-.296c0-1.6165 1.3104-2.9268 2.9267-2.9268 1.6164 0 2.9268 1.3103 2.9268 2.9268 0 1.6164-1.3104 2.9267-2.9268 2.9267-1.6163 0-2.9267-1.3103-2.9267-2.9267zm6.0692-5.8061c0-1.61631 1.3103-2.92674 2.9267-2.92674 1.6165 0 2.9268 1.31043 2.9268 2.92674 0 1.6165-1.3103 2.9268-2.9268 2.9268-1.6164 0-2.9267-1.3103-2.9267-2.9268zM39.27 7.6405c0-1.80407 1.4624-3.2666 3.2664-3.2666 1.8042 0 3.2666 1.46253 3.2666 3.2666 0 1.80408-1.4624 3.2666-3.2666 3.2666-1.804 0-3.2664-1.46252-3.2664-3.2666zm7.6984 8.6571c0-1.0353.8392-1.8744 1.8745-1.8744 1.0352 0 1.8744.8391 1.8744 1.8744s-.8392 1.8744-1.8744 1.8744c-1.0353 0-1.8745-.8391-1.8745-1.8744zm-12.6085 0c0-1.0353.8391-1.8744 1.8742-1.8744 1.0354 0 1.8745.8391 1.8745 1.8744s-.8391 1.8744-1.8745 1.8744c-1.0351 0-1.8742-.8391-1.8742-1.8744zm-18.7757-.0599c0-2.6033 2.1103-4.7135 4.7134-4.7135 2.6033 0 4.7136 2.1102 4.7136 4.7135 0 2.6031-2.1103 4.7135-4.7136 4.7135-2.6031 0-4.7134-2.1104-4.7134-4.7135zm33.7837 13.1321c0-2.6033 2.1104-4.7135 4.7136-4.7135 2.6032 0 4.7135 2.1102 4.7135 4.7135 0 2.6032-2.1103 4.7135-4.7135 4.7135-2.6032 0-4.7136-2.1103-4.7136-4.7135zm-19.8723-4.4729c0-.2179.1768-.3946.3947-.3946h2.6307c.2179 0 .3946.1767.3946.3946v3.8585h3.8586c.218 0 .3945.1766.3945.3946v2.6308c0 .2179-.1765.3946-.3945.3946h-3.8586v3.8584c0 .218-.1767.3947-.3946.3947h-2.6307c-.2179 0-.3947-.1767-.3947-.3947v-3.8584h-3.8584c-.218 0-.3948-.1767-.3948-.3946V29.15c0-.218.1768-.3946.3948-.3946h3.8584v-3.8585z"/></svg>');
                
        //styling for shadow dom
        var style = document.createElement('style');
        
        style.textContent = `.wrapper {
                                width: 70%;
                                padding: 15%;
                                color: white;
                                transition: color .5s ease-in, background-color .5s ease-in;
                            }
                            .connected {background-color: #00C800;}
                            .not_connected {background-color: #FFC800;}
                            .not_supported {background-color: #FF0000;}
                            `;
        wrapper.appendChild(gpadicon);                        
        shadow.appendChild(style);
        shadow.appendChild(wrapper);

        this.init_API();
    }

    //attaches the gamepad events to the window. responsible for changing styles upon changing states
    init_API(){
        if(navigator.getGamepads != undefined){
            //attach events
            window.addEventListener("gamepadconnected", function(e) { gamepadHandler(e, true); }, false);
            window.addEventListener("gamepaddisconnected", function(e) { gamepadHandler(e, false); }, false);
        }
        else{
            document.getElementsByTagName('game-pad')[0].shadowRoot.querySelector('.wrapper').classList.remove('not_connected');
            document.getElementsByTagName('game-pad')[0].shadowRoot.querySelector('.wrapper').classList.add('not_supported');
        }
    }
}

//handles the connection and disconnection of gamepads, by adding them to the gamepads object
function gamepadHandler(event, connecting) {
    var gamepad = event.gamepad;
    if (connecting) {
        gamepads[gamepad.index] = gamepad;
        document.getElementsByTagName('game-pad')[0].shadowRoot.querySelector('.wrapper').classList.add('connected');
        document.getElementsByTagName('game-pad')[0].shadowRoot.querySelector('.wrapper').classList.remove('not_connected');
        console.log('connected ' + gamepad.id);
    } else {
        delete gamepads[gamepad.index];
        document.getElementsByTagName('game-pad')[0].shadowRoot.querySelector('.wrapper').classList.add('not_connected');
        document.getElementsByTagName('game-pad')[0].shadowRoot.querySelector('.wrapper').classList.remove('connected');
        console.log('deleted ' + + gamepad.id);
    }
}

//registers the custom element to be used in the HTML
customElements.define('game-pad', GamepadWrapper);