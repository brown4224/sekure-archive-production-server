webpackJsonp([1,4],{

/***/ 110:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(313);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_throw__ = __webpack_require__(747);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_throw___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_throw__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(749);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch__ = __webpack_require__(748);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_timeout__ = __webpack_require__(750);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_timeout___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_timeout__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__user__ = __webpack_require__(111);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return APIService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








function convertFolder(data) {
    return {
        id: data.id,
        path: data.path,
        created: new Date(data.created),
        modified: new Date(data.modified),
    };
}
var APIService = (function () {
    function APIService(http, user) {
        this.http = http;
        this.user = user;
        // private URL = 'http://172.17.0.2:80';
        this.URL = 'http://52.2.133.118:80';
        this.timeOut = 10000;
        console.log('Postservice initialized...');
    }
    /** Submits non-GET requests (which *do* have a JSON body). */
    APIService.prototype.makeRequest = function (method, path, body, authorization) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]({ 'Content-Type': 'application/json' });
        headers.append('Access-Control-Allow-Origin', '*');
        // authentication not null
        if (authorization) {
            headers.append('authorization', "Bearer " + this.user.getToken());
        }
        //Data
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* RequestOptions */]({
            'url': this.URL + path,
            'body': body,
            'method': method,
            'headers': headers
        });
        return this.http.request(new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Request */](options))
            .timeout(this.timeOut)
            .map(function (res) { return res.json(); })
            .catch(function (error) {
            if ('json' in error) {
                if (error.status == 400) {
                    return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw('Invalid request.');
                }
                else {
                    return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(error.json().error || 'Internal server error.');
                }
            }
            else {
                return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw('Could not establish a connection to the server.');
            }
        });
    };
    // *************************   API CALLS ***********************************
    // *************************   USER ACCOUNT ********************************
    // Creates a new user and returns a jws
    // var body = {"email": "userEmail","password": "userPassword"};
    APIService.prototype.userAdd = function (email, password) {
        var body = JSON.stringify({ 'email': email, 'password': password });
        return this.makeRequest(__WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestMethod */].Post, '/accounts', body, false);
    };
    // INPUT: User Name & Password
    // OUTPUT:  returns a id_token
    APIService.prototype.userLogin = function (email, password) {
        var body = JSON.stringify({ 'email': email, 'password': password });
        return this.makeRequest(__WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestMethod */].Post, '/accounts/login', body, false);
    };
    // *************************   FOLDERS   ********************************
    // INPUT: folder id
    // OUTPUT: folder data
    APIService.prototype.getFolder = function (id) {
        return this.makeRequest(__WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestMethod */].Get, "/folders/" + id, null, true).map(function (data) { return data.files; });
    };
    // INPUT: folder path
    // OUTPUT: folder id
    APIService.prototype.postFolder = function (path) {
        var body = JSON.stringify({ 'path': path });
        return this.makeRequest(__WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestMethod */].Post, '/folders', body, true);
    };
    // *************************  Multiple   FOLDERS   **************************
    //  INPUT: id_token  OUTPUT: JSON of all folders
    //  OUTPUT: Array of all folders
    APIService.prototype.getALLFolders = function () {
        return this.makeRequest(__WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestMethod */].Get, '/folders', null, true).map(function (data) {
            return data.folders.map(convertFolder);
        });
    };
    // *************************  Single  FILES   ********************************
    // INPUT: file id
    // OUTPUT: file id : number, folder_id: number, name: string, mime: string
    APIService.prototype.getFileByID = function (id) {
        return this.makeRequest(__WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestMethod */].Get, "/files/" + id, null, true);
    };
    // INPUT: folder id and file name
    // OUTPUT: file id
    APIService.prototype.postFile = function (folder_id, fileName) {
        var body = JSON.stringify({ 'folder_id': folder_id, name: fileName });
        return this.makeRequest(__WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestMethod */].Post, '/files', body, true);
    };
    // *************************  RESTORE FILES   ********************************
    APIService.prototype.getFileDownload = function (id) {
        return this.makeRequest(__WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestMethod */].Get, "/files/" + id + "/download", null, true);
    };
    APIService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["f" /* Http */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["f" /* Http */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_7__user__["a" /* UserService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_7__user__["a" /* UserService */]) === 'function' && _b) || Object])
    ], APIService);
    return APIService;
    var _a, _b;
}());
//# sourceMappingURL=api.js.map

