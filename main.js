//element creation
var wrapper = document.createElement("div")
wrapper.className = "wrapper"

var input = document.createElement("textarea")
input.className = "text-area"
input.rows = 5
input.cols = 50

var keyboard = document.createElement("div")
keyboard.className = "keyboard"

var row1 = document.createElement("div")
row1.className = "row"

var row2 = document.createElement("div")
row2.className = "row"

var row3 = document.createElement("div")
row3.className = "row"

var row4 = document.createElement("div")
row4.className = "row"

var row5 = document.createElement("div")
row5.className = "row"

var keys = []
for (let i = 0; i < 57; ++i){
   keys[i] = document.createElement("button")
   keys[i].className = "s-key"
}

var backspace = document.createElement("button")
backspace.className = "backspace"

var tab = document.createElement("button")
tab.className = "tab"

var caps = document.createElement("button")
caps.className = "caps"

var enter = document.createElement("button")
enter.className = "enter"

var shift = document.createElement("button")
shift.className = "shift"

var shift_r = document.createElement("button")
shift_r.className = "shift-r"

var space = document.createElement("button")
space.className = "space"

//first row
for (let i = 0; i < 13; ++i){
    row1.appendChild(keys[i])
}
row1.appendChild(backspace)
keyboard.appendChild(row1)

//second row
row2.appendChild(tab)
for (let i = 13; i < 27; ++i){
    row2.appendChild(keys[i])
}
keyboard.appendChild(row2)

//third row
row3.appendChild(caps)
for (let i = 27; i < 38; ++i){
    row3.appendChild(keys[i])
}
row3.appendChild(enter)
keyboard.appendChild(row3)

//fourth row
row4.appendChild(shift)
for (let i = 38; i < 49; ++i){
    row4.appendChild(keys[i])
}
row4.appendChild(shift_r)
keyboard.appendChild(row4)

//fith row
for (let i = 49; i < 52; ++i){
    row5.appendChild(keys[i])
}
row5.appendChild(space)
for (let i = 52; i < 57; ++i){
    row5.appendChild(keys[i])
}
keyboard.appendChild(row5)

//header
var header = document.createElement("h1")
header.innerText = "RSS Virtual Keyboard"
header.className = "title"

//Tooltip
var tooltip = document.createElement("h3")
tooltip.innerText = "This is keyboard was created for Windows OS\nTo switch language, press left Ctrl + left Shift"
tooltip.className = "tooltip"

wrapper.appendChild(header)
wrapper.appendChild(input)
wrapper.appendChild(keyboard)
wrapper.appendChild(tooltip)
document.body.appendChild(wrapper)

import { eng_lower, char_keys, eng_upper, eng_shift, eng_shift_lower, filter, rus_lower, rus_upper, rus_shift, rus_shift_lower} from "./layouts.js"
var current = eng_lower
var current_lang = "eng"
var prev = []
var current_lower = eng_lower
var current_upper = eng_upper
var current_shift = eng_shift
var current_shift_lower = eng_shift_lower
var lang_switch = false

function lang(){
    if(current_lang == "eng"){
        current = rus_lower
        if(prev == eng_lower){
            prev = rus_lower
        }else{
            prev = rus_upper
        }
        current_lang = "rus"
        current_lower = rus_lower
        current_upper = rus_upper
        current_shift = rus_shift
        current_shift_lower = rus_shift_lower

    }else{
        if(prev == rus_lower){
            prev = eng_lower
        }else{
            prev = eng_upper
        }
        current = eng_lower
        current_lang = "eng"
        current_lower = eng_lower
        current_upper = eng_upper
        current_shift = eng_shift
        current_shift_lower = eng_shift_lower

    }
}

function lang_load(){
    if(current_lang == "rus"){
        current = rus_lower
        if(prev == eng_lower){
            prev = rus_lower
        }else{
            prev = rus_upper
        }
        current_lang = "rus"
        current_lower = rus_lower
        current_upper = rus_upper
        current_shift = rus_shift
        current_shift_lower = rus_shift_lower

    }else{
        if(prev == rus_lower){
            prev = eng_lower
        }else{
            prev = eng_upper
        }
        current = eng_lower
        current_lang = "eng"
        current_lower = eng_lower
        current_upper = eng_upper
        current_shift = eng_shift
        current_shift_lower = eng_shift_lower

    }
}

