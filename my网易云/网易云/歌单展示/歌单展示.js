// 歌单展示列表
const ListContent = document.getElementById('ListContent');

// 歌单上部分
const dishShowImg = document.getElementById('dishShowImg');//歌单大图片
const title = document.getElementById('showTitle');     //歌单大标题
const showAuthorImg = document.getElementById('showAuthorImg');//作者图片
const writer = document.getElementById('showAuthor');   //歌单作者
const grade = document.getElementById('grade');         //歌单等级
const play = document.getElementsByClassName('play');   //播放按钮
const showTag = document.getElementsByClassName('showTag');
const showDesc = document.getElementById('showDesc');


// 歌单列表展示内容
const listContent = document.getElementById('listContent');
const showListCount = document.getElementById('showListCount');
const showListLink = document.getElementById('showListLink');
const showListPlayCount = document.getElementById('showListPlayCount');

const showListNum = document.getElementsByClassName('showListNum');//歌单号码
const showListTitle = document.getElementsByClassName('showListTitle');
const showListTime = document.getElementsByClassName('showListTime');
const showListSinger = document.getElementsByClassName('showListSinger');
const showListAlbum = document.getElementsByClassName('showListAlbum');

// 按钮
const collectCount = document.getElementById('collectCount');
const ShareCount = document.getElementById('ShareCount');
const DownloadCount = document.getElementById('DownloadCount');
const TalkCount = document.getElementById('TalkCount');


var pagePrev = document.getElementById('pagePrev');
var pageNext = document.getElementById('pageNext');
var page = document.getElementsByClassName('page');

var max = 18;
var min = 0;
var num = 0;

// 获取歌单id

// var idNum = 5337466397;
var reg = /([^=]+)$/;
var idNum = String(location.href).match(reg)[1];

window.onload = function(){
    // 本歌单详情
    $.get(
        'http://1.13.2.68:3000/playlist/detail?id='+idNum,

        function(data){
            console.log(data);
            // 歌单封面
            dishShowImg.src = data.playlist.coverImgUrl;
            // 歌单标题
            title.innerHTML = data.playlist.name;
            // 歌单作者头像
            showAuthorImg.src = data.playlist.creator.avatarUrl;
            // 歌单作者
            writer.innerHTML = data.playlist.creator.nickname;
            // 歌单等级
            if(data.playlist.creator.avatarDetail != null){
                grade.src = data.playlist.creator.avatarDetail.identityIconUrl;
            }else{
                grade.style.display = "none";
            }
            
            // 歌单标签
            for(var i=0; i< data.playlist.tags.length;i++){
                showTag[i].innerHTML = data.playlist.tags[i];
            }
            // 歌单介绍
            showDesc.innerHTML = data.playlist.description;

            // 收藏、分享、评论次数
            collectCount.innerHTML = "("+data.playlist.subscribedCount+")";
            ShareCount.innerHTML = "("+data.playlist.shareCount+")";
            TalkCount.innerHTML = "("+data.playlist.trackCount+")";
            // 播放次数
            showListPlayCount.innerHTML = data.playlist.playCount+"次";
        
        },
        'json'
    );
    // 本歌单包含歌曲详情
    $.get(
        'http://1.13.2.68:3000/playlist/track/all?id='+idNum,

        function(data){            console.log(data);
            
            for(var i=0; i<data.songs.length;i++){

                // 生成歌单列表
                listContent.innerHTML += "<li class='showList'><p class='showListNumer'><span class='showListNum'></span><img src='./img/播放(黑).png' alt='' class='play'></p><p class='showListTitle'></p><p class='showListTime'></p><p class='showListSinger'></p><p class='showListAlbum'></p></li>";
                // 歌曲号码
                showListNum[i].innerHTML = i+1;
                // 歌曲名称
                showListTitle[i].innerHTML = data.songs[i].name;
                // 歌曲时长
                if(parseInt(data.songs[i].dt/60000)<10 && parseInt(data.songs[i].dt%60)<10){
                    showListTime[i].innerHTML = "0"+parseInt(data.songs[i].dt/60000)+":"+"0"+parseInt(data.songs[i].dt%60);
                }
                else if(parseInt(data.songs[i].dt/60000)<10 && parseInt(data.songs[i].dt%60)>=10){
                    showListTime[i].innerHTML = "0"+parseInt(data.songs[i].dt/60000)+":"+parseInt(data.songs[i].dt%60);
                }
                else{
                    showListTime[i].innerHTML = parseInt(data.songs[i].dt/60000)+":"+parseInt(data.songs[i].dt%60);
                }
                
                // 歌曲歌手
                showListSinger[i].innerHTML = data.songs[i].ar[0].name;
                // 歌曲专辑
                showListAlbum[i].innerHTML = data.songs[i].al.name;
                

                if(showListNum[i].innerHTML<10){
                    showListNum[i].style.marginLeft = "12px";
                    showListNum[i].style.marginRight = "15px";
                }
            }
            // 歌单共几首歌
            showListCount.innerHTML = data.songs.length+"首歌";
        
        },
        'json'
    );
};