var S = require("./strings");
var terminal = require("../buster-terminal");

function len(text) {
    return terminal.stripSeq(text).length;
}

module.exports = {
    create: function (io) {
        var list = Object.create(this);
        var initialLabels = Array.prototype.slice.call(arguments, 1);
        list.io = io;
        list.width = S.maxWidth(initialLabels);
        list.current = 0;
        list.lines = {};
        list.labels = [];

        for (var i = 0, l = initialLabels.length; i < l; ++i) {
            list.add(initialLabels[i]);
        }

        return list;
    },

    add: function (label) {
        if (this.width < label.length) {
            this.refitLabels(label);
        }

        this.labels.push(label);
        this.lines[label] = { x: this.width + 2, y: this.current, content: "" };
        this.io.puts(this.formatLabel(label));
        this.current += 1;
    },

    refitLabels: function (label) {
        this.width = S.maxWidth(this.labels.concat(label));
        var content, labels = this.labels;

        for (var i = 0, l = labels.length; i < l; ++i) {
            content = this.lines[labels[i]].content;
            this.printAt({ x: 0, y: labels[i] },
                         this.formatLabel(labels[i]) + content);
            this.lines[labels[i]].x = this.width + 2 + len(content);
        }
    },

    print: function (label, text) {
        this.printAt({ x: label, y: label }, text);
        this.lines[label].x += len(text);
        this.lines[label].content += text;
    },

    printAt: function (pos, text) {
        var x = typeof pos.x == "string" ? this.lines[pos.x].x : pos.x;
        var y = typeof pos.y == "string" ? this.lines[pos.y].y : pos.y;
        var current = this.current;

        this.io.print(terminal.move(function () {
            return this.up(current - y) + this.fwd(x) + text;
        }));
    },

    formatLabel: function (label) {
        return label + ": " + S.repeat(" ", this.width - label.length);
    }
};