function setLocalStorage() {
    localStorage.setItem('lang', current_lang);
  }
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
    if(localStorage.getItem('lang')) {
        current_lang = localStorage.getItem('lang')
        lang_load()
        key_render()
    }
  }
  window.addEventListener('load', getLocalStorage)

var buttons = document.getElementsByTagName("button")

var text = document.querySelector(".text-area")

for (let i = 0; i<buttons.length;++i){
    buttons[i].addEventListener("mousedown",()=>{ 
        if(i==54||i==63||i==59){
            body.dispatchEvent(new KeyboardEvent("keydown",{"key": current[i],"location": 2}))
        }else{
            if(i==42||i==55||i==58){
                body.dispatchEvent(new KeyboardEvent("keydown",{"key": current[i],"location": 1}))
            }else{
                body.dispatchEvent(new KeyboardEvent("keydown",{"key": current[i]}))
            }
        }
        console.log(i)
    })
}

for (let i = 0; i<buttons.length;++i){
    buttons[i].addEventListener("mouseup",()=>{ 
        if(i==54||i==63||i==59){
            body.dispatchEvent(new KeyboardEvent("keyup",{"key": current[i],"location": 2}))
        }else{
            if(i==42||i==55||i==58){
                body.dispatchEvent(new KeyboardEvent("keyup",{"key": current[i],"location": 1}))
            }else{
                body.dispatchEvent(new KeyboardEvent("keyup",{"key": current[i]}))
            }
        }
    })
}
function key_render(){
    for (let i = 0; i < 64; ++i){
        buttons[i].innerText=current[i]
    }
}
key_render()

text.focus()

var shift_flag=true

text.addEventListener("blur",()=>text.focus())
text.value = 'This is a test'

