const video = document.getElementById('videos');
const audio = document.getElementById('meinAudio');

document.addEventListener('click', () => {
    console.log('Document clicked');
    video.play().then(() => { 
        console.log('Video playing');
        audio.play().then(() => {
            console.log('Audio playing');
        }).catch(error => {
            console.error('Error playing audio:', error);
        });
        video.playbackRate = 0.5;
        audio.playbackRate = 1.0;
    }).catch(error => {
        console.error('Error playing video:', error);
    });
});

video.addEventListener('pause', () => audio.pause());
video.addEventListener('timeupdate', () => {
    if (video.currentTime >= video.duration) {
        video.currentTime = 0;
        video.play();
    }
});

video.play().then(() => {
    console.log('Video can play without user interaction');
}).catch(error => {
    console.error('Video cannot play without user interaction:', error);
});

audio.play().then(() => {
    console.log('Audio can play without user interaction');
}).catch(error => {
    console.error('Audio cannot play without user interaction:', error);
});
