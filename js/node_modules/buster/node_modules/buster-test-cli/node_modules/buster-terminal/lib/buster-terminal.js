var S = require("./buster-terminal/strings");

module.exports = {
    color: false,
    bright: false,

    // Clear screen: "\033[1;1H\033[2J"

    create: function (opt) {
        var instance = Object.create(this);

        if (opt && typeof opt.color == "boolean") {
            instance.color = opt.color;
        }

        if (opt && typeof opt.bright == "boolean") {
            instance.bright = opt.bright;
        }

        return instance;
    },

    colorize: function (str, color) {
        if (!this.color) return str;

        return (this.bright ? "\033[1m" : "") +
            "\033[" + color + "m" + str + "\033[0m";
    },

    bold: function (str) {
        if (!this.color) return str;
        return "\033[1m" + str + "\033[0m";
    },

    red: function (str) {
        return this.colorize(str, 31);
    },

    yellow: function (str) {
        return this.colorize(str, 33);
    },

    green: function (str) {
        return this.colorize(str, 32);
    },

    purple: function (str) {
        return this.colorize(str, 35);
    },

    cyan: function (str) {
        return this.colorize(str, 36);
    },

    grey: function (str) {
        if (!this.color) return str;
        var str = "\033[38;5;8m" + str + "\033[0m";
        return this.bright ? "\033[1m" + str + "\033[0m" : str;
    },

    up: function (n) {
        if (!n) return "";
        return "\033[" + n + "A";
    },

    down: function (n) {
        if (!n) return "";
        return "\033[" + n + "B";
    },

    fwd: function (n) {
        if (!n) return "";
        return "\033[" + n + "C";
    },

    save: function () {
        return "\0337";
    },

    restore: function () {
        return "\0338";
    },

    move: function (callback) {
        var str = this.save();
        str += callback.call(this);
        str += this.restore();

        return str;
    },

    stripSeq: function (str) {
        var str = str.replace(/\x1b(\[|\(|\))[;?0-9]*[0-9A-Za-z]/g, "");
        str = str.replace(/\x1b(\[|\(|\))[;?0-9]*[0-9A-Za-z]/g, "");
        str = str.replace(/[\x03|\x1a]/, "");

        return str;
    },

    get labeledList () {
        return require("./buster-terminal/labeled-list");
    },

    get strings() {
        return require("./buster-terminal/strings");
    }
};
