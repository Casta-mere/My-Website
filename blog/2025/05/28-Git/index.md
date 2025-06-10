---
slug: Git
title: Git & Github
authors: [Castamere]
tags: [Git, Github]
---

记录一些常用的 Git 和 Github 操作

<!--truncate-->

# Git & Github

## Tag

使用 Git 的 `tag` 和 Github Actions 可以形成很好的自动化

```bash
git tag Vx.x.x
git push origin Vx.x.x
```

如果部署出现问题可以用下面的命令来撤回

```bash
git tag -d Vx.x.x
git push origin :refs/tags/V0.2
```

## Github 回滚

如果 Github 上出现某些误操作，导致历史记录变乱，可以通过以下方式来"回滚"

首先把代码拉到本地，然后使用 `git reset --hard <commit_hash>` 在本地回滚

再使用 `git push origin <branch_name> --force` 推送