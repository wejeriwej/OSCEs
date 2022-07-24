try {
  var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  var recognition = new SpeechRecognition();
}
catch(e) {
  console.error(e);
  $('.no-browser-support').show();
  $('.app').hide();
}
 
 
var noteTextarea = $('#note-textarea');
var instructions = $('#recording-instructions');
var notesList = $('ul#notes');
 
var noteContent = '';
 
// Get all notes from previous sessions and display them.
var notes = getAllNotes();
renderNotes(notes);
 
 
 
/*-----------------------------
      Voice Recognition
------------------------------*/
 
// If false, the recording will stop after a few seconds of silence.
// When true, the silence period is longer (about 15 seconds),
// allowing us to keep recording even when the user pauses.
recognition.continuous = true;
 
// This block is called every time the Speech APi captures a line.
recognition.onresult = function(event) {
 
  // event is a SpeechRecognitionEvent object.
  // It holds all the lines we have captured so far.
  // We only need the current one.
  var current = event.resultIndex;
 
  // Get a transcript of what was said.
  var transcript = event.results[current][0].transcript;
 
  
 
  // Add the current transcript to the contents of our Note.
  // There is a weird bug on mobile, where everything is repeated twice.
  // There is no official solution so far so we have to handle an edge case.
  var mobileRepeatBug = (current == 1 && transcript == event.results[0][0].transcript);
 
  if(!mobileRepeatBug) {
    noteContent += transcript;
    noteTextarea.val(noteContent);
  }
};
 
recognition.onstart = function() {
  instructions.text('Voice recognition activated. Try speaking into the microphone.');
}
 
recognition.onspeechend = function() {
  instructions.text('You were quiet for a while so voice recognition turned itself off.');
}
 
recognition.onerror = function(event) {
  if(event.error == 'no-speech') {
    instructions.text('No speech was detected. Try again.');  
  };
}
 
 
 
/*-----------------------------
      App buttons and input
------------------------------*/
 
$('#start-record-btn').on('click', function(e) {
  if (noteContent.length) {
    noteContent += ' ';
  }
  recognition.start();
});
 
 
$('#pause-record-btn').on('click', function(e) {
  recognition.stop();
  instructions.text('Voice recognition paused.');
});
 
// Sync the text inside the text area with the noteContent variable.
noteTextarea.on('input', function() {
  noteContent = $(this).val();
})
 
