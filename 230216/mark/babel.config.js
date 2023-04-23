/*
 * @Author: Topskys
 * @Date: 2023-04-09 20:12:11
 * @LastEditTime: 2023-04-09 20:55:48
 */
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
    ["@babel/preset-env", { "modules": false }]
  ],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}

