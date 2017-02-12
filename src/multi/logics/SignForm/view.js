import utils from '../../../core/utils';
import config from '../../../core/config';
import api from '../../../core/api';
import url from '../../../core/url';
import model from './model';
class View {
    constructor() {
        this.model = {};
        this.comModel = model;
        this._config = config;
        this.rawAPI = api;
        this.rawURL = url;
        this.cookieTime = 1;
        this.api = {
            // signIn: this._config.apiHost + this._config.apiPrefixes[0] + this.rawAPI.signIn(),
            // signUp: this._config.apiHost + this._config.apiPrefixes[0] + this.rawAPI.signUp(),
            // seekBack: this._config.apiHost + this._config.apiPrefixes[0] + this.rawAPI.seekBack(),
            // setPassword: (params = { authenticate_token: ':authenticate_token' }) => this._config.apiHost + this._config.apiPrefixes[0] + this.rawAPI.setPassword(params),
            // getcaptcha: this._config.apiHost + this._config.apiPrefixes[0] + this.rawAPI.getcaptcha(),
            signIn: this._config.apiHost() + this.rawAPI['signIn']()
        };

        let lang = location.href.indexOf('cn') > 0 ? 'cn' : 'en';
        this.url = {
            // individualCms: this._config.urlHost + this._config.urlPrefix(this._config.language) + this.rawURL.individualCms(),
            individualCms: `/981/${lang}/manager.html`
        };

        this.isRememberPassword = false;

        this.initModel()
            .initIdentifyingCode()
            .getDom()
            .initEvent();
    }

    initIdentifyingCode() {
        var hm = document.createElement('script');
        hm.src = 'http://static.geetest.com/static/tools/gt.js';
        document.body.appendChild(hm);
        return this;
    }

    initGeetest(obj) {
        // console.log(initGeetest, 1212)

        utils.ajax('get')(this.api.getcaptcha)
            .then((res) => {
                var data = JSON.parse(res);
                // console.log(data, 'ss');
                initGeetest({
                    gt: data.gt,
                    challenge: data.challenge,
                    product: 'float', // 产品形式，包括：float，embed，popup。注意只对PC版验证码有效
                    offline: !data.success // 表示用户后台检测极验服务器是否宕机，一般不需要关注
                        // 更多配置参数请参见：http://www.geetest.com/install/sections/idx-client-sdk.html#config
                }, (captchaObj) => {
                    document.getElementById('popupCaptcha').innerHTML = '';
                    captchaObj.appendTo('#popupCaptcha');
                    captchaObj.onSuccess(() => {
                        var validate = captchaObj.getValidate();
                        // this.signUpClick({...obj, ... { validate } });
                        this.validate = validate;
                    });
                });
            }, (err) => {
                console.log(err);
            });
        // handlerPopup(captchaObj) {
        //     // console.log(captchaObj)
        //     // this.captchaObj = captchaObj;
        //     //  this.captchaObj.appendTo('#popupCaptcha');
        //     //     this.captchaObj.onSuccess(() => {
        //     //         var validate = this.captchaObj.getValidate();
        //     //         this.signUpClick({ signBtn, emailIpn, errorDom, passwordIpn, validate });
        //     //     });

        // }

    }


    getDom() {
        this.layoutWrapper = document.querySelector('.layout-wrapper');
        this.signContent = document.querySelector('.sign-content');
        this.closeBtn = document.querySelector('.close-btn');
        return this;
    }

    initEvent() {
        this.closeBtn.onclick = () => {
            this.closeClick();
        };
        return this;
    }

    closeClick() {
        this.signContent.innerHTML = '';
        this.layoutWrapper.className = 'layout-wrapper fade-out';
    }

    getPopupCaptcha(type) {
        if (type === 'signUp') {
            return '<div id="popupCaptcha"></div>';
        } else {
            return '';
        }
    }