$('#save-note-btn').on('click', function(e) {
  recognition.stop();
 
  if(!noteContent.length) {
    instructions.text('Could not save empty note. Please add a message to your note.');
  }
  else {
    // Save note to localStorage.
    // The key is the dateTime with seconds, the value is the content of the note.
    saveNote(new Date().toLocaleString(), noteContent);
    

    if(noteContent.includes("name") && noteContent.includes("age")) {
      readOutLoud("My name is Marc Jevner and I am 31")
    }
    
    else if(noteContent.includes("age")||noteContent.includes("old")){
      readOutLoud("I'm 31 years old")
    }

    else if (noteContent.includes("is it ok")||noteContent.includes("would it be ok")||noteContent.includes("talk to you")
      ||noteContent.includes("chat")||noteContent.includes("speak to you")||noteContent.includes("can i")||noteContent.includes("may i")) {
      readOutLoud("yes that's fine");
    }//consent for consultation

    else if (noteContent.includes("your name")||noteContent.includes("full name")) {
      readOutLoud("My name is Marc Jevner");
    }//name

    else if (noteContent.includes("call")||noteContent.includes("address")) {
      readOutLoud("Marc is fine");
    }//how would you like to be addressed as
    
    else if (noteContent.includes("age")||noteContent.includes("old")) {
      readOutLoud("I'm 58");
    }//age
    
    else if (noteContent.includes("name and age")) {
      readOutLoud("I'm Gregory Smith and I am 58");
    }//Name + age
    
    else if (noteContent.includes("date of birth")||noteContent.includes("when were you born")) {
      readOutLoud("the 4th of June 1964");
    }//DOB
    
    else if (noteContent.includes("occupation")||noteContent.includes("job")||noteContent.includes("work")) {
      readOutLoud("I work as a banker");
    }//job
    
    else if (noteContent.includes("stress")) {
      readOutLoud("to be honest I'm quite stressed in general, I find that my work is quite stressful, but I really enjoy it");
    }//Are you stressed at work
    
    else if (noteContent.includes("do you enjoy")) {
      readOutLoud("Yes, I do");
    }//do you enjoy your work?
    
    //Opening question    
    
    else if (noteContent.includes("brought")||noteContent.includes("bring")||noteContent.includes("what can")||noteContent.includes("why")
        ||noteContent.includes("come")||noteContent.includes("how are you")||noteContent.includes("how do you feel")) {
      readOutLoud("This morning I was speaking to my friend and suddenly I (had this really strange feeling in my chest, it was really painful and it felt as if I got kicked really hard in my chest region. I've tried taking paracetamol but it hasn't done anything");
    }//HOPC/whats made you come to the hospital/ why did you come to the hospital
    
    else if (noteContent.includes("bit more")||noteContent.includes("tell me more")||noteContent.includes("tell me about")) {
      readOutLoud("The pain just came on so randomly and was so severe, honestly, thought I was going to die.");
    }//tell me a bit more
    
    //pain
    
    else if (noteContent.includes("where is")||noteContent.includes("bring")||noteContent.includes("what can")
        ||noteContent.includes("whereabout")||noteContent.includes("where was")) {
      readOutLoud("The pain is in the middle of my chest");
    }//where is the pain
    
    else if (noteContent.includes("describe")||noteContent.includes("it feel like")
        ||noteContent.includes("pain feel like")) {
      readOutLoud("It feels like a horse kicked me in my chest");
    }//describe the pain
    
    else if (noteContent.includes("radiate")||noteContent.includes("anywhere")||noteContent.includes("other pain")) {
      readOutLoud("now you mention it, I have also noticed that my left arm is also quite painful, and also my neck");

    }//does the pain radiate/move anywhere
    
    else if (noteContent.includes("rate the pain")||noteContent.includes("severe")||noteContent.includes("1-10")
        ||noteContent.includes("1 to 10")||noteContent.includes("one to ten")||noteContent.includes("-10")||noteContent.includes("out of 10")) {
      readOutLoud("Honesty I would say the pain is probably around 9/10, and I normally have quite a high pain threshold");
    }//rate the pain
    
    else if (noteContent.includes("make it better")||noteContent.includes("make the pain better")
        ||noteContent.includes("makes it better")||noteContent.includes("makes the pain better")
        ||noteContent.includes("relieve")||noteContent.includes("ease")) {
      readOutLoud("Honestly, nothing makes it better, not even paracetamol does anything");
    }//anything make it better/anything ease the pain
    
    else if (noteContent.includes("make it worse")||noteContent.includes("exacerbate")
        ||noteContent.includes("make the pain worse")||noteContent.includes("makes the pain worse")
        ||noteContent.includes("makes it worse")) {
      readOutLoud("I would say that any sort of movement makes the pain even worse than it already is, so because of that I try not to move to make the pain a bit more bearable");
      
    
    }//anything make it worse
    
    else if (noteContent.includes("worse when")) {
      readOutLoud("I don't think so");
    }//Is it worse when walking/going up the stairs etc/do you find it gets better when
    
    else if (noteContent.includes("better when")) {
      readOutLoud("Not really");
    }//Is it worse when walking/going up the stairs etc/do you find it gets better when
    
    else if (noteContent.includes("how long")||noteContent.includes("start")) {
      readOutLoud("This pain only started this morning, I would say it was around 8AM");
    }//How long have you had the pain for/when did the pain start
    
    else if (noteContent.includes("got worse")||noteContent.includes("gotten worse")
        ||noteContent.includes("gotten better")||noteContent.includes("got better")||noteContent.includes("sudden")) {
      readOutLoud("The pain has definitely gotten worse as the day has gone on");
    }//Has the pain gradually gotten worse/better
    
    else if (noteContent.includes("tender")||noteContent.includes("painful to touch")||noteContent.includes("painful when touch")) {
      readOutLoud("Yes it does, especially when you touch the middle of my chest");
    }//tenderness
    
    
    //rule out pain anywhere else
    else if (noteContent.includes("pain in")||noteContent.includes("pains in")) {
      readOutLoud("I've mainly got pain in the middle of my chest, ");
      readOutLoud("and I also have pain in my left shouler and neck but I have not noticed any other pains anywhere else");
    }//any pain in X (eg in the shoulders, in the side etc)
    
    //other symptoms    
    else if (noteContent.includes("symptoms")||noteContent.includes("come along with")
        ||noteContent.includes("experience anything else")||noteContent.includes("come with")) {
      readOutLoud("I've also noticed that I've gotten quite short of breath as well, ");
      readOutLoud("but I think that's just because of the pain");
    }//any other Sx/does anything else come along with the pain
    
    else if (noteContent.includes("fever")||noteContent.includes("felt off")||noteContent.includes("felt yourself")
        ||noteContent.includes("feeling off")||noteContent.includes("a cold")||noteContent.includes("under the weather")) {
      readOutLoud("No");
    }//fever
    
    else if (noteContent.includes("naus")||noteContent.includes("vomit")) {
      readOutLoud("No");
    }//any vomiting/nausea/nauseous
    
    else if (noteContent.includes("cough")) {
      readOutLoud("No");
    }//cough
    
    else if (noteContent.includes("bring up any")||noteContent.includes("sputum")||noteContent.includes("phlegm")) {
      readOutLoud("No");
    }//do you bring up anything when you cough/vomit
    
    else if (noteContent.includes("colour")||noteContent.includes("texture")) {
      readOutLoud("I don't know");
    }//colour of cough/vomit
    
    else if (noteContent.includes("how much do you")||noteContent.includes("texture")) {
      readOutLoud("I don't know");
    }//how much phlegm do you bring up
    
    //SOB   
    else if (noteContent.includes("short")||noteContent.includes("breathless")||noteContent.includes("breath")) {
      readOutLoud("I have felt short of breath since this morning too, but I think it's because of the pain");
    }//SOB
    
    else if (noteContent.includes("whilst walk")||noteContent.includes("far")||noteContent.includes("when you walk")
        ||noteContent.includes("whilst you walk")||noteContent.includes("when walk")||noteContent.includes("during walk")) {
      readOutLoud("Yes I do. I can walk about 50 metres, but then I can't anymore because of the shortness of breath");
    }//how far can you walk/when do you feel short of breath/ dyu get SOB whilst walking/when walking
    
    else if (noteContent.includes("when sleep")||noteContent.includes("pillows")||noteContent.includes("upright")||noteContent.includes("during sleep")) {
      readOutLoud("I normally sleep with 3-4 pillows at night acctually, and that's because I feel short of breath");
    }//SOB when sleeping/orthopnoea
    
    else if (noteContent.includes("wake up")) {
      readOutLoud("Now you mention it, I do wake up short of breath at times");
    }//SOB Paroxysmal Nocturnal dyspnoea (PND)
    
    //Gastro
    else if (noteContent.includes("bloat")) {
      readOutLoud("I haven't noticed any bloating");
    }//bloating
    
    else if (noteContent.includes("yellow")) {
      readOutLoud("I've not mentioned any yellowing of the skin or of my eyes");
    }//jaundice
    
    else if (noteContent.includes("lump")||noteContent.includes("lymph")||noteContent.includes("swelling")) {
      readOutLoud("I've not noticed any");
    }//lymph nodes - query "swelling" coz could be of the knee for example
    
    else if (noteContent.includes("confus")) {
      readOutLoud("I've not felt confused recently");
    }//confused/confusion
    
    //ENT
    else if (noteContent.includes("headache")) {
      readOutLoud("I've not been having any headaches");
    }//headache
    
    //opthalmology    
    else if (noteContent.includes("vision")||noteContent.includes("eye sight")||noteContent.includes("eye-sight")||noteContent.includes("changes in your eyes")) {
      readOutLoud("I've not noticed any changes in my vision");
    }//vision
    
    //derm
    else if (noteContent.includes("skin")) {
      readOutLoud("I've not noticed any changes in my skin");
    }//skin changes
    
    //bowels+urine    
    else if (noteContent.includes("bowels")||noteContent.includes("poo")
        ||noteContent.includes("stool")||noteContent.includes("back side")
        ||noteContent.includes("constipation")||noteContent.includes("diarrhoea")||noteContent.includes("runny")) {
      readOutLoud("I've not noticed any changes");
    }//bowels
    
    else if (noteContent.includes("urin")||noteContent.includes("pee")
        ||noteContent.includes("piss")||noteContent.includes("toilet")
        ||noteContent.includes("bladder")||noteContent.includes("void")||noteContent.includes("wee")) {
      readOutLoud("I've not noticed any changes in my urine");
    }//urine/voiding
    
    
    
    //red flags   
    else if (noteContent.includes("weight")) {
      readOutLoud("I've noticed any weight loss to be honest");
    }//weight loss
    
    else if (noteContent.includes("blood")) {
      readOutLoud("I've not noticed any blood loss from anywhere");
    }//blood loss
    
    else if (noteContent.includes("appetite")) {
      readOutLoud("I've not noticed any changes in my appetite");
    }//changes in appetite
    
    //ICE   
    else if (noteContent.includes("idea")||noteContent.includes("do you think")||noteContent.includes("going on")
        ||noteContent.includes("reckon")||noteContent.includes("happening")) {
      readOutLoud("I think I might be having a heart attack, but I'm not too sure");
    }//Ideas/what's your ideas of what's happening/what dyu think's happening/do you think it's cancer
    
    else if (noteContent.includes("concern")||noteContent.includes("worried")||noteContent.includes("worry")) {
      readOutLoud("I'm really worried that it is acctually a heart attack, and I know that you can die from a heart attack");
    }//Concerns
    
    else if (noteContent.includes("expect")||noteContent.includes("get out of")||noteContent.includes("like from us")) {
      readOutLoud("I would like to figure out what is going on with me if that's possible, and maybe run a few tests?");
    }//Expectations/what would you like from us
    
    
    
    //PMHx+FHx+allergies+meds   
    
    else if (noteContent.includes("family")||noteContent.includes("run in the")) {
      readOutLoud("I think my auntie died of a heart attack when she was 67 and my father passed away from a stroke when he was 72, but there's no other conditions that run in the family");
    }//FHx
    
    else if (noteContent.includes("any other medical")||noteContent.includes("past medical")||noteContent.includes("medical conditions")) {
      readOutLoud("I have high blood pressure and I had a stroke that I successfuly recovered from a couple years ago. I've also had heart failure for last 10 years. I also have atrial fibrillation");
    }//PMHx
    
    else if (noteContent.includes("allerg")) {
      readOutLoud("no");
    }//FHx
    
    else if (noteContent.includes("do you take anything for")||noteContent.includes("paracetamol")||noteContent.includes("pain relief")) {
      readOutLoud("I take paracetamol, but it doesn't work");
    }//Do you take anything for the pain? + does it work
    
    else if (noteContent.includes("meds")||noteContent.includes("medication")||noteContent.includes("any drugs")
        ||noteContent.includes("any other drugs")) {
      readOutLoud("I take aspirin 300mg, and amlodipine for my high blood pressure. I'm also on a Beta blocker for my heart failure and I'm on a statin too.");
    }//meds
    
    
    //social Hx
    
    else if (noteContent.includes("smok")||noteContent.includes("how much do you smoke")) {
      readOutLoud("I smoke 30 cigarettes every day");
    }//smoking
    
    else if (noteContent.includes("used to smoke")||noteContent.includes("did you smoke")) {
      readOutLoud("I used to smoke 10 cigarettes a day when I was a teenager, and I started when I was 18");
    }//past smoking
    
    else if(noteContent.includes("drink")||noteContent.includes("alcohol")||noteContent.includes("how much do you drink")){
      readOutLoud("I drink about half a bottles of wine every day");
    }//alcohol
    
    else if (noteContent.includes("used to drink")||noteContent.includes("did you drink")) {
      readOutLoud("I used to only drink socially when I was a teenager, and I started when I was 18");
    }//past alcohol
    
    else if(noteContent.includes("illicit")||noteContent.includes("illegal drug")){
      readOutLoud("No I don't");
    }//illicit drugs
    
    else if(noteContent.includes("over the counter")||noteContent.includes("not prescribed")||noteContent.includes("not given")){
      readOutLoud("No");
    }//OTC drugs/have you been taking any drugs not given by the Dr
    
    else if(noteContent.includes("exercise")||noteContent.includes("go on walk")||noteContent.includes("active")){
      readOutLoud("I don'treally, especially because I get short of breath, so I avoid it");
    }//exercise/do you keep active
    
    else if(noteContent.includes("diet")||noteContent.includes("do you eat")||noteContent.includes("what you eat")){
      readOutLoud("I've been told I eat too much, but I would say I eat alright, I only eat fast food 2 or 3 times a week, but I try to get my 5 a day");
    }//how's your diet/what sorts of things do you eat/describe what you eat
    
    //home situation    
    
    else if(noteContent.includes("at home")||noteContent.includes("live with")){
      readOutLoud("I live with my wife at home");
    }//who's at home/who lives at home/who dyu live with
    
    else if(noteContent.includes("bungalo")||noteContent.includes("house")||noteContent.includes("appartment")
        ||noteContent.includes("live in")||noteContent.includes("you live")){
      readOutLoud("I live in a bungalo");
    }//where dyu live/dyu live in a bungalo etc
    
    else if(noteContent.includes("children")||noteContent.includes("kids")){
      readOutLoud("I don't have any children");
    }//children?
    
    else if(noteContent.includes("hello")||noteContent.includes("hi")||content.includes("greeting")){
      readOutLoud("Hiya there")
    }
    
    else if(noteContent.includes("is that correct")||noteContent.includes("is that right")||noteContent.includes("am i right")){
      readOutLoud("yes that's correct")
    }
    
    else if(noteContent.includes("end")){
      readOutLoud("Moving on to examinations,");
      
    }
    
    else {
      readOutLoud("Sorry, I am not too sure");
    }
    

    
    




    // Reset variables and update UI.
    noteContent = '';
    renderNotes(getAllNotes());
    noteTextarea.val('');
    instructions.text('Note saved successfully.');
  }
      
})
 
 
notesList.on('click', function(e) {
  e.preventDefault();
  var target = $(e.target);
 
  // Listen to the selected note.
  if(target.hasClass('listen-note')) {
    var content = target.closest('.note').find('.content').text();
    readOutLoud(content);
  }
 
  // Delete note.
  if(target.hasClass('delete-note')) {
    var dateTime = target.siblings('.date').text();  
    deleteNote(dateTime);
    target.closest('.note').remove();
  }
});
 
 
 
