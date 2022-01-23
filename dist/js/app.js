const play = document.querySelector('#play');
const music = document.querySelector('audio');
const img = document.querySelector('#image');
const next = document.querySelector('#next');
const prev = document.querySelector('#prev');
const h3 = document.querySelector('.main__container-songdetail h3');
const h5 = document.querySelector('.main__container-songdetail h5');
const slider=document.querySelector('#seek-slider');
const durationTime=document.querySelector('#duration');
const currTime=document.querySelector('#current-time');
const sound=document.querySelector('#sound');
const mute=document.querySelector('.mute');
const volUp=document.querySelector('.up');
let timer;
let isPlaying = false;
let songList = 1;
let volMute=false;
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
    clearInterval(timer);
    isPlaying = true;
    music.play();
    timer=setInterval(sliding,1000);
    play.classList.replace("fa-play","fa-pause");
    img.classList.add('anime');
}

const pauseMusic = function(){
    isPlaying = false; 
    music.pause();
    
    clearInterval(timer);
    play.classList.replace("fa-pause","fa-play");
    img.classList.remove('anime');
};

const changeDuration=()=>{
    music.currentTime=music.duration*(slider.value/100);
}

const sliding=()=>{
    currTime.innerText=formatTime(music.currentTime);
    let position=music.currentTime *(100/music.duration);
    slider.value=position;
}

const formatTime=(durationObj)=>{
    let min = 0,sec=0;

    min=Math.floor(durationObj/60);
    if(min<10){
        min='0'+min;
    }
    sec=Math.floor(durationObj%60);
    if(sec<10){
        sec='0'+sec;
    }
    return `${min}:${sec}`
}

const songLoad = function(Obj){
    slider.value=0;
    h3.innerHTML = Obj.name;
    h5.innerHTML = Obj.artist;
    music.src = "dist/audio/"+Obj.name+".mp3";
    img.src = "dist/images/"+Obj.name+".jpg"; 
    music.addEventListener('loadedmetadata',()=>{
        if(isPlaying){
            playMusic();  
        }
        if(!isNaN(music.duration)){
            durationTime.innerText=formatTime(music.duration);
        }
    })  
 
}
songLoad(songs[songList]);

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
    if(songList === -1){
        songList=songs.length-1;
    }
    songLoad(songs[songList]);
});

slider.addEventListener('change',()=>{
    changeDuration();
});

music.onended=()=>{
   console.log('hello');
   pauseMusic();
}

sound.addEventListener('change',()=>{
    music.volume=sound.value/100;
})

mute.addEventListener('click',()=>{
    if(volMute===false){
        mute.classList.remove('fa-volume-up');
        mute.classList.add('fa-volume-mute');
        music.volume=0;
        volMute=true;
    }
    else{
        mute.classList.remove('fa-volume-mute');
        mute.classList.add('fa-volume-up');
        music.volume=sound.value/100;
        volMute=false;
    }
})


