export default {
    deepClone: (obj) => {
        function deepClone(obj) {
            var newObj = {};
            for (var k in obj) {
                if (Object.prototype.toString.call(obj[k]) == '[object Object]') {
                    newObj[k] = deepClone(obj[k]);
                } else {
                    newObj[k] = obj[k];
                }
            }
            return newObj;
        }

        return deepClone(obj);
    },
    adaptResourceUrl: (url) => {
        return ~url.indexOf('http') ? url : 'http://' + url;
    },

    setCookie: (c_name, value, expiredays) => {
        var exdate = new Date()
        exdate.setDate(exdate.getDate() + expiredays)
        document.cookie = c_name + "=" + escape(value) +
            ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString()) + ";path=/";
    },
    getCookie: (c_name) => {
        if (document.cookie.length > 0) {
            var c_start = document.cookie.indexOf(c_name + "=")
            if (c_start != -1) {
                c_start = c_start + c_name.length + 1
                var c_end = document.cookie.indexOf(";", c_start)
                if (c_end == -1) c_end = document.cookie.length
                return unescape(document.cookie.substring(c_start, c_end))
            }
        }
        return ""
    },
    delCookie: (c_name, cval) => {
        var exdate = new Date();
        exdate.setTime(exdate.getTime() - 10000);
        if (cval != null) {
            document.cookie = c_name + "=" + escape(cval) + ";expires=" + exdate.toGMTString() + ";path=/";
            return true;
        } else {
            return false;
        }

    },
    formRegular: {
        email: (str) => {
            return /[a-zA-Z0-9_+.-]+@[a-zA-Z0-9_-]+\.[a-zA-Z0-9]+/.test(str);
        },
        number: (num) => {
            return /^[-,\.]?$|^-?\d+$|^-?\d+\.$|^-?\d+\.\d+$|^\.\d+$/.test(num);
        },
        password: (str) => {
            return /^[\w|\.|\,]{6,16}$/.test(str);
        },
        nickname: (str) => {
            if (!str) return;
            var arr = str.split('');
            var length = 0;

            arr.map((val) => {
                length += (/[^\x00-\xff]/.test(val) ? 2 : 1);
            });

            if (length <= 18) {
                return true;
            }

            return false;
        },
        length: (str, length) => {
            var arr = str.split('');
            var _length = 0;

            arr.map((val) => {
                _length += (/[^\x00-\xff]/.test(val) ? 2 : 1);
            });

            if (_length <= length) {
                return true;
            }

            return false;
        },
        contactName: (str) => {
            var arr = str.split('');
            var length = 0;

            arr.map((val) => {
                length += (/[^\x00-\xff]/.test(val) ? 2 : 1);
            });

            if (length >= 1 && length <= 18) {
                return true;
            }

            return false;
        },
        phone: (num) => {
            return /^1[34578]\d{9}$/.test(num);
        }
    },
    dataURLtoBlob: (dataurl) => {
        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
    },
    releaseTime: (data) => {
        data = parseInt(data);
        var rDate = new Date(data);
        var y = rDate.getFullYear().toString();
        var mth = rDate.getMonth();
        var r = rDate.getDate();
        var h = rDate.getHours();
        var min = rDate.getMinutes();
        var s = rDate.getSeconds();
        var deltaT = (new Date()).getTime() - data;
        var mthNow = new Date().getMonth();
        var dayNow = new Date().getDate();
        var m = parseInt((deltaT / 1000) / 60);
        var time = 0;
        if (mthNow > mth) {
            time = formatData(y, mth, r);
        } else if (dayNow > r) {
            var _d = parseInt((dayNow - r) / 7);
            if (_d) {
                time = _d + '周前';
            } else {
                time = dayNow - r + '天前';
            }
        } else if (m <= 0) {
            time = '刚刚';
        } else if (m < 60) {
            time = m + '分钟前';
        } else if (m < 60 * 24) {
            time = parseInt(m / 60) + '小时前';
        } else {
            time = formatData(y, mth, r);
        }

        return time;

        function formatData(y, m, r) {
            if (m.toString().length == 1) m = '0' + m;

            if (r.toString().length == 1) r = '0' + r;

            return y + '-' + m + '-' + r;
        }
    },
    xmlToJson: (xml) => {
        var XmlToJson = function() {};
        XmlToJson.prototype.setXml = function(xml) {
            if (xml && typeof xml == "string") {
                this.xml = document.createElement("div");
                this.xml.innerHTML = xml;
                this.xml = this.xml.getElementsByTagName("*")[0];
            } else if (typeof xml == "object") {
                this.xml = xml;
            }
        };
        XmlToJson.prototype.getXml = function() {
            return this.xml;
        };
        XmlToJson.prototype.parse = function(xml) {
            this.setXml(xml);
            return this.convert(this.xml);
        };
        XmlToJson.prototype.convert = function(xml) {
            if (xml.nodeType != 1) {
                return null;
            }
            var obj = {};
            obj.xtype = xml.nodeName.toLowerCase();
            var nodeValue = (xml.textContent || "").replace(/(\r|\n)/g, "").replace(/^\s+|\s+$/g, "");

            if (nodeValue && xml.childNodes.length == 1) {
                obj.text = nodeValue;
            }
            if (xml.attributes.length > 0) {
                for (var j = 0; j < xml.attributes.length; j++) {
                    var attribute = xml.attributes.item(j);
                    obj[attribute.nodeName] = attribute.nodeValue;
                }
            }
            if (xml.childNodes.length > 0) {
                var items = [];
                for (var i = 0; i < xml.childNodes.length; i++) {
                    var node = xml.childNodes.item(i);
                    var item = this.convert(node);
                    if (item) {
                        items.push(item);
                    }
                }
                if (items.length > 0) {
                    obj.items = items;
                }
            }
            return obj;
        };

        // var xmlObj = new 

        return new XmlToJson().parse(xml);
    },
    getParentElement: (element, parent) => {

        if (/^\./.test(parent)) {
            name = 'className';
        } else if (/^\#/.test(parent)) {
            name = 'id';
        } else {
            name = 'tagName';
        }

        while (element.parentElement) {
            element = element.parentElement;
            if (element[name] && parent.indexOf(element[name].toLowerCase()) > -1) {
                return element;
                // break;
            }

        }
        if (!element.parentElement) console.warn('no element');
    },
    setRemRoot: () => {
        (function(doc, win) {
            var docEl = doc.documentElement,
                resizeEvt = "orientationchange" in window ? "orientationchange" : "resize",
                recalc = function() {
                    var clientWidth = docEl.clientWidth;
                    if (!clientWidth) return;
                    if (clientWidth < 640) {
                        // docEl.style.fontSize = 20 * (clientWidth / 320) + 'px';
                        // console.log(12 * (clientWidth / 320) + "px");
                    }
                    // else if (clientWidth < 768) {
                    //     //docEl.style.fontSize = "12px";
                    //     docEl.style.fontSize = 25 + 'px';
                    // } else if (clientWidth < 960) {
                    //     //docEl.style.fontSize = "12px";
                    //     docEl.style.fontSize = 23 + 'px';
                    // } 
                    else {
                        // docEl.style.fontSize = "20px";
                    }

                    docEl.style.fontSize = "20px";
                };


            if (!doc.addEventListener) return;
            win.addEventListener(resizeEvt, recalc, false);
            recalc();
            // doc.addEventListener('DOMContentLoaded', recalc, false);
        })(document, window);
    },
    ajax(name) {
        return {
            get(URL,queryJSON) {
                if (window.XMLHttpRequest) {
                    var xhr = new XMLHttpRequest();
                } else {
                    var xhr = new ActiveXObject('Microsoft.XMLHTTP');
                }
                var promise = new Promise((r, j) => {
                    xhr.onreadystatechange = function() {
                        try {
                            if (xhr.readyState == 4) {
                                if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
                                    r(JSON.parse(xhr.responseText));
                                } else {
                                    j(JSON.parse(xhr.responseText));
                                }
                            }
                        } catch (err) {
                            j({}, err);
                        }
                    };
                });
                var querystring = _queryjson2querystring(queryJSON);
                xhr.open('get', URL + '?' + querystring, true);
                // xhr.open('GET', URL, true);
                xhr.send(null);
                return promise;

                function _queryjson2querystring(json) {
                    var arr = [];
                    for (var k in json) {
                        arr.push(k + '=' + encodeURIComponent(json[k]));
                    }
                    return arr.join('&');
                }
            },
            delete(URL) {
                if (window.XMLHttpRequest) {
                    var xhr = new XMLHttpRequest();
                } else {
                    var xhr = new ActiveXObject('Microsoft.XMLHTTP');
                }
                var promise = new Promise((r, j) => {
                    xhr.onreadystatechange = function() {
                        try {
                            if (xhr.readyState == 4) {
                                if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
                                    r(JSON.parse(xhr.responseText));
                                } else {
                                    j(JSON.parse(xhr.responseText));
                                }
                            }
                        } catch (err) {
                            j({}, err);
                        }
                    };
                });
                // var querystring = this._queryjson2querystring(queryJSON);
                // xhr.open('get', URL + '?' + querystring, true);
                xhr.open('DELETE', URL, true);
                xhr.send(null);
                return promise;
            },
            post(URL, queryJSON) {
                if (window.XMLHttpRequest) {
                    var xhr = new window.XMLHttpRequest();
                } else {
                    var xhr = new ActiveXObject('Microsoft.XMLHTTP');
                }

                var promise = new Promise((r, j) => {
                    xhr.onreadystatechange = function() {
                        try {
                            if (xhr.readyState == 4) {
                                if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
                                    r(JSON.parse(xhr.responseText));
                                } else {
                                    j(JSON.parse(xhr.responseText));
                                }
                            }
                        } catch (err) {
                            j({}, err);
                        }
                    };

                });

                var querystring = _queryjson2querystring(queryJSON);

                xhr.open('POST', URL, true);

                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                xhr.send(querystring);

                function _queryjson2querystring(json) {
                    var arr = [];
                    for (var k in json) {
                        arr.push(k + '=' + encodeURIComponent(json[k]));
                    }
                    return arr.join('&');
                }

                return promise;
            }

        }[name].bind(this);
    },
};
