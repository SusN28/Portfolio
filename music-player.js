
// ════════════════════════════════
// MUSIC PLAYER
// ════════════════════════════════

const tracks = [
  { title: 'Demo Track 01', genre: 'Chiptune',      file: 'audio/track01.mp3', dur: '0:00' },
  { title: 'Demo Track 02', genre: 'Ambient / OST', file: 'audio/track02.mp3', dur: '0:00' },
  { title: 'Demo Track 03', genre: 'Electronic',    file: 'audio/track03.mp3', dur: '0:00' }
];

const audio         = document.getElementById('audioEl');
const btnPlay       = document.getElementById('btnPlay');
const btnPrev       = document.getElementById('btnPrev');
const btnNext       = document.getElementById('btnNext');
const progressFill  = document.getElementById('progressFill');
const progressThumb = document.getElementById('progressThumb');
const progressBar   = document.getElementById('progressBar');
const currentTimeEl = document.getElementById('currentTime');
const totalTimeEl   = document.getElementById('totalTime');
const trackNameEl   = document.getElementById('trackName');
const trackSubEl    = document.getElementById('trackSub');
const playerStatus  = document.getElementById('playerStatus');
const eqBars        = document.getElementById('eqBars');
const coverArt      = document.getElementById('coverArt');
const volSlider     = document.getElementById('volumeSlider');
const trackListEl   = document.getElementById('trackList');
const playerMain    = document.querySelector('.player-main');
const iconPlay      = btnPlay.querySelector('.icon-play');
const iconPause     = btnPlay.querySelector('.icon-pause');

let currentIndex = 0;
let isPlaying    = false;

function buildTrackList() {
  trackListEl.innerHTML = '';
  tracks.forEach((t, i) => {
    const li = document.createElement('li');
    li.className = 'track-item' + (i === currentIndex ? ' active' : '');
    li.innerHTML = `
      <span class="track-num">${String(i + 1).padStart(2, '0')}</span>
      <div class="track-details"><h4>${t.title}</h4><span>${t.genre}</span></div>
      <span class="track-dur">${t.dur}</span>`;
    li.addEventListener('click', () => loadTrack(i, true));
    trackListEl.appendChild(li);
  });
}

function loadTrack(index, autoPlay = false) {
  currentIndex = index;
  const t = tracks[index];
  audio.src = t.file;
  audio.volume = parseFloat(volSlider.value);
  trackNameEl.textContent = t.title;
  trackSubEl.textContent  = t.genre + ' · Nikolay Georgiev';
  progressFill.style.width = '0%';
  progressThumb.style.left = '0%';
  currentTimeEl.textContent = '0:00';
  totalTimeEl.textContent   = t.dur;
  buildTrackList();
  if (autoPlay) { audio.play(); setPlaying(true); }
  else setPlaying(false);
}

function setPlaying(state) {
  isPlaying = state;
  iconPlay.style.display  = state ? 'none'  : 'block';
  iconPause.style.display = state ? 'block' : 'none';
  eqBars.classList.toggle('active', state);
  coverArt.classList.toggle('spinning', state);
  playerMain.classList.toggle('is-playing', state);
  playerStatus.textContent = state ? 'Now Playing' : 'Paused';
}

btnPlay.addEventListener('click', () => {
  if (!audio.src || audio.src === window.location.href) { loadTrack(0, true); return; }
  if (isPlaying) { audio.pause(); setPlaying(false); }
  else           { audio.play();  setPlaying(true);  }
});
btnNext.addEventListener('click', () => loadTrack((currentIndex + 1) % tracks.length, isPlaying));
btnPrev.addEventListener('click', () => loadTrack((currentIndex - 1 + tracks.length) % tracks.length, isPlaying));

function fmtTime(s) {
  return `${Math.floor(s/60)}:${String(Math.floor(s%60)).padStart(2,'0')}`;
}
audio.addEventListener('timeupdate', () => {
  if (!audio.duration) return;
  const pct = (audio.currentTime / audio.duration) * 100;
  progressFill.style.width = pct + '%';
  progressThumb.style.left = pct + '%';
  currentTimeEl.textContent = fmtTime(audio.currentTime);
});
audio.addEventListener('loadedmetadata', () => { totalTimeEl.textContent = fmtTime(audio.duration); });
audio.addEventListener('ended', () => loadTrack((currentIndex + 1) % tracks.length, true));
progressBar.addEventListener('click', (e) => {
  if (!audio.duration) return;
  const rect = progressBar.getBoundingClientRect();
  audio.currentTime = ((e.clientX - rect.left) / rect.width) * audio.duration;
});
volSlider.addEventListener('input', () => { audio.volume = parseFloat(volSlider.value); });
buildTrackList();
if (tracks[0]) {
  trackNameEl.textContent = tracks[0].title;
  trackSubEl.textContent  = tracks[0].genre + ' · Nikolay Georgiev';
}
