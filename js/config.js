/**
 * healthyBreak 配置入口 —— 想改提醒时间和通知内容，只改这个文件就够了。
 *
 * 改完之后：打开 edge://extensions（或 chrome://extensions），
 * 点这个插件卡片上的「刷新」按钮重新加载，新配置才会生效。
 */
var HB_CONFIG = {

    // ========== 通知时间 ==========

    // 每隔多少分钟提醒一次休息。
    // 可以填小数，比如 0.5 = 30 秒（想快速看一眼通知效果时有用）。
    intervalMinutes: 25,

    // ========== 系统通知（Windows 右下角 toast）内容 ==========

    toast: {
        // 通知第一行加粗的标题
        title: '小鸭子累死了！休息一下',

        // 通知正文，\n 表示换行
        message: '25分钟啦！起身动一动：\n💧喝一口水  🙆伸个懒腰  🚶起身走走\n👀眺望远处  🔄转转眼球',

        // 通知左侧的小图标，路径相对插件根目录
        iconUrl: 'img/logo.png'
    },

    // 通知下面的按钮，系统最多显示 2 个。
    // resetTimer 为 true 表示「点这个按钮会重新开始计时」，
    // 为 false 表示只是把通知关掉，计时继续往下走（下个周期还会再弹）。
    buttons: [
        { title: '休息', iconUrl: 'img/yellowsmile.png', resetTimer: true },
        { title: '等会儿', iconUrl: 'img/redsmile.png', resetTimer: false }
    ],

    // ========== 浏览器右上角图标角标 ==========

    badge: {
        // 正常计时时角标的颜色，'#70d2c9' 或 [112, 210, 201, 255] 两种写法都可以
        runningColor: '#70d2c9',

        // 超过提醒时间还没休息时，角标显示的文字和颜色
        overtimeText: 'sos',
        overtimeColor: [255, 0, 0, 255]
    }
};
