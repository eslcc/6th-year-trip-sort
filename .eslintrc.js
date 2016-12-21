module.exports =
{
    "extends": "eslint:recommended",
    "parserOptions":
    {
        "ecmaVersion": 6,
    },
    "env":
    {
        "browser": true,
        "jquery": true,
    },
    "rules":
    {
        // enable additional rules
        "indent": ["error", 4, { "SwitchCase": 1, "VariableDeclarator": 0 }],
        "linebreak-style": "off",
        "quotes": ["error", "double"],
        "semi": ["error", "always"],
        "no-console": "off",

        // override default options for rules from base configurations
        "comma-dangle": ["error", "always-multiline"],
        "no-cond-assign": ["error", "always"],
        "no-unused-vars": ["error", { "vars": "local", "args": "all" }],
    },
};
