document.getElementById("startButton").addEventListener("click", function() {
    // 开始游戏逻辑
});

document.getElementById("pauseButton").addEventListener("click", function() {
    // 暂停游戏逻辑
});

document.getElementById("resumeButton").addEventListener("click", function() {
    // 继续游戏逻辑
});

document.getElementById("moveInterval").addEventListener("change", function() {
    // 修改移动间隔逻辑
});

// 用于存储定时器句柄
let moveHandle;

function scheduleNextMove(i, destX, destY, interval) {
    // 清除之前的定时器
    clearTimeout(moveHandle);
    // 调度下一次移动
    moveHandle = setTimeout(function() {
        moveDisk(i, destX, destY);
    }, interval);
}