    getTpl(type, data) {
        let _tpl = '';
        if (type == 'signUp') {
            if (!data) data = {};
            var title = data.title ? data.title : '注册新账户';
            var btnText = data.btnText ? data.btnText : '开始注册';
            var emailText = data.emailText ? data.emailText : '请输入注册邮箱';
            var tipsText = data.tipsText ? data.tipsText : '已有账号？';
            var signBtn = data.signBtn ? data.signBtn : 'signBtn';
            _tpl = `
                <div class="title-box">
                    <p>${title}</p>
                </div>
                <input id="emailIpn" type="text" placeholder="${emailText}" />
                ${ signBtn === 'signBtn' ? '<input id="passwordIpn" type="password" placeholder="密码" />' : '' }
                <div id="popupCaptcha"></div>
                <p class="error-box"></p>
                <button id="${signBtn}">${btnText}</button>
                <p class="tips-box">${tipsText}<span id="goSignIn">登录</span></p>
            `;
        } else if (type == 'signIn') {
            if (!data) data = {};
            var title = data.title ? data.title : '用户登录';
            var email = data.email ? data.email : '';
            _tpl = `
                <div class="title-box">
                    <p>${title}</p>
                </div>
                <input id="emailIpn" type="text" placeholder="用户名" value="${email}" />
                <input id="passwordIpn" type="password" placeholder="密码" />
                <p class="error-box"></p>
                <button id="signBtn">登录</button>
            `;
            //  <div class="password-box of">
            //      <span class="fl chand" id="rememberBtn">记住密码</span>
            //      <span class="fr chand" id="seekBack">忘记密码？</span>
            //  </div>
            // <p class="tips-box">还没有账户？<span id="goSignUp">注册新账户</span></p>
        } else if (type == 'signUp success') {
            var tipsText = data.tipsText ? data.tipsText : '注册新账号邮件已发送至邮箱';
            _tpl = `
                <div class="tips-success">
                    <p>${tipsText}</p>
                    <p>${data.email}</p>
                </div>
                <button id="goOnBtn">继续</button>
            `;
        } else if (type == 'set password') {
            var className = ~location.href.indexOf('seekBack') ? 'seek-back' : '';
            _tpl = `
                <div class="title-box">
                    <p class="${className}">${data.title}</p>
                </div>
                <input id="newPassword1" type="password" placeholder="请输入6~16位字符的新密码" />
                <input id="newPassword2" type="password" placeholder="确认新密码" />
                <p class="error-box"></p>
                <button id="signBtn">确认</button>
            `;
        } else if (type == 'tips text') {
            _tpl = `
                <div class="tips-success">
                    <p id="tipsContainer">${data.tipsText}</p>
                </div>
                <button id="goOnBtn">关闭</button>
            `;
        } else if (type == 'set success') {
            _tpl = `
                <div class="tips-success">
                    <p>${data.email}</p>
                    <p>密码设置成功，请前往登录</p>
                </div>
                <button id="loginBtn">登录</button>
            `;
        } else if (type == 'active email') {
            _tpl = `
                <div class="tips-success">
                    <p>抱歉，${data.email}未做激活。</p>
                    <p>如需继续使用，请点击<span id="activeBtn">发送验证邮件。</span></p>
                </div>
                <button id="goOnBtn">关闭</button>
            `;
        }


        return _tpl;
    }

    showInitEvent(type, data) {
        let signBtn = document.getElementById('signBtn');
        let emailIpn = document.getElementById('emailIpn');
        let errorDom = document.querySelector('.error-box');

        if (type == 'signUp') {
            let goSignIn = document.getElementById('goSignIn');
            let popupCaptcha = document.getElementById('popupCaptcha');
            let passwordIpn = document.getElementById('passwordIpn');
            goSignIn.onclick = () => {
                this.show('signIn');
            };
            this.initGeetest({ signBtn, emailIpn, errorDom, passwordIpn });
            this.signUpEvent({ signBtn, emailIpn, passwordIpn, errorDom });
            this.enterEvent('signUp', { signBtn, emailIpn, passwordIpn, errorDom });
        } else if (type == 'signIn') {
            let passwordIpn = document.getElementById('passwordIpn');
            let goSignUp = document.getElementById('goSignUp');
            let rememberBtn = document.getElementById('rememberBtn');
            let seekBack = document.getElementById('seekBack');
            // goSignUp.onclick = () => {
            //     this.show('signUp');
            // };

            // this.initSignIn(rememberBtn);
            // seekBack.onclick = this.seekBack.bind(this);

            this.signInEvent(signBtn, emailIpn, passwordIpn, errorDom);

            this.enterEvent('signIn', { emailIpn, errorDom, signBtn, passwordIpn });
        } else if (type == 'set password') {
            let newPassword1 = document.getElementById('newPassword1');
            let newPassword2 = document.getElementById('newPassword2');
            this.setPasswordEvent(signBtn, newPassword1, newPassword2, errorDom, data);
        } else if (type == 'tips text') {
            let goOnBtn = document.getElementById('goOnBtn');
            goOnBtn.onclick = this.closeClick.bind(this);
            if (data.type === 'activation') this.activation({...data, goOnBtn });
        } else if (type == 'seekBack') {
            let goSignIn = document.getElementById('goSignIn');
            let seekBackBtn = document.getElementById('seekBackBtn');
            goSignIn.onclick = () => {
                this.show('signIn');
            };

            this.seekBackEvent(seekBackBtn, emailIpn, errorDom);
            this.enterEvent('seekBack', { emailIpn, errorDom, seekBackBtn });
        } else if (type == 'active email') {
            let goOnBtn = document.getElementById('goOnBtn');
            let activeBtn = document.getElementById('activeBtn');
            this.activationEvent({ activeBtn, data, errorDom });
            goOnBtn.onclick = this.closeClick.bind(this);
        }

        if (!emailIpn) return;
        emailIpn.onblur = () => {
            if (!this.testEmail(emailIpn.value)) {
                this.showError(errorDom, '请输入正确的用户名');
            } else {
                this.hideError(errorDom, '');
            }
        };
    }