/***/ }),

/***/ 111:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jwt_decode__ = __webpack_require__(733);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jwt_decode___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jwt_decode__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_cookie_core__ = __webpack_require__(521);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_cookie_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_angular2_cookie_core__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var JWT_KEY = 'session';
// Cookies dont work on S3, CORS strips them
/** A service that manages the currently logged in user. */
var UserService = (function () {
    function UserService(cookie) {
        this.cookie = cookie;
        this.cookieExpires = 1; //Expire in an hour
        this.cookieHTTPS = false; // Needs to be true for https
        this.username = null;
    }
    UserService.prototype.setUser = function (username, jwt) {
        var temp = new Date().getTime() + this.cookieExpires * 3600 * 1000; //hour is 3600
        var date = new Date(temp);
        var key = 'testCookieKey';
        var value = 'jwt';
        var opts = {
            path: './services/user',
            domain: 'localhost',
            expires: date,
            secure: this.cookieHTTPS,
        };
        this.username = username;
        // this.cookie.put(JWT_KEY, jwt, opts);
        localStorage.setItem(JWT_KEY, jwt);
        localStorage.setItem('username', username);
    };
    /** Unsets the current user and clears authentication information. */
    UserService.prototype.unsetUser = function () {
        this.username = null;
        // this.cookie.remove(JWT_KEY);
        localStorage.removeItem(JWT_KEY);
        localStorage.removeItem('username');
    };
    /** Returns the username of the currently logged in user, if any. */
    UserService.prototype.getUsername = function () {
        if (!this.username) {
            this.username = localStorage.getItem('username');
        }
        return this.username;
    };
    /** Returns the JWT of the currently logged in user, if any. */
    UserService.prototype.getToken = function () {
        return localStorage.getItem(JWT_KEY);
        // return this.cookie.get(JWT_KEY);
    };
    UserService.prototype.setSessionExpired = function () {
        localStorage.setItem('expired', 'true');
        this.unsetUser();
    };
    UserService.prototype.isSessionExpired = function () {
        if (localStorage.getItem('expired'))
            return true;
        else
            return false;
    };
    UserService.prototype.resetSessionExpired = function () {
        localStorage.removeItem('expired');
    };
    /** Returns whether there is currently a user logged in (best effort, token could be invalid). */
    UserService.prototype.isLoggedIn = function () {
        var token = this.getToken();
        if (token) {
            if (__WEBPACK_IMPORTED_MODULE_0_jwt_decode__(token).exp < new Date().getTime()) {
                return true;
            }
            this.setSessionExpired();
        }
        return false;
    };
    UserService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2_angular2_cookie_core__["CookieService"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2_angular2_cookie_core__["CookieService"]) === 'function' && _a) || Object])
    ], UserService);
    return UserService;
    var _a;
}());
//# sourceMappingURL=user.js.map

/***/ }),

