//获取黑色顶栏上搜索框的放大镜搜索键
const searchInInput_blackHead = document.getElementById('searchInInput_blackHead');
//获取黑色顶栏上搜索框input
//因为在黑色顶栏.js获取过了，就不获取了
//const inputInInput_blackHead = document.getElementById('inputInInput_blackHead');
//缓存搜索框input里的内容
//因为在黑色顶栏.js获取过了，就不获取了
//var text = null;
//获取黑色顶栏上搜索框 推荐里的搜索
//因为在黑色顶栏.js获取过了，就不获取了
//const beginSearch_blackHead = document.getElementById('beginSearch_blackHead');

//获取包括搜索界面整体的div，用于显示和隐藏搜索
const searchInterface_search = document.getElementById('searchInterface_search');
//获取搜索界面里的搜索框上的搜索键
const searchKey_search = document.getElementById('searchKey_search');
//获取搜索界面input
const inSearchBox_search = document.getElementById('inSearchBox_search');
//获取搜索界面里搜索框的内容
var textSeach_search = null;

//获取列表前“搜索“咖喱乌冬”，找到 8 首单曲”这句话的几个操作p
const inSongsCount_search = document.getElementsByClassName('inSongsCount_search');

//获取搜索界面列表li
const inSongList_search = document.getElementsByClassName('inSongList_search');


//获取包括搜索界面页面选择器全部的div
const pageNumber_search = document.getElementById('pageNumber_search');
//获取搜索界面页面选择器的上一页
const previousPageNumber_search = document.getElementById('previousPageNumber_search');
//获取搜索界面页面选择器的下一页
const nextPageNumber_search = document.getElementById('nextPageNumber_search');
//获取包括所有页数a的div
const number_search = document.getElementById('number_search');
//获取选页的页数
var inNumber_search = document.getElementsByClassName('inNumber_search');
//用于记录上一个页(目前所属的页)
var oldPage = null;
//记录当前页数
var Pages_search = null;//实际记录的值是 页码数-1
//记录全部页数
var allPagesNumber = null;



//下面是歌曲列表
//在这里显示歌曲名字
const songName_search = document.getElementsByClassName('songName_search');
//这里显示歌手
const songAuthor_search = document.getElementsByClassName('songAuthor_search');
//这里显示所属专辑
const playList_search = document.getElementsByClassName('playList_search');
//这里显示歌曲时长
const songTime_search = document.getElementsByClassName('songTime_search');



//缓存当前搜索到的所有歌曲
var allSong_search = null;

//隐藏why界面
var all_why_why=document.getElementById('all_why_why');

