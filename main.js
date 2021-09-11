let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;

// Create new audio element
let curr_track = document.createElement('audio');

// Define the tracks that have to be played
let track_list = [
  {
    name: "I Wanna Be Someone to Someone",
    artist: "Unknown",
    image: "https://cdn.discordapp.com/attachments/883312487288672266/885610429043335168/download.jpg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://cdn.discordapp.com/attachments/883312487288672266/885609947067461652/y2mate.com_-_I_Wanna_Be_Somebody_to_Someone.mp3"
  },
  {
    name: "Everything Sucks",
    artist: "Vaultboy",
    image: "https://mysonglyrics.net/wp-content/uploads/2021/06/Xi1SmdBvJ5U-HD.jpg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://cdn.discordapp.com/attachments/883312487288672266/885609910858039357/y2mate.com_-_vaultboy_everything_sucks_Official_Lyric_Video.mp3"
  },
  {
    name: "Aibek Berkimbaev",
    artist: "Rauf & Faik",
    image: "https://images.genius.com/edb3fc3a1551d9b54a1023b074d99ce3.1000x1000x1.jpg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://cdn.discordapp.com/attachments/883312487288672266/883312934263062568/y2mate.com_-_Rauf_Faik_Aibek_Berkimbaev_Remix_EDITED.wav"
  },
  {
    name: "Im Not Pretty",
    artist: "Jessia",
    image: "https://ukutabs.com/artistimg/JESSIA.jpg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://cdn.discordapp.com/attachments/883312487288672266/885611423215009802/y2mate.com_-_JESSIA_Im_Not_Pretty_Lyrics.mp3"
  },
  {
    name: "Only Human",
    artist: "Jonas Brothers",
    image: "https://www.rollingstone.com/wp-content/uploads/2019/03/1.jpg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://cdn.discordapp.com/attachments/883312487288672266/883313607822151740/pog.wav"
  },
  {
    name: "Rubberband",
    artist: "Tate McRae",
    image: "https://etcanada.com/wp-content/uploads/2021/01/Tate-McRae-Rubber-Band-Single-Art-1.jpg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://cdn.discordapp.com/attachments/883312487288672266/885608542864805928/y2mate.com_-_Tate_McRae_rubberband_Official_Video.mp3",
  },
  {
    name: "Mad at Disney",
    artist: "Salem ilese",
    image: "https://lastfm.freetls.fastly.net/i/u/ar0/444be70a7a126bdd3bc252d143ac4396.jpg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://cdn.discordapp.com/attachments/883312487288672266/885611428864725002/y2mate.com_-_Mad_at_Disney_salem_ilese_Lyrics_.mp3"
  },
  {
    name: "F**k Boy",
    artist: "Dixie Damelio",
    image: "https://www.thefamouspeople.com/profiles/images/dixie-damelio-2.jpg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://cdn.discordapp.com/attachments/883312487288672266/885611428323659776/y2mate.com_-_Dixie_DAmelio_FBOY_Lyrics.mp3"
  },
];

function random_bg_color() {

  // Get a number between 64 to 256 (for getting lighter colors)
  let red = Math.floor(Math.random() * 256) + 64;
  let green = Math.floor(Math.random() * 256) + 64;
  let blue = Math.floor(Math.random() * 256) + 64;

  // Construct a color withe the given values
  let bgColor = "rgb(" + red + "," + green + "," + blue + ")";

  // Set the background to that color
  document.body.style.background = bgColor;
}

function loadTrack(track_index) {
  clearInterval(updateTimer);
  resetValues();
  curr_track.src = track_list[track_index].path;
  curr_track.load();

  track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")";
  track_name.textContent = track_list[track_index].name;
  track_artist.textContent = track_list[track_index].artist;
  now_playing.textContent = "PLAYING " + (track_index + 1) + " OF " + track_list.length;

  updateTimer = setInterval(seekUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);
  random_bg_color();
}

function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

// Load the first track in the tracklist
loadTrack(track_index);

function playpauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';;
}

function nextTrack() {
  if (track_index < track_list.length - 1)
    track_index += 1;
  else track_index = 0;
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  if (track_index > 0)
    track_index -= 1;
  else track_index = track_list.length;
  loadTrack(track_index);
  playTrack();
}

function seekTo() {
  let seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
  let seekPosition = 0;

  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);

    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}


