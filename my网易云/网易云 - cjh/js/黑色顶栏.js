//获取body
const body_blackHead = document.body;

// 搜索框
//获取logo
const logoLi_blackHead = document.getElementById('logoLi_blackHead');
//获取黑的顶栏上的几个按钮 发现音乐 我的音乐 关注 商城 音乐人 下载客户端
const findMusic_blackHead = document.querySelectorAll('#inWidthLimitBlackHeadUl_blackHead li');
axios.defaults.baseURL = 'http://1.13.2.68:3000';
var inputInInput_blackHead = document.getElementById('inputInInput_blackHead');
var textInInput_blackHead = document.getElementById('textInInput_blackHead');
var recommendInInput_blackHead = document.getElementById('recommendInInput_blackHead');
var beginSearch_blackHead = document.getElementById('beginSearch_blackHead');
var inSongsInSearch_blackHead = document.getElementsByClassName('inSongsInSearch_blackHead');
var theSong1 = document.getElementsByClassName('theSong1');
var theSong2 = document.getElementsByClassName('theSong2');
var theSong3 = document.getElementsByClassName('theSong3');
var text = null;
var timeOut = null;
var Click = null;//判断推荐栏是否被点击
var timestamp = null;//用于存放时间戳
inputInInput_blackHead.addEventListener('focus', () => {
    Click = true;
    setTimeout(() => {
        Click = false;
    }, 120)
    text = inputInInput_blackHead.value;
    textInInput_blackHead.style.top = '-15px';
    if (text != '') {
        recommendInInput_blackHead.style.display = 'block';
    }
})
document.addEventListener('click', () => {
    let timer = setTimeout(() => {
        if (Click != true) {
            recommendInInput_blackHead.style.display = 'none';
            if (text === '') {
                textInInput_blackHead.style.top = '8px';
            }
            else {

            }
        }
    }, 100)
    if (Click == true) {
        clearTimeout(timer);
    }
})
recommendInInput_blackHead.addEventListener('click', () => {
    Click = true;
    setTimeout(() => {
        Click = false;
    }, 120)
})

inputInInput_blackHead.addEventListener('blur', () => {
    text = inputInInput_blackHead.value;
    let timer = setTimeout(() => {
        if (Click != true) {
            recommendInInput_blackHead.style.display = 'none';
            if (text === '') {
                textInInput_blackHead.style.top = '8px';
            }
            else {

            }
        }
    }, 100)
    if (Click == true) {
        clearTimeout(timer);
    }
})

inputInInput_blackHead.addEventListener('keyup', (event) => {
    clearTimeout(timeOut)
    let Key = event.keyCode;
    text = inputInInput_blackHead.value;
    if (text != '' && Key === 13) {
        //console.log("回车");
        recommendInInput_blackHead.style.display = 'none';
    }
    else if (text == '') {
        recommendInInput_blackHead.style.display = 'none';
        //console.log('空');
    }
    else if (text != '' && Key != 13) {
        recommendInInput_blackHead.style.display = 'block';
        text = inputInInput_blackHead.value;
        timeOut = setTimeout(function () {
            timestamp = new Date().getTime();
            axios({
                method: 'post',
                url: '/cloudsearch',
                params: {
                    keywords: text,
                    limit: 4,
                    type: 1,
                    time: timestamp
                }
            }).then((response) => {
                for (let i = 0; i < 4; i++) {
                    let text1 = '', textBlue = '', text3 = '';
                    let result = null;
                    let songName = response.data.result.songs[i].name;
                    let long = text.length;
                    let songLong = songName.length;
                    let songID = response.data.result.songs[i].id;
                    result = songName.indexOf(text);
                    if (result == -1) {
                        text1 = songName;
                    }
                    else {
                        if (result == 0) {
                            textBlue = songName.slice(result, result + long);
                            text3 = songName.slice(result + long, songLong);
                        }
                        else {
                            text1 = songName.slice(0, result);
                            textBlue = songName.slice(result, result + long);
                            text3 = songName.slice(result + long, songLong);
                        }
                    }
                    theSong1[i].innerHTML = text1;
                    theSong2[i].innerHTML = textBlue;
                    theSong3[i].innerHTML = text3;
                    inSongsInSearch_blackHead[i].addEventListener('click', () => {
                        window.location.href = "https://music.163.com/#/song?id=" + songID;
                        inputInInput_blackHead.value = '';
                    })
                }
            }).catch(error => {
                console.log(error);
            })
            beginSearch_blackHead.innerHTML = '搜索 “ ' + text + ' ” 相关歌曲 >';
        }, 500);
    }
})

//用于当logo或发现音乐被点击时修改发现音乐的显示样式
var btnIn_blackHead = function () {
    findMusic_blackHead[0].classList.remove('butNotByChange');
    searchInterface_search.style.display = 'none';//使搜索界面消失
    all_why_why.style.display = 'block';
}
logoLi_blackHead.addEventListener('click', btnIn_blackHead.bind(this));
findMusic_blackHead[0].addEventListener('click', btnIn_blackHead.bind(this));




