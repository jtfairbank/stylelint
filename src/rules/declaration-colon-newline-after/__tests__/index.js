import {
  messages,
  ruleName,
} from ".."
import rules from "../../../rules"
import { testRule } from "../../../testUtils"

const rule = rules[ruleName]

testRule(rule, {
  ruleName,
  config: ["always"],

  accept: [ {
    code: "a {\n" +
    "  color:\n" +
    "    pink\n" +
    "}",

    description: "newline and spaces after",
  }, {
    code: "a { color :\npink }",
    description: "space before and newline after",
  }, {
    code: "a { color\n:\npink }",
    description: "newline before after",
  }, {
    code: "a { color\r\n:\r\npink }",
    description: "CRLF before and after",
  }, {
    code: "a { color\n\n:\n\npink }",
    description: "double newline before after",
  }, {
    code: "a { color\r\n\r\n:\r\n\r\npink }",
    description: "double CRLF before and after",
  }, {
    code: "$map: (key: value)",
    description: "SCSS map with no newlines",
  }, {
    code: "a { background:\n  url(data:application/font-woff;...); }",
    description: "data URI",
  } ],

  reject: [ {
    code: "a { color :pink; }",
    description: "no newline after",
    message: messages.expectedAfter(),
    line: 1,
    column: 11,
  }, {
    code: "a { color :  pink; }",
    description: "two spaces after",
    message: messages.expectedAfter(),
    line: 1,
    column: 11,
  }, {
    code: "a { color :\tpink; }",
    description: "tab after",
    message: messages.expectedAfter(),
    line: 1,
    column: 11,
  }, {
    code: "a { color : pink; }",
    description: "space after",
    message: messages.expectedAfter(),
    line: 1,
    column: 11,
  } ],
})

testRule(rule, {
  ruleName,
  config: ["always-multi-line"],

  accept: [ {
    code: "a {\n" +
    "  color: pink\n" +
    "}",
  }, {
    code: "a {\n" +
    "  box-shadow:\n" +
    "    0 0 0 1px #5b9dd9\n" +
    "    0 0 2px 1px rgba(30, 140, 190, 0.8);\n" +
    "}",
  }, {
    code: "$map\n: (\nkey: value,\nkey2 :value2)",
    description: "SCSS map with newlines",
  }, {
    code: "$list: (\n'value1',\n'value2',\n)",
    description: "SCSS list with newlines",
  }, {
    code: "a { color:pink }",
  }, {
    code: "a { color :\tpink }",
  }, {
    code: "a { color\n: pink }",
  }, {
    code: "a { color\r\n:  pink }",
  } ],

  reject: [ {
    code: "a {\n" +
    "  box-shadow: 0 0 0 1px #5b9dd9\n" +
    "    0 0 2px 1px rgba(30, 140, 190, 0.8);\n" +
    "}",

    message: messages.expectedAfterMultiLine(),
    line: 2,
    column: 13,
  }, {
    code: "a {\n" +
    "  box-shadow:0 0 0 1px #5b9dd9\n" +
    "    0 0 2px 1px rgba(30, 140, 190, 0.8);\n" +
    "}",

    message: messages.expectedAfterMultiLine(),
    line: 2,
    column: 13,
  } ],
})

testRule(rule, {
  ruleName,
  config: ["never"],

  accept: [ {
    code: "a { color:pink }",
    description: "nothing before or after",
  }, {
    code: "a { color :\tpink }",
    description: "space before, tab after",
  }, {
    code: "a { color\n: pink }",
    description: "newline before, space after",
  }, {
    code: "a { color\r\n:  pink }",
    description: "CRLF before, two spaces after",
  }, {
    code: "a { color :pink; }",
    description: "no newline after",
  }, {
    code: "a { color :  pink; }",
    description: "two spaces after",
  }, {
    code: "a { color :\tpink; }",
    description: "tab after",
  }, {
    code: "a { color : pink; }",
    description: "space after",
  }, {
    code: "$map: (key: value)",
    description: "SCSS map with no newlines",
  }, {
    code: "$map\n: (\nkey: value,\nkey2 :value2)",
    description: "SCSS map with newlines",
  }, {
    code: "$list: (\n'value1',\n'value2',\n)",
    description: "SCSS list with newlines",
  }, {
    code: "a { background: url(data:application/font-woff;...); }",
    description: "data URI",
  }, {
    code: "a {\n" +
    "  border-bottom: 1px\n" +
    "                 solid\n" +
    "                 black;\n" +
    "}",
    description: "Multi-line with one value before a new line."
  }, {
    code: "a {\n" +
    "  box-shadow: 0 0 0 1px #5b9dd9\n" +
    "    0 0 2px 1px rgba(30, 140, 190, 0.8);\n" +
    "}",
    description: "Multi-line with multiple values before a newline."
  } ],

  reject: [ {
    // FAIL
    code: "a {\n" +
    "  color:\n" +
    "    pink\n" +
    "}",

    description: "newline and spaces after",
    message: messages.rejectedAfter(),
    line: 2,
    column: 8,
  }, {
    // FAIL
    code: "a { color :\npink }",
    description: "space before and newline after",
    message: messages.rejectedAfter(),
    line: 1,
    column: 11,
  }, {
    // FAIL
    code: "a { color\n" +
    ":\n" +
    "pink }",
    description: "newline before after",
    message: messages.rejectedAfter(),
    line: 2,
    column: 1,
  }, {
    // FAIL
    code: "a { color\r\n" +
    ":\r\n" +
    "pink }",
    description: "CRLF before and after",
    message: messages.rejectedAfter(),
    line: 2,
    column: 1,
  }, {
    code: "a { color\n" +
    "\n" +
    ":\n" +
    "\n" +
    "pink }",
    description: "double newline before after",
    message: messages.rejectedAfter(),
    line: 3,
    column: 1,
  }, {
    // FAIL
    code: "a { color\r\n" +
    "\r\n" +
    ":\r\n" +
    "\r\npink }",
    description: "double CRLF before and after",
    message: messages.rejectedAfter(),
    line: 3,
    column: 1,
  } ],
})
