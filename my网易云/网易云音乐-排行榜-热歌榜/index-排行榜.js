window.onload = function(){

    //时间换算
    function hourtrantfun(time){
        let minutes = Math.floor((time % 3600000) / 60000); 
        let seconds = Math.floor((time % 60000) / 1000);
        if(seconds>9)
        {
            let result = "0"+minutes+":"+seconds;
            return result;
        }
        else(seconds<10)
        {
            let result = "0"+minutes+":0"+seconds;
            return result;
        }
        
    }


    // 左侧栏
    var imgs = document.querySelectorAll("img");
    var names = document.querySelectorAll(".list-item-name");
    var states = document.querySelectorAll(".list-name-state");
    axios.get("http://1.13.2.68:3000/toplist",{

        // url参数
        params:{
            
        },

        }).then((value) => {
            for(i=0;i<4;i++){
                imgs[i].src = value.data.list[i].coverImgUrl;
                names[i].innerHTML = value.data.list[i].name;
                states[i].innerHTML = value.data.list[i].updateFrequency;
            }
        });
    
        


        //右侧主页面
        var tbody = document.getElementById("tbody");
        var songlistbofangtext = document.getElementsByClassName("songlist-bofang-text");
        var td1nums = document.getElementsByClassName("td1-nums");
        var td2img = document.getElementsByClassName("td2-img");
        var td2spantexta = document.getElementsByClassName("td2-spantext-a");
        var td3hour = document.getElementsByClassName("td3-hour")
        var td4spantexta = document.getElementsByClassName("td4-spantext-a");


        // 榜单总播放次数
        axios.get("http://1.13.2.68:3000/toplist/detail",{
                // url参数
                params:{
                    
                },
            }).then(value=>{
                songlistbofangtext[0].innerHTML = value.data.list[3].playCount;
            });




        // 榜单主内容
        axios.get("http://1.13.2.68:3000/playlist/track/all?id=3778678&limit=100",{
        // url参数
        params:{
            
        },

        }).then((value) => {
            for(i=0;i<3;i++){

                // 生成三个个表单
                tbody.innerHTML +=" <tr class='tbody-tr0'><td class='td1'><div class='hd-and-rk'><span class='td1-nums'></span><div class='rk'><span class='rk-span-img-new'></span></div></div></td><td class='td2'><div class='td2inner'><a href='javascript:;'><img src='' alt='' class='td2-img'></a><span class='td2-bofang'></span><div class='td2-divtext'><span class='td2-spantext'><a href='javascript:;' class='td2-spantext-a'></a></span></div></div></td><td class='td3'><span class='td3-hour'></span><div class='opt-show'><span class='opt-show-bofang'></span><span class='opt-show-shoucang'></span><span class='opt-show-fenxiang'></span><span class='opt-show-xiazai'></span></div></td><td class='td4'><div class='td4-divtext'><span class='td4-spantext'><a href='javascript:;' class='td4-spantext-a'></a></span></div></td></tr> "
                td1nums[i].innerHTML= i+1 ;
                td2img[i].src = value.data.songs[i].al.picUrl;
                td2spantexta[i].innerText = value.data.songs[i].name;

                let hourtranttime = value.data.songs[i].dt;
                let hourtrantnum = hourtrantfun(hourtranttime);
                td3hour[i].innerText = hourtrantnum;

                td4spantexta[i].innerText = value.data.songs[i].ar[0].name;
            }

            for(i=3;i<99;i++){

                // 生成剩余的表单
                tbody.innerHTML +=" <tr class='tbody-tr'><td class='td1'><div class='hd-and-rk'><span class='td1-nums'></span><div class='rk'><span class='rk-span-img-new'></span></div></div></td><td class='td2'><div class='td2inner'><a href='javascript:;'></a><span class='td2-bofang2'></span><div class='td2-divtext-2'><span class='td2-spantext'><a href='javascript:;' class='td2-spantext-a'></a></span></div></div></td><td class='td3'><span class='td3-hour'></span><div class='opt-show'><span class='opt-show-bofang'></span><span class='opt-show-shoucang'></span><span class='opt-show-fenxiang'></span><span class='opt-show-xiazai'></span></div></td><td class='td4'><div class='td4-divtext'><span class='td4-spantext'><a href='javascript:;' class='td4-spantext-a'></a></span></div></td></tr> "
                td1nums[i].innerHTML= i+1;
                
                

                // td2img[i].src = value.data.songs[i].al.picUrl;
                td2spantexta[i].innerText = value.data.songs[i].name;

                let hourtranttime = value.data.songs[i].dt;
                let hourtrantnum = hourtrantfun(hourtranttime);
                td3hour[i].innerText = hourtrantnum;

                td4spantexta[i].innerText = value.data.songs[i].ar[0].name;
            }
        });


}