var body = document.body
body.addEventListener("keydown", (e) => {
    e.preventDefault()
    console.log(e.key,e.location);
    text.focus()
    if(e.location<1&&e.key.substr(0,5)!='Arrow'&&!filter.includes(e.key)){
        if((rus_lower.includes(e.key)||rus_upper.includes(e.key))&&current_lang=="eng"){
            lang()
            key_render()
        }
        buttons[current.indexOf(e.key)].classList.add("active")
        if(e.key.length==1){
            var cursor = text.selectionEnd
            text.value = text.value.substr(0,text.selectionEnd)+e.key+text.value.substr(text.selectionEnd)
            text.setSelectionRange(cursor+1,cursor+1)
        }    
        }else{
        if(e.key=="CapsLock"){
            buttons[29].classList.toggle("active")
            if(current == current_lower){
                current=current_upper
            }else{
                if(current == current_upper)current=current_lower
            }
            key_render()
        }
        if(e.key==" "){
            buttons[58].classList.add("active")
            var cursor = text.selectionEnd
            text.value = text.value.substr(0,text.selectionEnd)+' '+text.value.substr(text.selectionEnd)
            text.setSelectionRange(cursor+1,cursor+1)
        }
        if(e.key=="Alt"&&e.location==1)buttons[57].classList.add("active")
        if(e.key=="Alt"&&e.location==2)buttons[59].classList.add("active")
        if(e.key=="Shift"&&e.location==1){
            buttons[42].classList.add("active")
            if(shift_flag){
                prev = current
                if(current == current_lower) {
                    current = current_shift
                }else{
                    current = current_shift_lower
                }
                key_render()
                shift_flag = false
            }
        }
        if(e.key=="Shift"&&e.location==1&&e.ctrlKey){
            if(!lang_switch){
                lang()
                key_render()
                lang_switch = true
            }
        }
        if(e.key=="Shift"&&e.location==2){
            buttons[54].classList.add("active")
            if(shift_flag){
                prev = current
                if(current == current_lower) {
                    current = current_shift
                }else{
                    current = current_shift_lower
                }
                key_render()
                shift_flag = false
            }
        }
        if(e.key=="Delete")buttons[28].classList.add("active")
        if((e.key=="Control"||e.key=="Ctrl")&&e.location==1)buttons[55].classList.add("active")
        if((e.key=="Control"||e.key=="Ctrl")&&e.location==2)buttons[63].classList.add("active")
        if(e.key=="Meta")buttons[56].classList.add("active")
        if(e.key=="ArrowLeft"||e.key=="◄"){
            buttons[60].classList.add("active")
            text.setSelectionRange(text.selectionEnd-1,text.selectionEnd-1)
        }
        if(e.key=="ArrowDown"||e.key=="▼"){
            buttons[61].classList.add("active")
            text.setSelectionRange(text.selectionEnd+98,text.selectionEnd+98)
        }
        if(e.key=="ArrowRight"||e.key=="►"){
            buttons[62].classList.add("active")
            text.setSelectionRange(text.selectionEnd+1,text.selectionEnd+1)
        }
        if(e.key=="ArrowUp"||e.key=="▲"){
            buttons[53].classList.add("active")
            text.setSelectionRange(text.selectionEnd-98,text.selectionEnd-98)
        }
        if(e.key=="Delete"||e.key=="Del"){
            buttons[28].classList.add("active")
            var cursor = text.selectionEnd
            text.value = text.value.substr(0,text.selectionEnd)+ text.value.substr(text.selectionEnd+1)
            text.setSelectionRange(cursor,cursor)
        }
        if(e.key=="Backspace"){
            buttons[13].classList.add("active")
            var cursor = text.selectionEnd
            text.value = text.value.substr(0,text.selectionEnd-1)+text.value.substr(text.selectionEnd)
            text.setSelectionRange(cursor-1,cursor-1)
        }
        if(e.key=="Enter"){
            buttons[41].classList.add("active")
            var cursor = text.selectionEnd
            text.value = text.value.substr(0,text.selectionEnd)+'\n'+text.value.substr(text.selectionEnd)
            text.setSelectionRange(cursor+1,cursor+1)
        }
        if(e.key=="Tab"){
            buttons[14].classList.add("active")
            var cursor = text.selectionEnd
            text.value = text.value.substr(0,text.selectionEnd)+'    '+text.value.substr(text.selectionEnd)
            text.setSelectionRange(cursor+4,cursor+4)
        }
    }
  },false);

  body.addEventListener("keyup", (e) => {
    if(e.location<1&&e.key!="Delete"&&e.key.substr(0,5)!='Arrow'&&e.key!='CapsLock'&&e.key!=' '){
        buttons[current.indexOf(e.key)].classList.remove("active")
      }else{
        if(e.key==" ")buttons[58].classList.remove("active")
        if(e.key=="Alt"&&e.location==1)buttons[57].classList.remove("active")
        if(e.key=="Alt"&&e.location==2)buttons[59].classList.remove("active")
        if(e.key=="Shift"&&e.location==1){
            buttons[42].classList.remove("active")
            current=prev
            key_render()
            shift_flag = true
        }
        if(e.key=="Shift"&&e.location==1&&e.ctrlKey){
                lang_switch = false
        }
        if(e.key=="Shift"&&e.location==2){
            buttons[54].classList.remove("active")
            current=prev
            key_render()
            shift_flag = true
        }
        if(e.key=="Delete")buttons[28].classList.remove("active")
        if(e.key=="Control"||e.key=="Ctrl"&&e.location==1)buttons[55].classList.remove("active")
        if(e.key=="Control"||e.key=="Ctrl"&&e.location==2)buttons[63].classList.remove("active")
        if(e.key=="Meta")buttons[56].classList.remove("active")
        if(e.key=="ArrowLeft")buttons[60].classList.remove("active")
        if(e.key=="ArrowDown")buttons[61].classList.remove("active")
        if(e.key=="ArrowRight")buttons[62].classList.remove("active")
        if(e.key=="ArrowUp")buttons[53].classList.remove("active")
      }
    e.preventDefault()
});