/***/ 336:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_api__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_user__ = __webpack_require__(111);
/* unused harmony export Flash */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Home; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/** Any currently displayed messages. */
var Flash = (function () {
    function Flash() {
        this.error = null;
        this.notification = null;
    }
    return Flash;
}());
var Home = (function () {
    function Home(router, api, user) {
        this.router = router;
        this.api = api;
        this.user = user;
        this.username = null;
        this.flash = new Flash();
    }
    Home.prototype.ngOnInit = function () {
        var _this = this;
        this.working = true;
        this.username = this.user.getUsername();
        // Load folders on page load
        this.api.getALLFolders().subscribe(function (folders) {
            _this.folders = folders;
            _this.working = false;
        }, function (error) {
            if (!_this.user.isLoggedIn()) {
                _this.router.navigate(['login']);
                var isExpired = _this.user.isSessionExpired();
                if (isExpired) {
                    _this.user.setSessionExpired();
                }
                console.log("Your out of time, please log in again");
            }
            else {
                _this.working = false;
                _this.flash.error = error;
            }
        });
    };
    Home.prototype.logout = function () {
        this.user.unsetUser();
        this.router.navigate(['login']);
    };
    Home = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'home',
            template: __webpack_require__(740),
            styles: [__webpack_require__(727)],
            providers: [__WEBPACK_IMPORTED_MODULE_2__services_api__["a" /* APIService */]]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_api__["a" /* APIService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_api__["a" /* APIService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__services_user__["a" /* UserService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__services_user__["a" /* UserService */]) === 'function' && _c) || Object])
    ], Home);
    return Home;
    var _a, _b, _c;
}());
//# sourceMappingURL=home.js.map

/***/ }),

/***/ 337:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_api__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_user__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_socket__ = __webpack_require__(339);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Login; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var Login = (function () {
    function Login(router, api, user, chatService) {
        this.router = router;
        this.api = api;
        this.user = user;
        this.chatService = chatService;
        this.messages = [];
        this.showLogin = true;
        this.working = false;
        this.usernameError = null;
        this.passwordError = null;
    }
    Login.prototype.ngOnInit = function () {
        var _this = this;
        this.connection = this.chatService.getMessages().subscribe(function (message) {
            console.log("sending message over socket");
            _this.messages.push(message);
        });
        this.chatService.sendMessage("Test Message");
        // this.socket = io('http://localhost:8000');
        // this.connection = this.io.getMessages().subscribe(message => {
        // this.messages.push(message);
        // });
        // this.io.sendMessage("Test Message");
        // this.socket.emit('newUser', "Test Data");
        //     if (this.user.isLoggedIn()) {
        //       this.router.navigate(['home']);
        //     } else if (this.user.isSessionExpired()) {
        //       this.passwordError = 'Your session has expired.';
        //       this.user.resetSessionExpired();
        //     }
    };
    Login.prototype.toggleLogin = function () {
        // If an API call is in progress, ignore the button press.
        if (this.working)
            return;
        this.showLogin = !this.showLogin;
        // Reset the form
        this.username.nativeElement.value = '';
        this.password.nativeElement.value = '';
        this.usernameError = null;
        this.passwordError = null;
    };
    Login.prototype.submitForm = function () {
        // If an API call is in progress, ignore the button press.
        if (this.working)
            return;
        var username = this.username.nativeElement.value;
        var password = this.password.nativeElement.value;
        if (this.showLogin) {
            this.login(username, password);
        }
        else {
            this.signup(username, password);
        }
    };
    Login.prototype.login = function (username, password) {
        var _this = this;
        this.working = true;
        this.api.userLogin(username, password)
            .subscribe(function (data) {
            _this.user.setUser(username, data.jwt);
            _this.router.navigate(['home']);
        }, function (err) {
            _this.passwordError = err;
            _this.working = false;
        });
    };
    Login.prototype.signup = function (username, password) {
        var _this = this;
        // Client-side check of username and password
        if (username.length == 0) {
            this.usernameError = 'Username must not be empty.';
        }
        else {
            this.usernameError = null;
        }
        if (password.length < 8) {
            this.passwordError = 'Password must be at least 8 characters long.';
        }
        else if (password.length > 72) {
            this.passwordError = 'Password must be no more than 72 characters long.';
        }
        else {
            this.passwordError = null;
        }
        // Attempt to register if the username and password seem to be OK
        if (this.usernameError == null && this.passwordError == null) {
            this.working = true;
            this.api.userAdd(username, password)
                .subscribe(function (data) {
                _this.user.setUser(username, data.jwt);
                _this.router.navigate(['home']);
            }, function (err) {
                _this.usernameError = err;
                _this.working = false;
            });
        }
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('username'), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === 'function' && _a) || Object)
    ], Login.prototype, "username", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('password'), 
        __metadata('design:type', (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === 'function' && _b) || Object)
    ], Login.prototype, "password", void 0);
    Login = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'login',
            template: __webpack_require__(741),
            styles: [__webpack_require__(728)],
            providers: [__WEBPACK_IMPORTED_MODULE_2__services_api__["a" /* APIService */], __WEBPACK_IMPORTED_MODULE_4__services_socket__["a" /* Socket */]]
        }), 
        __metadata('design:paramtypes', [(typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__services_api__["a" /* APIService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_api__["a" /* APIService */]) === 'function' && _d) || Object, (typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_3__services_user__["a" /* UserService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__services_user__["a" /* UserService */]) === 'function' && _e) || Object, (typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_4__services_socket__["a" /* Socket */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__services_socket__["a" /* Socket */]) === 'function' && _f) || Object])
    ], Login);
    return Login;
    var _a, _b, _c, _d, _e, _f;
}());
//# sourceMappingURL=login.js.map

