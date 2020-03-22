# 毫末科技uniapp 页面 DSL

> 官网：[https://haomo-tech.com](https://haomo-tech.com)

> 作者：胡小根

> 邮箱：hxg@haomo-studio.com

## 安装和使用

注意：node采用10.17.0版本（经测试）。请使用n或者nvm管理不同版本的node。

### 安装imgcook插件

参考：[安装插件](https://www.imgcook.com/docs?slug=install-plugin)

### 安装imgcook-vscode插件

参考：[imgcook-vscode](https://imgcook.taobao.org/docs?slug=imgcook-vscode)

### 安装[imgcook-cli](https://www.imgcook.com/docs?slug=imgcook-cli)

```bash
# 安装和配置
cnpm install -g @imgcook/cli

# 安装毫末的组件替换插件
imgcook install @imgcook/hm-replace-component

imgcook config ls
imgcook config edit
# 将dsl修改为241。且将@imgcook/hm-replace-component插件加为第一个插件
```

```bash
# 使用imgcook-cli
imgcook pull 16106 --path src/components/imgcook/test/
```

## 参考

* [imgcook官方文档](https://imgcook.taobao.org/docs)