    initSignIn(rememberBtn) {
        rememberBtn.className = !utils.getCookie('rememberPassword') ? 'fl chand' : 'fl chand active';
        this.isRememberPassword = utils.getCookie('rememberPassword') ? true : false;
        rememberBtn.onclick = this.rememberBtn.bind(this, rememberBtn);
    }

    rememberBtn(rememberBtn) {
        rememberBtn.className = ~rememberBtn.className.indexOf('active') ? 'fl chand' : 'fl chand active';
        this.isRememberPassword = ~rememberBtn.className.indexOf('active') ? true : false;

        if (this.isRememberPassword) {
            utils.setCookie('rememberPassword', true, this.cookieTime);
        } else {
            utils.getCookie('rememberPassword') && utils.delCookie('rememberPassword', utils.getCookie('rememberPassword'));
        }
    }

    rememberPassword(emailIpn, passwordIpn) {
        var email = emailIpn.value;
        var password = passwordIpn.value;

        if (this.isRememberPassword) {
            utils.setCookie('email', email, this.cookieTime);
            utils.setCookie('password', password, this.cookieTime);
        } else {
            utils.getCookie('email') && utils.delCookie('email', utils.getCookie('email'));
            utils.getCookie('password') && utils.delCookie('password', utils.getCookie('password'));
        }
    }

    seekBack() {
        var data = {
            title: '找回密码',
            emailText: '请输入您的邮箱',
            btnText: '立即找回',
            tipsText: '记得密码？',
            signBtn: 'seekBackBtn'
        };
        this.updataSignContent('signUp', data);
        this.showInitEvent('seekBack');

    }

    activationEvent(obj) {
        var { activeBtn, data, errorDom } = obj;
        activeBtn.onclick = () => {
            utils.ajax('post')(this.api.seekBack, {
                    email: data.email.toLowerCase(),
                    authenticate_type: 'signUp',
                })
                .then((res) => {
                    console.log(res);
                    this.updataSignContent('signUp success', { email: data.email, tipsText: '激活邮件已发送至邮箱' });
                    var goOnBtn = document.getElementById('goOnBtn');
                    goOnBtn.onclick = this.closeClick.bind(this);

                }, (err) => {
                    console.log(err);
                    if (err.code === 404001 || err.code === 400) {
                        this.showError(errorDom, '该帐号不存在');

                    } else {
                        alert('服务器错误');
                    }

                });
        }
    }

    activation(obj) {
        var { email, authenticate_token, goOnBtn } = obj;
        let tipsContainer = document.getElementById('tipsContainer');
        utils.ajax('post')(this.api.setPassword({ authenticate_token }), {
                authenticate_type: 'signUp'
            })
            .then((res) => {
                tipsContainer.innerHTML = `您的邮箱：${email}验证成功。`;

                goOnBtn.onclick = () => {
                    _acClose.call(this)
                };

                setTimeout(() => _acClose.call(this), 3000);
            }, (err) => {
                tipsContainer.innerHTML = `抱歉，服务器错误，${email}激活失败。`;
                setTimeout(() => _acClose.call(this), 3000);
                console.log(err, 'signUp err');
            });

        function _acClose() {
            this.closeClick();
            window.location.href = '/';
        }

    }

    seekBackEvent(seekBackBtn, emailIpn, errorDom) {
        seekBackBtn.onclick = () => {
            this.seekBackClick({ seekBackBtn, emailIpn, errorDom });
        };
    }

    signInEvent(signBtn, emailIpn, passwordIpn, errorDom) {
        var email = utils.getCookie('email');
        if (email) {
            emailIpn.value = email;
            if (utils.getCookie('password')) {
                passwordIpn.value = utils.getCookie('password');
            }
        }

        signBtn.onclick = this.signInClick.bind(this, { emailIpn, passwordIpn, errorDom, signBtn });
    }

