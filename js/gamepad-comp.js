class GamepadWrapper extends HTMLElement {

    constructor(){
        super();
        var shadow = this.attachShadow({mode:'open'});

        var wrapper = document.createElement('div');
        wrapper.setAttribute('class', 'wrapper');
        //gamepad icon
        var gpadicon = document.createElement('img');
        gpadicon.setAttribute('src', '/img/gamepadIcon.svg');
                
        //styling for shadow dom
        var style = document.createElement('style');
        style.textContent = '.wrapper {'+
                                'position: fixed;' +
                                'top: 0px;' +
                                'right: 0px;' +
                                'height: 2em;' +
                                'width: 2em;' +
                                'border-radius: 50%;' +
                                'padding: .5em;' +
                                'background-color: khaki;' +
                                'color: darkgoldenrod;' +  
                                'transition: color .5s ease-in, background-color .5s ease-in;' +
                                '}';
        wrapper.appendChild(gpadicon);                        
        shadow.appendChild(style);
        shadow.appendChild(wrapper);
    }
}

customElements.define('game-pad', GamepadWrapper);