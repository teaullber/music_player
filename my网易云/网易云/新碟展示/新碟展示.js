// 歌单展示列表
const ListContent = document.getElementById('ListContent');

// 歌单上部分
const dishShowImg = document.getElementById('dishShowImg');//歌单大图片
const title = document.getElementById('showTitle');     //歌单大标题
const showAuthorImg = document.getElementById('showAuthorImg');//作者图片
const albumSinger = document.getElementById('albumSinger');   //歌单作者
const albumCompany = document.getElementById('albumCompany');   //播放按钮
const albumTime = document.getElementById('albumTime');     //发行时间
const showTag = document.getElementsByClassName('showTag');
const showDesc = document.getElementById('showDesc');


// 歌单列表展示内容
const listContent = document.getElementById('listContent');
const showListCount = document.getElementById('showListCount');
const showList = document.getElementsByClassName('showList');
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

// 鼠标移入解释文字
const dishMouse = document.getElementsByClassName('dishMouse');
const dishTitleMouse = document.getElementsByClassName('dishTitleMouse');

var pagePrev = document.getElementById('pagePrev');
var pageNext = document.getElementById('pageNext');
var page = document.getElementsByClassName('page');

var max = 18;
var min = 0;
var num = 0;

// 获取歌单id
var reg = /([^=]+)$/;
var idNum = String(location.href).match(reg)[1];

// 时间戳转换日期
function timeChange(timestamp){
    var date = new Date(timestamp);
    albumTime.innerHTML = date.getFullYear()+"-"+(date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'+date.getDate();

}

window.onload = function(){
    $.get(
        'http://1.13.2.68:3000/album?id='+idNum,

        function(data){
            console.log(data);
            // 新碟封面
            dishShowImg.src = data.album.picUrl;
            // 新碟标题
            title.innerHTML = data.album.name;
            // 新碟歌手
            albumSinger.innerHTML = data.album.artist.name;
            // 发行时间
            timeChange(data.album.publishTime);

            // 专辑公司
            albumCompany.innerHTML = data.album.company;
            // 歌单介绍
            showDesc.innerHTML = data.album.description;

            for(var i=0;i<data.songs.length;i++){
                // 生成新碟包含歌曲
                listContent.innerHTML += "<li class='showList'><p class='showListNumer'><span class='showListNum'></span><img src='./img/播放(黑).png' alt='' class='play'></p><p class='showListTitle'></p><p class='showListTime'></p><p class='showListSinger'></p></li>";
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
                showListSinger[i].href = "javascript:;";

                if(showListNum[i].innerHTML<10){
                    showListNum[i].style.marginLeft = "12px";
                    showListNum[i].style.marginRight = "15px";
                }
            }
            
        
        },
        'json'
    );
    $.get(
        'http://1.13.2.68:3000/album/detail/dynamic?id='+idNum,

        function(data){
            console.log(data);
            
            // 分享、评论次数
            ShareCount.innerHTML = "("+data.shareCount+")";
            TalkCount.innerHTML = "("+data.commentCount+")";
        
        },
        'json'
    );
};