//这个函数在按搜索键时运行
var firstSearchSong = function () {
    all_why_why.style.display = 'none';
    //获取搜索框输入内容
    text = inputInInput_blackHead.value;
    textSeach_search = inSearchBox_search.value;
    if (text != '' || textSeach_search != '') {
        if (text == '') {
            text = textSeach_search;
        }
        timestamp = new Date().getTime();
        if (NowLogInAndComeIn_blackHead == false) {
            axios({
                method: 'post',
                url: '/cloudsearch',
                params: {
                    keywords: text,
                    limit: 20,
                    type: 1,
                    offset: 0,
                    time: timestamp
                }
            }).then((response) => {
                let allSongsNumber = response.data.result.songCount;//获取全部歌曲数量
                let songsNumber = response.data.result.songs.length;//获取当页歌曲数量
                searchInterface_search.style.display = 'block';//使搜索界面显示出来
                findMusic_blackHead[0].classList.add('butNotByChange');
                //本来向用这个东西保留历史记录，但没保留成功
                //输入进去的当前信息也不知道哪去了
                //返回上一页是能点，但没反应
                //改了url还会导致一旦点刷新页面就会丢失原来页面的路径
                // history.pushState({
                //     keywords: text,
                //     limit: 20,
                //     type: 1,
                //     offset: 0,
                //     time: timestamp
                // }, '搜索=' + text, '/cloudsearch?keywords=' + text);
                oldPage = 0;
                for (let i = 0; i < 20; i++) {
                    inSongList_search[i].style.display = 'none';
                }

                inSongsCount_search[0].innerHTML = '搜索“' + text + '”，找到 ';
                inSongsCount_search[1].innerHTML = allSongsNumber; 4
                inSongsCount_search[2].innerHTML = " 首单曲";

                if (songsNumber > 0) {
                    Pages_search = 0;
                    for (let i = 0; i < songsNumber; i++) {
                        inSongList_search[i].style.display = 'block';
                    }
                    //只有总歌曲数量大于20时选页显示出来才有意义
                    if (allSongsNumber >= 20) {
                        pageNumber_search.style.display = 'block';
                        allPagesNumber = parseInt(allSongsNumber / 20, 10);//算总页数-1
                        let allNewA = '<a href="#blackHead" class="inNumber_search" onclick="pageChange_search(' + 0 + ',' + allPagesNumber + ')">' + 1 + '</a>';
                        for (let i = 0; i < allPagesNumber; i++) {
                            let j = i + 2;
                            let x = i + 1;
                            allNewA += '<a href="#blackHead" class="inNumber_search" onclick="pageChange_search(' + x + ',' + allPagesNumber + ')">' + j + '</a>'
                        }
                        number_search.innerHTML = allNewA;
                        inNumber_search = document.getElementsByClassName('inNumber_search');
                    }
                    else {
                        pageNumber_search.style.display = 'none';
                    }

                    switch (allPagesNumber) {
                        case 0:
                        case 1:
                        case 2:
                        case 3:
                        case 4:
                        case 5:
                        case 6:
                            number_search.style.width = (26 * (allPagesNumber + 1) + 10 * (allPagesNumber)) + 'px';
                            break;
                        default:
                            number_search.style.width = (26 * 7 + 60) + 'px';
                            for (let i = 6; i < allPagesNumber; i++) {
                                inNumber_search[i].style.display = 'none';
                            }
                            break;
                    }

                    inSearchBox_search.value = text;
                    allSong_search = response.data;
                    pageStyleSetting(0, allPagesNumber);
                    for (let i = 0; i < allSong_search.result.songs.length; i++) {
                        //曲名写入歌曲列表
                        songName_search[i].innerHTML = allSong_search.result.songs[i].name;
                        //作者写入歌曲列表
                        songAuthor_search[i].innerHTML = allSong_search.result.songs[i].ar[0].name;
                        //所属专辑写入歌曲列表
                        playList_search[i].innerHTML = '《 ' + allSong_search.result.songs[i].al.name + ' 》';
                        let songLong = allSong_search.result.songs[i].dt;//获取歌曲时常（毫秒）
                        let songLongM, songLongS;//用于记录歌曲的分钟数和秒数
                        songLong = songLong / 1000;
                        songLongM = songLong / 60;//计算歌曲分钟数
                        songLongM = parseInt(songLongM, 10);//取整
                        songLongS = songLong % 60;//计算歌曲秒数
                        songLongS = parseInt(songLongS, 10);//取整
                        songTime_search[i].innerHTML = songLongM + ':' + songLongS;
                    }
                }
            })
        } else if (NowLogInAndComeIn_blackHead == true) {
            axios({
                method: 'post',
                url: '/cloudsearch',
                params: {
                    keywords: text,
                    limit: 20,
                    type: 1,
                    offset: 0,
                    cookie: cookie,
                    time: timestamp
                }
            }).then((response) => {
                let allSongsNumber = response.data.result.songCount;//获取全部歌曲数量
                let songsNumber = response.data.result.songs.length;//获取当页歌曲数量
                searchInterface_search.style.display = 'block';//使搜索界面显示出来
                findMusic_blackHead[0].classList.add('butNotByChange');
                //本来向用这个东西保留历史记录，但没保留成功
                //输入进去的当前信息也不知道哪去了
                //返回上一页是能点，但没反应
                //改了url还会导致一旦点刷新页面就会丢失原来页面的路径
                // history.pushState({
                //     keywords: text,
                //     limit: 20,
                //     type: 1,
                //     offset: 0,
                //     time: timestamp
                // }, '搜索=' + text, '/cloudsearch?keywords=' + text);
                oldPage = 0;
                for (let i = 0; i < 20; i++) {
                    inSongList_search[i].style.display = 'none';
                }

                inSongsCount_search[0].innerHTML = '搜索“' + text + '”，找到 ';
                inSongsCount_search[1].innerHTML = allSongsNumber; 4
                inSongsCount_search[2].innerHTML = " 首单曲";

                if (songsNumber > 0) {
                    Pages_search = 0;
                    for (let i = 0; i < songsNumber; i++) {
                        inSongList_search[i].style.display = 'block';
                    }
                    //只有总歌曲数量大于20时选页显示出来才有意义
                    if (allSongsNumber >= 20) {
                        pageNumber_search.style.display = 'block';
                        allPagesNumber = parseInt(allSongsNumber / 20, 10);//算总页数-1
                        let allNewA = '<a href="#blackHead" class="inNumber_search" onclick="pageChange_search(' + 0 + ',' + allPagesNumber + ')">' + 1 + '</a>';
                        for (let i = 0; i < allPagesNumber; i++) {
                            let j = i + 2;
                            let x = i + 1;
                            allNewA += '<a href="#blackHead" class="inNumber_search" onclick="pageChange_search(' + x + ',' + allPagesNumber + ')">' + j + '</a>'
                        }
                        number_search.innerHTML = allNewA;
                        inNumber_search = document.getElementsByClassName('inNumber_search');
                    }
                    else {
                        pageNumber_search.style.display = 'none';
                    }

                    switch (allPagesNumber) {
                        case 0:
                        case 1:
                        case 2:
                        case 3:
                        case 4:
                        case 5:
                        case 6:
                            number_search.style.width = (26 * (allPagesNumber + 1) + 10 * (allPagesNumber)) + 'px';
                            break;
                        default:
                            number_search.style.width = (26 * 7 + 60) + 'px';
                            for (let i = 6; i < allPagesNumber; i++) {
                                inNumber_search[i].style.display = 'none';
                            }
                            break;
                    }

                    inSearchBox_search.value = text;
                    allSong_search = response.data;
                    pageStyleSetting(0, allPagesNumber);
                    for (let i = 0; i < allSong_search.result.songs.length; i++) {
                        //曲名写入歌曲列表
                        songName_search[i].innerHTML = allSong_search.result.songs[i].name;
                        //作者写入歌曲列表
                        songAuthor_search[i].innerHTML = allSong_search.result.songs[i].ar[0].name;
                        //所属专辑写入歌曲列表
                        playList_search[i].innerHTML = '《 ' + allSong_search.result.songs[i].al.name + ' 》';
                        let songLong = allSong_search.result.songs[i].dt;//获取歌曲时常（毫秒）
                        let songLongM, songLongS;//用于记录歌曲的分钟数和秒数
                        songLong = songLong / 1000;
                        songLongM = songLong / 60;//计算歌曲分钟数
                        songLongM = parseInt(songLongM, 10);//取整
                        songLongS = songLong % 60;//计算歌曲秒数
                        songLongS = parseInt(songLongS, 10);//取整
                        songTime_search[i].innerHTML = songLongM + ':' + songLongS;
                    }
                }
            })
        }
    }
}

