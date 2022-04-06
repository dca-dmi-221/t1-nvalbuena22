let svg;

//images
let profile;
let noSeHablaDeBrunoImage;
let laFamiliaMadrigalImage;
let dosOruguitasImage;
let enLoProImage;
let inspiracionImage;
let holaCasitaImage;




//
let slider;
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


//Buttons music
let noSeHablaDeBruno;
let laFamiliaMadrigal;
let dosOruguitas;
let enLoProfundo;
let inspiracion;
let holaCasita;


//
let status = false;
const selectPlayList = document.getElementById('selectPlayList');
const selectMusic = document.getElementById('selectMusic');


//************************************************************ */
//Clases

class Song {
    
    constructor(path, id){
        //this.image = loadImage(image);
        this.path = path;
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
   
    noSeHablaDeBrunoImage=loadImage('assets/no se habla de bruno.svg');
    laFamiliaMadrigalImage=loadImage('assets/la familia m.svg');
    dosOruguitasImage=loadImage('assets/dos O.svg');
    enLoProImage=loadImage('assets/enloprofundo.svg');
    inspiracionImage=loadImage('assets/inspiracionn.svg');
    holaCasitaImage=loadImage('assets/casita.svg');

    gui = createGui();
    vol = createSlider("volume",1205, 940,500, 30,);
    slider = createSlider("slider",100, 985,1000, 30,);
    slider.val = 0;
    play = createButton("▶️", 1400, 985,83, 47,);
    nextButton = createButton("⏭", 1400+100, 985,83, 47,);
    prevButton = createButton("⏮️", 1400-100, 985,83, 47,);
    input = createFileInput(handleFile,0,0);

    
    noSeHablaDeBruno = createButton("",1205, 166,618, 86);
    laFamiliaMadrigal = createButton("",1205, 292,618, 86);
    dosOruguitas = createButton("",1205, 418,618, 86);
    enLoProfundo = createButton("",1205, 544,618, 86);
    inspiracion = createButton("",1205, 670,618, 86);
    holaCasita = createButton("",1205, 796,618, 86);


  



    playlist.push(new Playlist("main", 0));
    playlist[0].add(new Song("playlist/Dos Oruguitas.mp3", 0));
    playlist[0].add(new Song("playlist/En lo profundo.mp3", 1));
    playlist[0].add(new Song("playlist/Hola casita.mp3", 2));
    playlist[0].add(new Song("playlist/Inspiración.mp3", 3));
    playlist[0].add(new Song("playlist/La familia madrigal.mp3", 4));
    playlist[0].add(new Song("playlist/No se habla de bruno.mp3", 5));
    nowList = playlist[0].songs;
    nowPlaying = null;

}

function draw() {
   
    image(svg, 0, 0, 0, 0);
    drawGui();
   

    image(noSeHablaDeBrunoImage, 1205, 166, 618, 86);

    image(laFamiliaMadrigalImage, 1205, 292, 618, 86);

    image(dosOruguitasImage, 1205, 418, 618, 86);
    image(enLoProImage, 1205, 544, 618, 86);
    image(inspiracionImage, 1205, 670, 618, 86);
    image(holaCasitaImage, 1205, 796, 618, 86);

 

    



   

    if (noSeHablaDeBruno.isPressed){
        console.log("no se habla de bruno");
        playThisSong(5);
    }

    if (laFamiliaMadrigal.isPressed){
        console.log("la familia madrigal");
        playThisSong(4);
    }


    if (dosOruguitas.isPressed){
        console.log("dos oruguitas");
        playThisSong(0);
        }

    if (enLoProfundo.isPressed){
        console.log("en lo profundo");
        playThisSong(1);
    }

    if (inspiracion.isPressed){
        console.log("inspiracion");
        playThisSong(3);
    }

        if (holaCasita.isPressed){
            console.log("hola casita");
            playThisSong(2);
        }



    if (slider.isChanged && nowPlaying != null) {
        nowPlaying.song.jump(slider.val, 0);

    }
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
    if(nowPlaying != null){
        
        if (Math.round(nowPlaying.song.currentTime()) == Math.round(nowPlaying.song.duration())) {
            if (nowPlaying.id + 1 < nowList.length) {
                next();
            } 
        }

        sliderRoll();
    }

}

function sliderRoll(){
    if(nowPlaying.song.currentTime() >= slider.val){
        slider.val = nowPlaying.song.currentTime();

    }else if(slider.val > nowPlaying.song.currentTime()){
        slider.val = nowPlaying.song.currentTime();
    }
}

function next() {
    let index = nowPlaying.id + 1;
  
    if (index > nowList.length - 1) {
        index = 0;
    }
  
    nowPlaying.song.stop();
    nowPlaying.song.jump(0, 0);
    
    nowPlaying = nowList[index];
    status = false;
    playsong();
    print("next song is " + index);
}

function playThisSong(id) {

   
    if(nowPlaying != null){
        nowPlaying.song.stop();
        status=false;
    }else{
        nowList = playlist[0].songs;
    }

   
    nowPlaying = nowList[id];

    if (!status && nowPlaying != null) {
        console.log(slider.val);
        slider.max = nowPlaying.song.duration();
        vol.val = nowPlaying.song.getVolume();
        sliderRoll();
        nowPlaying.playMusic();
        console.log(slider.val);
        status = true;
    } else {
        status = false;
        nowPlaying.pauseMusic();
    
    }
}



  
  
function prev() {
    let index = nowPlaying.id - 1;

    if (index < 0) {
        index = nowList.length - 1;
    }

    nowPlaying.song.stop();
    nowPlaying.song.jump(0, 0);
    nowPlaying = nowList[index];
    status = false;
    playsong();
    print("previous song is " + index);
}
  
function playsong() {

    if(nowPlaying == null){
        nowPlaying = nowList[0];
    }

    if (!status && nowPlaying != null) {
        console.log(slider.val);
        slider.max = nowPlaying.song.duration();
        vol.val = nowPlaying.song.getVolume();
        sliderRoll();
        nowPlaying.playMusic();
        console.log(slider.val);
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
    let list = new Playlist(input.value, playlist.length);
    input.value = "";

    for (let i = 0; i < selectMusic.options.length; i++) {
        if (selectMusic.options[i].selected === true) {
            let auxSong = new Song(playlist[0].songs[selectMusic.options[i].value].path, list.songs.length);
            list.songs.push(auxSong);
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
    nowPlaying = null;
}



