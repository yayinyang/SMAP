/**
 * Created by liwanchong on 2016/12/16.
 */
var App = {};

App.dev = {
    host: '172.21.4.66'
};

// web app全局配置信息
App.Config = {
    serviceUrl: 'http://fs.navinfo.com/smapapi',
    appRoot: '/SMAP',
    loginServiceUrl: 'http://fs.navinfo.com/smap/sync/user/',
    tokenCheckServiceUrl: 'http://fs.navinfo.com/smap/sync/user/',

    testloginServiceUrl: 'http://' + App.dev.host + '/smap/sync/user/',
    testtokenCheckServiceUrl: 'http://' + App.dev.host + '/smap/sync/user/'
};
App.Temp = {
    accessToken: 'HeHQ4X-sxhhsRyHiSaORnQ'
};
App.Util = {
    getFullUrl: function (url) {
        return App.Config.serviceUrl + '/' + url + '?ak=' + (App.Temp.accessToken || '');
    },
    checkToken: function () {
        var taken_code = '';
        var isCorrect = false;
        $.ajax({
            url:App.Config.testloginServiceUrl + "tokenCheck",
            async:false,
            type:'post',
            data:{
                token: sessionStorage.getItem('token')
            },
            success:function (data, status) {
                data = JSON.parse(data);
                taken_code = data.code;
                if (200 == data.code) {
                    isCorrect = true;
                }
            }
        });
        return isCorrect;
    },
    sout:function () {//弹出重新登录框
        new LoginMsg(App.Config.appRoot+'/pages/login.html').show();
    },
    getToken:function () {
        return sessionStorage.getItem('token');
    }
};

(function(w){
    function LoginMsg(url){
        this.url=url||"";
        this.body = document.querySelector("body");
        this.div = document.createElement("div");
        this.div1 = document.createElement("div");
        this.p = document.createElement("p");
        this.a = document.createElement("a");
        this.div.style.cssText="position: fixed;z-index: 99999;background-color: rgba(0, 0, 0, 0.3);width: 100%;height: 100%;left: 0;top: 0;"
        this.div1.style.cssText="width: 296px;height: 153px;margin: 19.45rem auto auto auto;background-color: white;overflow: hidden;border-radius: 5px;";
        this.p.style.cssText="text-align: center;margin: 30px auto 28px auto;";
        this.a.style.cssText="background-color: #337ab7;display: block;width: 184px;height:50px;line-height: 50px;text-align: center;margin: 0 auto;border-radius: 5px;text-decoration: none;color: white;";
        this.p.innerHTML="登陆超时!";
        this.a.innerHTML="请重新登陆";
        this.a.setAttribute("href",url);
        this.div1.appendChild(this.p);
        this.div1.appendChild(this.a);
        this.div.appendChild(this.div1);
        this.body.appendChild(this.div);
    }
    LoginMsg.prototype.hide=function(){
        this.div.style.display="none";
    }
    LoginMsg.prototype.show=function(){
        this.div.style.display="block";
    }
    w.LoginMsg=LoginMsg;
}(window));

