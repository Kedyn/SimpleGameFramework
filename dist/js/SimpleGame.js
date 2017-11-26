!function e(n,t,o){function s(a,r){if(!t[a]){if(!n[a]){var c="function"==typeof require&&require;if(!r&&c)return c(a,!0);if(i)return i(a,!0);var _=new Error("Cannot find module '"+a+"'");throw _.code="MODULE_NOT_FOUND",_}var E=t[a]={exports:{}};n[a][0].call(E.exports,function(e){var t=n[a][1][e];return s(t||e)},E,E.exports,e,n,t,o)}return t[a].exports}for(var i="function"==typeof require&&require,a=0;a<o.length;a++)s(o[a]);return s}({1:[function(e,n,t){"use strict";t.__esModule=!0;var o=e("./SceneManager"),s=e("./Tools/constants"),i={title:"Simple Game",frame_rate:60,debug_mode:!0,canvas:{id:"SimpleGame",width:960,height:540},version:s.VERSION},a=function(){function e(){}return e.GetInstance=function(){return e.instance||(e.instance=new e),e.instance},e.prototype.create=function(e){return e?this.checkOptions(e):this.options=i,this.checkCanvas()?(this.canvas.getContext("2d").transform(1,0,0,-1,0,this.canvas.height),this.time=new Date,this.frame_counter=0,this.last_frame_time=this.time.getTime(),this.log("Game creation successful"),!0):(this.log("Game creation failed"),!1)},e.prototype.init=function(){return o.SimpleSceneManager.currentScene()?(requestAnimationFrame(this.animate),this.log("Initiating game animation"),!0):(this.log("Failed to initialize game [no game scene]"),!1)},e.prototype.getCanvas=function(){return this.canvas},e.prototype.log=function(e){this.options.debug_mode&&console.log(this.options.title+": "+e+"...")},e.prototype.checkOptions=function(e){e.title||(e.title=i.title),e.frame_rate||(e.frame_rate=i.frame_rate),e.debug_mode||(e.debug_mode=i.debug_mode),e.canvas?(e.canvas.id||(e.canvas.id=i.canvas.id),e.canvas.width||(e.canvas.width=i.canvas.width),e.canvas.height||(e.canvas.height=i.canvas.height)):e.canvas=i.canvas,this.options=e},e.prototype.checkCanvas=function(){var e=document.getElementById(this.options.canvas.id);return e||((e=document.createElement("canvas")).width=this.options.canvas.width,e.height=this.options.canvas.height,document.getElementsByTagName("body")[0].appendChild(e)),"CANVAS"===e.tagName&&(this.canvas=e,!0)},e.prototype.animate=function(){var e=new Date,n=e.getTime()-t.SimpleGame.last_frame_time,i=s.SECOND/t.SimpleGame.options.frame_rate;n>i&&(o.SimpleSceneManager.update(n),o.SimpleSceneManager.render(n),t.SimpleGame.last_frame_time=e.getTime()-n%i),requestAnimationFrame(t.SimpleGame.animate)},e}();t.SimpleGame=a.GetInstance()},{"./SceneManager":3,"./Tools/constants":5}],2:[function(e,n,t){"use strict";t.__esModule=!0;var o=e("./Tools/constants"),s=e("./Tools/KeyCode"),i=e("./Tools/constants"),a=e("./Game"),r=function(){function e(){this.keys=[],this.mouse_buttons=[],this.resetCallbacks();for(var e in s.KEYCODE){var n=parseInt(e,10);isNaN(n)||(this.keys[n]=!1)}this.mouse_buttons[i.MOUSE_BUTTON.LEFT]=!1,this.mouse_buttons[i.MOUSE_BUTTON.MIDDLE]=!1,this.mouse_buttons[i.MOUSE_BUTTON.RIGHT]=!1,this.mouse_pos={x:0,y:0},this.initiated=!1}return e.GetInstance=function(){return e.instance||(e.instance=new e),e.instance},e.prototype.listen=function(e,n){this.initiated||this.init(),e==o.INPUT_TYPE.KEYDOWN?this.callbacks.onKeyDown.push(n):e==o.INPUT_TYPE.KEYUP?this.callbacks.onKeyUp.push(n):e==o.INPUT_TYPE.MOUSE_MOVE?this.callbacks.onMouseMove.push(n):e==o.INPUT_TYPE.MOUSE_DOWN?this.callbacks.onMouseDown.push(n):e==o.INPUT_TYPE.MOUSE_UP&&this.callbacks.onMouseUp.push(n)},e.prototype.removeListens=function(){this.resetCallbacks()},e.prototype.isKeyDown=function(e){return!!this.keys[e]&&this.keys[e]},e.prototype.mousePos=function(){return this.mouse_pos},e.prototype.isMouseButtonDown=function(e){return!!this.mouse_buttons[e]&&this.mouse_buttons[e]},e.prototype.init=function(){a.SimpleGame.getCanvas().tabIndex=0,a.SimpleGame.getCanvas().addEventListener("keydown",this.onKeyDown,!1),a.SimpleGame.getCanvas().addEventListener("keyup",this.onKeyUp,!1),a.SimpleGame.getCanvas().addEventListener("mousemove",this.onMouseMove,!1),a.SimpleGame.getCanvas().addEventListener("mousedown",this.onMouseDown,!1),a.SimpleGame.getCanvas().addEventListener("mouseup",this.onMouseUp,!1),a.SimpleGame.getCanvas().onclick=function(e){return!1},a.SimpleGame.getCanvas().oncontextmenu=function(e){return!1},a.SimpleGame.getCanvas().onwheel=function(e){return!1},a.SimpleGame.getCanvas().focus(),this.initiated=!0,a.SimpleGame.log("Input Handler initiated...")},e.prototype.resetCallbacks=function(){this.callbacks={onKeyDown:[],onKeyUp:[],onMouseMove:[],onMouseDown:[],onMouseUp:[]}},e.prototype.onKeyDown=function(e){e.preventDefault(),t.SimpleInputHandler.keys[e.keyCode]=!0;for(var n=0,o=t.SimpleInputHandler.callbacks.onKeyDown;n<o.length;n++){(0,o[n])(e.keyCode)}},e.prototype.onKeyUp=function(e){t.SimpleInputHandler.keys[e.keyCode]=!1;for(var n=0,o=t.SimpleInputHandler.callbacks.onKeyUp;n<o.length;n++){(0,o[n])(e.keyCode)}},e.prototype.onMouseMove=function(e){var n=e.pageX,o=e.pageY;n-=a.SimpleGame.getCanvas().offsetLeft,o-=a.SimpleGame.getCanvas().offsetTop,t.SimpleInputHandler.mouse_pos.x=n,t.SimpleInputHandler.mouse_pos.y=o;for(var s=0,i=t.SimpleInputHandler.callbacks.onMouseMove;s<i.length;s++){(0,i[s])(t.SimpleInputHandler.mouse_pos)}},e.prototype.onMouseDown=function(e){t.SimpleInputHandler.mouse_buttons[e.button]=!0;for(var n=0,o=t.SimpleInputHandler.callbacks.onMouseDown;n<o.length;n++){(0,o[n])(e.button,t.SimpleInputHandler.mouse_pos)}},e.prototype.onMouseUp=function(e){t.SimpleInputHandler.mouse_buttons[e.button]=!1;for(var n=0,o=t.SimpleInputHandler.callbacks.onMouseUp;n<o.length;n++){(0,o[n])(e.button,t.SimpleInputHandler.mouse_pos)}},e}();t.SimpleInputHandler=r.GetInstance()},{"./Game":1,"./Tools/KeyCode":4,"./Tools/constants":5}],3:[function(e,n,t){"use strict";t.__esModule=!0;var o=e("./Game"),s=e("./InputHandler"),i=e("./Tools/constants"),a=function(){function e(){this.scenes=[],this.input_handler=!1}return e.GetInstance=function(){return e.instance||(e.instance=new e),e.instance},e.prototype.pushScene=function(e){this.input_handler||(s.SimpleInputHandler.listen(i.INPUT_TYPE.KEYDOWN,this.onKeyDown),s.SimpleInputHandler.listen(i.INPUT_TYPE.KEYUP,this.onKeyUp),s.SimpleInputHandler.listen(i.INPUT_TYPE.MOUSE_MOVE,this.onMouseMove),s.SimpleInputHandler.listen(i.INPUT_TYPE.MOUSE_DOWN,this.onMouseDown),s.SimpleInputHandler.listen(i.INPUT_TYPE.MOUSE_UP,this.onMouseUp),this.input_handler=!0),this.scenes.push(e)},e.prototype.changeScene=function(e){this.scenes.length?this.scenes[this.scenes.length-1].id!=e.id?(this.scenes.push(e),this.onCurrentSceneExit()?this.scenes.splice(this.scenes.length-2,1):o.SimpleGame.log("Error exiting scene "+this.currentScene().id),this.onCurrentSceneEnter()||o.SimpleGame.log("Error while changing scene")):o.SimpleGame.log("Cannot change to the same scene"):o.SimpleGame.log("Cannot change scene when there are no current scenes")},e.prototype.popScene=function(){this.scenes.length>1&&this.onCurrentSceneExit()&&this.scenes.pop()},e.prototype.currentScene=function(){return this.scenes[this.scenes.length-1]},e.prototype.update=function(e){this.currentScene().update(e);for(var n=0,t=this.currentScene().game_objects;n<t.length;n++){t[n].update()}},e.prototype.render=function(e){this.currentScene().render(e);for(var n=0,t=this.currentScene().game_objects;n<t.length;n++){t[n].render()}},e.prototype.onCurrentSceneEnter=function(){var e=!1;if(this.currentScene().onEnter()){e=!0;for(var n=0,t=!0,o=this.currentScene().game_objects;t;)n<o.length?o[n].onEnter()||(e=!1,t=!1):t=!1,n++}return e},e.prototype.onCurrentSceneExit=function(){var e=!1;if(this.currentScene().onExit()){e=!0;for(var n=0,t=!0,o=this.currentScene().game_objects;t;)n<o.length?o[n].onExit()||(e=!1,t=!1):t=!1,n++}return e},e.prototype.onKeyDown=function(e){t.SimpleSceneManager.currentScene().onKeyDown(e);for(var n=0,o=t.SimpleSceneManager.currentScene().game_objects;n<o.length;n++){o[n].onKeyDown(e)}},e.prototype.onKeyUp=function(e){t.SimpleSceneManager.currentScene().onKeyUp(e);for(var n=0,o=t.SimpleSceneManager.currentScene().game_objects;n<o.length;n++){o[n].onKeyUp(e)}},e.prototype.onMouseMove=function(e){t.SimpleSceneManager.currentScene().onMouseMove(e.x,e.y);for(var n=0,o=t.SimpleSceneManager.currentScene().game_objects;n<o.length;n++){o[n].onMouseMove(e.x,e.y)}},e.prototype.onMouseDown=function(e,n){t.SimpleSceneManager.currentScene().onMouseDown(e,n.x,n.y);for(var o=0,s=t.SimpleSceneManager.currentScene().game_objects;o<s.length;o++){s[o].onMouseDown(e,n.x,n.y)}},e.prototype.onMouseUp=function(e,n){t.SimpleSceneManager.currentScene().onMouseUp(e,n.x,n.y);for(var o=0,s=t.SimpleSceneManager.currentScene().game_objects;o<s.length;o++){s[o].onMouseUp(e,n.x,n.y)}},e}();t.SimpleSceneManager=a.GetInstance()},{"./Game":1,"./InputHandler":2,"./Tools/constants":5}],4:[function(e,n,t){"use strict";t.__esModule=!0;!function(e){e[e.BACKSPACE=8]="BACKSPACE",e[e.TAB=9]="TAB",e[e.ENTER=13]="ENTER",e[e.SHIFT=16]="SHIFT",e[e.CTRL=17]="CTRL",e[e.ALT=18]="ALT",e[e.PAUSE=19]="PAUSE",e[e.CAPS_LOCK=20]="CAPS_LOCK",e[e.ESCAPE=27]="ESCAPE",e[e.SPACE=32]="SPACE",e[e.PAGE_UP=33]="PAGE_UP",e[e.PAGE_DOWN=34]="PAGE_DOWN",e[e.END=35]="END",e[e.HOME=36]="HOME",e[e.LEFT_ARROW=37]="LEFT_ARROW",e[e.UP_ARROW=38]="UP_ARROW",e[e.RIGHT_ARROW=39]="RIGHT_ARROW",e[e.DOWN_ARROW=40]="DOWN_ARROW",e[e.INSERT=45]="INSERT",e[e.DELETE=46]="DELETE",e[e.KEY_0=48]="KEY_0",e[e.KEY_1=49]="KEY_1",e[e.KEY_2=50]="KEY_2",e[e.KEY_3=51]="KEY_3",e[e.KEY_4=52]="KEY_4",e[e.KEY_5=53]="KEY_5",e[e.KEY_6=54]="KEY_6",e[e.KEY_7=55]="KEY_7",e[e.KEY_8=56]="KEY_8",e[e.KEY_9=57]="KEY_9",e[e.KEY_A=65]="KEY_A",e[e.KEY_B=66]="KEY_B",e[e.KEY_C=67]="KEY_C",e[e.KEY_D=68]="KEY_D",e[e.KEY_E=69]="KEY_E",e[e.KEY_F=70]="KEY_F",e[e.KEY_G=71]="KEY_G",e[e.KEY_H=72]="KEY_H",e[e.KEY_I=73]="KEY_I",e[e.KEY_J=74]="KEY_J",e[e.KEY_K=75]="KEY_K",e[e.KEY_L=76]="KEY_L",e[e.KEY_M=77]="KEY_M",e[e.KEY_N=78]="KEY_N",e[e.KEY_O=79]="KEY_O",e[e.KEY_P=80]="KEY_P",e[e.KEY_Q=81]="KEY_Q",e[e.KEY_R=82]="KEY_R",e[e.KEY_S=83]="KEY_S",e[e.KEY_T=84]="KEY_T",e[e.KEY_U=85]="KEY_U",e[e.KEY_V=86]="KEY_V",e[e.KEY_W=87]="KEY_W",e[e.KEY_X=88]="KEY_X",e[e.KEY_Y=89]="KEY_Y",e[e.KEY_Z=90]="KEY_Z",e[e.LEFT_META=91]="LEFT_META",e[e.RIGHT_META=92]="RIGHT_META",e[e.SELECT=93]="SELECT",e[e.NUMPAD_0=96]="NUMPAD_0",e[e.NUMPAD_1=97]="NUMPAD_1",e[e.NUMPAD_2=98]="NUMPAD_2",e[e.NUMPAD_3=99]="NUMPAD_3",e[e.NUMPAD_4=100]="NUMPAD_4",e[e.NUMPAD_5=101]="NUMPAD_5",e[e.NUMPAD_6=102]="NUMPAD_6",e[e.NUMPAD_7=103]="NUMPAD_7",e[e.NUMPAD_8=104]="NUMPAD_8",e[e.NUMPAD_9=105]="NUMPAD_9",e[e.MULTIPLY=106]="MULTIPLY",e[e.ADD=107]="ADD",e[e.SUBTRACT=109]="SUBTRACT",e[e.DECIMAL=110]="DECIMAL",e[e.DIVIDE=111]="DIVIDE",e[e.F1=112]="F1",e[e.F2=113]="F2",e[e.F3=114]="F3",e[e.F4=115]="F4",e[e.F5=116]="F5",e[e.F6=117]="F6",e[e.F7=118]="F7",e[e.F8=119]="F8",e[e.F9=120]="F9",e[e.F10=121]="F10",e[e.F11=122]="F11",e[e.F12=123]="F12",e[e.NUM_LOCK=144]="NUM_LOCK",e[e.SCROLL_LOCK=145]="SCROLL_LOCK",e[e.SEMICOLON=186]="SEMICOLON",e[e.EQUALS=187]="EQUALS",e[e.COMMA=188]="COMMA",e[e.DASH=189]="DASH",e[e.PERIOD=190]="PERIOD",e[e.FORWARD_SLASH=191]="FORWARD_SLASH",e[e.GRAVE_ACCENT=192]="GRAVE_ACCENT",e[e.OPEN_BRACKET=219]="OPEN_BRACKET",e[e.BACK_SLASH=220]="BACK_SLASH",e[e.CLOSE_BRACKET=221]="CLOSE_BRACKET",e[e.SINGLE_QUOTE=222]="SINGLE_QUOTE"}(t.KEYCODE||(t.KEYCODE={}))},{}],5:[function(e,n,t){"use strict";t.__esModule=!0,t.VERSION="0.0.2",t.SECOND=1e3;!function(e){e[e.KEYDOWN=0]="KEYDOWN",e[e.KEYUP=1]="KEYUP",e[e.MOUSE_MOVE=2]="MOUSE_MOVE",e[e.MOUSE_DOWN=3]="MOUSE_DOWN",e[e.MOUSE_UP=4]="MOUSE_UP"}(t.INPUT_TYPE||(t.INPUT_TYPE={}));!function(e){e[e.LEFT=0]="LEFT",e[e.MIDDLE=1]="MIDDLE",e[e.RIGHT=2]="RIGHT"}(t.MOUSE_BUTTON||(t.MOUSE_BUTTON={})),t.DEFAULT_FONT="impact",t.DEFAULT_FONT_SIZE=16,t.THEME_BACKGROUND="black",t.THEME_FORECOLOR="white",t.DEFAULT_DRAW_OPTIONS={line_width:1,stroke:!0,stroke_color:t.THEME_FORECOLOR,fill:!1,fill_color:t.THEME_BACKGROUND},t.DEFAULT_DRAW_CIRCLE_OPTIONS={line_width:t.DEFAULT_DRAW_OPTIONS.line_width,stroke:t.DEFAULT_DRAW_OPTIONS.stroke,stroke_color:t.DEFAULT_DRAW_OPTIONS.stroke_color,fill:t.DEFAULT_DRAW_OPTIONS.fill,fill_color:t.DEFAULT_DRAW_OPTIONS.fill_color,radius:0,angle:{start:0,end:2*Math.PI},clockwise:!1},t.DEFAULT_DRAW_TEXT_OPTIONS={line_width:t.DEFAULT_DRAW_OPTIONS.line_width,stroke:!1,stroke_color:t.DEFAULT_DRAW_OPTIONS.stroke_color,fill:!0,fill_color:t.DEFAULT_DRAW_OPTIONS.fill_color,font_size:t.DEFAULT_FONT_SIZE,font_name:t.DEFAULT_FONT,center:!0,blur:{x:0,y:0,size:0,color:t.THEME_BACKGROUND}}},{}],6:[function(e,n,t){"use strict";t.__esModule=!0;var o=e("./framework/Game");window.onload=function(){o.SimpleGame.create(),o.SimpleGame.init()}},{"./framework/Game":1}]},{},[6]);
//# sourceMappingURL=SimpleGame.js.map
