var buster = require("buster");
var assert = buster.assert;
var terminal = require("../lib/buster-terminal");

buster.testCase("Buster terminal", {
    setUp: function () {
        this.io = {
            out: "",
            print: function (str) { this.out += str; },
            puts: function (str) { this.out += str + "\n"; }
        };
    },

    "with default settings": {
        setUp: function () {
            this.t = terminal.create();
        },

        "should not colorize text": function () {
            assert.equals(this.t.colorize("String", 31), "String");
        },

        "should not color text red": function () {
            assert.equals(this.t.red("String"), "String");
        },

        "should not color text green": function () {
            assert.equals(this.t.green("String"), "String");
        },

        "should not color text yellow": function () {
            assert.equals(this.t.yellow("String"), "String");
        },

        "should not color text purple": function () {
            assert.equals(this.t.purple("String"), "String");
        },

        "should not color text cyan": function () {
            assert.equals(this.t.cyan("String"), "String");
        },

        "should not color text grey": function () {
            assert.equals(this.t.grey("String"), "String");
        },

        "should not bold text": function () {
            assert.equals(this.t.bold("String"), "String");
        }
    },

    "with colors": {
        setUp: function () {
            this.t = terminal.create({ color: true });
        },

        "should colorize text": function () {
            assert.equals(this.t.colorize("String", 31), "\033[31mString\033[0m");
        },

        "should color text red": function () {
            assert.equals(this.t.red("String"), "\033[31mString\033[0m");
        },

        "should color text green": function () {
            assert.equals(this.t.green("String"), "\033[32mString\033[0m");
        },

        "should color text yellow": function () {
            assert.equals(this.t.yellow("String"), "\033[33mString\033[0m");
        },

        "should color text purple": function () {
            assert.equals(this.t.purple("String"), "\033[35mString\033[0m");
        },

        "should color text cyan": function () {
            assert.equals(this.t.cyan("String"), "\033[36mString\033[0m");
        },

        "should color text grey": function () {
            assert.equals(this.t.grey("String"), "\033[38;5;8mString\033[0m");
        },

        "should bold text": function () {
            assert.equals(this.t.bold("String"), "\033[1mString\033[0m");
        }
    },

    "with bright colors": {
        setUp: function () {
            this.t = terminal.create({ color: true, bright: true });
        },

        "should colorize text brightly": function () {
            assert.equals(this.t.colorize("String", 31),
                          "\033[1m\033[31mString\033[0m");
        },

        "should color text bright red": function () {
            assert.equals(this.t.red("String"), "\033[1m\033[31mString\033[0m");
        },

        "should color text bright green": function () {
            assert.equals(this.t.green("String"), "\033[1m\033[32mString\033[0m");
        },

        "should color text bright yellow": function () {
            assert.equals(this.t.yellow("Str"), "\033[1m\033[33mStr\033[0m");
        },

        "should color text bright purple": function () {
            assert.equals(this.t.purple("Str"), "\033[1m\033[35mStr\033[0m");
        },

        "should color text bright cyan": function () {
            assert.equals(this.t.cyan("String"), "\033[1m\033[36mString\033[0m");
        },

        "should color text bright grey": function () {
            assert.equals(this.t.grey("String"), "\033[1m\033[38;5;8mString\033[0m\033[0m");
        },

        "should bold text": function () {
            assert.equals(this.t.bold("String"), "\033[1mString\033[0m");
        }
    },

    "moving": {
        setUp: function () {
            this.t = terminal.create({ color: true, bright: true });
        },

        "should move one line up": function () {
            assert.equals(this.t.up(1), "\033[1A");
        },

        "should not move anywhere": function () {
            assert.equals(this.t.up(0), "");
            assert.equals(this.t.up(), "");
        },

        "should move one line down": function () {
            assert.equals(this.t.down(1), "\033[1B");
        },

        "should not move anywhere": function () {
            assert.equals(this.t.down(0), "");
            assert.equals(this.t.down(), "");
        },

        "should move two columns forward": function () {
            assert.equals(this.t.fwd(2), "\033[2C");
        },

        "should not move anywhere": function () {
            assert.equals(this.t.fwd(0), "");
            assert.equals(this.t.fwd(), "");
        },

        "should save position": function () {
            assert.equals(this.t.save(), "\0337");
        },

        "should restore position": function () {
            assert.equals(this.t.restore(), "\0338");
        },

        "should move in transaction": function () {
            var str = this.t.move(function () {
                return this.up(2) + this.fwd(4) + this.down(1);
            });

            assert.equals(str, "\0337\033[2A\033[4C\033[1B\0338");
        },

        "should strip ansi escape characters": function () {
            assert.equals(this.t.stripSeq(this.t.red(this.t.yellow("Hey"))), "Hey");
        }
    }
});
