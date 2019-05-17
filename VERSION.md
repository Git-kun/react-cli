## git版本控制

### 远端
1. master 为最新的稳定版本
2. dev 为测试版, 每个人开发完合并提交到此分支

* 功能分支 （feature）

* 预发布分支 (release)

* 修补bug分支 (fixbug)
这三种分支都属于临时性需要，使用完以后，应该删除，使得代码库的常设分支始终只有master和dev。



### 本地
1. 开发时 每个人都从 远端的 dev 分支上 pull 下来开发
2. 开发完 合并到远端的 dev 分支上

### tag 每个发布的版本 都要打一个 tag 不可变的版本



### 一些命令

```
#Git创建Develop分支的命令
git checkout -b develop master
#将Develop分支发布到Master分支的命令
git checkout master
git merge  develop
```