/***/ }),

/***/ 338:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_user__ = __webpack_require__(111);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthGuard; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthGuard = (function () {
    function AuthGuard(router, user) {
        this.router = router;
        this.user = user;
    }
    AuthGuard.prototype.canActivate = function () {
        // Reroute to login form if no user is logged in
        if (this.user.isLoggedIn()) {
            return true;
        }
        else {
            this.router.navigate(["login"]);
            return false;
        }
    };
    AuthGuard = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_user__["a" /* UserService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_user__["a" /* UserService */]) === 'function' && _b) || Object])
    ], AuthGuard);
    return AuthGuard;
    var _a, _b;
}());
//# sourceMappingURL=authguard.js.map

/***/ }),

/***/ 339:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_socket_io_client__ = __webpack_require__(771);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_socket_io_client___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_socket_io_client__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Socket; });


var Socket = (function () {
    function Socket() {
        this.url = 'http://127.0.0.1:3000';
    }
    Socket.prototype.sendMessage = function (message) {
        this.socket.emit('add-message', message);
    };
    Socket.prototype.getMessages = function () {
        var _this = this;
        var observable = new __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"](function (observer) {
            _this.socket = __WEBPACK_IMPORTED_MODULE_1_socket_io_client__(_this.url, { path: '/socket.io' });
            _this.socket.on('message', function (data) {
                observer.next(data);
            });
            return function () {
                _this.socket.disconnect();
            };
        });
        return observable;
    };
    return Socket;
}());
//# sourceMappingURL=socket.js.map

/***/ }),

/***/ 400:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 400;


/***/ }),

/***/ 401:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(482);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(513);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(519);




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 512:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'my-app',
            template: __webpack_require__(736),
            styles: [__webpack_require__(723)]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 513:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(313);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__routes_authguard__ = __webpack_require__(338);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_api__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_user__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_socket__ = __webpack_require__(339);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angular2_cookie_services_cookies_service__ = __webpack_require__(342);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angular2_cookie_services_cookies_service___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_angular2_cookie_services_cookies_service__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_component__ = __webpack_require__(512);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_file_file__ = __webpack_require__(514);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_folder_folder__ = __webpack_require__(515);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_spinner_spinner__ = __webpack_require__(516);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__routes_routes__ = __webpack_require__(518);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__public_home_home__ = __webpack_require__(336);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__public_login_login__ = __webpack_require__(337);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pipes_bytes__ = __webpack_require__(517);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
















