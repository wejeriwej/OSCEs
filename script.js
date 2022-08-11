 

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
var whatforgottosay = $('#whatforgottosay');
 
var noteContent = '';

 
// Get all notes from previous sessions and display them.


//var notes = getAllNotes();
//renderNotes(notes);
 
 
 
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
  instructions.text('Microphone is activated. Try speaking into the microphone. Then double click the Submit Question button.');
}
 
recognition.onspeechend = function() {
  instructions.text('DOUBLE CLICK THE SUBMIT BUTTON. (Once you get the response, press the Microphone button to ask another question');
}
 
recognition.onerror = function(event) {
  if(event.error == 'no-speech') {
    instructions.text('No speech was detected. Try again.');  
  };
}
 
 
   /*-----------------------------
        The While loops
  ------------------------------*/
  var jobx = 0;
  var radiatex = 0;
  var ratepainx = 0;
  var makeitbetterx = 0;
  var makeitworsex = 0;
  var walkdistancex = 0;
  var ideasx = 0;
  var concernsx = 0;
  var expectationsx = 0;
  var smokingx = 0;
  var alcoholx = 0;
  var familyhistoryx = 0;
  
  var counter = 0;
//  while (counter < 1) {






 
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
      jobx++;
    }//job
    
    else if (noteContent.includes("stress")) {
      readOutLoud("to be honest I'm quite stressed in general, I find that my work is quite stressful, but I really enjoy it");
    }//Are you stressed at work
    
    else if (noteContent.includes("do you enjoy")) {
      readOutLoud("Yes, I do");
    }//do you enjoy your work?
    
    //Opening question    
    
    else if (noteContent.includes("brought")||noteContent.includes("bring")||noteContent.includes("what can")||noteContent.includes("why")
        ||noteContent.includes("come")||noteContent.includes("how are you")||noteContent.includes("how do you feel")
        ||noteContent.includes("I help")||noteContent.includes("problem")||noteContent.includes("you have any pain")) {
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
      radiatex++;

    }//does the pain radiate/move anywhere
    
    else if (noteContent.includes("rate the pain")||noteContent.includes("severe")||noteContent.includes("1-10")
        ||noteContent.includes("1 to 10")||noteContent.includes("one to ten")||noteContent.includes("-10")||noteContent.includes("out of 10")) {
      readOutLoud("Honesty I would say the pain is probably around 9/10, and I normally have quite a high pain threshold");
      ratepainx++;
    }//rate the pain
    
    else if (noteContent.includes("make it better")||noteContent.includes("make the pain better")
        ||noteContent.includes("makes it better")||noteContent.includes("makes the pain better")
        ||noteContent.includes("relieve")||noteContent.includes("ease")) {
      readOutLoud("Honestly, nothing makes it better, not even paracetamol does anything");
      makeitbetterx++;
    }//anything make it better/anything ease the pain
    
    else if (noteContent.includes("make it worse")||noteContent.includes("exacerbate")
        ||noteContent.includes("make the pain worse")||noteContent.includes("makes the pain worse")
        ||noteContent.includes("makes it worse")) {
      readOutLoud("I would say that any sort of movement makes the pain even worse than it already is, so because of that I try not to move to make the pain a bit more bearable");
      makeitworsex++;
    
    }//anything make it worse
    
    else if (noteContent.includes("worse when")) {
      readOutLoud("I don't think so");
      makeitworsex++;
    }//Is it worse when walking/going up the stairs etc/do you find it gets better when
    
    else if (noteContent.includes("better when")) {
      readOutLoud("Not really");
      makeitbetterx++;
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
    
    else if (noteContent.includes("heart attack")&& noteContent.includes("past")) {
      readOutLoud("No I haven't had a heart attack in the past");
    }

    else if(noteContent.includes("heart attack")&& noteContent.includes("first")){
      readOutLoud("Yes this is my first heart attack");
    }

    else if(noteContent.includes("happen")&& noteContent.includes("before")){
      readOutLoud("No, this has never happened before");
    }

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
    
    else if (noteContent.includes("dizz")) {
      readOutLoud("No");
    }//any vomiting/nausea/nauseous

    else if (noteContent.includes("clam")||noteContent.includes("sweat")) {
      readOutLoud("No");
    }//any sweating/clammy

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
      walkdistancex++;
    }//how far can you walk/when do you feel short of breath/ dyu get SOB whilst walking/when walking
    
    else if (noteContent.includes("when sleep")||noteContent.includes("pillow")||noteContent.includes("upright")||noteContent.includes("during sleep")) {
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
      ideasx++;
    }//Ideas/what's your ideas of what's happening/what dyu think's happening/do you think it's cancer
    
    else if (noteContent.includes("concern")||noteContent.includes("worried")||noteContent.includes("worry")||noteContent.includes("scar")) {
      readOutLoud("I'm really worried that it is acctually a heart attack, and I know that you can die from a heart attack");
      concernsx++;
    }//Concerns/anything scaring you
    
    else if (noteContent.includes("expect")||noteContent.includes("get out of")||noteContent.includes("like from us")||noteContent.includes("hop")
    ||noteContent.includes("can we help")||noteContent.includes("what can we do for you")||noteContent.includes("what can i do for you")) {
      readOutLoud("I would like to figure out what is going on with me if that's possible, and maybe run a few tests?");
      expectationsx++;
    }//Expectations/what would you like from us
    
    
    
    //PMHx+FHx+allergies+meds   
    
    else if (noteContent.includes("family")||noteContent.includes("run in the")) {
      readOutLoud("I think my auntie died of a heart attack when she was 67 and my father passed away from a stroke when he was 72, but there's no other conditions that run in the family");
      familyhistoryx++;
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
    
    else if (noteContent.includes("how long")&&noteContent.includes("smoke")) {
      readOutLoud("I started smoking when I was 15");
      smokingx++;
    }//smoking
    
    else if (noteContent.includes("start")&&noteContent.includes("smoke")) {
      readOutLoud("I started smoking when I was 15");
      smokingx++;
    }//smoking

    else if (noteContent.includes("smok")||noteContent.includes("how much do you smoke")) {
      readOutLoud("I smoke 30 cigarettes every day");
      smokingx++;
    }//smoking

    else if (noteContent.includes("used to smoke")||noteContent.includes("did you smoke")) {
      readOutLoud("I used to smoke 10 cigarettes a day when I was a teenager, and I started when I was 18");
      smokingx++;
    }//past smoking
    
    else if (noteContent.includes("how long")&&noteContent.includes("drink")) {
      readOutLoud("I started drinking when I was 15");
      smokingx++;
    }//smoking
    
    else if (noteContent.includes("start")&&noteContent.includes("drink")) {
      readOutLoud("I started drinking when I was 15");
      smokingx++;
    }//smoking


    else if(noteContent.includes("drink")||noteContent.includes("alcohol")||noteContent.includes("how much do you drink")){
      readOutLoud("I drink about half a bottles of wine every day");
      alcoholx++;
    }//alcohol
    
    else if (noteContent.includes("used to drink")||noteContent.includes("did you drink")) {
      readOutLoud("I used to only drink socially when I was a teenager, and I started when I was 18");
      alcoholx++;
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
        ||noteContent.includes("live in")||noteContent.includes("you live")||noteContent.includes("living situation")||noteContent.includes("housing situation")){
      readOutLoud("I live in a bungalo");
    }//where dyu live/dyu live in a bungalo etc
    
    else if(noteContent.includes("children")||noteContent.includes("kids")){
      readOutLoud("I don't have any children");
    }//children?
    
    else if(noteContent.includes("hello")||noteContent.includes("hi")||noteContent.includes("greeting")){
      readOutLoud("Hiya there");
    }
    
    else if(noteContent.includes("is that correct")||noteContent.includes("is that right")||noteContent.includes("am i right")){
      readOutLoud("yes that's correct");
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
    //instructions.text('Press the Start Recognition button to ask another question. Then press Submit question.');
  }
  
})
  //}//end of while loop called counter








