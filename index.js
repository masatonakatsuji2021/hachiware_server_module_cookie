/**
 * ============================================================================================
 * Hachiware_Server_module_cookie
 * 
 * Cookie management module for the web server package "hachiware_server".
 * 
 * License : MIT License. 
 * Since   : 2022.01.22
 * Author  : Nakatsuji Masato 
 * Email   : nakatsuji@teastalk.jp
 * HP URL  : https://hachiware-js.com/
 * GitHub  : https://github.com/masatonakatsuji2021/Hachiware_Server_module_cookie
 * npm     : https://www.npmjs.com/package/Hachiware_Server_module_cookie 
 * ============================================================================================
 */

/**
 * hachiware_server_module_cookie
 * 
 * Hachiware_server module for managing cookies
 * 
 * @param {*} conf 
 * @param {*} context 
 */
module.exports = function(conf, context){

    /**
     * get
     * Get cookie information
     * @param {ServerRequest} req Server request object
     * @param {string} name Acquisition cookie name
     * @returns {*} Get cookie value
     */
    this.get = function(req, name){
        var buff = req.headers.cookie;

        if(!buff){
            return;
        }

        buff = buff.split("; ");

        var cookie = {};
        for(var n = 0 ; n < buff.length ; n++){
            var b_ = buff[n].split("=");
            cookie[b_[0]] = b_[1];
        }

        if(name){
            if(cookie[name]){
                return cookie[name];
            }
            else{
                return;
            }
        }
        else{
            return cookie;
        }
    };

    /**
     * set
     * GeSend cookie information
     * @param {ServerResponse} res Server response object
     * @param {string} name Saved cookie name
     * @param {string} value Saved cookie value 
     * @param {Option} option Option setting
     */
    this.set = function(res, name ,value, option){

        if(!option){
            option = {};
        }

        var cookieValue = name + "=" + value + "; ";

        var expires = "";
        if(option.limit){
            var nowDate = new Date();
            nowDate.setTime(nowDate.getTime() + option.limit * 1000);
            var limitStr = nowDate.toGMTString();
            var expires = "expires=" + limitStr + "; ";
        }

        var path = "";
        if(option.path){
            path = "path=" + option.path;
        }

        var cstr = cookieValue + expires + path;

        res.setHeader("Set-Cookie",cstr);
    };


    this.delete = function(req, name){


    };

    this.frameworkAdapter = function(req, res){

        var vm = this;

        var cookie = function(req, res){

            /**
             * get
             * Get cookie information
             * @param {string} name Acquisition cookie name
             * @returns {*} Get cookie value
             */
            this.get = function(name){
                return vm.get(req,name);
            };

            /**
             * set
             * GeSend cookie information
             * @param {string} name Saved cookie name
             * @param {string} value Saved cookie value 
             * @param {Option} option Option setting
             * @returns
             */
            this.set = function(name, value, option){  
                return vm.set(res, name, value, option);
            };

            /**
             * delete
             * Delete cookie information
             * @param {string} name Deleted cookie name 
             * @returns 
             */
            this.delete = function(name){
                return vm.set(res, name, value, option);
            };
        };

        return new cookie(req, res);
    };

};