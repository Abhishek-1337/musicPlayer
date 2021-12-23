const play = document.querySelector('#play');
const music = document.querySelector('audio');
const img = document.querySelector('#image');
const next = document.querySelector('#next');
const prev = document.querySelector('#prev');
const h3 = document.querySelector('.main__container-songdetail h3');
const h5 = document.querySelector('.main__container-songdetail h5');

let isPlaying = false;
let songList = 1;

const songs = [
    {
        name:"Judaai",
        artist:"Arijit, Rekha Bhardawaj"
    },
    {
        name:"Saazish",
        artist:"Bhuavan, Rekha Bhardawaj"
    },
    {
        name:"hips-dont-lie",
        artist:"Shakira"
    }
]

const playMusic = function(){
    isPlaying = true;
    music.play();
    play.classList.replace("fa-play","fa-pause");
    img.classList.add('anime');

};

const pauseMusic = function(){
    isPlaying = false; 
    music.pause();
    play.classList.replace("fa-pause","fa-play");
    img.classList.remove('anime');

};

const songLoad = function(Obj){
    h3.innerHTML = Obj.name;
    h5.innerHTML = Obj.artist;
    music.src = "dist/audio/"+Obj.name+".mp3";
    img.src = "dist/images/"+Obj.name+".jpg";
    music.play();

}

play.addEventListener("click",()=>{
    if(!isPlaying){
        playMusic();
    }
    else{
        pauseMusic();
    }
});

next.addEventListener("click",()=>{
    songList = (songList + 1) % songs.length;
    songLoad(songs[songList]);
});
prev.addEventListener("click",()=>{
    songList = (songList - 1) % songs.length;
    songLoad(songs[songList]);
});


