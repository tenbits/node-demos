!function() {
    var _ = function(_) {
        _.defaults = function(object) {
            if (!object) return object;
            for (var argsIndex = 1, argsLength = arguments.length; argsIndex < argsLength; argsIndex++) {
                var iterable = arguments[argsIndex];
                if (iterable) for (var key in iterable) if (null == object[key]) object[key] = iterable[key];
            }
            return object;
        };
        _.templateSettings = {
            evaluate: /<%([\s\S]+?)%>/g,
            interpolate: /<%=([\s\S]+?)%>/g,
            escape: /<%-([\s\S]+?)%>/g
        };
        var noMatch = /(.)^/;
        var escapes = {
            "'": "'",
            "\\": "\\",
            "\r": "r",
            "\n": "n",
            "	": "t",
            "\u2028": "u2028",
            "\u2029": "u2029"
        };
        var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;
        _.template = function(text, data, settings) {
            var render;
            settings = _.defaults({}, settings, _.templateSettings);
            var matcher = new RegExp([ (settings.escape || noMatch).source, (settings.interpolate || noMatch).source, (settings.evaluate || noMatch).source ].join("|") + "|$", "g");
            var index = 0;
            var source = "__p+='";
            text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
                source += text.slice(index, offset).replace(escaper, function(match) {
                    return "\\" + escapes[match];
                });
                if (escape) source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
                if (interpolate) source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
                if (evaluate) source += "';\n" + evaluate + "\n__p+='";
                index = offset + match.length;
                return match;
            });
            source += "';\n";
            if (!settings.variable) source = "with(obj||{}){\n" + source + "}\n";
            source = "var __t,__p='',__j=Array.prototype.join," + "print=function(){__p+=__j.call(arguments,'');};\n" + source + "return __p;\n";
            try {
                render = new Function(settings.variable || "obj", "_", source);
            } catch (e) {
                e.source = source;
                throw e;
            }
            if (data) return render(data, _);
            var template = function(data) {
                return render.call(this, data, _);
            };
            template.source = "function(" + (settings.variable || "obj") + "){\n" + source + "}";
            return template;
        };
        return _;
    }({});
    if ("todomvc.com" === location.hostname) {
        window._gaq = [ [ "_setAccount", "UA-31081062-1" ], [ "_trackPageview" ] ];
        !function(d, t) {
            var g = d.createElement(t), s = d.getElementsByTagName(t)[0];
            g.src = "//www.google-analytics.com/ga.js";
            s.parentNode.insertBefore(g, s);
        }(document, "script");
    }
    function redirect() {
        if ("tastejs.github.io" === location.hostname) location.href = location.href.replace("tastejs.github.io/todomvc", "todomvc.com");
    }
    function findRoot() {
        var base;
        [ /labs/, /\w*-examples/ ].forEach(function(href) {
            var match = location.href.match(href);
            if (!base && match) base = location.href.indexOf(match);
        });
        return location.href.substr(0, base);
    }
    function getFile(file, callback) {
        if (!location.host) return console.info("Miss the info bar? Run TodoMVC from a server to avoid a cross-origin error.");
        var xhr = new XMLHttpRequest();
        xhr.open("GET", findRoot() + file, true);
        xhr.send();
        xhr.onload = function() {
            if (200 === xhr.status && callback) callback(xhr.responseText);
        };
    }
    function Learn(learnJSON, config) {
        if (!(this instanceof Learn)) return new Learn(learnJSON, config);
        var template, framework;
        if ("object" !== typeof learnJSON) try {
            learnJSON = JSON.parse(learnJSON);
        } catch (e) {
            return;
        }
        if (config) {
            template = config.template;
            framework = config.framework;
        }
        if (!template && learnJSON.templates) template = learnJSON.templates.todomvc;
        if (!framework && document.querySelector("[data-framework]")) framework = document.querySelector("[data-framework]").getAttribute("data-framework");
        if (template && learnJSON[framework]) {
            this.frameworkJSON = learnJSON[framework];
            this.template = template;
            this.append();
        }
    }
    Learn.prototype.append = function() {
        var aside = document.createElement("aside");
        aside.innerHTML = _.template(this.template, this.frameworkJSON);
        aside.className = "learn";
        var demoLinks = aside.querySelectorAll(".demo-link");
        Array.prototype.forEach.call(demoLinks, function(demoLink) {
            demoLink.setAttribute("href", findRoot() + demoLink.getAttribute("href"));
        });
        document.body.className = (document.body.className + " learn-bar").trim();
        document.body.insertAdjacentHTML("afterBegin", aside.outerHTML);
    };
    redirect();
    getFile("learn.json", Learn);
}();

/*!
 * jQuery JavaScript Library v2.0.3
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2013-07-03T13:30Z
 */
!function(window, undefined) {
    var rootjQuery, readyList, core_strundefined = typeof undefined, location = window.location, document = window.document, docElem = document.documentElement, _jQuery = window.jQuery, _$ = window.$, class2type = {}, core_deletedIds = [], core_version = "2.0.3", core_concat = core_deletedIds.concat, core_push = core_deletedIds.push, core_slice = core_deletedIds.slice, core_indexOf = core_deletedIds.indexOf, core_toString = class2type.toString, core_hasOwn = class2type.hasOwnProperty, core_trim = core_version.trim, jQuery = function(selector, context) {
        return new jQuery.fn.init(selector, context, rootjQuery);
    }, core_pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, core_rnotwhite = /\S+/g, rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, rmsPrefix = /^-ms-/, rdashAlpha = /-([\da-z])/gi, fcamelCase = function(all, letter) {
        return letter.toUpperCase();
    }, completed = function() {
        document.removeEventListener("DOMContentLoaded", completed, false);
        window.removeEventListener("load", completed, false);
        jQuery.ready();
    };
    jQuery.fn = jQuery.prototype = {
        jquery: core_version,
        constructor: jQuery,
        init: function(selector, context, rootjQuery) {
            var match, elem;
            if (!selector) return this;
            if ("string" === typeof selector) {
                if ("<" === selector.charAt(0) && ">" === selector.charAt(selector.length - 1) && selector.length >= 3) match = [ null, selector, null ]; else match = rquickExpr.exec(selector);
                if (match && (match[1] || !context)) if (match[1]) {
                    context = context instanceof jQuery ? context[0] : context;
                    jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, true));
                    if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) for (match in context) if (jQuery.isFunction(this[match])) this[match](context[match]); else this.attr(match, context[match]);
                    return this;
                } else {
                    elem = document.getElementById(match[2]);
                    if (elem && elem.parentNode) {
                        this.length = 1;
                        this[0] = elem;
                    }
                    this.context = document;
                    this.selector = selector;
                    return this;
                } else if (!context || context.jquery) return (context || rootjQuery).find(selector); else return this.constructor(context).find(selector);
            } else if (selector.nodeType) {
                this.context = this[0] = selector;
                this.length = 1;
                return this;
            } else if (jQuery.isFunction(selector)) return rootjQuery.ready(selector);
            if (selector.selector !== undefined) {
                this.selector = selector.selector;
                this.context = selector.context;
            }
            return jQuery.makeArray(selector, this);
        },
        selector: "",
        length: 0,
        toArray: function() {
            return core_slice.call(this);
        },
        get: function(num) {
            return null == num ? this.toArray() : num < 0 ? this[this.length + num] : this[num];
        },
        pushStack: function(elems) {
            var ret = jQuery.merge(this.constructor(), elems);
            ret.prevObject = this;
            ret.context = this.context;
            return ret;
        },
        each: function(callback, args) {
            return jQuery.each(this, callback, args);
        },
        ready: function(fn) {
            jQuery.ready.promise().done(fn);
            return this;
        },
        slice: function() {
            return this.pushStack(core_slice.apply(this, arguments));
        },
        first: function() {
            return this.eq(0);
        },
        last: function() {
            return this.eq(-1);
        },
        eq: function(i) {
            var len = this.length, j = +i + (i < 0 ? len : 0);
            return this.pushStack(j >= 0 && j < len ? [ this[j] ] : []);
        },
        map: function(callback) {
            return this.pushStack(jQuery.map(this, function(elem, i) {
                return callback.call(elem, i, elem);
            }));
        },
        end: function() {
            return this.prevObject || this.constructor(null);
        },
        push: core_push,
        sort: [].sort,
        splice: [].splice
    };
    jQuery.fn.init.prototype = jQuery.fn;
    jQuery.extend = jQuery.fn.extend = function() {
        var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = false;
        if ("boolean" === typeof target) {
            deep = target;
            target = arguments[1] || {};
            i = 2;
        }
        if ("object" !== typeof target && !jQuery.isFunction(target)) target = {};
        if (length === i) {
            target = this;
            --i;
        }
        for (;i < length; i++) if (null != (options = arguments[i])) for (name in options) {
            src = target[name];
            copy = options[name];
            if (target === copy) continue;
            if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
                if (copyIsArray) {
                    copyIsArray = false;
                    clone = src && jQuery.isArray(src) ? src : [];
                } else clone = src && jQuery.isPlainObject(src) ? src : {};
                target[name] = jQuery.extend(deep, clone, copy);
            } else if (copy !== undefined) target[name] = copy;
        }
        return target;
    };
    jQuery.extend({
        expando: "jQuery" + (core_version + Math.random()).replace(/\D/g, ""),
        noConflict: function(deep) {
            if (window.$ === jQuery) window.$ = _$;
            if (deep && window.jQuery === jQuery) window.jQuery = _jQuery;
            return jQuery;
        },
        isReady: false,
        readyWait: 1,
        holdReady: function(hold) {
            if (hold) jQuery.readyWait++; else jQuery.ready(true);
        },
        ready: function(wait) {
            if (true === wait ? --jQuery.readyWait : jQuery.isReady) return;
            jQuery.isReady = true;
            if (true !== wait && --jQuery.readyWait > 0) return;
            readyList.resolveWith(document, [ jQuery ]);
            if (jQuery.fn.trigger) jQuery(document).trigger("ready").off("ready");
        },
        isFunction: function(obj) {
            return "function" === jQuery.type(obj);
        },
        isArray: Array.isArray,
        isWindow: function(obj) {
            return null != obj && obj === obj.window;
        },
        isNumeric: function(obj) {
            return !isNaN(parseFloat(obj)) && isFinite(obj);
        },
        type: function(obj) {
            if (null == obj) return String(obj);
            return "object" === typeof obj || "function" === typeof obj ? class2type[core_toString.call(obj)] || "object" : typeof obj;
        },
        isPlainObject: function(obj) {
            if ("object" !== jQuery.type(obj) || obj.nodeType || jQuery.isWindow(obj)) return false;
            try {
                if (obj.constructor && !core_hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) return false;
            } catch (e) {
                return false;
            }
            return true;
        },
        isEmptyObject: function(obj) {
            var name;
            for (name in obj) return false;
            return true;
        },
        error: function(msg) {
            throw new Error(msg);
        },
        parseHTML: function(data, context, keepScripts) {
            if (!data || "string" !== typeof data) return null;
            if ("boolean" === typeof context) {
                keepScripts = context;
                context = false;
            }
            context = context || document;
            var parsed = rsingleTag.exec(data), scripts = !keepScripts && [];
            if (parsed) return [ context.createElement(parsed[1]) ];
            parsed = jQuery.buildFragment([ data ], context, scripts);
            if (scripts) jQuery(scripts).remove();
            return jQuery.merge([], parsed.childNodes);
        },
        parseJSON: JSON.parse,
        parseXML: function(data) {
            var xml, tmp;
            if (!data || "string" !== typeof data) return null;
            try {
                tmp = new DOMParser();
                xml = tmp.parseFromString(data, "text/xml");
            } catch (e) {
                xml = undefined;
            }
            if (!xml || xml.getElementsByTagName("parsererror").length) jQuery.error("Invalid XML: " + data);
            return xml;
        },
        noop: function() {},
        globalEval: function(code) {
            var script, indirect = eval;
            code = jQuery.trim(code);
            if (code) if (1 === code.indexOf("use strict")) {
                script = document.createElement("script");
                script.text = code;
                document.head.appendChild(script).parentNode.removeChild(script);
            } else indirect(code);
        },
        camelCase: function(string) {
            return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
        },
        nodeName: function(elem, name) {
            return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
        },
        each: function(obj, callback, args) {
            var value, i = 0, length = obj.length, isArray = isArraylike(obj);
            if (args) if (isArray) for (;i < length; i++) {
                value = callback.apply(obj[i], args);
                if (false === value) break;
            } else for (i in obj) {
                value = callback.apply(obj[i], args);
                if (false === value) break;
            } else if (isArray) for (;i < length; i++) {
                value = callback.call(obj[i], i, obj[i]);
                if (false === value) break;
            } else for (i in obj) {
                value = callback.call(obj[i], i, obj[i]);
                if (false === value) break;
            }
            return obj;
        },
        trim: function(text) {
            return null == text ? "" : core_trim.call(text);
        },
        makeArray: function(arr, results) {
            var ret = results || [];
            if (null != arr) if (isArraylike(Object(arr))) jQuery.merge(ret, "string" === typeof arr ? [ arr ] : arr); else core_push.call(ret, arr);
            return ret;
        },
        inArray: function(elem, arr, i) {
            return null == arr ? -1 : core_indexOf.call(arr, elem, i);
        },
        merge: function(first, second) {
            var l = second.length, i = first.length, j = 0;
            if ("number" === typeof l) for (;j < l; j++) first[i++] = second[j]; else while (second[j] !== undefined) first[i++] = second[j++];
            first.length = i;
            return first;
        },
        grep: function(elems, callback, inv) {
            var retVal, ret = [], i = 0, length = elems.length;
            inv = !!inv;
            for (;i < length; i++) {
                retVal = !!callback(elems[i], i);
                if (inv !== retVal) ret.push(elems[i]);
            }
            return ret;
        },
        map: function(elems, callback, arg) {
            var value, i = 0, length = elems.length, isArray = isArraylike(elems), ret = [];
            if (isArray) for (;i < length; i++) {
                value = callback(elems[i], i, arg);
                if (null != value) ret[ret.length] = value;
            } else for (i in elems) {
                value = callback(elems[i], i, arg);
                if (null != value) ret[ret.length] = value;
            }
            return core_concat.apply([], ret);
        },
        guid: 1,
        proxy: function(fn, context) {
            var tmp, args, proxy;
            if ("string" === typeof context) {
                tmp = fn[context];
                context = fn;
                fn = tmp;
            }
            if (!jQuery.isFunction(fn)) return undefined;
            args = core_slice.call(arguments, 2);
            proxy = function() {
                return fn.apply(context || this, args.concat(core_slice.call(arguments)));
            };
            proxy.guid = fn.guid = fn.guid || jQuery.guid++;
            return proxy;
        },
        access: function(elems, fn, key, value, chainable, emptyGet, raw) {
            var i = 0, length = elems.length, bulk = null == key;
            if ("object" === jQuery.type(key)) {
                chainable = true;
                for (i in key) jQuery.access(elems, fn, i, key[i], true, emptyGet, raw);
            } else if (value !== undefined) {
                chainable = true;
                if (!jQuery.isFunction(value)) raw = true;
                if (bulk) if (raw) {
                    fn.call(elems, value);
                    fn = null;
                } else {
                    bulk = fn;
                    fn = function(elem, key, value) {
                        return bulk.call(jQuery(elem), value);
                    };
                }
                if (fn) for (;i < length; i++) fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
            }
            return chainable ? elems : bulk ? fn.call(elems) : length ? fn(elems[0], key) : emptyGet;
        },
        now: Date.now,
        swap: function(elem, options, callback, args) {
            var ret, name, old = {};
            for (name in options) {
                old[name] = elem.style[name];
                elem.style[name] = options[name];
            }
            ret = callback.apply(elem, args || []);
            for (name in options) elem.style[name] = old[name];
            return ret;
        }
    });
    jQuery.ready.promise = function(obj) {
        if (!readyList) {
            readyList = jQuery.Deferred();
            if ("complete" === document.readyState) setTimeout(jQuery.ready); else {
                document.addEventListener("DOMContentLoaded", completed, false);
                window.addEventListener("load", completed, false);
            }
        }
        return readyList.promise(obj);
    };
    jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
        class2type["[object " + name + "]"] = name.toLowerCase();
    });
    function isArraylike(obj) {
        var length = obj.length, type = jQuery.type(obj);
        if (jQuery.isWindow(obj)) return false;
        if (1 === obj.nodeType && length) return true;
        return "array" === type || "function" !== type && (0 === length || "number" === typeof length && length > 0 && length - 1 in obj);
    }
    rootjQuery = jQuery(document);
    /*!
 * Sizzle CSS Selector Engine v1.9.4-pre
 * http://sizzlejs.com/
 *
 * Copyright 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2013-06-03
 */
    !function(window, undefined) {
        var i, support, cachedruns, Expr, getText, isXML, compile, outermostContext, sortInput, setDocument, document, docElem, documentIsHTML, rbuggyQSA, rbuggyMatches, matches, contains, expando = "sizzle" + -new Date(), preferredDoc = window.document, dirruns = 0, done = 0, classCache = createCache(), tokenCache = createCache(), compilerCache = createCache(), hasDuplicate = false, sortOrder = function(a, b) {
            if (a === b) {
                hasDuplicate = true;
                return 0;
            }
            return 0;
        }, strundefined = typeof undefined, MAX_NEGATIVE = 1 << 31, hasOwn = {}.hasOwnProperty, arr = [], pop = arr.pop, push_native = arr.push, push = arr.push, slice = arr.slice, indexOf = arr.indexOf || function(elem) {
            var i = 0, len = this.length;
            for (;i < len; i++) if (this[i] === elem) return i;
            return -1;
        }, booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", whitespace = "[\\x20\\t\\r\\n\\f]", characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", identifier = characterEncoding.replace("w", "w#"), attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace + "*(?:([*^$|!~]?=)" + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]", pseudos = ":(" + characterEncoding + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + attributes.replace(3, 8) + ")*)|.*)\\)|)", rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"), rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"), rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"), rsibling = new RegExp(whitespace + "*[+~]"), rattributeQuotes = new RegExp("=" + whitespace + "*([^\\]'\"]*)" + whitespace + "*\\]", "g"), rpseudo = new RegExp(pseudos), ridentifier = new RegExp("^" + identifier + "$"), matchExpr = {
            ID: new RegExp("^#(" + characterEncoding + ")"),
            CLASS: new RegExp("^\\.(" + characterEncoding + ")"),
            TAG: new RegExp("^(" + characterEncoding.replace("w", "w*") + ")"),
            ATTR: new RegExp("^" + attributes),
            PSEUDO: new RegExp("^" + pseudos),
            CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
            bool: new RegExp("^(?:" + booleans + ")$", "i"),
            needsContext: new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
        }, rnative = /^[^{]+\{\s*\[native \w/, rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, rinputs = /^(?:input|select|textarea|button)$/i, rheader = /^h\d$/i, rescape = /'|\\/g, runescape = new RegExp("\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig"), funescape = function(_, escaped, escapedWhitespace) {
            var high = "0x" + escaped - 65536;
            return high !== high || escapedWhitespace ? escaped : high < 0 ? String.fromCharCode(high + 65536) : String.fromCharCode(high >> 10 | 55296, 1023 & high | 56320);
        };
        try {
            push.apply(arr = slice.call(preferredDoc.childNodes), preferredDoc.childNodes);
            arr[preferredDoc.childNodes.length].nodeType;
        } catch (e) {
            push = {
                apply: arr.length ? function(target, els) {
                    push_native.apply(target, slice.call(els));
                } : function(target, els) {
                    var j = target.length, i = 0;
                    while (target[j++] = els[i++]) ;
                    target.length = j - 1;
                }
            };
        }
        function Sizzle(selector, context, results, seed) {
            var match, elem, m, nodeType, i, groups, old, nid, newContext, newSelector;
            if ((context ? context.ownerDocument || context : preferredDoc) !== document) setDocument(context);
            context = context || document;
            results = results || [];
            if (!selector || "string" !== typeof selector) return results;
            if (1 !== (nodeType = context.nodeType) && 9 !== nodeType) return [];
            if (documentIsHTML && !seed) {
                if (match = rquickExpr.exec(selector)) if (m = match[1]) {
                    if (9 === nodeType) {
                        elem = context.getElementById(m);
                        if (elem && elem.parentNode) {
                            if (elem.id === m) {
                                results.push(elem);
                                return results;
                            }
                        } else return results;
                    } else if (context.ownerDocument && (elem = context.ownerDocument.getElementById(m)) && contains(context, elem) && elem.id === m) {
                        results.push(elem);
                        return results;
                    }
                } else if (match[2]) {
                    push.apply(results, context.getElementsByTagName(selector));
                    return results;
                } else if ((m = match[3]) && support.getElementsByClassName && context.getElementsByClassName) {
                    push.apply(results, context.getElementsByClassName(m));
                    return results;
                }
                if (support.qsa && (!rbuggyQSA || !rbuggyQSA.test(selector))) {
                    nid = old = expando;
                    newContext = context;
                    newSelector = 9 === nodeType && selector;
                    if (1 === nodeType && "object" !== context.nodeName.toLowerCase()) {
                        groups = tokenize(selector);
                        if (old = context.getAttribute("id")) nid = old.replace(rescape, "\\$&"); else context.setAttribute("id", nid);
                        nid = "[id='" + nid + "'] ";
                        i = groups.length;
                        while (i--) groups[i] = nid + toSelector(groups[i]);
                        newContext = rsibling.test(selector) && context.parentNode || context;
                        newSelector = groups.join(",");
                    }
                    if (newSelector) try {
                        push.apply(results, newContext.querySelectorAll(newSelector));
                        return results;
                    } catch (qsaError) {} finally {
                        if (!old) context.removeAttribute("id");
                    }
                }
            }
            return select(selector.replace(rtrim, "$1"), context, results, seed);
        }
        function createCache() {
            var keys = [];
            function cache(key, value) {
                if (keys.push(key += " ") > Expr.cacheLength) delete cache[keys.shift()];
                return cache[key] = value;
            }
            return cache;
        }
        function markFunction(fn) {
            fn[expando] = true;
            return fn;
        }
        function assert(fn) {
            var div = document.createElement("div");
            try {
                return !!fn(div);
            } catch (e) {
                return false;
            } finally {
                if (div.parentNode) div.parentNode.removeChild(div);
                div = null;
            }
        }
        function addHandle(attrs, handler) {
            var arr = attrs.split("|"), i = attrs.length;
            while (i--) Expr.attrHandle[arr[i]] = handler;
        }
        function siblingCheck(a, b) {
            var cur = b && a, diff = cur && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || MAX_NEGATIVE) - (~a.sourceIndex || MAX_NEGATIVE);
            if (diff) return diff;
            if (cur) while (cur = cur.nextSibling) if (cur === b) return -1;
            return a ? 1 : -1;
        }
        function createInputPseudo(type) {
            return function(elem) {
                var name = elem.nodeName.toLowerCase();
                return "input" === name && elem.type === type;
            };
        }
        function createButtonPseudo(type) {
            return function(elem) {
                var name = elem.nodeName.toLowerCase();
                return ("input" === name || "button" === name) && elem.type === type;
            };
        }
        function createPositionalPseudo(fn) {
            return markFunction(function(argument) {
                argument = +argument;
                return markFunction(function(seed, matches) {
                    var j, matchIndexes = fn([], seed.length, argument), i = matchIndexes.length;
                    while (i--) if (seed[j = matchIndexes[i]]) seed[j] = !(matches[j] = seed[j]);
                });
            });
        }
        isXML = Sizzle.isXML = function(elem) {
            var documentElement = elem && (elem.ownerDocument || elem).documentElement;
            return documentElement ? "HTML" !== documentElement.nodeName : false;
        };
        support = Sizzle.support = {};
        setDocument = Sizzle.setDocument = function(node) {
            var doc = node ? node.ownerDocument || node : preferredDoc, parent = doc.defaultView;
            if (doc === document || 9 !== doc.nodeType || !doc.documentElement) return document;
            document = doc;
            docElem = doc.documentElement;
            documentIsHTML = !isXML(doc);
            if (parent && parent.attachEvent && parent !== parent.top) parent.attachEvent("onbeforeunload", function() {
                setDocument();
            });
            support.attributes = assert(function(div) {
                div.className = "i";
                return !div.getAttribute("className");
            });
            support.getElementsByTagName = assert(function(div) {
                div.appendChild(doc.createComment(""));
                return !div.getElementsByTagName("*").length;
            });
            support.getElementsByClassName = assert(function(div) {
                div.innerHTML = "<div class='a'></div><div class='a i'></div>";
                div.firstChild.className = "i";
                return 2 === div.getElementsByClassName("i").length;
            });
            support.getById = assert(function(div) {
                docElem.appendChild(div).id = expando;
                return !doc.getElementsByName || !doc.getElementsByName(expando).length;
            });
            if (support.getById) {
                Expr.find["ID"] = function(id, context) {
                    if (typeof context.getElementById !== strundefined && documentIsHTML) {
                        var m = context.getElementById(id);
                        return m && m.parentNode ? [ m ] : [];
                    }
                };
                Expr.filter["ID"] = function(id) {
                    var attrId = id.replace(runescape, funescape);
                    return function(elem) {
                        return elem.getAttribute("id") === attrId;
                    };
                };
            } else {
                delete Expr.find["ID"];
                Expr.filter["ID"] = function(id) {
                    var attrId = id.replace(runescape, funescape);
                    return function(elem) {
                        var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
                        return node && node.value === attrId;
                    };
                };
            }
            Expr.find["TAG"] = support.getElementsByTagName ? function(tag, context) {
                if (typeof context.getElementsByTagName !== strundefined) return context.getElementsByTagName(tag);
            } : function(tag, context) {
                var elem, tmp = [], i = 0, results = context.getElementsByTagName(tag);
                if ("*" === tag) {
                    while (elem = results[i++]) if (1 === elem.nodeType) tmp.push(elem);
                    return tmp;
                }
                return results;
            };
            Expr.find["CLASS"] = support.getElementsByClassName && function(className, context) {
                if (typeof context.getElementsByClassName !== strundefined && documentIsHTML) return context.getElementsByClassName(className);
            };
            rbuggyMatches = [];
            rbuggyQSA = [];
            if (support.qsa = rnative.test(doc.querySelectorAll)) {
                assert(function(div) {
                    div.innerHTML = "<select><option selected=''></option></select>";
                    if (!div.querySelectorAll("[selected]").length) rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")");
                    if (!div.querySelectorAll(":checked").length) rbuggyQSA.push(":checked");
                });
                assert(function(div) {
                    var input = doc.createElement("input");
                    input.setAttribute("type", "hidden");
                    div.appendChild(input).setAttribute("t", "");
                    if (div.querySelectorAll("[t^='']").length) rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")");
                    if (!div.querySelectorAll(":enabled").length) rbuggyQSA.push(":enabled", ":disabled");
                    div.querySelectorAll("*,:x");
                    rbuggyQSA.push(",.*:");
                });
            }
            if (support.matchesSelector = rnative.test(matches = docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)) assert(function(div) {
                support.disconnectedMatch = matches.call(div, "div");
                matches.call(div, "[s!='']:x");
                rbuggyMatches.push("!=", pseudos);
            });
            rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));
            rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|"));
            contains = rnative.test(docElem.contains) || docElem.compareDocumentPosition ? function(a, b) {
                var adown = 9 === a.nodeType ? a.documentElement : a, bup = b && b.parentNode;
                return a === bup || !!(bup && 1 === bup.nodeType && (adown.contains ? adown.contains(bup) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(bup)));
            } : function(a, b) {
                if (b) while (b = b.parentNode) if (b === a) return true;
                return false;
            };
            sortOrder = docElem.compareDocumentPosition ? function(a, b) {
                if (a === b) {
                    hasDuplicate = true;
                    return 0;
                }
                var compare = b.compareDocumentPosition && a.compareDocumentPosition && a.compareDocumentPosition(b);
                if (compare) {
                    if (1 & compare || !support.sortDetached && b.compareDocumentPosition(a) === compare) {
                        if (a === doc || contains(preferredDoc, a)) return -1;
                        if (b === doc || contains(preferredDoc, b)) return 1;
                        return sortInput ? indexOf.call(sortInput, a) - indexOf.call(sortInput, b) : 0;
                    }
                    return 4 & compare ? -1 : 1;
                }
                return a.compareDocumentPosition ? -1 : 1;
            } : function(a, b) {
                var cur, i = 0, aup = a.parentNode, bup = b.parentNode, ap = [ a ], bp = [ b ];
                if (a === b) {
                    hasDuplicate = true;
                    return 0;
                } else if (!aup || !bup) return a === doc ? -1 : b === doc ? 1 : aup ? -1 : bup ? 1 : sortInput ? indexOf.call(sortInput, a) - indexOf.call(sortInput, b) : 0; else if (aup === bup) return siblingCheck(a, b);
                cur = a;
                while (cur = cur.parentNode) ap.unshift(cur);
                cur = b;
                while (cur = cur.parentNode) bp.unshift(cur);
                while (ap[i] === bp[i]) i++;
                return i ? siblingCheck(ap[i], bp[i]) : ap[i] === preferredDoc ? -1 : bp[i] === preferredDoc ? 1 : 0;
            };
            return doc;
        };
        Sizzle.matches = function(expr, elements) {
            return Sizzle(expr, null, null, elements);
        };
        Sizzle.matchesSelector = function(elem, expr) {
            if ((elem.ownerDocument || elem) !== document) setDocument(elem);
            expr = expr.replace(rattributeQuotes, "='$1']");
            if (support.matchesSelector && documentIsHTML && (!rbuggyMatches || !rbuggyMatches.test(expr)) && (!rbuggyQSA || !rbuggyQSA.test(expr))) try {
                var ret = matches.call(elem, expr);
                if (ret || support.disconnectedMatch || elem.document && 11 !== elem.document.nodeType) return ret;
            } catch (e) {}
            return Sizzle(expr, document, null, [ elem ]).length > 0;
        };
        Sizzle.contains = function(context, elem) {
            if ((context.ownerDocument || context) !== document) setDocument(context);
            return contains(context, elem);
        };
        Sizzle.attr = function(elem, name) {
            if ((elem.ownerDocument || elem) !== document) setDocument(elem);
            var fn = Expr.attrHandle[name.toLowerCase()], val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : undefined;
            return val === undefined ? support.attributes || !documentIsHTML ? elem.getAttribute(name) : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null : val;
        };
        Sizzle.error = function(msg) {
            throw new Error("Syntax error, unrecognized expression: " + msg);
        };
        Sizzle.uniqueSort = function(results) {
            var elem, duplicates = [], j = 0, i = 0;
            hasDuplicate = !support.detectDuplicates;
            sortInput = !support.sortStable && results.slice(0);
            results.sort(sortOrder);
            if (hasDuplicate) {
                while (elem = results[i++]) if (elem === results[i]) j = duplicates.push(i);
                while (j--) results.splice(duplicates[j], 1);
            }
            return results;
        };
        getText = Sizzle.getText = function(elem) {
            var node, ret = "", i = 0, nodeType = elem.nodeType;
            if (!nodeType) for (;node = elem[i]; i++) ret += getText(node); else if (1 === nodeType || 9 === nodeType || 11 === nodeType) if ("string" === typeof elem.textContent) return elem.textContent; else for (elem = elem.firstChild; elem; elem = elem.nextSibling) ret += getText(elem); else if (3 === nodeType || 4 === nodeType) return elem.nodeValue;
            return ret;
        };
        Expr = Sizzle.selectors = {
            cacheLength: 50,
            createPseudo: markFunction,
            match: matchExpr,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: true
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: true
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(match) {
                    match[1] = match[1].replace(runescape, funescape);
                    match[3] = (match[4] || match[5] || "").replace(runescape, funescape);
                    if ("~=" === match[2]) match[3] = " " + match[3] + " ";
                    return match.slice(0, 4);
                },
                CHILD: function(match) {
                    match[1] = match[1].toLowerCase();
                    if ("nth" === match[1].slice(0, 3)) {
                        if (!match[3]) Sizzle.error(match[0]);
                        match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * ("even" === match[3] || "odd" === match[3]));
                        match[5] = +(match[7] + match[8] || "odd" === match[3]);
                    } else if (match[3]) Sizzle.error(match[0]);
                    return match;
                },
                PSEUDO: function(match) {
                    var excess, unquoted = !match[5] && match[2];
                    if (matchExpr["CHILD"].test(match[0])) return null;
                    if (match[3] && match[4] !== undefined) match[2] = match[4]; else if (unquoted && rpseudo.test(unquoted) && (excess = tokenize(unquoted, true)) && (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {
                        match[0] = match[0].slice(0, excess);
                        match[2] = unquoted.slice(0, excess);
                    }
                    return match.slice(0, 3);
                }
            },
            filter: {
                TAG: function(nodeNameSelector) {
                    var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
                    return "*" === nodeNameSelector ? function() {
                        return true;
                    } : function(elem) {
                        return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
                    };
                },
                CLASS: function(className) {
                    var pattern = classCache[className + " "];
                    return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function(elem) {
                        return pattern.test("string" === typeof elem.className && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "");
                    });
                },
                ATTR: function(name, operator, check) {
                    return function(elem) {
                        var result = Sizzle.attr(elem, name);
                        if (null == result) return "!=" === operator;
                        if (!operator) return true;
                        result += "";
                        return "=" === operator ? result === check : "!=" === operator ? result !== check : "^=" === operator ? check && 0 === result.indexOf(check) : "*=" === operator ? check && result.indexOf(check) > -1 : "$=" === operator ? check && result.slice(-check.length) === check : "~=" === operator ? (" " + result + " ").indexOf(check) > -1 : "|=" === operator ? result === check || result.slice(0, check.length + 1) === check + "-" : false;
                    };
                },
                CHILD: function(type, what, argument, first, last) {
                    var simple = "nth" !== type.slice(0, 3), forward = "last" !== type.slice(-4), ofType = "of-type" === what;
                    return 1 === first && 0 === last ? function(elem) {
                        return !!elem.parentNode;
                    } : function(elem, context, xml) {
                        var cache, outerCache, node, diff, nodeIndex, start, dir = simple !== forward ? "nextSibling" : "previousSibling", parent = elem.parentNode, name = ofType && elem.nodeName.toLowerCase(), useCache = !xml && !ofType;
                        if (parent) {
                            if (simple) {
                                while (dir) {
                                    node = elem;
                                    while (node = node[dir]) if (ofType ? node.nodeName.toLowerCase() === name : 1 === node.nodeType) return false;
                                    start = dir = "only" === type && !start && "nextSibling";
                                }
                                return true;
                            }
                            start = [ forward ? parent.firstChild : parent.lastChild ];
                            if (forward && useCache) {
                                outerCache = parent[expando] || (parent[expando] = {});
                                cache = outerCache[type] || [];
                                nodeIndex = cache[0] === dirruns && cache[1];
                                diff = cache[0] === dirruns && cache[2];
                                node = nodeIndex && parent.childNodes[nodeIndex];
                                while (node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop()) if (1 === node.nodeType && ++diff && node === elem) {
                                    outerCache[type] = [ dirruns, nodeIndex, diff ];
                                    break;
                                }
                            } else if (useCache && (cache = (elem[expando] || (elem[expando] = {}))[type]) && cache[0] === dirruns) diff = cache[1]; else while (node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop()) if ((ofType ? node.nodeName.toLowerCase() === name : 1 === node.nodeType) && ++diff) {
                                if (useCache) (node[expando] || (node[expando] = {}))[type] = [ dirruns, diff ];
                                if (node === elem) break;
                            }
                            diff -= last;
                            return diff === first || diff % first === 0 && diff / first >= 0;
                        }
                    };
                },
                PSEUDO: function(pseudo, argument) {
                    var args, fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo);
                    if (fn[expando]) return fn(argument);
                    if (fn.length > 1) {
                        args = [ pseudo, pseudo, "", argument ];
                        return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function(seed, matches) {
                            var idx, matched = fn(seed, argument), i = matched.length;
                            while (i--) {
                                idx = indexOf.call(seed, matched[i]);
                                seed[idx] = !(matches[idx] = matched[i]);
                            }
                        }) : function(elem) {
                            return fn(elem, 0, args);
                        };
                    }
                    return fn;
                }
            },
            pseudos: {
                not: markFunction(function(selector) {
                    var input = [], results = [], matcher = compile(selector.replace(rtrim, "$1"));
                    return matcher[expando] ? markFunction(function(seed, matches, context, xml) {
                        var elem, unmatched = matcher(seed, null, xml, []), i = seed.length;
                        while (i--) if (elem = unmatched[i]) seed[i] = !(matches[i] = elem);
                    }) : function(elem, context, xml) {
                        input[0] = elem;
                        matcher(input, null, xml, results);
                        return !results.pop();
                    };
                }),
                has: markFunction(function(selector) {
                    return function(elem) {
                        return Sizzle(selector, elem).length > 0;
                    };
                }),
                contains: markFunction(function(text) {
                    return function(elem) {
                        return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1;
                    };
                }),
                lang: markFunction(function(lang) {
                    if (!ridentifier.test(lang || "")) Sizzle.error("unsupported lang: " + lang);
                    lang = lang.replace(runescape, funescape).toLowerCase();
                    return function(elem) {
                        var elemLang;
                        do if (elemLang = documentIsHTML ? elem.lang : elem.getAttribute("xml:lang") || elem.getAttribute("lang")) {
                            elemLang = elemLang.toLowerCase();
                            return elemLang === lang || 0 === elemLang.indexOf(lang + "-");
                        } while ((elem = elem.parentNode) && 1 === elem.nodeType);
                        return false;
                    };
                }),
                target: function(elem) {
                    var hash = window.location && window.location.hash;
                    return hash && hash.slice(1) === elem.id;
                },
                root: function(elem) {
                    return elem === docElem;
                },
                focus: function(elem) {
                    return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
                },
                enabled: function(elem) {
                    return false === elem.disabled;
                },
                disabled: function(elem) {
                    return true === elem.disabled;
                },
                checked: function(elem) {
                    var nodeName = elem.nodeName.toLowerCase();
                    return "input" === nodeName && !!elem.checked || "option" === nodeName && !!elem.selected;
                },
                selected: function(elem) {
                    if (elem.parentNode) elem.parentNode.selectedIndex;
                    return true === elem.selected;
                },
                empty: function(elem) {
                    for (elem = elem.firstChild; elem; elem = elem.nextSibling) if (elem.nodeName > "@" || 3 === elem.nodeType || 4 === elem.nodeType) return false;
                    return true;
                },
                parent: function(elem) {
                    return !Expr.pseudos["empty"](elem);
                },
                header: function(elem) {
                    return rheader.test(elem.nodeName);
                },
                input: function(elem) {
                    return rinputs.test(elem.nodeName);
                },
                button: function(elem) {
                    var name = elem.nodeName.toLowerCase();
                    return "input" === name && "button" === elem.type || "button" === name;
                },
                text: function(elem) {
                    var attr;
                    return "input" === elem.nodeName.toLowerCase() && "text" === elem.type && (null == (attr = elem.getAttribute("type")) || attr.toLowerCase() === elem.type);
                },
                first: createPositionalPseudo(function() {
                    return [ 0 ];
                }),
                last: createPositionalPseudo(function(matchIndexes, length) {
                    return [ length - 1 ];
                }),
                eq: createPositionalPseudo(function(matchIndexes, length, argument) {
                    return [ argument < 0 ? argument + length : argument ];
                }),
                even: createPositionalPseudo(function(matchIndexes, length) {
                    var i = 0;
                    for (;i < length; i += 2) matchIndexes.push(i);
                    return matchIndexes;
                }),
                odd: createPositionalPseudo(function(matchIndexes, length) {
                    var i = 1;
                    for (;i < length; i += 2) matchIndexes.push(i);
                    return matchIndexes;
                }),
                lt: createPositionalPseudo(function(matchIndexes, length, argument) {
                    var i = argument < 0 ? argument + length : argument;
                    for (;--i >= 0; ) matchIndexes.push(i);
                    return matchIndexes;
                }),
                gt: createPositionalPseudo(function(matchIndexes, length, argument) {
                    var i = argument < 0 ? argument + length : argument;
                    for (;++i < length; ) matchIndexes.push(i);
                    return matchIndexes;
                })
            }
        };
        Expr.pseudos["nth"] = Expr.pseudos["eq"];
        for (i in {
            radio: true,
            checkbox: true,
            file: true,
            password: true,
            image: true
        }) Expr.pseudos[i] = createInputPseudo(i);
        for (i in {
            submit: true,
            reset: true
        }) Expr.pseudos[i] = createButtonPseudo(i);
        function setFilters() {}
        setFilters.prototype = Expr.filters = Expr.pseudos;
        Expr.setFilters = new setFilters();
        function tokenize(selector, parseOnly) {
            var matched, match, tokens, type, soFar, groups, preFilters, cached = tokenCache[selector + " "];
            if (cached) return parseOnly ? 0 : cached.slice(0);
            soFar = selector;
            groups = [];
            preFilters = Expr.preFilter;
            while (soFar) {
                if (!matched || (match = rcomma.exec(soFar))) {
                    if (match) soFar = soFar.slice(match[0].length) || soFar;
                    groups.push(tokens = []);
                }
                matched = false;
                if (match = rcombinators.exec(soFar)) {
                    matched = match.shift();
                    tokens.push({
                        value: matched,
                        type: match[0].replace(rtrim, " ")
                    });
                    soFar = soFar.slice(matched.length);
                }
                for (type in Expr.filter) if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] || (match = preFilters[type](match)))) {
                    matched = match.shift();
                    tokens.push({
                        value: matched,
                        type: type,
                        matches: match
                    });
                    soFar = soFar.slice(matched.length);
                }
                if (!matched) break;
            }
            return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) : tokenCache(selector, groups).slice(0);
        }
        function toSelector(tokens) {
            var i = 0, len = tokens.length, selector = "";
            for (;i < len; i++) selector += tokens[i].value;
            return selector;
        }
        function addCombinator(matcher, combinator, base) {
            var dir = combinator.dir, checkNonElements = base && "parentNode" === dir, doneName = done++;
            return combinator.first ? function(elem, context, xml) {
                while (elem = elem[dir]) if (1 === elem.nodeType || checkNonElements) return matcher(elem, context, xml);
            } : function(elem, context, xml) {
                var data, cache, outerCache, dirkey = dirruns + " " + doneName;
                if (xml) {
                    while (elem = elem[dir]) if (1 === elem.nodeType || checkNonElements) if (matcher(elem, context, xml)) return true;
                } else while (elem = elem[dir]) if (1 === elem.nodeType || checkNonElements) {
                    outerCache = elem[expando] || (elem[expando] = {});
                    if ((cache = outerCache[dir]) && cache[0] === dirkey) {
                        if (true === (data = cache[1]) || data === cachedruns) return true === data;
                    } else {
                        cache = outerCache[dir] = [ dirkey ];
                        cache[1] = matcher(elem, context, xml) || cachedruns;
                        if (true === cache[1]) return true;
                    }
                }
            };
        }
        function elementMatcher(matchers) {
            return matchers.length > 1 ? function(elem, context, xml) {
                var i = matchers.length;
                while (i--) if (!matchers[i](elem, context, xml)) return false;
                return true;
            } : matchers[0];
        }
        function condense(unmatched, map, filter, context, xml) {
            var elem, newUnmatched = [], i = 0, len = unmatched.length, mapped = null != map;
            for (;i < len; i++) if (elem = unmatched[i]) if (!filter || filter(elem, context, xml)) {
                newUnmatched.push(elem);
                if (mapped) map.push(i);
            }
            return newUnmatched;
        }
        function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
            if (postFilter && !postFilter[expando]) postFilter = setMatcher(postFilter);
            if (postFinder && !postFinder[expando]) postFinder = setMatcher(postFinder, postSelector);
            return markFunction(function(seed, results, context, xml) {
                var temp, i, elem, preMap = [], postMap = [], preexisting = results.length, elems = seed || multipleContexts(selector || "*", context.nodeType ? [ context ] : context, []), matcherIn = preFilter && (seed || !selector) ? condense(elems, preMap, preFilter, context, xml) : elems, matcherOut = matcher ? postFinder || (seed ? preFilter : preexisting || postFilter) ? [] : results : matcherIn;
                if (matcher) matcher(matcherIn, matcherOut, context, xml);
                if (postFilter) {
                    temp = condense(matcherOut, postMap);
                    postFilter(temp, [], context, xml);
                    i = temp.length;
                    while (i--) if (elem = temp[i]) matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);
                }
                if (seed) {
                    if (postFinder || preFilter) {
                        if (postFinder) {
                            temp = [];
                            i = matcherOut.length;
                            while (i--) if (elem = matcherOut[i]) temp.push(matcherIn[i] = elem);
                            postFinder(null, matcherOut = [], temp, xml);
                        }
                        i = matcherOut.length;
                        while (i--) if ((elem = matcherOut[i]) && (temp = postFinder ? indexOf.call(seed, elem) : preMap[i]) > -1) seed[temp] = !(results[temp] = elem);
                    }
                } else {
                    matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut);
                    if (postFinder) postFinder(null, results, matcherOut, xml); else push.apply(results, matcherOut);
                }
            });
        }
        function matcherFromTokens(tokens) {
            var checkContext, matcher, j, len = tokens.length, leadingRelative = Expr.relative[tokens[0].type], implicitRelative = leadingRelative || Expr.relative[" "], i = leadingRelative ? 1 : 0, matchContext = addCombinator(function(elem) {
                return elem === checkContext;
            }, implicitRelative, true), matchAnyContext = addCombinator(function(elem) {
                return indexOf.call(checkContext, elem) > -1;
            }, implicitRelative, true), matchers = [ function(elem, context, xml) {
                return !leadingRelative && (xml || context !== outermostContext) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));
            } ];
            for (;i < len; i++) if (matcher = Expr.relative[tokens[i].type]) matchers = [ addCombinator(elementMatcher(matchers), matcher) ]; else {
                matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);
                if (matcher[expando]) {
                    j = ++i;
                    for (;j < len; j++) if (Expr.relative[tokens[j].type]) break;
                    return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector(tokens.slice(0, i - 1).concat({
                        value: " " === tokens[i - 2].type ? "*" : ""
                    })).replace(rtrim, "$1"), matcher, i < j && matcherFromTokens(tokens.slice(i, j)), j < len && matcherFromTokens(tokens = tokens.slice(j)), j < len && toSelector(tokens));
                }
                matchers.push(matcher);
            }
            return elementMatcher(matchers);
        }
        function matcherFromGroupMatchers(elementMatchers, setMatchers) {
            var matcherCachedRuns = 0, bySet = setMatchers.length > 0, byElement = elementMatchers.length > 0, superMatcher = function(seed, context, xml, results, expandContext) {
                var elem, j, matcher, setMatched = [], matchedCount = 0, i = "0", unmatched = seed && [], outermost = null != expandContext, contextBackup = outermostContext, elems = seed || byElement && Expr.find["TAG"]("*", expandContext && context.parentNode || context), dirrunsUnique = dirruns += null == contextBackup ? 1 : Math.random() || .1;
                if (outermost) {
                    outermostContext = context !== document && context;
                    cachedruns = matcherCachedRuns;
                }
                for (;null != (elem = elems[i]); i++) {
                    if (byElement && elem) {
                        j = 0;
                        while (matcher = elementMatchers[j++]) if (matcher(elem, context, xml)) {
                            results.push(elem);
                            break;
                        }
                        if (outermost) {
                            dirruns = dirrunsUnique;
                            cachedruns = ++matcherCachedRuns;
                        }
                    }
                    if (bySet) {
                        if (elem = !matcher && elem) matchedCount--;
                        if (seed) unmatched.push(elem);
                    }
                }
                matchedCount += i;
                if (bySet && i !== matchedCount) {
                    j = 0;
                    while (matcher = setMatchers[j++]) matcher(unmatched, setMatched, context, xml);
                    if (seed) {
                        if (matchedCount > 0) while (i--) if (!(unmatched[i] || setMatched[i])) setMatched[i] = pop.call(results);
                        setMatched = condense(setMatched);
                    }
                    push.apply(results, setMatched);
                    if (outermost && !seed && setMatched.length > 0 && matchedCount + setMatchers.length > 1) Sizzle.uniqueSort(results);
                }
                if (outermost) {
                    dirruns = dirrunsUnique;
                    outermostContext = contextBackup;
                }
                return unmatched;
            };
            return bySet ? markFunction(superMatcher) : superMatcher;
        }
        compile = Sizzle.compile = function(selector, group) {
            var i, setMatchers = [], elementMatchers = [], cached = compilerCache[selector + " "];
            if (!cached) {
                if (!group) group = tokenize(selector);
                i = group.length;
                while (i--) {
                    cached = matcherFromTokens(group[i]);
                    if (cached[expando]) setMatchers.push(cached); else elementMatchers.push(cached);
                }
                cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));
            }
            return cached;
        };
        function multipleContexts(selector, contexts, results) {
            var i = 0, len = contexts.length;
            for (;i < len; i++) Sizzle(selector, contexts[i], results);
            return results;
        }
        function select(selector, context, results, seed) {
            var i, tokens, token, type, find, match = tokenize(selector);
            if (!seed) if (1 === match.length) {
                tokens = match[0] = match[0].slice(0);
                if (tokens.length > 2 && "ID" === (token = tokens[0]).type && support.getById && 9 === context.nodeType && documentIsHTML && Expr.relative[tokens[1].type]) {
                    context = (Expr.find["ID"](token.matches[0].replace(runescape, funescape), context) || [])[0];
                    if (!context) return results;
                    selector = selector.slice(tokens.shift().value.length);
                }
                i = matchExpr["needsContext"].test(selector) ? 0 : tokens.length;
                while (i--) {
                    token = tokens[i];
                    if (Expr.relative[type = token.type]) break;
                    if (find = Expr.find[type]) if (seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && context.parentNode || context)) {
                        tokens.splice(i, 1);
                        selector = seed.length && toSelector(tokens);
                        if (!selector) {
                            push.apply(results, seed);
                            return results;
                        }
                        break;
                    }
                }
            }
            compile(selector, match)(seed, context, !documentIsHTML, results, rsibling.test(selector));
            return results;
        }
        support.sortStable = expando.split("").sort(sortOrder).join("") === expando;
        support.detectDuplicates = hasDuplicate;
        setDocument();
        support.sortDetached = assert(function(div1) {
            return 1 & div1.compareDocumentPosition(document.createElement("div"));
        });
        if (!assert(function(div) {
            div.innerHTML = "<a href='#'></a>";
            return "#" === div.firstChild.getAttribute("href");
        })) addHandle("type|href|height|width", function(elem, name, isXML) {
            if (!isXML) return elem.getAttribute(name, "type" === name.toLowerCase() ? 1 : 2);
        });
        if (!support.attributes || !assert(function(div) {
            div.innerHTML = "<input/>";
            div.firstChild.setAttribute("value", "");
            return "" === div.firstChild.getAttribute("value");
        })) addHandle("value", function(elem, name, isXML) {
            if (!isXML && "input" === elem.nodeName.toLowerCase()) return elem.defaultValue;
        });
        if (!assert(function(div) {
            return null == div.getAttribute("disabled");
        })) addHandle(booleans, function(elem, name, isXML) {
            var val;
            if (!isXML) return (val = elem.getAttributeNode(name)) && val.specified ? val.value : true === elem[name] ? name.toLowerCase() : null;
        });
        jQuery.find = Sizzle;
        jQuery.expr = Sizzle.selectors;
        jQuery.expr[":"] = jQuery.expr.pseudos;
        jQuery.unique = Sizzle.uniqueSort;
        jQuery.text = Sizzle.getText;
        jQuery.isXMLDoc = Sizzle.isXML;
        jQuery.contains = Sizzle.contains;
    }(window);
    var optionsCache = {};
    function createOptions(options) {
        var object = optionsCache[options] = {};
        jQuery.each(options.match(core_rnotwhite) || [], function(_, flag) {
            object[flag] = true;
        });
        return object;
    }
    jQuery.Callbacks = function(options) {
        options = "string" === typeof options ? optionsCache[options] || createOptions(options) : jQuery.extend({}, options);
        var memory, fired, firing, firingStart, firingLength, firingIndex, list = [], stack = !options.once && [], fire = function(data) {
            memory = options.memory && data;
            fired = true;
            firingIndex = firingStart || 0;
            firingStart = 0;
            firingLength = list.length;
            firing = true;
            for (;list && firingIndex < firingLength; firingIndex++) if (false === list[firingIndex].apply(data[0], data[1]) && options.stopOnFalse) {
                memory = false;
                break;
            }
            firing = false;
            if (list) if (stack) {
                if (stack.length) fire(stack.shift());
            } else if (memory) list = []; else self.disable();
        }, self = {
            add: function() {
                if (list) {
                    var start = list.length;
                    !function add(args) {
                        jQuery.each(args, function(_, arg) {
                            var type = jQuery.type(arg);
                            if ("function" === type) {
                                if (!options.unique || !self.has(arg)) list.push(arg);
                            } else if (arg && arg.length && "string" !== type) add(arg);
                        });
                    }(arguments);
                    if (firing) firingLength = list.length; else if (memory) {
                        firingStart = start;
                        fire(memory);
                    }
                }
                return this;
            },
            remove: function() {
                if (list) jQuery.each(arguments, function(_, arg) {
                    var index;
                    while ((index = jQuery.inArray(arg, list, index)) > -1) {
                        list.splice(index, 1);
                        if (firing) {
                            if (index <= firingLength) firingLength--;
                            if (index <= firingIndex) firingIndex--;
                        }
                    }
                });
                return this;
            },
            has: function(fn) {
                return fn ? jQuery.inArray(fn, list) > -1 : !!(list && list.length);
            },
            empty: function() {
                list = [];
                firingLength = 0;
                return this;
            },
            disable: function() {
                list = stack = memory = undefined;
                return this;
            },
            disabled: function() {
                return !list;
            },
            lock: function() {
                stack = undefined;
                if (!memory) self.disable();
                return this;
            },
            locked: function() {
                return !stack;
            },
            fireWith: function(context, args) {
                if (list && (!fired || stack)) {
                    args = args || [];
                    args = [ context, args.slice ? args.slice() : args ];
                    if (firing) stack.push(args); else fire(args);
                }
                return this;
            },
            fire: function() {
                self.fireWith(this, arguments);
                return this;
            },
            fired: function() {
                return !!fired;
            }
        };
        return self;
    };
    jQuery.extend({
        Deferred: function(func) {
            var tuples = [ [ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ], [ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ], [ "notify", "progress", jQuery.Callbacks("memory") ] ], state = "pending", promise = {
                state: function() {
                    return state;
                },
                always: function() {
                    deferred.done(arguments).fail(arguments);
                    return this;
                },
                then: function() {
                    var fns = arguments;
                    return jQuery.Deferred(function(newDefer) {
                        jQuery.each(tuples, function(i, tuple) {
                            var action = tuple[0], fn = jQuery.isFunction(fns[i]) && fns[i];
                            deferred[tuple[1]](function() {
                                var returned = fn && fn.apply(this, arguments);
                                if (returned && jQuery.isFunction(returned.promise)) returned.promise().done(newDefer.resolve).fail(newDefer.reject).progress(newDefer.notify); else newDefer[action + "With"](this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments);
                            });
                        });
                        fns = null;
                    }).promise();
                },
                promise: function(obj) {
                    return null != obj ? jQuery.extend(obj, promise) : promise;
                }
            }, deferred = {};
            promise.pipe = promise.then;
            jQuery.each(tuples, function(i, tuple) {
                var list = tuple[2], stateString = tuple[3];
                promise[tuple[1]] = list.add;
                if (stateString) list.add(function() {
                    state = stateString;
                }, tuples[1 ^ i][2].disable, tuples[2][2].lock);
                deferred[tuple[0]] = function() {
                    deferred[tuple[0] + "With"](this === deferred ? promise : this, arguments);
                    return this;
                };
                deferred[tuple[0] + "With"] = list.fireWith;
            });
            promise.promise(deferred);
            if (func) func.call(deferred, deferred);
            return deferred;
        },
        when: function(subordinate) {
            var i = 0, resolveValues = core_slice.call(arguments), length = resolveValues.length, remaining = 1 !== length || subordinate && jQuery.isFunction(subordinate.promise) ? length : 0, deferred = 1 === remaining ? subordinate : jQuery.Deferred(), updateFunc = function(i, contexts, values) {
                return function(value) {
                    contexts[i] = this;
                    values[i] = arguments.length > 1 ? core_slice.call(arguments) : value;
                    if (values === progressValues) deferred.notifyWith(contexts, values); else if (!--remaining) deferred.resolveWith(contexts, values);
                };
            }, progressValues, progressContexts, resolveContexts;
            if (length > 1) {
                progressValues = new Array(length);
                progressContexts = new Array(length);
                resolveContexts = new Array(length);
                for (;i < length; i++) if (resolveValues[i] && jQuery.isFunction(resolveValues[i].promise)) resolveValues[i].promise().done(updateFunc(i, resolveContexts, resolveValues)).fail(deferred.reject).progress(updateFunc(i, progressContexts, progressValues)); else --remaining;
            }
            if (!remaining) deferred.resolveWith(resolveContexts, resolveValues);
            return deferred.promise();
        }
    });
    jQuery.support = function(support) {
        var input = document.createElement("input"), fragment = document.createDocumentFragment(), div = document.createElement("div"), select = document.createElement("select"), opt = select.appendChild(document.createElement("option"));
        if (!input.type) return support;
        input.type = "checkbox";
        support.checkOn = "" !== input.value;
        support.optSelected = opt.selected;
        support.reliableMarginRight = true;
        support.boxSizingReliable = true;
        support.pixelPosition = false;
        input.checked = true;
        support.noCloneChecked = input.cloneNode(true).checked;
        select.disabled = true;
        support.optDisabled = !opt.disabled;
        input = document.createElement("input");
        input.value = "t";
        input.type = "radio";
        support.radioValue = "t" === input.value;
        input.setAttribute("checked", "t");
        input.setAttribute("name", "t");
        fragment.appendChild(input);
        support.checkClone = fragment.cloneNode(true).cloneNode(true).lastChild.checked;
        support.focusinBubbles = "onfocusin" in window;
        div.style.backgroundClip = "content-box";
        div.cloneNode(true).style.backgroundClip = "";
        support.clearCloneStyle = "content-box" === div.style.backgroundClip;
        jQuery(function() {
            var container, marginDiv, divReset = "padding:0;margin:0;border:0;display:block;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box", body = document.getElementsByTagName("body")[0];
            if (!body) return;
            container = document.createElement("div");
            container.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px";
            body.appendChild(container).appendChild(div);
            div.innerHTML = "";
            div.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%";
            jQuery.swap(body, null != body.style.zoom ? {
                zoom: 1
            } : {}, function() {
                support.boxSizing = 4 === div.offsetWidth;
            });
            if (window.getComputedStyle) {
                support.pixelPosition = "1%" !== (window.getComputedStyle(div, null) || {}).top;
                support.boxSizingReliable = "4px" === (window.getComputedStyle(div, null) || {
                    width: "4px"
                }).width;
                marginDiv = div.appendChild(document.createElement("div"));
                marginDiv.style.cssText = div.style.cssText = divReset;
                marginDiv.style.marginRight = marginDiv.style.width = "0";
                div.style.width = "1px";
                support.reliableMarginRight = !parseFloat((window.getComputedStyle(marginDiv, null) || {}).marginRight);
            }
            body.removeChild(container);
        });
        return support;
    }({});
    var data_user, data_priv, rbrace = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/, rmultiDash = /([A-Z])/g;
    function Data() {
        Object.defineProperty(this.cache = {}, 0, {
            get: function() {
                return {};
            }
        });
        this.expando = jQuery.expando + Math.random();
    }
    Data.uid = 1;
    Data.accepts = function(owner) {
        return owner.nodeType ? 1 === owner.nodeType || 9 === owner.nodeType : true;
    };
    Data.prototype = {
        key: function(owner) {
            if (!Data.accepts(owner)) return 0;
            var descriptor = {}, unlock = owner[this.expando];
            if (!unlock) {
                unlock = Data.uid++;
                try {
                    descriptor[this.expando] = {
                        value: unlock
                    };
                    Object.defineProperties(owner, descriptor);
                } catch (e) {
                    descriptor[this.expando] = unlock;
                    jQuery.extend(owner, descriptor);
                }
            }
            if (!this.cache[unlock]) this.cache[unlock] = {};
            return unlock;
        },
        set: function(owner, data, value) {
            var prop, unlock = this.key(owner), cache = this.cache[unlock];
            if ("string" === typeof data) cache[data] = value; else if (jQuery.isEmptyObject(cache)) jQuery.extend(this.cache[unlock], data); else for (prop in data) cache[prop] = data[prop];
            return cache;
        },
        get: function(owner, key) {
            var cache = this.cache[this.key(owner)];
            return key === undefined ? cache : cache[key];
        },
        access: function(owner, key, value) {
            var stored;
            if (key === undefined || key && "string" === typeof key && value === undefined) {
                stored = this.get(owner, key);
                return stored !== undefined ? stored : this.get(owner, jQuery.camelCase(key));
            }
            this.set(owner, key, value);
            return value !== undefined ? value : key;
        },
        remove: function(owner, key) {
            var i, name, camel, unlock = this.key(owner), cache = this.cache[unlock];
            if (key === undefined) this.cache[unlock] = {}; else {
                if (jQuery.isArray(key)) name = key.concat(key.map(jQuery.camelCase)); else {
                    camel = jQuery.camelCase(key);
                    if (key in cache) name = [ key, camel ]; else {
                        name = camel;
                        name = name in cache ? [ name ] : name.match(core_rnotwhite) || [];
                    }
                }
                i = name.length;
                while (i--) delete cache[name[i]];
            }
        },
        hasData: function(owner) {
            return !jQuery.isEmptyObject(this.cache[owner[this.expando]] || {});
        },
        discard: function(owner) {
            if (owner[this.expando]) delete this.cache[owner[this.expando]];
        }
    };
    data_user = new Data();
    data_priv = new Data();
    jQuery.extend({
        acceptData: Data.accepts,
        hasData: function(elem) {
            return data_user.hasData(elem) || data_priv.hasData(elem);
        },
        data: function(elem, name, data) {
            return data_user.access(elem, name, data);
        },
        removeData: function(elem, name) {
            data_user.remove(elem, name);
        },
        _data: function(elem, name, data) {
            return data_priv.access(elem, name, data);
        },
        _removeData: function(elem, name) {
            data_priv.remove(elem, name);
        }
    });
    jQuery.fn.extend({
        data: function(key, value) {
            var attrs, name, elem = this[0], i = 0, data = null;
            if (key === undefined) {
                if (this.length) {
                    data = data_user.get(elem);
                    if (1 === elem.nodeType && !data_priv.get(elem, "hasDataAttrs")) {
                        attrs = elem.attributes;
                        for (;i < attrs.length; i++) {
                            name = attrs[i].name;
                            if (0 === name.indexOf("data-")) {
                                name = jQuery.camelCase(name.slice(5));
                                dataAttr(elem, name, data[name]);
                            }
                        }
                        data_priv.set(elem, "hasDataAttrs", true);
                    }
                }
                return data;
            }
            if ("object" === typeof key) return this.each(function() {
                data_user.set(this, key);
            });
            return jQuery.access(this, function(value) {
                var data, camelKey = jQuery.camelCase(key);
                if (elem && value === undefined) {
                    data = data_user.get(elem, key);
                    if (data !== undefined) return data;
                    data = data_user.get(elem, camelKey);
                    if (data !== undefined) return data;
                    data = dataAttr(elem, camelKey, undefined);
                    if (data !== undefined) return data;
                    return;
                }
                this.each(function() {
                    var data = data_user.get(this, camelKey);
                    data_user.set(this, camelKey, value);
                    if (key.indexOf("-") !== -1 && data !== undefined) data_user.set(this, key, value);
                });
            }, null, value, arguments.length > 1, null, true);
        },
        removeData: function(key) {
            return this.each(function() {
                data_user.remove(this, key);
            });
        }
    });
    function dataAttr(elem, key, data) {
        var name;
        if (data === undefined && 1 === elem.nodeType) {
            name = "data-" + key.replace(rmultiDash, "-$1").toLowerCase();
            data = elem.getAttribute(name);
            if ("string" === typeof data) {
                try {
                    data = "true" === data ? true : "false" === data ? false : "null" === data ? null : +data + "" === data ? +data : rbrace.test(data) ? JSON.parse(data) : data;
                } catch (e) {}
                data_user.set(elem, key, data);
            } else data = undefined;
        }
        return data;
    }
    jQuery.extend({
        queue: function(elem, type, data) {
            var queue;
            if (elem) {
                type = (type || "fx") + "queue";
                queue = data_priv.get(elem, type);
                if (data) if (!queue || jQuery.isArray(data)) queue = data_priv.access(elem, type, jQuery.makeArray(data)); else queue.push(data);
                return queue || [];
            }
        },
        dequeue: function(elem, type) {
            type = type || "fx";
            var queue = jQuery.queue(elem, type), startLength = queue.length, fn = queue.shift(), hooks = jQuery._queueHooks(elem, type), next = function() {
                jQuery.dequeue(elem, type);
            };
            if ("inprogress" === fn) {
                fn = queue.shift();
                startLength--;
            }
            if (fn) {
                if ("fx" === type) queue.unshift("inprogress");
                delete hooks.stop;
                fn.call(elem, next, hooks);
            }
            if (!startLength && hooks) hooks.empty.fire();
        },
        _queueHooks: function(elem, type) {
            var key = type + "queueHooks";
            return data_priv.get(elem, key) || data_priv.access(elem, key, {
                empty: jQuery.Callbacks("once memory").add(function() {
                    data_priv.remove(elem, [ type + "queue", key ]);
                })
            });
        }
    });
    jQuery.fn.extend({
        queue: function(type, data) {
            var setter = 2;
            if ("string" !== typeof type) {
                data = type;
                type = "fx";
                setter--;
            }
            if (arguments.length < setter) return jQuery.queue(this[0], type);
            return data === undefined ? this : this.each(function() {
                var queue = jQuery.queue(this, type, data);
                jQuery._queueHooks(this, type);
                if ("fx" === type && "inprogress" !== queue[0]) jQuery.dequeue(this, type);
            });
        },
        dequeue: function(type) {
            return this.each(function() {
                jQuery.dequeue(this, type);
            });
        },
        delay: function(time, type) {
            time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
            type = type || "fx";
            return this.queue(type, function(next, hooks) {
                var timeout = setTimeout(next, time);
                hooks.stop = function() {
                    clearTimeout(timeout);
                };
            });
        },
        clearQueue: function(type) {
            return this.queue(type || "fx", []);
        },
        promise: function(type, obj) {
            var tmp, count = 1, defer = jQuery.Deferred(), elements = this, i = this.length, resolve = function() {
                if (!--count) defer.resolveWith(elements, [ elements ]);
            };
            if ("string" !== typeof type) {
                obj = type;
                type = undefined;
            }
            type = type || "fx";
            while (i--) {
                tmp = data_priv.get(elements[i], type + "queueHooks");
                if (tmp && tmp.empty) {
                    count++;
                    tmp.empty.add(resolve);
                }
            }
            resolve();
            return defer.promise(obj);
        }
    });
    var nodeHook, boolHook, rclass = /[\t\r\n\f]/g, rreturn = /\r/g, rfocusable = /^(?:input|select|textarea|button)$/i;
    jQuery.fn.extend({
        attr: function(name, value) {
            return jQuery.access(this, jQuery.attr, name, value, arguments.length > 1);
        },
        removeAttr: function(name) {
            return this.each(function() {
                jQuery.removeAttr(this, name);
            });
        },
        prop: function(name, value) {
            return jQuery.access(this, jQuery.prop, name, value, arguments.length > 1);
        },
        removeProp: function(name) {
            return this.each(function() {
                delete this[jQuery.propFix[name] || name];
            });
        },
        addClass: function(value) {
            var classes, elem, cur, clazz, j, i = 0, len = this.length, proceed = "string" === typeof value && value;
            if (jQuery.isFunction(value)) return this.each(function(j) {
                jQuery(this).addClass(value.call(this, j, this.className));
            });
            if (proceed) {
                classes = (value || "").match(core_rnotwhite) || [];
                for (;i < len; i++) {
                    elem = this[i];
                    cur = 1 === elem.nodeType && (elem.className ? (" " + elem.className + " ").replace(rclass, " ") : " ");
                    if (cur) {
                        j = 0;
                        while (clazz = classes[j++]) if (cur.indexOf(" " + clazz + " ") < 0) cur += clazz + " ";
                        elem.className = jQuery.trim(cur);
                    }
                }
            }
            return this;
        },
        removeClass: function(value) {
            var classes, elem, cur, clazz, j, i = 0, len = this.length, proceed = 0 === arguments.length || "string" === typeof value && value;
            if (jQuery.isFunction(value)) return this.each(function(j) {
                jQuery(this).removeClass(value.call(this, j, this.className));
            });
            if (proceed) {
                classes = (value || "").match(core_rnotwhite) || [];
                for (;i < len; i++) {
                    elem = this[i];
                    cur = 1 === elem.nodeType && (elem.className ? (" " + elem.className + " ").replace(rclass, " ") : "");
                    if (cur) {
                        j = 0;
                        while (clazz = classes[j++]) while (cur.indexOf(" " + clazz + " ") >= 0) cur = cur.replace(" " + clazz + " ", " ");
                        elem.className = value ? jQuery.trim(cur) : "";
                    }
                }
            }
            return this;
        },
        toggleClass: function(value, stateVal) {
            var type = typeof value;
            if ("boolean" === typeof stateVal && "string" === type) return stateVal ? this.addClass(value) : this.removeClass(value);
            if (jQuery.isFunction(value)) return this.each(function(i) {
                jQuery(this).toggleClass(value.call(this, i, this.className, stateVal), stateVal);
            });
            return this.each(function() {
                if ("string" === type) {
                    var className, i = 0, self = jQuery(this), classNames = value.match(core_rnotwhite) || [];
                    while (className = classNames[i++]) if (self.hasClass(className)) self.removeClass(className); else self.addClass(className);
                } else if (type === core_strundefined || "boolean" === type) {
                    if (this.className) data_priv.set(this, "__className__", this.className);
                    this.className = this.className || false === value ? "" : data_priv.get(this, "__className__") || "";
                }
            });
        },
        hasClass: function(selector) {
            var className = " " + selector + " ", i = 0, l = this.length;
            for (;i < l; i++) if (1 === this[i].nodeType && (" " + this[i].className + " ").replace(rclass, " ").indexOf(className) >= 0) return true;
            return false;
        },
        val: function(value) {
            var hooks, ret, isFunction, elem = this[0];
            if (!arguments.length) {
                if (elem) {
                    hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()];
                    if (hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== undefined) return ret;
                    ret = elem.value;
                    return "string" === typeof ret ? ret.replace(rreturn, "") : null == ret ? "" : ret;
                }
                return;
            }
            isFunction = jQuery.isFunction(value);
            return this.each(function(i) {
                var val;
                if (1 !== this.nodeType) return;
                if (isFunction) val = value.call(this, i, jQuery(this).val()); else val = value;
                if (null == val) val = ""; else if ("number" === typeof val) val += ""; else if (jQuery.isArray(val)) val = jQuery.map(val, function(value) {
                    return null == value ? "" : value + "";
                });
                hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];
                if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === undefined) this.value = val;
            });
        }
    });
    jQuery.extend({
        valHooks: {
            option: {
                get: function(elem) {
                    var val = elem.attributes.value;
                    return !val || val.specified ? elem.value : elem.text;
                }
            },
            select: {
                get: function(elem) {
                    var value, option, options = elem.options, index = elem.selectedIndex, one = "select-one" === elem.type || index < 0, values = one ? null : [], max = one ? index + 1 : options.length, i = index < 0 ? max : one ? index : 0;
                    for (;i < max; i++) {
                        option = options[i];
                        if ((option.selected || i === index) && (jQuery.support.optDisabled ? !option.disabled : null === option.getAttribute("disabled")) && (!option.parentNode.disabled || !jQuery.nodeName(option.parentNode, "optgroup"))) {
                            value = jQuery(option).val();
                            if (one) return value;
                            values.push(value);
                        }
                    }
                    return values;
                },
                set: function(elem, value) {
                    var optionSet, option, options = elem.options, values = jQuery.makeArray(value), i = options.length;
                    while (i--) {
                        option = options[i];
                        if (option.selected = jQuery.inArray(jQuery(option).val(), values) >= 0) optionSet = true;
                    }
                    if (!optionSet) elem.selectedIndex = -1;
                    return values;
                }
            }
        },
        attr: function(elem, name, value) {
            var hooks, ret, nType = elem.nodeType;
            if (!elem || 3 === nType || 8 === nType || 2 === nType) return;
            if (typeof elem.getAttribute === core_strundefined) return jQuery.prop(elem, name, value);
            if (1 !== nType || !jQuery.isXMLDoc(elem)) {
                name = name.toLowerCase();
                hooks = jQuery.attrHooks[name] || (jQuery.expr.match.bool.test(name) ? boolHook : nodeHook);
            }
            if (value !== undefined) if (null === value) jQuery.removeAttr(elem, name); else if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) return ret; else {
                elem.setAttribute(name, value + "");
                return value;
            } else if (hooks && "get" in hooks && null !== (ret = hooks.get(elem, name))) return ret; else {
                ret = jQuery.find.attr(elem, name);
                return null == ret ? undefined : ret;
            }
        },
        removeAttr: function(elem, value) {
            var name, propName, i = 0, attrNames = value && value.match(core_rnotwhite);
            if (attrNames && 1 === elem.nodeType) while (name = attrNames[i++]) {
                propName = jQuery.propFix[name] || name;
                if (jQuery.expr.match.bool.test(name)) elem[propName] = false;
                elem.removeAttribute(name);
            }
        },
        attrHooks: {
            type: {
                set: function(elem, value) {
                    if (!jQuery.support.radioValue && "radio" === value && jQuery.nodeName(elem, "input")) {
                        var val = elem.value;
                        elem.setAttribute("type", value);
                        if (val) elem.value = val;
                        return value;
                    }
                }
            }
        },
        propFix: {
            "for": "htmlFor",
            "class": "className"
        },
        prop: function(elem, name, value) {
            var ret, hooks, notxml, nType = elem.nodeType;
            if (!elem || 3 === nType || 8 === nType || 2 === nType) return;
            notxml = 1 !== nType || !jQuery.isXMLDoc(elem);
            if (notxml) {
                name = jQuery.propFix[name] || name;
                hooks = jQuery.propHooks[name];
            }
            if (value !== undefined) return hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined ? ret : elem[name] = value; else return hooks && "get" in hooks && null !== (ret = hooks.get(elem, name)) ? ret : elem[name];
        },
        propHooks: {
            tabIndex: {
                get: function(elem) {
                    return elem.hasAttribute("tabindex") || rfocusable.test(elem.nodeName) || elem.href ? elem.tabIndex : -1;
                }
            }
        }
    });
    boolHook = {
        set: function(elem, value, name) {
            if (false === value) jQuery.removeAttr(elem, name); else elem.setAttribute(name, name);
            return name;
        }
    };
    jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function(i, name) {
        var getter = jQuery.expr.attrHandle[name] || jQuery.find.attr;
        jQuery.expr.attrHandle[name] = function(elem, name, isXML) {
            var fn = jQuery.expr.attrHandle[name], ret = isXML ? undefined : (jQuery.expr.attrHandle[name] = undefined) != getter(elem, name, isXML) ? name.toLowerCase() : null;
            jQuery.expr.attrHandle[name] = fn;
            return ret;
        };
    });
    if (!jQuery.support.optSelected) jQuery.propHooks.selected = {
        get: function(elem) {
            var parent = elem.parentNode;
            if (parent && parent.parentNode) parent.parentNode.selectedIndex;
            return null;
        }
    };
    jQuery.each([ "tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable" ], function() {
        jQuery.propFix[this.toLowerCase()] = this;
    });
    jQuery.each([ "radio", "checkbox" ], function() {
        jQuery.valHooks[this] = {
            set: function(elem, value) {
                if (jQuery.isArray(value)) return elem.checked = jQuery.inArray(jQuery(elem).val(), value) >= 0;
            }
        };
        if (!jQuery.support.checkOn) jQuery.valHooks[this].get = function(elem) {
            return null === elem.getAttribute("value") ? "on" : elem.value;
        };
    });
    var rkeyEvent = /^key/, rmouseEvent = /^(?:mouse|contextmenu)|click/, rfocusMorph = /^(?:focusinfocus|focusoutblur)$/, rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;
    function returnTrue() {
        return true;
    }
    function returnFalse() {
        return false;
    }
    function safeActiveElement() {
        try {
            return document.activeElement;
        } catch (err) {}
    }
    jQuery.event = {
        global: {},
        add: function(elem, types, handler, data, selector) {
            var handleObjIn, eventHandle, tmp, events, t, handleObj, special, handlers, type, namespaces, origType, elemData = data_priv.get(elem);
            if (!elemData) return;
            if (handler.handler) {
                handleObjIn = handler;
                handler = handleObjIn.handler;
                selector = handleObjIn.selector;
            }
            if (!handler.guid) handler.guid = jQuery.guid++;
            if (!(events = elemData.events)) events = elemData.events = {};
            if (!(eventHandle = elemData.handle)) {
                eventHandle = elemData.handle = function(e) {
                    return typeof jQuery !== core_strundefined && (!e || jQuery.event.triggered !== e.type) ? jQuery.event.dispatch.apply(eventHandle.elem, arguments) : undefined;
                };
                eventHandle.elem = elem;
            }
            types = (types || "").match(core_rnotwhite) || [ "" ];
            t = types.length;
            while (t--) {
                tmp = rtypenamespace.exec(types[t]) || [];
                type = origType = tmp[1];
                namespaces = (tmp[2] || "").split(".").sort();
                if (!type) continue;
                special = jQuery.event.special[type] || {};
                type = (selector ? special.delegateType : special.bindType) || type;
                special = jQuery.event.special[type] || {};
                handleObj = jQuery.extend({
                    type: type,
                    origType: origType,
                    data: data,
                    handler: handler,
                    guid: handler.guid,
                    selector: selector,
                    needsContext: selector && jQuery.expr.match.needsContext.test(selector),
                    namespace: namespaces.join(".")
                }, handleObjIn);
                if (!(handlers = events[type])) {
                    handlers = events[type] = [];
                    handlers.delegateCount = 0;
                    if (!special.setup || false === special.setup.call(elem, data, namespaces, eventHandle)) if (elem.addEventListener) elem.addEventListener(type, eventHandle, false);
                }
                if (special.add) {
                    special.add.call(elem, handleObj);
                    if (!handleObj.handler.guid) handleObj.handler.guid = handler.guid;
                }
                if (selector) handlers.splice(handlers.delegateCount++, 0, handleObj); else handlers.push(handleObj);
                jQuery.event.global[type] = true;
            }
            elem = null;
        },
        remove: function(elem, types, handler, selector, mappedTypes) {
            var j, origCount, tmp, events, t, handleObj, special, handlers, type, namespaces, origType, elemData = data_priv.hasData(elem) && data_priv.get(elem);
            if (!elemData || !(events = elemData.events)) return;
            types = (types || "").match(core_rnotwhite) || [ "" ];
            t = types.length;
            while (t--) {
                tmp = rtypenamespace.exec(types[t]) || [];
                type = origType = tmp[1];
                namespaces = (tmp[2] || "").split(".").sort();
                if (!type) {
                    for (type in events) jQuery.event.remove(elem, type + types[t], handler, selector, true);
                    continue;
                }
                special = jQuery.event.special[type] || {};
                type = (selector ? special.delegateType : special.bindType) || type;
                handlers = events[type] || [];
                tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)");
                origCount = j = handlers.length;
                while (j--) {
                    handleObj = handlers[j];
                    if ((mappedTypes || origType === handleObj.origType) && (!handler || handler.guid === handleObj.guid) && (!tmp || tmp.test(handleObj.namespace)) && (!selector || selector === handleObj.selector || "**" === selector && handleObj.selector)) {
                        handlers.splice(j, 1);
                        if (handleObj.selector) handlers.delegateCount--;
                        if (special.remove) special.remove.call(elem, handleObj);
                    }
                }
                if (origCount && !handlers.length) {
                    if (!special.teardown || false === special.teardown.call(elem, namespaces, elemData.handle)) jQuery.removeEvent(elem, type, elemData.handle);
                    delete events[type];
                }
            }
            if (jQuery.isEmptyObject(events)) {
                delete elemData.handle;
                data_priv.remove(elem, "events");
            }
        },
        trigger: function(event, data, elem, onlyHandlers) {
            var i, cur, tmp, bubbleType, ontype, handle, special, eventPath = [ elem || document ], type = core_hasOwn.call(event, "type") ? event.type : event, namespaces = core_hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];
            cur = tmp = elem = elem || document;
            if (3 === elem.nodeType || 8 === elem.nodeType) return;
            if (rfocusMorph.test(type + jQuery.event.triggered)) return;
            if (type.indexOf(".") >= 0) {
                namespaces = type.split(".");
                type = namespaces.shift();
                namespaces.sort();
            }
            ontype = type.indexOf(":") < 0 && "on" + type;
            event = event[jQuery.expando] ? event : new jQuery.Event(type, "object" === typeof event && event);
            event.isTrigger = onlyHandlers ? 2 : 3;
            event.namespace = namespaces.join(".");
            event.namespace_re = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
            event.result = undefined;
            if (!event.target) event.target = elem;
            data = null == data ? [ event ] : jQuery.makeArray(data, [ event ]);
            special = jQuery.event.special[type] || {};
            if (!onlyHandlers && special.trigger && false === special.trigger.apply(elem, data)) return;
            if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {
                bubbleType = special.delegateType || type;
                if (!rfocusMorph.test(bubbleType + type)) cur = cur.parentNode;
                for (;cur; cur = cur.parentNode) {
                    eventPath.push(cur);
                    tmp = cur;
                }
                if (tmp === (elem.ownerDocument || document)) eventPath.push(tmp.defaultView || tmp.parentWindow || window);
            }
            i = 0;
            while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {
                event.type = i > 1 ? bubbleType : special.bindType || type;
                handle = (data_priv.get(cur, "events") || {})[event.type] && data_priv.get(cur, "handle");
                if (handle) handle.apply(cur, data);
                handle = ontype && cur[ontype];
                if (handle && jQuery.acceptData(cur) && handle.apply && false === handle.apply(cur, data)) event.preventDefault();
            }
            event.type = type;
            if (!onlyHandlers && !event.isDefaultPrevented()) if ((!special._default || false === special._default.apply(eventPath.pop(), data)) && jQuery.acceptData(elem)) if (ontype && jQuery.isFunction(elem[type]) && !jQuery.isWindow(elem)) {
                tmp = elem[ontype];
                if (tmp) elem[ontype] = null;
                jQuery.event.triggered = type;
                elem[type]();
                jQuery.event.triggered = undefined;
                if (tmp) elem[ontype] = tmp;
            }
            return event.result;
        },
        dispatch: function(event) {
            event = jQuery.event.fix(event);
            var i, j, ret, matched, handleObj, handlerQueue = [], args = core_slice.call(arguments), handlers = (data_priv.get(this, "events") || {})[event.type] || [], special = jQuery.event.special[event.type] || {};
            args[0] = event;
            event.delegateTarget = this;
            if (special.preDispatch && false === special.preDispatch.call(this, event)) return;
            handlerQueue = jQuery.event.handlers.call(this, event, handlers);
            i = 0;
            while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
                event.currentTarget = matched.elem;
                j = 0;
                while ((handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped()) if (!event.namespace_re || event.namespace_re.test(handleObj.namespace)) {
                    event.handleObj = handleObj;
                    event.data = handleObj.data;
                    ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args);
                    if (ret !== undefined) if (false === (event.result = ret)) {
                        event.preventDefault();
                        event.stopPropagation();
                    }
                }
            }
            if (special.postDispatch) special.postDispatch.call(this, event);
            return event.result;
        },
        handlers: function(event, handlers) {
            var i, matches, sel, handleObj, handlerQueue = [], delegateCount = handlers.delegateCount, cur = event.target;
            if (delegateCount && cur.nodeType && (!event.button || "click" !== event.type)) for (;cur !== this; cur = cur.parentNode || this) if (true !== cur.disabled || "click" !== event.type) {
                matches = [];
                for (i = 0; i < delegateCount; i++) {
                    handleObj = handlers[i];
                    sel = handleObj.selector + " ";
                    if (matches[sel] === undefined) matches[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) >= 0 : jQuery.find(sel, this, null, [ cur ]).length;
                    if (matches[sel]) matches.push(handleObj);
                }
                if (matches.length) handlerQueue.push({
                    elem: cur,
                    handlers: matches
                });
            }
            if (delegateCount < handlers.length) handlerQueue.push({
                elem: this,
                handlers: handlers.slice(delegateCount)
            });
            return handlerQueue;
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(event, original) {
                if (null == event.which) event.which = null != original.charCode ? original.charCode : original.keyCode;
                return event;
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(event, original) {
                var eventDoc, doc, body, button = original.button;
                if (null == event.pageX && null != original.clientX) {
                    eventDoc = event.target.ownerDocument || document;
                    doc = eventDoc.documentElement;
                    body = eventDoc.body;
                    event.pageX = original.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
                    event.pageY = original.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0);
                }
                if (!event.which && button !== undefined) event.which = 1 & button ? 1 : 2 & button ? 3 : 4 & button ? 2 : 0;
                return event;
            }
        },
        fix: function(event) {
            if (event[jQuery.expando]) return event;
            var i, prop, copy, type = event.type, originalEvent = event, fixHook = this.fixHooks[type];
            if (!fixHook) this.fixHooks[type] = fixHook = rmouseEvent.test(type) ? this.mouseHooks : rkeyEvent.test(type) ? this.keyHooks : {};
            copy = fixHook.props ? this.props.concat(fixHook.props) : this.props;
            event = new jQuery.Event(originalEvent);
            i = copy.length;
            while (i--) {
                prop = copy[i];
                event[prop] = originalEvent[prop];
            }
            if (!event.target) event.target = document;
            if (3 === event.target.nodeType) event.target = event.target.parentNode;
            return fixHook.filter ? fixHook.filter(event, originalEvent) : event;
        },
        special: {
            load: {
                noBubble: true
            },
            focus: {
                trigger: function() {
                    if (this !== safeActiveElement() && this.focus) {
                        this.focus();
                        return false;
                    }
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    if (this === safeActiveElement() && this.blur) {
                        this.blur();
                        return false;
                    }
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    if ("checkbox" === this.type && this.click && jQuery.nodeName(this, "input")) {
                        this.click();
                        return false;
                    }
                },
                _default: function(event) {
                    return jQuery.nodeName(event.target, "a");
                }
            },
            beforeunload: {
                postDispatch: function(event) {
                    if (event.result !== undefined) event.originalEvent.returnValue = event.result;
                }
            }
        },
        simulate: function(type, elem, event, bubble) {
            var e = jQuery.extend(new jQuery.Event(), event, {
                type: type,
                isSimulated: true,
                originalEvent: {}
            });
            if (bubble) jQuery.event.trigger(e, null, elem); else jQuery.event.dispatch.call(elem, e);
            if (e.isDefaultPrevented()) event.preventDefault();
        }
    };
    jQuery.removeEvent = function(elem, type, handle) {
        if (elem.removeEventListener) elem.removeEventListener(type, handle, false);
    };
    jQuery.Event = function(src, props) {
        if (!(this instanceof jQuery.Event)) return new jQuery.Event(src, props);
        if (src && src.type) {
            this.originalEvent = src;
            this.type = src.type;
            this.isDefaultPrevented = src.defaultPrevented || src.getPreventDefault && src.getPreventDefault() ? returnTrue : returnFalse;
        } else this.type = src;
        if (props) jQuery.extend(this, props);
        this.timeStamp = src && src.timeStamp || jQuery.now();
        this[jQuery.expando] = true;
    };
    jQuery.Event.prototype = {
        isDefaultPrevented: returnFalse,
        isPropagationStopped: returnFalse,
        isImmediatePropagationStopped: returnFalse,
        preventDefault: function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = returnTrue;
            if (e && e.preventDefault) e.preventDefault();
        },
        stopPropagation: function() {
            var e = this.originalEvent;
            this.isPropagationStopped = returnTrue;
            if (e && e.stopPropagation) e.stopPropagation();
        },
        stopImmediatePropagation: function() {
            this.isImmediatePropagationStopped = returnTrue;
            this.stopPropagation();
        }
    };
    jQuery.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    }, function(orig, fix) {
        jQuery.event.special[orig] = {
            delegateType: fix,
            bindType: fix,
            handle: function(event) {
                var ret, target = this, related = event.relatedTarget, handleObj = event.handleObj;
                if (!related || related !== target && !jQuery.contains(target, related)) {
                    event.type = handleObj.origType;
                    ret = handleObj.handler.apply(this, arguments);
                    event.type = fix;
                }
                return ret;
            }
        };
    });
    if (!jQuery.support.focusinBubbles) jQuery.each({
        focus: "focusin",
        blur: "focusout"
    }, function(orig, fix) {
        var attaches = 0, handler = function(event) {
            jQuery.event.simulate(fix, event.target, jQuery.event.fix(event), true);
        };
        jQuery.event.special[fix] = {
            setup: function() {
                if (0 === attaches++) document.addEventListener(orig, handler, true);
            },
            teardown: function() {
                if (0 === --attaches) document.removeEventListener(orig, handler, true);
            }
        };
    });
    jQuery.fn.extend({
        on: function(types, selector, data, fn, one) {
            var origFn, type;
            if ("object" === typeof types) {
                if ("string" !== typeof selector) {
                    data = data || selector;
                    selector = undefined;
                }
                for (type in types) this.on(type, selector, data, types[type], one);
                return this;
            }
            if (null == data && null == fn) {
                fn = selector;
                data = selector = undefined;
            } else if (null == fn) if ("string" === typeof selector) {
                fn = data;
                data = undefined;
            } else {
                fn = data;
                data = selector;
                selector = undefined;
            }
            if (false === fn) fn = returnFalse; else if (!fn) return this;
            if (1 === one) {
                origFn = fn;
                fn = function(event) {
                    jQuery().off(event);
                    return origFn.apply(this, arguments);
                };
                fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
            }
            return this.each(function() {
                jQuery.event.add(this, types, fn, data, selector);
            });
        },
        one: function(types, selector, data, fn) {
            return this.on(types, selector, data, fn, 1);
        },
        off: function(types, selector, fn) {
            var handleObj, type;
            if (types && types.preventDefault && types.handleObj) {
                handleObj = types.handleObj;
                jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler);
                return this;
            }
            if ("object" === typeof types) {
                for (type in types) this.off(type, selector, types[type]);
                return this;
            }
            if (false === selector || "function" === typeof selector) {
                fn = selector;
                selector = undefined;
            }
            if (false === fn) fn = returnFalse;
            return this.each(function() {
                jQuery.event.remove(this, types, fn, selector);
            });
        },
        trigger: function(type, data) {
            return this.each(function() {
                jQuery.event.trigger(type, data, this);
            });
        },
        triggerHandler: function(type, data) {
            var elem = this[0];
            if (elem) return jQuery.event.trigger(type, data, elem, true);
        }
    });
    var isSimple = /^.[^:#\[\.,]*$/, rparentsprev = /^(?:parents|prev(?:Until|All))/, rneedsContext = jQuery.expr.match.needsContext, guaranteedUnique = {
        children: true,
        contents: true,
        next: true,
        prev: true
    };
    jQuery.fn.extend({
        find: function(selector) {
            var i, ret = [], self = this, len = self.length;
            if ("string" !== typeof selector) return this.pushStack(jQuery(selector).filter(function() {
                for (i = 0; i < len; i++) if (jQuery.contains(self[i], this)) return true;
            }));
            for (i = 0; i < len; i++) jQuery.find(selector, self[i], ret);
            ret = this.pushStack(len > 1 ? jQuery.unique(ret) : ret);
            ret.selector = this.selector ? this.selector + " " + selector : selector;
            return ret;
        },
        has: function(target) {
            var targets = jQuery(target, this), l = targets.length;
            return this.filter(function() {
                var i = 0;
                for (;i < l; i++) if (jQuery.contains(this, targets[i])) return true;
            });
        },
        not: function(selector) {
            return this.pushStack(winnow(this, selector || [], true));
        },
        filter: function(selector) {
            return this.pushStack(winnow(this, selector || [], false));
        },
        is: function(selector) {
            return !!winnow(this, "string" === typeof selector && rneedsContext.test(selector) ? jQuery(selector) : selector || [], false).length;
        },
        closest: function(selectors, context) {
            var cur, i = 0, l = this.length, matched = [], pos = rneedsContext.test(selectors) || "string" !== typeof selectors ? jQuery(selectors, context || this.context) : 0;
            for (;i < l; i++) for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) if (cur.nodeType < 11 && (pos ? pos.index(cur) > -1 : 1 === cur.nodeType && jQuery.find.matchesSelector(cur, selectors))) {
                cur = matched.push(cur);
                break;
            }
            return this.pushStack(matched.length > 1 ? jQuery.unique(matched) : matched);
        },
        index: function(elem) {
            if (!elem) return this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
            if ("string" === typeof elem) return core_indexOf.call(jQuery(elem), this[0]);
            return core_indexOf.call(this, elem.jquery ? elem[0] : elem);
        },
        add: function(selector, context) {
            var set = "string" === typeof selector ? jQuery(selector, context) : jQuery.makeArray(selector && selector.nodeType ? [ selector ] : selector), all = jQuery.merge(this.get(), set);
            return this.pushStack(jQuery.unique(all));
        },
        addBack: function(selector) {
            return this.add(null == selector ? this.prevObject : this.prevObject.filter(selector));
        }
    });
    function sibling(cur, dir) {
        while ((cur = cur[dir]) && 1 !== cur.nodeType) ;
        return cur;
    }
    jQuery.each({
        parent: function(elem) {
            var parent = elem.parentNode;
            return parent && 11 !== parent.nodeType ? parent : null;
        },
        parents: function(elem) {
            return jQuery.dir(elem, "parentNode");
        },
        parentsUntil: function(elem, i, until) {
            return jQuery.dir(elem, "parentNode", until);
        },
        next: function(elem) {
            return sibling(elem, "nextSibling");
        },
        prev: function(elem) {
            return sibling(elem, "previousSibling");
        },
        nextAll: function(elem) {
            return jQuery.dir(elem, "nextSibling");
        },
        prevAll: function(elem) {
            return jQuery.dir(elem, "previousSibling");
        },
        nextUntil: function(elem, i, until) {
            return jQuery.dir(elem, "nextSibling", until);
        },
        prevUntil: function(elem, i, until) {
            return jQuery.dir(elem, "previousSibling", until);
        },
        siblings: function(elem) {
            return jQuery.sibling((elem.parentNode || {}).firstChild, elem);
        },
        children: function(elem) {
            return jQuery.sibling(elem.firstChild);
        },
        contents: function(elem) {
            return elem.contentDocument || jQuery.merge([], elem.childNodes);
        }
    }, function(name, fn) {
        jQuery.fn[name] = function(until, selector) {
            var matched = jQuery.map(this, fn, until);
            if ("Until" !== name.slice(-5)) selector = until;
            if (selector && "string" === typeof selector) matched = jQuery.filter(selector, matched);
            if (this.length > 1) {
                if (!guaranteedUnique[name]) jQuery.unique(matched);
                if (rparentsprev.test(name)) matched.reverse();
            }
            return this.pushStack(matched);
        };
    });
    jQuery.extend({
        filter: function(expr, elems, not) {
            var elem = elems[0];
            if (not) expr = ":not(" + expr + ")";
            return 1 === elems.length && 1 === elem.nodeType ? jQuery.find.matchesSelector(elem, expr) ? [ elem ] : [] : jQuery.find.matches(expr, jQuery.grep(elems, function(elem) {
                return 1 === elem.nodeType;
            }));
        },
        dir: function(elem, dir, until) {
            var matched = [], truncate = until !== undefined;
            while ((elem = elem[dir]) && 9 !== elem.nodeType) if (1 === elem.nodeType) {
                if (truncate && jQuery(elem).is(until)) break;
                matched.push(elem);
            }
            return matched;
        },
        sibling: function(n, elem) {
            var matched = [];
            for (;n; n = n.nextSibling) if (1 === n.nodeType && n !== elem) matched.push(n);
            return matched;
        }
    });
    function winnow(elements, qualifier, not) {
        if (jQuery.isFunction(qualifier)) return jQuery.grep(elements, function(elem, i) {
            return !!qualifier.call(elem, i, elem) !== not;
        });
        if (qualifier.nodeType) return jQuery.grep(elements, function(elem) {
            return elem === qualifier !== not;
        });
        if ("string" === typeof qualifier) {
            if (isSimple.test(qualifier)) return jQuery.filter(qualifier, elements, not);
            qualifier = jQuery.filter(qualifier, elements);
        }
        return jQuery.grep(elements, function(elem) {
            return core_indexOf.call(qualifier, elem) >= 0 !== not;
        });
    }
    var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, rtagName = /<([\w:]+)/, rhtml = /<|&#?\w+;/, rnoInnerhtml = /<(?:script|style|link)/i, manipulation_rcheckableType = /^(?:checkbox|radio)$/i, rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i, rscriptType = /^$|\/(?:java|ecma)script/i, rscriptTypeMasked = /^true\/(.*)/, rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, wrapMap = {
        option: [ 1, "<select multiple='multiple'>", "</select>" ],
        thead: [ 1, "<table>", "</table>" ],
        col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
        tr: [ 2, "<table><tbody>", "</tbody></table>" ],
        td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
        _default: [ 0, "", "" ]
    };
    wrapMap.optgroup = wrapMap.option;
    wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
    wrapMap.th = wrapMap.td;
    jQuery.fn.extend({
        text: function(value) {
            return jQuery.access(this, function(value) {
                return value === undefined ? jQuery.text(this) : this.empty().append((this[0] && this[0].ownerDocument || document).createTextNode(value));
            }, null, value, arguments.length);
        },
        append: function() {
            return this.domManip(arguments, function(elem) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var target = manipulationTarget(this, elem);
                    target.appendChild(elem);
                }
            });
        },
        prepend: function() {
            return this.domManip(arguments, function(elem) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var target = manipulationTarget(this, elem);
                    target.insertBefore(elem, target.firstChild);
                }
            });
        },
        before: function() {
            return this.domManip(arguments, function(elem) {
                if (this.parentNode) this.parentNode.insertBefore(elem, this);
            });
        },
        after: function() {
            return this.domManip(arguments, function(elem) {
                if (this.parentNode) this.parentNode.insertBefore(elem, this.nextSibling);
            });
        },
        remove: function(selector, keepData) {
            var elem, elems = selector ? jQuery.filter(selector, this) : this, i = 0;
            for (;null != (elem = elems[i]); i++) {
                if (!keepData && 1 === elem.nodeType) jQuery.cleanData(getAll(elem));
                if (elem.parentNode) {
                    if (keepData && jQuery.contains(elem.ownerDocument, elem)) setGlobalEval(getAll(elem, "script"));
                    elem.parentNode.removeChild(elem);
                }
            }
            return this;
        },
        empty: function() {
            var elem, i = 0;
            for (;null != (elem = this[i]); i++) if (1 === elem.nodeType) {
                jQuery.cleanData(getAll(elem, false));
                elem.textContent = "";
            }
            return this;
        },
        clone: function(dataAndEvents, deepDataAndEvents) {
            dataAndEvents = null == dataAndEvents ? false : dataAndEvents;
            deepDataAndEvents = null == deepDataAndEvents ? dataAndEvents : deepDataAndEvents;
            return this.map(function() {
                return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
            });
        },
        html: function(value) {
            return jQuery.access(this, function(value) {
                var elem = this[0] || {}, i = 0, l = this.length;
                if (value === undefined && 1 === elem.nodeType) return elem.innerHTML;
                if ("string" === typeof value && !rnoInnerhtml.test(value) && !wrapMap[(rtagName.exec(value) || [ "", "" ])[1].toLowerCase()]) {
                    value = value.replace(rxhtmlTag, "<$1></$2>");
                    try {
                        for (;i < l; i++) {
                            elem = this[i] || {};
                            if (1 === elem.nodeType) {
                                jQuery.cleanData(getAll(elem, false));
                                elem.innerHTML = value;
                            }
                        }
                        elem = 0;
                    } catch (e) {}
                }
                if (elem) this.empty().append(value);
            }, null, value, arguments.length);
        },
        replaceWith: function() {
            var args = jQuery.map(this, function(elem) {
                return [ elem.nextSibling, elem.parentNode ];
            }), i = 0;
            this.domManip(arguments, function(elem) {
                var next = args[i++], parent = args[i++];
                if (parent) {
                    if (next && next.parentNode !== parent) next = this.nextSibling;
                    jQuery(this).remove();
                    parent.insertBefore(elem, next);
                }
            }, true);
            return i ? this : this.remove();
        },
        detach: function(selector) {
            return this.remove(selector, true);
        },
        domManip: function(args, callback, allowIntersection) {
            args = core_concat.apply([], args);
            var fragment, first, scripts, hasScripts, node, doc, i = 0, l = this.length, set = this, iNoClone = l - 1, value = args[0], isFunction = jQuery.isFunction(value);
            if (isFunction || !(l <= 1 || "string" !== typeof value || jQuery.support.checkClone || !rchecked.test(value))) return this.each(function(index) {
                var self = set.eq(index);
                if (isFunction) args[0] = value.call(this, index, self.html());
                self.domManip(args, callback, allowIntersection);
            });
            if (l) {
                fragment = jQuery.buildFragment(args, this[0].ownerDocument, false, !allowIntersection && this);
                first = fragment.firstChild;
                if (1 === fragment.childNodes.length) fragment = first;
                if (first) {
                    scripts = jQuery.map(getAll(fragment, "script"), disableScript);
                    hasScripts = scripts.length;
                    for (;i < l; i++) {
                        node = fragment;
                        if (i !== iNoClone) {
                            node = jQuery.clone(node, true, true);
                            if (hasScripts) jQuery.merge(scripts, getAll(node, "script"));
                        }
                        callback.call(this[i], node, i);
                    }
                    if (hasScripts) {
                        doc = scripts[scripts.length - 1].ownerDocument;
                        jQuery.map(scripts, restoreScript);
                        for (i = 0; i < hasScripts; i++) {
                            node = scripts[i];
                            if (rscriptType.test(node.type || "") && !data_priv.access(node, "globalEval") && jQuery.contains(doc, node)) if (node.src) jQuery._evalUrl(node.src); else jQuery.globalEval(node.textContent.replace(rcleanScript, ""));
                        }
                    }
                }
            }
            return this;
        }
    });
    jQuery.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(name, original) {
        jQuery.fn[name] = function(selector) {
            var elems, ret = [], insert = jQuery(selector), last = insert.length - 1, i = 0;
            for (;i <= last; i++) {
                elems = i === last ? this : this.clone(true);
                jQuery(insert[i])[original](elems);
                core_push.apply(ret, elems.get());
            }
            return this.pushStack(ret);
        };
    });
    jQuery.extend({
        clone: function(elem, dataAndEvents, deepDataAndEvents) {
            var i, l, srcElements, destElements, clone = elem.cloneNode(true), inPage = jQuery.contains(elem.ownerDocument, elem);
            if (!jQuery.support.noCloneChecked && (1 === elem.nodeType || 11 === elem.nodeType) && !jQuery.isXMLDoc(elem)) {
                destElements = getAll(clone);
                srcElements = getAll(elem);
                for (i = 0, l = srcElements.length; i < l; i++) fixInput(srcElements[i], destElements[i]);
            }
            if (dataAndEvents) if (deepDataAndEvents) {
                srcElements = srcElements || getAll(elem);
                destElements = destElements || getAll(clone);
                for (i = 0, l = srcElements.length; i < l; i++) cloneCopyEvent(srcElements[i], destElements[i]);
            } else cloneCopyEvent(elem, clone);
            destElements = getAll(clone, "script");
            if (destElements.length > 0) setGlobalEval(destElements, !inPage && getAll(elem, "script"));
            return clone;
        },
        buildFragment: function(elems, context, scripts, selection) {
            var elem, tmp, tag, wrap, contains, j, i = 0, l = elems.length, fragment = context.createDocumentFragment(), nodes = [];
            for (;i < l; i++) {
                elem = elems[i];
                if (elem || 0 === elem) if ("object" === jQuery.type(elem)) jQuery.merge(nodes, elem.nodeType ? [ elem ] : elem); else if (!rhtml.test(elem)) nodes.push(context.createTextNode(elem)); else {
                    tmp = tmp || fragment.appendChild(context.createElement("div"));
                    tag = (rtagName.exec(elem) || [ "", "" ])[1].toLowerCase();
                    wrap = wrapMap[tag] || wrapMap._default;
                    tmp.innerHTML = wrap[1] + elem.replace(rxhtmlTag, "<$1></$2>") + wrap[2];
                    j = wrap[0];
                    while (j--) tmp = tmp.lastChild;
                    jQuery.merge(nodes, tmp.childNodes);
                    tmp = fragment.firstChild;
                    tmp.textContent = "";
                }
            }
            fragment.textContent = "";
            i = 0;
            while (elem = nodes[i++]) {
                if (selection && jQuery.inArray(elem, selection) !== -1) continue;
                contains = jQuery.contains(elem.ownerDocument, elem);
                tmp = getAll(fragment.appendChild(elem), "script");
                if (contains) setGlobalEval(tmp);
                if (scripts) {
                    j = 0;
                    while (elem = tmp[j++]) if (rscriptType.test(elem.type || "")) scripts.push(elem);
                }
            }
            return fragment;
        },
        cleanData: function(elems) {
            var data, elem, events, type, key, j, special = jQuery.event.special, i = 0;
            for (;(elem = elems[i]) !== undefined; i++) {
                if (Data.accepts(elem)) {
                    key = elem[data_priv.expando];
                    if (key && (data = data_priv.cache[key])) {
                        events = Object.keys(data.events || {});
                        if (events.length) for (j = 0; (type = events[j]) !== undefined; j++) if (special[type]) jQuery.event.remove(elem, type); else jQuery.removeEvent(elem, type, data.handle);
                        if (data_priv.cache[key]) delete data_priv.cache[key];
                    }
                }
                delete data_user.cache[elem[data_user.expando]];
            }
        },
        _evalUrl: function(url) {
            return jQuery.ajax({
                url: url,
                type: "GET",
                dataType: "script",
                async: false,
                global: false,
                "throws": true
            });
        }
    });
    function manipulationTarget(elem, content) {
        return jQuery.nodeName(elem, "table") && jQuery.nodeName(1 === content.nodeType ? content : content.firstChild, "tr") ? elem.getElementsByTagName("tbody")[0] || elem.appendChild(elem.ownerDocument.createElement("tbody")) : elem;
    }
    function disableScript(elem) {
        elem.type = (null !== elem.getAttribute("type")) + "/" + elem.type;
        return elem;
    }
    function restoreScript(elem) {
        var match = rscriptTypeMasked.exec(elem.type);
        if (match) elem.type = match[1]; else elem.removeAttribute("type");
        return elem;
    }
    function setGlobalEval(elems, refElements) {
        var l = elems.length, i = 0;
        for (;i < l; i++) data_priv.set(elems[i], "globalEval", !refElements || data_priv.get(refElements[i], "globalEval"));
    }
    function cloneCopyEvent(src, dest) {
        var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;
        if (1 !== dest.nodeType) return;
        if (data_priv.hasData(src)) {
            pdataOld = data_priv.access(src);
            pdataCur = data_priv.set(dest, pdataOld);
            events = pdataOld.events;
            if (events) {
                delete pdataCur.handle;
                pdataCur.events = {};
                for (type in events) for (i = 0, l = events[type].length; i < l; i++) jQuery.event.add(dest, type, events[type][i]);
            }
        }
        if (data_user.hasData(src)) {
            udataOld = data_user.access(src);
            udataCur = jQuery.extend({}, udataOld);
            data_user.set(dest, udataCur);
        }
    }
    function getAll(context, tag) {
        var ret = context.getElementsByTagName ? context.getElementsByTagName(tag || "*") : context.querySelectorAll ? context.querySelectorAll(tag || "*") : [];
        return tag === undefined || tag && jQuery.nodeName(context, tag) ? jQuery.merge([ context ], ret) : ret;
    }
    function fixInput(src, dest) {
        var nodeName = dest.nodeName.toLowerCase();
        if ("input" === nodeName && manipulation_rcheckableType.test(src.type)) dest.checked = src.checked; else if ("input" === nodeName || "textarea" === nodeName) dest.defaultValue = src.defaultValue;
    }
    jQuery.fn.extend({
        wrapAll: function(html) {
            var wrap;
            if (jQuery.isFunction(html)) return this.each(function(i) {
                jQuery(this).wrapAll(html.call(this, i));
            });
            if (this[0]) {
                wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);
                if (this[0].parentNode) wrap.insertBefore(this[0]);
                wrap.map(function() {
                    var elem = this;
                    while (elem.firstElementChild) elem = elem.firstElementChild;
                    return elem;
                }).append(this);
            }
            return this;
        },
        wrapInner: function(html) {
            if (jQuery.isFunction(html)) return this.each(function(i) {
                jQuery(this).wrapInner(html.call(this, i));
            });
            return this.each(function() {
                var self = jQuery(this), contents = self.contents();
                if (contents.length) contents.wrapAll(html); else self.append(html);
            });
        },
        wrap: function(html) {
            var isFunction = jQuery.isFunction(html);
            return this.each(function(i) {
                jQuery(this).wrapAll(isFunction ? html.call(this, i) : html);
            });
        },
        unwrap: function() {
            return this.parent().each(function() {
                if (!jQuery.nodeName(this, "body")) jQuery(this).replaceWith(this.childNodes);
            }).end();
        }
    });
    var curCSS, iframe, rdisplayswap = /^(none|table(?!-c[ea]).+)/, rmargin = /^margin/, rnumsplit = new RegExp("^(" + core_pnum + ")(.*)$", "i"), rnumnonpx = new RegExp("^(" + core_pnum + ")(?!px)[a-z%]+$", "i"), rrelNum = new RegExp("^([+-])=(" + core_pnum + ")", "i"), elemdisplay = {
        BODY: "block"
    }, cssShow = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    }, cssNormalTransform = {
        letterSpacing: 0,
        fontWeight: 400
    }, cssExpand = [ "Top", "Right", "Bottom", "Left" ], cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];
    function vendorPropName(style, name) {
        if (name in style) return name;
        var capName = name.charAt(0).toUpperCase() + name.slice(1), origName = name, i = cssPrefixes.length;
        while (i--) {
            name = cssPrefixes[i] + capName;
            if (name in style) return name;
        }
        return origName;
    }
    function isHidden(elem, el) {
        elem = el || elem;
        return "none" === jQuery.css(elem, "display") || !jQuery.contains(elem.ownerDocument, elem);
    }
    function getStyles(elem) {
        return window.getComputedStyle(elem, null);
    }
    function showHide(elements, show) {
        var display, elem, hidden, values = [], index = 0, length = elements.length;
        for (;index < length; index++) {
            elem = elements[index];
            if (!elem.style) continue;
            values[index] = data_priv.get(elem, "olddisplay");
            display = elem.style.display;
            if (show) {
                if (!values[index] && "none" === display) elem.style.display = "";
                if ("" === elem.style.display && isHidden(elem)) values[index] = data_priv.access(elem, "olddisplay", css_defaultDisplay(elem.nodeName));
            } else if (!values[index]) {
                hidden = isHidden(elem);
                if (display && "none" !== display || !hidden) data_priv.set(elem, "olddisplay", hidden ? display : jQuery.css(elem, "display"));
            }
        }
        for (index = 0; index < length; index++) {
            elem = elements[index];
            if (!elem.style) continue;
            if (!show || "none" === elem.style.display || "" === elem.style.display) elem.style.display = show ? values[index] || "" : "none";
        }
        return elements;
    }
    jQuery.fn.extend({
        css: function(name, value) {
            return jQuery.access(this, function(elem, name, value) {
                var styles, len, map = {}, i = 0;
                if (jQuery.isArray(name)) {
                    styles = getStyles(elem);
                    len = name.length;
                    for (;i < len; i++) map[name[i]] = jQuery.css(elem, name[i], false, styles);
                    return map;
                }
                return value !== undefined ? jQuery.style(elem, name, value) : jQuery.css(elem, name);
            }, name, value, arguments.length > 1);
        },
        show: function() {
            return showHide(this, true);
        },
        hide: function() {
            return showHide(this);
        },
        toggle: function(state) {
            if ("boolean" === typeof state) return state ? this.show() : this.hide();
            return this.each(function() {
                if (isHidden(this)) jQuery(this).show(); else jQuery(this).hide();
            });
        }
    });
    jQuery.extend({
        cssHooks: {
            opacity: {
                get: function(elem, computed) {
                    if (computed) {
                        var ret = curCSS(elem, "opacity");
                        return "" === ret ? "1" : ret;
                    }
                }
            }
        },
        cssNumber: {
            columnCount: true,
            fillOpacity: true,
            fontWeight: true,
            lineHeight: true,
            opacity: true,
            order: true,
            orphans: true,
            widows: true,
            zIndex: true,
            zoom: true
        },
        cssProps: {
            "float": "cssFloat"
        },
        style: function(elem, name, value, extra) {
            if (!elem || 3 === elem.nodeType || 8 === elem.nodeType || !elem.style) return;
            var ret, type, hooks, origName = jQuery.camelCase(name), style = elem.style;
            name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(style, origName));
            hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
            if (value !== undefined) {
                type = typeof value;
                if ("string" === type && (ret = rrelNum.exec(value))) {
                    value = (ret[1] + 1) * ret[2] + parseFloat(jQuery.css(elem, name));
                    type = "number";
                }
                if (null == value || "number" === type && isNaN(value)) return;
                if ("number" === type && !jQuery.cssNumber[origName]) value += "px";
                if (!jQuery.support.clearCloneStyle && "" === value && 0 === name.indexOf("background")) style[name] = "inherit";
                if (!hooks || !("set" in hooks) || (value = hooks.set(elem, value, extra)) !== undefined) style[name] = value;
            } else {
                if (hooks && "get" in hooks && (ret = hooks.get(elem, false, extra)) !== undefined) return ret;
                return style[name];
            }
        },
        css: function(elem, name, extra, styles) {
            var val, num, hooks, origName = jQuery.camelCase(name);
            name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(elem.style, origName));
            hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
            if (hooks && "get" in hooks) val = hooks.get(elem, true, extra);
            if (val === undefined) val = curCSS(elem, name, styles);
            if ("normal" === val && name in cssNormalTransform) val = cssNormalTransform[name];
            if ("" === extra || extra) {
                num = parseFloat(val);
                return true === extra || jQuery.isNumeric(num) ? num || 0 : val;
            }
            return val;
        }
    });
    curCSS = function(elem, name, _computed) {
        var width, minWidth, maxWidth, computed = _computed || getStyles(elem), ret = computed ? computed.getPropertyValue(name) || computed[name] : undefined, style = elem.style;
        if (computed) {
            if ("" === ret && !jQuery.contains(elem.ownerDocument, elem)) ret = jQuery.style(elem, name);
            if (rnumnonpx.test(ret) && rmargin.test(name)) {
                width = style.width;
                minWidth = style.minWidth;
                maxWidth = style.maxWidth;
                style.minWidth = style.maxWidth = style.width = ret;
                ret = computed.width;
                style.width = width;
                style.minWidth = minWidth;
                style.maxWidth = maxWidth;
            }
        }
        return ret;
    };
    function setPositiveNumber(elem, value, subtract) {
        var matches = rnumsplit.exec(value);
        return matches ? Math.max(0, matches[1] - (subtract || 0)) + (matches[2] || "px") : value;
    }
    function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
        var i = extra === (isBorderBox ? "border" : "content") ? 4 : "width" === name ? 1 : 0, val = 0;
        for (;i < 4; i += 2) {
            if ("margin" === extra) val += jQuery.css(elem, extra + cssExpand[i], true, styles);
            if (isBorderBox) {
                if ("content" === extra) val -= jQuery.css(elem, "padding" + cssExpand[i], true, styles);
                if ("margin" !== extra) val -= jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
            } else {
                val += jQuery.css(elem, "padding" + cssExpand[i], true, styles);
                if ("padding" !== extra) val += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
            }
        }
        return val;
    }
    function getWidthOrHeight(elem, name, extra) {
        var valueIsBorderBox = true, val = "width" === name ? elem.offsetWidth : elem.offsetHeight, styles = getStyles(elem), isBorderBox = jQuery.support.boxSizing && "border-box" === jQuery.css(elem, "boxSizing", false, styles);
        if (val <= 0 || null == val) {
            val = curCSS(elem, name, styles);
            if (val < 0 || null == val) val = elem.style[name];
            if (rnumnonpx.test(val)) return val;
            valueIsBorderBox = isBorderBox && (jQuery.support.boxSizingReliable || val === elem.style[name]);
            val = parseFloat(val) || 0;
        }
        return val + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles) + "px";
    }
    function css_defaultDisplay(nodeName) {
        var doc = document, display = elemdisplay[nodeName];
        if (!display) {
            display = actualDisplay(nodeName, doc);
            if ("none" === display || !display) {
                iframe = (iframe || jQuery("<iframe frameborder='0' width='0' height='0'/>").css("cssText", "display:block !important")).appendTo(doc.documentElement);
                doc = (iframe[0].contentWindow || iframe[0].contentDocument).document;
                doc.write("<!doctype html><html><body>");
                doc.close();
                display = actualDisplay(nodeName, doc);
                iframe.detach();
            }
            elemdisplay[nodeName] = display;
        }
        return display;
    }
    function actualDisplay(name, doc) {
        var elem = jQuery(doc.createElement(name)).appendTo(doc.body), display = jQuery.css(elem[0], "display");
        elem.remove();
        return display;
    }
    jQuery.each([ "height", "width" ], function(i, name) {
        jQuery.cssHooks[name] = {
            get: function(elem, computed, extra) {
                if (computed) return 0 === elem.offsetWidth && rdisplayswap.test(jQuery.css(elem, "display")) ? jQuery.swap(elem, cssShow, function() {
                    return getWidthOrHeight(elem, name, extra);
                }) : getWidthOrHeight(elem, name, extra);
            },
            set: function(elem, value, extra) {
                var styles = extra && getStyles(elem);
                return setPositiveNumber(elem, value, extra ? augmentWidthOrHeight(elem, name, extra, jQuery.support.boxSizing && "border-box" === jQuery.css(elem, "boxSizing", false, styles), styles) : 0);
            }
        };
    });
    jQuery(function() {
        if (!jQuery.support.reliableMarginRight) jQuery.cssHooks.marginRight = {
            get: function(elem, computed) {
                if (computed) return jQuery.swap(elem, {
                    display: "inline-block"
                }, curCSS, [ elem, "marginRight" ]);
            }
        };
        if (!jQuery.support.pixelPosition && jQuery.fn.position) jQuery.each([ "top", "left" ], function(i, prop) {
            jQuery.cssHooks[prop] = {
                get: function(elem, computed) {
                    if (computed) {
                        computed = curCSS(elem, prop);
                        return rnumnonpx.test(computed) ? jQuery(elem).position()[prop] + "px" : computed;
                    }
                }
            };
        });
    });
    if (jQuery.expr && jQuery.expr.filters) {
        jQuery.expr.filters.hidden = function(elem) {
            return elem.offsetWidth <= 0 && elem.offsetHeight <= 0;
        };
        jQuery.expr.filters.visible = function(elem) {
            return !jQuery.expr.filters.hidden(elem);
        };
    }
    jQuery.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(prefix, suffix) {
        jQuery.cssHooks[prefix + suffix] = {
            expand: function(value) {
                var i = 0, expanded = {}, parts = "string" === typeof value ? value.split(" ") : [ value ];
                for (;i < 4; i++) expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
                return expanded;
            }
        };
        if (!rmargin.test(prefix)) jQuery.cssHooks[prefix + suffix].set = setPositiveNumber;
    });
    var r20 = /%20/g, rbracket = /\[\]$/, rCRLF = /\r?\n/g, rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i, rsubmittable = /^(?:input|select|textarea|keygen)/i;
    jQuery.fn.extend({
        serialize: function() {
            return jQuery.param(this.serializeArray());
        },
        serializeArray: function() {
            return this.map(function() {
                var elements = jQuery.prop(this, "elements");
                return elements ? jQuery.makeArray(elements) : this;
            }).filter(function() {
                var type = this.type;
                return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !manipulation_rcheckableType.test(type));
            }).map(function(i, elem) {
                var val = jQuery(this).val();
                return null == val ? null : jQuery.isArray(val) ? jQuery.map(val, function(val) {
                    return {
                        name: elem.name,
                        value: val.replace(rCRLF, "\r\n")
                    };
                }) : {
                    name: elem.name,
                    value: val.replace(rCRLF, "\r\n")
                };
            }).get();
        }
    });
    jQuery.param = function(a, traditional) {
        var prefix, s = [], add = function(key, value) {
            value = jQuery.isFunction(value) ? value() : null == value ? "" : value;
            s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
        };
        if (traditional === undefined) traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
        if (jQuery.isArray(a) || a.jquery && !jQuery.isPlainObject(a)) jQuery.each(a, function() {
            add(this.name, this.value);
        }); else for (prefix in a) buildParams(prefix, a[prefix], traditional, add);
        return s.join("&").replace(r20, "+");
    };
    function buildParams(prefix, obj, traditional, add) {
        var name;
        if (jQuery.isArray(obj)) jQuery.each(obj, function(i, v) {
            if (traditional || rbracket.test(prefix)) add(prefix, v); else buildParams(prefix + "[" + ("object" === typeof v ? i : "") + "]", v, traditional, add);
        }); else if (!traditional && "object" === jQuery.type(obj)) for (name in obj) buildParams(prefix + "[" + name + "]", obj[name], traditional, add); else add(prefix, obj);
    }
    jQuery.each(("blur focus focusin focusout load resize scroll unload click dblclick " + "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " + "change select submit keydown keypress keyup error contextmenu").split(" "), function(i, name) {
        jQuery.fn[name] = function(data, fn) {
            return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name);
        };
    });
    jQuery.fn.extend({
        hover: function(fnOver, fnOut) {
            return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
        },
        bind: function(types, data, fn) {
            return this.on(types, null, data, fn);
        },
        unbind: function(types, fn) {
            return this.off(types, null, fn);
        },
        delegate: function(selector, types, data, fn) {
            return this.on(types, selector, data, fn);
        },
        undelegate: function(selector, types, fn) {
            return 1 === arguments.length ? this.off(selector, "**") : this.off(types, selector || "**", fn);
        }
    });
    var ajaxLocParts, ajaxLocation, ajax_nonce = jQuery.now(), ajax_rquery = /\?/, rhash = /#.*$/, rts = /([?&])_=[^&]*/, rheaders = /^(.*?):[ \t]*([^\r\n]*)$/gm, rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, rnoContent = /^(?:GET|HEAD)$/, rprotocol = /^\/\//, rurl = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/, _load = jQuery.fn.load, prefilters = {}, transports = {}, allTypes = "*/".concat("*");
    try {
        ajaxLocation = location.href;
    } catch (e) {
        ajaxLocation = document.createElement("a");
        ajaxLocation.href = "";
        ajaxLocation = ajaxLocation.href;
    }
    ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [];
    function addToPrefiltersOrTransports(structure) {
        return function(dataTypeExpression, func) {
            if ("string" !== typeof dataTypeExpression) {
                func = dataTypeExpression;
                dataTypeExpression = "*";
            }
            var dataType, i = 0, dataTypes = dataTypeExpression.toLowerCase().match(core_rnotwhite) || [];
            if (jQuery.isFunction(func)) while (dataType = dataTypes[i++]) if ("+" === dataType[0]) {
                dataType = dataType.slice(1) || "*";
                (structure[dataType] = structure[dataType] || []).unshift(func);
            } else (structure[dataType] = structure[dataType] || []).push(func);
        };
    }
    function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
        var inspected = {}, seekingTransport = structure === transports;
        function inspect(dataType) {
            var selected;
            inspected[dataType] = true;
            jQuery.each(structure[dataType] || [], function(_, prefilterOrFactory) {
                var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
                if ("string" === typeof dataTypeOrTransport && !seekingTransport && !inspected[dataTypeOrTransport]) {
                    options.dataTypes.unshift(dataTypeOrTransport);
                    inspect(dataTypeOrTransport);
                    return false;
                } else if (seekingTransport) return !(selected = dataTypeOrTransport);
            });
            return selected;
        }
        return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");
    }
    function ajaxExtend(target, src) {
        var key, deep, flatOptions = jQuery.ajaxSettings.flatOptions || {};
        for (key in src) if (src[key] !== undefined) (flatOptions[key] ? target : deep || (deep = {}))[key] = src[key];
        if (deep) jQuery.extend(true, target, deep);
        return target;
    }
    jQuery.fn.load = function(url, params, callback) {
        if ("string" !== typeof url && _load) return _load.apply(this, arguments);
        var selector, type, response, self = this, off = url.indexOf(" ");
        if (off >= 0) {
            selector = url.slice(off);
            url = url.slice(0, off);
        }
        if (jQuery.isFunction(params)) {
            callback = params;
            params = undefined;
        } else if (params && "object" === typeof params) type = "POST";
        if (self.length > 0) jQuery.ajax({
            url: url,
            type: type,
            dataType: "html",
            data: params
        }).done(function(responseText) {
            response = arguments;
            self.html(selector ? jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) : responseText);
        }).complete(callback && function(jqXHR, status) {
            self.each(callback, response || [ jqXHR.responseText, status, jqXHR ]);
        });
        return this;
    };
    jQuery.each([ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function(i, type) {
        jQuery.fn[type] = function(fn) {
            return this.on(type, fn);
        };
    });
    jQuery.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: ajaxLocation,
            type: "GET",
            isLocal: rlocalProtocol.test(ajaxLocParts[1]),
            global: true,
            processData: true,
            async: true,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": allTypes,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": true,
                "text json": jQuery.parseJSON,
                "text xml": jQuery.parseXML
            },
            flatOptions: {
                url: true,
                context: true
            }
        },
        ajaxSetup: function(target, settings) {
            return settings ? ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) : ajaxExtend(jQuery.ajaxSettings, target);
        },
        ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
        ajaxTransport: addToPrefiltersOrTransports(transports),
        ajax: function(url, options) {
            if ("object" === typeof url) {
                options = url;
                url = undefined;
            }
            options = options || {};
            var transport, cacheURL, responseHeadersString, responseHeaders, timeoutTimer, parts, fireGlobals, i, s = jQuery.ajaxSetup({}, options), callbackContext = s.context || s, globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event, deferred = jQuery.Deferred(), completeDeferred = jQuery.Callbacks("once memory"), statusCode = s.statusCode || {}, requestHeaders = {}, requestHeadersNames = {}, state = 0, strAbort = "canceled", jqXHR = {
                readyState: 0,
                getResponseHeader: function(key) {
                    var match;
                    if (2 === state) {
                        if (!responseHeaders) {
                            responseHeaders = {};
                            while (match = rheaders.exec(responseHeadersString)) responseHeaders[match[1].toLowerCase()] = match[2];
                        }
                        match = responseHeaders[key.toLowerCase()];
                    }
                    return null == match ? null : match;
                },
                getAllResponseHeaders: function() {
                    return 2 === state ? responseHeadersString : null;
                },
                setRequestHeader: function(name, value) {
                    var lname = name.toLowerCase();
                    if (!state) {
                        name = requestHeadersNames[lname] = requestHeadersNames[lname] || name;
                        requestHeaders[name] = value;
                    }
                    return this;
                },
                overrideMimeType: function(type) {
                    if (!state) s.mimeType = type;
                    return this;
                },
                statusCode: function(map) {
                    var code;
                    if (map) if (state < 2) for (code in map) statusCode[code] = [ statusCode[code], map[code] ]; else jqXHR.always(map[jqXHR.status]);
                    return this;
                },
                abort: function(statusText) {
                    var finalText = statusText || strAbort;
                    if (transport) transport.abort(finalText);
                    done(0, finalText);
                    return this;
                }
            };
            deferred.promise(jqXHR).complete = completeDeferred.add;
            jqXHR.success = jqXHR.done;
            jqXHR.error = jqXHR.fail;
            s.url = ((url || s.url || ajaxLocation) + "").replace(rhash, "").replace(rprotocol, ajaxLocParts[1] + "//");
            s.type = options.method || options.type || s.method || s.type;
            s.dataTypes = jQuery.trim(s.dataType || "*").toLowerCase().match(core_rnotwhite) || [ "" ];
            if (null == s.crossDomain) {
                parts = rurl.exec(s.url.toLowerCase());
                s.crossDomain = !!(parts && (parts[1] !== ajaxLocParts[1] || parts[2] !== ajaxLocParts[2] || (parts[3] || ("http:" === parts[1] ? "80" : "443")) !== (ajaxLocParts[3] || ("http:" === ajaxLocParts[1] ? "80" : "443"))));
            }
            if (s.data && s.processData && "string" !== typeof s.data) s.data = jQuery.param(s.data, s.traditional);
            inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);
            if (2 === state) return jqXHR;
            fireGlobals = s.global;
            if (fireGlobals && 0 === jQuery.active++) jQuery.event.trigger("ajaxStart");
            s.type = s.type.toUpperCase();
            s.hasContent = !rnoContent.test(s.type);
            cacheURL = s.url;
            if (!s.hasContent) {
                if (s.data) {
                    cacheURL = s.url += (ajax_rquery.test(cacheURL) ? "&" : "?") + s.data;
                    delete s.data;
                }
                if (false === s.cache) s.url = rts.test(cacheURL) ? cacheURL.replace(rts, "$1_=" + ajax_nonce++) : cacheURL + (ajax_rquery.test(cacheURL) ? "&" : "?") + "_=" + ajax_nonce++;
            }
            if (s.ifModified) {
                if (jQuery.lastModified[cacheURL]) jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]);
                if (jQuery.etag[cacheURL]) jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL]);
            }
            if (s.data && s.hasContent && false !== s.contentType || options.contentType) jqXHR.setRequestHeader("Content-Type", s.contentType);
            jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + ("*" !== s.dataTypes[0] ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]);
            for (i in s.headers) jqXHR.setRequestHeader(i, s.headers[i]);
            if (s.beforeSend && (false === s.beforeSend.call(callbackContext, jqXHR, s) || 2 === state)) return jqXHR.abort();
            strAbort = "abort";
            for (i in {
                success: 1,
                error: 1,
                complete: 1
            }) jqXHR[i](s[i]);
            transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);
            if (!transport) done(-1, "No Transport"); else {
                jqXHR.readyState = 1;
                if (fireGlobals) globalEventContext.trigger("ajaxSend", [ jqXHR, s ]);
                if (s.async && s.timeout > 0) timeoutTimer = setTimeout(function() {
                    jqXHR.abort("timeout");
                }, s.timeout);
                try {
                    state = 1;
                    transport.send(requestHeaders, done);
                } catch (e) {
                    if (state < 2) done(-1, e); else throw e;
                }
            }
            function done(status, nativeStatusText, responses, headers) {
                var isSuccess, success, error, response, modified, statusText = nativeStatusText;
                if (2 === state) return;
                state = 2;
                if (timeoutTimer) clearTimeout(timeoutTimer);
                transport = undefined;
                responseHeadersString = headers || "";
                jqXHR.readyState = status > 0 ? 4 : 0;
                isSuccess = status >= 200 && status < 300 || 304 === status;
                if (responses) response = ajaxHandleResponses(s, jqXHR, responses);
                response = ajaxConvert(s, response, jqXHR, isSuccess);
                if (isSuccess) {
                    if (s.ifModified) {
                        modified = jqXHR.getResponseHeader("Last-Modified");
                        if (modified) jQuery.lastModified[cacheURL] = modified;
                        modified = jqXHR.getResponseHeader("etag");
                        if (modified) jQuery.etag[cacheURL] = modified;
                    }
                    if (204 === status || "HEAD" === s.type) statusText = "nocontent"; else if (304 === status) statusText = "notmodified"; else {
                        statusText = response.state;
                        success = response.data;
                        error = response.error;
                        isSuccess = !error;
                    }
                } else {
                    error = statusText;
                    if (status || !statusText) {
                        statusText = "error";
                        if (status < 0) status = 0;
                    }
                }
                jqXHR.status = status;
                jqXHR.statusText = (nativeStatusText || statusText) + "";
                if (isSuccess) deferred.resolveWith(callbackContext, [ success, statusText, jqXHR ]); else deferred.rejectWith(callbackContext, [ jqXHR, statusText, error ]);
                jqXHR.statusCode(statusCode);
                statusCode = undefined;
                if (fireGlobals) globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [ jqXHR, s, isSuccess ? success : error ]);
                completeDeferred.fireWith(callbackContext, [ jqXHR, statusText ]);
                if (fireGlobals) {
                    globalEventContext.trigger("ajaxComplete", [ jqXHR, s ]);
                    if (!--jQuery.active) jQuery.event.trigger("ajaxStop");
                }
            }
            return jqXHR;
        },
        getJSON: function(url, data, callback) {
            return jQuery.get(url, data, callback, "json");
        },
        getScript: function(url, callback) {
            return jQuery.get(url, undefined, callback, "script");
        }
    });
    jQuery.each([ "get", "post" ], function(i, method) {
        jQuery[method] = function(url, data, callback, type) {
            if (jQuery.isFunction(data)) {
                type = type || callback;
                callback = data;
                data = undefined;
            }
            return jQuery.ajax({
                url: url,
                type: method,
                dataType: type,
                data: data,
                success: callback
            });
        };
    });
    function ajaxHandleResponses(s, jqXHR, responses) {
        var ct, type, finalDataType, firstDataType, contents = s.contents, dataTypes = s.dataTypes;
        while ("*" === dataTypes[0]) {
            dataTypes.shift();
            if (ct === undefined) ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
        }
        if (ct) for (type in contents) if (contents[type] && contents[type].test(ct)) {
            dataTypes.unshift(type);
            break;
        }
        if (dataTypes[0] in responses) finalDataType = dataTypes[0]; else {
            for (type in responses) {
                if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
                    finalDataType = type;
                    break;
                }
                if (!firstDataType) firstDataType = type;
            }
            finalDataType = finalDataType || firstDataType;
        }
        if (finalDataType) {
            if (finalDataType !== dataTypes[0]) dataTypes.unshift(finalDataType);
            return responses[finalDataType];
        }
    }
    function ajaxConvert(s, response, jqXHR, isSuccess) {
        var conv2, current, conv, tmp, prev, converters = {}, dataTypes = s.dataTypes.slice();
        if (dataTypes[1]) for (conv in s.converters) converters[conv.toLowerCase()] = s.converters[conv];
        current = dataTypes.shift();
        while (current) {
            if (s.responseFields[current]) jqXHR[s.responseFields[current]] = response;
            if (!prev && isSuccess && s.dataFilter) response = s.dataFilter(response, s.dataType);
            prev = current;
            current = dataTypes.shift();
            if (current) if ("*" === current) current = prev; else if ("*" !== prev && prev !== current) {
                conv = converters[prev + " " + current] || converters["* " + current];
                if (!conv) for (conv2 in converters) {
                    tmp = conv2.split(" ");
                    if (tmp[1] === current) {
                        conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]];
                        if (conv) {
                            if (true === conv) conv = converters[conv2]; else if (true !== converters[conv2]) {
                                current = tmp[0];
                                dataTypes.unshift(tmp[1]);
                            }
                            break;
                        }
                    }
                }
                if (true !== conv) if (conv && s["throws"]) response = conv(response); else try {
                    response = conv(response);
                } catch (e) {
                    return {
                        state: "parsererror",
                        error: conv ? e : "No conversion from " + prev + " to " + current
                    };
                }
            }
        }
        return {
            state: "success",
            data: response
        };
    }
    jQuery.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function(text) {
                jQuery.globalEval(text);
                return text;
            }
        }
    });
    jQuery.ajaxPrefilter("script", function(s) {
        if (s.cache === undefined) s.cache = false;
        if (s.crossDomain) s.type = "GET";
    });
    jQuery.ajaxTransport("script", function(s) {
        if (s.crossDomain) {
            var script, callback;
            return {
                send: function(_, complete) {
                    script = jQuery("<script>").prop({
                        async: true,
                        charset: s.scriptCharset,
                        src: s.url
                    }).on("load error", callback = function(evt) {
                        script.remove();
                        callback = null;
                        if (evt) complete("error" === evt.type ? 404 : 200, evt.type);
                    });
                    document.head.appendChild(script[0]);
                },
                abort: function() {
                    if (callback) callback();
                }
            };
        }
    });
    var oldCallbacks = [], rjsonp = /(=)\?(?=&|$)|\?\?/;
    jQuery.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var callback = oldCallbacks.pop() || jQuery.expando + "_" + ajax_nonce++;
            this[callback] = true;
            return callback;
        }
    });
    jQuery.ajaxPrefilter("json jsonp", function(s, originalSettings, jqXHR) {
        var callbackName, overwritten, responseContainer, jsonProp = false !== s.jsonp && (rjsonp.test(s.url) ? "url" : "string" === typeof s.data && !(s.contentType || "").indexOf("application/x-www-form-urlencoded") && rjsonp.test(s.data) && "data");
        if (jsonProp || "jsonp" === s.dataTypes[0]) {
            callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback;
            if (jsonProp) s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName); else if (false !== s.jsonp) s.url += (ajax_rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName;
            s.converters["script json"] = function() {
                if (!responseContainer) jQuery.error(callbackName + " was not called");
                return responseContainer[0];
            };
            s.dataTypes[0] = "json";
            overwritten = window[callbackName];
            window[callbackName] = function() {
                responseContainer = arguments;
            };
            jqXHR.always(function() {
                window[callbackName] = overwritten;
                if (s[callbackName]) {
                    s.jsonpCallback = originalSettings.jsonpCallback;
                    oldCallbacks.push(callbackName);
                }
                if (responseContainer && jQuery.isFunction(overwritten)) overwritten(responseContainer[0]);
                responseContainer = overwritten = undefined;
            });
            return "script";
        }
    });
    jQuery.ajaxSettings.xhr = function() {
        try {
            return new XMLHttpRequest();
        } catch (e) {}
    };
    var xhrSupported = jQuery.ajaxSettings.xhr(), xhrSuccessStatus = {
        0: 200,
        1223: 204
    }, xhrId = 0, xhrCallbacks = {};
    if (window.ActiveXObject) jQuery(window).on("unload", function() {
        for (var key in xhrCallbacks) xhrCallbacks[key]();
        xhrCallbacks = undefined;
    });
    jQuery.support.cors = !!xhrSupported && "withCredentials" in xhrSupported;
    jQuery.support.ajax = xhrSupported = !!xhrSupported;
    jQuery.ajaxTransport(function(options) {
        var callback;
        if (jQuery.support.cors || xhrSupported && !options.crossDomain) return {
            send: function(headers, complete) {
                var i, id, xhr = options.xhr();
                xhr.open(options.type, options.url, options.async, options.username, options.password);
                if (options.xhrFields) for (i in options.xhrFields) xhr[i] = options.xhrFields[i];
                if (options.mimeType && xhr.overrideMimeType) xhr.overrideMimeType(options.mimeType);
                if (!options.crossDomain && !headers["X-Requested-With"]) headers["X-Requested-With"] = "XMLHttpRequest";
                for (i in headers) xhr.setRequestHeader(i, headers[i]);
                callback = function(type) {
                    return function() {
                        if (callback) {
                            delete xhrCallbacks[id];
                            callback = xhr.onload = xhr.onerror = null;
                            if ("abort" === type) xhr.abort(); else if ("error" === type) complete(xhr.status || 404, xhr.statusText); else complete(xhrSuccessStatus[xhr.status] || xhr.status, xhr.statusText, "string" === typeof xhr.responseText ? {
                                text: xhr.responseText
                            } : undefined, xhr.getAllResponseHeaders());
                        }
                    };
                };
                xhr.onload = callback();
                xhr.onerror = callback("error");
                callback = xhrCallbacks[id = xhrId++] = callback("abort");
                xhr.send(options.hasContent && options.data || null);
            },
            abort: function() {
                if (callback) callback();
            }
        };
    });
    var fxNow, timerId, rfxtypes = /^(?:toggle|show|hide)$/, rfxnum = new RegExp("^(?:([+-])=|)(" + core_pnum + ")([a-z%]*)$", "i"), rrun = /queueHooks$/, animationPrefilters = [ defaultPrefilter ], tweeners = {
        "*": [ function(prop, value) {
            var tween = this.createTween(prop, value), target = tween.cur(), parts = rfxnum.exec(value), unit = parts && parts[3] || (jQuery.cssNumber[prop] ? "" : "px"), start = (jQuery.cssNumber[prop] || "px" !== unit && +target) && rfxnum.exec(jQuery.css(tween.elem, prop)), scale = 1, maxIterations = 20;
            if (start && start[3] !== unit) {
                unit = unit || start[3];
                parts = parts || [];
                start = +target || 1;
                do {
                    scale = scale || ".5";
                    start /= scale;
                    jQuery.style(tween.elem, prop, start + unit);
                } while (scale !== (scale = tween.cur() / target) && 1 !== scale && --maxIterations);
            }
            if (parts) {
                start = tween.start = +start || +target || 0;
                tween.unit = unit;
                tween.end = parts[1] ? start + (parts[1] + 1) * parts[2] : +parts[2];
            }
            return tween;
        } ]
    };
    function createFxNow() {
        setTimeout(function() {
            fxNow = undefined;
        });
        return fxNow = jQuery.now();
    }
    function createTween(value, prop, animation) {
        var tween, collection = (tweeners[prop] || []).concat(tweeners["*"]), index = 0, length = collection.length;
        for (;index < length; index++) if (tween = collection[index].call(animation, prop, value)) return tween;
    }
    function Animation(elem, properties, options) {
        var result, stopped, index = 0, length = animationPrefilters.length, deferred = jQuery.Deferred().always(function() {
            delete tick.elem;
        }), tick = function() {
            if (stopped) return false;
            var currentTime = fxNow || createFxNow(), remaining = Math.max(0, animation.startTime + animation.duration - currentTime), temp = remaining / animation.duration || 0, percent = 1 - temp, index = 0, length = animation.tweens.length;
            for (;index < length; index++) animation.tweens[index].run(percent);
            deferred.notifyWith(elem, [ animation, percent, remaining ]);
            if (percent < 1 && length) return remaining; else {
                deferred.resolveWith(elem, [ animation ]);
                return false;
            }
        }, animation = deferred.promise({
            elem: elem,
            props: jQuery.extend({}, properties),
            opts: jQuery.extend(true, {
                specialEasing: {}
            }, options),
            originalProperties: properties,
            originalOptions: options,
            startTime: fxNow || createFxNow(),
            duration: options.duration,
            tweens: [],
            createTween: function(prop, end) {
                var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
                animation.tweens.push(tween);
                return tween;
            },
            stop: function(gotoEnd) {
                var index = 0, length = gotoEnd ? animation.tweens.length : 0;
                if (stopped) return this;
                stopped = true;
                for (;index < length; index++) animation.tweens[index].run(1);
                if (gotoEnd) deferred.resolveWith(elem, [ animation, gotoEnd ]); else deferred.rejectWith(elem, [ animation, gotoEnd ]);
                return this;
            }
        }), props = animation.props;
        propFilter(props, animation.opts.specialEasing);
        for (;index < length; index++) {
            result = animationPrefilters[index].call(animation, elem, props, animation.opts);
            if (result) return result;
        }
        jQuery.map(props, createTween, animation);
        if (jQuery.isFunction(animation.opts.start)) animation.opts.start.call(elem, animation);
        jQuery.fx.timer(jQuery.extend(tick, {
            elem: elem,
            anim: animation,
            queue: animation.opts.queue
        }));
        return animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);
    }
    function propFilter(props, specialEasing) {
        var index, name, easing, value, hooks;
        for (index in props) {
            name = jQuery.camelCase(index);
            easing = specialEasing[name];
            value = props[index];
            if (jQuery.isArray(value)) {
                easing = value[1];
                value = props[index] = value[0];
            }
            if (index !== name) {
                props[name] = value;
                delete props[index];
            }
            hooks = jQuery.cssHooks[name];
            if (hooks && "expand" in hooks) {
                value = hooks.expand(value);
                delete props[name];
                for (index in value) if (!(index in props)) {
                    props[index] = value[index];
                    specialEasing[index] = easing;
                }
            } else specialEasing[name] = easing;
        }
    }
    jQuery.Animation = jQuery.extend(Animation, {
        tweener: function(props, callback) {
            if (jQuery.isFunction(props)) {
                callback = props;
                props = [ "*" ];
            } else props = props.split(" ");
            var prop, index = 0, length = props.length;
            for (;index < length; index++) {
                prop = props[index];
                tweeners[prop] = tweeners[prop] || [];
                tweeners[prop].unshift(callback);
            }
        },
        prefilter: function(callback, prepend) {
            if (prepend) animationPrefilters.unshift(callback); else animationPrefilters.push(callback);
        }
    });
    function defaultPrefilter(elem, props, opts) {
        var prop, value, toggle, tween, hooks, oldfire, anim = this, orig = {}, style = elem.style, hidden = elem.nodeType && isHidden(elem), dataShow = data_priv.get(elem, "fxshow");
        if (!opts.queue) {
            hooks = jQuery._queueHooks(elem, "fx");
            if (null == hooks.unqueued) {
                hooks.unqueued = 0;
                oldfire = hooks.empty.fire;
                hooks.empty.fire = function() {
                    if (!hooks.unqueued) oldfire();
                };
            }
            hooks.unqueued++;
            anim.always(function() {
                anim.always(function() {
                    hooks.unqueued--;
                    if (!jQuery.queue(elem, "fx").length) hooks.empty.fire();
                });
            });
        }
        if (1 === elem.nodeType && ("height" in props || "width" in props)) {
            opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];
            if ("inline" === jQuery.css(elem, "display") && "none" === jQuery.css(elem, "float")) style.display = "inline-block";
        }
        if (opts.overflow) {
            style.overflow = "hidden";
            anim.always(function() {
                style.overflow = opts.overflow[0];
                style.overflowX = opts.overflow[1];
                style.overflowY = opts.overflow[2];
            });
        }
        for (prop in props) {
            value = props[prop];
            if (rfxtypes.exec(value)) {
                delete props[prop];
                toggle = toggle || "toggle" === value;
                if (value === (hidden ? "hide" : "show")) if ("show" === value && dataShow && dataShow[prop] !== undefined) hidden = true; else continue;
                orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop);
            }
        }
        if (!jQuery.isEmptyObject(orig)) {
            if (dataShow) {
                if ("hidden" in dataShow) hidden = dataShow.hidden;
            } else dataShow = data_priv.access(elem, "fxshow", {});
            if (toggle) dataShow.hidden = !hidden;
            if (hidden) jQuery(elem).show(); else anim.done(function() {
                jQuery(elem).hide();
            });
            anim.done(function() {
                var prop;
                data_priv.remove(elem, "fxshow");
                for (prop in orig) jQuery.style(elem, prop, orig[prop]);
            });
            for (prop in orig) {
                tween = createTween(hidden ? dataShow[prop] : 0, prop, anim);
                if (!(prop in dataShow)) {
                    dataShow[prop] = tween.start;
                    if (hidden) {
                        tween.end = tween.start;
                        tween.start = "width" === prop || "height" === prop ? 1 : 0;
                    }
                }
            }
        }
    }
    function Tween(elem, options, prop, end, easing) {
        return new Tween.prototype.init(elem, options, prop, end, easing);
    }
    jQuery.Tween = Tween;
    Tween.prototype = {
        constructor: Tween,
        init: function(elem, options, prop, end, easing, unit) {
            this.elem = elem;
            this.prop = prop;
            this.easing = easing || "swing";
            this.options = options;
            this.start = this.now = this.cur();
            this.end = end;
            this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px");
        },
        cur: function() {
            var hooks = Tween.propHooks[this.prop];
            return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this);
        },
        run: function(percent) {
            var eased, hooks = Tween.propHooks[this.prop];
            if (this.options.duration) this.pos = eased = jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration); else this.pos = eased = percent;
            this.now = (this.end - this.start) * eased + this.start;
            if (this.options.step) this.options.step.call(this.elem, this.now, this);
            if (hooks && hooks.set) hooks.set(this); else Tween.propHooks._default.set(this);
            return this;
        }
    };
    Tween.prototype.init.prototype = Tween.prototype;
    Tween.propHooks = {
        _default: {
            get: function(tween) {
                var result;
                if (null != tween.elem[tween.prop] && (!tween.elem.style || null == tween.elem.style[tween.prop])) return tween.elem[tween.prop];
                result = jQuery.css(tween.elem, tween.prop, "");
                return !result || "auto" === result ? 0 : result;
            },
            set: function(tween) {
                if (jQuery.fx.step[tween.prop]) jQuery.fx.step[tween.prop](tween); else if (tween.elem.style && (null != tween.elem.style[jQuery.cssProps[tween.prop]] || jQuery.cssHooks[tween.prop])) jQuery.style(tween.elem, tween.prop, tween.now + tween.unit); else tween.elem[tween.prop] = tween.now;
            }
        }
    };
    Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
        set: function(tween) {
            if (tween.elem.nodeType && tween.elem.parentNode) tween.elem[tween.prop] = tween.now;
        }
    };
    jQuery.each([ "toggle", "show", "hide" ], function(i, name) {
        var cssFn = jQuery.fn[name];
        jQuery.fn[name] = function(speed, easing, callback) {
            return null == speed || "boolean" === typeof speed ? cssFn.apply(this, arguments) : this.animate(genFx(name, true), speed, easing, callback);
        };
    });
    jQuery.fn.extend({
        fadeTo: function(speed, to, easing, callback) {
            return this.filter(isHidden).css("opacity", 0).show().end().animate({
                opacity: to
            }, speed, easing, callback);
        },
        animate: function(prop, speed, easing, callback) {
            var empty = jQuery.isEmptyObject(prop), optall = jQuery.speed(speed, easing, callback), doAnimation = function() {
                var anim = Animation(this, jQuery.extend({}, prop), optall);
                if (empty || data_priv.get(this, "finish")) anim.stop(true);
            };
            doAnimation.finish = doAnimation;
            return empty || false === optall.queue ? this.each(doAnimation) : this.queue(optall.queue, doAnimation);
        },
        stop: function(type, clearQueue, gotoEnd) {
            var stopQueue = function(hooks) {
                var stop = hooks.stop;
                delete hooks.stop;
                stop(gotoEnd);
            };
            if ("string" !== typeof type) {
                gotoEnd = clearQueue;
                clearQueue = type;
                type = undefined;
            }
            if (clearQueue && false !== type) this.queue(type || "fx", []);
            return this.each(function() {
                var dequeue = true, index = null != type && type + "queueHooks", timers = jQuery.timers, data = data_priv.get(this);
                if (index) {
                    if (data[index] && data[index].stop) stopQueue(data[index]);
                } else for (index in data) if (data[index] && data[index].stop && rrun.test(index)) stopQueue(data[index]);
                for (index = timers.length; index--; ) if (timers[index].elem === this && (null == type || timers[index].queue === type)) {
                    timers[index].anim.stop(gotoEnd);
                    dequeue = false;
                    timers.splice(index, 1);
                }
                if (dequeue || !gotoEnd) jQuery.dequeue(this, type);
            });
        },
        finish: function(type) {
            if (false !== type) type = type || "fx";
            return this.each(function() {
                var index, data = data_priv.get(this), queue = data[type + "queue"], hooks = data[type + "queueHooks"], timers = jQuery.timers, length = queue ? queue.length : 0;
                data.finish = true;
                jQuery.queue(this, type, []);
                if (hooks && hooks.stop) hooks.stop.call(this, true);
                for (index = timers.length; index--; ) if (timers[index].elem === this && timers[index].queue === type) {
                    timers[index].anim.stop(true);
                    timers.splice(index, 1);
                }
                for (index = 0; index < length; index++) if (queue[index] && queue[index].finish) queue[index].finish.call(this);
                delete data.finish;
            });
        }
    });
    function genFx(type, includeWidth) {
        var which, attrs = {
            height: type
        }, i = 0;
        includeWidth = includeWidth ? 1 : 0;
        for (;i < 4; i += 2 - includeWidth) {
            which = cssExpand[i];
            attrs["margin" + which] = attrs["padding" + which] = type;
        }
        if (includeWidth) attrs.opacity = attrs.width = type;
        return attrs;
    }
    jQuery.each({
        slideDown: genFx("show"),
        slideUp: genFx("hide"),
        slideToggle: genFx("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(name, props) {
        jQuery.fn[name] = function(speed, easing, callback) {
            return this.animate(props, speed, easing, callback);
        };
    });
    jQuery.speed = function(speed, easing, fn) {
        var opt = speed && "object" === typeof speed ? jQuery.extend({}, speed) : {
            complete: fn || !fn && easing || jQuery.isFunction(speed) && speed,
            duration: speed,
            easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
        };
        opt.duration = jQuery.fx.off ? 0 : "number" === typeof opt.duration ? opt.duration : opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default;
        if (null == opt.queue || true === opt.queue) opt.queue = "fx";
        opt.old = opt.complete;
        opt.complete = function() {
            if (jQuery.isFunction(opt.old)) opt.old.call(this);
            if (opt.queue) jQuery.dequeue(this, opt.queue);
        };
        return opt;
    };
    jQuery.easing = {
        linear: function(p) {
            return p;
        },
        swing: function(p) {
            return .5 - Math.cos(p * Math.PI) / 2;
        }
    };
    jQuery.timers = [];
    jQuery.fx = Tween.prototype.init;
    jQuery.fx.tick = function() {
        var timer, timers = jQuery.timers, i = 0;
        fxNow = jQuery.now();
        for (;i < timers.length; i++) {
            timer = timers[i];
            if (!timer() && timers[i] === timer) timers.splice(i--, 1);
        }
        if (!timers.length) jQuery.fx.stop();
        fxNow = undefined;
    };
    jQuery.fx.timer = function(timer) {
        if (timer() && jQuery.timers.push(timer)) jQuery.fx.start();
    };
    jQuery.fx.interval = 13;
    jQuery.fx.start = function() {
        if (!timerId) timerId = setInterval(jQuery.fx.tick, jQuery.fx.interval);
    };
    jQuery.fx.stop = function() {
        clearInterval(timerId);
        timerId = null;
    };
    jQuery.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    };
    jQuery.fx.step = {};
    if (jQuery.expr && jQuery.expr.filters) jQuery.expr.filters.animated = function(elem) {
        return jQuery.grep(jQuery.timers, function(fn) {
            return elem === fn.elem;
        }).length;
    };
    jQuery.fn.offset = function(options) {
        if (arguments.length) return options === undefined ? this : this.each(function(i) {
            jQuery.offset.setOffset(this, options, i);
        });
        var docElem, win, elem = this[0], box = {
            top: 0,
            left: 0
        }, doc = elem && elem.ownerDocument;
        if (!doc) return;
        docElem = doc.documentElement;
        if (!jQuery.contains(docElem, elem)) return box;
        if (typeof elem.getBoundingClientRect !== core_strundefined) box = elem.getBoundingClientRect();
        win = getWindow(doc);
        return {
            top: box.top + win.pageYOffset - docElem.clientTop,
            left: box.left + win.pageXOffset - docElem.clientLeft
        };
    };
    jQuery.offset = {
        setOffset: function(elem, options, i) {
            var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition, position = jQuery.css(elem, "position"), curElem = jQuery(elem), props = {};
            if ("static" === position) elem.style.position = "relative";
            curOffset = curElem.offset();
            curCSSTop = jQuery.css(elem, "top");
            curCSSLeft = jQuery.css(elem, "left");
            calculatePosition = ("absolute" === position || "fixed" === position) && (curCSSTop + curCSSLeft).indexOf("auto") > -1;
            if (calculatePosition) {
                curPosition = curElem.position();
                curTop = curPosition.top;
                curLeft = curPosition.left;
            } else {
                curTop = parseFloat(curCSSTop) || 0;
                curLeft = parseFloat(curCSSLeft) || 0;
            }
            if (jQuery.isFunction(options)) options = options.call(elem, i, curOffset);
            if (null != options.top) props.top = options.top - curOffset.top + curTop;
            if (null != options.left) props.left = options.left - curOffset.left + curLeft;
            if ("using" in options) options.using.call(elem, props); else curElem.css(props);
        }
    };
    jQuery.fn.extend({
        position: function() {
            if (!this[0]) return;
            var offsetParent, offset, elem = this[0], parentOffset = {
                top: 0,
                left: 0
            };
            if ("fixed" === jQuery.css(elem, "position")) offset = elem.getBoundingClientRect(); else {
                offsetParent = this.offsetParent();
                offset = this.offset();
                if (!jQuery.nodeName(offsetParent[0], "html")) parentOffset = offsetParent.offset();
                parentOffset.top += jQuery.css(offsetParent[0], "borderTopWidth", true);
                parentOffset.left += jQuery.css(offsetParent[0], "borderLeftWidth", true);
            }
            return {
                top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", true),
                left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", true)
            };
        },
        offsetParent: function() {
            return this.map(function() {
                var offsetParent = this.offsetParent || docElem;
                while (offsetParent && !jQuery.nodeName(offsetParent, "html") && "static" === jQuery.css(offsetParent, "position")) offsetParent = offsetParent.offsetParent;
                return offsetParent || docElem;
            });
        }
    });
    jQuery.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(method, prop) {
        var top = "pageYOffset" === prop;
        jQuery.fn[method] = function(val) {
            return jQuery.access(this, function(elem, method, val) {
                var win = getWindow(elem);
                if (val === undefined) return win ? win[prop] : elem[method];
                if (win) win.scrollTo(!top ? val : window.pageXOffset, top ? val : window.pageYOffset); else elem[method] = val;
            }, method, val, arguments.length, null);
        };
    });
    function getWindow(elem) {
        return jQuery.isWindow(elem) ? elem : 9 === elem.nodeType && elem.defaultView;
    }
    jQuery.each({
        Height: "height",
        Width: "width"
    }, function(name, type) {
        jQuery.each({
            padding: "inner" + name,
            content: type,
            "": "outer" + name
        }, function(defaultExtra, funcName) {
            jQuery.fn[funcName] = function(margin, value) {
                var chainable = arguments.length && (defaultExtra || "boolean" !== typeof margin), extra = defaultExtra || (true === margin || true === value ? "margin" : "border");
                return jQuery.access(this, function(elem, type, value) {
                    var doc;
                    if (jQuery.isWindow(elem)) return elem.document.documentElement["client" + name];
                    if (9 === elem.nodeType) {
                        doc = elem.documentElement;
                        return Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name]);
                    }
                    return value === undefined ? jQuery.css(elem, type, extra) : jQuery.style(elem, type, value, extra);
                }, type, chainable ? margin : undefined, chainable, null);
            };
        });
    });
    jQuery.fn.size = function() {
        return this.length;
    };
    jQuery.fn.andSelf = jQuery.fn.addBack;
    if ("object" === typeof module && module && "object" === typeof module.exports) module.exports = jQuery; else if ("function" === typeof define && define.amd) define("jquery", [], function() {
        return jQuery;
    });
    if ("object" === typeof window && "object" === typeof window.document) window.jQuery = window.$ = jQuery;
}(window);

!function(root, factory) {
    var _global, _exports;
    if ("undefined" !== typeof exports && (root === exports || null == root)) _global = _exports = global;
    if (null == _global) _global = "undefined" === typeof window ? global : window;
    if (null == _exports) _exports = root || _global;
    if ("undefined" !== typeof include && "function" === typeof include.js) {
        _exports.include = include;
        _exports.includeLib = include.Lib || _global.includeLib;
        return;
    }
    factory(_global, _exports, _global.document);
}(this, function(global, exports, document) {
    var bin = {
        js: {},
        css: {},
        load: {}
    }, isWeb = !!(global.location && global.location.protocol && /^https?:/.test(global.location.protocol)), reg_subFolder = /([^\/]+\/)?\.\.\//, reg_hasProtocol = /^(file|https?):/i, cfg = {
        path: null,
        loader: null,
        version: null,
        lockedToFolder: null,
        sync: null,
        eval: null == document
    }, handler = {}, hasOwnProp = {}.hasOwnProperty, emptyResponse = {
        load: {}
    }, __array_slice = Array.prototype.slice, XMLHttpRequest = global.XMLHttpRequest;
    var Helper = {
        reportError: function(e) {
            console.error("IncludeJS Error:", e, e.message, e.url);
            "function" === typeof handler.onerror && handler.onerror(e);
        }
    }, XHR = function(resource, callback) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            4 === xhr.readyState && callback && callback(resource, xhr.responseText);
        };
        xhr.open("GET", "object" === typeof resource ? resource.url : resource, true);
        xhr.send();
    };
    function fn_proxy(fn, ctx) {
        return function() {
            fn.apply(ctx, arguments);
        };
    }
    function fn_doNothing(fn) {
        "function" === typeof fn && fn();
    }
    var obj_inherit, obj_getProperty, obj_setProperty;
    !function() {
        obj_inherit = function(target) {
            if ("function" === typeof target) target = target.prototype;
            var i = 1, imax = arguments.length, source, key;
            for (;i < imax; i++) {
                source = "function" === typeof arguments[i] ? arguments[i].prototype : arguments[i];
                for (key in source) target[key] = source[key];
            }
            return target;
        };
        obj_getProperty = function(obj, property) {
            var chain = property.split("."), length = chain.length, i = 0;
            for (;i < length; i++) {
                if (null == obj) return null;
                obj = obj[chain[i]];
            }
            return obj;
        };
        obj_setProperty = function(obj, property, value) {
            var chain = property.split("."), imax = chain.length - 1, i = -1, key;
            while (++i < imax) {
                key = chain[i];
                if (null == obj[key]) obj[key] = {};
                obj = obj[key];
            }
            obj[chain[i]] = value;
        };
    }();
    function arr_invoke(arr, args, ctx) {
        if (null == arr || arr instanceof Array === false) return;
        for (var i = 0, length = arr.length; i < length; i++) {
            if ("function" !== typeof arr[i]) continue;
            if (null == args) arr[i].call(ctx); else arr[i].apply(ctx, args);
        }
    }
    function arr_ensure(obj, xpath) {
        if (!xpath) return obj;
        var arr = xpath.split("."), imax = arr.length - 1, i = 0, key;
        for (;i < imax; i++) {
            key = arr[i];
            obj = obj[key] || (obj[key] = {});
        }
        key = arr[imax];
        return obj[key] || (obj[key] = []);
    }
    var path_getDir, path_getFile, path_getExtension, path_resolveCurrent, path_normalize, path_win32Normalize, path_resolveUrl, path_combine, path_isRelative;
    !function() {
        path_getDir = function(path) {
            return path.substring(0, path.lastIndexOf("/") + 1);
        };
        path_getFile = function(path) {
            path = path.replace("file://", "").replace(/\\/g, "/").replace(/\?[^\n]+$/, "");
            if (/^\/\w+:\/[^\/]/i.test(path)) return path.substring(1);
            return path;
        };
        path_getExtension = function(path) {
            var query = path.indexOf("?");
            if (query === -1) return path.substring(path.lastIndexOf(".") + 1);
            return path.substring(path.lastIndexOf(".", query) + 1, query);
        };
        path_resolveCurrent = function() {
            if (null == document) return "undefined" === typeof module ? "" : path_win32Normalize(module.parent.filename);
            var scripts = document.getElementsByTagName("script"), last = scripts[scripts.length - 1], url = last && last.getAttribute("src") || "";
            if ("/" === url[0]) return url;
            var location = window.location.pathname.replace(/\/[^\/]+\.\w+$/, "");
            if ("/" !== location[location.length - 1]) location += "/";
            return location + url;
        };
        path_normalize = function(path) {
            return path.replace(/\\/g, "/").replace(/([^:\/])\/{2,}/g, "$1/");
        };
        path_win32Normalize = function(path) {
            path = path_normalize(path);
            if ("file:" === path.substring(0, 5)) return path;
            return "file:///" + path;
        };
        path_resolveUrl = function(url, parent) {
            if (reg_hasProtocol.test(url)) return path_collapse(url);
            if ("./" === url.substring(0, 2)) url = url.substring(2);
            if ("/" === url[0] && null != parent && null != parent.base) {
                url = path_combine(parent.base, url);
                if (reg_hasProtocol.test(url)) return path_collapse(url);
            }
            if ("/" === url[0] && cfg.path) {
                url = cfg.path + url.substring(1);
                if (reg_hasProtocol.test(url)) return path_collapse(url);
            }
            if ("/" === url[0]) {
                if (false === isWeb || true === cfg.lockedToFolder) url = url.substring(1);
            } else if (null != parent && null != parent.location) url = parent.location + url;
            return path_collapse(url);
        };
        path_isRelative = function(path) {
            var c = path.charCodeAt(0);
            switch (c) {
              case 47:
                return false;

              case 102:
              case 104:
                return false === reg_hasProtocol.test(path);
            }
            return true;
        };
        path_combine = function() {
            var out = "", imax = arguments.length, i = -1, x;
            while (++i < imax) {
                x = arguments[i];
                if (!x) continue;
                x = path_normalize(x);
                if ("" === out) {
                    out = x;
                    continue;
                }
                if ("/" !== out[out.length - 1]) out += "/";
                if ("/" === x[0]) x = x.substring(1);
                out += x;
            }
            return out;
        };
        function path_collapse(url) {
            while (url.indexOf("../") !== -1) url = url.replace(reg_subFolder, "");
            return url.replace(/\/\.\//g, "/");
        }
    }();
    var tree_resolveUsage;
    !function() {
        tree_resolveUsage = function(resource, usage, next) {
            var use = [], imax = usage.length, i = -1, obj, path, name, index, parent;
            while (++i < imax) {
                name = path = usage[i];
                index = path.indexOf(".");
                if (index !== -1) {
                    name = path.substring(0, index);
                    path = path.substring(index + 1);
                }
                parent = use_resolveParent(name, resource.parent, resource);
                if (null == parent) return null;
                if (4 !== parent.state) {
                    resource.state = 3;
                    parent.on(4, next, parent, "push");
                    return null;
                }
                obj = parent.exports;
                if (name !== path) obj = obj_getProperty(obj, path);
                "object" === typeof obj && null == obj && console.warn("<include:use> Used resource has no exports", name, resource.url);
                use[i] = obj;
            }
            return use;
        };
        function use_resolveParent(name, resource, initiator) {
            if (null == resource) {
                console.warn("<include> Usage Not Found:", name);
                console.warn("- Ensure to have it included before with the correct alias");
                console.warn("- Initiator Stacktrace:");
                var arr = [], res = initiator;
                while (null != res) {
                    arr.push(res.url);
                    res = res.parent;
                }
                console.warn(arr.join("\n"));
                return null;
            }
            var includes = resource.includes, i = -1, imax = includes.length, include, exports, alias;
            while (++i < imax) {
                include = includes[i];
                alias = include.route.alias || Routes.parseAlias(include.route);
                if (alias === name) return include.resource;
            }
            return use_resolveParent(name, resource.parent, initiator);
        }
    }();
    var RoutesLib = function() {
        var routes = {}, regexpAlias = /([^\\\/]+)\.\w+$/;
        return {
            register: function(namespace, route, currentInclude) {
                if ("string" === typeof route && path_isRelative(route)) {
                    var res = currentInclude || include, location = res.location || path_getDir(res.url || path_resolveCurrent());
                    if (path_isRelative(location)) location = "/" + location;
                    route = location + route;
                }
                routes[namespace] = route instanceof Array ? route : route.split(/[\{\}]/g);
            },
            resolve: function(namespace, template) {
                var questionMark = template.indexOf("?"), aliasIndex = template.indexOf("::"), alias, path, params, route, i, x, length, arr;
                if (aliasIndex !== -1) {
                    alias = template.substring(aliasIndex + 2);
                    template = template.substring(0, aliasIndex);
                }
                if (questionMark !== -1) {
                    arr = template.substring(questionMark + 1).split("&");
                    params = {};
                    for (i = 0, length = arr.length; i < length; i++) {
                        x = arr[i].split("=");
                        params[x[0]] = x[1];
                    }
                    template = template.substring(0, questionMark);
                }
                template = template.split("/");
                route = routes[namespace];
                if (null == route) return {
                    path: template.join("/"),
                    params: params,
                    alias: alias
                };
                path = route[0];
                for (i = 1; i < route.length; i++) if (i % 2 === 0) path += route[i]; else {
                    var index = route[i] << 0;
                    if (index > template.length - 1) index = template.length - 1;
                    path += template[index];
                    if (i === route.length - 2) for (index++; index < template.length; index++) path += "/" + template[index];
                }
                return {
                    path: path,
                    params: params,
                    alias: alias
                };
            },
            each: function(type, includeData, fn, namespace, xpath) {
                var key;
                if (null == includeData) return;
                if ("lazy" === type && null == xpath) {
                    for (key in includeData) this.each(type, includeData[key], fn, null, key);
                    return;
                }
                if (includeData instanceof Array) {
                    for (var i = 0; i < includeData.length; i++) this.each(type, includeData[i], fn, namespace, xpath);
                    return;
                }
                if ("object" === typeof includeData) {
                    for (key in includeData) if (hasOwnProp.call(includeData, key)) this.each(type, includeData[key], fn, key, xpath);
                    return;
                }
                if ("string" === typeof includeData) {
                    var x = this.resolve(namespace, includeData);
                    if (namespace) namespace += "." + includeData;
                    fn(namespace, x, xpath);
                    return;
                }
                console.error("Include Package is invalid", arguments);
            },
            getRoutes: function() {
                return routes;
            },
            parseAlias: function(route) {
                var path = route.path, result = regexpAlias.exec(path);
                return result && result[1];
            }
        };
    };
    var Routes = RoutesLib();
    var Events = function(document) {
        if (null == document) return {
            ready: fn_doNothing,
            load: fn_doNothing
        };
        var readycollection = [];
        function onReady() {
            Events.ready = fn_doNothing;
            if (null == readycollection) return;
            arr_invoke(readycollection);
            readycollection = null;
        }
        if ("onreadystatechange" in document) document.onreadystatechange = function() {
            if (false === /complete|interactive/g.test(document.readyState)) return;
            onReady();
        }; else if (document.addEventListener) document.addEventListener("DOMContentLoaded", onReady); else window.onload = onReady;
        return {
            ready: function(callback) {
                readycollection.unshift(callback);
            }
        };
    }(document);
    var ScriptStack = function() {
        var head, currentResource, stack = [], _cb_complete = [], _paused;
        function loadScript(url, callback) {
            var tag = document.createElement("script");
            tag.type = "text/javascript";
            tag.src = url;
            if ("onreadystatechange" in tag) tag.onreadystatechange = function() {
                ("complete" === this.readyState || "loaded" === this.readyState) && callback();
            }; else tag.onload = tag.onerror = callback;
            (head || (head = document.getElementsByTagName("head")[0])).appendChild(tag);
        }
        function loadByEmbedding() {
            if (_paused) return;
            if (0 === stack.length) {
                trigger_complete();
                return;
            }
            if (null != currentResource) return;
            var resource = currentResource = stack[0];
            if (1 === resource.state) return;
            resource.state = 1;
            global.include = resource;
            global.iparams = resource.route.params;
            function resourceLoaded(e) {
                if (e && "error" === e.type) console.log("Script Loaded Error", resource.url);
                var i = 0, length = stack.length;
                for (;i < length; i++) if (stack[i] === resource) {
                    stack.splice(i, 1);
                    break;
                }
                if (i === length) {
                    console.error("Loaded Resource not found in stack", resource);
                    return;
                }
                if (2.5 !== resource.state) resource.readystatechanged(3);
                currentResource = null;
                loadByEmbedding();
            }
            if (resource.source) {
                __eval(resource.source, resource);
                resourceLoaded();
                return;
            }
            loadScript(resource.url, resourceLoaded);
        }
        function processByEval() {
            if (_paused) return;
            if (0 === stack.length) {
                trigger_complete();
                return;
            }
            if (null != currentResource) return;
            var resource = stack[0];
            if (resource.state < 2) return;
            currentResource = resource;
            resource.state = 1;
            global.include = resource;
            __eval(resource.source, resource);
            for (var i = 0, x, length = stack.length; i < length; i++) {
                x = stack[i];
                if (x === resource) {
                    stack.splice(i, 1);
                    break;
                }
            }
            if (2.5 !== resource.state) resource.readystatechanged(3);
            currentResource = null;
            processByEval();
        }
        function trigger_complete() {
            var i = -1, imax = _cb_complete.length;
            while (++i < imax) _cb_complete[i]();
            _cb_complete.length = 0;
        }
        return {
            load: function(resource, parent, forceEmbed) {
                this.add(resource, parent);
                if (!cfg.eval || forceEmbed) {
                    loadByEmbedding();
                    return;
                }
                if (resource.source) {
                    resource.state = 2;
                    processByEval();
                    return;
                }
                XHR(resource, function(resource, response) {
                    if (!response) {
                        console.error("Not Loaded:", resource.url);
                        console.error("- Initiator:", resource.parent && resource.parent.url || "<root resource>");
                    }
                    resource.source = response;
                    resource.state = 2;
                    processByEval();
                });
            },
            add: function(resource, parent) {
                if (1 === resource.priority) return stack.unshift(resource);
                if (null == parent) return stack.push(resource);
                var imax = stack.length, i = -1;
                while (++i < imax) if (stack[i] === parent) return stack.splice(i, 0, resource);
                stack.push(resource);
            },
            moveToParent: function(resource, parent) {
                var length = stack.length, parentIndex = -1, resourceIndex = -1, i;
                for (i = 0; i < length; i++) if (stack[i] === resource) {
                    resourceIndex = i;
                    break;
                }
                if (resourceIndex === -1) return;
                for (i = 0; i < length; i++) if (stack[i] === parent) {
                    parentIndex = i;
                    break;
                }
                if (parentIndex === -1) return;
                if (resourceIndex < parentIndex) return;
                stack.splice(resourceIndex, 1);
                stack.splice(parentIndex, 0, resource);
            },
            pause: function() {
                _paused = true;
            },
            resume: function() {
                _paused = false;
                if (null != currentResource) return;
                this.touch();
            },
            touch: function() {
                var fn = cfg.eval ? processByEval : loadByEmbedding;
                fn();
            },
            complete: function(callback) {
                if (true !== _paused && 0 === stack.length) {
                    callback();
                    return;
                }
                _cb_complete.push(callback);
            }
        };
    }();
    var IncludeDeferred = function() {
        this.callbacks = [];
        this.state = -1;
    };
    IncludeDeferred.prototype = {
        on: function(state, callback, sender, mutator) {
            if (this === sender && this.state === -1) {
                callback(this);
                return this;
            }
            if (null == mutator) mutator = this.state < 3 || this === sender ? "unshift" : "push";
            state <= this.state ? callback(this) : this.callbacks[mutator]({
                state: state,
                callback: callback
            });
            return this;
        },
        readystatechanged: function(state) {
            var i, length, x, currentInclude;
            if (state > this.state) this.state = state;
            if (3 === this.state) {
                var includes = this.includes;
                if (null != includes && includes.length) for (i = 0; i < includes.length; i++) if (4 !== includes[i].resource.state) return;
                this.state = 4;
            }
            i = 0;
            length = this.callbacks.length;
            if (0 === length) return;
            if ("js" === this.type && 4 === this.state) {
                currentInclude = global.include;
                global.include = this;
            }
            for (;i < length; i++) {
                x = this.callbacks[i];
                if (null == x || x.state > this.state) continue;
                this.callbacks.splice(i, 1);
                length--;
                i--;
                x.callback(this);
                if (this.state < 4) break;
            }
            if (null != currentInclude) global.include = currentInclude;
        },
        ready: function(callback) {
            var that = this;
            return this.on(4, function() {
                Events.ready(function() {
                    that.resolve(callback);
                });
            }, this);
        },
        done: function(callback) {
            var that = this;
            return this.on(4, function() {
                that.resolve(callback);
            }, this);
        },
        resolve: function(callback) {
            var includes = this.includes, length = null == includes ? 0 : includes.length;
            if (length > 0 && null == this.response) {
                this.response = {};
                var resource, route;
                for (var i = 0, x; i < length; i++) {
                    x = includes[i];
                    resource = x.resource;
                    route = x.route;
                    if ("undefined" === typeof resource.exports) continue;
                    var type = resource.type;
                    switch (type) {
                      case "js":
                      case "load":
                      case "ajax":
                        var alias = route.alias || Routes.parseAlias(route), obj = "js" === type ? this.response : this.response[type] || (this.response[type] = {});
                        if (null != alias) {
                            obj_setProperty(obj, alias, resource.exports);
                            break;
                        }
                        console.warn("<includejs> Alias is undefined", resource);
                    }
                }
            }
            var response = this.response || emptyResponse;
            var that = this;
            if (null == this._use && null != this._usage) {
                this._use = tree_resolveUsage(this, this._usage, function() {
                    that.state = 4;
                    that.resolve(callback);
                    that.readystatechanged(4);
                });
                if (this.state < 4) return;
            }
            if (this._use) {
                callback.apply(null, [ response ].concat(this._use));
                return;
            }
            callback(response);
        }
    };
    var Include, IncludeLib = {};
    !function(IncludeDeferred) {
        Include = function() {
            IncludeDeferred.call(this);
        };
        stub_release(Include.prototype);
        obj_inherit(Include, IncludeDeferred, {
            _use: null,
            _usage: null,
            isBrowser: true,
            isNode: false,
            setCurrent: function(data) {
                var url = data.url, resource = this.getResourceById(url, "js");
                if (null == resource) {
                    if ("/" === url[0] && this.base) url = this.base + url.substring(1);
                    var resource = new Resource("js", {
                        path: url
                    }, data.namespace, null, null, url);
                }
                if (resource.state < 3) console.error("<include> Resource should be loaded", data);
                resource.state = 3;
                global.include = resource;
            },
            cfg: function(arg) {
                switch (typeof arg) {
                  case "object":
                    var key, value;
                    for (key in arg) {
                        value = arg[key];
                        switch (key) {
                          case "loader":
                            for (var x in value) CustomLoader.register(x, value[x]);
                            break;

                          case "modules":
                            if (true === value) enableModules();
                            break;

                          default:
                            cfg[key] = value;
                        }
                    }
                    break;

                  case "string":
                    if (1 === arguments.length) return cfg[arg];
                    if (2 === arguments.length) cfg[arg] = arguments[1];
                    break;

                  case "undefined":
                    return cfg;
                }
                return this;
            },
            routes: function(mix) {
                if (null == mix) return Routes.getRoutes();
                if (2 === arguments.length) {
                    Routes.register(mix, arguments[1], this);
                    return this;
                }
                for (var key in mix) Routes.register(key, mix[key], this);
                return this;
            },
            promise: function(namespace) {
                var arr = namespace.split("."), obj = global;
                while (arr.length) {
                    var key = arr.shift();
                    obj = obj[key] || (obj[key] = {});
                }
                return obj;
            },
            register: function(_bin) {
                var base = this.base, key, info, infos, imax, i;
                function transform(info) {
                    if (null == base) return info;
                    if ("/" === info.url[0]) info.url = base + info.url.substring(1);
                    if ("/" === info.parent[0]) info.parent = base + info.parent.substring(1);
                    info.id = info.url;
                    return info;
                }
                for (key in _bin) {
                    infos = _bin[key];
                    imax = infos.length;
                    i = -1;
                    while (++i < imax) {
                        info = transform(infos[i]);
                        var id = info.id, url = info.url, namespace = info.namespace, parent = info.parent && incl_getResource(info.parent, "js"), resource = new Resource(), state = info.state;
                        if (!(id || url)) continue;
                        if (url) {
                            if ("/" === url[0]) url = url.substring(1);
                            resource.location = path_getDir(url);
                        }
                        resource.state = null == state ? "js" === key ? 3 : 4 : state;
                        resource.namespace = namespace;
                        resource.type = key;
                        resource.url = url || id;
                        resource.parent = parent;
                        resource.base = parent && parent.base || base;
                        switch (key) {
                          case "load":
                          case "lazy":
                            var container = document.querySelector("#includejs-" + id.replace(/\W/g, ""));
                            if (null == container) {
                                console.error('"%s" Data was not embedded into html', id);
                                break;
                            }
                            resource.exports = container.innerHTML;
                            if (CustomLoader.exists(resource)) {
                                resource.state = 3;
                                CustomLoader.load(resource, CustomLoader_onComplete);
                            }
                        }
                        (bin[key] || (bin[key] = {}))[id] = resource;
                    }
                }
                function CustomLoader_onComplete(resource, response) {
                    resource.exports = response;
                    resource.readystatechanged(4);
                }
            },
            instance: function(url, parent) {
                var resource;
                if (null == url) {
                    resource = new Include();
                    resource.state = 4;
                    return resource;
                }
                resource = new Resource();
                resource.state = 4;
                resource.location = path_getDir(path_normalize(url));
                resource.parent = parent;
                return resource;
            },
            getResource: function(url, type) {
                if (this.base && "/" === url[0]) url = this.base + url.substring(1);
                return incl_getResource(url, type);
            },
            getResourceById: function(url, type) {
                var _bin = bin[type], _res = _bin[url];
                if (null != _res) return _res;
                if (this.base && "/" === url[0]) {
                    _res = _bin[path_combine(this.base, url)];
                    if (null != _res) return _res;
                }
                if (this.base && this.location) {
                    _res = _bin[path_combine(this.base, this.location, url)];
                    if (null != _res) return _res;
                }
                if (this.location) {
                    _res = _bin[path_combine(this.location, url)];
                    if (null != _res) return _res;
                }
                return null;
            },
            getResources: function() {
                return bin;
            },
            plugin: function(pckg, callback) {
                var urls = [], length = 0, j = 0, i = 0, onload = function(url, response) {
                    j++;
                    embedPlugin(response);
                    if (j === length - 1 && callback) {
                        callback();
                        callback = null;
                    }
                };
                Routes.each("", pckg, function(namespace, route) {
                    urls.push("/" === route.path[0] ? route.path.substring(1) : route.path);
                });
                length = urls.length;
                for (;i < length; i++) XHR(urls[i], onload);
                return this;
            },
            client: function() {
                if (true === cfg.server) stub_freeze(this);
                return this;
            },
            server: function() {
                if (true !== cfg.server) stub_freeze(this);
                return this;
            },
            use: function() {
                if (null == this.parent) {
                    console.error("<include.use> Parent resource is undefined");
                    return this;
                }
                this._usage = arguments;
                return this;
            },
            pauseStack: fn_proxy(ScriptStack.pause, ScriptStack),
            resumeStack: fn_proxy(ScriptStack.resume, ScriptStack),
            allDone: function(callback) {
                ScriptStack.complete(function() {
                    var pending = include.getPending("js"), await = pending.length;
                    if (0 === await) {
                        callback();
                        return;
                    }
                    var i = -1, imax = await;
                    while (++i < imax) pending[i].on(4, check);
                    function check() {
                        if (--await < 1) callback();
                    }
                });
            },
            getPending: function(type) {
                var resources = [], res, key, id;
                for (key in bin) {
                    if (null != type && type !== key) continue;
                    for (id in bin[key]) {
                        res = bin[key][id];
                        if (res.state < 4) resources.push(res);
                    }
                }
                return resources;
            },
            Lib: IncludeLib
        });
        function incl_getResource(url, type) {
            var id = url;
            if (true === path_isRelative(url)) id = "/" + id;
            if (null != type) return bin[type][id];
            for (var key in bin) if (bin[key].hasOwnProperty(id)) return bin[key][id];
            return null;
        }
        function embedPlugin(source) {
            eval(source);
        }
        function enableModules() {
            if ("undefined" === typeof Object.defineProperty) {
                console.warn("Browser do not support Object.defineProperty");
                return;
            }
            Object.defineProperty(global, "module", {
                get: function() {
                    return global.include;
                }
            });
            Object.defineProperty(global, "exports", {
                get: function() {
                    var current = global.include;
                    return current.exports || (current.exports = {});
                },
                set: function(exports) {
                    global.include.exports = exports;
                }
            });
        }
        function includePackage(resource, type, mix) {
            var pckg = 1 === mix.length ? mix[0] : __array_slice.call(mix);
            if (resource instanceof Resource) return resource.include(type, pckg);
            return new Resource("js").include(type, pckg);
        }
        function createIncluder(type) {
            return function() {
                return includePackage(this, type, arguments);
            };
        }
        function doNothing() {
            return this;
        }
        function stub_freeze(include) {
            include.js = include.css = include.load = include.ajax = include.embed = include.lazy = include.inject = doNothing;
        }
        function stub_release(proto) {
            var fns = [ "js", "css", "load", "ajax", "embed", "lazy" ], i = fns.length;
            while (--i !== -1) proto[fns[i]] = createIncluder(fns[i]);
            proto["inject"] = proto.js;
        }
    }(IncludeDeferred);
    var CustomLoader = function() {
        var JSONParser = {
            process: function(source, res) {
                try {
                    return JSON.parse(source);
                } catch (error) {
                    console.error(error, source);
                    return null;
                }
            }
        };
        cfg.loader = {
            json: JSONParser
        };
        function loader_isInstance(x) {
            if ("string" === typeof x) return false;
            return "function" === typeof x.ready || "function" === typeof x.process;
        }
        function createLoader(url) {
            var extension = path_getExtension(url), loader = cfg.loader[extension];
            if (loader_isInstance(loader)) return loader;
            var path = loader, namespace;
            if ("object" === typeof path) for (var key in path) {
                namespace = key;
                path = path[key];
                break;
            }
            return cfg.loader[extension] = new Resource("js", Routes.resolve(namespace, path), namespace, null, null, null, 1);
        }
        function loader_completeDelegate(callback, resource) {
            return function(response) {
                callback(resource, response);
            };
        }
        function loader_process(source, resource, loader, callback) {
            if (null == loader.process) {
                callback(resource, source);
                return;
            }
            var delegate = loader_completeDelegate(callback, resource), syncResponse = loader.process(source, resource, delegate);
            if ("undefined" !== typeof syncResponse) callback(resource, syncResponse);
        }
        function tryLoad(resource, loader, callback) {
            if ("string" === typeof resource.exports) {
                loader_process(resource.exports, resource, loader, callback);
                return;
            }
            function onLoad(resource, response) {
                loader_process(response, resource, loader, callback);
            }
            if (loader.load) return loader.load(resource, onLoad);
            XHR(resource, onLoad);
        }
        return {
            load: function(resource, callback) {
                var loader = createLoader(resource.url);
                if (loader.process) {
                    tryLoad(resource, loader, callback);
                    return;
                }
                loader.on(4, function() {
                    tryLoad(resource, loader.exports, callback);
                }, null, "push");
            },
            exists: function(resource) {
                if (!resource.url) return false;
                var ext = path_getExtension(resource.url);
                return cfg.loader.hasOwnProperty(ext);
            },
            register: function(extension, handler) {
                if ("string" === typeof handler) {
                    var resource = include;
                    if (null == resource.location) resource = {
                        location: path_getDir(path_resolveCurrent())
                    };
                    handler = path_resolveUrl(handler, resource);
                }
                cfg.loader[extension] = handler;
            }
        };
    }();
    var LazyModule = {
        create: function(xpath, code) {
            var arr = xpath.split("."), obj = global, module = arr[arr.length - 1];
            while (arr.length > 1) {
                var prop = arr.shift();
                obj = obj[prop] || (obj[prop] = {});
            }
            arr = null;
            Object.defineProperty(obj, module, {
                get: function() {
                    delete obj[module];
                    try {
                        var r = __eval(code, global.include);
                        if (!(null == r || r instanceof Resource)) obj[module] = r;
                    } catch (error) {
                        error.xpath = xpath;
                        Helper.reportError(error);
                    } finally {
                        code = null;
                        xpath = null;
                        return obj[module];
                    }
                }
            });
        }
    };
    var Resource;
    !function(Include, Routes, ScriptStack, CustomLoader) {
        Resource = function(type, route, namespace, xpath, parent, id, priority) {
            Include.call(this);
            this.childLoaded = fn_proxy(this.childLoaded, this);
            var url = route && route.path;
            if (null != url) this.url = url = path_resolveUrl(url, parent);
            this.type = type;
            this.xpath = xpath;
            this.route = route;
            this.parent = parent;
            this.priority = priority;
            this.namespace = namespace;
            this.base = parent && parent.base;
            if (null == id && url) id = (path_isRelative(url) ? "/" : "") + url;
            var resource = bin[type] && bin[type][id];
            if (resource) {
                if (resource.state < 4 && "js" === type) ScriptStack.moveToParent(resource, parent);
                return resource;
            }
            if (null == url) {
                this.state = 3;
                this.location = path_getDir(path_resolveCurrent());
                return this;
            }
            this.state = 0;
            this.location = path_getDir(url);
            (bin[type] || (bin[type] = {}))[id] = this;
            if (cfg.version) this.url += (this.url.indexOf("?") === -1 ? "?" : "&") + "v=" + cfg.version;
            return process(this);
        };
        Resource.prototype = obj_inherit(Resource, Include, {
            state: null,
            location: null,
            includes: null,
            response: null,
            url: null,
            base: null,
            type: null,
            xpath: null,
            route: null,
            parent: null,
            priority: null,
            namespace: null,
            setBase: function(baseUrl) {
                this.base = baseUrl;
                return this;
            },
            childLoaded: function(child) {
                var resource = this, includes = resource.includes;
                if (includes && includes.length) {
                    if (resource.state < 3) return;
                    for (var i = 0; i < includes.length; i++) if (4 !== includes[i].resource.state) return;
                }
                resource.readystatechanged(4);
            },
            create: function(type, route, namespace, xpath, id) {
                var resource;
                this.state = this.state >= 3 ? 3 : 2;
                this.response = null;
                if (null == this.includes) this.includes = [];
                resource = new Resource(type, route, namespace, xpath, this, id);
                this.includes.push({
                    resource: resource,
                    route: route
                });
                return resource;
            },
            include: function(type, pckg) {
                var that = this, children = [], child;
                Routes.each(type, pckg, function(namespace, route, xpath) {
                    if (null != that.route && that.route.path === route.path) return;
                    child = that.create(type, route, namespace, xpath);
                    children.push(child);
                });
                var i = -1, imax = children.length;
                while (++i < imax) children[i].on(4, this.childLoaded);
                return this;
            },
            pause: function() {
                this.state = 2.5;
                var that = this;
                return function(exports) {
                    if (1 === arguments.length) that.exports = exports;
                    that.readystatechanged(3);
                };
            },
            getNestedOfType: function(type) {
                return resource_getChildren(this.includes, type);
            }
        });
        function process(resource) {
            var type = resource.type, parent = resource.parent, url = resource.url;
            if (null == document && "css" === type) {
                resource.state = 4;
                return resource;
            }
            if (false === CustomLoader.exists(resource)) switch (type) {
              case "js":
              case "embed":
                ScriptStack.load(resource, parent, "embed" === type);
                break;

              case "ajax":
              case "load":
              case "lazy":
                XHR(resource, onXHRCompleted);
                break;

              case "css":
                resource.state = 4;
                var tag = document.createElement("link");
                tag.href = url;
                tag.rel = "stylesheet";
                tag.type = "text/css";
                document.getElementsByTagName("head")[0].appendChild(tag);
            } else {
                if ("js" === type || "embed" === type) ScriptStack.add(resource, resource.parent);
                CustomLoader.load(resource, onXHRCompleted);
            }
            return resource;
        }
        function onXHRCompleted(resource, response) {
            if (!response) console.warn("Resource cannt be loaded", resource.url);
            switch (resource.type) {
              case "js":
              case "embed":
                resource.source = response;
                resource.state = 2;
                ScriptStack.touch();
                return;

              case "load":
              case "ajax":
                resource.exports = response;
                break;

              case "lazy":
                LazyModule.create(resource.xpath, response);
                break;

              case "css":
                var tag = document.createElement("style");
                tag.type = "text/css";
                tag.innerHTML = response;
                document.getElementsByTagName("head")[0].appendChild(tag);
            }
            resource.readystatechanged(4);
        }
        function resource_getChildren(includes, type, out) {
            if (null == includes) return null;
            if (null == out) out = [];
            var imax = includes.length, i = -1, x;
            while (++i < imax) {
                x = includes[i].resource;
                if (type === x.type) out.push(x);
                if (null != x.includes) resource_getChildren(x.includes, type, out);
            }
            return out;
        }
    }(Include, Routes, ScriptStack, CustomLoader);
    IncludeLib.Routes = RoutesLib;
    IncludeLib.Resource = Resource;
    IncludeLib.ScriptStack = ScriptStack;
    IncludeLib.registerLoader = CustomLoader.register;
    exports.include = new Include();
    exports.includeLib = IncludeLib;
});

function __eval(source, include) {
    var iparams = include && include.route.params;
    return eval.call(window, source);
}

include.pauseStack();

include.routes({
    model: "/js/model/{0}.js",
    cntrl: "/js/cntrl/{0}.js",
    compo: "/js/compo/{0}/{1}.js"
});

include.register({
    css: [ {
        id: "/bower_components/todomvc-common/base.css",
        url: "/bower_components/todomvc-common/base.css",
        namespace: "",
        parent: "/"
    } ],
    load: [ {
        id: "/js/compo/todoList/todoList.mask",
        url: "/js/compo/todoList/todoList.mask",
        parent: "/js/compo/todoList/todoList.js"
    }, {
        id: "/js/compo/todoList/todoTask/todoTask.mask",
        url: "/js/compo/todoList/todoTask/todoTask.mask",
        parent: "/js/compo/todoList/todoTask/todoTask.js"
    }, {
        id: "/js/compo/filter/filter.mask",
        url: "/js/compo/filter/filter.mask",
        parent: "/js/compo/filter/filter.js"
    }, {
        id: "/js/app.mask",
        url: "/js/app.mask",
        parent: "/js/app.js"
    } ],
    js: [ {
        id: "/bower_components/todomvc-common/base.js",
        url: "/bower_components/todomvc-common/base.js",
        namespace: "",
        parent: "/",
        state: 4
    }, {
        id: "/bower_components/jquery/jquery.js",
        url: "/bower_components/jquery/jquery.js",
        namespace: "",
        parent: "/",
        state: 4
    }, {
        id: "/bower_components/includejs/lib/include.js",
        url: "/bower_components/includejs/lib/include.js",
        namespace: "",
        parent: "/",
        state: 4
    }, {
        id: "/bower_components/atma-class/lib/class.js",
        url: "/bower_components/atma-class/lib/class.js",
        namespace: "",
        parent: "/"
    }, {
        id: "/bower_components/maskjs/lib/mask.js",
        url: "/bower_components/maskjs/lib/mask.js",
        namespace: "",
        parent: "/"
    }, {
        id: "/bower_components/ruta/lib/ruta.js",
        url: "/bower_components/ruta/lib/ruta.js",
        namespace: "",
        parent: "/"
    }, {
        id: "/js/app.js",
        url: "/js/app.js",
        namespace: "",
        parent: "/"
    }, {
        id: "/js/model/Todos.js",
        url: "/js/model/Todos.js",
        namespace: "model.Todos",
        parent: "/js/app.js"
    }, {
        id: "/js/cntrl/input.js",
        url: "/js/cntrl/input.js",
        namespace: "cntrl.input",
        parent: "/js/app.js"
    }, {
        id: "/js/compo/todoList/todoList.js",
        url: "/js/compo/todoList/todoList.js",
        namespace: "compo.todoList",
        parent: "/js/app.js"
    }, {
        id: "/js/compo/todoList/todoTask/todoTask.js",
        url: "/js/compo/todoList/todoTask/todoTask.js",
        parent: "/js/compo/todoList/todoList.js"
    }, {
        id: "/js/compo/filter/filter.js",
        url: "/js/compo/filter/filter.js",
        namespace: "compo.filter",
        parent: "/js/app.js"
    } ]
});

include.setCurrent({
    id: "/bower_components/atma-class/lib/class.js",
    namespace: "",
    url: "/bower_components/atma-class/lib/class.js"
});

/*!
 * ClassJS v1.0.67
 * Part of the Atma.js Project
 * http://atmajs.com/
 *
 * MIT license
 * http://opensource.org/licenses/MIT
 *
 * (c) 2012, 2014 Atma.js and other contributors
 */
!function(root, factory) {
    var _global = "undefined" === typeof window || null == window.navigator ? global : window, _exports;
    _exports = root || _global;
    function construct() {
        return factory(_global, _exports);
    }
    if ("function" === typeof define && define.amd) return define(construct);
    construct();
    if ("undefined" !== typeof module) module.exports = _exports.Class;
}(this, function(global, exports) {
    var _Array_slice = Array.prototype.slice, _Array_sort = Array.prototype.sort, _cfg = {
        ModelHost: null
    };
    var str_CLASS_IDENTITY = "__$class__";
    var is_Function, is_Object, is_Array, is_ArrayLike, is_String, is_Date, is_notEmptyString, is_rawObject, is_NullOrGlobal;
    !function() {
        is_Function = function(x) {
            return "function" === typeof x;
        };
        is_Object = function(x) {
            return null != x && "object" === typeof x;
        };
        is_Date = function(x) {
            return null != x && "Date" === x.constructor.name && x instanceof Date;
        };
        is_Array = function(x) {
            return null != x && "number" === typeof x.length && "function" === typeof x.slice;
        };
        is_ArrayLike = is_Array;
        is_String = function(x) {
            return "string" === typeof x;
        };
        is_notEmptyString = function(x) {
            return "string" === typeof x && "" !== x;
        };
        is_rawObject = function(obj) {
            if (null == obj) return false;
            if ("object" !== typeof obj) return false;
            return obj.constructor === Object;
        };
        is_NullOrGlobal = function(ctx) {
            return ctx === void 0 || ctx === global;
        };
    }();
    var arr_each, arr_isArray, arr_remove;
    !function() {
        arr_each = function(array, callback) {
            if (arr_isArray(array)) {
                for (var i = 0, imax = array.length; i < imax; i++) callback(array[i], i);
                return;
            }
            callback(array);
        };
        arr_isArray = function(array) {
            return null != array && "object" === typeof array && "number" === typeof array.length && "function" === typeof array.splice;
        };
        arr_remove = function(array, fn) {
            var imax = array.length, i = -1;
            while (++i < imax) if (true === fn(array[i])) {
                array.splice(i, 1);
                i--;
                imax--;
            }
        };
        if ("function" !== typeof Array.isArray) Array.isArray = function(array) {
            if (array instanceof Array) return true;
            if (null == array || "object" !== typeof array) return false;
            return array.length !== void 0 && "function" === typeof array.slice;
        };
    }();
    var class_register, class_get, class_patch, class_stringify, class_parse, class_properties;
    !function() {
        class_register = function(namespace, class_) {
            obj_setProperty(_cfg.ModelHost || Class.Model, namespace, class_);
        };
        class_get = function(namespace) {
            return obj_getProperty(_cfg.ModelHost || Class.Model, namespace);
        };
        class_patch = function(mix, Proto) {
            var class_ = is_String(mix) ? class_get(mix) : mix;
            !is_Function(class_) && console.error("<class:patch> Not a Function", mix);
            Proto.Base = class_;
            class_ = Class(Proto);
            if (is_String(mix)) class_register(mix, class_);
            return class_;
        };
        class_stringify = function(class_) {
            return JSON.stringify(class_, stringify);
        };
        class_parse = function(str) {
            return JSON.parse(str, parse);
        };
        class_properties = function(Ctor) {
            return getProperties(Ctor);
        };
        function stringify(key, val) {
            if (null == val || "object" !== typeof val) return val;
            var current = this, obj = current[key];
            if (obj[str_CLASS_IDENTITY] && obj.toJSON) return stringifyMetaJSON(obj[str_CLASS_IDENTITY], val);
            return val;
        }
        function stringifyMetaJSON(className, json) {
            var out = {};
            out["json"] = json;
            out[str_CLASS_IDENTITY] = className;
            return out;
        }
        function parse(key, val) {
            var Ctor;
            if (null != val && "object" === typeof val && val[str_CLASS_IDENTITY]) {
                Ctor = Class(val[str_CLASS_IDENTITY]);
                if ("function" === typeof Ctor) val = new Ctor(val.json); else console.error("<class:parse> Class was not registered", val[str_CLASS_IDENTITY]);
            }
            return val;
        }
        function getProperties(proto, out) {
            if ("function" === typeof proto) proto = proto.prototype;
            if (null == out) out = {};
            var type, key, val;
            for (key in proto) {
                val = proto[key];
                type = null == val ? null : typeof val;
                if ("function" === type) continue;
                var c = key.charCodeAt(0);
                if (95 === c && "_id" !== key) continue;
                if (c >= 65 && c <= 90) continue;
                if ("object" === type) {
                    var ctor = val.constructor, ctor_name = ctor && ctor.name;
                    if ("Object" !== ctor_name && ctor_name && global[ctor_name] === ctor) {
                        out[key] = ctor_name;
                        continue;
                    }
                    out[key] = getProperties(val);
                    continue;
                }
                out[key] = type;
            }
            if (proto.__proto__) getProperties(proto.__proto__, out);
            return out;
        }
    }();
    var class_inherit, class_inheritStatics, class_extendProtoObjects;
    !function() {
        var PROTO = "__proto__";
        var _toString = Object.prototype.toString, _isArguments = function(args) {
            return "[object Arguments]" === _toString.call(args);
        };
        class_inherit = PROTO in Object.prototype ? inherit : inherit_protoLess;
        class_inheritStatics = function(_class, mix) {
            if (null == mix) return;
            if (is_ArrayLike(mix)) {
                var i = mix.length;
                while (--i > -1) class_inheritStatics(_class, mix[i]);
                return;
            }
            var Static;
            if (is_Function(mix)) Static = mix; else if (is_Object(mix.Static)) Static = mix.Static;
            if (null == Static) return;
            obj_extendDescriptorsDefaults(_class, Static);
        };
        class_extendProtoObjects = function(proto, _base, _extends) {
            var key, protoValue;
            for (key in proto) {
                protoValue = proto[key];
                if (!is_rawObject(protoValue)) continue;
                if (null != _base) if (is_rawObject(_base.prototype[key])) obj_defaults(protoValue, _base.prototype[key]);
                if (null != _extends) arr_each(_extends, function(x) {
                    x = proto_getProto(x);
                    if (is_rawObject(x[key])) obj_defaults(protoValue, x[key]);
                });
            }
        };
        function proto_extend(proto, source) {
            if (null == source) return;
            if ("function" === typeof proto) proto = proto.prototype;
            if ("function" === typeof source) source = source.prototype;
            var key, val;
            for (key in source) {
                val = source[key];
                if (null != val) proto[key] = val;
            }
        }
        function proto_override(super_, fn) {
            var proxy;
            if (super_) proxy = function(mix) {
                var args = 1 === arguments.length && _isArguments(mix) ? mix : arguments;
                return fn_apply(super_, this, args);
            }; else proxy = fn_doNothing;
            return function() {
                this["super"] = proxy;
                return fn_apply(fn, this, arguments);
            };
        }
        function inherit(_class, _base, _extends, original, _overrides, defaults) {
            var prototype = original, proto = original;
            prototype.constructor = _class.prototype.constructor;
            if (null != _extends) {
                proto[PROTO] = {};
                arr_each(_extends, function(x) {
                    proto_extend(proto[PROTO], x);
                });
                proto = proto[PROTO];
            }
            if (null != _base) proto[PROTO] = _base.prototype;
            for (var key in defaults) if (null == prototype[key]) prototype[key] = defaults[key];
            for (var key in _overrides) prototype[key] = proto_override(prototype[key], _overrides[key]);
            _class.prototype = prototype;
        }
        function inherit_protoLess(_class, _base, _extends, original, _overrides, defaults) {
            if (null != _base) {
                var tmp = function() {};
                tmp.prototype = _base.prototype;
                _class.prototype = new tmp();
                _class.prototype.constructor = _class;
            }
            if (null != _extends) arr_each(_extends, function(x) {
                delete x.constructor;
                proto_extend(_class, x);
            });
            var prototype = _class.prototype;
            obj_defaults(prototype, defaults);
            for (var key in _overrides) prototype[key] = proto_override(prototype[key], _overrides[key]);
            proto_extend(_class, original);
        }
        function proto_getProto(mix) {
            return is_Function(mix) ? mix.prototype : mix;
        }
    }();
    var json_key_SER = "__$serialization", json_proto_toJSON, json_proto_arrayToJSON;
    !function() {
        json_proto_toJSON = function(serialization) {
            var object = this, json = {}, key, val, s;
            if (null == serialization) serialization = object[json_key_SER];
            var asKey;
            for (key in object) {
                asKey = key;
                if (null != serialization && serialization.hasOwnProperty(key)) {
                    s = serialization[key];
                    if (null != s && "object" === typeof s) {
                        if (s.key) asKey = s.key;
                        if (s.hasOwnProperty("serialize")) {
                            if (null == s.serialize) continue;
                            json[asKey] = s.serialize(object[key]);
                            continue;
                        }
                    }
                }
                if (95 === key.charCodeAt(0)) continue;
                if ("Static" === key || "Validate" === key) continue;
                val = object[key];
                if (null == val) continue;
                if ("_id" === key) {
                    json[asKey] = val;
                    continue;
                }
                switch (typeof val) {
                  case "function":
                    continue;

                  case "object":
                    if (is_Date(val)) break;
                    var toJSON = val.toJSON;
                    if (null == toJSON) break;
                    json[asKey] = val.toJSON();
                    continue;
                }
                json[asKey] = val;
            }
            if (null != object._id) json._id = object._id;
            return json;
        };
        json_proto_arrayToJSON = function() {
            var array = this, imax = array.length, i = 0, output = new Array(imax), x;
            for (;i < imax; i++) {
                x = array[i];
                if (null != x && "object" === typeof x) {
                    var toJSON = x.toJSON;
                    if (toJSON === json_proto_toJSON || toJSON === json_proto_arrayToJSON) {
                        output[i] = x.toJSON();
                        continue;
                    }
                    if (null == toJSON) {
                        output[i] = json_proto_toJSON.call(x);
                        continue;
                    }
                }
                output[i] = x;
            }
            return output;
        };
    }();
    var obj_inherit, obj_getProperty, obj_setProperty, obj_defaults, obj_extend, obj_extendDescriptors, obj_extendDescriptorsDefaults, obj_validate;
    !function() {
        obj_inherit = function(target) {
            if (is_Function(target)) target = target.prototype;
            var i = 1, imax = arguments.length, source, key;
            for (;i < imax; i++) {
                source = is_Function(arguments[i]) ? arguments[i].prototype : arguments[i];
                for (key in source) {
                    if ("Static" === key) if (null != target.Static) {
                        for (key in source.Static) target.Static[key] = source.Static[key];
                        continue;
                    }
                    target[key] = source[key];
                }
            }
            return target;
        };
        obj_getProperty = function(obj, property) {
            var chain = property.split("."), imax = chain.length, i = -1;
            while (++i < imax) {
                if (null == obj) return null;
                obj = obj[chain[i]];
            }
            return obj;
        };
        obj_setProperty = function(obj, property, value) {
            var chain = property.split("."), imax = chain.length, i = -1, key;
            while (++i < imax - 1) {
                key = chain[i];
                if (null == obj[key]) obj[key] = {};
                obj = obj[key];
            }
            obj[chain[i]] = value;
        };
        obj_defaults = function(target, defaults) {
            for (var key in defaults) if (null == target[key]) target[key] = defaults[key];
            return target;
        };
        obj_extend = function(target, source) {
            if (null == target) target = {};
            if (null == source) return target;
            var val, key;
            for (key in source) {
                val = source[key];
                if (null != val) target[key] = val;
            }
            return target;
        };
        !function() {
            var getDescr = Object.getOwnPropertyDescriptor, define = Object.defineProperty;
            if (null == getDescr) {
                obj_extendDescriptors = obj_extend;
                obj_extendDescriptorsDefaults = obj_defaults;
                return;
            }
            obj_extendDescriptors = function(target, source) {
                return _extendDescriptors(target, source, false);
            };
            obj_extendDescriptorsDefaults = function(target, source) {
                return _extendDescriptors(target, source, true);
            };
            function _extendDescriptors(target, source, defaultsOnly) {
                if (null == target) return {};
                if (null == source) return source;
                var descr, key;
                for (key in source) {
                    if (true === defaultsOnly && null != target[key]) continue;
                    descr = getDescr(source, key);
                    if (null == descr) {
                        obj_extendDescriptors(target, source["__proto__"]);
                        continue;
                    }
                    if (descr.value !== void 0) {
                        target[key] = descr.value;
                        continue;
                    }
                    define(target, key, descr);
                }
                return target;
            }
        }();
        !function() {
            obj_validate = function(a) {
                if (null == a) return Err_Invalid("object");
                _props = null;
                _strict = false;
                var i = arguments.length, validator, x;
                while (--i > 0) {
                    x = arguments[i];
                    switch (typeof x) {
                      case "string":
                        if (null == _props) _props = {};
                        _props[x] = 1;
                        continue;

                      case "boolean":
                        _strict = x;
                        continue;

                      case "undefined":
                        continue;

                      default:
                        if (1 !== i) return Err_Invalid("validation argument at " + i);
                        validator = x;
                        continue;
                    }
                }
                if (null == validator) validator = a.Validate;
                if (null == validator) return null;
                return checkObject(a, validator, a);
            };
            var _strict = false, _props = null;
            function checkObject(a, b, ctx) {
                var error, optional, key, aVal, aKey;
                for (key in b) {
                    if (null != _props && a === ctx && false === _props.hasOwnProperty(key)) continue;
                    switch (key.charCodeAt(0)) {
                      case 63:
                        aKey = key.substring(1);
                        aVal = a[aKey];
                        //! accept falsy value
                        if (!aVal) continue;
                        error = checkProperty(aVal, b[key], ctx);
                        if (null != error) {
                            error.setInvalidProperty(aKey);
                            return error;
                        }
                        continue;

                      case 45:
                        aKey = key.substring(1);
                        if ("object" === typeof a && aKey in a) return Err_Unexpect(aKey);
                        continue;
                    }
                    aVal = a[key];
                    if (null == aVal) return Err_Expect(key);
                    error = checkProperty(aVal, b[key], ctx);
                    if (null != error) {
                        error.setInvalidProperty(key);
                        return error;
                    }
                }
                if (_strict) for (key in a) {
                    if (key in b || "?" + key in b) continue;
                    return Err_Unexpect(key);
                }
            }
            function checkProperty(aVal, bVal, ctx) {
                if (null == bVal) return null;
                if ("function" === typeof bVal) {
                    var error = bVal.call(ctx, aVal);
                    if (null == error || true === error) return null;
                    if (false === error) return Err_Invalid();
                    return Err_Custom(error);
                }
                if (null == aVal) return Err_Expect();
                if ("string" === typeof bVal) {
                    var str = "string", num = "number", bool = "boolean";
                    switch (bVal) {
                      case str:
                        return typeof aVal !== str || 0 === aVal.length ? Err_Type(str) : null;

                      case num:
                        return typeof aVal !== num ? Err_Type(num) : null;

                      case bool:
                        return typeof aVal !== bool ? Err_Type(bool) : null;
                    }
                }
                if (bVal instanceof RegExp) return false === bVal.test(aVal) ? Err_Invalid() : null;
                if (Array.isArray(bVal)) {
                    if (false === Array.isArray(aVal)) return Err_Type("array");
                    var i = -1, imax = aVal.length, error;
                    while (++i < imax) {
                        error = checkObject(aVal[i], bVal[0]);
                        if (error) {
                            error.setInvalidProperty(i);
                            return error;
                        }
                    }
                    return null;
                }
                if (typeof aVal !== typeof bVal) return Err_Type(typeof aVal);
                if ("object" === typeof aVal) return checkObject(aVal, bVal);
                return null;
            }
            var Err_Type, Err_Expect, Err_Unexpect, Err_Custom, Err_Invalid;
            !function() {
                Err_Type = create("type", function TypeErr(expect) {
                    this.expect = expect;
                }, {
                    toString: function() {
                        return "Invalid type." + (this.expect ? " Expect: " + this.expect : "") + (this.property ? " Property: " + this.property : "");
                    }
                });
                Err_Expect = create("expect", function ExpectErr(property) {
                    this.property = property;
                }, {
                    toString: function() {
                        return "Property expected." + (this.property ? "`" + this.property + "`" : "");
                    }
                });
                Err_Unexpect = create("unexpect", function UnexpectErr(property) {
                    this.property = property;
                }, {
                    toString: function() {
                        return "Unexpected property" + (this.property ? "`" + this.property + "`" : "");
                    }
                });
                Err_Custom = create("custom", function CustomErr(error) {
                    this.error = error;
                }, {
                    toString: function() {
                        return "Custom validation: " + this.error + (this.property ? " Property: " + this.property : "");
                    }
                });
                Err_Invalid = create("invalid", function InvalidErr(expect) {
                    this.expect = expect;
                }, {
                    toString: function() {
                        return "Invalid." + (this.expect ? " Expect: " + this.expect : "") + (this.property ? " Property: " + this.property : "");
                    }
                });
                function create(type, Ctor, proto) {
                    proto.type = type;
                    proto.property = null;
                    proto.setInvalidProperty = setInvalidProperty;
                    Ctor.prototype = proto;
                    return function(mix) {
                        return new Ctor(mix);
                    };
                }
                function setInvalidProperty(prop) {
                    if (null == this.property) {
                        this.property = prop;
                        return;
                    }
                    this.property = prop + "." + this.property;
                }
            }();
        }();
    }();
    var obj_patch, obj_patchValidate;
    !function() {
        obj_patch = function(obj, patch) {
            for (var key in patch) {
                var patcher = patches[key];
                if (patcher) patcher[fn_WALKER](obj, patch[key], patcher[fn_MODIFIER]); else console.error("Unknown or not implemented patcher", key);
            }
            return obj;
        };
        obj_patchValidate = function(patch) {
            if (null == patch) return "Undefined";
            var has = false;
            for (var key in patch) {
                has = true;
                if (null == patches[key]) return "Unsupported patcher: " + key;
            }
            if (false === has) return "No data";
            return null;
        };
        function walk_mutator(obj, data, fn) {
            for (var key in data) fn(obj_getProperty(obj, key), data[key], key);
        }
        function walk_modifier(obj, data, fn) {
            for (var key in data) obj_setProperty(obj, key, fn(obj_getProperty(obj, key), data[key], key));
        }
        function fn_IoC() {
            var fns = arguments;
            return function(val, mix, prop) {
                for (var i = 0, fn, imax = fns.length; i < imax; i++) {
                    fn = fns[i];
                    if (false === fn(val, mix, prop)) return;
                }
            };
        }
        function arr_checkArray(val, mix, prop) {
            if (false === arr_isArray(val)) {
                console.warn("<patch> property is not an array", prop);
                return false;
            }
        }
        function arr_push(val, mix, prop) {
            if (mix.hasOwnProperty("$each")) {
                for (var i = 0, imax = mix.$each.length; i < imax; i++) val.push(mix.$each[i]);
                return;
            }
            val.push(mix);
        }
        function arr_pop(val, mix, prop) {
            val[mix > 0 ? "pop" : "shift"]();
        }
        function arr_pull(val, mix, prop) {
            arr_remove(val, function(item) {
                return query_match(item, mix);
            });
        }
        function val_inc(val, mix, key) {
            return val + mix;
        }
        function val_set(val, mix, key) {
            return mix;
        }
        function val_unset() {
            return void 0;
        }
        function val_bit(val, mix) {
            if (mix.or) return val | mix.or;
            if (mix.and) return val & mix.and;
            return val;
        }
        var query_match;
        !function() {
            query_match = function(obj, mix) {
                for (var key in mix) if (obj[key] !== mix[key]) return false;
                return true;
            };
        }();
        var fn_WALKER = 0, fn_MODIFIER = 1;
        var patches = {
            $push: [ walk_mutator, fn_IoC(arr_checkArray, arr_push) ],
            $pop: [ walk_mutator, fn_IoC(arr_checkArray, arr_pop) ],
            $pull: [ walk_mutator, fn_IoC(arr_checkArray, arr_pull) ],
            $inc: [ walk_modifier, val_inc ],
            $set: [ walk_modifier, val_set ],
            $unset: [ walk_modifier, val_unset ],
            $bit: [ walk_modifier, val_unset ]
        };
    }();
    var fn_proxy, fn_apply, fn_createDelegate, fn_doNothing, fn_argsId;
    !function() {
        fn_proxy = function(fn, ctx) {
            return function() {
                return fn_apply(fn, ctx, arguments);
            };
        };
        fn_apply = function(fn, ctx, _arguments) {
            switch (_arguments.length) {
              case 0:
                return fn.call(ctx);

              case 1:
                return fn.call(ctx, _arguments[0]);

              case 2:
                return fn.call(ctx, _arguments[0], _arguments[1]);

              case 3:
                return fn.call(ctx, _arguments[0], _arguments[1], _arguments[2]);

              case 4:
                return fn.call(ctx, _arguments[0], _arguments[1], _arguments[2], _arguments[3]);

              case 5:
                return fn.call(ctx, _arguments[0], _arguments[1], _arguments[2], _arguments[3], _arguments[4]);
            }
            return fn.apply(ctx, _arguments);
        };
        fn_createDelegate = function(fn) {
            var args = _Array_slice.call(arguments, 1);
            return function() {
                if (arguments.length > 0) args = args.concat(_Array_slice.call(arguments));
                return fn_apply(fn, null, args);
            };
        };
        fn_doNothing = function() {};
        fn_argsId = function(args, cache) {
            if (0 === args.length) return 0;
            var imax = cache.length, i = -1;
            while (++i < imax) if (args_match(cache[i], args)) return i + 1;
            cache.push(args);
            return cache.length;
        };
        function args_match(a, b) {
            if (a.length !== b.length) return false;
            var imax = a.length, i = 0;
            for (;i < imax; i++) if (a[i] !== b[i]) return false;
            return true;
        }
    }();
    var XHR = {};
    (function() {
        !function(exports) {
            var ct_URL_ENCODED = "application/x-www-form-urlencoded", ct_JSON = "application/json";
            var e_NO_XHR = 1, e_TIMEOUT = 2, e_PRAPAIR_DATA = 3;
            function Promise() {
                this._callbacks = [];
            }
            Promise.prototype.then = function(func, context) {
                var p;
                if (this._isdone) p = func.apply(context, this.result); else {
                    p = new Promise();
                    this._callbacks.push(function() {
                        var res = func.apply(context, arguments);
                        if (res && "function" === typeof res.then) res.then(p.done, p);
                    });
                }
                return p;
            };
            Promise.prototype.done = function() {
                this.result = arguments;
                this._isdone = true;
                for (var i = 0; i < this._callbacks.length; i++) this._callbacks[i].apply(null, arguments);
                this._callbacks = [];
            };
            function join(promises) {
                var p = new Promise();
                var results = [];
                if (!promises || !promises.length) {
                    p.done(results);
                    return p;
                }
                var numdone = 0;
                var total = promises.length;
                function notifier(i) {
                    return function() {
                        numdone += 1;
                        results[i] = Array.prototype.slice.call(arguments);
                        if (numdone === total) p.done(results);
                    };
                }
                for (var i = 0; i < total; i++) promises[i].then(notifier(i));
                return p;
            }
            function chain(funcs, args) {
                var p = new Promise();
                if (0 === funcs.length) p.done.apply(p, args); else funcs[0].apply(null, args).then(function() {
                    funcs.splice(0, 1);
                    chain(funcs, arguments).then(function() {
                        p.done.apply(p, arguments);
                    });
                });
                return p;
            }
            function _encode(data) {
                var result = "";
                if ("string" === typeof data) result = data; else {
                    var e = encodeURIComponent;
                    for (var k in data) if (data.hasOwnProperty(k)) result += "&" + e(k) + "=" + e(data[k]);
                }
                return result;
            }
            function new_xhr() {
                var xhr;
                if (window.XMLHttpRequest) xhr = new XMLHttpRequest(); else if (window.ActiveXObject) try {
                    xhr = new ActiveXObject("Msxml2.XMLHTTP");
                } catch (e) {
                    xhr = new ActiveXObject("Microsoft.XMLHTTP");
                }
                return xhr;
            }
            function ajax(method, url, data, headers) {
                var p = new Promise(), contentType = headers && headers["Content-Type"] || promise.contentType;
                var xhr, payload;
                try {
                    xhr = new_xhr();
                } catch (e) {
                    p.done(e_NO_XHR, "");
                    return p;
                }
                if (data) if ("GET" === method) {
                    url += "?" + _encode(data);
                    data = null;
                } else switch (contentType) {
                  case ct_URL_ENCODED:
                    data = _encode(data);
                    break;

                  case ct_JSON:
                    try {
                        data = JSON.stringify(data);
                    } catch (error) {
                        p.done(e_PRAPAIR_DATA, "");
                        return p;
                    }

                  default:
                    data = _encode(data);
                }
                xhr.open(method, url);
                if (data) xhr.setRequestHeader("Content-Type", contentType);
                for (var h in headers) if (headers.hasOwnProperty(h)) xhr.setRequestHeader(h, headers[h]);
                function onTimeout() {
                    xhr.abort();
                    p.done(e_TIMEOUT, "", xhr);
                }
                var timeout = promise.ajaxTimeout;
                if (timeout) var tid = setTimeout(onTimeout, timeout);
                xhr.onreadystatechange = function() {
                    if (timeout) clearTimeout(tid);
                    if (4 === xhr.readyState) {
                        var err = !xhr.status || (xhr.status < 200 || xhr.status >= 300) && 304 !== xhr.status;
                        p.done(err, xhr.responseText, xhr);
                    }
                };
                xhr.send(data);
                return p;
            }
            function _ajaxer(method) {
                return function(url, data, headers) {
                    return ajax(method, url, data, headers);
                };
            }
            var promise = {
                Promise: Promise,
                join: join,
                chain: chain,
                ajax: ajax,
                get: _ajaxer("GET"),
                post: _ajaxer("POST"),
                put: _ajaxer("PUT"),
                del: _ajaxer("DELETE"),
                patch: _ajaxer("PATCH"),
                ENOXHR: e_NO_XHR,
                ETIMEOUT: e_TIMEOUT,
                E_PREPAIR_DATA: e_PRAPAIR_DATA,
                ajaxTimeout: 0,
                contentType: ct_JSON
            };
            if ("function" === typeof define && define.amd) define(function() {
                return promise;
            }); else exports.promise = promise;
        }(this);
    }).call(XHR);
    arr_each([ "get" ], function(key) {
        XHR[key] = function(path, sender) {
            this.promise[key](path).then(function(errored, response, xhr) {
                if (errored) {
                    sender.onError(errored, response, xhr);
                    return;
                }
                sender.onSuccess(response);
            });
        };
    });
    arr_each([ "del", "post", "put", "patch" ], function(key) {
        XHR[key] = function(path, data, cb) {
            this.promise[key](path, data).then(function(error, response, xhr) {
                cb(error, response, xhr);
            });
        };
    });
    var Serializable;
    !function() {
        Serializable = function($serialization) {
            if (this === Class || null == this || this === global) {
                var Ctor = function(data) {
                    this[json_key_SER] = obj_extend(this[json_key_SER], $serialization);
                    Serializable.call(this, data);
                };
                return Ctor;
            }
            if (null != $serialization) if (this.deserialize) this.deserialize($serialization); else Serializable.deserialize(this, $serialization);
        };
        Serializable.serialize = function(instance) {
            if (is_Function(instance.toJSON)) return instance.toJSON();
            return json_proto_toJSON.call(instance, instance[json_key_SER]);
        };
        Serializable.deserialize = function(instance, json) {
            if (is_String(json)) try {
                json = JSON.parse(json);
            } catch (error) {
                console.error("<json:deserialize>", json);
                return instance;
            }
            if (is_Array(json) && is_Function(instance.push)) {
                instance.length = 0;
                for (var i = 0, imax = json.length; i < imax; i++) instance.push(json[i]);
                return instance;
            }
            var props = instance[json_key_SER], asKeys, asKey, key, val, Mix;
            if (null != props) {
                var pname = "__desAsKeys";
                asKeys = props[pname];
                if (null == asKeys) {
                    asKeys = props[pname] = {};
                    for (key in props) if ("__desAsKeys" !== key && true === props[key].hasOwnProperty("key")) asKeys[props[key].key] = key;
                }
            }
            for (key in json) {
                val = json[key];
                asKey = key;
                if (null != props) {
                    Mix = props.hasOwnProperty(key) ? props[key] : null;
                    if (asKeys[key]) asKey = asKeys[key];
                    if (null != Mix) {
                        if (is_Object(Mix)) Mix = Mix.deserialize;
                        if (is_String(Mix)) Mix = class_get(Mix);
                        if (is_Function(Mix)) {
                            instance[asKey] = val instanceof Mix ? val : new Mix(val);
                            continue;
                        }
                    }
                }
                instance[asKey] = val;
            }
            return instance;
        };
    }();
    var Route = function() {
        function Route(route) {
            this.route = route_parse(route);
        }
        Route.prototype = {
            constructor: Route,
            create: function(object) {
                var path, query;
                path = route_interpolate(this.route.path, object, "/");
                if (null == path) return null;
                if (this.route.query) {
                    query = route_interpolate(this.route.query, object, "&");
                    if (null == query) return null;
                }
                return path + (query ? "?" + query : "");
            },
            hasAliases: function(object) {
                var i = 0, imax = this.route.path.length, alias;
                for (;i < imax; i++) {
                    alias = this.route.path[i].parts[1];
                    if (alias && null == object[alias]) return false;
                }
                return true;
            }
        };
        var regexp_pathByColon = /^([^:\?]*)(\??):(\??)([\w]+)$/, regexp_pathByBraces = /^([^\{\?]*)(\{(\??)([\w]+)\})?([^\s]*)?$/;
        function parse_single(string) {
            var match = regexp_pathByColon.exec(string);
            if (match) return {
                optional: "?" === (match[2] || match[3]),
                parts: [ match[1], match[4] ]
            };
            match = regexp_pathByBraces.exec(string);
            if (match) return {
                optional: "?" === match[3],
                parts: [ match[1], match[4], match[5] ]
            };
            console.error("Paths breadcrumbs should be matched by regexps");
            return {
                parts: [ string ]
            };
        }
        function parse_path(path, delimiter) {
            var parts = path.split(delimiter);
            for (var i = 0, imax = parts.length; i < imax; i++) parts[i] = parse_single(parts[i]);
            return parts;
        }
        function route_parse(route) {
            var question = /[^\:\{]\?[^:]/.exec(route), query = null;
            if (question) {
                question = question.index + 1;
                query = route.substring(question + 1);
                route = route.substring(0, question);
            }
            return {
                path: parse_path(route, "/"),
                query: null == query ? null : parse_path(query, "&")
            };
        }
        function route_interpolate(breadcrumbs, object, delimiter) {
            var route = [], key, parts;
            for (var i = 0, x, imax = breadcrumbs.length; i < imax; i++) {
                x = breadcrumbs[i];
                parts = x.parts.slice(0);
                if (null == parts[1]) {
                    route.push(parts[0]);
                    continue;
                }
                key = parts[1];
                parts[1] = object[key];
                if (null == parts[1]) {
                    if (!x.optional) {
                        console.error("Object has no value, for not optional part - ", key);
                        return null;
                    }
                    continue;
                }
                route.push(parts.join(""));
            }
            return route.join(delimiter);
        }
        return Route;
    }();
    var Deferred;
    !function() {
        Deferred = function() {};
        Deferred.prototype = {
            _isAsync: true,
            _done: null,
            _fail: null,
            _always: null,
            _resolved: null,
            _rejected: null,
            defer: function() {
                this._rejected = null;
                this._resolved = null;
            },
            isResolved: function() {
                return null != this._resolved;
            },
            isRejected: function() {
                return null != this._rejected;
            },
            isBusy: function() {
                return null == this._resolved && null == this._rejected;
            },
            resolve: function() {
                var done = this._done, always = this._always;
                this._resolved = arguments;
                dfr_clearListeners(this);
                arr_callOnce(done, this, arguments);
                arr_callOnce(always, this, [ this ]);
                return this;
            },
            reject: function() {
                var fail = this._fail, always = this._always;
                this._rejected = arguments;
                dfr_clearListeners(this);
                arr_callOnce(fail, this, arguments);
                arr_callOnce(always, this, [ this ]);
                return this;
            },
            resolveDelegate: function() {
                return fn_proxy(this.resolve, this);
            },
            rejectDelegate: function() {
                return fn_proxy(this.reject, this);
            },
            then: function(filterSuccess, filterError) {
                return this.pipe(filterSuccess, filterError);
            },
            done: function(callback) {
                if (null != this._rejected) return this;
                return dfr_bind(this, this._resolved, this._done || (this._done = []), callback);
            },
            fail: function(callback) {
                if (null != this._resolved) return this;
                return dfr_bind(this, this._rejected, this._fail || (this._fail = []), callback);
            },
            always: function(callback) {
                return dfr_bind(this, this._rejected || this._resolved, this._always || (this._always = []), callback);
            },
            pipe: function(mix) {
                var dfr;
                if ("function" === typeof mix) {
                    dfr = new Deferred();
                    var done_ = mix, fail_ = arguments.length > 1 ? arguments[1] : null;
                    this.done(delegate(dfr, "resolve", done_)).fail(delegate(dfr, "reject", fail_));
                    return dfr;
                }
                dfr = mix;
                var imax = arguments.length, done = 1 === imax, fail = 1 === imax, i = 0, x;
                while (++i < imax) {
                    x = arguments[i];
                    switch (x) {
                      case "done":
                        done = true;
                        break;

                      case "fail":
                        fail = true;
                        break;

                      default:
                        console.error("Unsupported pipe channel", arguments[i]);
                    }
                }
                done && this.done(dfr.resolveDelegate());
                fail && this.fail(dfr.rejectDelegate());
                function pipe(dfr, method) {
                    return function() {
                        dfr[method].apply(dfr, arguments);
                    };
                }
                function delegate(dfr, name, fn) {
                    return function() {
                        if (null != fn) {
                            var override = fn.apply(this, arguments);
                            if (null != override) {
                                if (true === isDeferred(override)) {
                                    override.pipe(dfr);
                                    return;
                                }
                                dfr[name](override);
                                return;
                            }
                        }
                        dfr[name].apply(dfr, arguments);
                    };
                }
                return this;
            },
            pipeCallback: function() {
                var self = this;
                return function(error) {
                    if (null != error) {
                        self.reject(error);
                        return;
                    }
                    var args = _Array_slice.call(arguments, 1);
                    fn_apply(self.resolve, self, args);
                };
            }
        };
        Deferred.run = function(fn, ctx) {
            var dfr = new Deferred();
            if (null == ctx) ctx = dfr;
            fn.call(ctx, dfr.resolveDelegate(), dfr.rejectDelegate(), dfr);
            return dfr;
        };
        Deferred.create = function(fn) {
            return function() {
                var args = _Array_slice.call(arguments), dfr = new Deferred();
                args.unshift(dfr);
                fn_apply(fn, this, args);
                return dfr;
            };
        };
        Deferred.memoize = function(fn) {
            var dfrs = {}, args_store = [];
            return function() {
                var args = _Array_slice.call(arguments), id = fn_argsId(args_store, args);
                if (null != dfrs[id]) return dfrs[id];
                var dfr = dfrs[id] = new Deferred();
                args.unshift(dfr);
                fn_apply(fn, this, args);
                return dfr;
            };
        };
        function dfr_bind(dfr, arguments_, listeners, callback) {
            if (null == callback) return dfr;
            if (null != arguments_) fn_apply(callback, dfr, arguments_); else listeners.push(callback);
            return dfr;
        }
        function dfr_clearListeners(dfr) {
            dfr._done = null;
            dfr._fail = null;
            dfr._always = null;
        }
        function arr_callOnce(arr, ctx, args) {
            if (null == arr) return;
            var imax = arr.length, i = -1, fn;
            while (++i < imax) {
                fn = arr[i];
                if (fn) fn_apply(fn, ctx, args);
            }
            arr.length = 0;
        }
        function isDeferred(x) {
            if (null == x || "object" !== typeof x) return false;
            if (x instanceof Deferred) return true;
            return "function" === typeof x.done && "function" === typeof x.fail;
        }
    }();
    var EventEmitter;
    !function() {
        EventEmitter = function() {
            this._listeners = {};
        };
        EventEmitter.prototype = {
            constructor: EventEmitter,
            on: function(event, callback) {
                if (null != callback) (this._listeners[event] || (this._listeners[event] = [])).push(callback);
                return this;
            },
            once: function(event, callback) {
                if (null != callback) {
                    callback._once = true;
                    (this._listeners[event] || (this._listeners[event] = [])).push(callback);
                }
                return this;
            },
            pipe: function(event) {
                var that = this, args;
                return function() {
                    args = _Array_slice.call(arguments);
                    args.unshift(event);
                    fn_apply(that.trigger, that, args);
                };
            },
            emit: event_trigger,
            trigger: event_trigger,
            off: function(event, callback) {
                var listeners = this._listeners[event];
                if (null == listeners) return this;
                if (1 === arguments.length) {
                    listeners.length = 0;
                    return this;
                }
                var imax = listeners.length, i = -1;
                while (++i < imax) if (listeners[i] === callback) {
                    listeners.splice(i, 1);
                    i--;
                    imax--;
                }
                return this;
            }
        };
        function event_trigger() {
            var args = _Array_slice.call(arguments), event = args.shift(), fns = this._listeners[event], fn, imax, i = 0;
            if (null == fns) return this;
            for (imax = fns.length; i < imax; i++) {
                fn = fns[i];
                fn_apply(fn, this, args);
                if (true === fn._once) {
                    fns.splice(i, 1);
                    i--;
                    imax--;
                }
            }
            return this;
        }
    }();
    var Class = function(mix) {
        var namespace, data;
        if (is_String(mix)) {
            namespace = mix;
            if (1 === arguments.length) return class_get(mix);
            data = arguments[1];
            data[str_CLASS_IDENTITY] = namespace;
        } else data = mix;
        var _base = data.Base, _extends = data.Extends, _static = data.Static, _construct = data.Construct, _class = null, _store = data.Store, _self = data.Self, _overrides = data.Override, key;
        if (null != _base) delete data.Base;
        if (null != _extends) delete data.Extends;
        if (null != _static) delete data.Static;
        if (null != _self) delete data.Self;
        if (null != _construct) delete data.Construct;
        if (null != _store) {
            if (null == _extends) _extends = _store; else if (is_Array(_extends)) _extends.unshift(_store); else _extends = [ _store, _extends ];
            delete data.Store;
        }
        if (null != _overrides) delete data.Override;
        if (null == _base && null == _extends && null == _self) {
            if (data.toJSON === void 0) data.toJSON = json_proto_toJSON;
            _class = null == _construct ? function() {} : _construct;
            data.constructor = _class.prototype.constructor;
            if (null != _static) obj_extendDescriptors(_class, _static);
            _class.prototype = data;
            if (null != namespace) class_register(namespace, _class);
            return _class;
        }
        _class = function() {
            if (null != _extends) {
                var isarray = _extends instanceof Array, imax = isarray ? _extends.length : 1, i = 0, x = null;
                for (;i < imax; i++) {
                    x = isarray ? _extends[i] : _extends;
                    if ("function" === typeof x) fn_apply(x, this, arguments);
                }
            }
            if (null != _base) fn_apply(_base, this, arguments);
            if (null != _self && false === is_NullOrGlobal(this)) for (var key in _self) this[key] = fn_proxy(_self[key], this);
            if (null != _construct) {
                var r = fn_apply(_construct, this, arguments);
                if (null != r) return r;
            }
            this["super"] = null;
            return this;
        };
        if (null != namespace) class_register(namespace, _class);
        if (null != _static) obj_extendDescriptors(_class, _static);
        if (null != _base) class_inheritStatics(_class, _base);
        if (null != _extends) class_inheritStatics(_class, _extends);
        class_extendProtoObjects(data, _base, _extends);
        class_inherit(_class, _base, _extends, data, _overrides, {
            toJSON: json_proto_toJSON
        });
        data = null;
        _static = null;
        return _class;
    };
    var Await;
    !function() {
        Await = Class({
            Extends: Deferred.prototype,
            _wait: 0,
            _timeout: null,
            _result: null,
            _resolved: [],
            Construct: function() {
                var imax = arguments.length, i = -1, dfr;
                while (++i < imax) {
                    dfr = arguments[i];
                    if (null != dfr && "function" === typeof dfr.done) await_deferredDelegate(this, null, dfr);
                }
            },
            delegate: function(name, errorable) {
                return await_createDelegate(this, name, errorable);
            },
            deferred: function(name) {
                return await_deferredDelegate(this, name, new Deferred());
            },
            Static: {
                TIMEOUT: 2e3
            }
        });
        function await_deferredDelegate(await, name, dfr) {
            var delegate = await_createDelegate(await, name, true), args;
            return dfr.done(function() {
                args = _Array_slice.call(arguments);
                args.unshift(null);
                delegate.apply(null, args);
            }).fail(function(error) {
                delegate(error);
            });
        }
        function await_createDelegate(await, name, errorable) {
            if (null == errorable) errorable = true;
            if (await._timeout) clearTimeout(await._timeout);
            await.defer();
            await._wait++;
            if (name) {
                if (!await._result) await._result = {};
                if (name in await._result) console.warn("<await>", name, "already awaiting");
                await._result[name] = null;
            }
            var delegate = fn_createDelegate(await_listener, await, name, errorable);
            await._timeout = setTimeout(delegate, Await.TIMEOUT);
            return delegate;
        }
        function await_listener(await, name, errorable) {
            if (0 === arguments.length) {
                await._wait = 0;
                await.reject("408: Timeout");
                return;
            }
            if (0 === await._wait) return;
            var result = await._result;
            if (name) {
                var args = _Array_slice.call(arguments, 3);
                result[name] = {
                    error: errorable ? args.shift() : null,
                    arguments: args
                };
            } else if (errorable && null != arguments[3]) {
                if (null == result) result = await._result = {};
                result.__error = arguments[3];
            }
            if (0 === --await._wait) {
                clearTimeout(await._timeout);
                var error = result && result.__error;
                var val, key;
                if (null == error) for (key in result) {
                    val = result[key];
                    error = val && val.error;
                    if (error) break;
                }
                if (error) {
                    await.reject(error, result);
                    return;
                }
                await.resolve(result);
            }
        }
    }();
    var StoreProto = {
        fetch: null,
        save: null,
        del: null,
        onSuccess: null,
        onError: null,
        Static: {
            fetch: function(data) {
                return new this().fetch(data);
            }
        }
    };
    var storageEvents_onBefore, storageEvents_onAfter, storageEvents_remove, storageEvents_overridenDefer;
    !function() {
        var event_START = "start", event_SUCCESS = "fulfilled", event_FAIL = "rejected";
        var events_ = new EventEmitter(), hasBeforeListeners_, hasAfterListeners_;
        storageEvents_onBefore = function(callback) {
            events_.on(event_START, callback);
            hasBeforeListeners_ = true;
        };
        storageEvents_onAfter = function(onSuccess, onFailure) {
            events_.on(event_SUCCESS, onSuccess).on(event_FAIL, onFailure);
            hasAfterListeners_ = true;
        };
        storageEvents_remove = function(callback) {
            events_.off(event_SUCCESS, callback).off(event_FAIL, callback).off(event_START, callback);
        };
        storageEvents_overridenDefer = function(type) {
            Deferred.prototype.defer.call(this);
            if (hasBeforeListeners_) emit([ event_START, this, type ]);
            if (hasAfterListeners_) this.always(listenerDelegate(this, type));
            return this;
        };
        function listenerDelegate(sender, type) {
            return function() {
                var isSuccess = null == sender._rejected, arguments_ = isSuccess ? sender._resolved : sender._rejected, event = isSuccess ? event_SUCCESS : event_FAIL;
                emit([ event, sender, type ].concat(arguments_));
            };
        }
        function emit(arguments_) {
            events_.trigger.apply(events_, arguments_);
        }
    }();
    Class.Remote = function() {
        var str_CONTENT_TYPE = "content-type", str_JSON = "json";
        var XHRRemote = function(route) {
            this._route = new Route(route);
        };
        obj_inherit(XHRRemote, StoreProto, Serializable, Deferred, {
            defer: storageEvents_overridenDefer,
            serialize: function() {
                return is_Array(this) ? json_proto_arrayToJSON.call(this) : json_proto_toJSON.call(this);
            },
            deserialize: function(json) {
                return Serializable.deserialize(this, json);
            },
            fetch: function(data) {
                this.defer("fetch");
                XHR.get(this._route.create(data || this), this);
                return this;
            },
            save: function(callback) {
                this.defer("save");
                var json = this.serialize(), path = this._route.create(this), method = this._route.hasAliases(this) ? "put" : "post";
                XHR[method](path, json, resolveDelegate(this, callback, "save"));
                return this;
            },
            patch: function(json) {
                this.defer("patch");
                obj_patch(this, json);
                XHR.patch(this._route.create(this), json, resolveDelegate(this));
                return this;
            },
            del: function(callback) {
                this.defer("del");
                var json = this.serialize(), path = this._route.create(this);
                XHR.del(path, json, resolveDelegate(this, callback));
                return this;
            },
            onSuccess: function(response) {
                parseFetched(this, response);
            },
            onError: function(errored, response, xhr) {
                reject(this, response, xhr);
            }
        });
        function parseFetched(self, response) {
            var json;
            try {
                json = JSON.parse(response);
            } catch (error) {
                reject(self, error);
                return;
            }
            self.deserialize(json);
            self.resolve(self);
        }
        function reject(self, response, xhr) {
            var obj;
            if ("string" === typeof response && is_JsonResponse(xhr)) try {
                obj = JSON.parse(response);
            } catch (error) {
                obj = error;
            }
            self.reject(obj || response);
        }
        function is_JsonResponse(xhr) {
            var header = xhr.getResponseHeader(str_CONTENT_TYPE);
            return null != header && header.toLowerCase().indexOf(str_JSON) !== -1;
        }
        function resolveDelegate(self, callback, action) {
            return function(error, response, xhr) {
                if (is_JsonResponse(xhr)) try {
                    response = JSON.parse(response);
                } catch (error) {
                    console.error("<XHR> invalid json response", response);
                    return reject(self, error, xhr);
                }
                if (callback) callback(error, response);
                if (error) return reject(self, response, xhr);
                if ("save" === action && is_Object(response)) {
                    if (is_Array(self)) {
                        var imax = self.length, jmax = response.length, i = -1;
                        while (++i < imax && i < jmax) Serializable.deserialize(self[i], response[i]);
                    } else self.deserialize(response);
                    return self.resolve(self);
                }
                self.resolve(response);
            };
        }
        function Remote(route) {
            return new XHRRemote(route);
        }
        Remote.onBefore = storageEvents_onBefore;
        Remote.onAfter = storageEvents_onAfter;
        arr_each([ "get", "post", "put", "delete" ], function(method) {
            Remote[method] = function(url, obj) {
                var json = obj;
                if (null != obj.serialize) json = obj.serialize();
                if (null == json && obj.toJSON) json = obj.toJSON();
                var dfr = new Deferred();
                XHR[method](url, json, resolveDelegate(dfr));
                return dfr;
            };
        });
        return Remote;
    }();
    Class.LocalStore = function() {
        var LocalStore = function(route) {
            this._route = new Route(route);
        };
        obj_inherit(LocalStore, StoreProto, Serializable, Deferred, {
            serialize: function() {
                var json = is_Array(this) ? json_proto_arrayToJSON.call(this) : json_proto_toJSON.call(this);
                return JSON.stringify(json);
            },
            deserialize: function(json) {
                return Serializable.deserialize(this, json);
            },
            fetch: function(data) {
                var path = this._route.create(data || this), object = localStorage.getItem(path);
                if (null == object) return this.resolve(this);
                if (is_String(object)) try {
                    object = JSON.parse(object);
                } catch (e) {
                    return this.reject(e);
                }
                this.deserialize(object);
                return this.resolve(this);
            },
            save: function(callback) {
                var path = this._route.create(this), store = this.serialize();
                localStorage.setItem(path, store);
                callback && callback();
                return this.resolve(this);
            },
            del: function(mix) {
                if (null == mix && 0 !== arguments.length) return this.reject("<localStore:del> - selector is specified, but is undefined");
                if (false === arr_isArray(this)) {
                    store_del(this._route, mix || this);
                    return this.resolve();
                }
                if (null == mix) {
                    for (var i = 0, imax = this.length; i < imax; i++) this[i] = null;
                    this.length = 0;
                    store_del(this._route, this);
                    return this.resolve();
                }
                var array = this.remove(mix);
                if (0 === array.length) return this.resolve();
                return this.save();
            },
            onError: function(error) {
                this.reject({
                    error: error
                });
            }
        });
        function store_del(route, data) {
            var path = route.create(data);
            localStorage.removeItem(path);
        }
        var Constructor = function(route) {
            return new LocalStore(route);
        };
        Constructor.prototype = LocalStore.prototype;
        return Constructor;
    }();
    Class.bind = function(cntx) {
        var arr = arguments, i = 1, length = arguments.length, key;
        for (;i < length; i++) {
            key = arr[i];
            cntx[key] = cntx[key].bind(cntx);
        }
        return cntx;
    };
    Class.cfg = function(mix, value) {
        if (is_String(mix)) {
            if (1 === arguments.length) return _cfg[mix];
            _cfg[mix] = value;
            return;
        }
        if (is_Object(mix)) for (var key in mix) Class.cfg(key, mix[key]);
    };
    Class.Model = {};
    Class.Serializable = Serializable;
    Class.Deferred = Deferred;
    Class.EventEmitter = EventEmitter;
    Class.Await = Await;
    Class.validate = obj_validate;
    Class.stringify = class_stringify;
    Class.parse = class_parse;
    Class.patch = class_patch;
    Class.properties = class_properties;
    Class.Collection = function() {
        var ArrayProto = function() {
            function check(x, mix) {
                if (null == mix) return false;
                if ("function" === typeof mix) return mix(x);
                if ("object" === typeof mix) {
                    if (x.constructor === mix.constructor && x.constructor !== Object) return x === mix;
                    var value, matcher;
                    for (var key in mix) {
                        value = x[key];
                        matcher = mix[key];
                        if ("string" === typeof matcher) {
                            var c = matcher[0], index = 1;
                            if ("<" === c || ">" === c) {
                                if ("=" === matcher[1]) {
                                    c += "=";
                                    index++;
                                }
                                matcher = matcher.substring(index);
                                switch (c) {
                                  case "<":
                                    if (value >= matcher) return false;
                                    continue;

                                  case "<=":
                                    if (value > matcher) return false;
                                    continue;

                                  case ">":
                                    if (value <= matcher) return false;
                                    continue;

                                  case ">=":
                                    if (value < matcher) return false;
                                    continue;
                                }
                            }
                        }
                        if (value != matcher) return false;
                    }
                    return true;
                }
                console.warn("No valid matcher", mix);
                return false;
            }
            var ArrayProto = {
                length: 0,
                push: function() {
                    var imax = arguments.length, i = -1;
                    while (++i < imax) this[this.length++] = create(this._ctor, arguments[i]);
                    return this;
                },
                pop: function() {
                    var instance = this[--this.length];
                    this[this.length] = null;
                    return instance;
                },
                shift: function() {
                    if (0 === this.length) return null;
                    var first = this[0], imax = this.length - 1, i = 0;
                    for (;i < imax; i++) this[i] = this[i + 1];
                    this[imax] = null;
                    this.length--;
                    return first;
                },
                unshift: function(mix) {
                    this.length++;
                    var imax = this.length;
                    while (--imax) this[imax] = this[imax - 1];
                    this[0] = create(this._ctor, mix);
                    return this;
                },
                splice: function(index, count) {
                    var length = this.length;
                    var i, imax, y;
                    if (index >= length) {
                        count = 0;
                        for (i = length, imax = index; i < imax; i++) this[i] = void 0;
                    }
                    var rm_count = count, rm_start = index, rm_end = index + rm_count, add_count = arguments.length - 2, new_length = length + add_count - rm_count;
                    var block_start = rm_end, block_end = length, block_shift = new_length - length;
                    if (0 < block_shift) {
                        i = block_end;
                        while (--i >= block_start) this[i + block_shift] = this[i];
                    }
                    if (0 > block_shift) {
                        i = block_start;
                        while (i < block_end) {
                            this[i + block_shift] = this[i];
                            i++;
                        }
                    }
                    i = rm_start;
                    y = 2;
                    for (;y < arguments.length; y) this[i++] = create(this._ctor, arguments[y++]);
                    this.length = new_length;
                    return this;
                },
                slice: function() {
                    return fn_apply(_Array_slice, this, arguments);
                },
                sort: function(fn) {
                    _Array_sort.call(this, fn);
                    return this;
                },
                reverse: function() {
                    var array = _Array_slice.call(this), imax = this.length, i = -1;
                    while (++i < imax) this[i] = array[imax - i - 1];
                    return this;
                },
                toString: function() {
                    return _Array_slice.call(this, 0).toString();
                },
                each: forEach,
                forEach: forEach,
                where: function(mix) {
                    var collection = new this.constructor();
                    for (var i = 0, x, imax = this.length; i < imax; i++) {
                        x = this[i];
                        if (check(x, mix)) collection[collection.length++] = x;
                    }
                    return collection;
                },
                remove: function(mix) {
                    var index = -1, array = [];
                    for (var i = 0, imax = this.length; i < imax; i++) {
                        if (check(this[i], mix)) {
                            array.push(this[i]);
                            continue;
                        }
                        this[++index] = this[i];
                    }
                    for (i = ++index; i < imax; i++) this[i] = null;
                    this.length = index;
                    return array;
                },
                first: function(mix) {
                    if (null == mix) return this[0];
                    var i = this.indexOf(mix);
                    return i !== -1 ? this[i] : null;
                },
                last: function(mix) {
                    if (null == mix) return this[this.length - 1];
                    var i = this.lastIndexOf(mix);
                    return i !== -1 ? this[i] : null;
                },
                indexOf: function(mix, index) {
                    if (null == mix) return -1;
                    if (null != index) {
                        if (index < 0) index = 0;
                        if (index >= this.length) return -1;
                    } else index = 0;
                    var imax = this.length;
                    for (;index < imax; index++) if (check(this[index], mix)) return index;
                    return -1;
                },
                lastIndexOf: function(mix, index) {
                    if (null == mix) return -1;
                    if (null != index) {
                        if (index >= this.length) index = this.length - 1;
                        if (index < 0) return -1;
                    } else index = this.length - 1;
                    for (;index > -1; index--) if (check(this[index], mix)) return index;
                    return -1;
                },
                map: function(fn) {
                    var arr = [], imax = this.length, i = -1;
                    while (++i < imax) arr[i] = fn(this[i]);
                    return arr;
                },
                filter: function(fn, ctx) {
                    var coll = new this.constructor(), imax = this.length, i = -1;
                    while (++i < imax) if (fn.call(ctx || this, this[i])) coll.push(this[i]);
                    return coll;
                }
            };
            if ("undefined" !== typeof Symbol && Symbol.iterator) ArrayProto[Symbol.iterator] = function() {
                var arr = this, i = -1;
                return {
                    next: function() {
                        return {
                            value: arr[++i],
                            done: i > arr.length - 1
                        };
                    },
                    hasNext: function() {
                        return i < arr.length;
                    }
                };
            };
            function forEach(fn, ctx) {
                var imax = this.length, i = -1;
                while (++i < imax) fn.call(ctx || this, this[i], i);
                return this;
            }
            return ArrayProto;
        }();
        function create(Constructor, mix) {
            if (mix instanceof Constructor) return mix;
            return new Constructor(mix);
        }
        var CollectionProto = {
            toArray: function() {
                var array = new Array(this.length);
                for (var i = 0, imax = this.length; i < imax; i++) array[i] = this[i];
                return array;
            },
            toJSON: json_proto_arrayToJSON
        };
        function Collection() {
            var length = arguments.length, Proto = arguments[length - 1], Child = arguments[length - 2], className;
            if (length > 2) className = arguments[0];
            Proto._ctor = Child;
            obj_inherit(Proto, CollectionProto, ArrayProto);
            return null == className ? Class(Proto) : Class(className, Proto);
        }
        return Collection;
    }();
    !function() {
        var fn_memoize, fn_memoizeAsync;
        !function() {
            fn_memoize = function(fn) {
                var _cache = {}, _args = [];
                return function() {
                    var id = fn_argsId(arguments, _args);
                    return null == _cache[id] ? _cache[id] = fn_apply(fn, this, arguments) : _cache[id];
                };
            };
            fn_memoizeAsync = function(fn) {
                var _cache = {}, _cacheCbs = {}, _args = [];
                return function() {
                    var args = _Array_slice.call(arguments), callback = args.pop();
                    var id = fn_argsId(args, _args);
                    if (_cache[id]) {
                        fn_apply(callback, this, _cache[id]);
                        return;
                    }
                    if (_cacheCbs[id]) {
                        _cacheCbs[id].push(callback);
                        return;
                    }
                    _cacheCbs[id] = [ callback ];
                    args = _Array_slice.call(args);
                    args.push(fn_resolveDelegate(_cache, _cacheCbs, id));
                    fn_apply(fn, this, args);
                };
            };
            function fn_resolveDelegate(cache, cbs, id) {
                return function() {
                    cache[id] = arguments;
                    for (var i = 0, x, imax = cbs[id].length; i < imax; i++) {
                        x = cbs[id][i];
                        fn_apply(x, this, arguments);
                    }
                    cbs[i] = null;
                    cache = null;
                    cbs = null;
                };
            }
        }();
        Class.Fn = {
            memoize: fn_memoize,
            memoizeAsync: fn_memoizeAsync
        };
    }();
    exports.Class = Class;
});

include.getResourceById("/bower_components/atma-class/lib/class.js", "js").readystatechanged(3);

include.setCurrent({
    id: "/bower_components/maskjs/lib/mask.js",
    namespace: "",
    url: "/bower_components/maskjs/lib/mask.js"
});

/*!
 * MaskJS v0.10.0
 * Part of the Atma.js Project
 * http://atmajs.com/
 *
 * MIT license
 * http://opensource.org/licenses/MIT
 *
 * (c) 2012, 2014 Atma.js and other contributors
 */
!function(root, factory) {
    var _global = "undefined" === typeof window || null == window.navigator ? global : window, _exports, _document;
    if ("undefined" !== typeof exports && (null == root || root === exports || root === _global)) root = exports;
    _document = _global.document;
    _exports = root || _global;
    function construct() {
        return factory(_global, _exports, _document);
    }
    if ("function" === typeof define && define.amd) return define(construct);
    return construct();
}(this, function(global, exports, document) {
    var coll_each, coll_remove, coll_map, coll_indexOf, coll_find;
    !function() {
        coll_each = function(coll, fn, ctx) {
            if (null == ctx) ctx = coll;
            if (null == coll) return coll;
            var imax = coll.length, i = 0;
            for (;i < imax; i++) fn.call(ctx, coll[i], i);
            return ctx;
        };
        coll_indexOf = function(coll, x) {
            if (null == coll) return -1;
            var imax = coll.length, i = 0;
            for (;i < imax; i++) if (coll[i] === x) return i;
            return -1;
        };
        coll_remove = function(coll, x) {
            var i = coll_indexOf(coll, x);
            if (i === -1) return false;
            coll.splice(i, 1);
            return true;
        };
        coll_map = function(coll, fn, ctx) {
            var arr = new Array(coll.length);
            coll_each(coll, function(x, i) {
                arr[i] = fn.call(this, x, i);
            }, ctx);
            return arr;
        };
        coll_find = function(coll, fn, ctx) {
            var imax = coll.length, i = 0;
            for (;i < imax; i++) if (fn.call(ctx || coll, coll[i], i)) return true;
            return false;
        };
    }();
    if (Array.prototype.forEach === void 0) Array.prototype.forEach = function(fn, ctx) {
        coll_each(this, fn, ctx);
    };
    if (Array.prototype.indexOf === void 0) Array.prototype.indexOf = function(x) {
        return coll_indexOf(this, x);
    };
    if (null == String.prototype.trim) String.prototype.trim = function() {
        var start = -1, end = this.length, code;
        if (0 === end) return this;
        while (++start < end) {
            code = this.charCodeAt(start);
            if (code > 32) break;
        }
        while (0 !== --end) {
            code = this.charCodeAt(end);
            if (code > 32) break;
        }
        return 0 !== start && end !== length - 1 ? this.substring(start, end + 1) : this;
    };
    if (null == Function.prototype.bind) {
        var _Array_slice;
        Function.prototype.bind = function() {
            if (arguments.length < 2 && "undefined" === typeof arguments[0]) return this;
            var fn = this, args = _Array_slice.call(arguments), ctx = args.shift();
            return function() {
                return fn.apply(ctx, args.concat(_Array_slice.call(arguments)));
            };
        };
    }
    var is_Function, is_Array, is_ArrayLike, is_String, is_Object, is_notEmptyString, is_rawObject;
    !function() {
        is_Function = function(x) {
            return "function" === typeof x;
        };
        is_Object = function(x) {
            return null != x && "object" === typeof x;
        };
        is_Array = is_ArrayLike = function(arr) {
            return null != arr && "object" === typeof arr && "number" === typeof arr.length && "function" === typeof arr.slice;
        };
        is_String = function(x) {
            return "string" === typeof x;
        };
        is_notEmptyString = function(x) {
            return "string" === typeof x && "" !== x;
        };
        is_rawObject = function(obj) {
            if (null == obj || "object" !== typeof obj) return false;
            return obj.constructor === Object;
        };
    }();
    var obj_getProperty, obj_setProperty, obj_extend, obj_create;
    !function() {
        obj_getProperty = function(obj, path) {
            if ("." === path) return obj;
            var chain = path.split("."), imax = chain.length, i = -1;
            while (null != obj && ++i < imax) obj = obj[chain[i]];
            return obj;
        };
        obj_setProperty = function(obj, path, val) {
            var chain = path.split("."), imax = chain.length - 1, i = -1, key;
            while (++i < imax) {
                key = chain[i];
                if (null == obj[key]) obj[key] = {};
                obj = obj[key];
            }
            obj[chain[i]] = val;
        };
        obj_extend = function(a, b) {
            if (null == b) return a || {};
            if (null == a) return obj_create(b);
            for (var key in b) a[key] = b[key];
            return a;
        };
        obj_create = Object.create || function(x) {
            var Ctor = function() {};
            Ctor.prototype = x;
            return new Ctor();
        };
    }();
    var arr_remove, arr_each, arr_indexOf, arr_contains;
    !function() {
        arr_remove = function(array, x) {
            var i = array.indexOf(x);
            if (i === -1) return false;
            array.splice(i, 1);
            return true;
        };
        arr_each = function(arr, fn, ctx) {
            arr.forEach(fn, ctx);
        };
        arr_indexOf = function(arr, x) {
            return arr.indexOf(x);
        };
        arr_contains = function(arr, x) {
            return arr.indexOf(x) !== -1;
        };
    }();
    var fn_proxy, fn_apply, fn_doNothing;
    !function() {
        fn_proxy = function(fn, ctx) {
            return function() {
                return fn_apply(fn, ctx, arguments);
            };
        };
        fn_apply = function(fn, ctx, args) {
            var l = args.length;
            if (0 === l) return fn.call(ctx);
            if (1 === l) return fn.call(ctx, args[0]);
            if (2 === l) return fn.call(ctx, args[0], args[1]);
            if (3 === l) return fn.call(ctx, args[0], args[1], args[2]);
            if (4 === l) return fn.call(ctx, args[0], args[1], args[2], args[3]);
            return fn.apply(ctx, args);
        };
        fn_doNothing = function() {
            return false;
        };
    }();
    var _Array_slice = Array.prototype.slice, _Array_splice = Array.prototype.splice, _Array_indexOf = Array.prototype.indexOf, _Object_create = obj_create, _Object_hasOwnProp = Object.hasOwnProperty;
    var __rgxEscapedChar = {
        "'": /\\'/g,
        '"': /\\"/g,
        "{": /\\\{/g,
        ">": /\\>/g,
        ";": /\\>/g
    }, __cfg = {
        allowCache: true
    };
    function util_interpolate(arr, type, model, ctx, element, controller, name) {
        var imax = arr.length, i = -1, array = null, string = "", even = true, utility, value, index, key, handler;
        while (++i < imax) {
            if (true === even) if (null == array) string += arr[i]; else array.push(arr[i]); else {
                key = arr[i];
                value = null;
                index = key.indexOf(":");
                if (index === -1) value = obj_getPropertyEx(key, model, ctx, controller); else {
                    utility = index > 0 ? key.substring(0, index).trim() : "";
                    if ("" === utility) utility = "expression";
                    key = key.substring(index + 1);
                    handler = custom_Utils[utility];
                    if (null == handler) {
                        log_error("Undefined custom util `%s`", utility);
                        continue;
                    }
                    value = handler(key, model, ctx, element, controller, name, type);
                }
                if (null != value) {
                    if ("object" === typeof value && null == array) array = [ string ];
                    if (null == array) string += value; else array.push(value);
                }
            }
            even = !even;
        }
        return null == array ? string : array;
    }
    var attr_extend;
    !function() {
        attr_extend = function(a, b) {
            if (null == a) return null == b ? {} : obj_create(b);
            if (null == b) return a;
            var key;
            for (key in b) {
                if ("class" === key && "string" === typeof a[key]) {
                    a[key] += " " + b[key];
                    continue;
                }
                a[key] = b[key];
            }
            return a;
        };
    }();
    function Template(template) {
        this.template = template;
        this.index = 0;
        this.length = template.length;
    }
    Template.prototype = {
        skipWhitespace: function() {
            var template = this.template, index = this.index, length = this.length;
            for (;index < length; index++) if (template.charCodeAt(index) > 32) break;
            this.index = index;
            return this;
        },
        skipToAttributeBreak: function() {
            var template = this.template, index = this.index, length = this.length, c;
            do {
                c = template.charCodeAt(++index);
                if (35 === c && 123 === template.charCodeAt(index + 1)) {
                    this.index = index;
                    this.sliceToChar("}");
                    this.index++;
                    return;
                }
            } while (46 !== c && 35 !== c && 62 !== c && 123 !== c && 32 !== c && 59 !== c && index < length);
            this.index = index;
        },
        sliceToChar: function(c) {
            var template = this.template, index = this.index, start = index, isEscaped = false, value, nindex;
            while ((nindex = template.indexOf(c, index)) > -1) {
                index = nindex;
                if (92 !== template.charCodeAt(index - 1)) break;
                isEscaped = true;
                index++;
            }
            value = template.substring(start, index);
            this.index = index;
            return isEscaped ? value.replace(__rgxEscapedChar[c], c) : value;
        }
    };
    var arr_pushMany;
    !function() {
        arr_pushMany = function(arr, arrSource) {
            if (null == arrSource || null == arr) return;
            var il = arr.length, jl = arrSource.length, j = -1;
            while (++j < jl) arr[il + j] = arrSource[j];
        };
    }();
    var obj_getPropertyEx, obj_toDictionary;
    !function() {
        obj_getPropertyEx = function(path, model, ctx, ctr) {
            if ("." === path) return model;
            var props = path.split("."), value = model, i = -1, imax = props.length, key = props[0], start_i;
            if ("$c" === key) {
                value = ctr;
                i++;
            } else if ("$a" === key) {
                value = ctr && ctr.attr;
                i++;
            } else if ("$u" === key) {
                value = customUtil_$utils;
                i++;
            } else if ("$ctx" === key) {
                value = ctx;
                i++;
            }
            start_i = i;
            while (null != value && ++i < imax) value = value[props[i]];
            if (null == value && start_i === -1) {
                var $scope;
                while (null != ctr) {
                    $scope = ctr.scope;
                    if (null != $scope) {
                        value = getProperty_($scope, props, 0, imax);
                        if (null != value) return value;
                    }
                    ctr = ctr.parent;
                }
            }
            return value;
        };
        obj_toDictionary = function(obj) {
            var array = [], i = 0, key;
            for (key in obj) array[i++] = {
                key: key,
                value: obj[key]
            };
            return array;
        };
        function getProperty_(obj, props, i, imax) {
            var val = obj;
            while (i < imax && null != val) {
                val = val[props[i]];
                i++;
            }
            return val;
        }
    }();
    var listeners_on, listeners_off, listeners_emit;
    !function() {
        listeners_on = function(event, fn) {
            (bin[event] || (bin[event] = [])).push(fn);
        };
        listeners_off = function(event, fn) {
            if (null == fn) {
                bin[event] = [];
                return;
            }
            arr_remove(bin[event], fn);
        };
        listeners_emit = function(event) {
            var fns = bin[event];
            if (null == fns) return;
            var imax = fns.length, i = -1, args = _Array_slice.call(arguments, 1);
            while (++i < imax) fns[i].apply(null, args);
        };
        var bin = {
            compoCreated: null,
            error: null
        };
    }();
    var throw_, parser_error, parser_warn, log_warn, log_error;
    !function() {
        throw_ = function(error) {
            log_error(error);
            listeners_emit("error", error);
        };
        parser_error = function(msg, str, i, token, state, file) {
            var error = createMsg("error", msg, str, i, token, state, file);
            log_error(error.message);
            log_warn(error.stack);
            listeners_emit("error", error);
        };
        parser_warn = function(msg, str, i, token, state, file) {
            var error = createMsg("warn", msg, str, i, token, state, file);
            log_warn(error.message);
            log_warn(error.stack);
            listeners_emit("error", error);
        };
        if ("undefined" === typeof console) log_warn = log_error = function() {}; else {
            var bind = Function.prototype.bind;
            log_warn = bind.call(console.warn, console, "MaskJS [Warn] :");
            log_error = bind.call(console.error, console, "MaskJS [Error] :");
        }
        var ParserError = createError("Error"), ParserWarn = createError("Warning");
        function createError(type) {
            function ParserError(msg, orig, index) {
                this.type = "Parser" + type;
                this.message = msg;
                this.original = orig;
                this.index = index;
                this.stack = prepairStack();
            }
            inherit(ParserError, Error);
            return ParserError;
        }
        function prepairStack() {
            var stack = new Error().stack;
            if (null == stack) return null;
            return stack.split("\n").slice(6, 8).join("\n");
        }
        function inherit(Ctor, Base) {
            if (Object.create) Ctor.prototype = Object.create(Base.prototype);
        }
        function createMsg(type, msg, str, index, token, state, filename) {
            msg += formatToken(token) + formatFilename(str, index, filename) + formatStopped(type, str, index) + formatState(state);
            var Ctor = "error" === type ? ParserError : ParserWarn;
            return new Ctor(msg, str, index);
        }
        function formatToken(token) {
            if (null == token) return "";
            if ("number" === typeof token) token = String.fromCharCode(token);
            return " Invalid token: `" + token + "`";
        }
        function formatFilename(str, index, filename) {
            if (null == index && !filename) return "";
            var lines = str.substring(0, index).split("\n"), line = lines.length, row = index + 1 - lines.slice(0, line - 2).join("\n").length;
            return " at " + (filename || "") + "(" + line + ":" + row + ")";
        }
        function formatState(state) {
            var states = {
                "2": "tag",
                "3": "tag",
                "5": "attribute key",
                "6": "attribute value",
                "8": "literal",
                "var": "VarStatement",
                expr: "Expression"
            };
            if (null == state || null == states[state]) return "";
            return "\n    , when parsing " + states[state];
        }
        function formatStopped(type, str, index) {
            if (null == index) return "";
            var stopped = str.substring(index);
            if (stopped.length > 30) stopped = stopped.substring(0, 30) + "...";
            return "\n    Parser " + type + " at: " + stopped;
        }
    }();
    var custom_Utils, custom_Statements, custom_Attributes, custom_Tags, custom_Tags_defs, customUtil_get, customUtil_$utils, customUtil_register, customTag_register;
    !function() {
        initialize();
        !function(repository) {
            customTag_register = function(name, Handler) {
                if (null != Handler && "object" === typeof Handler) Handler.__Ctor = wrapStatic(Handler);
                repository[name] = Handler;
            };
            function wrapStatic(proto) {
                function Ctor(node, parent) {
                    this.tagName = node.tagName;
                    this.attr = node.attr;
                    this.expression = node.expression;
                    this.nodes = node.nodes;
                    this.nextSibling = node.nextSibling;
                    this.parent = parent;
                    this.components = null;
                }
                Ctor.prototype = proto;
                return Ctor;
            }
        }(custom_Tags);
        !function(repository) {
            customUtil_$utils = {};
            customUtil_register = function(name, mix) {
                if (is_Function(mix)) {
                    repository[name] = mix;
                    return;
                }
                repository[name] = createUtil(mix);
                if ("parsed" === mix.arguments) customUtil_$utils[name] = mix.process;
            };
            customUtil_get = function(name) {
                return null != name ? repository[name] : repository;
            };
            function createUtil(obj) {
                if ("parsed" === obj.arguments) return processParsedDelegate(obj.process);
                var fn = fn_proxy(obj.process || processRawFn, obj);
                fn.util = obj;
                return fn;
            }
            function processRawFn(expr, model, ctx, element, controller, attrName, type) {
                if ("node" === type) {
                    this.nodeRenderStart(expr, model, ctx, element, controller);
                    return this.node(expr, model, ctx, element, controller);
                }
                this.attrRenderStart(expr, model, ctx, element, controller, attrName);
                return this.attr(expr, model, ctx, element, controller, attrName);
            }
            function processParsedDelegate(fn) {
                return function(expr, model, ctx, element, controller) {
                    var args = ExpressionUtil.evalStatements(expr, model, ctx, controller);
                    return fn.apply(null, args);
                };
            }
        }(custom_Utils);
        function initialize() {
            custom_Utils = {
                expression: function(value, model, ctx, element, controller) {
                    return ExpressionUtil.eval(value, model, ctx, controller);
                }
            };
            custom_Statements = {};
            custom_Attributes = {
                "class": null,
                id: null,
                style: null,
                name: null,
                type: null
            };
            custom_Tags = {
                div: null,
                span: null,
                input: null,
                button: null,
                textarea: null,
                select: null,
                option: null,
                h1: null,
                h2: null,
                h3: null,
                h4: null,
                h5: null,
                h6: null,
                a: null,
                p: null,
                img: null,
                table: null,
                td: null,
                tr: null,
                pre: null,
                ul: null,
                li: null,
                ol: null,
                i: null,
                em: null,
                b: null,
                strong: null,
                form: null,
                audio: null,
                video: null,
                canvas: null,
                svg: null
            };
            custom_Tags_defs = {};
        }
    }();
    var ExpressionUtil = function() {
        var index = 0, length = 0, cache = {}, template, ast;
        var op_Minus = "-", op_Plus = "+", op_Divide = "/", op_Multip = "*", op_Modulo = "%", op_LogicalOr = "||", op_LogicalAnd = "&&", op_LogicalNot = "!", op_LogicalEqual = "==", op_LogicalEqual_Strict = "===", op_LogicalNotEqual = "!=", op_LogicalNotEqual_Strict = "!==", op_LogicalGreater = ">", op_LogicalGreaterEqual = ">=", op_LogicalLess = "<", op_LogicalLessEqual = "<=", op_Member = ".", punc_ParantheseOpen = 20, punc_ParantheseClose = 21, punc_BracketOpen = 22, punc_BracketClose = 23, punc_BraceOpen = 24, punc_BraceClose = 25, punc_Comma = 26, punc_Dot = 27, punc_Question = 28, punc_Colon = 29, punc_Semicolon = 30, go_ref = 31, go_acs = 32, go_string = 33, go_number = 34, go_objectKey = 35;
        var type_Body = 1, type_Statement = 2, type_SymbolRef = 3, type_FunctionRef = 4, type_Accessor = 5, type_AccessorExpr = 6, type_Value = 7, type_Number = 8, type_String = 9, type_Object = 10, type_Array = 11, type_UnaryPrefix = 12, type_Ternary = 13;
        var state_body = 1, state_arguments = 2;
        var precedence = {};
        precedence[op_Member] = 1;
        precedence[op_Divide] = 2;
        precedence[op_Multip] = 2;
        precedence[op_Minus] = 3;
        precedence[op_Plus] = 3;
        precedence[op_LogicalGreater] = 4;
        precedence[op_LogicalGreaterEqual] = 4;
        precedence[op_LogicalLess] = 4;
        precedence[op_LogicalLessEqual] = 4;
        precedence[op_LogicalEqual] = 5;
        precedence[op_LogicalEqual_Strict] = 5;
        precedence[op_LogicalNotEqual] = 5;
        precedence[op_LogicalNotEqual_Strict] = 5;
        precedence[op_LogicalAnd] = 6;
        precedence[op_LogicalOr] = 6;
        var Ast_Body, Ast_Statement, Ast_Value, Ast_Array, Ast_Object, Ast_FunctionRef, Ast_SymbolRef, Ast_Accessor, Ast_AccessorExpr, Ast_UnaryPrefix, Ast_TernaryStatement;
        !function() {
            Ast_Body = function(parent) {
                this.parent = parent;
                this.type = type_Body;
                this.body = [];
                this.join = null;
            };
            Ast_Statement = function(parent) {
                this.parent = parent;
            };
            Ast_Statement.prototype = {
                constructor: Ast_Statement,
                type: type_Statement,
                join: null,
                body: null
            };
            Ast_Value = function(value) {
                this.type = type_Value;
                this.body = value;
                this.join = null;
            };
            Ast_Array = function(parent) {
                this.type = type_Array;
                this.parent = parent;
                this.body = new Ast_Body(this);
            };
            Ast_Object = function(parent) {
                this.type = type_Object;
                this.parent = parent;
                this.props = {};
            };
            Ast_Object.prototype = {
                nextProp: function(prop) {
                    var body = new Ast_Statement(this);
                    this.props[prop] = body;
                    return body;
                }
            };
            Ast_FunctionRef = function(parent, ref) {
                this.parent = parent;
                this.type = type_FunctionRef;
                this.body = ref;
                this.arguments = [];
                this.next = null;
            };
            Ast_FunctionRef.prototype = {
                constructor: Ast_FunctionRef,
                newArgument: function() {
                    var body = new Ast_Body(this);
                    this.arguments.push(body);
                    return body;
                }
            };
            Ast_SymbolRef = function(parent, ref) {
                this.type = type_SymbolRef;
                this.parent = parent;
                this.body = ref;
                this.next = null;
            };
            Ast_Accessor = function(parent, ref) {
                this.type = type_Accessor;
                this.parent = parent;
                this.body = ref;
                this.next = null;
            };
            Ast_AccessorExpr = function(parent) {
                this.parent = parent;
                this.body = new Ast_Statement(this);
                this.body.body = new Ast_Body(this.body);
                this.next = null;
            };
            Ast_AccessorExpr.prototype = {
                type: type_AccessorExpr,
                getBody: function() {
                    return this.body.body;
                }
            };
            Ast_UnaryPrefix = function(parent, prefix) {
                this.parent = parent;
                this.prefix = prefix;
            };
            Ast_UnaryPrefix.prototype = {
                constructor: Ast_UnaryPrefix,
                type: type_UnaryPrefix,
                body: null
            };
            Ast_TernaryStatement = function(assertions) {
                this.body = assertions;
                this.case1 = new Ast_Body(this);
                this.case2 = new Ast_Body(this);
            };
            Ast_TernaryStatement.prototype = {
                constructor: Ast_TernaryStatement,
                type: type_Ternary,
                case1: null,
                case2: null
            };
        }();
        var ast_handlePrecedence, ast_append;
        !function() {
            ast_append = function(current, next) {
                switch (current.type) {
                  case type_Body:
                    current.body.push(next);
                    return next;

                  case type_Statement:
                    if (next.type === type_Accessor || next.type === type_AccessorExpr) return current.next = next;

                  case type_UnaryPrefix:
                    return current.body = next;

                  case type_SymbolRef:
                  case type_FunctionRef:
                  case type_Accessor:
                  case type_AccessorExpr:
                    return current.next = next;
                }
                return util_throw("Invalid expression");
            };
            ast_handlePrecedence = function(ast) {
                if (ast.type !== type_Body) {
                    if (null != ast.body && "object" === typeof ast.body) ast_handlePrecedence(ast.body);
                    return;
                }
                var body = ast.body, i = 0, length = body.length, x, prev, array;
                for (;i < length; i++) ast_handlePrecedence(body[i]);
                for (i = 1; i < length; i++) {
                    x = body[i];
                    prev = body[i - 1];
                    if (precedence[prev.join] > precedence[x.join]) break;
                }
                if (i === length) return;
                array = [ body[0] ];
                for (i = 1; i < length; i++) {
                    x = body[i];
                    prev = body[i - 1];
                    var prec_Prev = precedence[prev.join];
                    if (prec_Prev > precedence[x.join] && i < length - 1) {
                        var start = i, nextJoin, arr;
                        while (++i < length) {
                            nextJoin = body[i].join;
                            if (null == nextJoin) break;
                            if (prec_Prev <= precedence[nextJoin]) break;
                        }
                        arr = body.slice(start, i + 1);
                        x = ast_join(arr);
                        ast_handlePrecedence(x);
                    }
                    array.push(x);
                }
                ast.body = array;
            };
            function ast_join(bodyArr) {
                if (0 === bodyArr.length) return null;
                var body = new Ast_Body(bodyArr[0].parent);
                body.join = bodyArr[bodyArr.length - 1].join;
                body.body = bodyArr;
                return body;
            }
        }();
        var util_resolveRef, util_throw;
        !function() {
            util_throw = function(msg, token) {
                return parser_error(msg, template, index, token, "expr");
            };
            util_resolveRef = function(astRef, model, ctx, controller) {
                var current = astRef, key = astRef.body, object, value, args, i, imax;
                if ("$c" === key) {
                    value = controller;
                    var next = current.next, nextBody = null != next && next.body;
                    if (null != nextBody && null == value[nextBody]) {
                        if (next.type === type_FunctionRef && "function" === typeof Compo.prototype[nextBody]) {
                            object = controller;
                            value = Compo.prototype[nextBody];
                            current = next;
                        } else while (true) {
                            value = value.parent;
                            if (null == value) break;
                            if (null == value[nextBody]) continue;
                            object = value;
                            value = value[nextBody];
                            current = next;
                            break;
                        }
                        if (null == value) {
                            key = "$c." + nextBody;
                            current = next;
                        }
                    }
                } else if ("$a" === key) value = controller && controller.attr; else if ("$u" === key) value = customUtil_$utils; else if ("$ctx" === key) value = ctx; else {
                    if (null != model) {
                        object = model;
                        value = model[key];
                    }
                    if (null == value) while (null != controller) {
                        object = controller.scope;
                        if (null != object) value = object[key];
                        if (null != value) break;
                        controller = controller.parent;
                    }
                }
                if (null == value) {
                    if (null == current || null != current.next) log_warn("<mask:expression> Accessor error:", key);
                    return null;
                }
                do {
                    if (current.type === type_FunctionRef) {
                        args = [];
                        i = -1;
                        imax = current.arguments.length;
                        while (++i < imax) args[i] = expression_evaluate(current.arguments[i], model, ctx, controller);
                        value = value.apply(object, args);
                    }
                    if (null == value || null == current.next) break;
                    current = current.next;
                    key = current.type === type_AccessorExpr ? expression_evaluate(current.body, model, ctx, controller) : current.body;
                    object = value;
                    value = value[key];
                    if (null == value) break;
                } while (true);
                return value;
            };
        }();
        var parser_skipWhitespace, parser_getString, parser_getNumber, parser_getArray, parser_getObject, parser_getRef, parser_getDirective;
        !function() {
            parser_skipWhitespace = function() {
                var c;
                while (index < length) {
                    c = template.charCodeAt(index);
                    if (c > 32) return c;
                    index++;
                }
                return null;
            };
            parser_getString = function(c) {
                var isEscaped = false, _char = 39 === c ? "'" : '"', start = index, nindex, string;
                while ((nindex = template.indexOf(_char, index)) > -1) {
                    index = nindex;
                    if (92 !== template.charCodeAt(nindex - 1)) break;
                    isEscaped = true;
                    index++;
                }
                string = template.substring(start, index);
                if (true === isEscaped) string = string.replace(__rgxEscapedChar[_char], _char);
                return string;
            };
            parser_getNumber = function() {
                var start = index, code, isDouble;
                while (true) {
                    code = template.charCodeAt(index);
                    if (46 === code) {
                        if (true === isDouble) {
                            util_throw("Invalid number", code);
                            return null;
                        }
                        isDouble = true;
                    }
                    if ((code >= 48 && code <= 57 || 46 === code) && index < length) {
                        index++;
                        continue;
                    }
                    break;
                }
                return +template.substring(start, index);
            };
            parser_getRef = function() {
                var start = index, c = template.charCodeAt(index), ref;
                if (34 === c || 39 === c) {
                    index++;
                    ref = parser_getString(c);
                    index++;
                    return ref;
                }
                while (true) {
                    if (index === length) break;
                    c = template.charCodeAt(index);
                    if (36 === c || 95 === c) {
                        index++;
                        continue;
                    }
                    if (48 <= c && c <= 57 || 65 <= c && c <= 90 || 97 <= c && c <= 122) {
                        index++;
                        continue;
                    }
                    break;
                }
                return template.substring(start, index);
            };
            parser_getDirective = function(code) {
                if (null == code && index === length) return null;
                switch (code) {
                  case 40:
                    return punc_ParantheseOpen;

                  case 41:
                    return punc_ParantheseClose;

                  case 123:
                    return punc_BraceOpen;

                  case 125:
                    return punc_BraceClose;

                  case 91:
                    return punc_BracketOpen;

                  case 93:
                    return punc_BracketClose;

                  case 44:
                    return punc_Comma;

                  case 46:
                    return punc_Dot;

                  case 59:
                    return punc_Semicolon;

                  case 43:
                    return op_Plus;

                  case 45:
                    return op_Minus;

                  case 42:
                    return op_Multip;

                  case 47:
                    return op_Divide;

                  case 37:
                    return op_Modulo;

                  case 61:
                    if (template.charCodeAt(++index) !== code) {
                        util_throw("Assignment violation: View can only access model/controllers", "=");
                        return null;
                    }
                    if (template.charCodeAt(index + 1) === code) {
                        index++;
                        return op_LogicalEqual_Strict;
                    }
                    return op_LogicalEqual;

                  case 33:
                    if (61 === template.charCodeAt(index + 1)) {
                        index++;
                        if (61 === template.charCodeAt(index + 1)) {
                            index++;
                            return op_LogicalNotEqual_Strict;
                        }
                        return op_LogicalNotEqual;
                    }
                    return op_LogicalNot;

                  case 62:
                    if (61 === template.charCodeAt(index + 1)) {
                        index++;
                        return op_LogicalGreaterEqual;
                    }
                    return op_LogicalGreater;

                  case 60:
                    if (61 === template.charCodeAt(index + 1)) {
                        index++;
                        return op_LogicalLessEqual;
                    }
                    return op_LogicalLess;

                  case 38:
                    if (template.charCodeAt(++index) !== code) {
                        util_throw("Not supported: Bitwise AND", code);
                        return null;
                    }
                    return op_LogicalAnd;

                  case 124:
                    if (template.charCodeAt(++index) !== code) {
                        util_throw("Not supported: Bitwise OR", code);
                        return null;
                    }
                    return op_LogicalOr;

                  case 63:
                    return punc_Question;

                  case 58:
                    return punc_Colon;
                }
                if (code >= 65 && code <= 90 || code >= 97 && code <= 122 || 95 === code || 36 === code) return go_ref;
                if (code >= 48 && code <= 57) return go_number;
                if (34 === code || 39 === code) return go_string;
                util_throw("Unexpected or unsupported directive", code);
                return null;
            };
        }();
        function expression_parse(expr, earlyExit) {
            if (null == earlyExit) earlyExit = false;
            template = expr;
            index = 0;
            length = expr.length;
            ast = new Ast_Body();
            var current = ast, state = state_body, c, next, directive;
            outer: while (true) {
                if (index < length && (c = template.charCodeAt(index)) < 33) {
                    index++;
                    continue;
                }
                if (index >= length) break;
                directive = parser_getDirective(c);
                if (null == directive && index < length) break;
                if (directive === punc_Semicolon) {
                    if (true === earlyExit) return [ ast, index ];
                    break;
                }
                if (true === earlyExit) {
                    var p = current.parent;
                    if (null != p && p.type === type_Body && null == p.parent) if (directive === go_ref) return [ ast, index ];
                }
                if (directive === punc_Semicolon) break;
                switch (directive) {
                  case punc_ParantheseOpen:
                    current = ast_append(current, new Ast_Statement(current));
                    current = ast_append(current, new Ast_Body(current));
                    index++;
                    continue;

                  case punc_ParantheseClose:
                    var closest = type_Body;
                    if (state === state_arguments) {
                        state = state_body;
                        closest = type_FunctionRef;
                    }
                    do current = current.parent; while (null != current && current.type !== closest);
                    if (closest === type_Body) current = current.parent;
                    if (null == current) {
                        util_throw("OutOfAst Exception", c);
                        break outer;
                    }
                    index++;
                    continue;

                  case punc_BraceOpen:
                    current = ast_append(current, new Ast_Object(current));
                    directive = go_objectKey;
                    index++;
                    break;

                  case punc_BraceClose:
                    while (null != current && current.type !== type_Object) current = current.parent;
                    index++;
                    continue;

                  case punc_Comma:
                    if (state !== state_arguments) {
                        state = state_body;
                        do current = current.parent; while (null != current && current.type !== type_Body && current.type !== type_Object);
                        index++;
                        if (null == current) {
                            util_throw("Unexpected comma", c);
                            break outer;
                        }
                        if (current.type === type_Object) {
                            directive = go_objectKey;
                            break;
                        }
                        continue;
                    }
                    do current = current.parent; while (null != current && current.type !== type_FunctionRef);
                    if (null == current) {
                        util_throw("OutOfAst Exception", c);
                        break outer;
                    }
                    current = current.newArgument();
                    index++;
                    continue;

                  case punc_Question:
                    ast = new Ast_TernaryStatement(ast);
                    current = ast.case1;
                    index++;
                    continue;

                  case punc_Colon:
                    current = ast.case2;
                    index++;
                    continue;

                  case punc_Dot:
                    c = template.charCodeAt(index + 1);
                    if (c >= 48 && c <= 57) directive = go_number; else {
                        directive = current.type === type_Body ? go_ref : go_acs;
                        index++;
                    }
                    break;

                  case punc_BracketOpen:
                    if (current.type === type_SymbolRef || current.type === type_AccessorExpr || current.type === type_Accessor) {
                        current = ast_append(current, new Ast_AccessorExpr(current));
                        current = current.getBody();
                        index++;
                        continue;
                    }
                    current = ast_append(current, new Ast_Array(current));
                    current = current.body;
                    index++;
                    continue;

                  case punc_BracketClose:
                    do current = current.parent; while (null != current && current.type !== type_AccessorExpr && current.type !== type_Array);
                    index++;
                    continue;
                }
                if (current.type === type_Body) current = ast_append(current, new Ast_Statement(current));
                if ((op_Minus === directive || op_LogicalNot === directive) && null == current.body) {
                    current = ast_append(current, new Ast_UnaryPrefix(current, directive));
                    index++;
                    continue;
                }
                switch (directive) {
                  case op_Minus:
                  case op_Plus:
                  case op_Multip:
                  case op_Divide:
                  case op_Modulo:
                  case op_LogicalAnd:
                  case op_LogicalOr:
                  case op_LogicalEqual:
                  case op_LogicalEqual_Strict:
                  case op_LogicalNotEqual:
                  case op_LogicalNotEqual_Strict:
                  case op_LogicalGreater:
                  case op_LogicalGreaterEqual:
                  case op_LogicalLess:
                  case op_LogicalLessEqual:
                    while (current && current.type !== type_Statement) current = current.parent;
                    if (null == current.body) return util_throw("Unexpected operator", c);
                    current.join = directive;
                    do current = current.parent; while (null != current && current.type !== type_Body);
                    if (null == current) return util_throw("Unexpected operator", c);
                    index++;
                    continue;

                  case go_string:
                  case go_number:
                    if (null != current.body && null == current.join) return util_throw("Directive expected", c);
                    if (go_string === directive) {
                        index++;
                        ast_append(current, new Ast_Value(parser_getString(c)));
                        index++;
                    }
                    if (go_number === directive) ast_append(current, new Ast_Value(parser_getNumber(c)));
                    continue;

                  case go_ref:
                  case go_acs:
                    var ref = parser_getRef();
                    if (directive === go_ref) {
                        if ("null" === ref) ref = null;
                        if ("false" === ref) ref = false;
                        if ("true" === ref) ref = true;
                        if ("string" !== typeof ref) {
                            ast_append(current, new Ast_Value(ref));
                            continue;
                        }
                    }
                    while (index < length) {
                        c = template.charCodeAt(index);
                        if (c < 33) {
                            index++;
                            continue;
                        }
                        break;
                    }
                    if (40 === c) {
                        state = state_arguments;
                        index++;
                        var fn = ast_append(current, new Ast_FunctionRef(current, ref));
                        current = fn.newArgument();
                        continue;
                    }
                    var Ctor = directive === go_ref ? Ast_SymbolRef : Ast_Accessor;
                    current = ast_append(current, new Ctor(current, ref));
                    break;

                  case go_objectKey:
                    if (125 === parser_skipWhitespace()) continue;
                    var key = parser_getRef();
                    if (58 !== parser_skipWhitespace()) return util_throw("Object parser. Semicolon expeted", c);
                    index++;
                    current = current.nextProp(key);
                    directive = go_ref;
                    continue;
                }
            }
            if (null == current.body && current.type === type_Statement) return util_throw("Unexpected end of expression", c);
            ast_handlePrecedence(ast);
            return ast;
        }
        function expression_evaluate(mix, model, ctx, controller) {
            var result, ast;
            if (null == mix) return null;
            if ("." === mix) return model;
            if ("string" === typeof mix) ast = true === cache.hasOwnProperty(mix) ? cache[mix] : cache[mix] = expression_parse(mix); else ast = mix;
            if (null == ast) return null;
            var type = ast.type, i, x, length;
            if (type_Body === type) {
                var value, prev;
                outer: for (i = 0, length = ast.body.length; i < length; i++) {
                    x = ast.body[i];
                    value = expression_evaluate(x, model, ctx, controller);
                    if (null == prev || null == prev.join) {
                        prev = x;
                        result = value;
                        continue;
                    }
                    if (prev.join === op_LogicalAnd) if (!result) {
                        for (;i < length; i++) if (ast.body[i].join === op_LogicalOr) break;
                    } else result = value;
                    if (prev.join === op_LogicalOr) {
                        if (result) break outer;
                        if (value) {
                            result = value;
                            break outer;
                        }
                    }
                    switch (prev.join) {
                      case op_Minus:
                        result -= value;
                        break;

                      case op_Plus:
                        result += value;
                        break;

                      case op_Divide:
                        result /= value;
                        break;

                      case op_Multip:
                        result *= value;
                        break;

                      case op_Modulo:
                        result %= value;
                        break;

                      case op_LogicalNotEqual:
                        result = result != value;
                        break;

                      case op_LogicalNotEqual_Strict:
                        result = result !== value;
                        break;

                      case op_LogicalEqual:
                        result = result == value;
                        break;

                      case op_LogicalEqual_Strict:
                        result = result === value;
                        break;

                      case op_LogicalGreater:
                        result = result > value;
                        break;

                      case op_LogicalGreaterEqual:
                        result = result >= value;
                        break;

                      case op_LogicalLess:
                        result = result < value;
                        break;

                      case op_LogicalLessEqual:
                        result = result <= value;
                    }
                    prev = x;
                }
            }
            if (type_Statement === type) {
                result = expression_evaluate(ast.body, model, ctx, controller);
                if (null == ast.next) return result;
                return util_resolveRef(ast.next, result);
            }
            if (type_Value === type) return ast.body;
            if (type_Array === type) {
                var body = ast.body.body, imax = body.length, i = -1;
                result = new Array(imax);
                while (++i < imax) result[i] = expression_evaluate(body[i], model, ctx, controller);
                return result;
            }
            if (type_Object === type) {
                result = {};
                var props = ast.props;
                for (var key in props) result[key] = expression_evaluate(props[key], model, ctx, controller);
                return result;
            }
            if (type_SymbolRef === type || type_FunctionRef === type || type_AccessorExpr === type || type_Accessor === type) return util_resolveRef(ast, model, ctx, controller);
            if (type_UnaryPrefix === type) {
                result = expression_evaluate(ast.body, model, ctx, controller);
                switch (ast.prefix) {
                  case op_Minus:
                    result = -result;
                    break;

                  case op_LogicalNot:
                    result = !result;
                }
            }
            if (type_Ternary === type) {
                result = expression_evaluate(ast.body, model, ctx, controller);
                result = expression_evaluate(result ? ast.case1 : ast.case2, model, ctx, controller);
            }
            return result;
        }
        var refs_extractVars;
        !function() {
            refs_extractVars = function(expr, model, ctx, ctr) {
                if ("string" === typeof expr) expr = expression_parse(expr);
                return _extractVars(expr, model, ctx, ctr);
            };
            function _extractVars(expr, model, ctx, ctr) {
                if (null == expr) return null;
                var exprType = expr.type, refs, x;
                if (type_Body === exprType) {
                    var body = expr.body, imax = body.length, i = -1;
                    while (++i < imax) {
                        x = _extractVars(body[i], model, ctx, ctr);
                        refs = _append(refs, x);
                    }
                }
                if (type_SymbolRef === exprType || type_Accessor === exprType || type_AccessorExpr === exprType) {
                    var path = expr.body, next = expr.next, nextType;
                    while (null != next) {
                        nextType = next.type;
                        if (type_FunctionRef === nextType) return _extractVars(next, model, ctx, ctr);
                        if (type_SymbolRef !== nextType && type_Accessor !== nextType && type_AccessorExpr !== nextType) {
                            log_error("Ast Exception: next should be a symbol/function ref");
                            return null;
                        }
                        var prop = nextType === type_AccessorExpr ? expression_evaluate(next.body, model, ctx, ctr) : next.body;
                        if ("string" !== typeof prop) {
                            log_warn("Can`t extract accessor name", path);
                            return null;
                        }
                        path += "." + prop;
                        next = next.next;
                    }
                    return path;
                }
                switch (exprType) {
                  case type_Statement:
                  case type_UnaryPrefix:
                  case type_Ternary:
                    x = _extractVars(expr.body, model, ctx, ctr);
                    refs = _append(refs, x);
                }
                if (type_Ternary === exprType) {
                    x = _extractVars(ast.case1, model, ctx, ctr);
                    refs = _append(refs, x);
                    x = _extractVars(ast.case2, model, ctx, ctr);
                    refs = _append(refs, x);
                }
                if (type_FunctionRef === exprType) {
                    var args = expr.arguments, imax = args.length, i = -1;
                    while (++i < imax) {
                        x = _extractVars(args[i], model, ctx, ctr);
                        refs = _append(refs, x);
                    }
                    x = null;
                    var parent = expr;
                    outer: while (parent = parent.parent) switch (parent.type) {
                      case type_SymbolRef:
                      case type_Accessor:
                      case type_AccessorExpr:
                        x = parent.body + (null == x ? "" : "." + x);
                        break;

                      case type_Body:
                      case type_Statement:
                        break outer;

                      default:
                        x = null;
                        break outer;
                    }
                    if (null != x) refs = _append(refs, x);
                    if (expr.next) {
                        x = _extractVars(expr.next, model, ctx, ctr);
                        refs = _append(refs, {
                            accessor: _getAccessor(expr),
                            ref: x
                        });
                    }
                }
                return refs;
            }
            function _append(current, x) {
                if (null == current) return x;
                if (null == x) return current;
                if (!("object" === typeof current && null != current.length)) current = [ current ];
                if (!("object" === typeof x && null != x.length)) {
                    if (current.indexOf(x) === -1) current.push(x);
                    return current;
                }
                for (var i = 0, imax = x.length; i < imax; i++) if (current.indexOf(x[i]) === -1) current.push(x[i]);
                return current;
            }
            function _getAccessor(current) {
                var parent = current;
                outer: while (parent.parent) {
                    switch (parent.parent.type) {
                      case type_Body:
                      case type_Statement:
                        break outer;
                    }
                    parent = parent.parent;
                }
                return _copy(parent, current.next);
            }
            function _copy(ast, stop) {
                if (ast === stop || null == ast) return null;
                if ("object" !== typeof ast) return ast;
                if (null != ast.length && "function" === typeof ast.splice) {
                    var arr = [];
                    for (var i = 0, imax = ast.length; i < imax; i++) arr[i] = _copy(ast[i], stop);
                    return arr;
                }
                var clone = {};
                for (var key in ast) {
                    if (null == ast[key] || "parent" === key) continue;
                    clone[key] = _copy(ast[key], stop);
                }
                return clone;
            }
        }();
        return {
            parse: expression_parse,
            eval: expression_evaluate,
            varRefs: refs_extractVars,
            evalStatements: function(expr, model, ctx, controller) {
                var body = expression_parse(expr).body, args = [], imax = body.length, i = -1;
                var group = new Ast_Body();
                while (++i < imax) {
                    group.body.push(body[i]);
                    if (null != body[i].join) continue;
                    args.push(expression_evaluate(group, model, ctx, controller));
                    group.body.length = 0;
                }
                return args;
            }
        };
    }();
    var Dom;
    !function() {
        var dom_NODE = 1, dom_TEXTNODE = 2, dom_FRAGMENT = 3, dom_COMPONENT = 4, dom_CONTROLLER = 9, dom_SET = 10, dom_STATEMENT = 15;
        function _appendChild(el) {
            var nodes = this.nodes;
            if (null == nodes) {
                this.nodes = [ el ];
                return;
            }
            nodes.push(el);
            var prev = nodes[nodes.length - 2];
            prev.nextSibling = el;
        }
        function Node(tagName, parent) {
            this.type = Dom.NODE;
            this.tagName = tagName;
            this.parent = parent;
            this.attr = {};
        }
        Node.prototype = {
            constructor: Node,
            type: dom_NODE,
            tagName: null,
            parent: null,
            attr: null,
            nodes: null,
            expression: null,
            appendChild: _appendChild,
            stringify: null,
            __single: null
        };
        function TextNode(text, parent) {
            this.content = text;
            this.parent = parent;
        }
        TextNode.prototype = {
            type: dom_TEXTNODE,
            content: null,
            parent: null
        };
        function Component(compoName, parent, controller) {
            this.tagName = compoName;
            this.parent = parent;
            this.controller = controller;
            this.attr = {};
        }
        Component.prototype = {
            constructor: Component,
            type: dom_COMPONENT,
            parent: null,
            attr: null,
            controller: null,
            nodes: null,
            components: null,
            model: null,
            modelRef: null
        };
        function Fragment() {}
        Fragment.prototype = {
            constructor: Fragment,
            type: dom_FRAGMENT,
            nodes: null,
            appendChild: _appendChild
        };
        Dom = {
            NODE: dom_NODE,
            TEXTNODE: dom_TEXTNODE,
            FRAGMENT: dom_FRAGMENT,
            COMPONENT: dom_COMPONENT,
            CONTROLLER: dom_CONTROLLER,
            SET: dom_SET,
            STATEMENT: dom_STATEMENT,
            Node: Node,
            TextNode: TextNode,
            Fragment: Fragment,
            Component: Component
        };
    }();
    !function() {
        function getNodes(node, model, ctx, ctr) {
            function evaluate(expr) {
                return ExpressionUtil.eval(expr, model, ctx, ctr);
            }
            if (evaluate(node.expression)) return node.nodes;
            while (true) {
                node = node.nextSibling;
                if (null == node || "else" !== node.tagName) break;
                var expr = node.expression;
                if (null == expr || "" === expr || evaluate(expr)) return node.nodes;
            }
            return null;
        }
        custom_Statements["if"] = {
            getNodes: getNodes,
            render: function(node, model, ctx, container, ctr, childs) {
                var nodes = getNodes(node, model, ctx, ctr);
                if (null == nodes) return;
                builder_build(nodes, model, ctx, container, ctr, childs);
            }
        };
    }();
    !function() {
        var FOR_OF_ITEM = "for..of/item", FOR_IN_ITEM = "for..in/item";
        custom_Statements["for"] = {
            render: function(node, model, ctx, container, controller, childs) {
                parse_For(node.expression);
                var value = ExpressionUtil.eval(__ForDirective[3], model, ctx, controller);
                if (null == value) return;
                build(value, __ForDirective, node.nodes, model, ctx, container, controller, childs);
            },
            build: build,
            parseFor: parse_For,
            createForItem: createForItem,
            getNodes: getNodes,
            getHandler: function(compoName, model) {
                return createHandler(compoName, model);
            }
        };
        function createBootstrapCompo(name) {
            var Ctor = function() {};
            Ctor.prototype = {
                type: Dom.COMPONENT,
                compoName: name,
                renderEnd: handler_proto_renderEnd,
                dispose: handler_proto_dispose
            };
            return Ctor;
        }
        custom_Tags[FOR_OF_ITEM] = createBootstrapCompo(FOR_OF_ITEM);
        custom_Tags[FOR_IN_ITEM] = createBootstrapCompo(FOR_IN_ITEM);
        function build(value, For, nodes, model, ctx, container, ctr, childs) {
            builder_build(getNodes(nodes, value, For[0], For[1], For[2]), model, ctx, container, ctr, childs);
        }
        function getNodes(nodes, value, prop1, prop2, type) {
            if ("of" === type) {
                if (false === is_Array(value)) {
                    log_error("<ForStatement> Value is not enumerable", value);
                    return null;
                }
                return loop_Array(nodes, value, prop1, prop2);
            }
            if ("in" === type) {
                if ("object" !== typeof value) {
                    log_warn("<ForStatement> Value is not an object", value);
                    return null;
                }
                if (is_Array(value)) log_warn("<mask:for> Consider to use `for..of` for Arrays");
                return loop_Object(nodes, value, prop1, prop2);
            }
        }
        function loop_Array(template, arr, prop1, prop2) {
            var i = -1, imax = arr.length, nodes = new Array(imax), scope;
            while (++i < imax) {
                scope = {};
                scope[prop1] = arr[i];
                if (prop2) scope[prop2] = i;
                nodes[i] = createForItem(FOR_OF_ITEM, template, scope);
            }
            return nodes;
        }
        function loop_Object(template, obj, prop1, prop2) {
            var nodes = [], i = 0, scope, key, value;
            for (key in obj) {
                value = obj[key];
                scope = {};
                scope[prop1] = key;
                if (prop2) scope[prop2] = value;
                nodes[i++] = createForItem(FOR_IN_ITEM, template, scope);
            }
            return nodes;
        }
        function createForItem(name, nodes, scope) {
            return {
                type: Dom.COMPONENT,
                tagName: name,
                nodes: nodes,
                controller: {
                    compoName: name,
                    scope: scope,
                    renderEnd: handler_proto_renderEnd,
                    dispose: handler_proto_dispose
                }
            };
        }
        function createHandler(name, scope) {
            return {
                compoName: name,
                scope: scope,
                renderEnd: handler_proto_renderEnd,
                dispose: handler_proto_dispose
            };
        }
        function handler_proto_renderEnd(elements) {
            this.elements = elements;
        }
        function handler_proto_dispose() {
            if (this.elements) this.elements.length = 0;
        }
        var __ForDirective = [ "prop1", "prop2", "in|of", "expression" ], state_prop = 1, state_multiprop = 2, state_loopType = 3;
        var template, index, length;
        function parse_For(expr) {
            template = expr;
            length = expr.length;
            index = 0;
            var prop1, prop2, loopType, hasBrackets, c;
            c = parser_skipWhitespace();
            if (40 === c) {
                hasBrackets = true;
                index++;
                parser_skipWhitespace();
            }
            prop1 = parser_getVarDeclaration();
            c = parser_skipWhitespace();
            if (44 === c) {
                if (true !== hasBrackets) return throw_("Parenthese must be used in multiple var declarion");
                index++;
                parser_skipWhitespace();
                prop2 = parser_getVarDeclaration();
            }
            if (hasBrackets) {
                c = parser_skipWhitespace();
                if (41 !== c) return throw_("Closing parenthese expected");
                index++;
            }
            c = parser_skipWhitespace();
            var loopType;
            if (105 === c && 110 === template.charCodeAt(++index)) loopType = "in";
            if (111 === c && 102 === template.charCodeAt(++index)) loopType = "of";
            if (null == loopType) return throw_("Invalid FOR statement. (in|of) expected");
            __ForDirective[0] = prop1;
            __ForDirective[1] = prop2;
            __ForDirective[2] = loopType;
            __ForDirective[3] = template.substring(++index);
            return __ForDirective;
        }
        function parser_skipWhitespace() {
            var c;
            for (;index < length; index++) {
                c = template.charCodeAt(index);
                if (c < 33) continue;
                return c;
            }
            return -1;
        }
        function parser_getVarDeclaration() {
            var start = index, var_, c;
            for (;index < length; index++) {
                c = template.charCodeAt(index);
                if (c > 48 && c < 57) {
                    if (start === index) return throw_("Variable name begins with a digit");
                    continue;
                }
                if (36 === c || 95 === c || c >= 97 && c <= 122 || c >= 65 && c <= 90) continue;
                break;
            }
            if (start === index) return throw_("Variable declaration expected");
            return template.substring(start, index);
        }
        function throw_(message) {
            throw new Error("<ForStatement parser> " + message + " `" + template.substring(index, 20) + "`");
        }
    }();
    !function() {
        custom_Statements["each"] = {
            render: function(node, model, ctx, container, controller, children) {
                var array = ExpressionUtil.eval(node.expression, model, ctx, controller);
                if (null == array) return;
                build(node.nodes, array, ctx, container, controller, children);
            },
            createItem: createEachItem,
            build: build
        };
        function build(template, array, ctx, container, controller, children) {
            var imax = array.length, i = -1, nodes = template, itemCtr;
            while (++i < imax) {
                itemCtr = createEachItem(i, nodes, controller);
                builder_build(nodes, array[i], ctx, container, itemCtr, children);
                if (null != itemCtr.components) {
                    var compos = controller.components;
                    if (null == compos) compos = controller.components = [];
                    arr_pushMany(controller.components, itemCtr.components);
                }
            }
        }
        function createEachItem(index, nodes, parent) {
            return {
                type: Dom.COMPONENT,
                compoName: "each::item",
                scope: {
                    index: index
                },
                parent: parent,
                nodes: nodes,
                model: null,
                attr: null,
                components: null,
                elements: null,
                ID: null
            };
        }
    }();
    custom_Statements["with"] = {
        render: function(node, model, ctx, container, controller, childs) {
            var obj = ExpressionUtil.eval(node.expression, model, ctx, controller);
            builder_build(node.nodes, obj, ctx, container, controller, childs);
        }
    };
    !function() {
        var eval_ = ExpressionUtil.eval;
        custom_Statements["switch"] = {
            render: function(node, model, ctx, container, controller, childs) {
                var value = eval_(node.expression, model, ctx, controller), nodes = getNodes(value, node.nodes, model, ctx, controller);
                if (null == nodes) return;
                builder_build(nodes, model, ctx, container, controller, childs);
            },
            getNodes: getNodes
        };
        function getNodes(value, nodes, model, ctx, controller) {
            if (null == nodes) return null;
            var imax = nodes.length, i = -1, child, expr, case_, default_;
            while (++i < imax) {
                child = nodes[i];
                if ("default" === child.tagName) {
                    default_ = child;
                    continue;
                }
                if ("case" !== child.tagName) {
                    log_warn("<mask:switch> Case expected", child.tagName);
                    continue;
                }
                expr = child.expression;
                if (!expr) {
                    log_warn("<mask:switch:case> Expression expected");
                    continue;
                }
                if (eval_(expr, model, ctx, controller) == value) {
                    case_ = child;
                    break;
                }
            }
            if (null == case_) case_ = default_;
            return null != case_ ? case_.nodes : null;
        }
    }();
    !function() {
        custom_Statements["include"] = {
            render: function(node, model, ctx, container, controller, childs) {
                var arguments_ = ExpressionUtil.evalStatements(node.expression);
                var resource;
                while (null != controller) {
                    resource = controller.resource;
                    if (null != resource) break;
                    controller = controller.parent;
                }
                var ctr = new IncludeController(controller), resume = Compo.pause(ctr, ctx);
                include.instance(resource && resource.url).load.apply(resource, arguments_).done(function(resp) {
                    ctr.templates = resp.load;
                    builder_build(node.nodes, model, ctx, container, ctr, childs);
                    resume();
                });
            }
        };
        function IncludeController(parent) {
            this.parent = parent;
            this.compoName = "include";
            this.components = [];
            this.templates = null;
        }
    }();
    custom_Statements["import"] = {
        render: function(node, model, ctx, container, controller, childs) {
            var expr = node.expression, args = ExpressionUtil.evalStatements(expr, model, ctx, controller), name = args[0];
            if ("string" !== typeof name) {
                log_error("<mask:import> Invalid argument", expr);
                return;
            }
            while (true) {
                if ("include" === controller.compoName) break;
                controller = controller.parent;
                if (null == controller) break;
            }
            if (null == controller) return;
            var nodes = controller.templates[name];
            if (null == nodes) return;
            builder_build(Parser.parse(nodes), model, ctx, container, controller, childs);
        }
    };
    custom_Tags["var"] = VarStatement;
    function VarStatement() {}
    VarStatement.prototype = {
        renderStart: function(model, ctx) {
            var parent = this.parent, scope = parent.scope, key, val;
            if (null == scope) scope = parent.scope = {};
            this.model = {};
            for (key in this.attr) {
                val = ExpressionUtil.eval(this.attr[key], model, ctx, parent);
                this.model[key] = scope[key] = val;
            }
            this.attr = {};
        },
        onRenderStartClient: function() {
            var parent = this.parent, scope = parent.scope;
            if (null == scope) scope = parent.scope = {};
            for (var key in this.model) scope[key] = this.model[key];
        }
    };
    !function() {
        custom_Statements["visible"] = {
            toggle: toggle,
            render: function(node, model, ctx, container, ctr, children) {
                var els = [];
                builder_build(node.nodes, model, ctx, container, ctr, els);
                arr_pushMany(children, els);
                var visible = ExpressionUtil.eval(node.expression, model, ctx, ctr);
                toggle(els, visible);
            }
        };
        function toggle(els, visible) {
            for (var i = 0; i < els.length; i++) els[i].style.display = visible ? "" : "none";
        }
    }();
    var parser_parse, parser_ensureTemplateFunction, parser_setInterpolationQuotes, parser_cleanObject, Parser;
    !function(Node, TextNode, Fragment, Component) {
        var interp_START = "~", interp_OPEN = "[", interp_CLOSE = "]", interp_code_START = 126, interp_code_OPEN = 91, interp_code_CLOSE = 93, _serialize;
        var cursor_groupEnd, cursor_quoteEnd, cursor_refEnd;
        !function() {
            cursor_groupEnd = function(str, i, imax, startCode, endCode) {
                var count = 0, start = i, c;
                for (;i < imax; i++) {
                    c = str.charCodeAt(i);
                    if (34 === c || 39 === c) {
                        i = cursor_quoteEnd(str, i + 1, imax, 34 === c ? '"' : "'");
                        continue;
                    }
                    if (c === startCode) {
                        count++;
                        continue;
                    }
                    if (c === endCode) if (--count === -1) return i;
                }
                parser_warn("Group was not closed", str, start);
                return imax;
            };
            cursor_refEnd = function(str, i, imax) {
                var c;
                while (i < imax) {
                    c = str.charCodeAt(i);
                    if (36 === c || 95 === c) {
                        i++;
                        continue;
                    }
                    if (48 <= c && c <= 57 || 65 <= c && c <= 90 || 97 <= c && c <= 122) {
                        i++;
                        continue;
                    }
                    break;
                }
                return i;
            };
            cursor_quoteEnd = function(str, i, imax, char_) {
                var start = i;
                while ((i = str.indexOf(char_, i)) !== -1) {
                    if (92 !== str.charCodeAt(i - 1)) return i;
                    i++;
                }
                parser_warn("Quote was not closed", str, start);
                return imax;
            };
        }();
        var parser_var;
        !function() {
            parser_var = function(template, index, length, parent) {
                var node = new Node("var", parent), start, c;
                node.stringify = stingify;
                var go_varName = 1, go_assign = 2, go_value = 3, go_next = 4, state = go_varName, token, key;
                while (true) {
                    if (index < length && (c = template.charCodeAt(index)) < 33) {
                        index++;
                        continue;
                    }
                    if (state === go_varName) {
                        start = index;
                        index = cursor_refEnd(template, index, length);
                        key = template.substring(start, index);
                        state = go_assign;
                        continue;
                    }
                    if (state === go_assign) {
                        if (61 !== c) {
                            parser_error("Assignment expected", template, index, c, "var");
                            return [ node, index ];
                        }
                        state = go_value;
                        index++;
                        continue;
                    }
                    if (state === go_value) {
                        start = index;
                        index++;
                        switch (c) {
                          case 123:
                          case 91:
                            index = cursor_groupEnd(template, index, length, c, c + 2);
                            break;

                          case 39:
                          case 34:
                            index = cursor_quoteEnd(template, index, length, 39 === c ? "'" : '"');
                            break;

                          default:
                            while (index < length) {
                                c = template.charCodeAt(index);
                                if (44 === c || 59 === c) break;
                                index++;
                            }
                            index--;
                        }
                        index++;
                        node.attr[key] = template.substring(start, index);
                        state = go_next;
                        continue;
                    }
                    if (state === go_next) {
                        if (44 === c) {
                            state = go_varName;
                            index++;
                            continue;
                        }
                        break;
                    }
                }
                return [ node, index ];
            };
            function stingify() {
                var attr = this.attr;
                var str = "var ";
                for (var key in attr) {
                    if ("var " !== str) str += ",";
                    str += key + "=" + attr[key];
                }
                return str + ";";
            }
        }();
        function ensureTemplateFunction(template) {
            var index = -1;
            while ((index = template.indexOf(interp_START, index)) !== -1) {
                if (template.charCodeAt(index + 1) === interp_code_OPEN) break;
                index++;
            }
            if (index === -1) return template;
            var length = template.length, array = [], lastIndex = 0, i = 0, end;
            while (true) {
                end = cursor_groupEnd(template, index + 2, length, interp_code_OPEN, interp_code_CLOSE);
                if (end === -1) break;
                array[i++] = lastIndex === index ? "" : template.substring(lastIndex, index);
                array[i++] = template.substring(index + 2, end);
                lastIndex = index = end + 1;
                while ((index = template.indexOf(interp_START, index)) !== -1) {
                    if (template.charCodeAt(index + 1) === interp_code_OPEN) break;
                    index++;
                }
                if (index === -1) break;
            }
            if (lastIndex < length) array[i] = template.substring(lastIndex);
            template = null;
            return function(type, model, ctx, element, controller, name) {
                if (null == type) {
                    var string = "", imax = array.length, i = -1, x;
                    while (++i < imax) {
                        x = array[i];
                        string += i % 2 === 1 ? interp_START + interp_OPEN + x + interp_CLOSE : x;
                    }
                    return string;
                }
                return util_interpolate(array, type, model, ctx, element, controller, name);
            };
        }
        var go_tag = 2, state_tag = 3, state_attr = 5, go_attrVal = 6, go_attrHeadVal = 7, state_literal = 8, go_up = 9;
        Parser = {
            parse: function(template) {
                var current = new Fragment(), fragment = current, state = go_tag, last = state_tag, index = 0, length = template.length, classNames, token, key, value, next, c, start, nextC;
                outer: while (true) {
                    if (index < length && (c = template.charCodeAt(index)) < 33) {
                        index++;
                        continue;
                    }
                    if (47 === c) {
                        nextC = template.charCodeAt(index + 1);
                        if (47 === nextC) {
                            index++;
                            while (10 !== c && 13 !== c && index < length) c = template.charCodeAt(++index);
                            continue;
                        }
                        if (42 === nextC) {
                            index = template.indexOf("*/", index + 2) + 2;
                            if (1 === index) {
                                log_warn("<mask:parse> block comment has no end");
                                index = length;
                            }
                            continue;
                        }
                    }
                    if (last === state_attr) {
                        if (null != classNames) {
                            current.attr["class"] = ensureTemplateFunction(classNames);
                            classNames = null;
                        }
                        if (null != key) {
                            current.attr[key] = key;
                            key = null;
                            token = null;
                        }
                    }
                    if (null != token) {
                        if (state === state_attr) {
                            if (null == key) key = token; else value = token;
                            if (null != key && null != value) {
                                if ("class" !== key) current.attr[key] = value; else classNames = null == classNames ? value : classNames + " " + value;
                                key = null;
                                value = null;
                            }
                        } else if (last === state_tag) {
                            if ("var" === token) {
                                var tuple = parser_var(template, index, length, current);
                                current.appendChild(tuple[0]);
                                index = tuple[1];
                                state = go_tag;
                                token = null;
                                continue;
                            }
                            next = new Node(token, current);
                            current.appendChild(next);
                            current = next;
                            state = state_attr;
                        } else if (last === state_literal) {
                            next = new TextNode(token, current);
                            current.appendChild(next);
                            if (true === current.__single) do current = current.parent; while (null != current && null != current.__single);
                            state = go_tag;
                        }
                        token = null;
                    }
                    if (index >= length) {
                        if (state === state_attr) {
                            if (null != classNames) current.attr["class"] = ensureTemplateFunction(classNames);
                            if (null != key) current.attr[key] = key;
                        }
                        c = null;
                        break;
                    }
                    if (state === go_up) {
                        current = current.parent;
                        while (null != current && null != current.__single) current = current.parent;
                        state = go_tag;
                    }
                    switch (c) {
                      case 123:
                        last = state;
                        state = go_tag;
                        index++;
                        continue;

                      case 62:
                        last = state;
                        state = go_tag;
                        index++;
                        current.__single = true;
                        continue;

                      case 59:
                        if (null != current.nodes) {
                            index++;
                            continue;
                        }

                      case 125:
                        index++;
                        last = state;
                        state = go_up;
                        continue;

                      case 39:
                      case 34:
                        if (state === go_attrVal) state = state_attr; else last = state = state_literal;
                        index++;
                        var isEscaped = false, isUnescapedBlock = false, _char = 39 === c ? "'" : '"';
                        start = index;
                        while ((index = template.indexOf(_char, index)) > -1) {
                            if (92 !== template.charCodeAt(index - 1)) break;
                            isEscaped = true;
                            index++;
                        }
                        if (index === -1) {
                            parser_warn("Literal has no ending", template, start);
                            index = length;
                        }
                        if (index === start) {
                            nextC = template.charCodeAt(index + 1);
                            if (124 === nextC || nextC === c) {
                                isUnescapedBlock = true;
                                start = index + 2;
                                index = template.indexOf((124 === nextC ? "|" : _char) + _char + _char, start);
                                if (index === -1) index = length;
                            }
                        }
                        token = template.substring(start, index);
                        if (true === isEscaped) token = token.replace(__rgxEscapedChar[_char], _char);
                        if (state !== state_attr || "class" !== key) token = ensureTemplateFunction(token);
                        index += isUnescapedBlock ? 3 : 1;
                        continue;
                    }
                    if (state === go_tag) {
                        last = state_tag;
                        state = state_tag;
                        if (46 === c || 35 === c) {
                            token = "div";
                            continue;
                        }
                    } else if (state === state_attr) if (46 === c) {
                        index++;
                        key = "class";
                        state = go_attrHeadVal;
                    } else if (35 === c) {
                        index++;
                        key = "id";
                        state = go_attrHeadVal;
                    } else if (61 === c) {
                        index++;
                        state = go_attrVal;
                        if (last === state_tag && null == key) parser_warn("Unexpected tag assignment", template, index, c, state);
                        continue;
                    } else if (40 === c) {
                        start = 1 + index;
                        index = 1 + cursor_groupEnd(template, start, length, c, 41);
                        current.expression = template.substring(start, index - 1);
                        current.type = Dom.STATEMENT;
                        continue;
                    } else if (null != key) {
                        token = key;
                        continue;
                    }
                    if (state === go_attrVal || state === go_attrHeadVal) {
                        last = state;
                        state = state_attr;
                    }
                    var isInterpolated = null;
                    start = index;
                    while (index < length) {
                        c = template.charCodeAt(index);
                        if (c === interp_code_START && template.charCodeAt(index + 1) === interp_code_OPEN) {
                            isInterpolated = true;
                            ++index;
                            do c = template.charCodeAt(++index); while (c !== interp_code_CLOSE && index < length);
                        }
                        if (39 === c || 34 === c || 47 === c || 60 === c || 44 === c) {
                            parser_warn("", template, index, c, state);
                            break outer;
                        }
                        if (last !== go_attrVal && (46 === c || 35 === c)) break;
                        if (c < 33 || 61 === c || 62 === c || 59 === c || 40 === c || 123 === c || 125 === c) break;
                        index++;
                    }
                    token = template.substring(start, index);
                    if ("" === token) {
                        parser_warn("String expected", template, index, c, state);
                        break;
                    }
                    if (true === isInterpolated) {
                        if (state === state_tag) {
                            parser_warn("Invalid interpolation (in tag name)", template, index, token, state);
                            break;
                        }
                        if (state === state_attr) if ("id" === key || last === go_attrVal) token = ensureTemplateFunction(token); else if ("class" !== key) {
                            parser_warn("Invalid interpolation (in attr name)", template, index, token, state);
                            break;
                        }
                    }
                }
                if (c !== c) parser_warn("IndexOverflow", template, index, c, state);
                var parent = current.parent;
                if (null != parent && parent !== fragment && true !== parent.__single && null != current.nodes) parser_warn("Tag was not closed: " + current.parent.tagName, template);
                var nodes = fragment.nodes;
                return null != nodes && 1 === nodes.length ? nodes[0] : fragment;
            },
            cleanObject: function(obj) {
                if (obj instanceof Array) {
                    for (var i = 0; i < obj.length; i++) this.cleanObject(obj[i]);
                    return obj;
                }
                delete obj.parent;
                delete obj.__single;
                if (null != obj.nodes) this.cleanObject(obj.nodes);
                return obj;
            },
            setInterpolationQuotes: function(start, end) {
                if (!start || 2 !== start.length) {
                    log_error("Interpolation Start must contain 2 Characters");
                    return;
                }
                if (!end || 1 !== end.length) {
                    log_error("Interpolation End must be of 1 Character");
                    return;
                }
                interp_code_START = start.charCodeAt(0);
                interp_code_OPEN = start.charCodeAt(1);
                interp_code_CLOSE = end.charCodeAt(0);
                interp_START = start[0];
                interp_OPEN = start[1];
                interp_CLOSE = end;
            },
            ensureTemplateFunction: ensureTemplateFunction
        };
        parser_parse = Parser.parse;
        parser_ensureTemplateFunction = Parser.ensureTemplateFunction;
        parser_cleanObject = Parser.cleanObject;
        parser_setInterpolationQuotes = Parser.setInterpolationQuotes;
    }(Dom.Node, Dom.TextNode, Dom.Fragment, Dom.Component);
    var builder_componentID = 0, builder_build;
    !function(custom_Attributes, custom_Tags, Component) {
        function build_resumeDelegate(controller, model, ctx, container, children) {
            var anchor = container.appendChild(document.createComment(""));
            return function() {
                return build_resumeController(controller, model, ctx, anchor, children);
            };
        }
        function build_resumeController(ctr, model, ctx, anchor, children) {
            if (null != ctr.tagName && ctr.tagName !== ctr.compoName) ctr.nodes = {
                tagName: ctr.tagName,
                attr: ctr.attr,
                nodes: ctr.nodes,
                type: 1
            };
            if (null != ctr.model) model = ctr.model;
            var nodes = ctr.nodes, elements = [];
            if (null != nodes) {
                var isarray = nodes instanceof Array, length = true === isarray ? nodes.length : 1, i = 0, childNode = null, fragment = document.createDocumentFragment();
                for (;i < length; i++) {
                    childNode = true === isarray ? nodes[i] : nodes;
                    builder_build(childNode, model, ctx, fragment, ctr, elements);
                }
                anchor.parentNode.insertBefore(fragment, anchor);
            }
            if (null == ctr.tagName) {
                var attrHandlers = ctr.handlers && ctr.handlers.attr, attrFn, key;
                for (key in ctr.attr) {
                    attrFn = null;
                    if (attrHandlers && is_Function(attrHandlers[key])) attrFn = attrHandlers[key];
                    if (null == attrFn && is_Function(custom_Attributes[key])) attrFn = custom_Attributes[key];
                    if (null != attrFn) attrFn(anchor, ctr.attr[key], model, ctx, elements[0], ctr);
                }
            }
            if (is_Function(ctr.renderEnd)) ctr.renderEnd(elements, model, ctx, anchor.parentNode);
            if (null != children && children !== elements) {
                var il = children.length, jl = elements.length, j = -1;
                while (++j < jl) children[il + j] = elements[j];
            }
        }
        function controller_pushCompo(ctr, compo) {
            var compos = ctr.components;
            if (null == compos) {
                ctr.components = [ compo ];
                return;
            }
            compos.push(compo);
        }
        var build_textNode = function() {
            var append_textNode = function(document) {
                return function(element, text) {
                    element.appendChild(document.createTextNode(text));
                };
            }(document);
            return function build_textNode(node, model, ctx, container, controller) {
                var content = node.content;
                if (is_Function(content)) {
                    var result = content("node", model, ctx, container, controller);
                    if ("string" === typeof result) {
                        append_textNode(container, result);
                        return;
                    }
                    var text = "", jmax = result.length, j = 0, x;
                    for (;j < jmax; j++) {
                        x = result[j];
                        if ("object" === typeof x) {
                            if ("" !== text) {
                                append_textNode(container, text);
                                text = "";
                            }
                            if (null == x.nodeType) {
                                text += x.toString();
                                continue;
                            }
                            container.appendChild(x);
                            continue;
                        }
                        text += x;
                    }
                    if ("" !== text) append_textNode(container, text);
                    return;
                }
                append_textNode(container, content);
            };
        }();
        var build_node = function() {
            var el_create = function(doc) {
                return function(name) {
                    try {
                        return doc.createElement(name);
                    } catch (error) {
                        log_error(name, "element cannot be created. If this should be a custom handler tag, then controller is not defined");
                        return null;
                    }
                };
            }(document);
            return function build_node(node, model, ctx, container, controller, childs) {
                var tagName = node.tagName, attr = node.attr;
                var tag = el_create(tagName);
                if (null == tag) return;
                if (null != childs) {
                    childs.push(tag);
                    attr["x-compo-id"] = controller.ID;
                }
                if (null != container) container.appendChild(tag);
                var key, value;
                for (key in attr) {
                    if (is_Function(attr[key])) {
                        value = attr[key]("attr", model, ctx, tag, controller, key);
                        if (value instanceof Array) value = value.join("");
                    } else value = attr[key];
                    if (value) if (is_Function(custom_Attributes[key])) custom_Attributes[key](node, value, model, ctx, tag, controller, container); else tag.setAttribute(key, value);
                }
                return tag;
            };
        }();
        var build_compo;
        !function() {
            build_compo = function(node, model, ctx, container, controller, childs) {
                var compoName = node.tagName, Handler;
                if (null != node.controller) Handler = node.controller;
                if (null == Handler) Handler = custom_Tags[compoName];
                if (null == Handler) return build_NodeAsCompo(node, model, ctx, container, controller, childs);
                var isStatic = false, handler, attr, key;
                if ("function" === typeof Handler) handler = new Handler(model); else {
                    handler = Handler;
                    isStatic = true;
                }
                var fn = isStatic ? build_Static : build_Component;
                return fn(handler, node, model, ctx, container, controller, childs);
            };
            function build_Component(compo, node, model, ctx, container, controller, childs) {
                var attr, key;
                compo.compoName = node.tagName;
                compo.attr = attr = attr_extend(compo.attr, node.attr);
                compo.parent = controller;
                compo.ID = ++builder_componentID;
                compo.expression = node.expression;
                if (null == compo.model) compo.model = model;
                if (null == compo.nodes) compo.nodes = node.nodes;
                for (key in attr) if ("function" === typeof attr[key]) attr[key] = attr[key]("attr", model, ctx, container, controller, key);
                listeners_emit("compoCreated", compo, model, ctx, container);
                if (is_Function(compo.renderStart)) compo.renderStart(model, ctx, container);
                controller_pushCompo(controller, compo);
                if (true === compo.async) {
                    compo.await(build_resumeDelegate(compo, model, ctx, container, childs));
                    return null;
                }
                if (null != compo.tagName) compo.nodes = {
                    tagName: compo.tagName,
                    attr: compo.attr,
                    nodes: compo.nodes,
                    type: 1
                };
                if ("function" === typeof compo.render) {
                    compo.render(compo.model, ctx, container);
                    return null;
                }
                return compo;
            }
            function build_Static(static_, node, model, ctx, container, ctr, children) {
                var Ctor = static_.__Ctor, wasRendered = false, elements, compo, clone;
                if (Ctor) clone = new Ctor(node, ctr); else {
                    clone = static_;
                    for (var key in node) clone[key] = node[key];
                    clone.parent = ctr;
                }
                var attr = clone.attr;
                if (null != attr) for (var key in attr) if ("function" === typeof attr[key]) attr[key] = attr[key]("attr", model, ctx, container, ctr, key);
                if (is_Function(clone.renderStart)) clone.renderStart(model, ctx, container, ctr, children);
                controller_pushCompo(ctr, clone);
                var i = ctr.components.length - 1;
                if (is_Function(clone.render)) {
                    wasRendered = true;
                    elements = clone.render(model, ctx, container, ctr, children);
                    arr_pushMany(children, elements);
                    if (is_Function(clone.renderEnd)) {
                        compo = clone.renderEnd(elements, model, ctx, container, ctr);
                        if (null != compo) ctr.components[i] = compo;
                    }
                }
                return wasRendered ? null : clone;
            }
            function build_NodeAsCompo(node, model, ctx, container, controller, childs) {
                node.ID = ++builder_componentID;
                controller_pushCompo(controller, node);
                if (null == node.model) node.model = model;
                var els = node.elements = [];
                builder_build(node.nodes, node.model, ctx, container, node, els);
                if (null != childs && 0 !== els.length) arr_pushMany(childs, els);
                return null;
            }
        }();
        builder_build = function(node, model, ctx, container, controller, childs) {
            if (null == node) return container;
            var type = node.type, elements, key, value, j, jmax;
            if (null == controller) controller = new Component();
            if (null == type) if (node instanceof Array) type = 10; else if (null != node.tagName) type = 1; else if (null != node.content) type = 2;
            if (1 === type && null != custom_Tags[node.tagName]) type = 4;
            if (null == container && 1 !== type) container = document.createDocumentFragment();
            if (2 === type) {
                build_textNode(node, model, ctx, container, controller);
                return container;
            }
            if (10 === type) {
                j = 0;
                jmax = node.length;
                for (;j < jmax; j++) builder_build(node[j], model, ctx, container, controller, childs);
                return container;
            }
            var tagName = node.tagName;
            if ("else" === tagName) return container;
            if (15 === type) {
                var Handler = custom_Statements[tagName];
                if (null == Handler) if (null != custom_Tags[tagName]) type = 4; else {
                    log_error("<mask: statement is undefined>", tagName);
                    return container;
                }
                if (15 === type) {
                    Handler.render(node, model, ctx, container, controller, childs);
                    return container;
                }
            }
            if (1 === type) {
                container = build_node(node, model, ctx, container, controller, childs);
                childs = null;
            }
            if (4 === type) {
                controller = build_compo(node, model, ctx, container, controller, childs);
                if (null == controller) return container;
                elements = [];
                node = controller;
                if (controller.model !== model && null != controller.model) model = controller.model;
            }
            var nodes = node.nodes;
            if (null != nodes) {
                if (null != childs && null == elements) elements = childs;
                var isarray = nodes instanceof Array, length = true === isarray ? nodes.length : 1, i = 0, childNode = null;
                for (;i < length; i++) {
                    childNode = true === isarray ? nodes[i] : nodes;
                    builder_build(childNode, model, ctx, container, controller, elements);
                }
            }
            if (4 === type) {
                if (null == node.tagName && "%" !== node.compoName) {
                    var attrHandlers = node.handlers && node.handlers.attr, attrFn, val, key;
                    for (key in node.attr) {
                        val = node.attr[key];
                        if (null == val) continue;
                        attrFn = null;
                        if (null != attrHandlers && is_Function(attrHandlers[key])) attrFn = attrHandlers[key];
                        if (null == attrFn && null != custom_Attributes[key]) attrFn = custom_Attributes[key];
                        if (null != attrFn) attrFn(node, val, model, ctx, elements[0], controller);
                    }
                }
                if (is_Function(node.renderEnd)) node.renderEnd(elements, model, ctx, container);
            }
            if (null != childs && null != elements && childs !== elements) arr_pushMany(childs, elements);
            return container;
        };
    }(custom_Attributes, custom_Tags, Dom.Component);
    var mask_run;
    !function() {
        mask_run = function() {
            var args = _Array_slice.call(arguments), container, model, Ctr, imax, i, mix;
            imax = args.length;
            i = -1;
            while (++i < imax) {
                mix = args[i];
                if (mix instanceof Node) {
                    container = mix;
                    continue;
                }
                if (is_Function(mix)) {
                    Ctr = mix;
                    continue;
                }
                if (is_Object(mix)) {
                    model = mix;
                    continue;
                }
            }
            if (null == container) container = document.body;
            var controller = is_Function(Ctr) ? new Ctr() : new Compo();
            controller.ID = ++builder_componentID;
            var scripts = document.getElementsByTagName("script"), script, found = false;
            imax = scripts.length;
            i = -1;
            while (++i < imax) {
                script = scripts[i];
                if ("text/mask" !== script.getAttribute("type")) continue;
                if ("true" !== script.getAttribute("data-run")) continue;
                var fragment = builder_build(parser_parse(script.textContent), model, {}, null, controller);
                script.parentNode.insertBefore(fragment, script);
                found = true;
            }
            if (false === found) log_warn("No blocks found: <script type='text/mask' data-run='true'>...</script>");
            if (is_Function(controller.renderEnd)) controller.renderEnd(container, model);
            Compo.signal.emitIn(controller, "domInsert");
            return controller;
        };
    }();
    var mask_merge;
    !function() {
        mask_merge = function(a, b, owner) {
            if ("string" === typeof a) a = parser_parse(a);
            if ("string" === typeof b) b = parser_parse(b);
            var contents = _getContents(b, b, new Contents());
            return _merge(a, contents, owner);
        };
        var tag_ELSE = "@else", tag_IF = "@if", tag_EACH = "@each", tag_PLACEHOLDER = "@placeholder", dom_NODE = Dom.NODE, dom_TEXTNODE = Dom.TEXTNODE, dom_FRAGMENT = Dom.FRAGMENT, dom_STATEMENT = Dom.STATEMENT;
        function _merge(node, contents, tmplNode, clonedParent) {
            if (null == node) return null;
            if (is_Array(node)) return _mergeArray(node, contents, tmplNode, clonedParent);
            switch (node.type) {
              case dom_TEXTNODE:
                return _cloneTextNode(node, contents, tmplNode);

              case dom_NODE:
              case dom_STATEMENT:
                return _mergeNode(node, contents, tmplNode, clonedParent);

              case dom_FRAGMENT:
                return _mergeArray(node.nodes, contents, tmplNode, clonedParent);
            }
            log_warn("Uknown type", node.type);
            return null;
        }
        function _mergeArray(nodes, contents, tmplNode, clonedParent) {
            var fragment = new Dom.Fragment(), imax = nodes.length, i = -1, x, node;
            while (++i < imax) {
                node = nodes[i];
                if (node.tagName === tag_ELSE) {
                    if (null != x) continue;
                    if (node.expression && !eval_(node.expression, contents, tmplNode)) continue;
                    x = _merge(nodes[i].nodes, contents, tmplNode, clonedParent);
                } else x = _merge(node, contents, tmplNode, clonedParent);
                appendAny(fragment, x);
            }
            return fragment;
        }
        function _mergeNode(node, contents, tmplNode, clonedParent) {
            var tagName = node.tagName;
            if (64 !== tagName.charCodeAt(0)) return _cloneNode(node, contents, tmplNode, clonedParent);
            var id = node.attr.id;
            if (tagName === tag_PLACEHOLDER && null == id) return tmplNode.nodes;
            if (tag_EACH === tagName) {
                var arr = contents[node.expression], x;
                if (null == arr) {
                    log_error("No template node: @" + node.expression);
                    return null;
                }
                if (false === is_Array(arr)) {
                    x = arr;
                    return _merge(node.nodes, _getContents(x.nodes, x.nodes, new Contents(contents)), x, clonedParent);
                }
                var fragment = new Dom.Fragment(), imax = arr.length, i = -1;
                while (++i < imax) {
                    x = arr[i];
                    appendAny(fragment, _merge(node.nodes, _getContents(x.nodes, x.nodes, new Contents(contents)), x, clonedParent));
                }
                return fragment;
            }
            if (tag_IF === tagName) {
                var val = eval_(node.expression, contents, tmplNode);
                return val ? _merge(node.nodes, contents, tmplNode, clonedParent) : null;
            }
            if (null == id) id = tagName.substring(1);
            var content = contents.$getNode(id);
            if (null == content) return null;
            if (content.parent) _modifyParents(clonedParent, content.parent);
            var contentNodes = content.nodes, wrapperNode;
            if (node.attr.as !== void 0) {
                var tagName_ = node.attr.as;
                wrapperNode = {
                    type: dom_NODE,
                    tagName: tagName_,
                    attr: _mergeAttr(node.attr, content.attr, contents, tmplNode),
                    parent: clonedParent,
                    nodes: contentNodes
                };
                wrapperNode.attr.as = null;
            }
            if (null == node.nodes) return wrapperNode || contentNodes;
            var nodes = _merge(node.nodes, _getContents(contentNodes, contentNodes, new Contents(contents)), content, wrapperNode || clonedParent);
            if (null != wrapperNode) {
                wrapperNode.nodes = nodes;
                return wrapperNode;
            }
            return nodes;
        }
        function _mergeAttr(a, b, contents, tmplNode) {
            if (null == a || null == b) return a || b;
            var out = interpolate_obj_(a, contents, tmplNode);
            for (var key in b) out[key] = interpolate_str_(b[key], contents, tmplNode);
            return out;
        }
        function _cloneNode(node, contents, tmplNode, clonedParent) {
            var tagName = node.tagName || node.compoName;
            if (":template" === tagName) {
                var id = interpolate_str_(node.attr.id, contents, tmplNode);
                Mask.templates.register(id, node.nodes);
                return null;
            }
            if (":import" === tagName) {
                var id = interpolate_str_(node.attr.id, contents, tmplNode), nodes = Mask.templates.resolve(node, id);
                return _merge(nodes, contents, tmplNode, clonedParent);
            }
            var outnode = {
                type: node.type,
                tagName: tagName,
                attr: interpolate_obj_(node.attr, contents, tmplNode),
                expression: interpolate_str_(node.expression, contents, tmplNode),
                controller: node.controller,
                parent: clonedParent
            };
            if (node.nodes) outnode.nodes = _merge(node.nodes, contents, tmplNode, outnode);
            return outnode;
        }
        function _cloneTextNode(node, contents, tmplNode, clonedParent) {
            return {
                type: node.type,
                content: interpolate_str_(node.content, contents, tmplNode),
                parent: clonedParent
            };
        }
        function interpolate_obj_(obj, contents, node) {
            var clone = _Object_create(obj), x;
            for (var key in clone) {
                x = clone[key];
                if (null == x) continue;
                clone[key] = interpolate_str_(x, contents, node);
            }
            return clone;
        }
        function interpolate_str_(mix, contents, node) {
            var index = -1, isFn = false, str = mix;
            if ("function" === typeof mix) {
                isFn = true;
                str = mix();
            }
            if ("string" !== typeof str || (index = str.indexOf("@")) === -1) return mix;
            var result = str.substring(0, index), length = str.length, isBlockEntry = 91 === str.charCodeAt(index + 1), last = -1, c;
            while (index < length) {
                last = index;
                if (true === isBlockEntry) {
                    index = str.indexOf("]", last);
                    if (index === -1) index = length;
                    last += 2;
                } else while (index < length) {
                    c = str.charCodeAt(++index);
                    if (36 === c || 95 === c || 46 === c) continue;
                    if (48 <= c && c <= 57 || 65 <= c && c <= 90 || 97 <= c && c <= 122) continue;
                    break;
                }
                var expr = str.substring(last, index), fn = isBlockEntry ? eval_ : interpolate_, x = fn(expr, contents, node);
                if (null != x) result += x;
                last = isBlockEntry ? index + 1 : index;
                index = str.indexOf("@", index);
                if (index === -1) index = length;
                result += str.substring(last, index);
            }
            return isFn ? parser_ensureTemplateFunction(result) : result;
        }
        function interpolate_(path, contents, node) {
            var index = path.indexOf(".");
            if (index === -1) {
                log_warn("Merge templates. Accessing node", path);
                return "";
            }
            var tagName = path.substring(0, index), id = tagName.substring(1), property = path.substring(index + 1), obj = null;
            if (null != node) if ("@attr" === tagName) obj = node.attr; else if (tagName === node.tagName) obj = node;
            if (null == obj) obj = contents.$getNode(id);
            if (null == obj) {
                log_error("Merge templates. Node not found", tagName);
                return "";
            }
            return obj_getProperty(obj, property);
        }
        function appendAny(node, mix) {
            if (null == mix) return;
            if ("function" === typeof mix.concat) {
                var imax = mix.length;
                for (var i = 0; i < imax; i++) appendAny(node, mix[i]);
                return;
            }
            if (mix.type === dom_FRAGMENT) {
                appendAny(node, mix.nodes);
                return;
            }
            node.appendChild(mix);
        }
        var RESERVED = " else placeholder each attr if parent scope";
        function _getContents(b, node, contents) {
            if (null == node) return contents;
            if (is_Array(node)) {
                var imax = node.length, i = -1;
                while (++i < imax) _getContents(node === b ? node[i] : b, node[i], contents);
                return contents;
            }
            var type = node.type;
            if (type === dom_TEXTNODE) return contents;
            if (type === dom_NODE) {
                var tagName = node.tagName;
                if (null != tagName && 64 === tagName.charCodeAt(0)) {
                    var id = tagName.substring(1);
                    if (RESERVED.indexOf(" " + id + " ") !== -1) log_error("MaskMerge. Reserved Name", id);
                    var x = {
                        tagName: node.tagName,
                        parent: _getParentModifiers(b, node),
                        nodes: node.nodes,
                        attr: node.attr,
                        expression: node.expression
                    };
                    if (null == contents[id]) contents[id] = x; else {
                        var current = contents[id];
                        if (is_Array(current)) current.push(x); else contents[id] = [ current, x ];
                    }
                    return contents;
                }
            }
            return _getContents(b, node.nodes, contents);
        }
        function _getParentModifiers(root, node) {
            if (node === root) return null;
            var current, parents, parent = node.parent;
            while (true) {
                if (null == parent) break;
                if (parent === root && root.type !== dom_NODE) break;
                var p = {
                    type: parent.type,
                    tagName: parent.tagName,
                    attr: parent.attr,
                    controller: parent.controller,
                    expression: parent.expression,
                    nodes: null,
                    parent: null
                };
                if (null == parents) current = parents = p; else {
                    current.parent = p;
                    current = p;
                }
                parent = parent.parent;
            }
            return parents;
        }
        function _modifyParents(clonedParent, parents) {
            var nodeParent = clonedParent, modParent = parents;
            while (null != nodeParent && null != modParent) {
                if (modParent.tagName) nodeParent.tagName = modParent.tagName;
                if (modParent.expression) nodeParent.expression = modParent.expression;
                for (var key in modParent.attr) nodeParent.attr[key] = modParent.attr[key];
                nodeParent = nodeParent.parent;
                modParent = modParent.parent;
            }
        }
        function eval_(expr, contents, tmplNode) {
            if (tmplNode) contents.attr = tmplNode.attr;
            return ExpressionUtil.eval(expr, contents, null, contents);
        }
        function Contents(parent) {
            this.scope = this;
            this.parent = parent;
        }
        Contents.prototype = {
            parent: null,
            attr: null,
            scope: null,
            $getNode: function(id) {
                var ctx = this, node;
                while (null != ctx) {
                    node = ctx[id];
                    if (null != node) return node;
                    ctx = ctx.parent;
                }
            }
        };
    }();
    var cache = {}, Mask = {
        render: function(template, model, ctx, container, controller) {
            if (null != container && "function" !== typeof container.appendChild) {
                log_error(".render(template[, model, ctx, container, controller]", "Container should implement .appendChild method");
                log_warn("Args:", arguments);
            }
            if ("string" === typeof template) if (_Object_hasOwnProp.call(cache, template)) template = cache[template]; else template = cache[template] = parser_parse(template);
            if (null == ctx) ctx = {};
            return builder_build(template, model, ctx, container, controller);
        },
        compile: parser_parse,
        parse: parser_parse,
        build: builder_build,
        run: mask_run,
        merge: mask_merge,
        registerHandler: customTag_register,
        getHandler: function(tagName) {
            return null != tagName ? custom_Tags[tagName] : custom_Tags;
        },
        registerStatement: function(name, handler) {
            custom_Statements[name] = is_Function(handler) ? {
                render: handler
            } : handler;
        },
        getStatement: function(name) {
            return null != name ? custom_Statements[name] : custom_Statements;
        },
        registerAttrHandler: function(attrName, mix, Handler) {
            if (is_Function(mix)) Handler = mix;
            custom_Attributes[attrName] = Handler;
        },
        getAttrHandler: function(attrName) {
            return null != attrName ? custom_Attributes[attrName] : custom_Attributes;
        },
        registerUtil: customUtil_register,
        getUtil: customUtil_get,
        $utils: customUtil_$utils,
        registerUtility: function(utilityName, fn) {
            log_warn("@registerUtility - deprecated - use registerUtil(utilName, mix)", utilityName);
            this.registerUtility = this.registerUtil;
            this.registerUtility(utilityName, fn);
        },
        getUtility: function(util) {
            log_warn("@getUtility - deprecated - use getUtil(utilName)", util);
            this.getUtility = this.getUtil;
            return this.getUtility();
        },
        clearCache: function(key) {
            if ("string" === typeof key) delete cache[key]; else cache = {};
        },
        Utils: {
            Expression: ExpressionUtil,
            getProperty: obj_getProperty,
            ensureTmplFn: Parser.ensureTemplateFunction
        },
        Dom: Dom,
        plugin: function(source) {
            eval(source);
        },
        obj: {
            get: obj_getProperty,
            set: obj_setProperty,
            extend: obj_extend
        },
        is: {
            Function: is_Function,
            String: is_String,
            ArrayLike: is_ArrayLike
        },
        on: listeners_on,
        off: listeners_off,
        delegateReload: function() {},
        setInterpolationQuotes: Parser.setInterpolationQuotes,
        setCompoIndex: function(index) {
            builder_componentID = index;
        },
        cfg: function() {
            var args = arguments;
            if (0 === args.length) return __cfg;
            var key, value;
            if (2 === args.length) {
                key = args[0];
                __cfg[key] = args[1];
                return;
            }
            var obj = args[0];
            if ("object" === typeof obj) for (key in obj) __cfg[key] = obj[key];
        }
    };
    Mask.renderDom = Mask.render;
    !function(mask) {
        var mask_stringify;
        !function() {
            mask_stringify = function(input, settings) {
                if (null == input) return "";
                if ("string" === typeof input) input = mask.parse(input);
                if (null == settings) {
                    _indent = 0;
                    _minimize = true;
                } else if ("number" === typeof settings) {
                    _indent = settings;
                    _minimize = 0 === _indent;
                } else {
                    _indent = settings && settings.indent || 4;
                    _minimize = 0 === _indent || settings && settings.minimizeAttributes;
                }
                return run(input);
            };
            var _minimize, _indent, Dom = mask.Dom;
            function doindent(count) {
                var output = "";
                while (count--) output += " ";
                return output;
            }
            function run(node, indent, output) {
                var outer, i;
                if (null == indent) indent = 0;
                if (null == output) {
                    outer = true;
                    output = [];
                }
                var index = output.length;
                if (node.type === Dom.FRAGMENT) node = node.nodes;
                if (node instanceof Array) for (i = 0; i < node.length; i++) processNode(node[i], indent, output); else processNode(node, indent, output);
                var spaces = doindent(indent);
                for (i = index; i < output.length; i++) output[i] = spaces + output[i];
                if (outer) return output.join(0 === _indent ? "" : "\n");
            }
            function processNode(node, currentIndent, output) {
                if ("function" === typeof node.stringify) {
                    output.push(node.stringify(_minimize));
                    return;
                }
                if ("string" === typeof node.content) {
                    output.push(wrapString(node.content));
                    return;
                }
                if ("function" === typeof node.content) {
                    output.push(wrapString(node.content()));
                    return;
                }
                if (isEmpty(node)) {
                    output.push(processNodeHead(node) + ";");
                    return;
                }
                if (isSingle(node)) {
                    var next = _minimize ? ">" : " > ";
                    output.push(processNodeHead(node) + next);
                    run(getSingle(node), _indent, output);
                    return;
                }
                output.push(processNodeHead(node) + "{");
                run(node.nodes, _indent, output);
                output.push("}");
                return;
            }
            function processNodeHead(node) {
                var tagName = node.tagName, _id = node.attr.id || "", _class = node.attr["class"] || "";
                if ("function" === typeof _id) _id = _id();
                if ("function" === typeof _class) _class = _class();
                if (_id) _id = _id.indexOf(" ") !== -1 ? "" : "#" + _id;
                if (_class) _class = "." + _class.split(" ").join(".");
                var attr = "";
                for (var key in node.attr) {
                    if ("id" === key || "class" === key) continue;
                    var value = node.attr[key];
                    if ("function" === typeof value) value = value();
                    if (false === _minimize || /[^\w_$\-\.]/.test(value)) value = wrapString(value);
                    attr += " " + key;
                    if (key !== value) attr += "=" + value;
                }
                if ("div" === tagName && (_id || _class)) tagName = "";
                var expr = "";
                if (node.expression) expr = "(" + node.expression + ")";
                return tagName + _id + _class + attr + expr;
            }
            function isEmpty(node) {
                return null == node.nodes || node.nodes instanceof Array && 0 === node.nodes.length;
            }
            function isSingle(node) {
                return node.nodes && (node.nodes instanceof Array === false || 1 === node.nodes.length);
            }
            function getSingle(node) {
                if (node.nodes instanceof Array) return node.nodes[0];
                return node.nodes;
            }
            function wrapString(str) {
                if (str.indexOf("'") === -1) return "'" + str.trim() + "'";
                if (str.indexOf('"') === -1) return '"' + str.trim() + '"';
                return '"' + str.replace(/"/g, '\\"').trim() + '"';
            }
        }();
        mask.stringify = mask_stringify;
    }(Mask);
    !function() {
        Mask.registerHandler(":html", {
            $meta: {
                mode: "server:all"
            },
            render: function(model, ctx, container) {
                this.html = jmask(this.nodes).text(model, ctx, this);
                if (container.insertAdjacentHTML) {
                    container.insertAdjacentHTML("beforeend", this.html);
                    return;
                }
                if (container.ownerDocument) {
                    var div = document.createElement("div"), frag = document.createDocumentFragment(), child;
                    div.innerHTML = this.html;
                    child = div.firstChild;
                    while (null != child) {
                        frag.appendChild(child);
                        child = child.nextSibling;
                    }
                }
            },
            toHtml: function() {
                return this.html || "";
            },
            html: null
        });
    }();
    !function(mask) {
        custom_Tags["define"] = Define;
        function Define() {}
        Define.prototype = {
            $meta: {
                serializeNodes: true
            },
            render: define,
            onRenderStartClient: define
        };
        function define() {
            var name;
            for (name in this.attr) break;
            var nodes = this.nodes;
            mask.registerHandler(name, Compo({
                renderStart: function() {
                    this.nodes = mask.merge(nodes, this.nodes || [], this);
                }
            }));
        }
    }(Mask);
    !function() {
        var templates_ = {}, helper_ = {
            get: function(id) {
                return templates_[id];
            },
            resolve: function(node, id) {
                var nodes = templates_[id];
                if (null != nodes) return nodes;
                var selector = ":template[id=" + id + "]", parent = node.parent, tmpl = null;
                while (null != parent) {
                    tmpl = jmask(parent.nodes).filter(selector).get(0);
                    if (null != tmpl) return tmpl.nodes;
                    parent = parent.parent;
                }
                log_warn("Template was not found", id);
                return null;
            },
            register: function(id, nodes) {
                if (null == id) {
                    log_warn("`:template` must be define via id attr.");
                    return;
                }
                templates_[id] = nodes;
            }
        };
        Mask.templates = helper_;
        Mask.registerHandler(":template", {
            render: function() {
                helper_.register(this.attr.id, this.nodes);
            }
        });
        Mask.registerHandler(":import", {
            renderStart: function() {
                var id = this.attr.id;
                if (null == id) {
                    log_error("`:import` shoud reference the template via id attr");
                    return;
                }
                this.nodes = helper_.resolve(this, id);
            }
        });
    }();
    !function() {
        custom_Statements["log"] = {
            render: function(node, model, ctx, container, controller) {
                var arr = ExpressionUtil.evalStatements(node.expression, model, ctx, controller);
                arr.unshift("Mask::Log");
                console.log.apply(console, arr);
            }
        };
        customTag_register("debugger", {
            render: function(model, ctx, container, compo) {
                debugger;
            }
        });
    }();
    var Compo = exports.Compo = function(mask) {
        var Dom = mask.Dom, _mask_ensureTmplFnOrig = mask.Utils.ensureTmplFn, _mask_ensureTmplFn, _resolve_External, domLib, Class;
        !function() {
            _mask_ensureTmplFn = function(value) {
                return "string" !== typeof value ? value : _mask_ensureTmplFnOrig(value);
            };
            _resolve_External = function(key) {
                return _global[key] || _exports[key] || _atma[key];
            };
            var _global = global, _atma = global.atma || {}, _exports = exports || {};
            function resolve() {
                var i = arguments.length, val;
                while (--i > -1) {
                    val = _resolve_External(arguments[i]);
                    if (null != val) return val;
                }
                return null;
            }
            domLib = resolve("jQuery", "Zepto", "$");
            Class = resolve("Class");
        }();
        if (null != global.document && null == domLib) log_warn("DomLite is used. You can set jQuery-Zepto-Kimbo via `Compo.config.setDOMLibrary($)`");
        var selector_parse, selector_match;
        !function() {
            selector_parse = function(selector, type, direction) {
                if (null == selector) log_error("<compo>selector is undefined", type);
                if ("object" === typeof selector) return selector;
                var key, prop, nextKey;
                if (null == key) switch (selector[0]) {
                  case "#":
                    key = "id";
                    selector = selector.substring(1);
                    prop = "attr";
                    break;

                  case ".":
                    key = "class";
                    selector = sel_hasClassDelegate(selector.substring(1));
                    prop = "attr";
                    break;

                  default:
                    key = type === Dom.SET ? "tagName" : "compoName";
                }
                if ("up" === direction) nextKey = "parent"; else nextKey = type === Dom.SET ? "nodes" : "components";
                return {
                    key: key,
                    prop: prop,
                    selector: selector,
                    nextKey: nextKey
                };
            };
            selector_match = function(node, selector, type) {
                if (is_String(selector)) {
                    if (null == type) type = Dom[node.compoName ? "CONTROLLER" : "SET"];
                    selector = selector_parse(selector, type);
                }
                var obj = selector.prop ? node[selector.prop] : node;
                if (null == obj) return false;
                if (is_Function(selector.selector)) return selector.selector(obj[selector.key]);
                if (null != selector.selector.test) return selector.selector.test(obj[selector.key]);
                return obj[selector.key] == selector.selector;
            };
            function sel_hasClassDelegate(matchClass) {
                return function(className) {
                    return sel_hasClass(className, matchClass);
                };
            }
            function sel_hasClass(className, matchClass, index) {
                if ("string" !== typeof className) return false;
                if (null == index) index = 0;
                index = className.indexOf(matchClass, index);
                if (index === -1) return false;
                if (index > 0 && className.charCodeAt(index - 1) > 32) return sel_hasClass(className, matchClass, index + 1);
                var class_Length = className.length, match_Length = matchClass.length;
                if (index < class_Length - match_Length && className.charCodeAt(index + match_Length) > 32) return sel_hasClass(className, matchClass, index + 1);
                return true;
            }
        }();
        var find_findSingle;
        !function() {
            find_findSingle = function(node, matcher) {
                if (is_Array(node)) {
                    var imax = node.length, i = -1, result;
                    while (++i < imax) {
                        result = find_findSingle(node[i], matcher);
                        if (null != result) return result;
                    }
                    return null;
                }
                if (selector_match(node, matcher)) return node;
                node = node[matcher.nextKey];
                return null == node ? null : find_findSingle(node, matcher);
            };
        }();
        var dom_addEventListener, node_tryDispose, node_tryDisposeChildren;
        !function() {
            dom_addEventListener = function(element, event, listener) {
                if (null != EventDecorator) event = EventDecorator(event);
                if (null != domLib) return domLib(element).on(event, listener);
                if (null != element.addEventListener) return element.addEventListener(event, listener, false);
                if (element.attachEvent) element.attachEvent("on" + event, listener);
            };
            node_tryDispose = function(node) {
                if (node.hasAttribute("x-compo-id")) {
                    var id = node.getAttribute("x-compo-id"), compo = Anchor.getByID(id);
                    if (compo) {
                        if (null == compo.$ || 1 === compo.$.length) {
                            compo_dispose(compo);
                            compo_detachChild(compo);
                            return;
                        }
                        var i = _Array_indexOf.call(compo.$, node);
                        if (i !== -1) _Array_splice.call(compo.$, i, 1);
                    }
                }
                node_tryDisposeChildren(node);
            };
            node_tryDisposeChildren = function(node) {
                var child = node.firstChild;
                while (null != child) {
                    if (1 === child.nodeType) node_tryDispose(child);
                    child = child.nextSibling;
                }
            };
        }();
        var domLib_find, domLib_on;
        !function() {
            domLib_find = function($set, selector) {
                return $set.filter(selector).add($set.find(selector));
            };
            domLib_on = function($set, type, selector, fn) {
                if (null == selector) return $set.on(type, fn);
                $set.on(type, selector, fn).filter(selector).on(type, fn);
                return $set;
            };
        }();
        var compo_dispose, compo_detachChild, compo_ensureTemplate, compo_ensureAttributes, compo_attachDisposer, compo_removeElements, compo_prepairAsync, compo_errored, compo_meta_prepairAttributeHandler, compo_meta_executeAttributeHandler;
        !function() {
            compo_dispose = function(compo) {
                if (null != compo.dispose) compo.dispose();
                Anchor.removeCompo(compo);
                var compos = compo.components, i = null == compos ? 0 : compos.length;
                while (--i > -1) compo_dispose(compos[i]);
            };
            compo_detachChild = function(childCompo) {
                var parent = childCompo.parent;
                if (null == parent) return;
                var arr = childCompo.$, elements = parent.$ || parent.elements, i;
                if (elements && arr) {
                    var jmax = arr.length, el, j;
                    i = elements.length;
                    while (--i > -1) {
                        el = elements[i];
                        j = jmax;
                        while (--j > -1) if (el === arr[j]) {
                            elements.splice(i, 1);
                            break;
                        }
                    }
                }
                var compos = parent.components;
                if (null != compos) {
                    i = compos.length;
                    while (--i > -1) if (compos[i] === childCompo) {
                        compos.splice(i, 1);
                        break;
                    }
                    if (i === -1) log_warn("<compo:remove> - i`m not in parents collection", childCompo);
                }
            };
            compo_ensureTemplate = function(compo) {
                if (null == compo.nodes) {
                    compo.nodes = getTemplateProp_(compo);
                    return;
                }
                var behaviour = compo.meta.template;
                if (null == behaviour || "replace" === behaviour) return;
                var template = getTemplateProp_(compo);
                if ("merge" === behaviour) {
                    compo.nodes = mask_merge(template, compo.nodes, compo);
                    return;
                }
                if ("join" === behaviour) {
                    compo.nodes = [ template, compo.nodes ];
                    return;
                }
                log_error("Invalid meta.nodes behaviour", behaviour);
            };
            compo_attachDisposer = function(compo, disposer) {
                if (null == compo.dispose) {
                    compo.dispose = disposer;
                    return;
                }
                var prev = compo.dispose;
                compo.dispose = function() {
                    disposer.call(this);
                    prev.call(this);
                };
            };
            compo_removeElements = function(compo) {
                if (compo.$) {
                    compo.$.remove();
                    return;
                }
                var els = compo.elements;
                if (els) {
                    var i = -1, imax = els.length;
                    while (++i < imax) if (els[i].parentNode) els[i].parentNode.removeChild(els[i]);
                    return;
                }
                var compos = compo.components;
                if (compos) {
                    var i = -1, imax = compos.length;
                    while (++i < imax) compo_removeElements(compos[i]);
                }
            };
            compo_prepairAsync = function(dfr, compo, ctx) {
                var resume = Compo.pause(compo, ctx);
                dfr.then(resume, function(error) {
                    compo_errored(compo, error);
                    resume();
                });
            };
            compo_errored = function(compo, error) {
                compo.nodes = mask.parse('.-mask-compo-errored > "~[.]"');
                compo.model = error.message || String(error);
                compo.renderEnd = fn_doNothing;
            };
            !function() {
                compo_meta_prepairAttributeHandler = function(Proto) {
                    if (null == Proto.meta) Proto.meta = {
                        attributes: null,
                        cache: null,
                        mode: null
                    };
                    var attr = Proto.meta.attributes, fn = null;
                    if (attr) {
                        var hash = {};
                        for (var key in attr) _handleProperty_Delegate(Proto, key, attr[key], hash);
                        fn = _handleAll_Delegate(hash);
                    }
                    Proto.meta.handleAttributes = fn;
                };
                compo_meta_executeAttributeHandler = function(compo) {
                    var fn = compo.meta && compo.meta.handleAttributes;
                    return null == fn ? true : fn(compo);
                };
                function _handleAll_Delegate(hash) {
                    return function(compo) {
                        var attr = compo.attr, key, fn, val, error;
                        for (key in hash) {
                            fn = hash[key];
                            val = attr[key];
                            error = fn(compo, val);
                            if (null == error) continue;
                            _errored(compo, error, key, val);
                            return false;
                        }
                        return true;
                    };
                }
                function _handleProperty_Delegate(Proto, metaKey, metaVal, hash) {
                    var optional = 63 === metaKey.charCodeAt(0), attrName = optional ? metaKey.substring(1) : metaKey;
                    var property = attrName.replace(/-(\w)/g, _toCamelCase_Replacer), fn = metaVal;
                    if ("string" === typeof metaVal) fn = _ensureFns[metaVal]; else if (metaVal instanceof RegExp) fn = _ensureFns_Delegate.regexp(metaVal); else if ("function" === typeof metaVal) fn = metaVal; else if (null == metaVal) fn = _ensureFns_Delegate.any();
                    if (null == fn) {
                        log_error("Function expected for the attr. handler", metaKey);
                        return;
                    }
                    Proto[property] = null;
                    Proto = null;
                    hash[attrName] = function(compo, attrVal) {
                        if (null == attrVal) return optional ? null : Error("Expected");
                        var val = fn.call(compo, attrVal, compo);
                        if (val instanceof Error) return val;
                        compo[property] = val;
                        return null;
                    };
                }
                function _toCamelCase_Replacer(full, char_) {
                    return char_.toUpperCase();
                }
                function _errored(compo, error, key, val) {
                    error.message = compo.compoName + " - attribute `" + key + "`: " + error.message;
                    compo_errored(compo, error);
                    log_error(error.message, ". Current: ", val);
                }
                var _ensureFns = {
                    string: function(x) {
                        return "string" === typeof x ? x : Error("String");
                    },
                    number: function(x) {
                        var num = Number(x);
                        return num === num ? num : Error("Number");
                    },
                    "boolean": function(x) {
                        if ("true" === x || "1" === x) return true;
                        if ("false" === x || "0" === x) return false;
                        return Error("Boolean");
                    }
                };
                var _ensureFns_Delegate = {
                    regexp: function(rgx) {
                        return function(x) {
                            return rgx.test(x) ? x : Error("RegExp");
                        };
                    },
                    any: function() {
                        return function(x) {
                            return x;
                        };
                    }
                };
            }();
            function getTemplateProp_(compo) {
                var template = compo.template;
                if (null == template) {
                    template = compo.attr.template;
                    if (null == template) return null;
                    delete compo.attr.template;
                }
                if ("object" === typeof template) return template;
                if (is_String(template)) {
                    if (35 === template.charCodeAt(0) && /^#[\w\d_-]+$/.test(template)) {
                        var node = document.getElementById(template.substring(1));
                        if (null == node) {
                            log_warn("Template not found by id:", template);
                            return null;
                        }
                        template = node.innerHTML;
                    }
                    return mask.parse(template);
                }
                log_warn("Invalid template", typeof template);
                return null;
            }
        }();
        var compo_create, compo_createConstructor;
        !function() {
            compo_create = function(arguments_) {
                var argLength = arguments_.length, Proto = arguments_[argLength - 1], Ctor, key;
                if (argLength > 1) compo_inherit(Proto, _Array_slice.call(arguments_, 0, argLength - 1));
                if (null == Proto) Proto = {};
                var include = _resolve_External("include");
                if (null != include) Proto.__resource = include.url;
                var attr = Proto.attr;
                for (key in Proto.attr) Proto.attr[key] = _mask_ensureTmplFn(Proto.attr[key]);
                var slots = Proto.slots;
                for (key in slots) if ("string" === typeof slots[key]) {
                    if (false === is_Function(Proto[slots[key]])) log_error("Not a Function @Slot.", slots[key]);
                    slots[key] = Proto[slots[key]];
                }
                compo_meta_prepairAttributeHandler(Proto);
                Ctor = Proto.hasOwnProperty("constructor") ? Proto.constructor : function CompoBase() {};
                Ctor = compo_createConstructor(Ctor, Proto);
                for (key in CompoProto) if (null == Proto[key]) Proto[key] = CompoProto[key];
                Ctor.prototype = Proto;
                Proto = null;
                return Ctor;
            };
            compo_createConstructor = function(Ctor, proto) {
                var compos = proto.compos, pipes = proto.pipes, scope = proto.scope, attr = proto.attr;
                if (null == compos && null == pipes && null == attr && null == scope) return Ctor;
                return function CompoBase() {
                    if (null != compos) this.compos = obj_create(this.compos);
                    if (null != pipes) Pipes.addController(this);
                    if (null != attr) this.attr = obj_create(this.attr);
                    if (null != scope) this.scope = obj_create(this.scope);
                    if (null != Ctor) Ctor.call(this);
                };
            };
        }();
        var compo_inherit;
        !function(mask_merge) {
            compo_inherit = function(Proto, Extends) {
                var imax = Extends.length, i = imax, ctors = [], x;
                while (--i > -1) {
                    x = Extends[i];
                    if ("string" === typeof x) x = Mask.getHandler(x);
                    if (null == x) {
                        log_error("Base component not defined", Extends[i]);
                        continue;
                    }
                    if ("function" === typeof x) {
                        ctors.push(x);
                        x = x.prototype;
                    }
                    inherit_(Proto, x, "node");
                }
                i = -1;
                imax = ctors.length;
                if (imax > 0) {
                    if (Proto.hasOwnProperty("constructor")) ctors.unshift(Proto.constructor);
                    Proto.constructor = joinFns_(ctors);
                }
            };
            function inherit_(target, source, name) {
                if (null == target || null == source) return;
                if ("node" === name) {
                    var targetNodes = target.template || target.nodes, sourceNodes = source.template || source.nodes;
                    if (null == targetNodes || null == sourceNodes) target.template = targetNodes || sourceNodes; else target.nodes = mask.merge(sourceNodes, targetNodes, target);
                }
                var mix, type, fnAutoCall, hasFnOverrides = false;
                for (var key in source) {
                    mix = source[key];
                    if (null == mix || "constructor" === key) continue;
                    if ("node" === name && ("template" === key || "nodes" === key)) continue;
                    type = typeof mix;
                    if (null == target[key]) {
                        target[key] = "object" === type ? clone_(mix) : mix;
                        continue;
                    }
                    if ("node" === name) {
                        var isSealed = "renderStart" === key || "renderEnd" === key || "emitIn" === key || "emitOut" === key || "components" === key || "nodes" === key || "template" === key || "find" === key || "closest" === key || "on" === key || "remove" === key || "slotState" === key || "signalState" === key || "append" === key || "appendTo" === key;
                        if (true === isSealed) continue;
                    }
                    if ("pipes" === name) {
                        inherit_(target[key], mix, "pipe");
                        continue;
                    }
                    if ("function" === type) {
                        fnAutoCall = false;
                        if ("slots" === name || "events" === name || "pipe" === name) fnAutoCall = true; else if ("node" === name && ("onRenderStart" === key || "onRenderEnd" === key)) fnAutoCall = true;
                        target[key] = createWrapper_(target[key], mix, fnAutoCall);
                        hasFnOverrides = true;
                        continue;
                    }
                    if ("object" !== type) continue;
                    switch (key) {
                      case "slots":
                      case "pipes":
                      case "events":
                      case "attr":
                        inherit_(target[key], mix, key);
                        continue;
                    }
                    defaults_(target[key], mix);
                }
                if (true === hasFnOverrides) {
                    if (null != target.super) log_error("`super` property is reserved. Dismissed. Current prototype", target);
                    target.super = null;
                }
            }
            /*! Circular references are not handled */
            function clone_(a) {
                if (null == a) return null;
                if ("object" !== typeof a) return a;
                if (is_Array(a)) {
                    var imax = a.length, i = -1, arr = new Array(imax);
                    while (++i < imax) arr[i] = clone_(a[i]);
                    return arr;
                }
                var object = obj_create(a), key, val;
                for (key in object) {
                    val = object[key];
                    if (null == val || "object" !== typeof val) continue;
                    object[key] = clone_(val);
                }
                return object;
            }
            function defaults_(target, source) {
                var targetV, sourceV, key;
                for (var key in source) {
                    targetV = target[key];
                    sourceV = source[key];
                    if (null == targetV) {
                        target[key] = sourceV;
                        continue;
                    }
                    if (is_rawObject(targetV) && is_rawObject(sourceV)) {
                        defaults_(targetV, sourceV);
                        continue;
                    }
                }
            }
            function createWrapper_(selfFn, baseFn, autoCallFunctions) {
                if ("compoInheritanceWrapper" === selfFn.name) {
                    selfFn._fn_chain.push(baseFn);
                    return selfFn;
                }
                var compileFns = true === autoCallFunctions ? compileFns_autocall_ : compileFns_;
                function compoInheritanceWrapper() {
                    var fn = x._fn || (x._fn = compileFns(x._fn_chain));
                    return fn.apply(this, arguments);
                }
                var x = compoInheritanceWrapper;
                x._fn_chain = [ selfFn, baseFn ];
                x._fn = null;
                return x;
            }
            function compileFns_(fns) {
                var i = fns.length, fn = fns[--i];
                while (--i > -1) fn = inheritFn_(fns[i], fn);
                return fn;
            }
            function compileFns_autocall_(fns) {
                var imax = fns.length;
                return function() {
                    var result, fn, x, i = imax;
                    while (--i > -1) {
                        fn = fns[i];
                        if (null == fn) continue;
                        x = fn_apply(fn, this, arguments);
                        if (x !== void 0) result = x;
                    }
                    return result;
                };
            }
            function inheritFn_(selfFn, baseFn) {
                return function() {
                    this.super = baseFn;
                    var x = fn_apply(selfFn, this, arguments);
                    this.super = null;
                    return x;
                };
            }
            function joinFns_(fns) {
                var imax = fns.length;
                return function() {
                    var i = imax;
                    while (--i > -1) fns[i].apply(this, arguments);
                };
            }
        }(mask.merge);
        var dfr_isBusy;
        !function() {
            dfr_isBusy = function(dfr) {
                if (null == dfr || "function" !== typeof dfr.then) return false;
                if (is_Function(dfr.isBusy)) return dfr.isBusy();
                if (is_Function(dfr.state)) return "pending" === dfr.state();
                log_warn("Class or jQuery deferred interface expected");
                return false;
            };
        }();
        var Children_ = {
            select: function(component, compos) {
                for (var name in compos) {
                    var data = compos[name], events = null, selector = null;
                    if (data instanceof Array) {
                        selector = data[0];
                        events = data.splice(1);
                    }
                    if ("string" === typeof data) selector = data;
                    if (null == data || null == selector) {
                        log_error("Unknown component child", name, compos[name]);
                        log_warn("Is this object shared within multiple compo classes? Define it in constructor!");
                        return;
                    }
                    var index = selector.indexOf(":"), engine = selector.substring(0, index);
                    engine = Compo.config.selectors[engine];
                    if (null == engine) component.compos[name] = component.$[0].querySelector(selector); else {
                        selector = selector.substring(++index).trim();
                        component.compos[name] = engine(component, selector);
                    }
                    var element = component.compos[name];
                    if (null != events) {
                        if (null != element.$) element = element.$;
                        Events_.on(component, events, element);
                    }
                }
            }
        };
        var Events_ = {
            on: function(component, events, $element) {
                if (null == $element) $element = component.$;
                var isarray = events instanceof Array, length = isarray ? events.length : 1;
                for (var i = 0, x; isarray ? i < length : i < 1; i++) {
                    x = isarray ? events[i] : events;
                    if (x instanceof Array) {
                        if (null != EventDecorator) x[0] = EventDecorator(x[0]);
                        $element.on.apply($element, x);
                        continue;
                    }
                    for (var key in x) {
                        var fn = "string" === typeof x[key] ? component[x[key]] : x[key], semicolon = key.indexOf(":"), type, selector;
                        if (semicolon !== -1) {
                            type = key.substring(0, semicolon);
                            selector = key.substring(semicolon + 1).trim();
                        } else type = key;
                        if (null != EventDecorator) type = EventDecorator(type);
                        domLib_on($element, type, selector, fn_proxy(fn, component));
                    }
                }
            }
        }, EventDecorator = null;
        var EventDecos = function() {
            var hasTouch = function() {
                if (null == document) return false;
                if ("createTouch" in document) return true;
                try {
                    return !!document.createEvent("TouchEvent").initTouchEvent;
                } catch (error) {
                    return false;
                }
            }();
            return {
                touch: function(type) {
                    if (false === hasTouch) return type;
                    if ("click" === type) return "touchend";
                    if ("mousedown" === type) return "touchstart";
                    if ("mouseup" === type) return "touchend";
                    if ("mousemove" === type) return "touchmove";
                    return type;
                }
            };
        }();
        var Pipes = function() {
            var _collection = {};
            mask.registerAttrHandler("x-pipe-signal", "client", function(node, attrValue, model, cntx, element, controller) {
                var arr = attrValue.split(";"), imax = arr.length, i = -1, x;
                while (++i < imax) {
                    x = arr[i].trim();
                    if ("" === x) continue;
                    var i_colon = x.indexOf(":"), event = x.substring(0, i_colon), handler = x.substring(i_colon + 1).trim(), dot = handler.indexOf("."), pipe, signal;
                    if (dot === -1) {
                        log_error('define pipeName "click: pipeName.pipeSignal"');
                        return;
                    }
                    pipe = handler.substring(0, dot);
                    signal = handler.substring(++dot);
                    var Handler = _handler(pipe, signal);
                    !event && log_error("Signal: event type is not set", attrValue);
                    dom_addEventListener(element, event, Handler);
                }
            });
            function _handler(pipe, signal) {
                return function(event) {
                    new Pipe(pipe).emit(signal, event);
                };
            }
            function pipe_attach(pipeName, controller) {
                if (null == controller.pipes[pipeName]) {
                    log_error("Controller has no pipes to be added to collection", pipeName, controller);
                    return;
                }
                if (null == _collection[pipeName]) _collection[pipeName] = [];
                _collection[pipeName].push(controller);
            }
            function pipe_detach(pipeName, controller) {
                var pipe = _collection[pipeName], i = pipe.length;
                while (--i > -1) if (pipe[i] === controller) pipe.splice(i, 1);
            }
            function controller_remove() {
                var controller = this, pipes = controller.pipes;
                for (var key in pipes) pipe_detach(key, controller);
            }
            function controller_add(controller) {
                var pipes = controller.pipes;
                if (null == pipes) {
                    log_error("Controller has no pipes", controller);
                    return;
                }
                for (var key in pipes) pipe_attach(key, controller);
                Compo.attachDisposer(controller, controller_remove.bind(controller));
            }
            function Pipe(pipeName) {
                if (this instanceof Pipe === false) return new Pipe(pipeName);
                this.pipeName = pipeName;
                return this;
            }
            Pipe.prototype = {
                constructor: Pipe,
                emit: function(signal) {
                    var controllers = _collection[this.pipeName], pipeName = this.pipeName, args;
                    if (null == controllers) {
                        log_warn("Pipe.emit: No signals were bound to:", pipeName);
                        return;
                    }
                    if (2 === arguments.length && is_Array(arguments[1])) args = arguments[1]; else if (arguments.length > 1) args = _Array_slice.call(arguments, 1);
                    var i = controllers.length, controller, slots, slot, called;
                    while (--i !== -1) {
                        controller = controllers[i];
                        slots = controller.pipes[pipeName];
                        if (null == slots) continue;
                        slot = slots[signal];
                        if (is_Function(slot)) {
                            slot.apply(controller, args);
                            called = true;
                        }
                    }
                    if (!called) log_warn("Pipe `%s` has not slots for `%s`", pipeName, signal);
                }
            };
            Pipe.addController = controller_add;
            Pipe.removeController = controller_remove;
            return {
                addController: controller_add,
                removeController: controller_remove,
                pipe: Pipe
            };
        }();
        var Anchor = function() {
            var _cache = {};
            return {
                create: function(compo) {
                    if (null == compo.ID) {
                        log_warn("Component should have an ID");
                        return;
                    }
                    _cache[compo.ID] = compo;
                },
                resolveCompo: function(element) {
                    if (null == element) return null;
                    var findID, currentID, compo;
                    do {
                        currentID = element.getAttribute("x-compo-id");
                        if (currentID) {
                            if (null == findID) findID = currentID;
                            compo = _cache[currentID];
                            if (null != compo) {
                                compo = Compo.find(compo, {
                                    key: "ID",
                                    selector: findID,
                                    nextKey: "components"
                                });
                                if (null != compo) return compo;
                            }
                        }
                        element = element.parentNode;
                    } while (element && 1 === element.nodeType);
                    findID && log_warn("No controller for ID", findID);
                    return null;
                },
                removeCompo: function(compo) {
                    if (null == compo.ID) return;
                    delete _cache[compo.ID];
                },
                getByID: function(id) {
                    return _cache[id];
                }
            };
        }();
        var Compo, CompoProto;
        !function() {
            Compo = function(Proto) {
                if (this instanceof Compo) return void 0;
                return compo_create(arguments);
            };
            obj_extend(Compo, {
                create: function() {
                    return compo_create(arguments);
                },
                createClass: function() {
                    var Ctor = compo_create(arguments), classProto = Ctor.prototype;
                    classProto.Construct = Ctor;
                    return Class(classProto);
                },
                render: function(compo, model, ctx, container) {
                    compo_ensureTemplate(compo);
                    var elements = [];
                    mask.render(null == compo.tagName ? compo.nodes : compo, model, ctx, container, compo, elements);
                    compo.$ = domLib(elements);
                    if (null != compo.events) Events_.on(compo, compo.events);
                    if (null != compo.compos) Children_.select(compo, compo.compos);
                    return compo;
                },
                initialize: function(compo, model, ctx, container, parent) {
                    var compoName;
                    if (null == container) if (ctx && null != ctx.nodeType) {
                        container = ctx;
                        ctx = null;
                    } else if (model && null != model.nodeType) {
                        container = model;
                        model = null;
                    }
                    if ("string" === typeof compo) {
                        compoName = compo;
                        compo = mask.getHandler(compoName);
                        if (!compo) log_error("Compo not found:", compo);
                    }
                    var node = {
                        controller: compo,
                        type: Dom.COMPONENT,
                        tagName: compoName
                    };
                    if (null == parent && null != container) parent = Anchor.resolveCompo(container);
                    if (null == parent) parent = new Dom.Component();
                    var dom = mask.render(node, model, ctx, null, parent), instance = parent.components[parent.components.length - 1];
                    if (null != container) {
                        container.appendChild(dom);
                        Compo.signal.emitIn(instance, "domInsert");
                    }
                    return instance;
                },
                find: function(compo, selector) {
                    return find_findSingle(compo, selector_parse(selector, Dom.CONTROLLER, "down"));
                },
                closest: function(compo, selector) {
                    return find_findSingle(compo, selector_parse(selector, Dom.CONTROLLER, "up"));
                },
                dispose: compo_dispose,
                ensureTemplate: compo_ensureTemplate,
                attachDisposer: compo_attachDisposer,
                config: {
                    selectors: {
                        $: function(compo, selector) {
                            var r = domLib_find(compo.$, selector);
                            if (0 === r.length) log_warn("<compo-selector> - element not found -", selector, compo);
                            return r;
                        },
                        compo: function(compo, selector) {
                            var r = Compo.find(compo, selector);
                            if (null == r) log_warn("<compo-selector> - component not found -", selector, compo);
                            return r;
                        }
                    },
                    setDOMLibrary: function(lib) {
                        if (domLib === lib) return;
                        domLib = lib;
                        domLib_initialize();
                    },
                    getDOMLibrary: function() {
                        return domLib;
                    },
                    eventDecorator: function(mix) {
                        if ("function" === typeof mix) {
                            EventDecorator = mix;
                            return;
                        }
                        if ("string" === typeof mix) {
                            EventDecorator = EventDecos[mix];
                            return;
                        }
                        if ("boolean" === typeof mix && false === mix) {
                            EventDecorator = null;
                            return;
                        }
                    }
                },
                pipe: Pipes.pipe,
                resource: function(compo) {
                    var owner = compo;
                    while (null != owner) {
                        if (owner.resource) return owner.resource;
                        owner = owner.parent;
                    }
                    return include.instance();
                },
                plugin: function(source) {
                    eval(source);
                },
                Dom: {
                    addEventListener: dom_addEventListener
                }
            });
            !function() {
                function _on(ctx, type, callback) {
                    if (null == ctx[type]) ctx[type] = [];
                    ctx[type].push(callback);
                    return ctx;
                }
                function _call(ctx, type, _arguments) {
                    var cbs = ctx[type];
                    if (null == cbs) return;
                    for (var i = 0, x, imax = cbs.length; i < imax; i++) {
                        x = cbs[i];
                        if (null == x) continue;
                        cbs[i] = null;
                        if (null == _arguments) {
                            x();
                            continue;
                        }
                        x.apply(this, _arguments);
                    }
                }
                var DeferProto = {
                    done: function(callback) {
                        return _on(this, "_cbs_done", callback);
                    },
                    fail: function(callback) {
                        return _on(this, "_cbs_fail", callback);
                    },
                    always: function(callback) {
                        return _on(this, "_cbs_always", callback);
                    },
                    resolve: function() {
                        this.async = false;
                        _call(this, "_cbs_done", arguments);
                        _call(this, "_cbs_always", arguments);
                    },
                    reject: function() {
                        this.async = false;
                        _call(this, "_cbs_fail", arguments);
                        _call(this, "_cbs_always");
                    },
                    _cbs_done: null,
                    _cbs_fail: null,
                    _cbs_always: null
                };
                var CompoProto = {
                    async: true,
                    await: function(resume) {
                        this.resume = resume;
                    }
                };
                Compo.pause = function(compo, ctx) {
                    if (null == ctx.async) {
                        ctx.defers = [];
                        obj_extend(ctx, DeferProto);
                    }
                    ctx.async = true;
                    ctx.defers.push(compo);
                    obj_extend(compo, CompoProto);
                    return function() {
                        Compo.resume(compo, ctx);
                    };
                };
                Compo.resume = function(compo, ctx) {
                    if (compo.resume) compo.resume();
                    compo.async = false;
                    var busy = false, dfrs = ctx.defers, imax = dfrs.length, i = -1, x;
                    while (++i < imax) {
                        x = dfrs[i];
                        if (x === compo) {
                            dfrs[i] = null;
                            continue;
                        }
                        busy = busy || null != x;
                    }
                    if (false === busy) ctx.resolve();
                };
            }();
            CompoProto = {
                type: Dom.CONTROLLER,
                __resource: null,
                tagName: null,
                compoName: null,
                nodes: null,
                components: null,
                expression: null,
                attr: null,
                model: null,
                slots: null,
                pipes: null,
                compos: null,
                events: null,
                async: false,
                await: null,
                meta: {
                    mode: null,
                    modelMode: null,
                    attributes: null,
                    serializeNodes: null
                },
                onRenderStart: null,
                onRenderEnd: null,
                render: null,
                renderStart: function(model, ctx, container) {
                    if (1 === arguments.length && null != model && model instanceof Array === false && null != model[0]) {
                        var args = arguments[0];
                        model = args[0];
                        ctx = args[1];
                        container = args[2];
                    }
                    if (false === compo_meta_executeAttributeHandler(this)) return;
                    compo_ensureTemplate(this);
                    if (is_Function(this.onRenderStart)) {
                        var x = this.onRenderStart(model, ctx, container);
                        if (x !== void 0 && dfr_isBusy(x)) compo_prepairAsync(x, this, ctx);
                    }
                },
                renderEnd: function(elements, model, ctx, container) {
                    if (1 === arguments.length && elements instanceof Array === false) {
                        var args = arguments[0];
                        elements = args[0];
                        model = args[1];
                        ctx = args[2];
                        container = args[3];
                    }
                    Anchor.create(this, elements);
                    this.$ = domLib(elements);
                    if (null != this.events) Events_.on(this, this.events);
                    if (null != this.compos) Children_.select(this, this.compos);
                    if (is_Function(this.onRenderEnd)) this.onRenderEnd(elements, model, ctx, container);
                },
                appendTo: function(mix) {
                    var element = "string" === typeof mix ? document.querySelector(mix) : mix;
                    if (null == element) {
                        log_warn("Compo.appendTo: parent is undefined. Args:", arguments);
                        return this;
                    }
                    var els = this.$, i = 0, imax = els.length;
                    for (;i < imax; i++) element.appendChild(els[i]);
                    this.emitIn("domInsert");
                    return this;
                },
                append: function(template, model, selector) {
                    var parent;
                    if (null == this.$) {
                        var dom = "string" === typeof template ? mask.compile(template) : template;
                        parent = selector ? find_findSingle(this, selector_parse(selector, Dom.CONTROLLER, "down")) : this;
                        if (null == parent.nodes) {
                            this.nodes = dom;
                            return this;
                        }
                        parent.nodes = [ this.nodes, dom ];
                        return this;
                    }
                    var fragment = mask.render(template, model, null, null, this);
                    parent = selector ? this.$.find(selector) : this.$;
                    parent.append(fragment);
                    this.emitIn("domInsert");
                    return this;
                },
                find: function(selector) {
                    return find_findSingle(this, selector_parse(selector, Dom.CONTROLLER, "down"));
                },
                closest: function(selector) {
                    return find_findSingle(this, selector_parse(selector, Dom.CONTROLLER, "up"));
                },
                on: function() {
                    var x = _Array_slice.call(arguments);
                    if (arguments.length < 3) {
                        log_error("Invalid Arguments Exception @use .on(type,selector,fn)");
                        return this;
                    }
                    if (null != this.$) Events_.on(this, [ x ]);
                    if (null == this.events) this.events = [ x ]; else if (is_Array(this.events)) this.events.push(x); else this.events = [ x, this.events ];
                    return this;
                },
                remove: function() {
                    compo_removeElements(this);
                    compo_detachChild(this);
                    compo_dispose(this);
                    this.$ = null;
                    return this;
                },
                slotState: function(slotName, isActive) {
                    Compo.slot.toggle(this, slotName, isActive);
                    return this;
                },
                signalState: function(signalName, isActive) {
                    Compo.signal.toggle(this, signalName, isActive);
                    return this;
                },
                emitOut: function(signalName) {
                    Compo.signal.emitOut(this, signalName, this, arguments.length > 1 ? _Array_slice.call(arguments, 1) : null);
                    return this;
                },
                emitIn: function(signalName) {
                    Compo.signal.emitIn(this, signalName, this, arguments.length > 1 ? _Array_slice.call(arguments, 1) : null);
                    return this;
                }
            };
            Compo.prototype = CompoProto;
        }();
        !function() {
            mask.registerAttrHandler("x-signal", "client", function(node, attrValue, model, ctx, element, controller) {
                var arr = attrValue.split(";"), signals = "", imax = arr.length, i = -1, x;
                while (++i < imax) {
                    x = arr[i].trim();
                    if ("" === x) continue;
                    var i_colon = x.indexOf(":"), event = x.substring(0, i_colon), handler = x.substring(i_colon + 1).trim(), Handler = _createListener(controller, handler);
                    !event && log_error("Signal: event type is not set", attrValue);
                    if (Handler) {
                        signals += "," + handler + ",";
                        dom_addEventListener(element, event, Handler);
                    }
                    !Handler && log_warn("No slot found for signal", handler, controller);
                }
                if ("" !== signals) element.setAttribute("data-signals", signals);
            });
            function _fire(controller, slot, sender, args, direction) {
                if (null == controller) return false;
                var found = false, fn = null != controller.slots && controller.slots[slot];
                if ("string" === typeof fn) fn = controller[fn];
                if ("function" === typeof fn) {
                    found = true;
                    var isDisabled = null != controller.slots.__disabled && controller.slots.__disabled[slot];
                    if (true !== isDisabled) {
                        var result = null == args ? fn.call(controller, sender) : fn.apply(controller, [ sender ].concat(args));
                        if (false === result) return true;
                        if (null != result && "object" === typeof result && null != result.length) args = result;
                    }
                }
                if (direction === -1 && null != controller.parent) return _fire(controller.parent, slot, sender, args, direction) || found;
                if (1 === direction && null != controller.components) {
                    var compos = controller.components, imax = compos.length, i = 0, r;
                    for (;i < imax; i++) {
                        r = _fire(compos[i], slot, sender, args, direction);
                        !found && (found = r);
                    }
                }
                return found;
            }
            function _hasSlot(controller, slot, direction, isActive) {
                if (null == controller) return false;
                var slots = controller.slots;
                if (null != slots && null != slots[slot]) {
                    if ("string" === typeof slots[slot]) slots[slot] = controller[slots[slot]];
                    if ("function" === typeof slots[slot]) if (true === isActive) {
                        if (null == slots.__disabled || true !== slots.__disabled[slot]) return true;
                    } else return true;
                }
                if (direction === -1 && null != controller.parent) return _hasSlot(controller.parent, slot, direction);
                if (1 === direction && null != controller.components) for (var i = 0, length = controller.components.length; i < length; i++) if (_hasSlot(controller.components[i], slot, direction)) return true;
                return false;
            }
            function _createListener(controller, slot) {
                if (false === _hasSlot(controller, slot, -1)) return null;
                return function(event) {
                    var args = arguments.length > 1 ? _Array_slice.call(arguments, 1) : null;
                    _fire(controller, slot, event, args, -1);
                };
            }
            function __toggle_slotState(controller, slot, isActive) {
                var slots = controller.slots;
                if (null == slots || false === slots.hasOwnProperty(slot)) return;
                if (null == slots.__disabled) slots.__disabled = {};
                slots.__disabled[slot] = false === isActive;
            }
            function __toggle_slotStateWithChilds(controller, slot, isActive) {
                __toggle_slotState(controller, slot, isActive);
                if (null != controller.components) for (var i = 0, length = controller.components.length; i < length; i++) __toggle_slotStateWithChilds(controller.components[i], slot, isActive);
            }
            function __toggle_elementsState(controller, slot, isActive) {
                if (null == controller.$) {
                    log_warn("Controller has no elements to toggle state");
                    return;
                }
                domLib().add(controller.$.filter("[data-signals]")).add(controller.$.find("[data-signals]")).each(function(index, node) {
                    var signals = node.getAttribute("data-signals");
                    if (null != signals && signals.indexOf(slot) !== -1) node[true === isActive ? "removeAttribute" : "setAttribute"]("disabled", "disabled");
                });
            }
            function _toggle_all(controller, slot, isActive) {
                var parent = controller, previous = controller;
                while (null != (parent = parent.parent)) {
                    __toggle_slotState(parent, slot, isActive);
                    if (null == parent.$ || 0 === parent.$.length) continue;
                    previous = parent;
                }
                __toggle_slotStateWithChilds(controller, slot, isActive);
                __toggle_elementsState(previous, slot, isActive);
            }
            function _toggle_single(controller, slot, isActive) {
                __toggle_slotState(controller, slot, isActive);
                if (!isActive && (_hasSlot(controller, slot, -1, true) || _hasSlot(controller, slot, 1, true))) return;
                __toggle_elementsState(controller, slot, isActive);
            }
            obj_extend(Compo, {
                signal: {
                    toggle: _toggle_all,
                    emitOut: function(controller, slot, sender, args) {
                        var captured = _fire(controller, slot, sender, args, -1);
                        !captured && log_warn("Signal %c%s", "font-weight:bold;", slot, "was not captured");
                    },
                    emitIn: function(controller, slot, sender, args) {
                        _fire(controller, slot, sender, args, 1);
                    },
                    enable: function(controller, slot) {
                        _toggle_all(controller, slot, true);
                    },
                    disable: function(controller, slot) {
                        _toggle_all(controller, slot, false);
                    }
                },
                slot: {
                    toggle: _toggle_single,
                    enable: function(controller, slot) {
                        _toggle_single(controller, slot, true);
                    },
                    disable: function(controller, slot) {
                        _toggle_single(controller, slot, false);
                    },
                    invoke: function(controller, slot, event, args) {
                        var slots = controller.slots;
                        if (null == slots || "function" !== typeof slots[slot]) {
                            log_error("Slot not found", slot, controller);
                            return null;
                        }
                        if (null == args) return slots[slot].call(controller, event);
                        return slots[slot].apply(controller, [ event ].concat(args));
                    }
                }
            });
        }();
        var DomLite;
        !function(document) {
            if (null == document) return;
            Compo.DomLite = DomLite = function(els) {
                if (this instanceof DomLite === false) return new DomLite(els);
                return this.add(els);
            };
            if (null == domLib) domLib = DomLite;
            var Proto = DomLite.fn = {
                constructor: DomLite,
                length: 0,
                add: function(mix) {
                    if (null == mix) return this;
                    if (true === is_Array(mix)) return each(mix, this.add, this);
                    var type = mix.nodeType;
                    if (11 === type) return each(mix.childNodes, this.add, this);
                    if (null == type) {
                        if ("number" === typeof mix.length) return each(mix, this.add, this);
                        log_warn("Uknown domlite object");
                        return this;
                    }
                    this[this.length++] = mix;
                    return this;
                },
                on: function() {
                    return binder.call(this, on, delegate, arguments);
                },
                off: function() {
                    return binder.call(this, off, undelegate, arguments);
                },
                find: function(sel) {
                    return each(this, function(node) {
                        this.add(_$$.call(node, sel));
                    }, new DomLite());
                },
                filter: function(sel) {
                    return each(this, function(node, index) {
                        true === _is(node, sel) && this.add(node);
                    }, new DomLite());
                },
                parent: function() {
                    var x = this[0];
                    return new DomLite(x && x.parentNode);
                },
                children: function(sel) {
                    var set = each(this, function(node) {
                        this.add(node.childNodes);
                    }, new DomLite());
                    return null == sel ? set : set.filter(sel);
                },
                closest: function(selector) {
                    var x = this[0], dom = new DomLite();
                    while (null != x && null != x.parentNode) {
                        x = x.parentNode;
                        if (_is(x, selector)) return dom.add(x);
                    }
                    return dom;
                },
                remove: function() {
                    return each(this, function(x) {
                        x.parentNode.removeChild(x);
                    });
                }
            };
            !function() {
                var Manip = {
                    append: function(node, el) {
                        after_(node, node.lastChild, el);
                    },
                    prepend: function(node, el) {
                        before_(node, node.firstChild, el);
                    },
                    after: function(node, el) {
                        after_(node.parentNode, node, el);
                    },
                    before: function(node, el) {
                        before_(node.parentNode, node, el);
                    }
                };
                each([ "append", "prepend", "before", "after" ], function(method) {
                    var fn = Manip[method];
                    Proto[method] = function(mix) {
                        var isArray = is_Array(mix);
                        return each(this, function(node) {
                            if (isArray) {
                                each(mix, function(el) {
                                    fn(node, el);
                                });
                                return;
                            }
                            fn(node, mix);
                        });
                    };
                });
                function before_(parent, anchor, el) {
                    if (null == parent || null == el) return;
                    parent.insertBefore(el, anchor);
                }
                function after_(parent, anchor, el) {
                    var next = null != anchor ? anchor.nextSibling : null;
                    before_(parent, next, el);
                }
            }();
            function each(arr, fn, ctx) {
                if (null == arr) return ctx || arr;
                var imax = arr.length, i = -1;
                while (++i < imax) fn.call(ctx || arr, arr[i], i);
                return ctx || arr;
            }
            function indexOf(arr, fn, ctx) {
                if (null == arr) return -1;
                var imax = arr.length, i = -1;
                while (++i < imax) if (true === fn.call(ctx || arr, arr[i], i)) return i;
                return -1;
            }
            var docEl = document.documentElement;
            var _$$ = docEl.querySelectorAll;
            var _is = function() {
                var matchesSelector = docEl.webkitMatchesSelector || docEl.mozMatchesSelector || docEl.msMatchesSelector || docEl.oMatchesSelector || docEl.matchesSelector;
                return function(el, selector) {
                    return null == el || 1 !== el.nodeType ? false : matchesSelector.call(el, selector);
                };
            }();
            var binder, on, off, delegate, undelegate;
            !function() {
                binder = function(bind, bindSelector, args) {
                    var length = args.length, fn;
                    if (2 === length) fn = bind;
                    if (3 === length) fn = bindSelector;
                    if (null != fn) return each(this, function(node) {
                        fn.apply(DomLite(node), args);
                    });
                    log_error("`DomLite.on|off` - invalid arguments count");
                    return this;
                };
                on = function(type, fn) {
                    return run(this, _addEvent, type, fn);
                };
                off = function(type, fn) {
                    return run(this, _remEvent, type, fn);
                };
                delegate = function(type, selector, fn) {
                    function guard(event) {
                        var el = event.target, current = event.currentTarget;
                        if (current === el) return;
                        while (null != el && el !== current) {
                            if (_is(el, selector)) {
                                fn(event);
                                return;
                            }
                            el = el.parentNode;
                        }
                    }
                    (fn._guards || (fn._guards = [])).push(guard);
                    return on.call(this, type, guard);
                };
                undelegate = function(type, selector, fn) {
                    return each(fn._quards, function(guard) {
                        off.call(this, type, guard);
                    }, this);
                };
                function run(set, handler, type, fn) {
                    return each(set, function(node) {
                        handler.call(node, type, fn, false);
                    });
                }
                var _addEvent = docEl.addEventListener, _remEvent = docEl.removeEventListener;
            }();
            !function() {
                var isClassListSupported = null != docEl.classList;
                var hasClass = true === isClassListSupported ? function(node, klass) {
                    return node.classList.contains(klass);
                } : function(node, klass) {
                    return -1 !== (" " + node.className + " ").indexOf(" " + klass + " ");
                };
                Proto.hasClass = function(klass) {
                    return -1 !== indexOf(this, function(node) {
                        return hasClass(node, klass);
                    });
                };
                var Shim;
                !function() {
                    Shim = {
                        add: function(node, klass) {
                            if (false === hasClass(node, klass)) add(node, klass);
                        },
                        remove: function(node, klass) {
                            if (true === hasClass(node, klass)) remove(node, klass);
                        },
                        toggle: function(node, klass) {
                            var fn = true === hasClass(node, klass) ? remove : add;
                            fn(node, klass);
                        }
                    };
                    function add(node, klass) {
                        node.className += " " + klass;
                    }
                    function remove(node, klass) {
                        node.className = (" " + node.className + " ").replace(" " + klass + " ", " ");
                    }
                }();
                each([ "add", "remove", "toggle" ], function(method) {
                    var mutatorFn = false === isClassListSupported ? Shim[method] : function(node, klass) {
                        var classList = node.classList;
                        classList[method].call(classList, klass);
                    };
                    Proto[method + "Class"] = function(klass) {
                        return each(this, function(node) {
                            mutatorFn(node, klass);
                        });
                    };
                });
            }();
            !function() {
                var createEvent = function(type) {
                    var event = document.createEvent("Event");
                    event.initEvent(type, true, true);
                    return event;
                };
                var create = function(type, data) {
                    if (null == data) return createEvent(type);
                    var event = document.createEvent("CustomEvent");
                    event.initCustomEvent(type, true, true, data);
                    return event;
                };
                var dispatch = function(node, event) {
                    node.dispatchEvent(event);
                };
                Proto["trigger"] = function(type, data) {
                    var event = create(type, data);
                    return each(this, function(node) {
                        dispatch(node, event);
                    });
                };
            }();
            !function() {
                Proto["attr"] = function(name, val) {
                    if (val === void 0) return this[0] && this[0].getAttribute(name);
                    return each(this, function(node) {
                        node.setAttribute(name, val);
                    });
                };
                Proto["removeAttr"] = function(name) {
                    return each(this, function(node) {
                        node.removeAttribute(name);
                    });
                };
            }();
            if (Object.setPrototypeOf) Object.setPrototypeOf(Proto, Array.prototype); else if (Proto.__proto__) Proto.__proto__ = Array.prototype;
            DomLite.prototype = Proto;
            domLib_initialize();
        }(global.document);
        domLib_initialize();
        function domLib_initialize() {
            if (null == domLib || null == domLib.fn) return;
            domLib.fn.compo = function(selector) {
                if (0 === this.length) return null;
                var compo = Anchor.resolveCompo(this[0]);
                return null == selector ? compo : find_findSingle(compo, selector_parse(selector, Dom.CONTROLLER, "up"));
            };
            domLib.fn.model = function(selector) {
                var compo = this.compo(selector);
                if (null == compo) return null;
                var model = compo.model;
                while (null == model && compo.parent) {
                    compo = compo.parent;
                    model = compo.model;
                }
                return model;
            };
            !function() {
                var jQ_Methods = [ "append", "prepend", "before", "after" ];
                [ "appendMask", "prependMask", "beforeMask", "afterMask" ].forEach(function(method, index) {
                    domLib.fn[method] = function(template, model, controller, ctx) {
                        if (0 === this.length) {
                            log_warn("<jcompo> $.", method, "- no element was selected(found)");
                            return this;
                        }
                        if (this.length > 1) log_warn("<jcompo> $.", method, " can insert only to one element. Fix is comming ...");
                        if (null == controller) controller = index < 2 ? this.compo() : this.parent().compo();
                        var isUnsafe = false;
                        if (null == controller) {
                            controller = {};
                            isUnsafe = true;
                        }
                        if (null == controller.components) controller.components = [];
                        var compos = controller.components, i = compos.length, fragment = mask.render(template, model, ctx, null, controller);
                        var self = this[jQ_Methods[index]](fragment), imax = compos.length;
                        for (;i < imax; i++) Compo.signal.emitIn(compos[i], "domInsert");
                        if (isUnsafe && 0 !== imax) {
                            log_warn("$.", method, "- parent controller was not found in Elements DOM.", "This can lead to memory leaks.");
                            log_warn("Specify the controller directly, via $.", method, "(template[, model, controller, ctx])");
                        }
                        return self;
                    };
                });
            }();
            !function() {
                var jq_remove = domLib.fn.remove, jq_empty = domLib.fn.empty;
                domLib.fn.removeAndDispose = function() {
                    this.each(each_tryDispose);
                    return jq_remove.call(this);
                };
                domLib.fn.emptyAndDispose = function() {
                    this.each(each_tryDisposeChildren);
                    return jq_empty.call(this);
                };
                function each_tryDispose(index, node) {
                    node_tryDispose(node);
                }
                function each_tryDisposeChildren(index, node) {
                    node_tryDisposeChildren(node);
                }
            }();
        }
        function SlotHandler() {}
        mask.registerHandler(":slot", SlotHandler);
        SlotHandler.prototype = {
            constructor: SlotHandler,
            renderEnd: function(element, model, cntx, container) {
                this.slots = {};
                this.expression = this.attr.on;
                this.slots[this.attr.signal] = this.handle;
            },
            handle: function() {
                var expr = this.expression;
                mask.Utils.Expression.eval(expr, this.model, global, this);
            }
        };
        return Compo;
    }(Mask);
    var jmask = exports.jmask = Mask.jmask = function(mask) {
        var Dom = mask.Dom, _mask_render = mask.render, _mask_parse = mask.parse, _mask_ensureTmplFnOrig = mask.Utils.ensureTmplFn, _signal_emitIn = (mask.Compo || Compo).signal.emitIn;
        function _mask_ensureTmplFn(value) {
            if ("string" !== typeof value) return value;
            return _mask_ensureTmplFnOrig(value);
        }
        var arr_eachAny, arr_unique;
        !function() {
            arr_eachAny = function(mix, fn) {
                if (false === is_ArrayLike(mix)) {
                    fn(mix);
                    return;
                }
                var imax = mix.length, i = -1;
                while (++i < imax) fn(mix[i], i);
            };
            !function() {
                arr_unique = function(array) {
                    hasDuplicate_ = false;
                    array.sort(sort);
                    if (false === hasDuplicate_) return array;
                    var duplicates = [], i = 0, j = 0, imax = array.length - 1;
                    while (i < imax) if (array[i++] === array[i]) duplicates[j++] = i;
                    while (j--) array.splice(duplicates[j], 1);
                    return array;
                };
                var hasDuplicate_ = false;
                function sort(a, b) {
                    if (a === b) {
                        hasDuplicate_ = true;
                        return 0;
                    }
                    return 1;
                }
            }();
        }();
        var selector_parse, selector_match;
        !function() {
            selector_parse = function(selector, type, direction) {
                if (null == selector) log_error("selector is null for the type", type);
                if ("object" === typeof selector) return selector;
                var key, prop, nextKey, filters, _key, _prop, _selector;
                var index = 0, length = selector.length, c, end, matcher, root, current, eq, slicer;
                if ("up" === direction) nextKey = sel_key_UP; else nextKey = type === Dom.SET ? sel_key_MASK : sel_key_COMPOS;
                while (index < length) {
                    c = selector.charCodeAt(index);
                    if (c < 33) {
                        index++;
                        continue;
                    }
                    if (62 === c) {
                        if (null == matcher) root = matcher = {
                            selector: "__scope__",
                            nextKey: nextKey,
                            filters: null,
                            next: {
                                type: "children",
                                matcher: null
                            }
                        }; else matcher.next = {
                            type: "children",
                            matcher: null
                        };
                        current = matcher;
                        matcher = null;
                        index++;
                        continue;
                    }
                    end = selector_moveToBreak(selector, index + 1, length);
                    if (46 === c) {
                        _key = "class";
                        _prop = sel_key_ATTR;
                        _selector = sel_hasClassDelegate(selector.substring(index + 1, end));
                    } else if (35 === c) {
                        _key = "id";
                        _prop = sel_key_ATTR;
                        _selector = selector.substring(index + 1, end);
                    } else if (91 === c) {
                        eq = selector.indexOf("=", index);
                        eq === -1 && console.error('Attribute Selector: should contain "="');
                        _prop = sel_key_ATTR;
                        _key = selector.substring(index + 1, eq);
                        c = selector.charCodeAt(eq + 1);
                        slicer = 34 === c || 39 === c ? 2 : 1;
                        _selector = selector.substring(eq + slicer, end - slicer + 1);
                        end++;
                    } else {
                        if (null != matcher) {
                            matcher.next = {
                                type: "any",
                                matcher: null
                            };
                            current = matcher;
                            matcher = null;
                        }
                        _prop = null;
                        _key = type === Dom.SET ? "tagName" : "compoName";
                        _selector = selector.substring(index, end);
                    }
                    index = end;
                    if (null == matcher) {
                        matcher = {
                            key: _key,
                            prop: _prop,
                            selector: _selector,
                            nextKey: nextKey,
                            filters: null
                        };
                        if (null == root) root = matcher;
                        if (null != current) current.next.matcher = matcher;
                        continue;
                    }
                    if (null == matcher.filters) matcher.filters = [];
                    matcher.filters.push({
                        key: _key,
                        selector: _selector,
                        prop: _prop
                    });
                }
                if (current && current.next) current.next.matcher = matcher;
                return root;
            };
            selector_match = function(node, selector, type) {
                if ("string" === typeof selector) {
                    if (null == type) type = Dom[node.compoName ? "CONTROLLER" : "SET"];
                    selector = selector_parse(selector, type);
                }
                if ("*" === selector.selector) return true;
                var obj = selector.prop ? node[selector.prop] : node, matched = false;
                if (null == obj) return false;
                if ("function" === typeof selector.selector) matched = selector.selector(obj[selector.key]); else if (null != selector.selector.test) {
                    if (selector.selector.test(obj[selector.key])) matched = true;
                } else if (obj[selector.key] === selector.selector) matched = true;
                if (true === matched && null != selector.filters) for (var i = 0, x, imax = selector.filters.length; i < imax; i++) {
                    x = selector.filters[i];
                    if (false === selector_match(node, x, type)) return false;
                }
                return matched;
            };
            var sel_key_UP = "parent", sel_key_MASK = "nodes", sel_key_COMPOS = "components", sel_key_ATTR = "attr";
            function sel_hasClassDelegate(matchClass) {
                return function(className) {
                    return sel_hasClass(className, matchClass);
                };
            }
            function sel_hasClass(className, matchClass, index) {
                if ("string" !== typeof className) return false;
                if (null == index) index = 0;
                index = className.indexOf(matchClass, index);
                if (index === -1) return false;
                if (index > 0 && className.charCodeAt(index - 1) > 32) return sel_hasClass(className, matchClass, index + 1);
                var class_Length = className.length, match_Length = matchClass.length;
                if (index < class_Length - match_Length && className.charCodeAt(index + match_Length) > 32) return sel_hasClass(className, matchClass, index + 1);
                return true;
            }
            function selector_moveToBreak(selector, index, length) {
                var c, isInQuote = false, isEscaped = false;
                while (index < length) {
                    c = selector.charCodeAt(index);
                    if (34 === c || 39 === c) isInQuote = !isInQuote;
                    if (92 === c) isEscaped = !isEscaped;
                    if (46 === c || 35 === c || 91 === c || 93 === c || 62 === c || c < 33) if (true !== isInQuote && true !== isEscaped) break;
                    index++;
                }
                return index;
            }
        }();
        var jmask_filter, jmask_find, jmask_clone, jmask_deepest, jmask_getText;
        !function() {
            jmask_filter = function(mix, matcher) {
                if (null == matcher) return mix;
                var result = [];
                arr_eachAny(mix, function(node, i) {
                    if (selector_match(node, matcher)) result.push(node);
                });
                return result;
            };
            jmask_find = function(mix, matcher, output, deep) {
                if (null == mix) return output;
                if (null == output) output = [];
                if (null == deep) if ("__scope__" === matcher.selector) {
                    deep = false;
                    matcher = matcher.next.matcher;
                } else deep = true;
                arr_eachAny(mix, function(node) {
                    if (false === selector_match(node, matcher)) {
                        if (null == matcher.next && false !== deep) jmask_find(node[matcher.nextKey], matcher, output, deep);
                        return;
                    }
                    if (null == matcher.next) {
                        output.push(node);
                        if (true === deep) jmask_find(node[matcher.nextKey], matcher, output, deep);
                        return;
                    }
                    var next = matcher.next;
                    deep = "children" !== next.type;
                    jmask_find(node[matcher.nextKey], next.matcher, output, deep);
                });
                return output;
            };
            jmask_clone = function(node, parent) {
                var copy = {
                    type: 1,
                    tagName: 1,
                    compoName: 1,
                    controller: 1
                };
                var clone = {
                    parent: parent
                };
                for (var key in node) if (1 === copy[key]) clone[key] = node[key];
                if (null != node.attr) clone.attr = obj_create(node.attr);
                var nodes = node.nodes;
                if (null != nodes && nodes.length > 0) if (false === is_ArrayLike(nodes)) clone.nodes = [ jmask_clone(nodes, clone) ]; else {
                    clone.nodes = [];
                    var imax = nodes.length, i = 0;
                    for (;i < imax; i++) clone.nodes[i] = jmask_clone(nodes[i], clone);
                }
                return clone;
            };
            jmask_deepest = function(node) {
                var current = node, prev;
                while (null != current) {
                    prev = current;
                    current = current.nodes && current.nodes[0];
                }
                return prev;
            };
            jmask_getText = function(node, model, ctx, controller) {
                if (Dom.TEXTNODE === node.type) {
                    if (is_Function(node.content)) return node.content("node", model, ctx, null, controller);
                    return node.content;
                }
                var output = "";
                if (null != node.nodes) for (var i = 0, x, imax = node.nodes.length; i < imax; i++) {
                    x = node.nodes[i];
                    output += jmask_getText(x, model, ctx, controller);
                }
                return output;
            };
        }();
        function jMask(mix) {
            if (this instanceof jMask === false) return new jMask(mix);
            if (null == mix) return this;
            if (mix.type === Dom.SET) return mix;
            return this.add(mix);
        }
        var Proto = jMask.prototype = {
            constructor: jMask,
            type: Dom.SET,
            length: 0,
            components: null,
            add: function(mix) {
                var i, length;
                if ("string" === typeof mix) mix = _mask_parse(mix);
                if (is_ArrayLike(mix)) {
                    for (i = 0, length = mix.length; i < length; i++) this.add(mix[i]);
                    return this;
                }
                if ("function" === typeof mix && null != mix.prototype.type) mix = {
                    controller: mix,
                    type: Dom.COMPONENT
                };
                var type = mix.type;
                if (!type) {
                    console.error("Only Mask Node/Component/NodeText/Fragment can be added to jmask set", mix);
                    return this;
                }
                if (type === Dom.FRAGMENT) {
                    var nodes = mix.nodes;
                    for (i = 0, length = nodes.length; i < length; ) this[this.length++] = nodes[i++];
                    return this;
                }
                if (type === Dom.CONTROLLER) {
                    if (null != mix.nodes && mix.nodes.length) for (i = mix.nodes.length; 0 !== i; ) mix.nodes[--i].parent = mix;
                    if (null != mix.$) this.type = Dom.CONTROLLER;
                }
                this[this.length++] = mix;
                return this;
            },
            toArray: function() {
                return Array.prototype.slice.call(this);
            },
            render: function(model, cntx, container, controller) {
                this.components = [];
                if (1 === this.length) return _mask_render(this[0], model, cntx, container, controller || this);
                if (null == container) container = document.createDocumentFragment();
                for (var i = 0, length = this.length; i < length; i++) _mask_render(this[i], model, cntx, container, controller || this);
                return container;
            },
            prevObject: null,
            end: function() {
                return this.prevObject || this;
            },
            pushStack: function(nodes) {
                var next;
                next = jMask(nodes);
                next.prevObject = this;
                return next;
            },
            controllers: function() {
                if (null == this.components) console.warn("Set was not rendered");
                return this.pushStack(this.components || []);
            },
            mask: function(template) {
                var node;
                if (null != template) return this.empty().append(template);
                if (arguments.length) return this;
                if (0 === this.length) node = new Dom.Node(); else if (1 === this.length) node = this[0]; else {
                    node = new Dom.Fragment();
                    node.nodes = [];
                    var i = -1;
                    while (++i < this.length) node.nodes[i] = this[i];
                }
                return mask.stringify(node);
            },
            text: function(mix, cntx, controller) {
                if ("string" === typeof mix && 1 === arguments.length) {
                    var node = [ new Dom.TextNode(mix) ];
                    for (var i = 0, x, imax = this.length; i < imax; i++) {
                        x = this[i];
                        x.nodes = node;
                    }
                    return this;
                }
                var string = "";
                for (var i = 0, x, imax = this.length; i < imax; i++) {
                    x = this[i];
                    string += jmask_getText(x, mix, cntx, controller);
                }
                return string;
            }
        };
        arr_each([ "append", "prepend" ], function(method) {
            jMask.prototype[method] = function(mix) {
                var $mix = jMask(mix), i = 0, length = this.length, arr, node;
                for (;i < length; i++) {
                    node = this[i];
                    arr = $mix.toArray();
                    for (var j = 0, jmax = arr.length; j < jmax; j++) arr[j].parent = node;
                    if (null == node.nodes) {
                        node.nodes = arr;
                        continue;
                    }
                    node.nodes = "append" === method ? node.nodes.concat(arr) : arr.concat(node.nodes);
                }
                return this;
            };
        });
        arr_each([ "appendTo" ], function(method) {
            jMask.prototype[method] = function(mix, model, cntx, controller) {
                if (null == controller) controller = this;
                if (null != mix.nodeType && "function" === typeof mix.appendChild) {
                    mix.appendChild(this.render(model, cntx, null, controller));
                    _signal_emitIn(controller, "domInsert");
                    return this;
                }
                jMask(mix).append(this);
                return this;
            };
        });
        !function() {
            Proto.removeAttr = Proto.removeProp = function(key) {
                return coll_each(this, function(node) {
                    node.attr[key] = null;
                });
            };
            Proto.attr = Proto.prop = function(mix, val) {
                if (1 === arguments.length) return this.length > 0 ? this[0].attr[mix] : null;
                function asString(node, key, val) {
                    node.attr[key] = _mask_ensureTmplFn(val);
                }
                function asObject(node, obj) {
                    for (var key in obj) asString(node, key, obj[key]);
                }
                var fn = is_String(mix) ? asString : asObject;
                return coll_each(this, function(node) {
                    fn(node, mix, val);
                });
            };
            Proto.tag = function(name) {
                if (0 === arguments.length) return this[0] && this[0].tagName;
                return coll_each(this, function(node) {
                    node.tagName = name;
                });
            };
            Proto.css = function(mix, val) {
                if (arguments.length <= 1 && "string" === typeof mix) {
                    if (null == this.length) return null;
                    var style = this[0].attr.style;
                    if (null == style) return null;
                    var obj = css_parseStyle(style);
                    return null == mix ? obj : obj[mix];
                }
                if (null == mix) return this;
                var stringify = "object" === typeof mix ? css_stringify : css_stringifyKeyVal;
                var extend = "object" === typeof mix ? obj_extend : css_extendKeyVal;
                return coll_each(this, function(node) {
                    var style = node.attr.style;
                    if (null == style) {
                        node.attr.style = stringify(mix, val);
                        return;
                    }
                    var css = css_parseStyle(style);
                    extend(css, mix, val);
                    node.attr.style = css_stringify(css);
                });
            };
            function css_extendKeyVal(css, key, val) {
                css[key] = val;
            }
            function css_parseStyle(style) {
                var obj = {};
                style.split(";").forEach(function(x) {
                    if ("" === x) return;
                    var i = x.indexOf(":"), key = x.substring(0, i).trim(), val = x.substring(i + 1).trim();
                    obj[key] = val;
                });
                return obj;
            }
            function css_stringify(css) {
                var str = "", key;
                for (key in css) str += key + ":" + css[key] + ";";
                return str;
            }
            function css_stringifyKeyVal(key, val) {
                return key + ":" + val + ";";
            }
        }();
        !function() {
            Proto.hasClass = function(klass) {
                return coll_find(this, function(node) {
                    return has(node, klass);
                });
            };
            var Mutator_ = {
                add: function(node, klass) {
                    if (false === has(node, klass)) add(node, klass);
                },
                remove: function(node, klass) {
                    if (true === has(node, klass)) remove(node, klass);
                },
                toggle: function(node, klass) {
                    var fn = true === has(node, klass) ? remove : add;
                    fn(node, klass);
                }
            };
            arr_each([ "add", "remove", "toggle" ], function(method) {
                var fn = Mutator_[method];
                Proto[method + "Class"] = function(klass) {
                    return coll_each(this, function(node) {
                        fn(node, klass);
                    });
                };
            });
            function current(node) {
                var className = node.attr["class"];
                return "string" === typeof className ? className : "";
            }
            function has(node, klass) {
                return -1 !== (" " + current(node) + " ").indexOf(" " + klass + " ");
            }
            function add(node, klass) {
                node.attr["class"] = (current(node) + " " + klass).trim();
            }
            function remove(node, klass) {
                node.attr["class"] = (" " + current(node) + " ").replace(" " + klass + " ", "").trim();
            }
        }();
        obj_extend(jMask.prototype, {
            clone: function() {
                return jMask(coll_map(this, jmask_clone));
            },
            wrap: function(wrapper) {
                var $wrap = jMask(wrapper);
                if (0 === $wrap.length) {
                    log_warn("Not valid wrapper", wrapper);
                    return this;
                }
                var result = coll_map(this, function(x) {
                    var node = $wrap.clone()[0];
                    jmask_deepest(node).nodes = [ x ];
                    if (null != x.parent) {
                        var i = coll_indexOf(x.parent.nodes, x);
                        if (i !== -1) x.parent.nodes.splice(i, 1, node);
                    }
                    return node;
                });
                return jMask(result);
            },
            wrapAll: function(wrapper) {
                var $wrap = jMask(wrapper);
                if (0 === $wrap.length) {
                    log_error("Not valid wrapper", wrapper);
                    return this;
                }
                this.parent().mask($wrap);
                jmask_deepest($wrap[0]).nodes = this.toArray();
                return this.pushStack($wrap);
            }
        });
        arr_each([ "empty", "remove" ], function(method) {
            jMask.prototype[method] = function() {
                return coll_each(this, Methods_[method]);
            };
            var Methods_ = {
                remove: function(node) {
                    if (null != node.parent) coll_remove(node.parent.nodes, node);
                },
                empty: function(node) {
                    node.nodes = null;
                }
            };
        });
        obj_extend(jMask.prototype, {
            each: function(fn, cntx) {
                for (var i = 0; i < this.length; i++) fn.call(cntx || this, this[i], i);
                return this;
            },
            eq: function(i) {
                return i === -1 ? this.slice(i) : this.slice(i, i + 1);
            },
            get: function(i) {
                return i < 0 ? this[this.length - i] : this[i];
            },
            slice: function() {
                return this.pushStack(Array.prototype.slice.apply(this, arguments));
            }
        });
        arr_each([ "filter", "children", "closest", "parent", "find", "first", "last" ], function(method) {
            jMask.prototype[method] = function(selector) {
                var result = [], matcher = null == selector ? null : selector_parse(selector, this.type, "closest" === method ? "up" : "down"), i, x;
                switch (method) {
                  case "filter":
                    return jMask(jmask_filter(this, matcher));

                  case "children":
                    for (i = 0; i < this.length; i++) {
                        x = this[i];
                        if (null == x.nodes) continue;
                        result = result.concat(null == matcher ? x.nodes : jmask_filter(x.nodes, matcher));
                    }
                    break;

                  case "parent":
                    for (i = 0; i < this.length; i++) {
                        x = this[i].parent;
                        if (!x || x.type === Dom.FRAGMENT || matcher && selector_match(x, matcher)) continue;
                        result.push(x);
                    }
                    arr_unique(result);
                    break;

                  case "closest":
                  case "find":
                    if (null == matcher) break;
                    for (i = 0; i < this.length; i++) jmask_find(this[i][matcher.nextKey], matcher, result);
                    break;

                  case "first":
                  case "last":
                    var index;
                    for (i = 0; i < this.length; i++) {
                        index = "first" === method ? i : this.length - i - 1;
                        x = this[index];
                        if (null == matcher || selector_match(x, matcher)) {
                            result[0] = x;
                            break;
                        }
                    }
                }
                return this.pushStack(result);
            };
        });
        return jMask;
    }(Mask);
    !function(mask, Compo) {
        var IS_BROWSER = true, IS_NODE = false;
        var __Compo = "undefined" !== typeof Compo ? Compo : mask.Compo || global.Compo, __dom_addEventListener = __Compo.Dom.addEventListener, __mask_registerHandler = mask.registerHandler, __mask_registerAttrHandler = mask.registerAttrHandler, __mask_registerUtil = mask.registerUtil, domLib = __Compo.config.getDOMLibrary();
        var obj_addObserver, obj_hasObserver, obj_removeObserver, obj_lockObservers, obj_unlockObservers, obj_ensureObserversProperty, obj_addMutatorObserver, obj_removeMutatorObserver;
        !function() {
            obj_addObserver = function(obj, property, cb) {
                var parts = property.split("."), imax = parts.length, i = -1, x = obj;
                while (++i < imax) {
                    x = x[parts[i]];
                    if (null == x) break;
                    if (null != x[prop_OBS]) {
                        var prop = parts.slice(i + 1).join(".");
                        if (null != x[prop_OBS][prop]) {
                            pushListener_(x, prop, cb);
                            var cbs = pushListener_(obj, property, cb);
                            if (1 === cbs.length) {
                                var arr = parts.splice(0, i);
                                if (0 !== arr.length) attachProxy_(obj, property, cbs, arr, true);
                            }
                            return;
                        }
                    }
                }
                var cbs = pushListener_(obj, property, cb);
                if (1 === cbs.length) attachProxy_(obj, property, cbs, parts, true);
                var val = obj_getProperty(obj, property), mutators = getSelfMutators(val);
                if (null != mutators) objMutator_addObserver(val, mutators, cb);
            };
            obj_hasObserver = function(obj, property, callback) {
                var parts = property.split("."), imax = parts.length, i = -1, x = obj;
                while (++i < imax) {
                    x = x[parts[i]];
                    if (null == x) break;
                    if (null != x[prop_OBS]) {
                        if (obj_hasObserver(x, parts.slice(i).join("."), callback)) return true;
                        break;
                    }
                }
                var obs = obj[prop_OBS];
                if (null == obs || null == obs[property]) return false;
                return arr_contains(obs[property], callback);
            };
            obj_removeObserver = function(obj, property, callback) {
                var parts = property.split("."), imax = parts.length, i = -1, x = obj;
                while (++i < imax) {
                    x = x[parts[i]];
                    if (null == x) break;
                    if (null != x[prop_OBS]) {
                        obj_removeObserver(x, parts.slice(i).join("."), callback);
                        break;
                    }
                }
                var obs = obj_ensureObserversProperty(obj, property), val = obj_getProperty(obj, property);
                if (callback === void 0) obs.length = 0; else arr_remove(obs, callback);
                var mutators = getSelfMutators(val);
                if (null != mutators) objMutator_removeObserver(val, mutators, callback);
            };
            obj_lockObservers = function(obj) {
                var obs = obj[prop_OBS];
                if (null != obs) obs[prop_DIRTY] = {};
            };
            obj_unlockObservers = function(obj) {
                var obs = obj[prop_OBS], dirties = null == obs ? null : obs[prop_DIRTY];
                if (null == dirties) return;
                obs[prop_DIRTY] = null;
                var prop, cbs, val, imax, i;
                for (prop in dirties) {
                    cbs = obj[prop_OBS][prop];
                    imax = null == cbs ? 0 : cbs.length;
                    if (0 === imax) continue;
                    i = -1;
                    val = prop === prop_MUTATORS ? obj : obj_getProperty(obj, prop);
                    while (++i < imax) cbs[i](val);
                }
            };
            obj_ensureObserversProperty = function(obj, type) {
                var obs = obj[prop_OBS];
                if (null == obs) {
                    obs = {
                        __dirty: null,
                        __dfrTimeout: null,
                        __mutators: null
                    };
                    defineProp_(obj, "__observers", {
                        value: obs,
                        enumerable: false
                    });
                }
                if (null == type) return obs;
                var arr = obs[type];
                return null == arr ? obs[type] = [] : arr;
            };
            obj_addMutatorObserver = function(obj, cb) {
                var mutators = getSelfMutators(obj);
                if (null != mutators) objMutator_addObserver(obj, mutators, cb);
            };
            obj_removeMutatorObserver = function(obj, cb) {
                objMutator_removeObserver(obj, null, cb);
            };
            var prop_OBS = "__observers", prop_MUTATORS = "__mutators", prop_TIMEOUT = "__dfrTimeout", prop_DIRTY = "__dirty";
            var defineProp_ = Object.defineProperty;
            function ensureProperty_(obj, chain) {
                var i = -1, imax = chain.length - 1, key;
                while (++i < imax) {
                    key = chain[i];
                    if (null == obj[key]) obj[key] = {};
                    obj = obj[key];
                }
                return obj;
            }
            function getSelfMutators(obj) {
                if (null == obj || "object" !== typeof obj) return null;
                if ("number" === typeof obj.length && "function" === typeof obj.slice) return MUTATORS_.Array;
                if ("function" === typeof obj.toUTCString) return MUTATORS_.Date;
                return null;
            }
            var MUTATORS_ = {
                Array: {
                    throttle: false,
                    methods: [ "push", "unshift", "splice", "pop", "shift", "reverse", "sort", "remove" ]
                },
                Date: {
                    throttle: true,
                    methods: [ "setDate", "setFullYear", "setHours", "setMilliseconds", "setMinutes", "setMonth", "setSeconds", "setTime", "setUTCDate", "setUTCFullYear", "setUTCHours", "setUTCMilliseconds", "setUTCMinutes", "setUTCMonth", "setUTCSeconds" ]
                }
            };
            function attachProxy_(obj, property, cbs, chain) {
                var length = chain.length, parent = length > 1 ? ensureProperty_(obj, chain) : obj, key = chain[length - 1], currentVal = parent[key];
                if (length > 1) obj_defineCrumbs(obj, chain);
                if ("length" === key) {
                    var mutators = getSelfMutators(parent);
                    if (null != mutators) {
                        objMutator_addObserver(parent, mutators, function() {
                            var imax = cbs.length, i = -1;
                            while (++i < imax) cbs[i].apply(null, arguments);
                        });
                        return currentVal;
                    }
                }
                defineProp_(parent, key, {
                    get: function() {
                        return currentVal;
                    },
                    set: function(x) {
                        if (x === currentVal) return;
                        currentVal = x;
                        var i = 0, imax = cbs.length, mutators = getSelfMutators(x);
                        if (null != mutators) for (;i < imax; i++) objMutator_addObserver(x, mutators, cbs[i]);
                        if (null != obj[prop_OBS][prop_DIRTY]) {
                            obj[prop_OBS][prop_DIRTY][property] = 1;
                            return;
                        }
                        for (i = 0; i < imax; i++) cbs[i](x);
                    },
                    configurable: true,
                    enumerable: true
                });
                return currentVal;
            }
            function obj_defineCrumbs(obj, chain) {
                var rebinder = obj_crumbRebindDelegate(obj), path = "", key;
                var imax = chain.length - 1, i = 0;
                for (;i < imax; i++) {
                    key = chain[i];
                    path += key + ".";
                    obj_defineCrumb(path, obj, key, rebinder);
                    obj = obj[key];
                }
            }
            function obj_defineCrumb(path, obj, key, rebinder) {
                var value = obj[key], old;
                defineProp_(obj, key, {
                    get: function() {
                        return value;
                    },
                    set: function(x) {
                        if (x === value) return;
                        old = value;
                        value = x;
                        rebinder(path, old);
                    },
                    configurable: true,
                    enumerable: true
                });
            }
            function obj_crumbRebindDelegate(obj) {
                return function(path, oldValue) {
                    var observers = obj[prop_OBS];
                    if (null == observers) return;
                    for (var property in observers) {
                        if (0 !== property.indexOf(path)) continue;
                        var listeners = observers[property].slice(0), imax = listeners.length, i = 0;
                        if (0 === imax) continue;
                        var val = obj_getProperty(obj, property), cb, oldProp;
                        for (i = 0; i < imax; i++) {
                            cb = listeners[i];
                            obj_removeObserver(obj, property, cb);
                            oldProp = property.substring(path.length);
                            obj_removeObserver(oldValue, oldProp, cb);
                        }
                        for (i = 0; i < imax; i++) listeners[i](val);
                        for (i = 0; i < imax; i++) obj_addObserver(obj, property, listeners[i]);
                    }
                };
            }
            function pushListener_(obj, property, cb) {
                var obs = obj_ensureObserversProperty(obj, property);
                if (false === arr_contains(obs, cb)) obs.push(cb);
                return obs;
            }
            var objMutator_addObserver, objMutator_removeObserver;
            !function() {
                objMutator_addObserver = function(obj, mutators, cb) {
                    var methods = mutators.methods, throttle = mutators.throttle, obs = obj_ensureObserversProperty(obj, prop_MUTATORS);
                    if (0 === obs.length) {
                        var imax = methods.length, i = -1, method, fn;
                        while (++i < imax) {
                            method = methods[i];
                            fn = obj[method];
                            if (null == fn) continue;
                            obj[method] = objMutator_createWrapper_(obj, fn, method, throttle);
                        }
                    }
                    obs[obs.length++] = cb;
                };
                objMutator_removeObserver = function(obj, mutators, cb) {
                    var obs = obj_ensureObserversProperty(obj, prop_MUTATORS);
                    if (cb === void 0) {
                        obs.length = 0;
                        return;
                    }
                    arr_remove(obs, cb);
                };
                function objMutator_createWrapper_(obj, originalFn, method, throttle) {
                    var fn = true === throttle ? callDelayed : call;
                    return function() {
                        return fn(obj, originalFn, method, _Array_slice.call(arguments));
                    };
                }
                function call(obj, original, method, args) {
                    var cbs = obj_ensureObserversProperty(obj, prop_MUTATORS), result = original.apply(obj, args);
                    tryNotify(obj, cbs, method, args, result);
                    return result;
                }
                function callDelayed(obj, original, method, args) {
                    var cbs = obj_ensureObserversProperty(obj, prop_MUTATORS), result = original.apply(obj, args);
                    var obs = obj[prop_OBS];
                    if (null != obs[prop_TIMEOUT]) return result;
                    obs[prop_TIMEOUT] = setTimeout(function() {
                        obs[prop_TIMEOUT] = null;
                        tryNotify(obj, cbs, method, args, result);
                    });
                    return result;
                }
                function tryNotify(obj, cbs, method, args, result) {
                    if (0 === cbs.length) return;
                    var obs = obj[prop_OBS];
                    if (null != obs[prop_DIRTY]) {
                        obs[prop_DIRTY][prop_MUTATORS] = 1;
                        return;
                    }
                    var imax = cbs.length, i = -1, x;
                    while (++i < imax) {
                        x = cbs[i];
                        if ("function" === typeof x) x(obj, method, args, result);
                    }
                }
            }();
        }();
        var date_ensure;
        !function() {
            date_ensure = function(val) {
                if (null == val || "" === val) return null;
                if ("string" === typeof val) val = new Date(val);
                return false === isNaN(val) && "function" === typeof val.getFullYear ? val : null;
            };
        }();
        function dom_removeElement(node) {
            return node.parentNode.removeChild(node);
        }
        function dom_removeAll(array) {
            if (null == array) return;
            var imax = array.length, i = -1;
            while (++i < imax) dom_removeElement(array[i]);
        }
        function dom_insertAfter(element, anchor) {
            return anchor.parentNode.insertBefore(element, anchor.nextSibling);
        }
        function dom_insertBefore(element, anchor) {
            return anchor.parentNode.insertBefore(element, anchor);
        }
        var compo_fragmentInsert, compo_render, compo_dispose, compo_inserted, compo_attachDisposer;
        !function() {
            compo_fragmentInsert = function(compo, index, fragment, placeholder) {
                if (null == compo.components) return dom_insertAfter(fragment, placeholder || compo.placeholder);
                var compos = compo.components, anchor = null, insertBefore = true, imax = compos.length, i = index - 1, elements;
                if (null == anchor) while (++i < imax) {
                    elements = compos[i].elements;
                    if (elements && elements.length) {
                        anchor = elements[0];
                        break;
                    }
                }
                if (null == anchor) {
                    insertBefore = false;
                    i = index < imax ? index : imax;
                    while (--i > -1) {
                        elements = compos[i].elements;
                        if (elements && elements.length) {
                            anchor = elements[elements.length - 1];
                            break;
                        }
                    }
                }
                if (null == anchor) anchor = placeholder || compo.placeholder;
                if (insertBefore) return dom_insertBefore(fragment, anchor);
                return dom_insertAfter(fragment, anchor);
            };
            compo_render = function(parentCtr, template, model, ctx, container) {
                return mask.render(template, model, ctx, container, parentCtr);
            };
            compo_dispose = function(compo, parent) {
                if (null == compo) return false;
                if (null != compo.elements) {
                    dom_removeAll(compo.elements);
                    compo.elements = null;
                }
                __Compo.dispose(compo);
                var compos = parent && parent.components || compo.parent && compo.parent.components;
                if (null == compos) {
                    log_error("Parent Components Collection is undefined");
                    return false;
                }
                return arr_remove(compos, compo);
            };
            compo_inserted = function(compo) {
                __Compo.signal.emitIn(compo, "domInsert");
            };
            compo_attachDisposer = function(ctr, disposer) {
                if ("function" === typeof ctr.dispose) {
                    var previous = ctr.dispose;
                    ctr.dispose = function() {
                        disposer.call(this);
                        previous.call(this);
                    };
                    return;
                }
                ctr.dispose = disposer;
            };
        }();
        var expression_eval, expression_eval_strict, expression_bind, expression_unbind, expression_createBinder, expression_createListener, expression_parse, expression_varRefs;
        !function() {
            var Expression = mask.Utils.Expression;
            expression_eval_strict = Expression.eval;
            expression_parse = Expression.parse;
            expression_varRefs = Expression.varRefs;
            expression_eval = function(expr, model, ctx, ctr) {
                if ("." === expr) return model;
                var x = expression_eval_strict(expr, model, ctx, ctr);
                return null == x ? "" : x;
            };
            expression_bind = function(expr, model, ctx, ctr, callback) {
                if ("." === expr) {
                    obj_addMutatorObserver(model, callback);
                    return;
                }
                var ast = expression_parse(expr), vars = expression_varRefs(ast, model, ctx, ctr), obj, ref;
                if (null == vars) return;
                if ("string" === typeof vars) {
                    _toggleObserver(obj_addObserver, model, ctr, vars, callback);
                    return;
                }
                var isArray = null != vars.length && "function" === typeof vars.splice, imax = true === isArray ? vars.length : 1, i = 0, x, prop;
                for (;i < imax; i++) {
                    x = true === isArray ? vars[i] : vars;
                    _toggleObserver(obj_addObserver, model, ctr, x, callback);
                }
            };
            expression_unbind = function(expr, model, ctr, callback) {
                if ("function" === typeof ctr) log_warn("[mask.binding] - expression unbind(expr, model, controller, callback)");
                if ("." === expr) {
                    obj_removeMutatorObserver(model, callback);
                    return;
                }
                var vars = expression_varRefs(expr, model, null, ctr), x, ref;
                if (null == vars) return;
                if ("string" === typeof vars) {
                    _toggleObserver(obj_removeObserver, model, ctr, vars, callback);
                    return;
                }
                var isArray = null != vars.length && "function" === typeof vars.splice, imax = true === isArray ? vars.length : 1, i = 0, x;
                for (;i < imax; i++) {
                    x = true === isArray ? vars[i] : vars;
                    _toggleObserver(obj_removeObserver, model, ctr, x, callback);
                }
            };
            expression_createBinder = function(expr, model, cntx, controller, callback) {
                var locks = 0;
                return function binder() {
                    if (++locks > 1) {
                        locks = 0;
                        log_warn("<mask:bind:expression> Concurent binder detected", expr);
                        return;
                    }
                    var value = expression_eval(expr, model, cntx, controller);
                    if (arguments.length > 1) {
                        var args = _Array_slice.call(arguments);
                        args[0] = value;
                        callback.apply(this, args);
                    } else callback(value);
                    locks--;
                };
            };
            expression_createListener = function(callback) {
                var locks = 0;
                return function() {
                    if (++locks > 1) {
                        locks = 0;
                        log_warn("<listener:expression> concurent binder");
                        return;
                    }
                    callback();
                    locks--;
                };
            };
            function _toggleObserver(mutatorFn, model, ctr, accessor, callback) {
                if (null == accessor) return;
                if ("object" === typeof accessor) {
                    var obj = expression_eval_strict(accessor.accessor, model, null, ctr);
                    if (null == obj || "object" !== typeof obj) {
                        console.error("Binding failed to an object over accessor", accessor.ref);
                        return;
                    }
                    mutatorFn(obj, accessor.ref, callback);
                    return;
                }
                var property = accessor, parts = property.split("."), imax = parts.length;
                if (imax > 1) {
                    var first = parts[0];
                    if ("$c" === first) {
                        ctr = _getObservable_Controller(ctr, parts.slice(1), imax - 1);
                        mutatorFn(ctr, property.substring(3), callback);
                        return;
                    }
                    if ("$a" === first || "$ctx" === first) return;
                }
                var obj = null;
                if (_isDefined(model, parts, imax)) obj = model;
                if (null == obj) obj = _getObservable_Scope(ctr, parts, imax);
                if (null == obj) obj = model;
                mutatorFn(obj, property, callback);
            }
            function _getObservable_Scope(ctr, parts, imax) {
                var scope;
                while (null != ctr) {
                    scope = ctr.scope;
                    if (null != scope && _isDefined(scope, parts, imax)) return scope;
                    ctr = ctr.parent;
                }
                return null;
            }
            function _getObservable_Controller(ctr, parts, imax) {
                while (null != ctr) {
                    if (_isDefined(ctr, parts, imax)) return ctr;
                    ctr = ctr.parent;
                }
                return ctr;
            }
            function _isDefined(obj, parts, imax) {
                if (null == obj) return false;
                var i = 0, val;
                for (;i < imax; i++) {
                    obj = obj[parts[i]];
                    if (obj === void 0) return false;
                }
                return true;
            }
        }();
        var signal_parse, signal_create;
        !function() {
            signal_parse = function(str, isPiped, defaultType) {
                var signals = str.split(";"), set = [], i = 0, imax = signals.length, x, signalName, type, signal;
                for (;i < imax; i++) {
                    x = signals[i].split(":");
                    if (1 !== x.length && 2 !== x.length) {
                        log_error('Too much ":" in a signal def.', signals[i]);
                        continue;
                    }
                    type = 2 === x.length ? x[0] : defaultType;
                    signalName = x[2 === x.length ? 1 : 0];
                    signal = signal_create(signalName.trim(), type, isPiped);
                    if (null != signal) set.push(signal);
                }
                return set;
            };
            signal_create = function(signal, type, isPiped) {
                if (true !== isPiped) return {
                    signal: signal,
                    type: type
                };
                var index = signal.indexOf(".");
                if (index === -1) {
                    log_error("No pipe name in a signal", signal);
                    return null;
                }
                return {
                    signal: signal.substring(index + 1),
                    pipe: signal.substring(0, index),
                    type: type
                };
            };
        }();
        var DomObjectTransport;
        !function() {
            var objectWay = {
                get: function(provider, expression) {
                    var getter = provider.objGetter;
                    if (null == getter) return expression_eval(expression, provider.model, provider.ctx, provider.ctr);
                    var obj = getAccessorObject_(provider, getter);
                    if (null == obj) return null;
                    return obj[getter](expression, provider.model, provider.ctr.parent);
                },
                set: function(obj, property, value, provider) {
                    var setter = provider.objSetter;
                    if (null == setter) {
                        obj_setProperty(obj, property, value);
                        return;
                    }
                    var ctx = getAccessorObject_(provider, setter);
                    if (null == ctx) return;
                    ctx[setter](property, value, provider.model, provider.ctr.parent);
                }
            };
            var domWay = {
                get: function(provider) {
                    var getter = provider.domGetter;
                    if (null == getter) return obj_getProperty(provider, provider.property);
                    var ctr = provider.ctr.parent;
                    if (false === isValidFn_(ctr, getter, "Getter")) return null;
                    return ctr[getter](provider.element);
                },
                set: function(provider, value) {
                    var setter = provider.domSetter;
                    if (null == setter) {
                        obj_setProperty(provider, provider.property, value);
                        return;
                    }
                    var ctr = provider.ctr.parent;
                    if (false === isValidFn_(ctr, setter, "Setter")) return;
                    ctr[setter](value, provider.element);
                }
            };
            var DateTimeDelegate = {
                domSet: function(format) {
                    return function(prov, val) {
                        var date = date_ensure(val);
                        prov.element.value = null == date ? "" : format(date);
                    };
                },
                objSet: function(extend) {
                    return function(obj, prop, val) {
                        var date = date_ensure(val);
                        if (null == date) return;
                        var target = date_ensure(obj_getProperty(obj, prop));
                        if (null == target) {
                            obj_setProperty(obj, prop, date);
                            return;
                        }
                        extend(target, date);
                    };
                }
            };
            DomObjectTransport = {
                objectWay: objectWay,
                domWay: domWay,
                SELECT: {
                    get: function(provider) {
                        var el = provider.element, i = el.selectedIndex;
                        return i === -1 ? "" : el.options[i].getAttribute("name");
                    },
                    set: function(provider, val) {
                        var el = provider.element, options = el.options, imax = options.length, i = -1;
                        while (++i < imax) if (options[i].getAttribute("name") == val) {
                            el.selectedIndex = i;
                            return;
                        }
                        log_warn("Value is not an option", val);
                    }
                },
                DATE: {
                    domWay: {
                        get: domWay.get,
                        set: function(prov, val) {
                            var date = date_ensure(val);
                            prov.element.value = null == date ? "" : formatDate(date);
                        }
                    },
                    objectWay: {
                        get: objectWay.get,
                        set: DateTimeDelegate.objSet(function(a, b) {
                            a.setFullYear(b.getFullYear());
                            a.setMonth(b.getMonth());
                            a.setDate(b.getDate());
                        })
                    }
                },
                TIME: {
                    domWay: {
                        get: domWay.get,
                        set: DateTimeDelegate.domSet(formatTime)
                    },
                    objectWay: {
                        get: objectWay.get,
                        set: DateTimeDelegate.objSet(function(a, b) {
                            a.setHours(b.getHours());
                            a.setMinutes(b.getMinutes());
                            a.setSeconds(b.getSeconds());
                        })
                    }
                }
            };
            function isValidFn_(obj, prop, name) {
                if (null == obj || "function" !== typeof obj[prop]) {
                    log_error("BindingProvider.", name, "should be a function. Property:", prop);
                    return false;
                }
                return true;
            }
            function getAccessorObject_(provider, accessor) {
                var ctr = provider.ctr.parent;
                if (null != ctr[accessor]) return ctr;
                var model = provider.model;
                if (null != model[accessor]) return model;
                log_error("BindingProvider. Accessor `", accessor, "`should be a function");
                return null;
            }
            function formatDate(date) {
                var YYYY = date.getFullYear(), MM = date.getMonth() + 1, DD = date.getDate();
                return YYYY + "-" + (MM < 10 ? "0" : "") + MM + "-" + (DD < 10 ? "0" : "") + DD;
            }
            function formatTime(date) {
                var H = date.getHours(), M = date.getMinutes();
                return H + ":" + (M < 10 ? "0" : "") + M;
            }
        }();
        var CustomProviders = {};
        mask.registerBinding = function(name, Prov) {
            CustomProviders[name] = Prov;
        };
        var BindingProvider;
        !function() {
            mask.BindingProvider = BindingProvider = function BindingProvider(model, element, ctr, bindingType) {
                if (null == bindingType) bindingType = ":bind" === ctr.compoName ? "single" : "dual";
                var attr = ctr.attr, type;
                this.node = ctr;
                this.ctr = ctr;
                this.ctx = null;
                this.model = model;
                this.element = element;
                this.value = attr.value;
                this.property = attr.property;
                this.domSetter = attr.setter || attr["dom-setter"];
                this.domGetter = attr.getter || attr["dom-getter"];
                this.objSetter = attr["obj-setter"];
                this.objGetter = attr["obj-getter"];
                this.dismiss = 0;
                this.bindingType = bindingType;
                this.log = false;
                this.signal_domChanged = null;
                this.signal_objectChanged = null;
                this.locked = false;
                if (null == this.property && null == this.domGetter) switch (element.tagName) {
                  case "INPUT":
                    type = element.getAttribute("type");
                    if ("checkbox" === type) {
                        this.property = "element.checked";
                        break;
                    }
                    if ("date" === type) {
                        var x = DomObjectTransport.DATE;
                        this.domWay = x.domWay;
                        this.objectWay = x.objectWay;
                    }
                    this.property = "element.value";
                    break;

                  case "TEXTAREA":
                    this.property = "element.value";
                    break;

                  case "SELECT":
                    this.domWay = DomObjectTransport.DATE.SELECT;
                    break;

                  default:
                    this.property = "element.innerHTML";
                }
                if (attr["log"]) {
                    this.log = true;
                    if ("log" !== attr.log) this.logExpression = attr.log;
                }
                if (attr["x-signal"]) {
                    var signal = signal_parse(attr["x-signal"], null, "dom")[0], signalType = signal && signal.type;
                    switch (signalType) {
                      case "dom":
                      case "object":
                        this["signal_" + signalType + "Changed"] = signal.signal;
                        break;

                      default:
                        log_error("Signal typs is not supported", signal);
                    }
                }
                if (attr["x-pipe-signal"]) {
                    var signal = signal_parse(attr["x-pipe-signal"], true, "dom")[0], signalType = signal && signal.type;
                    switch (signalType) {
                      case "dom":
                      case "object":
                        this["pipe_" + signalType + "Changed"] = signal;
                        break;

                      default:
                        log_error("Pipe type is not supported");
                    }
                }
                if (attr["dom-slot"]) {
                    this.slots = {};
                    var parent = ctr.parent, newparent = parent.parent;
                    parent.parent = this;
                    this.parent = newparent;
                    this.slots[attr["dom-slot"]] = function(sender, value) {
                        this.domChanged(sender, value);
                    };
                }
                var pipeSlot = attr["object-pipe-slot"] || attr["x-pipe-slot"];
                if (pipeSlot) {
                    var str = pipeSlot, index = str.indexOf("."), pipeName = str.substring(0, index), signal = str.substring(index + 1);
                    this.pipes = {};
                    this.pipes[pipeName] = {};
                    this.pipes[pipeName][signal] = function() {
                        this.objectChanged();
                    };
                    __Compo.pipe.addController(this);
                }
                if (attr.expression) {
                    this.expression = attr.expression;
                    if (null == this.value && "single" !== bindingType) {
                        var refs = expression_varRefs(this.expression);
                        if ("string" === typeof refs) this.value = refs; else log_warn("Please set value attribute in DualBind Control.");
                    }
                    return;
                }
                this.expression = this.value;
            };
            BindingProvider.create = function(model, el, ctr, bindingType) {
                var type = ctr.attr.bindingProvider, CustomProvider = null == type ? null : CustomProviders[type], provider;
                if ("function" === typeof CustomProvider) return new CustomProvider(model, el, ctr, bindingType);
                provider = new BindingProvider(model, el, ctr, bindingType);
                if (null != CustomProvider) obj_extend(provider, CustomProvider);
                return provider;
            };
            BindingProvider.bind = function(provider) {
                return apply_bind(provider);
            };
            BindingProvider.prototype = {
                constructor: BindingProvider,
                dispose: function() {
                    expression_unbind(this.expression, this.model, this.ctr, this.binder);
                },
                objectChanged: function(x) {
                    if (this.dismiss-- > 0) return;
                    if (true === this.locked) {
                        log_warn("Concurance change detected", this);
                        return;
                    }
                    this.locked = true;
                    if (null == x) x = this.objectWay.get(this, this.expression);
                    this.domWay.set(this, x);
                    if (this.log) console.log("[BindingProvider] objectChanged -", x);
                    if (this.signal_objectChanged) signal_emitOut(this.ctr, this.signal_objectChanged, [ x ]);
                    if (this.pipe_objectChanged) {
                        var pipe = this.pipe_objectChanged;
                        __Compo.pipe(pipe.pipe).emit(pipe.signal);
                    }
                    this.locked = false;
                },
                domChanged: function(event, value) {
                    if (true === this.locked) {
                        log_warn("Concurance change detected", this);
                        return;
                    }
                    this.locked = true;
                    if (null == value) value = this.domWay.get(this);
                    var isValid = true, validations = this.ctr.validations;
                    if (validations) {
                        var imax = validations.length, i = -1, x;
                        while (++i < imax) {
                            x = validations[i];
                            if (false === x.validate(value, this.element, this.objectChanged.bind(this))) {
                                isValid = false;
                                break;
                            }
                        }
                    }
                    if (isValid) {
                        this.dismiss = 1;
                        this.objectWay.set(this.model, this.value, value, this);
                        this.dismiss = 0;
                        if (this.log) console.log("[BindingProvider] domChanged -", value);
                        if (this.signal_domChanged) signal_emitOut(this.ctr, this.signal_domChanged, [ value ]);
                        if (this.pipe_domChanged) {
                            var pipe = this.pipe_domChanged;
                            __Compo.pipe(pipe.pipe).emit(pipe.signal);
                        }
                    }
                    this.locked = false;
                },
                objectWay: DomObjectTransport.objectWay,
                domWay: DomObjectTransport.domWay
            };
            function apply_bind(provider) {
                var expr = provider.expression, model = provider.model, onObjChanged = provider.objectChanged = provider.objectChanged.bind(provider);
                provider.binder = expression_createBinder(expr, model, provider.ctx, provider.ctr, onObjChanged);
                expression_bind(expr, model, provider.ctx, provider.ctr, provider.binder);
                if ("dual" === provider.bindingType) {
                    var attr = provider.ctr.attr;
                    if (!attr["change-slot"] && !attr["change-pipe-event"]) {
                        var element = provider.element, eventType = attr["change-event"] || attr.changeEvent || "change", onDomChange = provider.domChanged.bind(provider);
                        __dom_addEventListener(element, eventType, onDomChange);
                    }
                    if (!provider.objectWay.get(provider, provider.expression)) {
                        setTimeout(function() {
                            if (provider.domWay.get(provider)) provider.domChanged();
                        });
                        return provider;
                    }
                }
                provider.objectChanged();
                return provider;
            }
            function signal_emitOut(ctr, signal, args) {
                if (null == ctr) return;
                var slots = ctr.slots;
                if (null != slots && "function" === typeof slots[signal]) if (false === slots[signal].apply(ctr, args)) return;
                signal_emitOut(ctr.parent, signal, args);
            }
            obj_extend(BindingProvider, {
                addObserver: obj_addObserver,
                removeObserver: obj_removeObserver
            });
        }();
        function VisibleHandler() {}
        __mask_registerHandler(":visible", VisibleHandler);
        VisibleHandler.prototype = {
            constructor: VisibleHandler,
            refresh: function(model, container) {
                container.style.display = expression_eval(this.attr.check, model) ? "" : "none";
            },
            renderStart: function(model, cntx, container) {
                this.refresh(model, container);
                if (this.attr.bind) obj_addObserver(model, this.attr.bind, this.refresh.bind(this, model, container));
            }
        };
        !function() {
            function Bind() {}
            __mask_registerHandler(":bind", Bind);
            Bind.prototype = {
                constructor: Bind,
                renderEnd: function(els, model, cntx, container) {
                    this.provider = BindingProvider.create(model, container, this, "single");
                    BindingProvider.bind(this.provider);
                },
                dispose: function() {
                    if (this.provider && "function" === typeof this.provider.dispose) this.provider.dispose();
                }
            };
        }();
        function DualbindHandler() {}
        __mask_registerHandler(":dualbind", DualbindHandler);
        DualbindHandler.prototype = {
            constructor: DualbindHandler,
            renderEnd: function(elements, model, cntx, container) {
                this.provider = BindingProvider.create(model, container, this);
                if (this.components) for (var i = 0, x, length = this.components.length; i < length; i++) {
                    x = this.components[i];
                    if (":validate" === x.compoName) (this.validations || (this.validations = [])).push(x);
                }
                if (!this.attr["no-validation"] && !this.validations) {
                    var Validate = model.Validate, prop = this.provider.value;
                    if (null == Validate && prop.indexOf(".") !== -1) {
                        var parts = prop.split("."), i = 0, imax = parts.length, obj = model[parts[0]];
                        while (null == Validate && ++i < imax && obj) {
                            Validate = obj.Validate;
                            obj = obj[parts[i]];
                        }
                        prop = parts.slice(i).join(".");
                    }
                    var validator = Validate && Validate[prop];
                    if ("function" === typeof validator) {
                        validator = mask.getHandler(":validate").createCustom(container, validator);
                        (this.validations || (this.validations = [])).push(validator);
                    }
                }
                BindingProvider.bind(this.provider);
            },
            dispose: function() {
                if (this.provider && "function" === typeof this.provider.dispose) this.provider.dispose();
            },
            handlers: {
                attr: {
                    "x-signal": function() {}
                }
            }
        };
        !function() {
            var class_INVALID = "-validate-invalid";
            mask.registerValidator = function(type, validator) {
                Validators[type] = validator;
            };
            function Validate() {}
            __mask_registerHandler(":validate", Validate);
            Validate.prototype = {
                constructor: Validate,
                attr: {},
                renderStart: function(model, cntx, container) {
                    this.element = container;
                    if (this.attr.value) {
                        var validatorFn = Validate.resolveFromModel(model, this.attr.value);
                        if (validatorFn) this.validators = [ new Validator(validatorFn) ];
                    }
                },
                validate: function(input, element, oncancel) {
                    if (null == element) element = this.element;
                    if (this.attr) {
                        if (null == input && this.attr.getter) input = obj_getProperty({
                            node: this,
                            element: element
                        }, this.attr.getter);
                        if (null == input && this.attr.value) input = obj_getProperty(this.model, this.attr.value);
                    }
                    if (null == this.validators) this.initValidators();
                    for (var i = 0, x, imax = this.validators.length; i < imax; i++) {
                        x = this.validators[i].validate(input);
                        if (x && !this.attr.silent) {
                            this.notifyInvalid(element, x, oncancel);
                            return false;
                        }
                    }
                    this.makeValid(element);
                    return true;
                },
                notifyInvalid: function(element, message, oncancel) {
                    return notifyInvalid(element, message, oncancel);
                },
                makeValid: function(element) {
                    return makeValid(element);
                },
                initValidators: function() {
                    this.validators = [];
                    for (var key in this.attr) {
                        switch (key) {
                          case "message":
                          case "value":
                          case "getter":
                            continue;
                        }
                        if (key in Validators === false) {
                            log_error("Unknown Validator:", key, this);
                            continue;
                        }
                        var x = Validators[key];
                        this.validators.push(new Validator(x(this.attr[key], this), this.attr.message));
                    }
                }
            };
            Validate.resolveFromModel = function(model, property) {
                return obj_getProperty(model.Validate, property);
            };
            Validate.createCustom = function(element, validator) {
                var validate = new Validate();
                validate.element = element;
                validate.validators = [ new Validator(validator) ];
                return validate;
            };
            function Validator(fn, defaultMessage) {
                this.fn = fn;
                this.message = defaultMessage;
            }
            Validator.prototype.validate = function(value) {
                var result = this.fn(value);
                if (false === result) return this.message || "Invalid - " + value;
                return result;
            };
            function notifyInvalid(element, message, oncancel) {
                log_warn("Validate Notification:", element, message);
                var next = domLib(element).next("." + class_INVALID);
                if (0 === next.length) next = domLib("<div>").addClass(class_INVALID).html("<span></span><button>cancel</button>").insertAfter(element);
                return next.children("button").off().on("click", function() {
                    next.hide();
                    oncancel && oncancel();
                }).end().children("span").text(message).end().show();
            }
            function makeValid(element) {
                return domLib(element).next("." + class_INVALID).hide();
            }
            __mask_registerHandler(":validate:message", Compo({
                template: "div." + class_INVALID + ' { span > "~[bind:message]" button > "~[cancel]" }',
                onRenderStart: function(model) {
                    if ("string" === typeof model) model = {
                        message: model
                    };
                    if (!model.cancel) model.cancel = "cancel";
                    this.model = model;
                },
                compos: {
                    button: "$: button"
                },
                show: function(message, oncancel) {
                    var that = this;
                    this.model.message = message;
                    this.compos.button.off().on(function() {
                        that.hide();
                        oncancel && oncancel();
                    });
                    this.$.show();
                },
                hide: function() {
                    this.$.hide();
                }
            }));
            var Validators = {
                match: function(match) {
                    return function(str) {
                        return new RegExp(match).test(str);
                    };
                },
                unmatch: function(unmatch) {
                    return function(str) {
                        return !new RegExp(unmatch).test(str);
                    };
                },
                minLength: function(min) {
                    return function(str) {
                        return str.length >= parseInt(min, 10);
                    };
                },
                maxLength: function(max) {
                    return function(str) {
                        return str.length <= parseInt(max, 10);
                    };
                },
                check: function(condition, node) {
                    return function(str) {
                        return expression_eval("x" + condition, node.model, {
                            x: str
                        }, node);
                    };
                }
            };
        }();
        function ValidateGroup() {}
        __mask_registerHandler(":validate:group", ValidateGroup);
        ValidateGroup.prototype = {
            constructor: ValidateGroup,
            validate: function() {
                var validations = getValidations(this);
                for (var i = 0, x, length = validations.length; i < length; i++) {
                    x = validations[i];
                    if (!x.validate()) return false;
                }
                return true;
            }
        };
        function getValidations(component, out) {
            if (null == out) out = [];
            if (null == component.components) return out;
            var compos = component.components;
            for (var i = 0, x, length = compos.length; i < length; i++) {
                x = compos[i];
                if ("validate" === x.compoName) {
                    out.push(x);
                    continue;
                }
                getValidations(x);
            }
            return out;
        }
        !function() {
            function attr_strReplace(attrValue, currentValue, newValue) {
                if (!attrValue) return newValue;
                if (null == currentValue || "" === currentValue) return attrValue + " " + newValue;
                return attrValue.replace(currentValue, newValue);
            }
            function refresherDelegate_NODE(element) {
                return function(value) {
                    element.textContent = value;
                };
            }
            function refresherDelegate_ATTR(element, attrName, currentValue) {
                return function(value) {
                    var currentAttr = element.getAttribute(attrName), attr = attr_strReplace(currentAttr, currentValue, value);
                    element.setAttribute(attrName, attr);
                    currentValue = value;
                };
            }
            function refresherDelegate_PROP(element, attrName, currentValue) {
                return function(value) {
                    switch (typeof element[attrName]) {
                      case "boolean":
                        currentValue = element[attrName] = !!value;
                        return;

                      case "number":
                        currentValue = element[attrName] = Number(value);
                        return;

                      case "string":
                        currentValue = element[attrName] = attr_strReplace(element[attrName], currentValue, value);
                        return;

                      default:
                        log_warn("Unsupported elements property type", attrName);
                        return;
                    }
                };
            }
            function create_refresher(type, expr, element, currentValue, attrName) {
                if ("node" === type) return refresherDelegate_NODE(element);
                if ("attr" === type) {
                    switch (attrName) {
                      case "value":
                      case "disabled":
                      case "checked":
                      case "selected":
                      case "selectedIndex":
                        return refresherDelegate_PROP(element, attrName, currentValue);
                    }
                    return refresherDelegate_ATTR(element, attrName, currentValue);
                }
                throw Error("Unexpected binder type: " + type);
            }
            function bind(current, expr, model, ctx, element, controller, attrName, type) {
                var refresher = create_refresher(type, expr, element, current, attrName), binder = expression_createBinder(expr, model, ctx, controller, refresher);
                expression_bind(expr, model, ctx, controller, binder);
                compo_attachDisposer(controller, function() {
                    expression_unbind(expr, model, controller, binder);
                });
            }
            __mask_registerUtil("bind", {
                mode: "partial",
                current: null,
                element: null,
                nodeRenderStart: function(expr, model, ctx, element, controller) {
                    var current = expression_eval(expr, model, ctx, controller);
                    this.element = document.createTextNode(current);
                    return this.current = current;
                },
                node: function(expr, model, ctx, element, controller) {
                    bind(this.current, expr, model, ctx, this.element, controller, null, "node");
                    return this.element;
                },
                attrRenderStart: function(expr, model, ctx, element, controller) {
                    return this.current = expression_eval(expr, model, ctx, controller);
                },
                attr: function(expr, model, ctx, element, controller, attrName) {
                    bind(this.current, expr, model, ctx, element, controller, attrName, "attr");
                    return this.current;
                }
            });
        }();
        __mask_registerAttrHandler("xx-visible", function(node, attrValue, model, cntx, element, controller) {
            var binder = expression_createBinder(attrValue, model, cntx, controller, function(value) {
                element.style.display = value ? "" : "none";
            });
            expression_bind(attrValue, model, cntx, controller, binder);
            compo_attachDisposer(controller, function() {
                expression_unbind(attrValue, model, controller, binder);
            });
            if (!expression_eval(attrValue, model, cntx, controller)) element.style.display = "none";
        });
        __mask_registerAttrHandler("x-toggle", "client", function(node, attrValue, model, ctx, element, controller) {
            var event = attrValue.substring(0, attrValue.indexOf(":")), expression = attrValue.substring(event.length + 1), ref = expression_varRefs(expression);
            if ("string" !== typeof ref) ref = ref[0];
            __dom_addEventListener(element, event, function() {
                var value = expression_eval(expression, model, ctx, controller);
                obj_setProperty(model, ref, value);
            });
        });
        __mask_registerAttrHandler("x-class-toggle", "client", function(node, attrValue, model, ctx, element, controller) {
            var event = attrValue.substring(0, attrValue.indexOf(":")), $class = attrValue.substring(event.length + 1).trim();
            __dom_addEventListener(element, event, function() {
                domLib(element).toggleClass($class);
            });
        });
        !function() {
            var custom_Statements = mask.getStatement();
            var _getNodes, _renderElements, _renderPlaceholder, _compo_initAndBind, els_toggle;
            !function() {
                _getNodes = function(name, node, model, ctx, controller) {
                    return custom_Statements[name].getNodes(node, model, ctx, controller);
                };
                _renderElements = function(nodes, model, ctx, container, ctr) {
                    if (null == nodes) return null;
                    var elements = [];
                    builder_build(nodes, model, ctx, container, ctr, elements);
                    return elements;
                };
                _renderPlaceholder = function(compo, container) {
                    compo.placeholder = document.createComment("");
                    container.appendChild(compo.placeholder);
                };
                _compo_initAndBind = function(compo, node, model, ctx, container, controller) {
                    compo.parent = controller;
                    compo.model = model;
                    compo.refresh = fn_proxy(compo.refresh, compo);
                    compo.binder = expression_createBinder(compo.expr, model, ctx, controller, compo.refresh);
                    expression_bind(compo.expr, model, ctx, controller, compo.binder);
                };
                els_toggle = function(els, state) {
                    if (null == els) return;
                    var isArray = "function" === typeof els.splice, imax = isArray ? els.length : 1, i = -1, x;
                    while (++i < imax) {
                        x = isArray ? els[i] : els;
                        x.style.display = state ? "" : "none";
                    }
                };
            }();
            !function() {
                mask.registerHandler("+if", {
                    meta: {
                        serializeNodes: true
                    },
                    render: function(model, ctx, container, ctr, children) {
                        var node = this, nodes = _getNodes("if", node, model, ctx, ctr), index = 0;
                        var next = node;
                        while (true) {
                            if (next.nodes === nodes) break;
                            index++;
                            next = node.nextSibling;
                            if (null == next || "else" !== next.tagName) {
                                index = null;
                                break;
                            }
                        }
                        this.attr["switch-index"] = index;
                        return _renderElements(nodes, model, ctx, container, ctr, children);
                    },
                    renderEnd: function(els, model, ctx, container, ctr) {
                        var compo = new IFStatement(), index = this.attr["switch-index"];
                        compo.placeholder = document.createComment("");
                        container.appendChild(compo.placeholder);
                        initialize(compo, this, index, els, model, ctx, container, ctr);
                        return compo;
                    },
                    serializeNodes: function(current) {
                        var nodes = [ current ];
                        while (true) {
                            current = current.nextSibling;
                            if (null == current || "else" !== current.tagName) break;
                            nodes.push(current);
                        }
                        return mask.stringify(nodes);
                    }
                });
                function IFStatement() {}
                IFStatement.prototype = {
                    compoName: "+if",
                    ctx: null,
                    model: null,
                    controller: null,
                    index: null,
                    Switch: null,
                    binder: null,
                    refresh: function() {
                        var compo = this, switch_ = compo.Switch, imax = switch_.length, i = -1, expr, item, index = 0;
                        var currentIndex = compo.index, model = compo.model, ctx = compo.ctx, ctr = compo.controller;
                        while (++i < imax) {
                            expr = switch_[i].node.expression;
                            if (null == expr) break;
                            if (expression_eval(expr, model, ctx, ctr)) break;
                        }
                        if (currentIndex === i) return;
                        if (null != currentIndex) els_toggle(switch_[currentIndex].elements, false);
                        if (i === imax) {
                            compo.index = null;
                            return;
                        }
                        this.index = i;
                        var current = switch_[i];
                        if (null != current.elements) {
                            els_toggle(current.elements, true);
                            return;
                        }
                        var frag = mask.render(current.node.nodes, model, ctx, null, ctr);
                        var els = frag.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? _Array_slice.call(frag.childNodes) : frag;
                        dom_insertBefore(frag, compo.placeholder);
                        current.elements = els;
                    },
                    dispose: function() {
                        var switch_ = this.Switch, imax = switch_.length, i = -1, x, expr;
                        while (++i < imax) {
                            x = switch_[i];
                            expr = x.node.expression;
                            if (expr) expression_unbind(expr, this.model, this.controller, this.binder);
                            x.node = null;
                            x.elements = null;
                        }
                        this.controller = null;
                        this.model = null;
                        this.ctx = null;
                    }
                };
                function initialize(compo, node, index, elements, model, ctx, container, ctr) {
                    compo.model = model;
                    compo.ctx = ctx;
                    compo.controller = ctr;
                    compo.refresh = fn_proxy(compo.refresh, compo);
                    compo.binder = expression_createListener(compo.refresh);
                    compo.index = index;
                    compo.Switch = [ {
                        node: node,
                        elements: null
                    } ];
                    expression_bind(node.expression, model, ctx, ctr, compo.binder);
                    while (true) {
                        node = node.nextSibling;
                        if (null == node || "else" !== node.tagName) break;
                        compo.Switch.push({
                            node: node,
                            elements: null
                        });
                        if (node.expression) expression_bind(node.expression, model, ctx, ctr, compo.binder);
                    }
                    if (null != index) compo.Switch[index].elements = elements;
                }
            }();
            !function() {
                var $Switch = custom_Statements["switch"], attr_SWITCH = "switch-index";
                var _nodes, _index;
                mask.registerHandler("+switch", {
                    meta: {
                        serializeNodes: true
                    },
                    serializeNodes: function(current) {
                        return mask.stringify(current);
                    },
                    render: function(model, ctx, container, ctr, children) {
                        var value = expression_eval(this.expression, model, ctx, ctr);
                        resolveNodes(value, this.nodes, model, ctx, ctr);
                        if (null == _nodes) return null;
                        this.attr[attr_SWITCH] = _index;
                        return _renderElements(_nodes, model, ctx, container, ctr, children);
                    },
                    renderEnd: function(els, model, ctx, container, ctr) {
                        var compo = new SwitchStatement(), index = this.attr[attr_SWITCH];
                        _renderPlaceholder(compo, container);
                        initialize(compo, this, index, els, model, ctx, container, ctr);
                        return compo;
                    }
                });
                function SwitchStatement() {}
                SwitchStatement.prototype = {
                    compoName: "+switch",
                    ctx: null,
                    model: null,
                    controller: null,
                    index: null,
                    nodes: null,
                    Switch: null,
                    binder: null,
                    refresh: function(value) {
                        var compo = this, switch_ = compo.Switch, imax = switch_.length, i = -1, expr, item, index = 0;
                        var currentIndex = compo.index, model = compo.model, ctx = compo.ctx, ctr = compo.controller;
                        resolveNodes(value, compo.nodes, model, ctx, ctr);
                        if (_index === currentIndex) return;
                        if (null != currentIndex) els_toggle(switch_[currentIndex], false);
                        if (null == _index) {
                            compo.index = null;
                            return;
                        }
                        this.index = _index;
                        var elements = switch_[_index];
                        if (null != elements) {
                            els_toggle(elements, true);
                            return;
                        }
                        var frag = mask.render(_nodes, model, ctx, null, ctr);
                        var els = frag.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? _Array_slice.call(frag.childNodes) : frag;
                        dom_insertBefore(frag, compo.placeholder);
                        switch_[_index] = els;
                    },
                    dispose: function() {
                        expression_unbind(this.expr, this.model, this.controller, this.binder);
                        this.controller = null;
                        this.model = null;
                        this.ctx = null;
                        var switch_ = this.Switch, key, els, i, imax;
                        for (key in switch_) {
                            els = switch_[key];
                            if (null == els) continue;
                            imax = els.length;
                            i = -1;
                            while (++i < imax) if (null != els[i].parentNode) els[i].parentNode.removeChild(els[i]);
                        }
                    }
                };
                function resolveNodes(val, nodes, model, ctx, ctr) {
                    _nodes = $Switch.getNodes(val, nodes, model, ctx, ctr);
                    _index = null;
                    if (null == _nodes) return;
                    var imax = nodes.length, i = -1;
                    while (++i < imax) if (nodes[i].nodes === _nodes) break;
                    _index = i === imax ? null : i;
                }
                function initialize(compo, node, index, elements, model, ctx, container, ctr) {
                    compo.ctx = ctx;
                    compo.expr = node.expression;
                    compo.model = model;
                    compo.controller = ctr;
                    compo.index = index;
                    compo.nodes = node.nodes;
                    compo.refresh = fn_proxy(compo.refresh, compo);
                    compo.binder = expression_createBinder(compo.expr, model, ctx, ctr, compo.refresh);
                    compo.Switch = new Array(node.nodes.length);
                    if (null != index) compo.Switch[index] = elements;
                    expression_bind(node.expression, model, ctx, ctr, compo.binder);
                }
            }();
            !function() {
                var $With = custom_Statements["with"];
                mask.registerHandler("+with", {
                    meta: {
                        serializeNodes: true
                    },
                    render: function(model, ctx, container, ctr, childs) {
                        var val = expression_eval_strict(this.expression, model, ctx, ctr);
                        return build(this.nodes, val, ctx, container, ctr);
                    },
                    renderEnd: function(els, model, ctx, container, ctr) {
                        var compo = new WithStatement(this);
                        compo.elements = els;
                        compo.model = model;
                        compo.parent = ctr;
                        compo.refresh = fn_proxy(compo.refresh, compo);
                        compo.binder = expression_createBinder(compo.expr, model, ctx, ctr, compo.refresh);
                        expression_bind(compo.expr, model, ctx, ctr, compo.binder);
                        _renderPlaceholder(compo, container);
                        return compo;
                    }
                });
                function WithStatement(node) {
                    this.expr = node.expression;
                    this.nodes = node.nodes;
                }
                WithStatement.prototype = {
                    compoName: "+with",
                    elements: null,
                    binder: null,
                    model: null,
                    parent: null,
                    refresh: function(val) {
                        dom_removeAll(this.elements);
                        if (this.components) {
                            var imax = this.components.length, i = -1;
                            while (++i < imax) Compo.dispose(this.components[i]);
                            this.components.length = 0;
                        }
                        var fragment = document.createDocumentFragment();
                        this.elements = build(this.nodes, val, null, fragment, this);
                        dom_insertBefore(fragment, this.placeholder);
                        compo_inserted(this);
                    },
                    dispose: function() {
                        expression_unbind(this.expr, this.model, this.parent, this.binder);
                        this.parent = null;
                        this.model = null;
                        this.ctx = null;
                    }
                };
                function build(nodes, model, ctx, container, controller) {
                    var els = [];
                    builder_build(nodes, model, ctx, container, controller, els);
                    return els;
                }
            }();
            !function() {
                var $Visible = custom_Statements["visible"];
                mask.registerHandler("+visible", {
                    meta: {
                        serializeNodes: true
                    },
                    render: function(model, ctx, container, ctr, childs) {
                        return build(this.nodes, model, ctx, container, ctr);
                    },
                    renderEnd: function(els, model, ctx, container, ctr) {
                        var compo = new VisibleStatement(this);
                        compo.elements = els;
                        compo.model = model;
                        compo.parent = ctr;
                        compo.refresh = fn_proxy(compo.refresh, compo);
                        compo.binder = expression_createBinder(compo.expr, model, ctx, ctr, compo.refresh);
                        expression_bind(compo.expr, model, ctx, ctr, compo.binder);
                        compo.refresh();
                        return compo;
                    }
                });
                function VisibleStatement(node) {
                    this.expr = node.expression;
                    this.nodes = node.nodes;
                }
                VisibleStatement.prototype = {
                    compoName: "+visible",
                    elements: null,
                    binder: null,
                    model: null,
                    parent: null,
                    refresh: function() {
                        var isVisible = expression_eval(this.expr, this.model, this.ctx, this);
                        $Visible.toggle(this.elements, isVisible);
                    },
                    dispose: function() {
                        expression_unbind(this.expr, this.model, this.parent, this.binder);
                        this.parent = null;
                        this.model = null;
                        this.ctx = null;
                    }
                };
                function build(nodes, model, ctx, container, ctr) {
                    var els = [];
                    builder_build(nodes, model, ctx, container, ctr, els);
                    return els;
                }
            }();
            !function() {
                function arr_createRefs(array) {
                    var imax = array.length, i = -1, x;
                    while (++i < imax) {
                        x = array[i];
                        switch (typeof x) {
                          case "string":
                          case "number":
                          case "boolean":
                            array[i] = Object(x);
                        }
                    }
                }
                function list_sort(self, array) {
                    var compos = self.node.components, i = 0, imax = compos.length, j = 0, jmax = null, element = null, compo = null, fragment = document.createDocumentFragment(), sorted = [];
                    for (;i < imax; i++) {
                        compo = compos[i];
                        if (null == compo.elements || 0 === compo.elements.length) continue;
                        for (j = 0, jmax = compo.elements.length; j < jmax; j++) {
                            element = compo.elements[j];
                            element.parentNode.removeChild(element);
                        }
                    }
                    outer: for (j = 0, jmax = array.length; j < jmax; j++) {
                        for (i = 0; i < imax; i++) if (array[j] === self._getModel(compos[i])) {
                            sorted[j] = compos[i];
                            continue outer;
                        }
                        log_warn("No Model Found for", array[j]);
                    }
                    for (i = 0, imax = sorted.length; i < imax; i++) {
                        compo = sorted[i];
                        if (null == compo.elements || 0 === compo.elements.length) continue;
                        for (j = 0, jmax = compo.elements.length; j < jmax; j++) {
                            element = compo.elements[j];
                            fragment.appendChild(element);
                        }
                    }
                    self.components = self.node.components = sorted;
                    dom_insertBefore(fragment, self.placeholder);
                }
                function list_update(self, deleteIndex, deleteCount, insertIndex, rangeModel) {
                    var node = self.node, compos = node.components;
                    if (null == compos) compos = node.components = [];
                    var prop1 = self.prop1, prop2 = self.prop2, type = self.type, ctx = self.ctx, ctr = self.node;
                    if (null != deleteIndex && null != deleteCount) {
                        var i = deleteIndex, length = deleteIndex + deleteCount;
                        if (length > compos.length) length = compos.length;
                        for (;i < length; i++) if (compo_dispose(compos[i], node)) {
                            i--;
                            length--;
                        }
                    }
                    if (null != insertIndex && rangeModel && rangeModel.length) {
                        var i = compos.length, imax, fragment = self._build(node, rangeModel, ctx, ctr), new_ = compos.splice(i);
                        compo_fragmentInsert(node, insertIndex, fragment, self.placeholder);
                        compos.splice.apply(compos, [ insertIndex, 0 ].concat(new_));
                        i = 0;
                        imax = new_.length;
                        for (;i < imax; i++) __Compo.signal.emitIn(new_[i], "domInsert");
                    }
                }
                function list_remove(self, removed) {
                    var compos = self.components, i = compos.length, x;
                    while (--i > -1) {
                        x = compos[i];
                        if (removed.indexOf(x.model) === -1) continue;
                        compo_dispose(x, self.node);
                    }
                }
                var LoopStatementProto = {
                    model: null,
                    parent: null,
                    refresh: function(value, method, args, result) {
                        var i = 0, x, imax;
                        var node = this.node, model = this.model, ctx = this.ctx, ctr = this.node;
                        if (null == method) {
                            var compos = node.components;
                            if (null != compos) {
                                var imax = compos.length, i = -1;
                                while (++i < imax) if (compo_dispose(compos[i], node)) {
                                    i--;
                                    imax--;
                                }
                                compos.length = 0;
                            }
                            var frag = this._build(node, value, ctx, ctr);
                            dom_insertBefore(frag, this.placeholder);
                            arr_each(node.components, compo_inserted);
                            return;
                        }
                        var array = value;
                        arr_createRefs(value);
                        switch (method) {
                          case "push":
                            list_update(this, null, null, array.length - 1, array.slice(array.length - 1));
                            break;

                          case "pop":
                            list_update(this, array.length, 1);
                            break;

                          case "unshift":
                            list_update(this, null, null, 0, array.slice(0, 1));
                            break;

                          case "shift":
                            list_update(this, 0, 1);
                            break;

                          case "splice":
                            var sliceStart = args[0], sliceRemove = 1 === args.length ? this.components.length : args[1], sliceAdded = args.length > 2 ? array.slice(args[0], args.length - 2 + args[0]) : null;
                            list_update(this, sliceStart, sliceRemove, sliceStart, sliceAdded);
                            break;

                          case "sort":
                          case "reverse":
                            list_sort(this, array);
                            break;

                          case "remove":
                            if (null != result && result.length) list_remove(this, result);
                        }
                    },
                    dispose: function() {
                        expression_unbind(this.expr, this.model, this.parent, this.binder);
                    }
                };
                !function() {
                    var For = custom_Statements["for"], attr_PROP_1 = "for-prop-1", attr_PROP_2 = "for-prop-2", attr_TYPE = "for-type", attr_EXPR = "for-expr";
                    mask.registerHandler("+for", {
                        meta: {
                            serializeNodes: true
                        },
                        serializeNodes: function(node) {
                            return mask.stringify(node);
                        },
                        render: function(model, ctx, container, controller, childs) {
                            var directive = For.parseFor(this.expression), attr = this.attr;
                            attr[attr_PROP_1] = directive[0];
                            attr[attr_PROP_2] = directive[1];
                            attr[attr_TYPE] = directive[2];
                            attr[attr_EXPR] = directive[3];
                            var value = expression_eval(directive[3], model, ctx, controller);
                            if (null == value) return;
                            if (is_Array(value)) arr_createRefs(value);
                            For.build(value, directive, this.nodes, model, ctx, container, this, childs);
                        },
                        renderEnd: function(els, model, ctx, container, controller) {
                            var compo = new ForStatement(this, this.attr);
                            compo.placeholder = document.createComment("");
                            container.appendChild(compo.placeholder);
                            _compo_initAndBind(compo, this, model, ctx, container, controller);
                            return compo;
                        },
                        getHandler: function(name, model) {
                            return For.getHandler(name, model);
                        }
                    });
                    function initialize(compo, node, els, model, ctx, container, controller) {
                        compo.parent = controller;
                        compo.model = model;
                        compo.refresh = fn_proxy(compo.refresh, compo);
                        compo.binder = expression_createBinder(compo.expr, model, ctx, controller, compo.refresh);
                        expression_bind(compo.expr, model, ctx, controller, compo.binder);
                    }
                    function ForStatement(node, attr) {
                        this.prop1 = attr[attr_PROP_1];
                        this.prop2 = attr[attr_PROP_2];
                        this.type = attr[attr_TYPE];
                        this.expr = attr[attr_EXPR];
                        if (null == node.components) node.components = [];
                        this.node = node;
                        this.components = node.components;
                    }
                    ForStatement.prototype = {
                        compoName: "+for",
                        model: null,
                        parent: null,
                        refresh: LoopStatementProto.refresh,
                        dispose: LoopStatementProto.dispose,
                        _getModel: function(compo) {
                            return compo.scope[this.prop1];
                        },
                        _build: function(node, model, ctx, component) {
                            var nodes = For.getNodes(node.nodes, model, this.prop1, this.prop2, this.type);
                            return builder_build(nodes, this.model, ctx, null, component);
                        }
                    };
                }();
                !function() {
                    var Each = custom_Statements["each"];
                    mask.registerHandler("+each", {
                        render: function(model, ctx, container, controller, children) {
                            var node = this;
                            var array = expression_eval(node.expression, model, ctx, controller);
                            if (null == array) return;
                            arr_createRefs(array);
                            build(node.nodes, array, ctx, container, node, children);
                        },
                        renderEnd: function(els, model, ctx, container, controller) {
                            var compo = new EachStatement(this, this.attr);
                            compo.placeholder = document.createComment("");
                            container.appendChild(compo.placeholder);
                            _compo_initAndBind(compo, this, model, ctx, container, controller);
                            return compo;
                        }
                    });
                    function build(nodes, array, ctx, container, controller, elements) {
                        var imax = array.length, i = -1, itemCtr;
                        while (++i < imax) {
                            itemCtr = Each.createItem(i, nodes, controller);
                            builder_build(itemCtr, array[i], ctx, container, controller, elements);
                        }
                    }
                    function EachStatement(node, attr) {
                        this.expr = node.expression;
                        this.nodes = node.nodes;
                        if (null == node.components) node.components = [];
                        this.node = node;
                        this.components = node.components;
                    }
                    EachStatement.prototype = {
                        compoName: "+each",
                        refresh: LoopStatementProto.refresh,
                        dispose: LoopStatementProto.dispose,
                        _getModel: function(compo) {
                            return compo.model;
                        },
                        _build: function(node, model, ctx, component) {
                            var fragment = document.createDocumentFragment();
                            build(node.nodes, model, ctx, fragment, component);
                            return fragment;
                        }
                    };
                }();
            }();
        }();
    }(Mask, Compo);
    Mask.Compo = Compo;
    Mask.jmask = jmask;
    return exports.mask = Mask;
});

include.getResourceById("/bower_components/maskjs/lib/mask.js", "js").readystatechanged(3);

include.setCurrent({
    id: "/bower_components/ruta/lib/ruta.js",
    namespace: "",
    url: "/bower_components/ruta/lib/ruta.js"
});

!function(root, factory) {
    if (null == root) root = "undefined" !== typeof window && "undefined" !== typeof document ? window : global;
    root.ruta = factory(root);
}(this, function(global) {
    var mask = global.mask || Mask;
    var _cfg_isStrict = true, _Array_slice = Array.prototype.slice;
    var log_error;
    !function() {
        log_error = function() {
            var args = _Array_slice.call(arguments);
            console.error.apply(console, [ "Ruta" ].concat(args));
        };
    }();
    var path_normalize, path_split, path_join, path_fromCLI;
    !function() {
        path_normalize = function(str) {
            var length = str.length, i = 0, j = length - 1;
            for (;i < length; i++) {
                if ("/" === str[i]) continue;
                break;
            }
            for (;j > i; j--) {
                if ("/" === str[j]) continue;
                break;
            }
            return str.substring(i, j + 1);
        };
        path_split = function(path) {
            path = path_normalize(path);
            return "" === path ? [] : path.split("/");
        };
        path_join = function(pathParts) {
            return "/" + pathParts.join("/");
        };
        path_fromCLI = function(commands) {
            if ("string" === typeof commands) commands = cli_split(commands);
            var parts = cli_parseArguments(commands);
            return parts_serialize(parts);
        };
        function cli_split(string) {
            var args = string.trim().split(/\s+/);
            var imax = args.length, i = -1, c, arg;
            while (++i < imax) {
                arg = args[i];
                if (0 === arg.length) continue;
                c = arg[0];
                if ('"' !== c && "'" !== c) continue;
                var start = i;
                for (;i < imax; i++) {
                    arg = args[i];
                    if (arg[arg.length - 1] === c) {
                        var str = args.splice(start, i - start + 1).join(" ").slice(1, -1);
                        args.splice(start, 0, str);
                        imax = args.length;
                        break;
                    }
                }
            }
            return args;
        }
        function cli_parseArguments(argv) {
            var imax = argv.length, i = 0, params = {}, args = [], key, val, x;
            for (;i < imax; i++) {
                x = argv[i];
                if ("-" === x[0]) {
                    key = x.replace(/^[\-]+/, "");
                    if (i < imax - 1 && "-" !== argv[i + 1][0]) {
                        val = argv[i + 1];
                        i++;
                    } else val = true;
                    params[key] = val;
                    continue;
                }
                args.push(x);
            }
            return {
                path: args,
                query: params
            };
        }
    }();
    var query_deserialize, query_serialize;
    !function() {
        query_deserialize = function(query, delimiter) {
            if (null == delimiter) delimiter = "&";
            var obj = {}, parts = query.split(delimiter), i = 0, imax = parts.length, x, val;
            for (;i < imax; i++) {
                x = parts[i].split("=");
                val = null == x[1] ? "" : decode(x[1]);
                obj_setProperty(obj, x[0], val);
            }
            return obj;
        };
        query_serialize = function(params, delimiter) {
            if (null == delimiter) delimiter = "&";
            var query = "", key, val;
            for (key in params) {
                val = params[key];
                if (null == val) continue;
                if ("boolean" === typeof val) val = null;
                query = query + (query ? delimiter : "") + key;
                if (null != val) query += "=" + encode(val);
            }
            return query;
        };
        function obj_setProperty(obj, property, value) {
            var chain = property.split("."), imax = chain.length, i = -1, key;
            while (++i < imax - 1) {
                key = chain[i];
                if (null == obj[key]) obj[key] = {};
                obj = obj[key];
            }
            obj[chain[i]] = value;
        }
        function decode(str) {
            try {
                return decodeURIComponent(str);
            } catch (error) {
                log_error("decode:URI malformed");
                return "";
            }
        }
        function encode(str) {
            try {
                return encodeURIComponent(str);
            } catch (error) {
                log_error("encode:URI malformed");
                return "";
            }
        }
    }();
    var rgx_fromString, rgx_aliasMatcher, rgx_parsePartWithRegExpAlias;
    !function() {
        rgx_fromString = function(str, flags) {
            return new RegExp(str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"), flags);
        };
        rgx_aliasMatcher = function(str) {
            if ("^" === str[0]) return new RegExp(str);
            var groups = str.split("|");
            for (var i = 0, imax = groups.length; i < imax; i++) groups[i] = "^" + groups[i] + "$";
            return new RegExp(groups.join("|"));
        };
        rgx_parsePartWithRegExpAlias = function(str) {
            var pStart = str.indexOf("("), pEnd = str.lastIndexOf(")");
            if (pStart === -1 || pEnd === -1) {
                log_error("Expected alias part with regexp", str);
                return null;
            }
            var rgx = str.substring(pStart + 1, pEnd);
            return {
                alias: str.substring(1, pStart),
                matcher: rgx_aliasMatcher(rgx)
            };
        };
    }();
    var parts_serialize, parts_deserialize;
    !function() {
        parts_serialize = function(parts) {
            var path = path_join(parts.path);
            if (null == parts.query) return path;
            return path + "?" + query_serialize(parts.query, "&");
        };
        parts_deserialize = function(url) {
            var query = url.indexOf("?"), path = query === -1 ? url : url.substring(0, query);
            return {
                path: path_split(path),
                query: query === -1 ? null : query_deserialize(url.substring(query + 1), "&")
            };
        };
    }();
    var Routes = function() {
        var route_parseDefinition, route_parsePath;
        !function() {
            route_parseDefinition = function(route, definition) {
                var c = definition.charCodeAt(0);
                switch (c) {
                  case 33:
                    route.strict = true;
                    definition = definition.substring(1);
                    break;

                  case 94:
                    route.strict = false;
                    definition = definition.substring(1);
                    break;

                  case 40:
                    var start = 1, end = definition.length - 1;
                    if (41 !== definition.charCodeAt(definition.length - 1)) {
                        log_error("parser - expect group closing");
                        end++;
                    }
                    route.match = new RegExp(definition.substring(start, end));
                    return;
                }
                var parts = definition.split("/"), search, searchIndex, i = 0, imax = parts.length, x, c0, index, c1;
                var last = parts[imax - 1];
                searchIndex = last.indexOf("?");
                if (searchIndex > (1 === imax ? -1 : 0)) {
                    search = last.substring(searchIndex + 1);
                    parts[imax - 1] = last.substring(0, searchIndex);
                }
                var matcher = "", alias = null, strictCount = 0;
                var gettingMatcher = true, isOptional, isAlias, rgx;
                var array = route.path = [];
                for (;i < imax; i++) {
                    x = parts[i];
                    if ("" === x) continue;
                    c0 = x.charCodeAt(0);
                    c1 = x.charCodeAt(1);
                    isOptional = 63 === c0;
                    isAlias = 58 === (isOptional ? c1 : c0);
                    index = 0;
                    if (isOptional) index++;
                    if (isAlias) index++;
                    if (0 !== index) x = x.substring(index);
                    if (!isOptional && !gettingMatcher) log_error("Strict part found after optional", definition);
                    if (isOptional) gettingMatcher = false;
                    var bracketIndex = x.indexOf("(");
                    if (isAlias && bracketIndex !== -1) {
                        var end = x.length - 1;
                        if (")" !== x[end]) end += 1;
                        rgx = new RegExp(rgx_aliasMatcher(x.substring(bracketIndex + 1, end)));
                        x = x.substring(0, bracketIndex);
                    }
                    if (!isOptional && !isAlias) {
                        array.push(x);
                        continue;
                    }
                    if (isAlias) array.push({
                        alias: x,
                        matcher: rgx,
                        optional: isOptional
                    });
                }
                if (search) {
                    var query = route.query = {};
                    parts = search.split("&");
                    i = -1;
                    imax = parts.length;
                    var key, value, str, eqIndex;
                    while (++i < imax) {
                        str = parts[i];
                        eqIndex = str.indexOf("=");
                        if (eqIndex === -1) {
                            query[str] = "";
                            continue;
                        }
                        key = str.substring(0, eqIndex);
                        value = str.substring(eqIndex + 1);
                        if (40 === value.charCodeAt(0)) value = new RegExp(rgx_aliasMatcher(value));
                        query[key] = value;
                    }
                    if (0 === route.path.length) route.strict = false;
                }
            };
            route_parsePath = function(route, path) {
                var queryIndex = path.indexOf("?"), query = queryIndex === -1 ? null : path.substring(queryIndex + 1), current = {
                    path: path,
                    params: null == query ? {} : query_deserialize(query, "&")
                };
                if (route.query) for (var key in route.query) {
                    if ("?" === key[0]) key = key.substring(1);
                    if (":" === key[0]) {
                        var alias = rgx_parsePartWithRegExpAlias(key), name = alias.alias;
                        current.params[name] = getAliasedValue(current.params, alias.matcher);
                    }
                }
                if (queryIndex !== -1) path = path.substring(0, queryIndex);
                if (null != route.path) {
                    var pathArr = path_split(path), routePath = route.path, routeLength = routePath.length, imax = pathArr.length, i = 0, part, x;
                    for (;i < imax; i++) {
                        part = pathArr[i];
                        x = i < routeLength ? routePath[i] : null;
                        if (x) {
                            if ("string" === typeof x) continue;
                            if (x.alias) {
                                current.params[x.alias] = part;
                                continue;
                            }
                        }
                    }
                }
                return current;
            };
            function getAliasedValue(obj, matcher) {
                for (var key in obj) if (matcher.test(key)) return obj[key];
            }
        }();
        var route_match, route_isMatch;
        !function() {
            route_match = function(url, routes, currentMethod) {
                var parts = parts_deserialize(url);
                for (var i = 0, route, imax = routes.length; i < imax; i++) {
                    route = routes[i];
                    if (route_isMatch(parts, route, currentMethod)) {
                        route.current = route_parsePath(route, url);
                        return route;
                    }
                }
                return null;
            };
            route_isMatch = function(parts, route, currentMethod) {
                if (null != currentMethod && null != route.method && route.method !== currentMethod) return false;
                if (route.match) return route.match.test("string" === typeof parts ? parts : parts_serialize(parts));
                if ("string" === typeof parts) parts = parts_deserialize(parts);
                if (route.query) {
                    var query = parts.query, key, value;
                    if (null == query) return false;
                    for (key in route.query) {
                        value = route.query[key];
                        var c = key[0];
                        if (":" === c) {
                            var alias = rgx_parsePartWithRegExpAlias(key);
                            if (null == alias || false === hasKey(query, alias.matcher)) return false;
                            continue;
                        }
                        if ("?" === c) continue;
                        if ("string" === typeof value) {
                            if (null == query[key]) return false;
                            if (value && query[key] !== value) return false;
                            continue;
                        }
                        if (value.test && !value.test(query[key])) return false;
                    }
                }
                var routePath = route.path, routeLength = routePath.length;
                if (0 === routeLength) {
                    if (route.strict) return 0 === parts.path.length;
                    return true;
                }
                for (var i = 0, x, imax = parts.path.length; i < imax; i++) {
                    x = routePath[i];
                    if (i >= routeLength) return true !== route.strict;
                    if ("string" === typeof x) {
                        if (parts.path[i] === x) continue;
                        return false;
                    }
                    if (x.matcher && false === x.matcher.test(parts.path[i])) return false;
                    if (x.optional) return true;
                    if (x.alias) continue;
                    return false;
                }
                if (i < routeLength) return true === routePath[i].optional;
                return true;
            };
            function hasKey(obj, rgx) {
                for (var key in obj) if (rgx.test(key)) return true;
                return false;
            }
        }();
        var regexp_var = "([^\\\\]+)";
        function Route(definition, value) {
            this.method = 36 === definition.charCodeAt(0) ? definition.substring(1, definition.indexOf(" ")).toUpperCase() : null;
            if (null != this.method) definition = definition.substring(this.method.length + 2);
            this.strict = _cfg_isStrict;
            this.value = value;
            this.definition = definition;
            route_parseDefinition(this, definition);
        }
        Route.prototype = {
            path: null,
            query: null,
            value: null,
            current: null
        };
        function RouteCollection() {
            this.routes = [];
        }
        RouteCollection.prototype = {
            add: function(regpath, value) {
                this.routes.push(new Route(regpath, value));
                return this;
            },
            get: function(path, currentMethod) {
                return route_match(path, this.routes, currentMethod);
            },
            clear: function() {
                this.routes.length = 0;
                return this;
            }
        };
        RouteCollection.parse = function(definition, path) {
            var route = {};
            route_parseDefinition(route, definition);
            return route_parsePath(route, path);
        };
        return RouteCollection;
    }();
    var Location = function() {
        if ("undefined" === typeof window) return function() {};
        function HashEmitter(listener) {
            if ("undefined" === typeof window || "onhashchange" in window === false) return null;
            this.listener = listener;
            var that = this;
            window.onhashchange = function() {
                that.changed(location.hash);
            };
            return this;
        }
        !function() {
            function hash_normalize(hash) {
                return hash.replace(/^[!#/]+/, "/");
            }
            HashEmitter.prototype = {
                navigate: function(hash) {
                    if (null == hash) {
                        this.changed(location.hash);
                        return;
                    }
                    location.hash = hash;
                },
                changed: function(hash) {
                    this.listener.changed(hash_normalize(hash));
                },
                current: function() {
                    return hash_normalize(location.hash);
                }
            };
        }();
        function HistoryEmitter(listener) {
            if ("undefined" === typeof window) return null;
            if (!(window.history && window.history.pushState)) return null;
            var that = this;
            that.listener = listener;
            that.initial = location.pathname;
            window.onpopstate = function() {
                if (that.initial === location.pathname) {
                    that.initial = null;
                    return;
                }
                that.changed();
            };
            return that;
        }
        !function() {
            HistoryEmitter.prototype = {
                navigate: function(url) {
                    if (null == url) {
                        this.changed();
                        return;
                    }
                    history.pushState({}, null, url);
                    this.changed();
                },
                changed: function() {
                    this.listener.changed(location.pathname + location.search);
                },
                current: function() {
                    return location.pathname + location.search;
                }
            };
        }();
        function Location(collection, type) {
            this.collection = collection || new Routes();
            if (type) {
                var Constructor = "hash" === type ? HashEmitter : HistoryEmitter;
                this.emitter = new Constructor(this);
            }
            if (null == this.emitter) this.emitter = new HistoryEmitter(this);
            if (null == this.emitter) this.emitter = new HashEmitter(this);
            if (null == this.emitter) log_error("Router can not be initialized - (nor HistoryAPI / nor hashchange");
        }
        Location.prototype = {
            changed: function(path) {
                var item = this.collection.get(path);
                if (item) this.action(item);
            },
            action: function(route) {
                if ("function" === typeof route.value) {
                    var current = route.current;
                    route.value(route, current && current.params);
                }
            },
            navigate: function(url) {
                this.emitter.navigate(url);
            },
            current: function() {
                return this.collection.get(this.currentPath());
            },
            currentPath: function() {
                return this.emitter.current();
            }
        };
        return Location;
    }();
    var routes = new Routes(), router;
    function router_ensure() {
        if (null == router) router = new Location(routes);
        return router;
    }
    var Ruta = {
        Collection: Routes,
        setRouterType: function(type) {
            if (null == router) router = new Location(routes, type);
            return this;
        },
        setStrictBehaviour: function(isStrict) {
            _cfg_isStrict = isStrict;
            return this;
        },
        add: function(regpath, mix) {
            router_ensure();
            routes.add(regpath, mix);
            return this;
        },
        get: function(path) {
            return routes.get(path);
        },
        navigate: function(path) {
            router_ensure().navigate(path);
            return this;
        },
        current: function() {
            return router_ensure().current();
        },
        currentPath: function() {
            return router_ensure().currentPath();
        },
        notifyCurrent: function() {
            router_ensure().navigate();
            return this;
        },
        parse: Routes.parse,
        $utils: {
            pathFromCLI: path_fromCLI,
            query: {
                serialize: query_serialize,
                deserialize: query_deserialize
            }
        }
    };
    !function() {
        mask.registerAttrHandler("x-dynamic", function(node, value, model, ctx, tag) {
            tag.onclick = navigate;
        }, "client");
        function navigate(event) {
            event.preventDefault();
            event.stopPropagation();
            Ruta.navigate(this.href);
        }
    }();
    return Ruta;
});

include.getResourceById("/bower_components/ruta/lib/ruta.js", "js").readystatechanged(3);

include.setCurrent({
    id: "/js/app.js",
    namespace: "",
    url: "/js/app.js"
});

"use strict";

include.routes({
    model: "model/{0}.js",
    cntrl: "cntrl/{0}.js",
    compo: "compo/{0}/{1}.js"
}).cfg({
    lockToFolder: true
}).js({
    model: "Todos",
    cntrl: "input",
    compo: [ "todoList", "filter" ]
}).load("./app.mask::Template").ready(function(resp) {
    mask.registerHandler(":app", Compo({
        template: resp.load.Template,
        model: resp.Todos.fetch(),
        scope: {
            action: ""
        },
        slots: {
            newTask: function(event, title) {
                if (title) this.model.create(title);
            },
            removeAllCompleted: function() {
                this.model.del(function(x) {
                    return true === x.completed;
                });
            }
        },
        onRenderStart: function() {
            ruta.setRouterType("hash").add("/?:action", this.applyFilter.bind(this)).notifyCurrent();
        },
        applyFilter: function(route, params) {
            this.scope.action = params.action || "";
        }
    }));
    Compo.initialize(":app", document.body);
});

include.getResourceById("/js/app.js", "js").readystatechanged(3);

include.setCurrent({
    id: "/js/model/Todos.js",
    namespace: "model.Todos",
    url: "/js/model/Todos.js"
});

!function() {
    var Todo = Class({
        Base: Class.Serializable,
        title: "",
        completed: false
    });
    include.exports = Class.Collection(Todo, {
        Store: Class.LocalStore("todos-atmajs"),
        create: function(title) {
            return this.push({
                title: title
            }).save();
        },
        toggleAll: function(completed) {
            this.forEach(function(task) {
                task.completed = completed;
            }).save();
        },
        status: {
            count: 0,
            todoCount: 0,
            completedCount: 0
        },
        Override: {
            save: function() {
                return this.super(arguments).calcStatus();
            },
            del: function() {
                return this.super(arguments).calcStatus();
            },
            fetch: function() {
                return this.super(arguments).calcStatus();
            }
        },
        calcStatus: function() {
            var todos = 0;
            var completed = 0;
            this.forEach(function(todo) {
                todo.completed && ++completed || ++todos;
            });
            this.status.count = this.length;
            this.status.todoCount = todos;
            this.status.completedCount = completed;
            return this;
        }
    });
}();

include.getResourceById("/js/model/Todos.js", "js").readystatechanged(3);

include.setCurrent({
    id: "/js/cntrl/input.js",
    namespace: "cntrl.input",
    url: "/js/cntrl/input.js"
});

!function() {
    var ENTER_KEY = 13;
    var ESCAPE_KEY = 27;
    mask.registerHandler("todo:input", Compo({
        tagName: "input",
        attr: {
            type: "text",
            value: "~[title]",
            preserve: false
        },
        events: {
            keydown: function(event) {
                switch (event.which) {
                  case ENTER_KEY:
                    this.save();
                    event.preventDefault();
                    break;

                  case ESCAPE_KEY:
                    this.cancel();
                }
            },
            blur: "save"
        },
        focus: function() {
            this.$.focus();
        },
        cancel: function() {
            this.$.trigger("cancel");
            this.afterEdit();
        },
        save: function() {
            var value = this.$.val().trim();
            this.$.trigger("enter", value);
            this.afterEdit();
        },
        afterEdit: function() {
            this.$.val(this.attr.preserve ? this.model.title : "");
        }
    }));
}();

include.getResourceById("/js/cntrl/input.js", "js").readystatechanged(3);

include.setCurrent({
    id: "/js/compo/todoList/todoList.js",
    namespace: "compo.todoList",
    url: "/js/compo/todoList/todoList.js"
});

include.load("todoList.mask").js("todoTask/todoTask.js").done(function(response) {
    mask.registerHandler(":todoList", Compo({
        template: response.load.todoList,
        slots: {
            toggleAll: function(event) {
                var completed = event.currentTarget.checked;
                this.model.toggleAll(completed);
            },
            taskChanged: function() {
                this.model.save();
            },
            taskRemoved: function(event, task) {
                this.model.del(task);
            }
        }
    }));
});

include.getResourceById("/js/compo/todoList/todoList.js", "js").readystatechanged(3);

include.setCurrent({
    id: "/js/compo/todoList/todoTask/todoTask.js",
    namespace: "",
    url: "/js/compo/todoList/todoTask/todoTask.js"
});

include.load("todoTask.mask::Template").done(function(response) {
    var STATE_VIEW = "";
    var STATE_EDIT = "editing";
    mask.registerHandler(":todoTask", Compo({
        scope: {
            state: STATE_VIEW
        },
        template: response.load.Template,
        slots: {
            inputCanceled: "_editEnd",
            taskChanged: function() {
                if (!this.model.title) {
                    this.emitOut("taskRemoved");
                    return false;
                }
                this._editEnd();
            },
            taskRemoved: function() {
                this.remove();
                return [ this.model ];
            },
            edit: function() {
                this.scope.state = STATE_EDIT;
                this.compos.input.focus();
            }
        },
        compos: {
            input: "compo: todo:input"
        },
        _editEnd: function() {
            this.scope.state = STATE_VIEW;
        },
        _isVisible: function(completed, action) {
            if ("completed" === action && !completed) return false;
            if ("active" === action && completed) return false;
            return true;
        }
    }));
});

include.getResourceById("/js/compo/todoList/todoTask/todoTask.js", "js").readystatechanged(3);

include.setCurrent({
    id: "/js/compo/filter/filter.js",
    namespace: "compo.filter",
    url: "/js/compo/filter/filter.js"
});

include.load("filter.mask::Template").done(function(resp) {
    mask.registerHandler(":filter", Compo.createClass({
        template: resp.load.Template
    }));
});

include.getResourceById("/js/compo/filter/filter.js", "js").readystatechanged(3);

include.resumeStack();