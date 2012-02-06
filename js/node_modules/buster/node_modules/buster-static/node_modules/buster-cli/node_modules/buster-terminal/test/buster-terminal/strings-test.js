if (typeof require == "function") {
    var buster = require("buster");
    buster.terminal = { strings: require("../../lib/buster-terminal/strings") };
}

(function () {
    var assert = buster.assert;
    var S = buster.terminal.strings;

    buster.testCase("Terminal string utilities test", {
        "max width": {
            "should get width of array of strings": function () {
                assert.equals(S.maxWidth(["a", "b", "hey", "there"]), 5);
            },

            "should get width of array of strings and numbers": function () {
                assert.equals(S.maxWidth(["a", 666782, 2, "there"]), 6);
            },

            "should count width of undefined as 0": function () {
                assert.equals(S.maxWidth([null, undefined, false, ""]), 5);
            }
        },

        "alignment": {
            "should left align text": function () {
                assert.equals(S.alignLeft("Hey there", 13), "Hey there    ");
            },

            "should right align text": function () {
                assert.equals(S.alignRight("Hey there", 13), "    Hey there");
            },

            "should not pad too long text": function () {
                assert.equals(S.alignRight("Hey there", 4), "Hey there");
            }
        }
    });
}());
