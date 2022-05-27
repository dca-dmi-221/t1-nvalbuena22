let svg;

//images
let profile;
let encanto;
let encanto2;



//
let vol;
let nowPlaying;
let gui;
let play;
let nextButton;
let prevButton;
let inputFile;
let playlist = [];  // list of 
let nowList = [];
let input;
let status = false;
const selectPlayList = document.getElementById('selectPlayList');
const selectMusic = document.getElementById('selectMusic');


//************************************************************ */
//Clases

class Song {
    
    constructor(path, id){
        //this.image = loadImage(image);
        this.song = loadSound(path);
        this.id = id;
    
    }
  
    playMusic(){
        this.song.play();
    }

    pauseMusic(){
        this.song.pause();
    }
}
  
class Playlist{
  
    constructor(name, id){
      this.name = name;
      this.id = id;
      this.songs = [];
    }
    
    add(song){
      this.songs.push(song);
    }
  
    play(index){
      if (this.songs[index] != null && this.songs[index] instanceof Song){
        this.songs[index].playMusic();
      }
  
    }
  
}


//************************************************************ */


function preload() {
    soundFormats('mp3');
    

}

function setup() {
    createCanvas(1920, 1080);
    svg=loadImage('assets/Canva.svg');
   ;
   encanto=loadImage('assets/encanto.svg');
   encanto2=loadImage('assets/encanto2.svg');

    gui = createGui();

    vol = createSlider("volume",100, 985,1000, 47,);
    play = createButton("⏭", 1328, 985,83, 47,);
    nextButton = createButton("⏭", 1328+200, 985,83, 47,);
    prevButton = createButton("⏭", 1328-200, 985,83, 47,);
    input = createFileInput(handleFile,0,0);




    playlist.push(new Playlist("main", 0));
    nowList = playlist[0].songs;
    nowPlaying = null;

}

function draw() {
    image(svg, 0, 0, 0, 0);

    image(encanto, 595, 208, 188, 190);

    image(encanto2, 592, 579, 188, 190);

    image(encanto, 1243, 180, 58, 58,);
    image(encanto, 1243, 306, 58, 58,);
    image(encanto, 1243, 684, 58, 58,);
    image(encanto, 1243, 810, 58, 58,);
    image(encanto, 1243, 432, 58, 58,);
    image(encanto, 1243, 558, 58, 58,);


    


    drawGui();

    if (vol.isChanged && nowPlaying != null) {
        nowPlaying.song.setVolume(vol.val);
    }
    if (prevButton.isPressed) {
        prev();
    }
    if (nextButton.isPressed) {
        next();
    }
    if (play.isPressed) {
        playsong();
    }
    
}

function next() {
    let index = nowPlaying.id + 1;
  
    if (index > nowList.length - 1) {
        index = 0;
    }
  
    nowPlaying.song.stop();
    nowPlaying = nowList[index];
    nowPlaying.playMusic();
    print("next song is " + index);
}
  
  
function prev() {
    let index = nowPlaying.id - 1;

    if (index < 0) {
        index = nowList.length - 1;
    }

    nowPlaying.song.stop();
    nowPlaying = nowList[index];
    nowPlaying.playMusic();
    print("previous song is " + index);
}
  
function playsong() {

    if(nowPlaying == null){
        nowPlaying = nowList[0];
    }

    if (!status && nowPlaying != null) {
        nowPlaying.playMusic();
        status = true;
    } else {
        status = false;
        nowPlaying.pauseMusic();
    
    }

   
  
}

function handleFile(file) {
    if (file.type === 'audio') {
     playlist[0].songs.push(new Song(file, playlist[0].songs.length));
     let option = document.createElement("option");
     option.setAttribute("value", playlist[0].songs.length - 1);
     option.innerHTML = file.name;
     selectMusic.insertAdjacentElement("beforeend", option);

    }
}

function createPlayList(){

    let input = document.getElementById('namePlaylist');
    let option = document.createElement("option");
    let list = new Playlist(input.value, Playlist.length - 1);
    input.value = "";

    for (let i = 0; i < selectMusic.options.length; i++) {
        if (selectMusic.options[i].selected === true) {
            list.songs.push(playlist[0].songs[selectMusic.options[i].value]);
            selectMusic.options[i].selected = false;
        }  
    }
    
    playlist.push(list);
    option.setAttribute("value", list.id);
    option.innerHTML = list.name;
    selectPlayList.insertAdjacentElement("beforeend", option);
}

function nowPlayList(){
    nowList = playlist[selectPlayList.value].songs;
}