    signUpEvent(obj) {
        var { signBtn, passwordIpn, errorDom } = obj;
        passwordIpn.onblur = () => {
            if (!this.testPassword(passwordIpn.value)) {
                this.showError(errorDom, '密码长度6-16位');
            }
        };
        signBtn.onclick = this.signUpClick.bind(this, obj);
    }

    setPasswordEvent(signBtn, newPassword1, newPassword2, errorDom, data) {
        let testPassword1 = false;
        newPassword1.onblur = () => {
            testPassword1 = this.testPassword(newPassword1.value);
            if (!testPassword1) {
                this.showError(errorDom, '密码长度6-16位');

            } else {
                this.hideError(errorDom, '');
            }
        };

        newPassword2.onblur = () => {
            if (!testPassword1) return;
            if (!(newPassword1.value === newPassword2.value)) {
                this.showError(errorDom, '两次密码输入不一致');
            } else {
                this.hideError(errorDom, '');
            }
        };

        signBtn.onclick = () => {
            clickEvent.call(this);
        };

        var self = this;
        document.addEventListener('keyup', function(e) {
            if (e.keyCode === 13) {
                clickEvent.call(self);
            }
        }, false);

        function clickEvent() {
            if (!testPassword1) return;
            if (!(newPassword1.value === newPassword2.value)) {
                this.showError(errorDom, '两次密码输入不一致');
            } else {
                this.hideError(errorDom, '');
                this.loadingEvent(signBtn, 'begin');
                utils.ajax('post')(this.api.setPassword({ authenticate_token: data.authenticate_token }), {
                        password: newPassword2.value,
                        authenticate_type: 'seekBack'
                    })
                    .then((res) => {
                        this.loadingEvent(signBtn, 'done');
                        this.updataSignContent('set success', { email: res.email });
                        var loginBtn = document.getElementById('loginBtn');
                        // var closeBtn = document.getElementById('closeBtn');
                        loginBtn.onclick = () => {
                            utils.setCookie('username', res.uid, this.cookieTime);
                            utils.setCookie('email', res.email, this.cookieTime);
                            window.location.href = this.url.individualCms;
                        };

                        this.closeBtn.addEventListener('click', () => {
                            window.location.href = window.location.origin + window.location.pathname;
                        }, false);

                        document.addEventListener('keyup', function(e) {
                            if (e.keyCode === 13) {
                                utils.setCookie('username', res.uid, this.cookieTime);
                                utils.setCookie('email', res.email, this.cookieTime);
                                window.location.href = this.url.individualCms;
                            }
                        }, false);

                    }, (err) => {
                        this.loadingEvent(signBtn, 'done');
                        console.log(err, 'set err');
                    });
            }
        };
    }

    seekBackClick(obj) {
        var { emailIpn, errorDom, seekBackBtn } = obj;
        if (!this.testEmail(emailIpn.value)) {
            this.showError(errorDom, '请输入正确的用户名');
        } else {
            this.hideError(errorDom, '');
            this.loadingEvent(seekBackBtn, 'begin');
            utils.ajax('post')(this.api.seekBack, {
                    email: emailIpn.value.toLowerCase(),
                    authenticate_type: 'seekBack',
                })
                .then((res) => {
                    this.loadingEvent(seekBackBtn, 'done');
                    // console.log(res);
                    this.updataSignContent('signUp success', { email: emailIpn.value, tipsText: '密码找回邮件已发送至邮箱' });
                    var goOnBtn = document.getElementById('goOnBtn');
                    goOnBtn.onclick = this.closeClick.bind(this);

                }, (err) => {
                    this.loadingEvent(seekBackBtn, 'done');
                    console.log(err);
                    if (err.code === 404001 || err.code === 400) {
                        this.showError(errorDom, '该帐号不存在');

                    } else {
                        alert('服务器错误');
                    }

                });
        }
    }

    signInClick(obj) {
        var { emailIpn, passwordIpn, errorDom, signBtn } = obj;
        if (!this.testEmail(emailIpn.value)) {
            this.showError(errorDom, '请输入正确的用户名');
        } else if (passwordIpn.value == '') {
            this.showError(errorDom, '请输入密码');
        } else {
            this.loadingEvent(signBtn, 'begin');
            console.log(this.api.signIn)
            console.log(emailIpn.value)
            console.log(passwordIpn.value)
            utils.ajax('post')(this.api.signIn, {
                    username: emailIpn.value,
                    password: passwordIpn.value
                })
                .then((res) => {
                    console.log(res)
                    if(res.code === 1) {
                        
                        // this.rememberPassword(emailIpn, passwordIpn);
                        this.signInToIndividualCms(res);
                    }
                    else if (res.code === 403002 || res.code === 404001) {
                        this.showError(errorDom, '请输入正确的用户名或密码');
                    }
                   
                     this.loadingEvent(signBtn, 'done');
                }).catch( (err) => {
                    this.loadingEvent(signBtn, 'done');
                    console.log(err,'err')
                    if (err.code === 403002 || err.code === 404001) {
                        this.showError(errorDom, '请输入正确的用户名或密码');
                    } else if (err.code === 404001) {
                        this.showError(errorDom, '该帐号不存在');
                    } else {
                        this.showError(errorDom, '服务器错误，请稍后再试');
                    }
                     this.loadingEvent(signBtn, 'done');
                });
        }
    }