searchInInput_blackHead.addEventListener('click', firstSearchSong.bind(this));
beginSearch_blackHead.addEventListener('click', firstSearchSong.bind(this));
searchKey_search.addEventListener('click', firstSearchSong.bind(this));
inSearchBox_search.addEventListener('keyup', (event) => {
    textSeach_search = inSearchBox_search.value;
    inputInInput_blackHead.value = '';
    textInInput_blackHead.style.top = '8px';
    if (event.keyCode == 13 && textSeach_search != '') {
        inSearchBox_search.blur();
        firstSearchSong();
    }
})

inputInInput_blackHead.addEventListener('keyup', (event) => {
    text = inputInInput_blackHead.value;
    inSearchBox_search.value = text;
    if (event.keyCode == 13 && text != '') {
        inputInInput_blackHead.blur();
        firstSearchSong();
    }
})


//这个函数用来更改换页时的样式
//输入 当前页码数-1 的值  总页数
var pageStyleSetting = function (newPage, allPagesNumber) {
    if (newPage == 0) {
        previousPageNumber_search.classList.add('stopLeftAndRightPage_search');
    } else {
        previousPageNumber_search.classList.remove('stopLeftAndRightPage_search');
    }
    if (newPage == allPagesNumber) {
        nextPageNumber_search.classList.add('stopLeftAndRightPage_search');
    } else {
        nextPageNumber_search.classList.remove('stopLeftAndRightPage_search');
    }

    inNumber_search[oldPage].classList.remove("PageButSelected_search");

    inNumber_search[newPage].classList.add("PageButSelected_search");
    if (allPagesNumber >= 7) {
        for (let i = 1; i < allPagesNumber; i++) {
            inNumber_search[i].style.display = 'none';
        }
        if (newPage > 3 && newPage < allPagesNumber - 2) {
            inNumber_search[0].style.display = 'block';
            inNumber_search[allPagesNumber].style.display = 'block';
            for (let i = newPage - 2; i < newPage + 3; i++) {
                inNumber_search[i].style.display = 'block';
            }
        } else if (newPage <= 3) {
            for (let i = 0; i < 6; i++) {
                inNumber_search[i].style.display = 'block';
            }
            inNumber_search[allPagesNumber].style.display = 'block';
        } else if (newPage >= allPagesNumber - 2) {
            for (let i = allPagesNumber; i > allPagesNumber - 6; i--) {
                inNumber_search[i].style.display = 'block';
            }
            inNumber_search[0].style.display = 'block';
        }
    }

    oldPage = newPage;
}

// inNumber_search[1].addEventListener('click', () => {
//     inNumber_search[oldPage].classList.remove("PageButSelected_search");
//     inNumber_search[1].classList.add("PageButSelected_search");
//     oldPage = 1;
// })