//下面写登录效果
//获取整个登录界面的div
const toLogin_login = document.getElementById('toLogin_login');
//获取输入电话号的input
const phoneNumber_login = document.getElementById('phoneNumber_login');
var focusOfPhone = false;//用于判断电话输入input是否获取焦点
var phoneNumbers_login = '';//用于缓存电话号
//获取输入验证码的input
const captchaNumber_login = document.getElementById('captchaNumber_login');
var focusOfCaptcha = false;//用于判断验证码输入input是否获取焦点
var captchaNumbers_login = '';//用于缓存验证码
//获取‘请输入手机号’和‘请输入验证码’的span
const spanInPhoneCaptcha_login = document.getElementsByClassName('spanInPhoneCaptcha_login');
//获取获取验证码的按钮div
const verificationCode_login = document.getElementById('verificationCode_login');
var verificationCode_CanClick_login = false;//记录这个按钮是否可以点击
//获取登录按钮的div
const ClickMeToSign_login = document.getElementById('ClickMeToSign_login');
var ClickMeToSign_CanClick_login = false;//记录这个按钮是否可以点击

//点这个启动二维码登录
const to_QR_code_login = document.getElementById('to_QR_code_login');
//二维码窗口
const QR_code_login = document.getElementById('QR_code_login');
//放二维码的img,这个还用来刷新二维码
const haveQR_codePhoto_login = document.getElementById('haveQR_codePhoto_login');


var userCookies_login = null;//用于保存用户登录完成后返回的数据

//这是一些获取黑色顶栏的一些登录相关的按钮
//获取按钮“登录”
const noLogin_blackHead = document.getElementById('noLogin_blackHead');
//获取登录后显示的那几个如头像之类的
const yesLogin_blackHead = document.getElementById('yesLogin_blackHead');
//获取放头像的img
const userHead_blackHead = document.getElementById('userHead_blackHead');
//退出登录的按钮
const signOut_blackHead = document.getElementById('signOut_blackHead');
//保存登录状态
var NowLogInAndComeIn_blackHead = false;

//黑色顶栏上登录按钮被点击
noLogin_blackHead.addEventListener('click', () => {
    toLogin_login.style.display = 'block';
})

//由于不能用手机号登录，这里设置手机号和验证码登录失焦
phoneNumber_login.addEventListener('click', () => {
    alert('请使用二维码登录');
    phoneNumber_login.blur();
    focusOfPhone = false;
})
captchaNumber_login.addEventListener('click', () => {
    alert('请使用二维码登录');
    captchaNumber_login.blur();
    focusOfCaptcha = false;
})



//电话输入input获取焦点
phoneNumber_login.addEventListener('focus', () => {
    focusOfPhone = true;
})
//电话输入input失去焦点
phoneNumber_login.addEventListener('blur', () => {
    focusOfPhone = false;
})
//电话输入input获取焦点时的键盘检测
phoneNumber_login.addEventListener('keyup', () => {
    phoneNumbers_login = phoneNumber_login.value;
    if (phoneNumbers_login == '') {
        spanInPhoneCaptcha_login[0].style.display = 'block';
        verificationCode_login.classList.remove('okYouCanClickThis_login');
        verificationCode_CanClick_login = false;
    } else {
        spanInPhoneCaptcha_login[0].style.display = 'none';
        if (parseInt(phoneNumbers_login) > 10000000000 && parseInt(phoneNumbers_login) < 20000000000) {
            verificationCode_login.classList.add('okYouCanClickThis_login');
            verificationCode_CanClick_login = true;
        } else {
            verificationCode_login.classList.remove('okYouCanClickThis_login');
            verificationCode_CanClick_login = false;
        }
    }
})

//当获取验证码的按钮div可点时点击的反应
verificationCode_login.addEventListener('click', () => {
    if (verificationCode_CanClick_login == false) {
        if (phoneNumbers_login == '') {
            alert('虽然我想说手机号不能为空\n但实际上是手机号登陆不可用，请使用二维码登录');
        } else {
            alert('虽然我想说手机号输入有误\n但实际上是手机号登陆不可用，请使用二维码登录');
        }
        return 0;
    }
    phoneNumbers_login = parseInt(phoneNumbers_login);
    timestamp = new Date().getTime();
    axios({
        method: 'post',
        url: '/captcha/sent',
        params: {
            phone: phoneNumbers_login,
            time: timestamp
        }
    }).then((response) => {
        verificationCode_login.innerHTML = '验证码已发送';
    })
})

//验证码输入input获取焦点
captchaNumber_login.addEventListener('focus', () => {
    focusOfCaptcha = true;
})
//验证码输入input失去焦点
captchaNumber_login.addEventListener('blur', () => {
    focusOfCaptcha = false;
})
//验证码输入input获取焦点时的键盘检测
captchaNumber_login.addEventListener('keyup', () => {
    captchaNumbers_login = captchaNumber_login.value;//用于获取验证码
    if (captchaNumbers_login == '') {
        spanInPhoneCaptcha_login[1].style.display = 'block';
        ClickMeToSign_login.classList.remove('okYouCanClickThis_login');
        ClickMeToSign_CanClick_login = false;
    } else {
        spanInPhoneCaptcha_login[1].style.display = 'none';
        if (parseInt(captchaNumbers_login) >= 1000 && parseInt(captchaNumbers_login) < 10000 && verificationCode_CanClick_login == true) {
            ClickMeToSign_login.classList.add('okYouCanClickThis_login');
            ClickMeToSign_CanClick_login = true;
        } else {
            ClickMeToSign_login.classList.remove('okYouCanClickThis_login');
            ClickMeToSign_CanClick_login = false;
        }
    }
})

