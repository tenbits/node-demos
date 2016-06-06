include.pauseStack();

include.routes({});

include.register({
    css: [ {
        id: "/style.css",
        url: "/style.css",
        namespace: "",
        parent: "/"
    } ],
    js: [ {
        id: "/libs/mask.js",
        url: "/libs/mask.js",
        namespace: "",
        parent: "/"
    }, {
        id: "/libs/class.js",
        url: "/libs/class.js",
        namespace: "",
        parent: "/"
    } ]
});

include.setCurrent({
    id: "/libs/mask.js",
    namespace: "",
    url: "/libs/mask.js"
});

/*!
 * MaskJS v0.12.2
 * Part of the Atma.js Project
 * http://atmajs.com/
 *
 * MIT license
 * http://opensource.org/licenses/MIT
 *
 * (c) 2012, 2014 Atma.js and other contributors
 */
!function(root, factory) {
    "use strict";
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
    "use strict";
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
        var FOR_OF_ITEM = "for..of::item", FOR_IN_ITEM = "for..in::item";
        custom_Statements["for"] = {
            render: function(node, model, ctx, container, ctr, children) {
                parse_For(node.expression);
                var value = ExpressionUtil.eval(__ForDirective[3], model, ctx, ctr);
                if (null == value) return;
                build(value, __ForDirective, node.nodes, model, ctx, container, ctr, children);
            },
            build: build,
            parseFor: parse_For,
            createForNode: createForItemNode,
            getNodes: getNodes,
            getHandler: function(compoName, model) {
                return createForItemHandler(compoName, model);
            }
        };
        !function() {
            custom_Tags[FOR_OF_ITEM] = createBootstrapCompo(FOR_OF_ITEM);
            custom_Tags[FOR_IN_ITEM] = createBootstrapCompo(FOR_IN_ITEM);
            function createBootstrapCompo(name) {
                function For_Item() {}
                For_Item.prototype = {
                    meta: {
                        serializeScope: true
                    },
                    serializeScope: for_proto_serializeScope,
                    type: Dom.COMPONENT,
                    compoName: name,
                    renderEnd: handler_proto_renderEnd,
                    dispose: handler_proto_dispose
                };
                return For_Item;
            }
        }();
        function build(value, For, nodes, model, ctx, container, ctr, childs) {
            builder_build(getNodes(nodes, value, For[0], For[1], For[2], For[3]), model, ctx, container, ctr, childs);
        }
        function getNodes(nodes, value, prop1, prop2, type, expr) {
            if ("of" === type) {
                if (false === is_Array(value)) {
                    log_error("<ForStatement> Value is not enumerable", value);
                    return null;
                }
                return loop_Array(nodes, value, prop1, prop2, expr);
            }
            if ("in" === type) {
                if ("object" !== typeof value) {
                    log_warn("<ForStatement> Value is not an object", value);
                    return null;
                }
                if (is_Array(value)) log_warn("<ForStatement> Consider to use `for..of` for Arrays");
                return loop_Object(nodes, value, prop1, prop2, expr);
            }
        }
        function loop_Array(template, arr, prop1, prop2, expr) {
            var i = -1, imax = arr.length, nodes = new Array(imax), scope;
            while (++i < imax) {
                scope = {};
                scope[prop1] = arr[i];
                if (prop2) scope[prop2] = i;
                nodes[i] = createForItemNode(FOR_OF_ITEM, template, scope, i, prop1, expr);
            }
            return nodes;
        }
        function loop_Object(template, obj, prop1, prop2, expr) {
            var nodes = [], i = 0, scope, key, value;
            for (key in obj) {
                value = obj[key];
                scope = {};
                scope[prop1] = key;
                if (prop2) scope[prop2] = value;
                nodes[i++] = createForItemNode(FOR_IN_ITEM, template, scope, key, prop2, expr);
            }
            return nodes;
        }
        function createForItemNode(name, nodes, scope, key, propVal, expr) {
            return {
                type: Dom.COMPONENT,
                tagName: name,
                nodes: nodes,
                controller: createForItemHandler(name, scope, key, propVal, expr)
            };
        }
        function createForItemHandler(name, scope, key, propVal, expr) {
            return {
                meta: {
                    serializeScope: true
                },
                compoName: name,
                scope: scope,
                elements: null,
                propVal: propVal,
                key: key,
                expression: expr,
                renderEnd: handler_proto_renderEnd,
                dispose: handler_proto_dispose,
                serializeScope: for_proto_serializeScope
            };
        }
        function handler_proto_renderEnd(elements) {
            this.elements = elements;
        }
        function handler_proto_dispose() {
            if (this.elements) this.elements.length = 0;
        }
        function for_proto_serializeScope(scope, model) {
            var ctr = this, expr = ctr.expression, key = ctr.key, propVal = ctr.propVal;
            var val = scope[propVal];
            if (null != val && "object" === typeof val) scope[propVal] = "$ref:(" + expr + ')."' + key + '"';
            return scope;
        }
        var __ForDirective = [ "prop1", "prop2", "in|of", "expression" ], i_PROP_1 = 0, i_PROP_2 = 1, i_TYPE = 2, i_EXPR = 3, state_prop = 1, state_multiprop = 2, state_loopType = 3;
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
            render: function(node, model, ctx, container, ctr, children) {
                var array = ExpressionUtil.eval(node.expression, model, ctx, ctr);
                if (null == array) return;
                builder_build(getNodes(node, array), array, ctx, container, ctr, children);
            }
        };
        function getNodes(node, array) {
            var imax = array.length, nodes = new Array(imax), template = node.nodes, expression = node.expression, exprPrefix = "." === expression ? '."' : "(" + node.expression + ')."', i = 0;
            for (;i < imax; i++) nodes[i] = createEachNode(template, array[i], exprPrefix, i);
            return nodes;
        }
        function createEachNode(nodes, model, exprPrefix, i) {
            return {
                type: Dom.COMPONENT,
                tagName: "each::item",
                nodes: nodes,
                controller: createEachItemHandler(model, i, exprPrefix)
            };
        }
        function createEachItemHandler(model, i, exprPrefix) {
            return {
                compoName: "each::item",
                model: model,
                scope: {
                    index: i
                },
                modelRef: exprPrefix + i + '"',
                attr: null,
                meta: null
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
            build_compo = function(node, model, ctx, container, ctr, children) {
                var compoName = node.tagName, Handler;
                if (null != node.controller) Handler = node.controller;
                if (null == Handler) Handler = custom_Tags[compoName];
                if (null == Handler) return build_NodeAsCompo(node, model, ctx, container, ctr, children);
                var isStatic = false, handler, attr, key;
                if ("function" === typeof Handler) handler = new Handler(node, model, ctx, container, ctr); else {
                    handler = Handler;
                    isStatic = true;
                }
                var fn = isStatic ? build_Static : build_Component;
                return fn(handler, node, model, ctx, container, ctr, children);
            };
            function build_Component(compo, node, model, ctx, container, ctr, children) {
                var attr, key;
                compo.ID = ++builder_componentID;
                compo.attr = attr = attr_extend(compo.attr, node.attr);
                compo.parent = ctr;
                compo.expression = node.expression;
                if (null == compo.compoName) compo.compoName = node.tagName;
                if (null == compo.model) compo.model = model;
                if (null == compo.nodes) compo.nodes = node.nodes;
                for (key in attr) if ("function" === typeof attr[key]) attr[key] = attr[key]("attr", model, ctx, container, ctr, key);
                listeners_emit("compoCreated", compo, model, ctx, container);
                if (is_Function(compo.renderStart)) compo.renderStart(model, ctx, container);
                controller_pushCompo(ctr, compo);
                if (true === compo.async) {
                    compo.await(build_resumeDelegate(compo, model, ctx, container, children));
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
                if (null != Ctor) clone = new Ctor(node, ctr); else {
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
            var ctr = is_Function(Ctr) ? new Ctr() : new Compo();
            ctr.ID = ++builder_componentID;
            if (null == model) model = ctr.model || {};
            var scripts = _Array_slice.call(document.getElementsByTagName("script")), script, found = false;
            imax = scripts.length;
            i = -1;
            while (++i < imax) {
                script = scripts[i];
                if ("text/mask" !== script.getAttribute("type")) continue;
                if ("true" !== script.getAttribute("data-run")) continue;
                var fragment = builder_build(parser_parse(script.textContent), model, {}, null, ctr);
                script.parentNode.insertBefore(fragment, script);
                found = true;
            }
            if (false === found) log_warn("No blocks found: <script type='text/mask' data-run='true'>...</script>");
            if (is_Function(ctr.renderEnd)) ctr.renderEnd(container, model);
            Compo.signal.emitIn(ctr, "domInsert");
            return ctr;
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
                return _mergeFragment(node, contents, tmplNode, clonedParent);
            }
            log_warn("Uknown type", node.type);
            return null;
        }
        function _mergeArray(nodes, contents, tmplNode, clonedParent) {
            var fragment = [], imax = nodes.length, i = -1, x, node;
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
        function _mergeFragment(frag, contents, tmplNode, clonedParent) {
            var fragment = new Dom.Fragment();
            fragment.parent = clonedParent;
            fragment.nodes = _mergeArray(frag.nodes, contents, tmplNode, fragment);
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
            if ("function" === typeof node.appendChild) {
                node.appendChild(mix);
                return;
            }
            var l = node.length;
            if (l > 0) {
                var prev = node[l - 1];
                prev.nextSibling = mix;
            }
            node.push(mix);
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
            getProperty: function(model, path) {
                log_warn("mask.getProperty is deprecated. Use `mask.obj.get`");
                return obj_getProperty(model, path);
            },
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
                var tagName = node.tagName, _id, _class;
                if (null != node.attr) _id = node.attr.id || "", _class = node.attr["class"] || "";
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
                compo_meta_executeAttributeHandler = function(compo, model) {
                    var fn = compo.meta && compo.meta.handleAttributes;
                    return null == fn ? true : fn(compo, model);
                };
                function _handleAll_Delegate(hash) {
                    return function(compo, model) {
                        var attr = compo.attr, key, fn, val, error;
                        for (key in hash) {
                            fn = hash[key];
                            val = attr[key];
                            error = fn(compo, val, model);
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
                    hash[attrName] = function(compo, attrVal, model) {
                        if (null == attrVal) return optional ? null : Error("Expected");
                        var val = fn.call(compo, attrVal, compo, model, attrName);
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
                    "boolean": function(x, compo, model, attrName) {
                        if ("boolean" === typeof x) return x;
                        if (x === attrName) return true;
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
                return function CompoBase(node, model, ctx, container, ctr) {
                    if (null != Ctor) {
                        var overriden = Ctor.call(this, node, model, ctx, container, ctr);
                        if (null != overriden) return overriden;
                    }
                    if (null != compos) this.compos = obj_create(this.compos);
                    if (null != pipes) Pipes.addController(this);
                    if (null != attr) this.attr = obj_create(this.attr);
                    if (null != scope) this.scope = obj_create(this.scope);
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
                    var i = imax, result;
                    while (--i > -1) {
                        var x = fns[i].apply(this, arguments);
                        if (null != x) result = x;
                    }
                    return result;
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
                    serializeNodes: null,
                    handleAttributes: null
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
                    if (false === compo_meta_executeAttributeHandler(this, model)) return;
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
                    if (null == obj) return false;
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
                        if (i === -1) return "";
                        var opt = el.options[i], val = opt.getAttribute("value");
                        return null == val ? opt.getAttribute("name") : val;
                    },
                    set: function(provider, val) {
                        var el = provider.element, options = el.options, imax = options.length, opt, x, i;
                        for (i = 0; i < imax; i++) {
                            opt = options[i];
                            x = opt.getAttribute("value");
                            if (null == x) x = opt.getAttribute("name");
                            if (x == val) {
                                el.selectedIndex = i;
                                return;
                            }
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
                this["typeof"] = attr["typeof"] || null;
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
                    if ("number" === type) this["typeof"] = "Number";
                    this.property = "element.value";
                    break;

                  case "TEXTAREA":
                    this.property = "element.value";
                    break;

                  case "SELECT":
                    this.domWay = DomObjectTransport.SELECT;
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
                    var typeof_ = this["typeof"];
                    if (null != typeof_) {
                        var Converter = window[typeof_];
                        value = Converter(value);
                    }
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
                    compo.binder = expression_createBinder(compo.expr || compo.expression, model, ctx, controller, compo.refresh);
                    expression_bind(compo.expr || compo.expression, model, ctx, controller, compo.binder);
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
                    rootModel: null,
                    render: function(model, ctx, container, ctr) {
                        var expr = this.expression, nodes = this.nodes, val = expression_eval_strict(expr, model, ctx, ctr);
                        this.rootModel = model;
                        return build(nodes, val, ctx, container, ctr);
                    },
                    onRenderStartClient: function(model, ctx) {
                        this.rootModel = model;
                        this.model = expression_eval_strict(this.expression, model, ctx, this);
                    },
                    renderEnd: function(els, model, ctx, container, ctr) {
                        model = this.rootModel || model;
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
                        console.warn("No Model Found for", array[j]);
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
                        expression_unbind(this.expr || this.expression, this.model, this.parent, this.binder);
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
                        render: function(model, ctx, container, ctr, children) {
                            var directive = For.parseFor(this.expression), attr = this.attr;
                            attr[attr_PROP_1] = directive[0];
                            attr[attr_PROP_2] = directive[1];
                            attr[attr_TYPE] = directive[2];
                            attr[attr_EXPR] = directive[3];
                            var value = expression_eval_strict(directive[3], model, ctx, ctr);
                            if (null == value) return;
                            if (is_Array(value)) arr_createRefs(value);
                            For.build(value, directive, this.nodes, model, ctx, container, this, children);
                        },
                        renderEnd: function(els, model, ctx, container, ctr) {
                            var compo = new ForStatement(this, this.attr);
                            compo.placeholder = document.createComment("");
                            container.appendChild(compo.placeholder);
                            _compo_initAndBind(compo, this, model, ctx, container, ctr);
                            return compo;
                        },
                        getHandler: function(name, model) {
                            return For.getHandler(name, model);
                        }
                    });
                    function initialize(compo, node, els, model, ctx, container, ctr) {
                        compo.parent = ctr;
                        compo.model = model;
                        compo.refresh = fn_proxy(compo.refresh, compo);
                        compo.binder = expression_createBinder(compo.expr, model, ctx, ctr, compo.refresh);
                        expression_bind(compo.expr, model, ctx, ctr, compo.binder);
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
                        meta: {
                            serializeNodes: true
                        },
                        serializeNodes: function(node) {
                            return mask.stringify(node);
                        },
                        render: function(model, ctx, container, ctr, children) {
                            var array = expression_eval(this.expression, model, ctx, ctr);
                            if (null == array) return;
                            arr_createRefs(array);
                            build(this.nodes, array, ctx, container, this, children);
                        },
                        renderEnd: function(els, model, ctx, container, ctr) {
                            var compo = new EachStatement(this, this.attr);
                            compo.placeholder = document.createComment("");
                            container.appendChild(compo.placeholder);
                            _compo_initAndBind(compo, this, model, ctx, container, ctr);
                            return compo;
                        }
                    });
                    mask.registerHandler("each::item", EachItem);
                    function build(nodes, array, ctx, container, ctr, elements) {
                        var imax = array.length, nodes_ = new Array(imax), i = 0, node;
                        for (;i < imax; i++) {
                            node = createEachNode(nodes, i);
                            builder_build(node, array[i], ctx, container, ctr, elements);
                        }
                    }
                    function createEachNode(nodes, index) {
                        var item = new EachItem();
                        item.scope = {
                            index: index
                        };
                        return {
                            type: Dom.COMPONENT,
                            tagName: "each::item",
                            nodes: nodes,
                            controller: function() {
                                return item;
                            }
                        };
                    }
                    function EachItem() {}
                    EachItem.prototype = {
                        compoName: "each::item",
                        scope: null,
                        model: null,
                        modelRef: null,
                        parent: null,
                        renderStart: true === IS_NODE ? function() {
                            var expr = this.parent.expression;
                            this.modelRef = "" + ("." === expr ? "" : "(" + expr + ")") + '."' + this.scope.index + '"';
                        } : null,
                        renderEnd: function(els) {
                            this.elements = els;
                        },
                        dispose: function() {
                            if (null != this.elements) {
                                this.elements.length = 0;
                                this.elements = null;
                            }
                        }
                    };
                    function EachStatement(node, attr) {
                        this.expression = node.expression;
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

include.getResourceById("/libs/mask.js", "js").readystatechanged(3);

include.setCurrent({
    id: "/libs/class.js",
    namespace: "",
    url: "/libs/class.js"
});

/*!
 * ClassJS v%VERSION%
 * Part of the Atma.js Project
 * http://atmajs.com/
 *
 * MIT license
 * http://opensource.org/licenses/MIT
 *
 * (c) 2012, %YEAR% Atma.js and other contributors
 */
!function(root, factory) {
    "use strict";
    var _global = "undefined" === typeof window || null == window.navigator ? global : window, _exports;
    _exports = root || _global;
    function construct() {
        return factory(_global, _exports);
    }
    if ("function" === typeof define && define.amd) return define(construct);
    construct();
    if ("undefined" !== typeof module) module.exports = _exports.Class;
}(this, function(global, exports) {
    "use strict";
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
                if ("constructor" === key) continue;
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
        function inherit_Object_create(_class, _base, _extends, original, _overrides, defaults) {
            if (null != _base) {
                _class.prototype = Object.create(_base.prototype);
                obj_extendDescriptors(_class.prototype, original);
            } else _class.prototype = Object.create(original);
            _class.prototype.constructor = _class;
            if (null != _extends) arr_each(_extends, function(x) {
                obj_defaults(_class.prototype, x);
            });
            var proto = _class.prototype;
            obj_defaults(proto, defaults);
            for (var key in _overrides) proto[key] = proto_override(proto[key], _overrides[key]);
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

include.getResourceById("/libs/class.js", "js").readystatechanged(3);

include.resumeStack();