//由数字页面转换器调用的样式转换,传入现在的页数
var pageChange_search = function (pageINChange, allPagesNumber) {
    inNumber_search[oldPage].classList.remove("PageButSelected_search");
    inNumber_search[pageINChange].classList.add("PageButSelected_search");
    oldPage = pageINChange;
    musicChangeBypage(pageINChange, allPagesNumber);
}

//转换页面时的歌曲转换,传入现在的页数
var musicChangeBypage = function (pageINChange, allPagesNumber) {
    timestamp = new Date().getTime();
    if (NowLogInAndComeIn_blackHead == false) {
        axios({
            method: 'post',
            url: '/cloudsearch',
            params: {
                keywords: text,
                limit: 20,
                type: 1,
                offset: pageINChange * 20,
                time: timestamp
            }
        }).then((response) => {
            let allSongsNumber = response.data.result.songCount;//获取全部歌曲数量
            let songsNumber = response.data.result.songs.length;//获取当页歌曲数量
            for (let i = 0; i < 20; i++) {
                inSongList_search[i].style.display = 'none';
            }
            allSong_search = response.data;
            pageStyleSetting(pageINChange, allPagesNumber);
            for (let i = 0; i < allSong_search.result.songs.length; i++) {
                inSongList_search[i].style.display = 'block';
                //曲名写入歌曲列表
                songName_search[i].innerHTML = allSong_search.result.songs[i].name;
                //作者写入歌曲列表
                songAuthor_search[i].innerHTML = allSong_search.result.songs[i].ar[0].name;
                //所属专辑写入歌曲列表
                playList_search[i].innerHTML = '《 ' + allSong_search.result.songs[i].al.name + ' 》';
                let songLong = allSong_search.result.songs[i].dt;//获取歌曲时常（毫秒）
                let songLongM, songLongS;//用于记录歌曲的分钟数和秒数
                songLong = songLong / 1000;
                songLongM = songLong / 60;//计算歌曲分钟数
                songLongM = parseInt(songLongM, 10);//取整
                songLongS = songLong % 60;//计算歌曲秒数
                songLongS = parseInt(songLongS, 10);//取整
                songTime_search[i].innerHTML = songLongM + ':' + songLongS;
            }
        })
    } else if (NowLogInAndComeIn_blackHead == true) {
        axios({
            method: 'post',
            url: '/cloudsearch',
            params: {
                keywords: text,
                limit: 20,
                type: 1,
                offset: pageINChange * 20,
                cookie: cookie,
                time: timestamp
            }
        }).then((response) => {
            let allSongsNumber = response.data.result.songCount;//获取全部歌曲数量
            let songsNumber = response.data.result.songs.length;//获取当页歌曲数量
            for (let i = 0; i < 20; i++) {
                inSongList_search[i].style.display = 'none';
            }
            allSong_search = response.data;
            pageStyleSetting(pageINChange, allPagesNumber);
            for (let i = 0; i < allSong_search.result.songs.length; i++) {
                inSongList_search[i].style.display = 'block';
                //曲名写入歌曲列表
                songName_search[i].innerHTML = allSong_search.result.songs[i].name;
                //作者写入歌曲列表
                songAuthor_search[i].innerHTML = allSong_search.result.songs[i].ar[0].name;
                //所属专辑写入歌曲列表
                playList_search[i].innerHTML = '《 ' + allSong_search.result.songs[i].al.name + ' 》';
                let songLong = allSong_search.result.songs[i].dt;//获取歌曲时常（毫秒）
                let songLongM, songLongS;//用于记录歌曲的分钟数和秒数
                songLong = songLong / 1000;
                songLongM = songLong / 60;//计算歌曲分钟数
                songLongM = parseInt(songLongM, 10);//取整
                songLongS = songLong % 60;//计算歌曲秒数
                songLongS = parseInt(songLongS, 10);//取整
                songTime_search[i].innerHTML = songLongM + ':' + songLongS;
            }
        })
    }

}

//切换上一页
previousPageNumber_search.addEventListener('click', () => {
    if (oldPage != 0) {
        musicChangeBypage(oldPage - 1, allPagesNumber);
        pageStyleSetting(oldPage - 1, allPagesNumber);
    } else if (oldPage == 0) {
        alert('当前已经是第一页');
    }
})
//切换下一页
nextPageNumber_search.addEventListener('click', () => {
    if (oldPage != allPagesNumber) {
        musicChangeBypage(oldPage + 1, allPagesNumber);
        pageStyleSetting(oldPage + 1, allPagesNumber);
    } else if (oldPage == allPagesNumber) {
        alert('当前已经是最后一页');
    }
})