const codeMessage = {
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '验证码错误。',
    504: '网关超时。',
};
//这个时登录按钮被点击
ClickMeToSign_login.addEventListener('click', () => {
    if (ClickMeToSign_CanClick_login == false) {
        if (phoneNumbers_login == '') {
            alert('虽然我想说手机号不能为空\n但实际上是手机号登陆不可用，请使用二维码登录');
        } else if (captchaNumbers_login == '') {
            alert('虽然我想说验证码不能为空\n但实际上是手机号登陆不可用，请使用二维码登录');
        } else {
            alert('输入有误');
        }
        return 0;
    }
    timestamp = new Date().getTime();
    axios({
        method: 'post',
        url: '/captcha/verify',
        params: {
            phone: phoneNumbers_login,
            captcha: captchaNumbers_login,
            time: timestamp
        }
    }).then((response) => {
        userCookies_login = response.data;
        noLogin_blackHead.style.display = 'none';
        yesLogin_blackHead.style.display = 'block';
        closeLogin_login();
        axios({
            method: 'post',
            url: '/user/account',
            params: {
                time: timestamp
            }
        }).then((response2) => {
            console.log(response2.data);
        })
    }).catch((errorData) => {
        alert(codeMessage[errorData.response.data.code]);
    })
})


var timer_QR_code_login = null;//用于全局存放这个计时器
var keyNumber = 0;//保存key值
var qrimgNumber = 0;//保存qrimg值
var cookie = null;//保存cookie
//包括获取二维码，确认是否登录等的函数
var about_QR_code_login = function () {
    timestamp = new Date().getTime();
    axios({
        method: 'post',
        url: '/login/qr/key',
        params: {
            time: timestamp
        }
    }).then((response) => {
        console.log(response);
        keyNumber = response.data.data.unikey;
        axios({
            method: 'post',
            url: '/login/qr/create',
            params: {
                key: keyNumber,
                qrimg: 1,
                time: timestamp
            }
        }).then((response) => {
            qrimgNumber = response.data.data.qrimg;
            haveQR_codePhoto_login.src = qrimgNumber;
            timer_QR_code_login = setInterval(() => {
                timestamp = new Date().getTime();
                axios({
                    method: 'post',
                    url: '/login/qr/check',
                    params: {
                        key: keyNumber,
                        time: timestamp
                    }
                }).then((response2) => {
                    console.log(response2.data);
                    if (response2.data.code == 803) {
                        cookie = response2.data.cookie;
                        closeLogin_login();
                        axios({
                            method: 'post',
                            url: '/user/account',
                            params: {
                                cookie: cookie,
                                time: timestamp
                            }
                        }).then((response3) => {
                            console.log(response3.data);
                            userHead_blackHead.src = response3.data.profile.avatarUrl;
                            noLogin_blackHead.style.display = 'none';
                            yesLogin_blackHead.style.display = 'block';
                            NowLogInAndComeIn_blackHead = true;
                        })
                    }
                })
            }, 1000)
        })
    })
}

//当这个“二维码登录”被点击时
to_QR_code_login.addEventListener('click', () => {
    QR_code_login.style.display = 'block';
    about_QR_code_login();
})

//当二维码刷新被点击
haveQR_codePhoto_login.addEventListener('click', () => {
    clearInterval(timer_QR_code_login);
    timer_QR_code_login = null;
    about_QR_code_login();
})



//登录界面被关闭
var closeLogin_login = function () {
    toLogin_login.style.display = 'none';
    focusOfPhone = false;
    focusOfCaptcha = false;
    phoneNumber_login.value = '';
    captchaNumber_login.value = '';
    verificationCode_login.innerHTML = '获取验证码';
    spanInPhoneCaptcha_login[0].style.display = 'block';
    spanInPhoneCaptcha_login[1].style.display = 'block';
    verificationCode_login.classList.remove('okYouCanClickThis_login');
    ClickMeToSign_login.classList.remove('okYouCanClickThis_login');
    QR_code_login.style.display = 'none';
    if (timer_QR_code_login != null) {
        clearInterval(timer_QR_code_login);
        timer_QR_code_login = null;
    }
}

//退出登录被点击
signOut_blackHead.addEventListener('click', () => {
    timestamp = new Date().getTime();
    axios({
        method: 'post',
        url: '/logout',
        params: {
            time: timestamp
        }
    }).then((response) => {
        userHead_blackHead.src = '';
        noLogin_blackHead.style.display = 'block';
        yesLogin_blackHead.style.display = 'none';
        NowLogInAndComeIn_blackHead = false;
        cookie = null;
    })

})


