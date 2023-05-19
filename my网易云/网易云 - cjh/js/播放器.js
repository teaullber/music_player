//获取要播放的音乐的触发器
//这里获取的是搜索界面的
//显然，搜搜界面获取过了
//const inSongList_search = document.getElementsByClassName('inSongList_search');


//音乐播放器
const MusicPlayer_musicPlayer = document.getElementById('MusicPlayer_musicPlayer');
//获取进度条div
const progressBar_musicPlayer = document.getElementById('progressBar_musicPlayer');

//获取audio播放器
const music1_musicPlayer = document.getElementById('music1_musicPlayer');

//这个函数用于获取音乐url
//输入 元素class 下标 
var MusicURL_musicPlayer = (className, subscript) => {
    timestamp = new Date().getTime();
    axios({
        method: 'post',
        url: '/song/url/v1',
        params: {
            id: allSong_search.result.songs[subscript].id,
            level: 'standard',
            time: timestamp
        }
    }).then((response) => {
        console.log(response.data)
        music1_musicPlayer.src = response.data.data[0].url;
        music1_musicPlayer.play();
        ThisTimeItDidNotMove_musicPlayer = true;
    }
    )
}

for (let i = 0; i < inSongList_search.length; i++) {
    inSongList_search[i].addEventListener('click', MusicURL_musicPlayer.bind(this, inSongList_search, i))
}





//用于拖动进度条
var progressBarInitiate_musicPlayer = false;


//记录这次mousemove触发没有，用于判定是否激活暂停和继续
var ThisTimeItDidNotMove_musicPlayer = false;
MusicPlayer_musicPlayer.addEventListener('mousemove', (event) => {
    if (progressBarInitiate_musicPlayer == true) {
        var progressBarLong_musicPlayer = event.offsetX;
        progressBar_musicPlayer.style.width = (progressBarLong_musicPlayer / 300) * 100 + '%';
        music1_musicPlayer.currentTime = (progressBarLong_musicPlayer / 300) * music1_musicPlayer.duration;
        ThisTimeItDidNotMove_musicPlayer = true;
        music1_musicPlayer.play();
        ThisTimeItDidNotMove_musicPlayer = true;
    }
})
MusicPlayer_musicPlayer.addEventListener('mousedown', () => {
    progressBarInitiate_musicPlayer = true;
})

//记录歌曲暂停还是继续
var music1_musicPlayerStopOrNot = false;
MusicPlayer_musicPlayer.addEventListener('mouseup', () => {
    if (ThisTimeItDidNotMove_musicPlayer == false) {
        if (music1_musicPlayerStopOrNot == false) {
            music1_musicPlayerStopOrNot = true;
            music1_musicPlayer.pause();
        } else if (music1_musicPlayerStopOrNot == true) {
            music1_musicPlayerStopOrNot = false;
            music1_musicPlayer.play();
        }

    }
    progressBarInitiate_musicPlayer = false;
    ThisTimeItDidNotMove_musicPlayer = false;
})

body_blackHead.addEventListener('mouseup', () => {
    progressBarInitiate_musicPlayer = false;
    ThisTimeItDidNotMove_musicPlayer = false;
})

music1_musicPlayer.addEventListener('timeupdate', (event) => {
    progressBar_musicPlayer.style.width = (music1_musicPlayer.currentTime / music1_musicPlayer.duration) * 100 + '%';
})