notesList.on('click', function(e) {
  e.preventDefault();
  var target = $(e.target);
 
  // Listen to the selected note.
  if(target.hasClass('listen-note')) {
    var content = target.closest('.note').find('.content').text();



    if(content.includes("name") && content.includes("age")) {
      readOutLoud("My name is Marc Jevner and I am 31")
    }
    
    else if(content.includes("age")||content.includes("old")){
      readOutLoud("I'm 31 years old")
    }

    else if (content.includes("is it ok")||content.includes("would it be ok")||content.includes("talk to you")
      ||content.includes("chat")||content.includes("speak to you")||content.includes("can i")||content.includes("may i")) {
      readOutLoud("yes that's fine");
    }//consent for consultation

    else if (content.includes("your name")||content.includes("full name")) {
      readOutLoud("My name is Marc Jevner");
    }//name

    else if (content.includes("call")||content.includes("address")) {
      readOutLoud("Marc is fine");
    }//how would you like to be addressed as
    
    else if (content.includes("age")||content.includes("old")) {
      readOutLoud("I'm 58");
    }//age
    
    else if (content.includes("name and age")) {
      readOutLoud("I'm Gregory Smith and I am 58");
    }//Name + age
    
    else if (content.includes("date of birth")||content.includes("when were you born")) {
      readOutLoud("the 4th of June 1964");
    }//DOB
    
    else if (content.includes("occupation")||content.includes("job")||content.includes("work")) {
      readOutLoud("I work as a banker");
      
    }//job
    
    else if (content.includes("stress")) {
      readOutLoud("to be honest I'm quite stressed in general, I find that my work is quite stressful, but I really enjoy it");
    }//Are you stressed at work
    
    else if (content.includes("do you enjoy")) {
      readOutLoud("Yes, I do");
    }//do you enjoy your work?
    
    //Opening question    
    
    else if (content.includes("brought")||content.includes("bring")||content.includes("what can")||content.includes("why")
        ||content.includes("come")||content.includes("how are you")||content.includes("how do you feel")) {
      readOutLoud("This morning I was speaking to my friend and suddenly I (had this really strange feeling in my chest, it was really painful and it felt as if I got kicked really hard in my chest region. I've tried taking paracetamol but it hasn't done anything");
    }//HOPC/whats made you come to the hospital/ why did you come to the hospital
    
    else if (content.includes("bit more")||content.includes("tell me more")||content.includes("tell me about")) {
      readOutLoud("The pain just came on so randomly and was so severe, honestly, thought I was going to die.");
    }//tell me a bit more
    
    //pain
    
    else if (content.includes("where is")||content.includes("bring")||content.includes("what can")
        ||content.includes("whereabout")||content.includes("where was")) {
      readOutLoud("The pain is in the middle of my chest");
    }//where is the pain
    
    else if (content.includes("describe")||content.includes("it feel like")
        ||content.includes("pain feel like")) {
      readOutLoud("It feels like a horse kicked me in my chest");
    }//describe the pain
    
    else if (content.includes("radiate")||content.includes("anywhere")||content.includes("other pain")) {
      readOutLoud("now you mention it, I have also noticed that my left arm is also quite painful, and also my neck");

    }//does the pain radiate/move anywhere
    
    else if (content.includes("rate the pain")||content.includes("severe")||content.includes("1-10")
        ||content.includes("1 to 10")||content.includes("one to ten")||content.includes("-10")||content.includes("out of 10")) {
      readOutLoud("Honesty I would say the pain is probably around 9/10, and I normally have quite a high pain threshold");
    }//rate the pain
    
    else if (content.includes("make it better")||content.includes("make the pain better")
        ||content.includes("makes it better")||content.includes("makes the pain better")
        ||content.includes("relieve")||content.includes("ease")) {
      readOutLoud("Honestly, nothing makes it better, not even paracetamol does anything");
    }//anything make it better/anything ease the pain
    
    else if (content.includes("make it worse")||content.includes("exacerbate")
        ||content.includes("make the pain worse")||content.includes("makes the pain worse")
        ||content.includes("makes it worse")) {
      readOutLoud("I would say that any sort of movement makes the pain even worse than it already is, so because of that I try not to move to make the pain a bit more bearable");
      
    
    }//anything make it worse
    
    else if (content.includes("worse when")) {
      readOutLoud("I don't think so");
    }//Is it worse when walking/going up the stairs etc/do you find it gets better when
    
    else if (content.includes("better when")) {
      readOutLoud("Not really");
    }//Is it worse when walking/going up the stairs etc/do you find it gets better when
    
    else if (content.includes("how long")||content.includes("start")) {
      readOutLoud("This pain only started this morning, I would say it was around 8AM");
    }//How long have you had the pain for/when did the pain start
    
    else if (content.includes("got worse")||content.includes("gotten worse")
        ||content.includes("gotten better")||content.includes("got better")||content.includes("sudden")) {
      readOutLoud("The pain has definitely gotten worse as the day has gone on");
    }//Has the pain gradually gotten worse/better
    
    else if (content.includes("tender")||content.includes("painful to touch")||content.includes("painful when touch")) {
      readOutLoud("Yes it does, especially when you touch the middle of my chest");
    }//tenderness
    
    
    //rule out pain anywhere else
    else if (content.includes("pain in")||content.includes("pains in")) {
      readOutLoud("I've mainly got pain in the middle of my chest, ");
      readOutLoud("and I also have pain in my left shouler and neck but I have not noticed any other pains anywhere else");
    }//any pain in X (eg in the shoulders, in the side etc)
    
    //other symptoms    
    else if (content.includes("symptoms")||content.includes("come along with")
        ||content.includes("experience anything else")||content.includes("come with")) {
      readOutLoud("I've also noticed that I've gotten quite short of breath as well, ");
      readOutLoud("but I think that's just because of the pain");
    }//any other Sx/does anything else come along with the pain
    
    else if (content.includes("fever")||content.includes("felt off")||content.includes("felt yourself")
        ||content.includes("feeling off")||content.includes("a cold")||content.includes("under the weather")) {
      readOutLoud("No");
    }//fever
    
    else if (content.includes("naus")||content.includes("vomit")) {
      readOutLoud("No");
    }//any vomiting/nausea/nauseous
    
    else if (content.includes("cough")) {
      readOutLoud("No");
    }//cough
    
    else if (content.includes("bring up any")||content.includes("sputum")||content.includes("phlegm")) {
      readOutLoud("No");
    }//do you bring up anything when you cough/vomit
    
    else if (content.includes("colour")||content.includes("texture")) {
      readOutLoud("I don't know");
    }//colour of cough/vomit
    
    else if (content.includes("how much do you")||content.includes("texture")) {
      readOutLoud("I don't know");
    }//how much phlegm do you bring up
    
    //SOB   
    else if (content.includes("short")||content.includes("breathless")||content.includes("breath")) {
      readOutLoud("I have felt short of breath since this morning too, but I think it's because of the pain");
    }//SOB
    
    else if (content.includes("whilst walk")||content.includes("far")||content.includes("when you walk")
        ||content.includes("whilst you walk")||content.includes("when walk")||content.includes("during walk")) {
      readOutLoud("Yes I do. I can walk about 50 metres, but then I can't anymore because of the shortness of breath");
    }//how far can you walk/when do you feel short of breath/ dyu get SOB whilst walking/when walking
    
    else if (content.includes("when sleep")||content.includes("pillows")||content.includes("upright")||content.includes("during sleep")) {
      readOutLoud("I normally sleep with 3-4 pillows at night acctually, and that's because I feel short of breath");
    }//SOB when sleeping/orthopnoea
    
    else if (content.includes("wake up")) {
      readOutLoud("Now you mention it, I do wake up short of breath at times");
    }//SOB Paroxysmal Nocturnal dyspnoea (PND)
    
    //Gastro
    else if (content.includes("bloat")) {
      readOutLoud("I haven't noticed any bloating");
    }//bloating
    
    else if (content.includes("yellow")) {
      readOutLoud("I've not mentioned any yellowing of the skin or of my eyes");
    }//jaundice
    
    else if (content.includes("lump")||content.includes("lymph")||content.includes("swelling")) {
      readOutLoud("I've not noticed any");
    }//lymph nodes - query "swelling" coz could be of the knee for example
    
    else if (content.includes("confus")) {
      readOutLoud("I've not felt confused recently");
    }//confused/confusion
    
    //ENT
    else if (content.includes("headache")) {
      readOutLoud("I've not been having any headaches");
    }//headache
    
    //opthalmology    
    else if (content.includes("vision")||content.includes("eye sight")||content.includes("eye-sight")||content.includes("changes in your eyes")) {
      readOutLoud("I've not noticed any changes in my vision");
    }//vision
    
    //derm
    else if (content.includes("skin")) {
      readOutLoud("I've not noticed any changes in my skin");
    }//skin changes
    
    //bowels+urine    
    else if (content.includes("bowels")||content.includes("poo")
        ||content.includes("stool")||content.includes("back side")
        ||content.includes("constipation")||content.includes("diarrhoea")||content.includes("runny")) {
      readOutLoud("I've not noticed any changes");
    }//bowels
    
    else if (content.includes("urin")||content.includes("pee")
        ||content.includes("piss")||content.includes("toilet")
        ||content.includes("bladder")||content.includes("void")||content.includes("wee")) {
      readOutLoud("I've not noticed any changes in my urine");
    }//urine/voiding
    
    
    
    //red flags   
    else if (content.includes("weight")) {
      readOutLoud("I've noticed any weight loss to be honest");
    }//weight loss
    
    else if (content.includes("blood")) {
      readOutLoud("I've not noticed any blood loss from anywhere");
    }//blood loss
    
    else if (content.includes("appetite")) {
      readOutLoud("I've not noticed any changes in my appetite");
    }//changes in appetite
    
    //ICE   
    else if (content.includes("idea")||content.includes("do you think")||content.includes("going on")
        ||content.includes("reckon")||content.includes("happening")) {
      readOutLoud("I think I might be having a heart attack, but I'm not too sure");
    }//Ideas/what's your ideas of what's happening/what dyu think's happening/do you think it's cancer
    
    else if (content.includes("concern")||content.includes("worried")||content.includes("worry")) {
      readOutLoud("I'm really worried that it is acctually a heart attack, and I know that you can die from a heart attack");
    }//Concerns
    
    else if (content.includes("expect")||content.includes("get out of")||content.includes("like from us")) {
      readOutLoud("I would like to figure out what is going on with me if that's possible, and maybe run a few tests?");
    }//Expectations/what would you like from us
    
    
    
    //PMHx+FHx+allergies+meds   
    
    else if (content.includes("family")||content.includes("run in the")) {
      readOutLoud("I think my auntie died of a heart attack when she was 67 and my father passed away from a stroke when he was 72, but there's no other conditions that run in the family");
    }//FHx
    
    else if (content.includes("any other medical")||content.includes("past medical")||content.includes("medical conditions")) {
      readOutLoud("I have high blood pressure and I had a stroke that I successfuly recovered from a couple years ago. I've also had heart failure for last 10 years. I also have atrial fibrillation");
    }//PMHx
    
    else if (content.includes("allerg")) {
      readOutLoud("no");
    }//FHx
    
    else if (content.includes("do you take anything for")||content.includes("paracetamol")||content.includes("pain relief")) {
      readOutLoud("I take paracetamol, but it doesn't work");
    }//Do you take anything for the pain? + does it work
    
    else if (content.includes("meds")||content.includes("medication")||content.includes("any drugs")
        ||content.includes("any other drugs")) {
      readOutLoud("I take aspirin 300mg, and amlodipine for my high blood pressure. I'm also on a Beta blocker for my heart failure and I'm on a statin too.");
    }//meds
    
    
    //social Hx
    
    else if (content.includes("smok")||content.includes("how much do you smoke")) {
      readOutLoud("I smoke 30 cigarettes every day");
    }//smoking
    
    else if (content.includes("used to smoke")||content.includes("did you smoke")) {
      readOutLoud("I used to smoke 10 cigarettes a day when I was a teenager, and I started when I was 18");
    }//past smoking
    
    else if(content.includes("drink")||content.includes("alcohol")||content.includes("how much do you drink")){
      readOutLoud("I drink about half a bottles of wine every day");
    }//alcohol
    
    else if (content.includes("used to drink")||content.includes("did you drink")) {
      readOutLoud("I used to only drink socially when I was a teenager, and I started when I was 18");
    }//past alcohol
    
    else if(content.includes("illicit")||content.includes("illegal drug")){
      readOutLoud("No I don't");
    }//illicit drugs
    
    else if(content.includes("over the counter")||content.includes("not prescribed")||content.includes("not given")){
      readOutLoud("No");
    }//OTC drugs/have you been taking any drugs not given by the Dr
    
    else if(content.includes("exercise")||content.includes("go on walk")||content.includes("active")){
      readOutLoud("I don'treally, especially because I get short of breath, so I avoid it");
    }//exercise/do you keep active
    
    else if(content.includes("diet")||content.includes("do you eat")||content.includes("what you eat")){
      readOutLoud("I've been told I eat too much, but I would say I eat alright, I only eat fast food 2 or 3 times a week, but I try to get my 5 a day");
    }//how's your diet/what sorts of things do you eat/describe what you eat
    


    
    //home situation    
    else if(content.includes("at home")||content.includes("live with")){
      readOutLoud("I live with my wife at home");
    }//who's at home/who lives at home/who dyu live with
    
    else if(content.includes("bungalo")||content.includes("house")||content.includes("appartment")
        ||content.includes("live in")||content.includes("you live")||content.includes("housing situation")){
      readOutLoud("I live in a bungalo");
    }//where dyu live/dyu live in a bungalo etc
    
    else if(content.includes("children")||content.includes("kids")){
      readOutLoud("I don't have any children");
    }//children?
    
    else if(content.includes("hello")||content.includes("hi")||content.includes("greeting")){
      readOutLoud("Hiya there");
    }
    
    else if(content.includes("is that correct")||content.includes("is that right")||content.includes("am i right")){
      readOutLoud("yes that's correct");
    }
    
    else if(content.includes("end")){
      readOutLoud("Moving on to examinations,");
      //counter++;
    }

    

    else {
      readOutLoud("Sorry, I am not too sure");
    }

  






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
                
                
                
        <p class="header"> </p>
        <p class="content">${note.content + "?"}
        <br>
        <span class="date"><font size="-2">${note.date}</font></span> 
        <a href="#" class="listen-note" title="Listen to Note">Listen to the patient's response...</a>
        <a href="#" class="delete-note" title="Delete">Delete Question</a>
            <hr>
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



/*-----------------------------
        Question you missed out in consultation
 ------------------------------*/




    if (jobx == 0) {
      jobx = "NaN....................> The patient's job";
    }//to tell the user if they forgot to ask about the patient's job
    else{jobx = "";}
       
    
    if (radiatex==0) {
      radiatex = "NaN....................> Whether the pain radiated to anywhere";
      //message.innerHTML("> Whether the pain radiated to anywhere");
    }//does it radiate anywhere
    else{radiatex = " ";}
    
    if (ratepainx==0) {
      ratepainx = "NaN....................> The severity of the pain";
    }//rate the pain
    else{ratepainx = " ";}
    
    if (makeitworsex==0) {
      makeitworsex = "NaN....................> Whether or not anything makes the pain worse";
    }//make it worse
    else{makeitworsex = "";}
    
    if (makeitbetterx==0) {
      makeitbetterx = "NaN....................> Whether or not anything makes the pain better";
    }//make it better
    else{makeitbetterx = "";}
    
    if (walkdistancex==0) {
      walkdistancex = "NaN....................> How far they can walk";
    }//how far can they walk
    else{walkdistancex = "";}
    
    if (ideasx==0) {
      ideasx = "NaN....................> The patient's ideas";
    }//ideas
    else{ideasx = "";}
    
    if (concernsx==0) {
      concernsx = "NaN....................> The patient's concerns";
    }//concerns
    else{concernsx = "";}
    
    if (expectationsx==0) {
      expectationsx = "NaN....................> The patient's expectations";
    }//expectations
    else{expectationsx = "";}
    
    if (familyhistoryx==0) {
      familyhistoryx = "NaN....................> Family history";
    }//FHx
    else{familyhistoryx = "";}
    
    if (smokingx==0) {
      smokingx = "NaN....................> Whether the patient smoked";
    }//smoking
    else{smokingx = "";}
    
    if (alcoholx==0) {
      alcoholx = "NaN....................> Whether the patient drank any alcohol";
    }//alcohol
    else{alcoholx = "";}



    const whatQuyoumissedbtn = document.getElementById('whatQuyoumissed-btn');
    const message = document.getElementById('message');
    
    function missedquestions(){
      
      message.innerHTML = "You forgot to ask about the following things: (PLEASE IGNORE WHEN IT SAYS 'NaN') " 
      +  "<br />" +  "<br />"+ jobx +  "<br />"+ radiatex +  "<br />"+ ratepainx +  "<br />"
      + makeitworsex+  "<br />" + makeitbetterx+  "<br />" + walkdistancex+  "<br />"
      + ideasx+  "<br />" + concernsx+  "<br />" + expectationsx+  "<br />" + familyhistoryx+  "<br />" + smokingx+  "<br />" + alcoholx;
 
    
    
  }        //for the function called myFunction
  whatQuyoumissedbtn.addEventListener('click', missedquestions);

  //whatQuyoumissed-btn


  










/*-----------------------------
        Summary
 ------------------------------*/


  try {
    var SpeechRecognition1 = window.SpeechRecognition1 || window.webkitSpeechRecognition;
    var recognition1 = new SpeechRecognition1();
  }
  catch(e) {
    console.error(e);
    $('.no-browser-support').show();
    $('.app').hide();
  }
   

  
  var noteSummary = '';
  var summaryContent = '';
  var summarytextarea = $('#summary-textarea');
 
   
   
  recognition1.continuous = true;
   
  recognition1.onresult = function(event) {
   
    var current1 = event.resultIndex;
   
    // Get a transcript of what was said.
    var transcript1 = event.results[current1][0].transcript;
   
    var mobileRepeatBug1 = (current1 == 1 && transcript1 == event.results[0][0].transcript1);
   
    if(!mobileRepeatBug1) {
      noteSummary += transcript1;
      summarytextarea.val(noteSummary);
    }
  };
   
  
  var recordinginstructionsforsummary = $('#recording-instructions-for-summary');

  recognition1.onstart = function() {
    recordinginstructionsforsummary.text('Microphone is activated. Try speaking into the microphone. Then double click the Submit Question button.');
  }
   
  recognition1.onspeechend = function() {
    recordinginstructionsforsummary.text('DOUBLE CLICK THE SUBMIT BUTTON. (Once you get the response, press the Microphone button to ask another question');
  }
   
  recognition1.onerror = function(event) {
    if(event.error == 'no-speech') {
      recordinginstructionsforsummary.text('No speech was detected. Try again.');  
    };
  }
  
  


  
$('#start-record-btn-for-summary').on('click', function(e) {
  if (summaryContent.length) {
    summaryContent += ' ';
  }
  recognition1.start();
});


summarytextarea.on('input', function() {
  noteSummary = $(this).val();
})


$('#save-note-btn-for-summary').on('click', function(e) {
  recognition1.stop();
 
  if(!noteSummary.length) {
    recordinginstructionsforsummary.text('Could not save empty note. Please add a message to your note.');
  }
  else {
    // Save note to localStorage.
    // The key is the dateTime with seconds, the value is the content of the note.
    
    saveNote(new Date().toLocaleString(), noteSummary);
    recordinginstructionsforsummary.text('Your summary: '+ noteSummary);

    //noteSummary = '';
    //renderNotes(getAllNotes());
    summarytextarea.val('');
  }
})



/*-----------------------------
        Saving the Summary
 ------------------------------*/
const txt1 = document.getElementById('examinations-textarea');
const btn1 = document.getElementById('save-examinations');
const out1 = document.getElementById('output1');

 function fun1() {
  if (txt1.value.includes('cardi')||txt1.value.includes('heart')){
    out1.innerHTML = txt1.value + ' is CORRECT';

  }
  else{
    out1.innerHTML = txt1.value + ' may be correct, however it is not in our model answers, however it does not necessarily mean your answer is incorrect as long as you are able to justify your reasoning. You may try again if you would like';

  }

 }//end of function called fun1

 btn1.addEventListener('click', fun1);





/*-----------------------------
        Examination findings (as in what the patient has on examination)
 ------------------------------*/

 

 const examfindingsbtn = document.getElementById('examfindings-btn');
 const messageofexaminationfindings = document.getElementById('messageofexaminationfindings');

function examinationfindings(){
  messageofexaminationfindings.innerHTML = "let go";
}
examfindingsbtn.addEventListener('click', examinationfindings);









 
/*-----------------------------
        differentials
 ------------------------------*/


//DIFFERENTIAL 1

 const txt1s = document.getElementById('differential1-textarea');
 const btn1s = document.getElementById('save-d1');
 const out1s = document.getElementById('output10');
 
  function fun1s() {
   if (txt1s.value.includes('MI')||txt1s.value.includes('heart attack')){
     out1s.innerHTML = txt1s.value + ' is CORRECT';
 
   }
   else{
     out1s.innerHTML = txt1s.value + ' may be correct, however it is not in our model answers, however it does not necessarily mean your answer is incorrect as long as you are able to justify your reasoning. You may try again if you would like';
 
   }
 
  }//end of function called fun1s
 
  btn1s.addEventListener('click', fun1s);






//DIFFERENTIAL 2
const txt2s = document.getElementById('differential2-textarea');
const btn2s = document.getElementById('save-d2');
const out2s = document.getElementById('output2');

 function fun2s() {
  if (txt2s.value.includes('MI')||txt2s.value.includes('heart attack')){
    out2s.innerHTML = txt2s.value + ' is CORRECT';

  }
  else{
    out2s.innerHTML = txt2s.value + ' may be correct, however it is not in our model answers, however it does not necessarily mean your answer is incorrect as long as you are able to justify your reasoning. You may try again if you would like';

  }

 }//end of function called fun1s

 btn2s.addEventListener('click', fun2s);








 //DIFFERENTIAL 3
const txt3s = document.getElementById('differential3-textarea');
const btn3s = document.getElementById('save-d3');
const out3s = document.getElementById('output3');

 function fun3s() {
  if (txt3s.value.includes('MI')||txt3s.value.includes('heart attack')){
    out3s.innerHTML = txt3s.value + ' is CORRECT';

  }
  else{
    out3s.innerHTML = txt3s.value + ' may be correct, however it is not in our model answers, however it does not necessarily mean your answer is incorrect as long as you are able to justify your reasoning. You may try again if you would like';

  }

 }//end of function called fun1s

 btn3s.addEventListener('click', fun3s);






/*-----------------------------
        Blood tests to do
 ------------------------------*/


 try {
  var SpeechRecognition2 = window.SpeechRecognition2 || window.webkitSpeechRecognition;
  var recognition2 = new SpeechRecognition2();
}
catch(e) {
  console.error(e);
  $('.no-browser-support').show();
  $('.app').hide();
}
 


var noteSummary2 = '';
var summaryContent2 = '';
var summarytextarea2 = $('#summary-textareatwo');

 
 
recognition2.continuous = true;
 
recognition2.onresult = function(event) {
 
  var current2 = event.resultIndex;
 
  // Get a transcript of what was said.
  var transcript2 = event.results[current2][0].transcript;
 
  var mobileRepeatBug2 = (current2 == 1 && transcript2 == event.results[0][0].transcript2);
 
  if(!mobileRepeatBug2) {
    noteSummary2 += transcript2;
    summarytextarea2.val(noteSummary2);
  }
};
 

var recordinginstructionsforsummary2 = $('#recording-instructions-for-blood');

recognition2.onstart = function() {
  recordinginstructionsforsummary2.text('Microphone is activated. Try speaking into the microphone. Then double click the Submit Question button.');
}
 
recognition2.onspeechend = function() {
  recordinginstructionsforsummary2.text('DOUBLE CLICK THE SUBMIT BUTTON. (Once you get the response, press the Microphone button to ask another question');
}
 
recognition2.onerror = function(event) {
  if(event.error == 'no-speech') {
    recordinginstructionsforsummary2.text('No speech was detected. Try again.');  
  };
}





$('#start-record-btn-for-blood').on('click', function(e) {
if (summaryContent2.length) {
  summaryContent2 += ' ';
}
recognition2.start();
});


summarytextarea2.on('input', function() {
noteSummary2 = $(this).val();
})


$('#save-note-btn-for-blood').on('click', function(e) {
recognition2.stop();

if(!noteSummary2.length) {
  recordinginstructionsforsummary2.text('Could not save empty note. Please add a message to your note.');
}
else {
  // Save note to localStorage.
  // The key is the dateTime with seconds, the value is the content of the note.
  
  saveNote(new Date().toLocaleString(), noteSummary2);
  recordinginstructionsforsummary2.text('You said: '+ noteSummary2);

  //noteSummary = '';
  //renderNotes(getAllNotes());
  summarytextarea2.val('');
}
})





/*-----------------------------
      Saving the bloodtest answers
------------------------------*/
const txt1_blood = document.getElementById('blood-textarea');
const btn1_blood = document.getElementById('save-note-btn-for-blood');
const out1_blood = document.getElementById('recording-instructions-for-blood');

function blood1() {
if (txt1_blood.value.includes('cardi')||txt1_blood.value.includes('heart')){
  out1_blood.innerHTML = txt1_blood.value + ' is CORRECT';

}
else{
  out1_blood.innerHTML = txt1_blood.value + ' may be correct, however it is not in our model answers, however it does not necessarily mean your answer is incorrect as long as you are able to justify your reasoning. You may try again if you would like';

}

}//end of function called fun1

btn1_blood.addEventListener('click', blood1);










/*-----------------------------
        Investigations
 ------------------------------*/


 try {
  var SpeechRecognition3 = window.SpeechRecognition3 || window.webkitSpeechRecognition;
  var recognition3 = new SpeechRecognition3();
}
catch(e) {
  console.error(e);
  $('.no-browser-support').show();
  $('.app').hide();
}
 


var noteSummary3 = '';
var summaryContent3 = '';
var summarytextarea3 = $('#investigations-textarea');

 
 
recognition3.continuous = true;
 
recognition3.onresult = function(event) {
 
  var current3 = event.resultIndex;
 
  // Get a transcript of what was said.
  var transcript3 = event.results[current3][0].transcript;
 
  var mobileRepeatBug3 = (current3 == 1 && transcript3 == event.results[0][0].transcript3);
 
  if(!mobileRepeatBug3) {
    noteSummary3 += transcript3;
    summarytextarea3.val(noteSummary3);
  }
};
 


var recordinginstructionsforsummary3 = $('#recording-instructions-for-investigations');

recognition3.onstart = function() {
  recordinginstructionsforsummary3.text('Microphone is activated. Try speaking into the microphone. Then double click the Submit Question button.');
}
 
recognition3.onspeechend = function() {
  recordinginstructionsforsummary3.text('DOUBLE CLICK THE SUBMIT BUTTON. (Once you get the response, press the Microphone button to ask another question');
}
 
recognition3.onerror = function(event) {
  if(event.error == 'no-speech') {
    recordinginstructionsforsummary3.text('No speech was detected. Try again.');  
  };
}





$('#start-record-btn-for-investigations').on('click', function(e) {
if (summaryContent3.length) {
  summaryContent3 += ' ';
}
recognition3.start();
});


summarytextarea3.on('input', function() {
noteSummary3 = $(this).val();
})


$('#save-note-btn-for-investigations').on('click', function(e) {
recognition3.stop();

if(!noteSummary3.length) {
  recordinginstructionsforsummary3.text('Could not save empty note. Please add a message to your note.');
}
else {
  // Save note to localStorage.
  // The key is the dateTime with seconds, the value is the content of the note.
  
  saveNote(new Date().toLocaleString(), noteSummary3);
  recordinginstructionsforsummary3.text('You said: '+ noteSummary3);

  //noteSummary = '';
  //renderNotes(getAllNotes());
  summarytextarea3.val('');
}
})






/*-----------------------------
      Saving the investigations answers
------------------------------*/

/*

const txt3_blood = document.getElementById('investigations-textarea');
const btn3_blood = document.getElementById('save-note-btn-for-investigations');
const out3_blood = document.getElementById('recording-instructions-for-investigations');

function investigationss() {
if (txt3_blood.value.includes('cardi')||txt3_blood.value.includes('heart')){
  out3_blood.innerHTML = txt3_blood.value + ' is CORRECT';

}
else{
  out3_blood.innerHTML = txt3_blood.value + ' may be correct, however it is not in our model answers, however it does not necessarily mean your answer is incorrect as long as you are able to justify your reasoning. You may try again if you would like';

}

}//end of function called fun1

btn3_blood.addEventListener('click', investigationss); 

*/













/*-----------------------------
        riskfactors
 ------------------------------*/


 try {
  var SpeechRecognition4 = window.SpeechRecognition4 || window.webkitSpeechRecognition;
  var recognition4 = new SpeechRecognition4();
}
catch(e) {
  console.error(e);
  $('.no-browser-support').show();
  $('.app').hide();
}
 


var noteSummary4 = '';
var summaryContent4 = '';
var summarytextarea4 = $('#riskfactors-textarea');

 
 
recognition4.continuous = true;
 
recognition4.onresult = function(event) {
 
  var current4 = event.resultIndex;
 
  // Get a transcript of what was said.
  var transcript4 = event.results[current4][0].transcript;
 
  var mobileRepeatBug4 = (current4 == 1 && transcript4 == event.results[0][0].transcript4);
 
  if(!mobileRepeatBug4) {
    noteSummary4 += transcript4;
    summarytextarea4.val(noteSummary4);
  }
};
 

var recordinginstructionsforsummary4 = $('#recording-instructions-for-riskfactors');

recognition4.onstart = function() {
  recordinginstructionsforsummary4.text('Microphone is activated. Try speaking into the microphone. Then double click the Submit Question button.');
}
 
recognition4.onspeechend = function() {
  recordinginstructionsforsummary4.text('DOUBLE CLICK THE SUBMIT BUTTON. (Once you get the response, press the Microphone button to ask another question');
}
 
recognition4.onerror = function(event) {
  if(event.error == 'no-speech') {
    recordinginstructionsforsummary4.text('No speech was detected. Try again.');  
  };
}





$('#start-record-btn-for-riskfactors').on('click', function(e) {
if (summaryContent4.length) {
  summaryContent4 += ' ';
}
recognition4.start();
});


summarytextarea4.on('input', function() {
noteSummary4 = $(this).val();
})


$('#save-note-btn-for-riskfactors').on('click', function(e) {
recognition4.stop();

if(!noteSummary4.length) {
  recordinginstructionsforsummary4.text('Could not save empty note. Please add a message to your note.');
}
else {
  // Save note to localStorage.
  // The key is the dateTime with seconds, the value is the content of the note.
  
  saveNote(new Date().toLocaleString(), noteSummary4);
  recordinginstructionsforsummary4.text('You said: '+ noteSummary4);

  //noteSummary = '';
  //renderNotes(getAllNotes());
  summarytextarea4.val('');
}
})





/*-----------------------------
      Saving the riskfactors answers
------------------------------*/

/*

const txt4_blood = document.getElementById('riskfactors-textarea');
const btn4_blood = document.getElementById('save-note-btn-for-riskfactors');
const out4_blood = document.getElementById('recording-instructions-for-riskfactors');

function riskfactorss() {
if (txt4_blood.value.includes('cardi')||txt4_blood.value.includes('heart')){
  out4_blood.innerHTML = txt4_blood.value + ' is CORRECT';

}
else{
  out4_blood.innerHTML = txt4_blood.value + ' may be correct, however it is not in our model answers, however it does not necessarily mean your answer is incorrect as long as you are able to justify your reasoning. You may try again if you would like';

}

}//end of function called fun1

btn4_blood.addEventListener('click', riskfactorss); 

*/










/*-----------------------------
        treatments
 ------------------------------*/


 try {
  var SpeechRecognition5 = window.SpeechRecognition5 || window.webkitSpeechRecognition;
  var recognition5 = new SpeechRecognition5();
}
catch(e) {
  console.error(e);
  $('.no-browser-support').show();
  $('.app').hide();
}
 


var noteSummary5 = '';
var summaryContent5 = '';
var summarytextarea5 = $('#treatments-textarea');

 
 
recognition5.continuous = true;
 
recognition5.onresult = function(event) {
 
  var current5 = event.resultIndex;
 
  // Get a transcript of what was said.
  var transcript5 = event.results[current5][0].transcript;
 
  var mobileRepeatBug5 = (current5 == 1 && transcript5 == event.results[0][0].transcript5);
 
  if(!mobileRepeatBug5) {
    noteSummary5 += transcript5;
    summarytextarea5.val(noteSummary5);
  }
};
 

var recordinginstructionsforsummary5 = $('#recording-instructions-for-treatments');

recognition5.onstart = function() {
  recordinginstructionsforsummary5.text('Microphone is activated. Try speaking into the microphone. Then double click the Submit Question button.');
}
 
recognition5.onspeechend = function() {
  recordinginstructionsforsummary5.text('DOUBLE CLICK THE SUBMIT BUTTON. (Once you get the response, press the Microphone button to ask another question');
}
 
recognition5.onerror = function(event) {
  if(event.error == 'no-speech') {
    recordinginstructionsforsummary5.text('No speech was detected. Try again.');  
  };
}





$('#start-record-btn-for-treatments').on('click', function(e) {
if (summaryContent5.length) {
  summaryContent5 += ' ';
}
recognition5.start();
});


summarytextarea5.on('input', function() {
noteSummary5 = $(this).val();
})


$('#save-note-btn-for-treatments').on('click', function(e) {
recognition5.stop();

if(!noteSummary5.length) {
  recordinginstructionsforsummary5.text('Could not save empty note. Please add a message to your note.');
}
else {
  // Save note to localStorage.
  // The key is the dateTime with seconds, the value is the content of the note.
  
  saveNote(new Date().toLocaleString(), noteSummary5);
  recordinginstructionsforsummary5.text('You said: '+ noteSummary5);

  //noteSummary = '';
  //renderNotes(getAllNotes());
  summarytextarea5.val('');
}
})





/*-----------------------------
      Saving the treatments answers
------------------------------*/

/*

const txt5_blood = document.getElementById('treatments-textarea');
const btn5_blood = document.getElementById('save-note-btn-for-treatments');
const out5_blood = document.getElementById('recording-instructions-for-treatments');

function treatmentss() {
if (txt5_blood.value.includes('cardi')||txt5_blood.value.includes('heart')){
  out5_blood.innerHTML = txt5_blood.value + ' is CORRECT';

}
else{
  out5_blood.innerHTML = txt5_blood.value + ' may be correct, however it is not in our model answers, however it does not necessarily mean your answer is incorrect as long as you are able to justify your reasoning. You may try again if you would like';

}

}//end of function called fun1

btn5_blood.addEventListener('click', treatmentss); 

*/




















/*-----------------------------
      FinalReview
------------------------------*/

const finalreviewbtn = document.getElementById('finalreview-btn');

function finalreviewss() {

var summaryfinal = $('#summaryfinal');
summaryfinal.text('Your summary: ' + noteSummary);

var differentialsfinal = $('#differentialsfinal');
differentialsfinal.text('Your differentials: ' + txt1s.value + ', ' + txt2s.value + ', ' + txt3s.value);

var examinationsfinal = $('#examinationsfinal');
examinationsfinal.text('The examination you chose to do was: ' + txt1.value);

var bloodtestsfinal = $('#bloodtestsfinal');
bloodtestsfinal.text('you chose to do the following blood tests: ' + noteSummary2);

var otherinvestigationsfinal = $('#otherinvestigationsfinal');
otherinvestigationsfinal.text('you chose to do the following investigations: ' + noteSummary3);

var riskfactorsfinal = $('#riskfactorsfinal');
riskfactorsfinal.text('these are the risk factors you chose: ' + noteSummary4);

var treatmentsfinal = $('#treatmentsfinal');
treatmentsfinal.text('these are the treatmens you chose: ' + noteSummary5);







var summarymodel = $('#summarymodel');
summarymodel.text('model');

var differentialsmodel = $('#differentialsmodel');
differentialsmodel.text('model');

var examinationsmodel = $('#examinationsmodel');
examinationsmodel.text('model');

var bloodtestsmodel = $('#bloodtestsmodel');
bloodtestsmodel.text('model');

var otherinvestigationsmodel = $('#otherinvestigationsmodel');
otherinvestigationsmodel.text('model');

var riskfactorsmodel = $('#riskfactorsmodel');
riskfactorsmodel.text('model');

var treatmentsmodel = $('#treatmentsmodel');
treatmentsmodel.text('model');








}



finalreviewbtn.addEventListener('click', finalreviewss);






























/*-----------------------------
        Quiz
 ------------------------------*/


window.onload = function () {
  
  var questionArea = document.getElementsByClassName('questions')[0],
      answerArea   = document.getElementsByClassName('answers')[0],
      checker      = document.getElementsByClassName('checker')[0],
      current      = 0,
  
     // An object that holds all the questions + possible answers.
     // In the array --> last digit gives the right answer position
      allQuestions = {
        'If a patient with ST elevation MI was one and a half hours away from the nearest PCI center, what would you do?' : ['Cardiovert them', 'Send them to PCI', 'Wait till the on call cardiologist comes along', 1],
        
        'What dose of aspirin should a patient be started on after having had an MI?' : ['200mg', '500mg' , '800mg', 2],
        
        'What is the first line investigation of angina? ' : ['it is a clinical diagnosis', 'Chest X ray', 'ECG', 0],


      };
      
  function loadQuestion(curr) {
  // This function loads all the question into the questionArea
  // It grabs the current question based on the 'current'-variable
  
    var question = Object.keys(allQuestions)[curr];
    
    questionArea.innerHTML = '';
    questionArea.innerHTML = question;    
  }
  
  function loadAnswers(curr) {
  // This function loads all the possible answers of the given question
  // It grabs the needed answer-array with the help of the current-variable
  // Every answer is added with an 'onclick'-function
  
    var answers = allQuestions[Object.keys(allQuestions)[curr]];
    
    answerArea.innerHTML = '';
    
    for (var i = 0; i < answers.length -1; i += 1) {
      var createDiv = document.createElement('div'),
          text = document.createTextNode(answers[i]);
      
      createDiv.appendChild(text);      
      createDiv.addEventListener("click", checkAnswer(i, answers));
      
      
      answerArea.appendChild(createDiv);
    }
  }
  
  function checkAnswer(i, arr) {
    // This is the function that will run, when clicked on one of the answers
    // Check if givenAnswer is sams as the correct one
    // After this, check if it's the last question:
    // If it is: empty the answerArea and let them know it's done.
    
    return function () {
      var givenAnswer = i,
          correctAnswer = arr[arr.length-1];
      
      if (givenAnswer === correctAnswer) {
        addChecker(true);             
      } else {
        addChecker(false);                        
      }
      
      if (current < Object.keys(allQuestions).length -1) {
        current += 1;
        
        loadQuestion(current);
        loadAnswers(current);
      } else {
        questionArea.innerHTML = 'Done';
        answerArea.innerHTML = '';
      }
                              
    };
  }
  
  function addChecker(bool) {
  // This function adds a div element to the page
  // Used to see if it was correct or false
  
    var createDiv = document.createElement('div'),
        txt       = document.createTextNode(current + 1);
    
    createDiv.appendChild(txt);
    
    if (bool) {
      
      createDiv.className += 'correct';
      checker.appendChild(createDiv);
    } else {
      createDiv.className += 'false';
      checker.appendChild(createDiv);
    }
  }
  
  
  // Start the quiz right away
  loadQuestion(current);
  loadAnswers(current);
  
};