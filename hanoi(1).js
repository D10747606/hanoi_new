const THICKNESS = 60;
const TOPWIDTH = 100;
const INDENT = 20;
const GAP = 20;
var RATIO = 0.2;

function layer(n, i)
{
  let x = i * INDENT;
  let y = (n- i - 1) * THICKNESS;
  let width = 2*(n-i-1)*INDENT + TOPWIDTH;
  let height = THICKNESS;
  let ele = document.createElement("div");
  ele.className = "layer";
  ele.style.left = x +'px';
  ele.style.top = y + 'px';
  ele.style.width = width + 'px';
  ele.style.height = (height - GAP) + 'px';
  ele.id = "layer" + i;
  ele.innerHTML = disk(width, height, i);
  ele.style.backgroundColor = 'transparent';
  document.body.appendChild(ele);
}

function tower(n) {
    for (let i = 0; i < n; i++) {
        // 创建柱子
        let pillar = document.createElement("div");
        pillar.className = "pillar";
        pillar.style.left = (i * INDENT) + 'px';
        pillar.style.top = (n * THICKNESS) + 'px'; // 与最下方磁盘对齐
        pillar.style.width = '20px'; // 柱子的宽度
        pillar.style.height = ((n + 1) * THICKNESS) + 'px'; // 柱子的高度，略比磁盘高度多一个单位
        pillar.style.backgroundColor = 'brown';
        document.body.appendChild(pillar);
        
        // 创建磁盘
        layer(n, i);
    }
    
    for (let i = 0; i < n; i++) {
        let disk = document.getElementById('layer' + i);
        Drag.init(disk);
    }
}

function move(i, x, y)
{
    let ele = document.getElementById("layer" + i);
    ele.style.left = x + 'px';
    ele.style.top = y + 'px';
}

function disk(w, h, i)
{
    
    let h1 = w*RATIO;
    //let color = colors[i]; 
    let color = 'rgb(' + Math.floor(Math.random()*256) + ","
                       + Math.floor(Math.random()*256) + ","
                + Math.floor(Math.random()*256) + ")";
    let s ='<div style="margin-top:' + h1 + 'px;width:' + w + 'px;height:' + h + 'px;'
+'background-color:' + color + '"></div>'
+'<div style="margin:-' + h1/2 + 'px 0px -'+ (h1 + h) + 'px 0px;width:' + w + 'px;height:' + h1 + 'px;'
+'background-color:' + color + ';border-radius:' + (w/2) + 'px/' + h1/2 + 'px"></div>'
+'<div style="width:' + (w-2) + 'px;height:' + h1  + 'px;'
+'background-image:radial-gradient(#101010,#305020,15%,yellow,' + color + ');'
+'border-radius:' + (w/2-1) + 'px/' + h1/2 + 'px;'
+'border:1px red solid;"></div>';
  return s;
}
function moveDisk(i, destX, destY) {
    let disk = document.getElementById('layer' + i);
    // 计算目标位置的坐标，使得磁盘在目的地居中
    let destLeft = destX - disk.offsetWidth / 2;
    let destTop = destY - disk.offsetHeight;
    // 应用动画
    disk.style.animation = 'diskmove 2s 1';
    // 移动到目标位置
    setTimeout(function() {
        disk.style.left = destLeft + 'px';
        disk.style.top = destTop + 'px';
    }, 2000);
}
tower(8);
moveDisk(2);
setTimeout('moveDisk(4)', 2000);
//move(3, ' + h + '0,400);
var alldiv = document.querySelectorAll('div');
for (let j = 0; j < alldiv.length; j++)
   alldiv[j].classList.add('cls1');
    alldiv[50].parentNode.removeChild(alldiv[50]);