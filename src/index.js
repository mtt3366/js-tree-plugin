(function () {
    // 插件核心:OOP的模式，可以创建单独的实例，这样实现私有属性和公有方法的有效管理
    class zTree {
        constructor(element, options) {
            // init params
            let self = this,
                len = arguments.length,
                config = {//声明默认的参数
                    element: null,
                    data: null,
                    callback: function () {}
                };
            //通过判断参数长度,来完成两种不同的调用方式
            if (len === 0) throw new Error(`element or options are required!`);
            if (len === 1) options = element;
            if (!options || typeof options !== "object") throw new TypeError(`options must be an object!`);
            if (len === 2) options.element = element;
            //合并配置
            config = Object.assign(config, options);

            //校验参数格式进
            // verify the format of the transmitted information
            let {
                element: element2,
                data,
                callback
            } = config;
            if (!element2 || element2.nodeType !== 1) throw new TypeError(`element must be a DOM element object`);
            if (!Array.isArray(data)) throw new TypeError(`data must be an array!`);
            if (typeof callback !== "function") throw new TypeError(`callback must be an function!`);

            //mount to instance
            //把config挂载到当前实例上
            self.element = element2;
            self.data = data;
            self.callback = callback;

            self.n = 0;

            // init
            self.init();
        }
        init() {
            let self = this;
            self.element.innerHTML = `<ul class="level level0">
                ${self.html(self.data)}
            </ul>`;
            self.handle();
        }
        // dynamic creation of DOM structure
        //递归创建DOM结构
        html(data) {
            let self = this,
                str = ``;
            self.n++;
            data.forEach(item => {
                let {
                    name,
                    children,
                    open
                } = item;
                str += `<li>
                    <a href="#" class="title">${name}</a>
                    ${children && children.length>0?`
                        <em class="icon ${open?'open':''}"></em>
                        <ul class="level level${self.n}" style="display:${open?'block':'none'}">
                            ${self.html(children)}
                        </ul>
                    `:``}
                </li>`;
            });
            self.n--;
            return str;
        }
        // achieve specific functions
        //使用事件委托进行事件绑定
        handle() {
            let self = this;
            self.element.addEventListener('click', function (ev) {
                let target = ev.target;
                if (target.tagName === 'EM') {
                    let ulBox = target.nextElementSibling,
                        isOpen = target.classList.contains('open');
                    if (!ulBox) return;
                    if (isOpen) {
                        ulBox.style.display = 'none';
                        target.classList.remove('open');
                        self.callback(self, target, ulBox);
                        return;
                    }
                    ulBox.style.display = 'block';
                    target.classList.add('open');
                    self.callback(self, target, ulBox);
                }
            });
        }
    }

    // 暴露API
    if (typeof window !== "undefined") {
        window.zTree = zTree;
    }
    //支持两种导入规范
    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = zTree;
    }
})();