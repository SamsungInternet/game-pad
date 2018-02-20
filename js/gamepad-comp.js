var gamepads = {};

class GamepadWrapper extends HTMLElement {

    constructor(){
        super();

        var shadow = this.attachShadow({mode:'open'});

        var wrapper = document.createElement('div');
        wrapper.setAttribute('class', 'wrapper');
        wrapper.classList.add('not_connected');
        //gamepad icon
        var gpadicon = document.createElement('img');
        gpadicon.setAttribute('src', 'https://raw.githubusercontent.com/SamsungInternet/game-pad/master/img/gamepadIcon.svg');
                
        //styling for shadow dom
        var style = document.createElement('style');
        
        style.textContent = '.wrapper {'+
                                'width: 70%;' +
                                'padding: 15%;' +
                                'color: white;' +  
                                'transition: color .5s ease-in, background-color .5s ease-in;' +
                                '}'+
                                '.connected {'+
                                'background-color: #00C800;'+
                                '}'+
                                '.not_connected {'+
                                'background-color: #FFC800;'+
                                '}'+
                                '.not_supported {'+
                                'background-color: #FF0000;'+
                                '}';
        wrapper.appendChild(gpadicon);                        
        shadow.appendChild(style);
        shadow.appendChild(wrapper);

        this.init_API();
    }

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

customElements.define('game-pad', GamepadWrapper);