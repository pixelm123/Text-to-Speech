const textarea = document.querySelector("textarea"),
voiceList = document.querySelector("select"),
speechBtn = document.querySelector("button");

let synth = speechSynthesis,
isSpeaking = true;

voices();

function voices(){
    for(let voice of synth.getVoices()){
        // selecting "Google US English" voice as default
        let selected = voice.name === "Google US English" ? "selected" : "";
        // creating an option tag with passing voice name and voice language
        let option = `<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`;
        voiceList.insertAdjacentHTML("beforeend", option); // insrting option tag beforeend option
    }
}

synth.addEventListener("voiceschanged", voices);

function textToSpeech(text){
    let utternance = new SpeechSynthesisUtterance(text);
    for(let voice of synth.getVoices()){
        // if the available device voice name is equal to the user selected
        // then set the speech voice to the user selected voice
        if(voice.name === voiceList.voice){
            utternance.voice = voice;
        }
    }
    synth.speak(utternance); //speak the speech/utternance
}

speechBtn.addEventListener("click", e =>{
    e.preventDefault();
    if(textarea.value !== ""){
        if(!synth.speaking){ // if an utteranance/speech is not currently in the process of 
            textToSpeech(textarea.value);
        }
        if(textarea.value.length > 80){
            // if isSpeaking is true then change it's value to false and resume the utteranance/sppech
            // else change it's value to true and pause the speech
            if(isSpeaking){
                synth.resume();
                isSpeaking = false;
                speechBtn.innerText = "Pause Speech";
            }else{
                synth.pause();
                isSpeaking = true;
                speechBtn.innerText = "Resume Speech";
            } 

            // checking is utternance/speech in speaking process or not in every 100 ms
            // if not then set the value of isSpeaking to true and change the button text
            setInterval(() => {
                if(!synth.speaking && !isSpeaking){
                    isSpeaking = true;
                    speechBtn.innerText = "Convert To Speech";
                }
            });
        }else{
            speechBtn.innerText = "Convert To Speech";
        }                
    }
});