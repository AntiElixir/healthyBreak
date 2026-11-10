var count = 0;
var winWidth = 1440;
var winHeight = 860;
var light = true;
var duckwidth = 15;
//提醒周期，单位秒
var cycleSeconds = 25 * 60;

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    winWidth = request.winWidth;
    winHeight = request.winHeight;
    sendResponse('');
});

function duckbecomeslim() {
    duckwidth = duckwidth - 4;
}

function duckbecomefat() {
    duckwidth = duckwidth + 2;
}

function smallduck() {
    duckwidth = duckwidth - 2;
}

function getduckwidth() {
    return duckwidth;
}

function checklight() {
    return light
}

function turnlight() {
    light = !light;
}
//计时器，在后台默默计时，返回本周期完成的百分比给 popup 画进度
function timer() {
    //黑夜停止计时
    if (!light) {
        return progress();
    }
    count++;
    //每到周期整数倍都提醒一次，点“等会儿”或者没理它，下个周期还会再弹
    if (count % cycleSeconds == 0) {
        duckbecomeslim();
        notificationAction();
    }
    if (count >= cycleSeconds) {
        //超时了，图标改成红色和sos文案！
        chrome.browserAction.setBadgeText({
            text: 'sos'
        });
        chrome.browserAction.setBadgeBackgroundColor({
            color: [255, 0, 0, 255]
        });
    } else {
        //给浏览器右上角图标加上计时badge
        chrome.browserAction.setBadgeText({
            text: Math.floor(count / 60) + ''
        });
        chrome.browserAction.setBadgeBackgroundColor({
            color: "#70d2c9"
        });
    }
    return progress();
}

function progress() {
    return Math.min(count * 100 / cycleSeconds, 100);
}

function refresh() {
    count = 0;
}

function notificationAction() {
    //notification的id要清空，否则create的时候之前id没有清空则会失效
    chrome.notifications.clear("1",
        (id) => {

        });
    chrome.notifications.create("1", {
        type: 'basic',
        iconUrl: 'img/logo.png',
        title: '小鸭子累死了！休息一下',
        buttons: [{
            title: "休息",
            iconUrl: 'img/yellowsmile.png'
        }, {
            title: "等会儿",
            iconUrl: 'img/redsmile.png'
        }],
        message: '25分钟啦！起身动一动：\n💧喝一口水  🙆伸个懒腰  🚶起身走走\n👀眺望远处  🔄转转眼球'
    });
}

chrome.notifications.onButtonClicked.addListener(function (id, btnIndex) {
    count = btnIndex ? count : 0;
});

function getWandH() {
    var WandH = {
        winWidth: winWidth,
        winHeight: winHeight
    }
    return WandH
}

setInterval(timer, 1000);