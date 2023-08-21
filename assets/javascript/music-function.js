function loadMusicPlayer(){
    let current = 0;    //Bài hát đầu tiên bắt đầu từ số 0
    let firstClick = false;
    
    const main = document.querySelector('.main');

    const musicImage = document.querySelector('.music-player__image img');
    const musicName = document.querySelector('.music-player__song-name');
    const musicSinger = document.querySelector('.music-player__song-writer');
    const musicAudio = document.getElementById('audio');
    const songProgress = document.getElementById('progress--main');
    let isPlaying = false; 

    const backButton = document.querySelector('.music-player__button--back')
    const playButton = document.querySelector('.music-player__button--play');
    const nextButton = document.querySelector('.music-player__button--next');
    
    fetch("./assets/json/songs.json") 
        .then(res => res.json())
        .then(songs => {

            //Thay đổi 1 bài hát
            function changeCurrentSong(current){
                musicImage.setAttribute('src', songs[current].image)
                musicName.innerText = songs[current].name;
                musicSinger.innerText = songs[current].singer;
                musicAudio.src = songs[current].path;
            }

            //Fix Autoplay policy ở Chrome!
            changeCurrentSong(current);
            main.onclick = function(){
                if (firstClick == false){
                    musicAudio.play()
                    firstClick = true;
                }
            }
            
        
            nextButton.onclick = function(){
                if (current > songs.length - 1)
                    current = 0;
                else
                    current++;
                changeCurrentSong(current);
                musicAudio.play()
                
                
            } 

            backButton.onclick = function(){
                if (current < 0){
                    current = songs.length - 1;
                    console.log(current)
                }
                else
                    current--;
                changeCurrentSong(current);
                musicAudio.play()
                
            } 
           

            playButton.onclick = togglePlay;
            function togglePlay(){
                if (isPlaying){
                    musicAudio.pause();
                } else {
                    musicAudio.play();
                }
            }
            


            musicAudio.onplay = function(){
                isPlaying = true;
            }

            musicAudio.onpause = function(){
                isPlaying = false;
            }

            //Tiến độ bài hát thay đổi
            musicAudio.ontimeupdate = function(){
                if (musicAudio.duration){
                    let currentProgress = Math.floor(musicAudio.currentTime / musicAudio.duration * 100)
                    songProgress.value = currentProgress;


                    //Xử lý 100 tiến độ bài hát thì next bài.
                    if (songProgress.value == 100) {
                        current++;
                        changeCurrentSong(current);
                        musicAudio.play()
                    }
                }
            }
            //Xử lý khi tua 
            songProgress.onchange = function(e){
                let breakTime = audio.duration / 100 * e.target.value;
                musicAudio.currentTime = breakTime;
                
                
            }

            
        })

}


