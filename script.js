// ===========================
// Audio Player Configuration
// ===========================

const audioPlayer = document.getElementById('audioPlayer');
const playBtn = document.getElementById('playBtn');
const progressSlider = document.getElementById('progressSlider');
const progressFill = document.getElementById('progressFill');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');
const volumeSlider = document.getElementById('volumeSlider');
const trackTitle = document.getElementById('trackTitle');
const trackArtist = document.getElementById('trackArtist');

// Set initial volume
audioPlayer.volume = 0.7;

// ===========================
// Event Listeners
// ===========================

playBtn.addEventListener('click', togglePlayPause);
progressSlider.addEventListener('input', seek);
volumeSlider.addEventListener('input', changeVolume);
audioPlayer.addEventListener('timeupdate', updateProgress);
audioPlayer.addEventListener('loadedmetadata', updateDuration);
audioPlayer.addEventListener('play', () => {
    playBtn.querySelector('.play-icon').textContent = '⏸';
});
audioPlayer.addEventListener('pause', () => {
    playBtn.querySelector('.play-icon').textContent = '▶';
});

// ===========================
// Navigation Active Link
// ===========================

const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 300) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ===========================
// Form Submission
// ===========================

const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    contactForm.reset();
});

// ===========================
// Player Functions
// ===========================

/**
 * Toggle play/pause functionality
 */
function togglePlayPause() {
    if (audioPlayer.paused) {
        audioPlayer.play();
    } else {
        audioPlayer.pause();
    }
}

/**
 * Update progress bar and time display
 */
function updateProgress() {
    if (audioPlayer.duration) {
        const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progressFill.style.width = progress + '%';
        progressSlider.value = progress;
        currentTimeEl.textContent = formatTime(audioPlayer.currentTime);
    }
}

/**
 * Update duration display
 */
function updateDuration() {
    durationEl.textContent = formatTime(audioPlayer.duration);
}

/**
 * Seek to a specific position in the audio
 */
function seek() {
    const time = (progressSlider.value / 100) * audioPlayer.duration;
    audioPlayer.currentTime = time;
}

/**
 * Change volume level
 */
function changeVolume() {
    audioPlayer.volume = volumeSlider.value / 100;
}

/**
 * Format time in MM:SS format
 * @param {number} seconds - Time in seconds
 * @returns {string} Formatted time string
 */
function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

// ===========================
// String Utility Methods
// ===========================

/**
 * Fix method: Normalize strings by trimming and removing extra spaces
 * Usage: "hello  world ".fix() => "hello world"
 */
if (!String.prototype.fix) {
    String.prototype.fix = function() {
        return this.trim().replace(/\s+/g, ' ');
    };
}

/**
 * Safe slice method: Slice with bounds checking
 * Usage: "hello world".safeSlice(0, 5) => "hello"
 */
if (!String.prototype.safeSlice) {
    String.prototype.safeSlice = function(start, end) {
        const fixed = this.fix();
        const length = fixed.length;
        const actualStart = Math.max(0, start < 0 ? length + start : start);
        const actualEnd = end === undefined ? length : Math.max(0, end < 0 ? length + end : end);
        return fixed.slice(actualStart, actualEnd);
    };
}

// ===========================
// Initialize
// ===========================

window.addEventListener('load', () => {
    // Initialize with default track
    const defaultTrack = {
        title: 'Piece of You',
        artist: 'Krypticsoundz',
        url: '' // Add audio URL here when available
    };

    trackTitle.textContent = defaultTrack.title.fix();
    trackArtist.textContent = defaultTrack.artist.fix();
    
    // If audio URL is available, set it
    if (defaultTrack.url) {
        audioPlayer.src = defaultTrack.url;
    }
});

// ===========================
// Mobile Navigation Toggle
// ===========================

const hamburger = document.querySelector('.hamburger');
const navLinksContainer = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinksContainer.style.display = navLinksContainer.style.display === 'flex' ? 'none' : 'flex';
    });
}

// ===========================
// Smooth Scroll Performance
// ===========================

document.addEventListener('DOMContentLoaded', () => {
    // Optimize scroll performance
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = window.requestAnimationFrame(() => {
            // Scroll event handler
        });
    });
});