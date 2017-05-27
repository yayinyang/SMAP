/**
 * Created by liwanchong on 2016/12/16.
 */
var App = {};
// web app全局配置信息
App.Config = {
    serviceUrl: 'http://fs.navinfo.com/smapapi',
    appRoot:'/SMAP',
    loginServiceUrl:'http://fs.navinfo.com/smap/sync/user/',
    testloginServiceUrl:'http://172.21.4.92/smap/sync/user/',

    tokenCheckServiceUrl:'http://fs.navinfo.com/smap/sync/user/',
    testtokenCheckServiceUrl:'http://172.21.4.92/smap/sync/user/'
};
App.Temp = {
    accessToken: 'HeHQ4X-sxhhsRyHiSaORnQ'
};

App.Util = {
    getFullUrl: function (url) {
        return App.Config.serviceUrl + '/' + url + '?ak=' + (App.Temp.accessToken || '');
    },
};
App.user = {
    isCorrect : false,
    token:""
};