var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */], __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* HttpModule */], __WEBPACK_IMPORTED_MODULE_12__routes_routes__["a" /* routing */]],
            providers: [__WEBPACK_IMPORTED_MODULE_7_angular2_cookie_services_cookies_service__["CookieService"], __WEBPACK_IMPORTED_MODULE_3__routes_authguard__["a" /* AuthGuard */], __WEBPACK_IMPORTED_MODULE_4__services_api__["a" /* APIService */], __WEBPACK_IMPORTED_MODULE_6__services_socket__["a" /* Socket */], __WEBPACK_IMPORTED_MODULE_5__services_user__["a" /* UserService */]],
            declarations: [__WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* AppComponent */], __WEBPACK_IMPORTED_MODULE_9__components_file_file__["a" /* FileComponent */], __WEBPACK_IMPORTED_MODULE_10__components_folder_folder__["a" /* FolderComponent */], __WEBPACK_IMPORTED_MODULE_11__components_spinner_spinner__["a" /* SpinnerComponent */], __WEBPACK_IMPORTED_MODULE_13__public_home_home__["a" /* Home */], __WEBPACK_IMPORTED_MODULE_14__public_login_login__["a" /* Login */], __WEBPACK_IMPORTED_MODULE_15__pipes_bytes__["a" /* BytesPipe */]],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* AppComponent */]],
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 514:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_api__ = __webpack_require__(110);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FileComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var FileComponent = (function () {
    function FileComponent(api) {
        this.api = api;
        this.open = false;
    }
    FileComponent.prototype.toggleOpen = function () {
        this.open = !this.open;
    };
    FileComponent.prototype.restoreFile = function () {
        console.log("File info");
        console.log(this.file.id);
        console.log(this.file.name);
        this.api.getFileDownload(this.file.id).subscribe(function (files) {
        });
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_api__["File"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_api__["File"]) === 'function' && _a) || Object)
    ], FileComponent.prototype, "file", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], FileComponent.prototype, "even", void 0);
    FileComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'file',
            template: __webpack_require__(737),
            styles: [__webpack_require__(724)],
            providers: [__WEBPACK_IMPORTED_MODULE_1__services_api__["a" /* APIService */]],
        }), 
        __metadata('design:paramtypes', [(typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__services_api__["a" /* APIService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_api__["a" /* APIService */]) === 'function' && _b) || Object])
    ], FileComponent);
    return FileComponent;
    var _a, _b;
}());
//# sourceMappingURL=file.js.map

/***/ }),

/***/ 515:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_api__ = __webpack_require__(110);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FolderComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var FolderComponent = (function () {
    function FolderComponent(api) {
        this.api = api;
        this.open = false;
        this.files = null;
    }
    FolderComponent.prototype.loadContents = function () {
        var _this = this;
        this.api.getFolder(this.folder.id).subscribe(function (files) {
            _this.files = files;
        });
    };
    FolderComponent.prototype.toggleOpen = function () {
        if (!this.open && !this.files) {
            this.loadContents();
        }
        this.open = !this.open;
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_api__["Folder"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_api__["Folder"]) === 'function' && _a) || Object)
    ], FolderComponent.prototype, "folder", void 0);
    FolderComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'folder',
            template: __webpack_require__(738),
            styles: [__webpack_require__(725)],
            providers: [__WEBPACK_IMPORTED_MODULE_1__services_api__["a" /* APIService */]]
        }), 
        __metadata('design:paramtypes', [(typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__services_api__["a" /* APIService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_api__["a" /* APIService */]) === 'function' && _b) || Object])
    ], FolderComponent);
    return FolderComponent;
    var _a, _b;
}());
//# sourceMappingURL=folder.js.map

/***/ }),

/***/ 516:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SpinnerComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var SpinnerComponent = (function () {
    function SpinnerComponent() {
    }
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Number)
    ], SpinnerComponent.prototype, "size", void 0);
    SpinnerComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            // moduleId: module.id,
            selector: 'spinner',
            template: __webpack_require__(739),
            styles: [__webpack_require__(726)],
        }), 
        __metadata('design:paramtypes', [])
    ], SpinnerComponent);
    return SpinnerComponent;
}());
//# sourceMappingURL=spinner.js.map