/*-----------------------------
      Speech Synthesis
------------------------------*/
 
function readOutLoud(message) {
var speech = new SpeechSynthesisUtterance();
 
  // Set the text and voice attributes.
speech.text = message;
speech.volume = 1;
speech.rate = 1;
speech.pitch = 1;
  
window.speechSynthesis.speak(speech);
}
 
 
 
/*-----------------------------
      Helper Functions
------------------------------*/
 
function renderNotes(notes) {
  var html = '';
  if(notes.length) {
    notes.forEach(function(note) {
      html+= `<li class="note">
                <p class="content">${note.content + "?"}</p>
        <p class="header"> 
            <span class="date"><font size="-2">${note.date}</font></span> 
            <a href="#" class="listen-note" title="Listen to Note">Listen to the patient's response...</a>
            <a href="#" class="delete-note" title="Delete">Delete</a>
          </p>
          
        </li>`;   
   
    });
  }
  else {
    html = '<li><p class="content">You don\'t have any notes yet.</p></li>';
  }
  notesList.html(html);
}
 
 
function saveNote(dateTime, content) {
  localStorage.setItem('note-' + dateTime, content);
}
 
 
function getAllNotes() {
  var notes = [];
  var key;
  for (var i = 0; i < localStorage.length; i++) {
    key = localStorage.key(i);
    console.log(i)
    console.log(key)
 
    if(key.substring(0,5) == 'note-') {
      notes.push({
        date: key.replace('note-',''),
        content: localStorage.getItem(localStorage.key(i))
      });
    }
  }
  console.log(notes)
  return notes;
}
 
 
function deleteNote(dateTime) {
  localStorage.removeItem('note-' + dateTime);
}