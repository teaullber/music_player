const songList = document.getElementsByClassName('songList');
const songListImg = document.getElementsByClassName('songListImg');
const button = document.querySelectorAll('button');
const dishShowImgHide = document.getElementsByClassName('dishShowImgHide');

const view = document.getElementsByClassName('viewCounts');
const title = document.getElementsByClassName('songListTitle');
const main = document.getElementById('songLists');
const writer = document.getElementsByClassName('songListWriter');
const grade = document.getElementsByClassName('songListGrade');

var pagePrev = document.getElementById('pagePrev');
var pageNext = document.getElementById('pageNext');
var page = document.getElementsByClassName('page');
var pageList = document.getElementById('pageList');

var max = 11;
var min = 0;
var num = 0;

// 发送get请求生成歌单
function getDish(){
    $.get(
        'http://1.13.2.68:3000/top/playlist?limit=35',

        function(data){
            console.log(data);
            
            for(var i=0; i<data.playlists.length;i++){

                // 生成一页单个歌单
                main.innerHTML += "<div class='songList'><div class='songListUp'><img src='' class='songListImg'><a class='dishShowImgHide'><img src='./img/cover.png'></a><div class='songListUpText'><img class='songListUp_text' src='./img/耳机.png'><!--耳机--><span class='viewCounts'></span><!--播放量--><a href='javascript:;' class='songListUp_text'><img src='./img/播放.png'></a><!--播放按钮--></div></div><div class='songListDown'><a href='javascript:;' class='songListTitle'></a><p><span>by</span><a href='javascript:;' class='songListWriter'></a><img src='' class='songListGrade'><!--等级--></p></div></div>";
                // 播放量
                view[i].innerHTML = parseInt((data.playlists[i].playCount)/10000)+"万";
                // 歌单标题
                title[i].innerHTML = data.playlists[i].name;
                // 歌单图片
                songListImg[i].src = data.playlists[i].coverImgUrl;
                // 歌单作者
                writer[i].innerHTML = data.playlists[i].creator.nickname;
                // 歌单等级
                if(data.playlists[i].creator.avatarDetail != null){
                    grade[i].src = data.playlists[i].creator.avatarDetail.identityIconUrl;
                }else{
                    grade[i].style.display = "none";
                }

                var idNum = data.playlists[i].id;
                
                // 添加href 点击跳转
                // title[i].href = "http://127.0.0.1:5500/%E7%BD%91%E6%98%93%E4%BA%91/%E6%AD%8C%E5%8D%95%E5%B1%95%E7%A4%BA/%E6%AD%8C%E5%8D%95%E5%B1%95%E7%A4%BA.html"+"?id="+idNum;
                title[i].href = "../歌单展示/歌单展示.html"+"?id="+idNum;
                dishShowImgHide[i].href = "../歌单展示/歌单展示.html"+"?id="+idNum;
            }
        },
        'json'
    );
}

// // 生成分页页码
// function creatPage(){
//     for(var i=0;i<18;i++){
//          pageList.innerHTML += "<a href='javascript:;' class='page' number='"+i+"'>"+(i+1)+"</a>";  
//     }  
// }


// 加载歌单
window.onload = function(){
    getDish();

    // 默认页码第一页
    page[0].className += " pageActive";
    pagePrev.style.backgroundColor = "#cdcdcd";



};



//清空class类
function clearClass(){
    for(var i=0; i < page.length;i++){
        page[i].className = "page";
        
    }

}
//添加class类
function addClass(){
    clearClass();
    clearPageChange(pagePrev);
    clearPageChange(pageNext); 
    page[num].className += " pageActive";

    if(num==min){
        pagePrev.style.backgroundColor = "#cdcdcd";
    }else if(num == max){
        pageNext.style.backgroundColor = "#cdcdcd";
    }

    // 分页效果
    axios.get('http://1.13.2.68:3000/top/playlist?limit=35',{

            //url参数
            params: {
                offset:num+1,
            }
            }).then(value => {
                console.log(value.data);
                for(var i=0; i<value.data.playlists.length;i++){

                    // 播放量
                    view[i].innerHTML = parseInt((value.data.playlists[i].playCount)/10000)+"万";
                    // 歌单标题
                    title[i].innerHTML = value.data.playlists[i].name;
                    // 歌单图片
                    songListImg[i].src = value.data.playlists[i].coverImgUrl;
                    // 歌单作者
                    writer[i].innerHTML = value.data.playlists[i].creator.nickname;
                    // 歌单等级
                    if(value.data.playlists[i].creator.avatarDetail != null){
                        grade[i].src = value.data.playlists[i].creator.avatarDetail.identityIconUrl;
                    }else{
                        grade[i].style.display = "none";
                    }
    
    
                }

            });

}

//上一页
function goBack(){
    if(num == min){
        num = max;
    }else{
        num--;
    }
    addClass();
}
//下一页
function goNext(){
    if(num == max){
        num = min;
    }
    else{
        num++;
    }
    addClass();
}
// 上一页下一页按钮
pagePrev.onclick = function(){
    if(num!=min){
        goBack();
    }
}
pageNext.onclick = function(){
    if(num!=max){
        goNext();
    }
}
// 清除换页禁用格式
function clearPageChange(pageChange){
    pageChange.style.backgroundColor = "rgba(248, 248, 248, 1)";
}


// 点击页码切换
for(var i=0; i<page.length; i++){
    page[i].addEventListener('click',function(){

        //获取元素number属性 判断点的是第几页
        var pageNum = this.getAttribute('number');
        num = pageNum;
        addClass();

        
    })
}
