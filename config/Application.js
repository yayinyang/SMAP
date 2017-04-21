/**
 * Created by liwanchong on 2016/12/16.
 */
var App = {};
// web app全局配置信息
App.Config = {
    serviceUrl: 'http://fs.navinfo.com/smapapi',
};
App.Temp = {
    accessToken: 'HeHQ4X-sxhhsRyHiSaORnQ',
};

App.Util = {
    getFullUrl: function (url) {
        return App.Config.serviceUrl + '/' + url + '?ak=' + (App.Temp.accessToken || '');
    },
};