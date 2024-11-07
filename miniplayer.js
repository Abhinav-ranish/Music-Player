
// Selectors for mini player elements
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let track_index = 0;
let isPlaying = false;
let updateTimer;

// Create audio element
let curr_track = document.createElement('audio');

// Track list
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

// Load a track based on the track_index
function loadTrack(track_index) {
    clearInterval(updateTimer);
    resetValues();
    curr_track.src = track_list[track_index].path;
    curr_track.load();
    curr_track.volume = 0.1;  

    // Update track details
    track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")";
    track_name.textContent = track_list[track_index].name;
    track_artist.textContent = track_list[track_index].artist;

    updateTimer = setInterval(updateTimeDisplay, 1000);
    curr_track.addEventListener("ended", nextTrack);
}

// Play or pause the track
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

// Load and play the next track
function nextTrack() {
    if (track_index < track_list.length - 1) {
        track_index += 1;
    } else {
        track_index = 0;
    }
    loadTrack(track_index);
    playTrack();  // Play automatically after loading the next track
}

// Load and play the previous track
function prevTrack() {
    if (track_index > 0) {
        track_index -= 1;
    } else {
        track_index = track_list.length - 1;
    }
    loadTrack(track_index);
    playTrack();  // Play automatically after loading the previous track
}

// Reset time display to default when loading a new track
function resetValues() {
    document.querySelector(".current-time").textContent = "00:00";
    document.querySelector(".total-duration").textContent = "00:00";
}

// Update time display (without a slider)
function updateTimeDisplay() {
    if (!isNaN(curr_track.duration)) {
        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
        if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
        if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        document.querySelector(".current-time").textContent = currentMinutes + ":" + currentSeconds;
        document.querySelector(".total-duration").textContent = durationMinutes + ":" + durationSeconds;
    }
}

// Load the first track in the tracklist when page loads
loadTrack(track_index);
