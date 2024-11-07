console.log("JavaScript loaded and DOM is ready");

// Selectors without slider elements
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let track_index = 0;
let isPlaying = false;
let updateTimer;

// Create new audio element
let curr_track = document.createElement('audio');

// Define the tracks that have to be played
let track_list = [
    {
    name: "Con te Partiro",
    artist: "Ludig",
    image: "Music/Covers/ludwig.jpg",
    path: "Music/Ludwig - Con te partiro.mp3"
    },
    {
    name: "Bella Ciao",
    artist: "El Profesor",
    image: "Music/Covers/BellaCiao.jpg",
    path: "Music/bella ciao.mp3"
    },
    {
    name: "Islands (kompa pasión)",
    artist: "Tomo, Frozy",
    image: "Music/Covers/islands.jpg",
    path: "Music/islands.mp3"
    },
    {
    name: "Snowfall",
    artist: "øneheart x reidenshi",
    image: "Music/Covers/snowfall.jpeg",
    path: "Music/snowfall.mp3"
    },
    {
    name: "Ransom",
    artist: "Lil Tecca",
    image: "Music/Covers/ransom.jpeg",
    path: "Music/Ransom.mp3"
    },
    {
    name: "Savage Love",
    artist: "Jason Derulo",
    image: "Music/Covers/savage-love.jpeg",
    path: "Music/Savage Love.mp3"
    },
];

function loadTrack(track_index) {
    clearInterval(updateTimer);
    curr_track.src = track_list[track_index].path;
    curr_track.load();
    curr_track.volume = 0.1;  
    track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")";
    track_name.textContent = track_list[track_index].name;
    track_artist.textContent = track_list[track_index].artist;
    updateTimer = setInterval(seekUpdate, 1000);
    curr_track.addEventListener("ended", nextTrack);
}

function playpauseTrack() {
    if (!isPlaying) playTrack();
    else pauseTrack();
}

function playTrack() {
    curr_track.play();
    isPlaying = true;
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-2x"></i>';
}

function pauseTrack() {
    curr_track.pause();
    isPlaying = false;
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-2x"></i>';
}

function nextTrack() {
    if (track_index < track_list.length - 1) track_index += 1;
    else track_index = 0;
    loadTrack(track_index);
    playTrack();
}

function prevTrack() {
    if (track_index > 0) track_index -= 1;
    else track_index = track_list.length - 1;
    loadTrack(track_index);
    playTrack();
}

// Load the first track in the tracklist
loadTrack(track_index);

