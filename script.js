const play = document.getElementById("play");
const music = document.querySelector("audio");
const img = document.querySelector("img");
const title = document.querySelector("#title");
const artist = document.querySelector("#artist");
const prev = document.querySelector("#prev");
const next = document.querySelector("#next");
let progress = document.getElementById("progress");
const song_duration = document.getElementById("duration");
let current_time = document.getElementById("current-time");
const progress_div = document.getElementById("progress-div");


const songs = [
    {
        name: "song-1",
        title: "BELIEVER",
        artist: "Imagine Dragons"
    },
    {
        name: "song-2",
        title: "SOMETHING JUST LIKE THIS",
        artist: "Chainsmokers"
    },
    {
        name: "song-3",
        title: "EVERGLOW",
        artist: "Coldplay"
    }
];

let isPlaying = false;

// for playing song
const playMusic = () => {

    isPlaying = true;
    music.play();
    play.classList.replace("fa-play", "fa-pause");
    img.classList.add("anime");

};

// for pausing song
const pauseMusic = () => {

    isPlaying = false;
    music.pause();
    play.classList.replace("fa-pause", "fa-play");
    img.classList.replace("anime", "not-anime");

};

play.addEventListener('click', () => {
    isPlaying ? pauseMusic() : playMusic();
});


// changing the music data
const loadSongs = (song) => {
    title.textContent = song.title;
    artist.textContent = song.artist;
    music.src = `songs/${song.name}.mp3`;
    img.src = `images/${song.name}-img.jpg`;
};

songIndex = 0;

// loadSongs(songs[0]);

const nextSong = () => {
    songIndex = (songIndex + 1) % songs.length;
    loadSongs(songs[songIndex]);
    playMusic();
};
const prevSong = () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSongs(songs[songIndex]);
};

// Progress JS Bar
music.addEventListener('timeupdate', (event) => {
    const { currentTime, duration } = event.srcElement;
    let progressTime = (currentTime / duration) * 100;
    progress.style.width = `${progressTime}%`;


    // Updating Duration Time

    if (duration) {
        let min_duration = Math.floor(duration / 60);
        let sec_duration = Math.floor(duration % 60);
        if(sec_duration<10){
            song_duration.innerHTML = `${min_duration}:0${sec_duration}`;
        }
        else{
            song_duration.innerHTML = `${min_duration}:${sec_duration}`;
        }
    }
    
    // Updating Current Time

    let min_currTime = Math.floor(currentTime / 60);
    let sec_currTime = Math.floor(currentTime % 60);
    current_time.innerHTML = `${min_currTime}:${sec_currTime}`;
    if(sec_currTime < 10){
        current_time.innerHTML = `${min_currTime}:0${sec_currTime}`;
    }

});

// progress onclick feature
progress_div.addEventListener('click',(event) =>{
    const {duration} = music;
    let move_progress = (event.offsetX/event.srcElement.clientWidth);
    music.currentTime = `${move_progress*duration}`;
    progress.style.width = `${move_progress*100}%`;
    
});

music.addEventListener('ended',nextSong);