# 胡玲凤 · AI 产品作品集

个人作品集静态网站，使用 HTML、CSS 和 JavaScript，无需构建。

## 页面结构

姓名与岗位定位 / 首页 / 实习经历 / AI 实践 / 关于我 / 联系我。
保留深灰背景、绿色渐变与悬浮交互面板。包含经历折叠、项目筛选、项目详情弹窗、邮箱复制与履历摘要下载。两个 AI 项目目前标注为规划中。

## 本地运行

```sh
python -m http.server 8765
```

浏览器打开 http://localhost:8765。

## 文件

- index.html：页面内容与实习经历。
- style.css：基础样式。
- cartesia.css：绿色主题。
- navigation.css：固定导航与经历分区。
- app.js：项目内容与交互。
- assets/profile.txt：履历摘要，正式简历准备好后替换。

## 部署

GitHub Pages 使用 main 分支的根目录。所有站内资源使用相对路径，兼容 /portfolio/ 子路径。

## 维护

完成项目后，再将规划状态替换为实际阶段，补充真实演示、测试记录与结果。不要把概念图写成已上线功能。