/***/ }),

/***/ 517:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BytesPipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var KIBI = Math.pow(2, 10);
var MEBI = Math.pow(2, 20);
var GIBI = Math.pow(2, 30);
var TEBI = Math.pow(2, 40);
/** A pipe that transforms bytes to human-readable sizes (e.g., 4.03 GiB). */
var BytesPipe = (function () {
    function BytesPipe() {
    }
    BytesPipe.prototype.transform = function (value, args) {
        var bytes = parseInt(value);
        if (bytes >= TEBI) {
            return (bytes / TEBI).toPrecision(3) + " TiB";
        }
        else if (bytes >= GIBI) {
            return (bytes / GIBI).toPrecision(3) + " GiB";
        }
        else if (bytes >= MEBI) {
            return (bytes / MEBI).toPrecision(3) + " MiB";
        }
        else if (bytes >= KIBI) {
            return (bytes / KIBI).toPrecision(3) + " KiB";
        }
        else {
            return bytes + " B";
        }
    };
    BytesPipe = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({ name: 'bytes' }), 
        __metadata('design:paramtypes', [])
    ], BytesPipe);
    return BytesPipe;
}());
//# sourceMappingURL=bytes.js.map

/***/ }),

/***/ 518:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__public_home_home__ = __webpack_require__(336);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__public_login_login__ = __webpack_require__(337);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__authguard__ = __webpack_require__(338);
/* unused harmony export routes */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return routing; });




var routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: __WEBPACK_IMPORTED_MODULE_2__public_login_login__["a" /* Login */] },
    { path: 'home', component: __WEBPACK_IMPORTED_MODULE_1__public_home_home__["a" /* Home */], canActivate: [__WEBPACK_IMPORTED_MODULE_3__authguard__["a" /* AuthGuard */]] },
    { path: '**', redirectTo: 'login' },
];
var routing = __WEBPACK_IMPORTED_MODULE_0__angular_router__["b" /* RouterModule */].forRoot(routes);
//# sourceMappingURL=routes.js.map

/***/ }),

/***/ 519:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ 723:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(63)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 724:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(63)();
// imports


