// 热门新碟
const hotDish = document.getElementById('hotDish');
// 全部新碟
const allDish = document.getElementById('allDish');
// 新碟
const dish = document.getElementsByClassName('dish');           //单个新碟
const dishLink = document.getElementsByClassName('dishLink');   //新碟图片跳转
const dishImg = document.getElementsByClassName('dishImg');     //新碟图片
const title = document.getElementsByClassName('dishTitle');     //新碟标题
const writer = document.getElementsByClassName('dishWriter');   //新碟作者
const play = document.getElementsByClassName('play');           //播放按钮

// 新碟种类
const typeALL = document.getElementById('typeALL');
const typeZH = document.getElementById('typeZH');
const typeEA = document.getElementById('typeEA');
const typeKR = document.getElementById('typeKR');
const typeJP = document.getElementById('typeJP');

var pagePrev = document.getElementById('pagePrev');
var pageNext = document.getElementById('pageNext');
var page = document.getElementsByClassName('page');

var max = 11;
var min = 0;
var num = 0;

// 新碟种类
function typeChoose(type){
    axios.get('http://1.13.2.68:3000/album/new?limit=35',{

            //url参数
            params: {
                area:type,
                offset:num+1,
            }
            }).then(value => {
                console.log(value.data);
                for(var i=10; i<46;i++){

                    // 新碟链接
                    dishLink.href = "http://1.13.2.68:3000/top/album?id="+value.data.albums[i].id;
                    // 新碟图片
                    dishImg[i].src = value.data.albums[i].picUrl;
                    // 新碟标题
                    title[i].innerHTML = value.data.albums[i].name;
                    // 新碟作者
                    writer[i].innerHTML = value.data.albums[i].artists[0].name;
                }

            });
}

window.onload = function(){
    // 获取热门新碟
    $.get(
        'http://1.13.2.68:3000/top/album?type=hot&limit=10',

        function(data){
            console.log(data);
            
            for(var i=0; i<10;i++){

                // 生成一页单个新碟
                hotDish.innerHTML += "<div class='dish'><div class='dishUp'><a href='' class='dishLink'><img src='' class='dishImg'><span class='dishImgHide'><img src='./img/cover.png'></span><img src='./img/播放.png' class='play'></a></div><div class='dishDown'><a href='' class='dishTitle'></a><a href='javascript:;' class='dishWriter'></a></div>";
                // 新碟图片
                dishImg[i].src = data.weekData[i].picUrl;
                // 新碟标题
                title[i].innerHTML = data.weekData[i].name;
                // 新碟作者
                writer[i].innerHTML = data.weekData[i].artists[0].name;

                var idNum = data.weekData[i].id;
                // 添加href 点击跳转
                // title[i].href = "http://127.0.0.1:5500/%E7%BD%91%E6%98%93%E4%BA%91/%E6%96%B0%E7%A2%9F%E5%B1%95%E7%A4%BA/%E6%96%B0%E7%A2%9F%E5%B1%95%E7%A4%BA.html"+"?id="+idNum;
                // dishLink[i].href = "http://127.0.0.1:5500/%E7%BD%91%E6%98%93%E4%BA%91/%E6%96%B0%E7%A2%9F%E5%B1%95%E7%A4%BA/%E6%96%B0%E7%A2%9F%E5%B1%95%E7%A4%BA.html"+"?id="+idNum;
                
                title[i].href = "../新碟展示/新碟展示.html"+"?id="+idNum;
                dishLink[i].href = "../新碟展示/新碟展示.html"+"?id="+idNum;

            }
        
        },
        'json'
    );
    // 获取全部新碟
    $.get(
        'http://1.13.2.68:3000/album/new?area=ALL&limit=35',

        function(data){
            console.log(data);
            
            for(var i=0; i<35;i++){

                // 生成一页单个新碟
                allDish.innerHTML += "<div class='dish'><div class='dishUp'><a href='' class='dishLink'><img src='' class='dishImg'><span class='dishImgHide'><img src='./img/cover.png'></span><img src='./img/播放.png' class='play'></a></div><div class='dishDown'><a href='' class='dishTitle'></a><a href='javascript:;' class='dishWriter'></a></div>";
                // 新碟链接
                dishLink.href = "http://1.13.2.68:3000/top/album?id="+data.albums[i].id;
                // 新碟图片
                dishImg[i].src = data.albums[i].picUrl;
                // 新碟标题
                title[i].innerHTML = data.albums[i].name;
                // 新碟作者
                writer[i].innerHTML = data.albums[i].artists[0].name;

                var idNum = data.albums[i].id;
                // 添加href 点击跳转
                // title[i].href = "http://127.0.0.1:5500/%E7%BD%91%E6%98%93%E4%BA%91/%E6%96%B0%E7%A2%9F%E5%B1%95%E7%A4%BA/%E6%96%B0%E7%A2%9F%E5%B1%95%E7%A4%BA.html"+"?id="+idNum;
        
                // dishLink[i].href = "http://127.0.0.1:5500/%E7%BD%91%E6%98%93%E4%BA%91/%E6%96%B0%E7%A2%9F%E5%B1%95%E7%A4%BA/%E6%96%B0%E7%A2%9F%E5%B1%95%E7%A4%BA.html"+"?id="+idNum;
                title[i].href = "../新碟展示/新碟展示.html"+"?id="+idNum;
                dishLink[i].href = "../新碟展示/新碟展示.html"+"?id="+idNum;
            }
        
        },
        'json'
    );


    // 默认页码第一页
    page[0].className += " pageActive";
    pagePrev.style.backgroundColor = "#cdcdcd";

};

// 新碟种类切换
typeALL.onclick = function(){
    typeChoose("ALL");
}
typeZH.onclick = function(){
    typeChoose("ZH");
}
typeEA.onclick = function(){
    typeChoose("EA");
}
typeKR.onclick = function(){
    typeChoose("KR");
}
typeJP.onclick = function(){
    typeChoose("JP");
}


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
    axios.get('http://1.13.2.68:3000/album/new?area=ALL&limit=35',{

            //url参数
            params: {
                offset:num+1,
            }
            }).then(value => {
                console.log(value.data);
                for(var i=10; i<46;i++){

                    // 新碟链接
                    dishLink.href = "http://1.13.2.68:3000/top/album?id="+value.data.albums[i].id;
                    // 新碟图片
                    dishImg[i].src = value.data.albums[i].picUrl;
                    // 新碟标题
                    title[i].innerHTML = value.data.albums[i].name;
                    // 新碟作者
                    writer[i].innerHTML = value.data.albums[i].artists[0].name;
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

