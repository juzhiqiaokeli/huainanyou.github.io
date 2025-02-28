const audio = document.getElementById('audio');
        const playBtn = document.getElementById('playBtn');
        const progress = document.getElementById('progress');
        const currentTimeEl = document.getElementById('currentTime');
        const durationEl = document.getElementById('duration');
        const progressContainer = document.getElementById('progressContainer');

        // 播放/暂停控制
        playBtn.addEventListener('click', () => {
            const icon = playBtn.querySelector('i');
            if (audio.paused) {
                audio.play();
                icon.classList.replace('fa-play', 'fa-pause');
            } else {
                audio.pause();
                icon.classList.replace('fa-pause', 'fa-play');
            }
        });

        // 更新进度条和时间（保持原有功能不变）
        audio.addEventListener('timeupdate', updateProgress);
        progressContainer.addEventListener('click', (e) => {
            const width = progressContainer.clientWidth;
            const clickX = e.offsetX;
            audio.currentTime = (clickX / width) * audio.duration;
        });

        audio.addEventListener('loadedmetadata', () => {
            durationEl.textContent = formatTime(audio.duration);
        });

        function updateProgress() {
            const progressPercent = (audio.currentTime / audio.duration) * 100;
            progress.style.width = `${progressPercent}%`;
            currentTimeEl.textContent = formatTime(audio.currentTime);
        }

        function formatTime(seconds) {
            const minutes = Math.floor(seconds / 60);
            seconds = Math.floor(seconds % 60);
            return `${minutes}:${seconds.toString().padStart(2, '0')}`;
        }