    signUpClick(obj) {
        obj.validate = this.validate;
        var { emailIpn, errorDom, signBtn, passwordIpn, validate } = obj;
        if (!this.testEmail(emailIpn.value)) {
            this.showError(errorDom, '请输入正确的用户名');
        } else if (!this.testPassword(passwordIpn.value)) {
            this.showError(errorDom, '密码长度6-16位');
        } else if (!obj.validate) {
            this.showError(errorDom, '请滑动出正确的验证码');
            this.initGeetest({...obj });
        } else {
            this.showError(errorDom, '');
            this.loadingEvent(signBtn, 'begin');
            utils.ajax('post')(this.api.signUp, {
                    email: emailIpn.value.toLowerCase(),
                    password: passwordIpn.value,
                    authenticate_type: 'signUp',
                    geetest_challenge: validate.geetest_challenge,
                    geetest_validate: validate.geetest_validate,
                    geetest_seccode: validate.geetest_seccode
                })
                .then((res) => {
                    console.log(res, 'rrr');
                    this.loadingEvent(signBtn, 'done');
                    this.signInToIndividualCms(res);

                }, (err) => {
                    this.loadingEvent(signBtn, 'done');
                    console.log(err);
                    if (err.code === 403001) {
                        this.showError(errorDom, '该帐号已经存在');
                        this.show('signIn', { title: '该账号已存在，请直接登录', email: emailIpn.value });
                    } else {
                        alert('服务器错误');
                    }

                });
        }
    }

    enterEvent(type, obj) {
        var self = this;
        document.onkeyup = function(e) {
            if (e.keyCode === 13) {
                if (type === 'signIn') self.signInClick(obj);
                if (type === 'signUp') self.signUpClick(obj);
                if (type === 'seekBack') self.seekBackClick(obj);
            }
        };
        // document.addEventListener('keyup', function(e) {
        //     if (e.keyCode === 13) {
        //         if (type === 'signIn') self.signInClick({ emailIpn, errorDom, signBtn, passwordIpn });
        //         if (type === 'signUp') self.signUpClick({ emailIpn, errorDom, signBtn });
        //     }
        // }, false);
    }

    signInToIndividualCms(res) {
        utils.setCookie('username', res.username, this.cookieTime);
        // utils.setCookie('email', res.email, this.cookieTime);
        window.location.href = this.url.individualCms;
    }

    testEmail(val) {
        return /^[a-z]+$/.test(val);
    }

    testPassword(val) {
        return utils.formRegular.password(val);
    }

    showError(errorDom, text) {
        errorDom.innerHTML = text;
        errorDom.style.display = 'block';
    }

    hideError(errorDom, text) {
        errorDom.innerHTML = text;
        errorDom.style.display = 'none';
    }

    show(type, data) {
        this.updataSignContent(type, data);
        this.layoutWrapper.className = 'layout-wrapper fade-in';
        this.showInitEvent(type, data);

    }

    updataSignContent(type, data) {
        let tpl = this.getTpl(type, data);
        this.signContent.innerHTML = tpl;
    }

    loadingEvent(dom, type) {
        if (type === 'begin') {
            this._html = dom.innerHTML;
            dom.className = 'disabledStyle';
            dom.disabled = true;
            this.loadingDot(dom);
        } else if (type === 'done') {
            dom.removeChild(this.loadingSpan);
            dom.className = '';
            dom.innerHTML = this._html;
            dom.disabled = false;
        }
    }

    loadingDot(loadingDom) {
        this.loadingSpan = document.createElement('span');
        for (let i = 0; i <= 2; i++) {
            var a = document.createElement('i');
            a.innerHTML = '.';
            this.loadingSpan.appendChild(a);
        }
        loadingDom.innerHTML += '中';
        loadingDom.appendChild(this.loadingSpan);
    }

    initModel() {

        if(utils.getCookie('username'))  {
            window.location.href = this.url.individualCms;
        }

        this.model = {...this.model,
            ... {

            }
        };
        return this;
    }


}

export default View;
