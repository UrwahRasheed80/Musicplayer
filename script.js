const audioPlayer = document.getElementById('audio-player');
const playPauseBtn = document.getElementById('play-pause');
const progressBar = document.getElementById('progress-bar');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const shuffleBtn = document.getElementById('shuffle');
const repeatBtn = document.getElementById('repeat');

const songs = ['assets/song1.mp3', 'assets/song2.mp3', 'assets/song3.mp3', 'assets/song4.mp3'];
let songIndex = 0;

// Load the first song
loadSong(songs[songIndex]);

function loadSong(song) {
    audioPlayer.src = song;
    audioPlayer.load();
}

// Play or Pause
playPauseBtn.addEventListener('click', () => {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playPauseBtn.innerHTML = '<img src="https://img.icons8.com/ios-filled/50/000000/pause.png" alt="Pause">';
    } else {
        audioPlayer.pause();
        playPauseBtn.innerHTML = '<img src="https://img.icons8.com/ios-filled/50/000000/play.png" alt="Play">';
    }
});

// Update progress bar
audioPlayer.addEventListener('timeupdate', () => {
    if (audioPlayer.duration) {
        progressBar.value = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    }
});

// Seek functionality
progressBar.addEventListener('input', () => {
    const seekTime = (progressBar.value * audioPlayer.duration) / 100;
    audioPlayer.currentTime = seekTime;
});

// Next Song
nextBtn.addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    audioPlayer.play();
    playPauseBtn.innerHTML = '<img src="https://img.icons8.com/ios-filled/50/000000/pause.png" alt="Pause">';
});

// Previous Song
prevBtn.addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    audioPlayer.play();
    playPauseBtn.innerHTML = '<img src="https://img.icons8.com/ios-filled/50/000000/pause.png" alt="Pause">';
});

// Shuffle
shuffleBtn.addEventListener('click', () => {
    songIndex = Math.floor(Math.random() * songs.length);
    loadSong(songs[songIndex]);
    audioPlayer.play();
    playPauseBtn.innerHTML = '<img src="https://img.icons8.com/ios-filled/50/000000/pause.png" alt="Pause">';
});

// Repeat
repeatBtn.addEventListener('click', () => {
    audioPlayer.loop = !audioPlayer.loop;
    repeatBtn.style.opacity = audioPlayer.loop ? '0.5' : '1';
});

// Handle song end
audioPlayer.addEventListener('ended', () => {
    if (!audioPlayer.loop) {
        nextBtn.click();
    }
});