// module
exports.push([module.i, ".contents {\n    border-top: 1px solid #E3E3E3;\n    margin-left: 44px;\n    padding: 10px 0;\n    text-align: left;\n}\n\n.contents > p {\n    margin: 0;\n}\n\n.file {\n    background-color: #F9F9F9;\n    border-top: 1px solid #E3E3E3;\n    margin: 0;\n    padding: 0;\n}\n\n.file-even {\n    background-color: white;\n}\n\n.header {\n    height: 36px;\n    cursor: pointer;\n    font-size: 16px;\n    list-style-type: none;\n    line-height: 36px;\n    margin: 0;\n    padding: 0;\n    text-align: left;\n}\n\n.header > li {\n    display: inline-block;\n}\n\n.header > * > .glyphicon {\n    font-size: 16px;\n}\n\n.header > * > .glyphicon-chevron-down {\n    margin: 8px 4px 0 16px;\n}\n\n.header > * > .glyphicon-chevron-right {\n    margin: 8px 10px;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 725:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(63)();
// imports


// module
exports.push([module.i, ".folder {\n    background-color: #F5F5F5;\n    border: 1px solid #E3E3E3;\n    margin-bottom: 16px;\n}\n\n.header {\n    height: 36px;\n    cursor: pointer;\n    font-size: 16px;\n    list-style-type: none;\n    line-height: 36px;\n    margin: 0;\n    padding: 0;\n    text-align: left;\n}\n\n.header > li {\n    display: inline-block;\n}\n\n.header > * > .glyphicon {\n    font-size: 21px;\n}\n\n.header > * > .glyphicon-folder-close {\n    margin: 6px 8px;\n}\n\n.header > * > .glyphicon-folder-open {\n    margin: 6px 5px 0 11px;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 726:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(63)();
// imports


// module
exports.push([module.i, ".container {\n    position: relative;\n    overflow-x: hidden;\n    overflow-y: hidden;\n}\n\n.spinner {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    -webkit-animation-name: spin;\n    -webkit-animation-duration: 1337ms;\n    -webkit-animation-iteration-count: infinite;\n    -webkit-animation-timing-function: linear;\n    -moz-animation-name: spin;\n    -moz-animation-duration: 1337ms;\n    -moz-animation-iteration-count: infinite;\n    -moz-animation-timing-function: linear;\n    -ms-animation-name: spin;\n    -ms-animation-duration: 1337ms;\n    -ms-animation-iteration-count: infinite;\n    -ms-animation-timing-function: linear;\n    animation-name: spin;\n    animation-duration: 1337ms;\n    animation-iteration-count: infinite;\n    animation-timing-function: linear;\n}\n\n@-webkit-keyframes spin {\n    from { -webkit-transform: rotate(0deg); }\n    to { -webkit-transform: rotate(360deg); }\n}\n\n@keyframes spin {\n    from { -webkit-transform:rotate(0deg); transform:rotate(0deg); }\n    to { -webkit-transform:rotate(360deg); transform:rotate(360deg); }\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 727:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(63)();
// imports


// module
exports.push([module.i, "h3 {\n    margin-top: 8px;\n    margin-bottom: 24px;\n}\n\n.alert {\n    padding: 8px;\n    margin: 0 0 16px 0;\n}\n\n.nav > button {\n    margin: 8px 8px 0 0;\n}\n\n.navbar {\n    background-image: url('/img/furley_bg.png');\n    background-repeat: repeat-x;\n    border-radius: 0;\n    box-shadow: 2px 2px 4px #C0C0C0;\n}\n\n.click {\n    cursor: pointer;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 728:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(63)();
// imports


// module
exports.push([module.i, ".main {\n    display: table;\n    width: 100%;\n    height: 100%;\n}\n\n.wrapper {\n    display: table-cell;\n    height: 100%;\n    vertical-align: middle;\n}\n\n.well {\n    margin: auto;\n    width: 512px;\n    padding: 16px;\n    background-image: url('/img/furley_bg.png');\n    background-repeat: repeat;\n    box-shadow: 2px 5px 15px #C0C0C0;\n}\n\nh2 {\n    margin: 0;\n    text-align: center;\n}\n\n.form-group {\n    margin: 8px 0;\n}\n\nlabel {\n    margin-top: 4px;\n}\n\n.alert {\n    margin: 16px 0 0 0;\n    padding: 6px 10px;\n}\n\n.btn {\n    margin-top: 8px;\n}\n\nspinner {\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    margin: -48px 0 0 -48px;\n}\n\nimg {\n    width: 128px;\n    height: 128px;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 736:
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>\n"

/***/ }),

/***/ 737:
/***/ (function(module, exports) {

module.exports = "<div class=\"file\" [class.file-even]=\"even\">\n  <ul class=\"header\" (click)=\"toggleOpen()\">\n    <li><div *ngIf=\"open\" class=\"glyphicon glyphicon-chevron-down\"></div></li>\n    <li><div *ngIf=\"!open\" class=\"glyphicon glyphicon-chevron-right\"></div></li>\n    <li><p>{{file.name}}</p></li>\n  </ul>\n  <div *ngIf=\"open\" class=\"contents\">\n  <button type=\"submit\" class=\"btn btn-default btn-danger\" (click)=\"restoreFile()\">Restore</button>\n    <p>Mime: {{file.mime}}</p>\n    <p>Size: {{file.size | bytes}}</p>\n  </div>\n</div>\n"

/***/ }),

/***/ 738:
/***/ (function(module, exports) {

module.exports = "<div class=\"folder\">\n  <ul class=\"header\" (click)=\"toggleOpen()\">\n    <li><div *ngIf=\"open\" class=\"glyphicon glyphicon-folder-open\"></div></li>\n    <li><div *ngIf=\"!open\" class=\"glyphicon glyphicon-folder-close\"></div></li>\n    <li><p>{{folder.path}}</p></li>\n  </ul>\n  <div *ngIf=\"open && files\" class=\"contents\">\n    <file *ngFor=\"let file of files; let i = index\" [file]=\"file\" [even]=\"i % 2 == 0\"></file>\n  </div>\n</div>\n"

/***/ }),

/***/ 739:
/***/ (function(module, exports) {

module.exports = "<div [style.width.px]=\"size\" [style.height.px]=\"size\" class=\"container\">\n  <img class=\"spinner\" src=\"img/spinner.png\">\n</div>\n"

/***/ }),

/***/ 740:
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-default navbar-fixed\">\n  <div class=\"container-fluid\">\n    <div class=\"navbar-header\">\n      <a class=\"navbar-brand\" [routerLink]=\"['home']\">SEKure Archive</a>\n    </div>\n    <div class=\"nav navbar-right\">\n      <p class=\"navbar-text\">Logged in as: {{username}}</p>\n      <button type=\"submit\" class=\"btn btn-default btn-danger\" (click)=\"logout()\">Logout</button>\n    </div>\n  </div>\n</nav>\n\n<!-- SPINNNER for Loading -->\n<spinner *ngIf=\"working\" [size]=\"96\"></spinner>\n<!-- Container for folder and files -->\n<div class = \"container\">\n  <div class=\"text-center\">\n    <div *ngIf=\"flash.error\" class=\"alert alert-danger\" role=\"alert\" (click)=\"flash.error = null\">\n      <a class=\"close\" data-dismiss=\"alert\" aria-label=\"close\">&times;</a>\n      <b>Error:</b> {{flash.error}}\n    </div>\n    <div *ngIf=\"flash.notification\" class=\"alert alert-info\" role=\"alert\" (click)=\"flash.notification = null\">\n      <a class=\"close\" data-dismiss=\"alert\" aria-label=\"close\">&times;</a>\n      {{flash.notification}}\n    </div>\n    <h3>Folders</h3>\n    <folder *ngFor=\"let folder of folders\" [folder]=\"folder\"></folder>\n  </div>\n</div>\n"

/***/ }),

/***/ 741:
/***/ (function(module, exports) {

module.exports = "<div class=\"main\">\n  <div class=\"wrapper\">\n    <div class=\"well\">\n      <spinner *ngIf=\"working\" [size]=\"96\"></spinner>\n      <h2>{{showLogin? \"Login\" : \"Sign Up\"}}</h2>\n      <form role=\"form\">\n        <div class=\"form-group\">\n          <label for=\"username\">Username</label>\n          <input [disabled]=\"working\" type=\"text\" #username class=\"form-control\" id=\"username\" placeholder=\"Username\">\n          <div *ngIf=\"usernameError\" class=\"alert alert-danger\" role=\"alert\"><b>Error:</b> {{usernameError}}</div>\n        </div>\n        <div class=\"form-group\">\n          <label for=\"password\">Password</label>\n          <input [disabled]=\"working\" type=\"password\" #password class=\"form-control\" id=\"password\" placeholder=\"Password\">\n          <div *ngIf=\"passwordError\" class=\"alert alert-danger\" role=\"alert\"><b>Error:</b> {{passwordError}}</div>\n        </div>\n        <a [class.disabled]=\"working\" class=\"btn btn-default\" (click)=\"toggleLogin()\">{{showLogin? \"Sign Up\" : \"Login\"}}</a>\n        <a [class.disabled]=\"working\" class=\"btn btn-success pull-right\" (click)=\"submitForm()\">{{showLogin? \"Login\" : \"Sign Up\"}}</a>\n        <div class=\"clearfix\"></div>\n      </form>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ 779:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 780:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(401);


/***/ })

},[780]);
//# sourceMappingURL=main.bundle.js.map