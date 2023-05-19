window.onload = function () {
    axios.defaults.baseURL = 'http://1.13.2.68:3000';
    var mohu_wrapper = document.getElementById('mohu_wrapper');
    var img_List = document.getElementById('img_List');
    var lunbo = document.getElementById('lunbo');
    //获取img
    var imgs = lunbo.getElementsByTagName('img');
    var img_blur = mohu_wrapper.getElementsByTagName('img');
    var left_button = document.getElementsByClassName('fa-angle-left')[0];
    var right_button = document.getElementsByClassName('fa-angle-right')[0];
    var points = points_why.getElementsByTagName('a');
    var index = 0;
    var hot_pic_wrapper = document.getElementById('hot_pic_wrapper');
    var imgs_hot = hot_pic_wrapper.getElementsByTagName('img');
    var spans_hot = hot_pic_wrapper.getElementsByTagName('span');
    var lis_why = hot_pic_wrapper.getElementsByTagName('li');
    var play_why = document.querySelectorAll('#play_why');
    var video_why = document.getElementsByTagName('video');
    var album_wrapper = document.getElementById('album_wrapper');
    var album_imgs = album_wrapper.getElementsByTagName('img');
    var left_button_album = document.getElementById('left_button_album');
    var first_album = document.getElementById('first_album');
    var second_album = document.getElementById('second_album');
    var spans_album = album_wrapper.getElementsByTagName('span');
    var list_wrapper = document.getElementById('list_wrapper');
    var list_wrapper_img = list_wrapper.getElementsByTagName('img');
    var songs_why_1=document.getElementById('songs_why_1');
    var spans_songs_1=songs_why_1.getElementsByTagName('span');
    var songs_why_2=document.getElementById('songs_why_2');
    var spans_songs_2=songs_why_2.getElementsByTagName('span');
    var songs_why_3=document.getElementById('songs_why_3');
    var spans_songs_3=songs_why_3.getElementsByTagName('span');
    //获取轮播图的图片
    axios.get('/banner', {
        type: 0,
    }).then((value) => {
        length = value.data.banners.length;
        for (let i = 0; i < value.data.banners.length; i++) {
            imgs[i].src = value.data.banners[i].imageUrl;
            img_blur[i].src = value.data.banners[i].imageUrl;
        }
    }
    )
    //获取热门推荐的图片 
    axios.get('/top/playlist', {
    }).then(function (value) {
        for (let i = 0; i < 8; i++) {
            imgs_hot[i].src = value.data.playlists[i].coverImgUrl;
            spans_hot[i].innerHTML = value.data.playlists[i].name;
            lis_why[i].innerHTML = value.data.playlists[i].playCount;
        }
    })
    //新碟上架
    axios.post('/album/new', {
        limit: 10,
        offset: 1
    }).then(function (value) {
        for (let i = 0; i < 10; i++) {
            album_imgs[i].src = value.data.albums[i].blurPicUrl;
            spans_album[i].innerHTML = value.data.albums[i].name;
        }
    })
    //获取榜单
    axios.post('/toplist', {
    }).then(function (value) {
        for (let i = 0; i < 3; i++) {
            list_wrapper_img[i].src = value.data.list[i].coverImgUrl;
        }
    })

    axios.post('/playlist/track/all', {
        id:19723756,
    }).then(function (value) {
        console.log(value)
        for(let i=0;i<10;i++)
        {
            spans_songs_1[i].innerHTML+=value.data.songs[i].name;
        }
        for(let i=10;i<20;i++)
        {
            spans_songs_2[i-10].innerHTML+=value.data.songs[i].name;
        }
        for(let i=20;i<30;i++)
        {
            spans_songs_3[i-20].innerHTML+=value.data.songs[i].name;
        }
    })

    function clear_op() {
        for (let i = 0; i < 8; i++) {
            imgs[i].style.opacity = '0';
            img_blur[i].style.opacity = '0';
        }
        imgs[index].style.opacity = '1';
        img_blur[index].style.opacity = '1';
    }
    function judge() {
        for (var i = 0; i < 8; i++) {
            points[i].style.backgroundColor = 'gray';
            if (index == i)
                points[i].style.backgroundColor = 'red';
        }
    }


    var timer = setInterval(() => {
        index = (++index > 7) ? 0 : index;
        clear_op();
        judge();
    }, 4000);

    left_button.onclick = function () {
        index = (--index < 0) ? 7 : index;
        clear_op();
        judge();
    }
    right_button.onclick = function () {
        index = (++index > 7) ? 0 : index;
        clear_op();
        judge();
    }
    img_List.onmousemove = function () {
        clearInterval(timer);
    }
    img_List.onmouseout = function () {
        timer = setInterval(() => {
            index = (++index > 7) ? 0 : index;
            clear_op();
            judge();
        }, 4000);
    }
    left_button_album.onclick = function () {
        first_left = parseInt(getComputedStyle(first_album, null)['left']);
        if (first_left == -700) {
            first_album.style.left = '0px';
            second_album.style.left = '-700px'
        }
        if (first_left == 0) {
            first_album.style.left = '-700px';
            second_album.style.left = '0px';
        }
        if (first_left == 700) {
            first_album.style.left = '-700px';
            second_album.style.left = '0px';
        }
    }
    for (let i = 0; i < 8; i++) {
        points[i].onclick = function () {
            index = i;
            clear_op();
            points[i].style.backgroundColor = 'red';
            judge();
        }
    }
}
