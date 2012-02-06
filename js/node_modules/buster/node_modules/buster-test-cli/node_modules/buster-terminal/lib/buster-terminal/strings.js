if (typeof buster != "object") {
    var buster = {};
}

buster.terminal = buster.terminal || {}

buster.terminal.strings = (function () {
    function repeat(character, times) {
        var str = "";

        while (times >= 0 && times--) {
            str += character;
        }

        return str;
    }

    function maxWidth(strings) {
        for (var i = 0, l = strings.length, width = 0; i < l; i++) {
            width = Math.max(
                (strings[i] == null ? "" : "" + strings[i]).length, width);
        }

        return width;
    }

    function alignLeft(string, width) {
        return string + repeat(" ", width - string.length);
    }

    function alignRight(string, width) {
        return repeat(" ", width - string.length) + string;
    }

    return {
        repeat: repeat,
        maxWidth: maxWidth,
        alignLeft: alignLeft,
        alignRight: alignRight
    };
}());

if (typeof module == "object" && typeof require == "function") {
    module.exports = buster.terminal.strings;
}
