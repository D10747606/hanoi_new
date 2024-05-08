const THICKNESS = 60;
const TOPWIDTH = 100;
const INDENT = 20;
const GAP = 20;
const PILLAR_HEIGHT = 300; // 支柱高度
var RATIO = 0.2;
var disks = [];
var gamePaused = false;
var gameRunning = false;
var timeoutHandle = null;
var timePeriod = 1000;

document.addEventListener('DOMContentLoaded', function () {
    // 设置控件事件处理程序
    document.getElementById('start-button').addEventListener('click', startGame);
    document.getElementById('pause-button').addEventListener('click', pauseGame);
    document.getElementById('resume-button').addEventListener('click', resumeGame);
    document.getElementById('time-select').addEventListener('change', function (e) {
        timePeriod = parseInt(e.target.value);
    });

    // 创建支柱
    createPillars();
});

function createPillars() {
    for (let i = 1; i <= 3; i++) {
        let pier = document.getElementById(`pier${i}`);
        pier.style.width = TOPWIDTH + 'px';
        pier.style.height = PILLAR_HEIGHT + 'px';
        pier.style.left = `${(i - 1) * (INDENT * 2) + 100}px`;
        pier.style.backgroundColor = '#B5651D';
    }
}

function createDisks(n) {
    // 清空磁盘数组和支柱上的磁盘
    disks = [];
    for (let i = 1; i <= 3; i++) {
        let pier = document.getElementById(`pier${i}`);
        pier.innerHTML = '';
    }

    // 创建磁盘
    for (let i = 0; i < n; i++) {
        let disk = document.createElement('div');
        disk.className = 'disk';
        let width = 2 * (n - i - 1) * INDENT + TOPWIDTH;
        disk.style.width = `${width}px`;
        disk.style.height = `${THICKNESS}px`;
        disk.style.backgroundColor = getRandomColor();
        disk.style.position = 'absolute';
        disk.style.left = '0px';
        disk.style.bottom = `${i * THICKNESS}px`;
        disks.push(disk);
        document.getElementById('pier1').appendChild(disk);
    }
}

function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

function startGame() {
    // 禁用开始按钮，启用暂停按钮
    document.getElementById('start-button').disabled = true;
    document.getElementById('pause-button').disabled = false;
    document.getElementById('resume-button').disabled = true;
    gameRunning = true;

    // 选择用户选择的磁盘数量
    const diskSelect = document.getElementById('disk-select');
    const n = parseInt(diskSelect.value);

    // 创建磁盘
    createDisks(n);

    // 开始游戏
    startMoveSequence(n, 'pier1', 'pier3', 'pier2');
}

function pauseGame() {
    // 禁用暂停按钮，启用恢复按钮
    document.getElementById('pause-button').disabled = true;
    document.getElementById('resume-button').disabled = false;
    gamePaused = true;

    // 清除当前定时器
    clearTimeout(timeoutHandle);
}

function resumeGame() {
    // 禁用恢复按钮，启用暂停按钮
    document.getElementById('resume-button').disabled = true;
    document.getElementById('pause-button').disabled = false;
    gamePaused = false;

    // 继续下一步动作
    moveDisks();
}

function startMoveSequence(n, source, destination, auxiliary) {
    // 开始递归移动
    moveDisks(n, source, destination, auxiliary);
}

function moveSingleDisk(source, destination) {
    const sourcePier = document.getElementById(source);
    const destinationPier = document.getElementById(destination);

    const disk = sourcePier.lastChild;
    if (!disk) {
        return;
    }

    // 计算磁盘要移动到的目标位置
    const topDestination = destinationPier.children.length * THICKNESS;

    // 添加过渡效果
    disk.style.transition = "bottom 0.5s";

    // 移动磁盘到目标位置
    disk.style.bottom = `${topDestination}px`;

    // 在过渡完成后进行下一步移动
    setTimeout(() => {
        sourcePier.removeChild(disk);
        destinationPier.appendChild(disk);

        // 如果动画结束后没有下一个步骤，则重新排列磁盘
        if (!gamePaused) {
            moveDisks(n - 1, auxiliary, destination, source);
        }
    }, 500); // 等待过渡效果完成（与过渡时间相匹配）
}
