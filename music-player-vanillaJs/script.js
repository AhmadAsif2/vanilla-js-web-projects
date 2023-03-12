const musicContainer = document.querySelector('.music-container');
const playBtn = document.querySelector('#play');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const audio = document.querySelector('#audio');
const progressContainer = document.querySelector('.progress-container');
const title = document.querySelector('#title');
const cover = document.querySelector('#cover');
const progress = document.querySelector('.progress');

const songs = ['hey', 'summer', 'ukulele'];

let songIndex = 2;

function loadSong(song) {
  title.innerText = song;
  audio.src = `./music/music-player_music_${song}.mp3`;
  cover.src = `img/${song}.jpg`;
}

loadSong(songs[songIndex]);

function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');

  audio.play();
}

function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');
  playBtn.querySelector('i.fas').classList.add('fa-play');

  audio.pause();
}

const nextSong = () => {
  songIndex++;

  if (songIndex > 2) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);

  playSong();
};

const prevSong = () => {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);

  playSong();
};

const updateProgress = (event) => {
  const { duration, currentTime } = event.srcElement;
  const progressPercentage = (currentTime / duration) * 100;
  progress.style.width = `${progressPercentage}%`;
};

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

playBtn.addEventListener('click', () => {
  var isPlaying = musicContainer.classList.contains('play');

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

nextBtn.addEventListener('click', nextSong);

prevBtn.addEventListener('click', prevSong);

audio.addEventListener('ended', nextSong);
audio.addEventListener('timeupdate', updateProgress);

progressContainer.addEventListener('click', setProgress);
