/**
 * Created by Hazert on 15/12/1.
 */
var length = 8;
var start;
var end;
var totalScore;
var redoTimes;
var gameover;
var prevBallNum;
var Through;
function getCookie(c_name) {
    if (document.cookie.length > 0) {
        start = document.cookie.indexOf(c_name + "=");
        if (start != -1) {
            start = start + c_name.length + 1;
            end = document.cookie.indexOf(";", start);
            if (end == -1) end = document.cookie.length;
            return unescape(document.cookie.substring(start, end));
        }
    }
    return "";
}

function setCookie(c_name, value, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
}
var prevBds = new Array(length);
var boards = new Array(length);
for (var i = 0; i < length; i++) {
    boards[i] = new Array(length);
    prevBds[i] = new Array(length);
    for (var j = 0; j < length; j++) {
        boards[i][j] = 0;
        prevBds[i][j] = 0;
    }
}

if (ballNum == length * length) {
    gameOver();
}

function updateScore() {
    document.getElementById("nowScore").innerHTML = totalScore;
    var high = getCookie('high');
    if (high != null && high != "") {
        var tmpNow = parseInt(totalScore);
        var tmpHigh = parseInt(high);
        if (tmpHigh >= tmpNow) {
            document.getElementById("highScore").innerHTML = high;
        } else {
            document.getElementById("highScore").innerHTML = totalScore;
            setCookie('high', totalScore, 60);
        }
    } else {
        document.getElementById("highScore").innerHTML = totalScore;
        if (totalScore != null && totalScore != "") {
            setCookie('high', totalScore, 60);
        }
    }
}

var context;
var radius = 29;
var interVal = 80;
var wid = 640;
function ball(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    switch (color) {
        case 1:
            context.fillStyle = '#98fbd4';
            boards[x][y] = 1;
            break;
        case 2:
            context.fillStyle = '#1E90FF';
            boards[x][y] = 2;
            break;
        case 3:
            context.fillStyle = '#ff850e';
            boards[x][y] = 3;
            break;
        case 4:
            context.fillStyle = '#f57676';
            boards[x][y] = 4;
            break;
        case 5:
            context.fillStyle = '#a407f5';
            boards[x][y] = 5;
            break;
        case 6:
            context.fillStyle = '#16d602';
            boards[x][y] = 6;
            break;
        default:
            return;
    }
    context.beginPath();
    context.arc(interVal / 2 * (2 * x + 1), interVal / 2 * (2 * y + 1), radius, 0, Math.PI * 2, true);
    context.closePath();
    context.fill();
}
var testing = false;
function Balls(n) {
    if (ballNum + n <= length * length) {
        for (var i = 0; i < n; i++) {
            Ball();
        }
    } else {
        gameOver();
    }
}
var ballNum;
var rdCleard;


function theBall(x, y, color) {
    if (boards[x][y] == 0) {
        ball(x, y, color);
        ballNum++;
    }
}

function RMBall(x, y) {
    boards[x][y] = 0;
    context.fillStyle = '#3e4649';
    context.fillRect(x * interVal + 1, y * interVal + 1, interVal - 2, interVal - 2);
}


function pathBall(x, y) {
    context.fillStyle = '#ffffff';
    context.beginPath();
    context.arc(interVal / 2 * (2 * x + 1), interVal / 2 * (2 * y + 1), 30, 0, Math.PI * 2, true);
    context.closePath();
    context.fill();
}

function highLight(x, y, color) {
    context.fillStyle = '#3e4649';
    context.fillRect(x * interVal + 1, y * interVal + 1, interVal - 2, interVal - 2);
    ball(x, y, color);
}

function rmBall(x, y) {
    if (boards[x][y] != 0) {
        RMBall(x, y);
        ballNum--;
    }
}

function Ball() {
    if (ballNum < length * length) {
        this.x = Math.floor(Math.random() * length);
        this.y = Math.floor(Math.random() * length);
        this.color = Math.floor(Math.random() * 6) + 1;

        while (boards[this.x][this.y] != 0) {
            this.x = Math.floor(Math.random() * length);
            this.y = Math.floor(Math.random() * length);
        }

        theBall(this.x, this.y, this.color);
        if (ForClear(this.x, this.y, this.color, 123) > 4) {
            rdCleard = true;
        } else if (ballNum == length * length) {
            gameOver();
        }
    } else {
        if (ForClear(this.x, this.y, this.color, 123) > 4) {
            rdCleard = true;
        } else {
            gameOver();
        }
    }
}
var moved;

var clicked;

function init() {
    lines();
    ballNum = 0;
    movingColor = 0;
    moved = false;
    clicked = false;
    cleard = false;
    rdCleard = false;
    totalScore = 0;
    redoTimes = 0;
    gameover = false;
    updateScore();

    if (testing) {
        ball(2, 2, 3);
        ball(5, 3, 4);
        ball(5, 4, 5);
        ball(5, 5, 5);
        ball(2, 5, 2);
        ball(3, 2, 2);
        ball(4, 2, 6);
        ball(5, 2, 1);
    } else {
        Balls(3);
    }
}

function lines() {
    context.beginPath();
    for (var i = 1; i < 9; i++) {
        context.moveTo(0, interVal * i);
        context.lineTo(wid, interVal * i);
        context.moveTo(interVal * i, 0);
        context.lineTo(interVal * i, wid);
    }
    context.strokeStyle = '#ffffff';
    context.stroke();
    context.restore();
    context.closePath();
}

function clearAll() {
    for (var i = 0; i < length; i++) {
        for (var j = 0; j < length; j++) {
            rmBall(i, j);
        }
    }
}

function gameOver() {
    drawNew();
}
function drawNew() {
    location.reload();
}

function hashMap(x, y) {
    return (x + parseFloat("0." + y.toString()));
}

function pos(x, y, parent) {
    this.x = x;
    this.y = y;
    this.parent = parent;
}

function v(x, y) {
    return x < 8 && y < 8 && x >=0 && y >= 0 && boards[x][y] == 0;
}

function distance(x1, y1, x2, y2) {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}



var Pre_currentScore,Pre_Click,clearX,clearY,clearColor,Pre_MColor,Pre_MX,Pre_MY;
var prevCleard,prevClearX,prevClearY,prevClearColor,prevRdCleard;
var cleard;
var movingColor;
var movingX,movingY;

function move(e) {
    var rect = canvas.getBoundingClientRect();
    var xc = e.clientX;
    var yc = e.clientY;
    var x = parseInt((xc - 6 - rect.left) / interVal);
    var y = parseInt((yc - 8 - rect.top) / interVal);
    var color = boards[x][y];
    if (color != 0) {
        if (clicked) {
            context.fillStyle = '#3e4649';
            context.fillRect(movingX * interVal + 1, movingY * interVal + 1, interVal - 2, interVal - 2);
            ball(movingX, movingY, movingColor);
        }
        if (moved) {
            context.fillStyle = '#3e4649';
            context.fillRect(clearX * interVal + 1, clearY * interVal + 1, interVal - 2, interVal - 2);
            if (cleard == false || (rdCleard == true && boards[clearX][clearY] != 0)) {
                ball(clearX, clearY, clearColor);
            }
        }
        highLight(x, y, color);
        clicked = true;
        moved = false;
        movingColor = color;
        movingX = x;
        movingY = y;
        document.getElementById("shows").innerHTML = "";
    } else if ((!gameover) && color == 0 && clicked) {
        if (Move(x, y)) {
            document.getElementById("shows").innerHTML = "";
            for (var i = 0; i < length; i++) {
                for (var j = 0; j < length; j++) {
                    prevBds[i][j] = boards[i][j];
                }
            }

            prevBallNum = ballNum;
            Pre_currentScore = totalScore;
            Pre_Click = clicked;
            Pre_MColor = movingColor;
            Pre_MX = movingX;
            Pre_MY = movingY;
            prevCleard = cleard;
            prevClearX = clearX;
            prevClearY = clearY;
            prevClearColor = clearColor;
            prevRdCleard = rdCleard;

            RMBall(movingX, movingY);
            moved = true;
            clicked = false;
            cleard = false;
            rdCleard = false;
            clearX = x;
            clearY = y;
            clearColor = movingColor;

            var dsts = 0;
            var showInterval = 60;
            var show = new Array();
            var tmp = Through.parent;
            while (tmp.parent != null) {
                show.push(tmp);
                tmp = tmp.parent;
            }

            while (show.length != 0) {
                tmp = show.pop();
                setTimeout(pathBall, dsts * showInterval + 20, tmp.x, tmp.y);
                setTimeout(RMBall, showInterval * (dsts + 3), tmp.x, tmp.y);
                dsts = dsts + 1;
            }

            boards[x][y] = movingColor;
            setTimeout(highLight, dsts * showInterval + 40, x, y, movingColor);
            if (ForClear(x, y, movingColor, dsts * showInterval + 150) < 5) {
                if (ballNum < length * length - 1) {
                    setTimeout(Balls, showInterval * (dsts + 3), 3);
                } else {
                    gameOver();
                    return;
                }
                if (ballNum == length * length) {
                    setTimeout(gameOver, showInterval * (dsts + 3));
                    return;
                }
            }
        }
    }
}

function ForClear(x, y, color, Ti) {
    var rmH = false;
    var rmV = false;
    var checkedH = true;
    var checkedV = true;
    var hStart = 0,vStart = 0,vNum = 0,hNum = 0;
    for (var i = 0; i < length; i++) {
        if (boards[x][i] == color && checkedH == true) {
            if (i == 0) {
                hStart = 0;
            }
            if (i > 0 && boards[x][i - 1] != color) {
                hStart = i;
            }
            for (var j = i; j < length; j++) {
                if (boards[x][j] == color) {
                    hNum++;
                    if ((j + 1 < length && boards[x][j + 1] != color) || (j + 1 == length)) {
                        if (hNum > 4) {
                            rmH = true;
                            checkedH = false;
                            break;
                        } else {
                            hNum = 0;
                            i = j;
                        }
                    }
                } else {
                    if (hNum < 5) {
                        hNum = 0;
                    }
                    i = j;
                    break;
                }
            }
        }
    }
    for (var i = 0; i < length; i++) {
        if (boards[i][y] == color && checkedV == true) {
            if (i == 0) {
                vStart = 0;
            }
            if (i > 0 && boards[i - 1][y] != color) {
                vStart = i;
            }
            for (var j = i; j < length; j++) {
                if (boards[j][y] == color) {
                    vNum++;
                    if ((j + 1 < length && boards[j + 1][y] != color) || (j + 1 == length)) {
                        if (vNum > 4) {
                            rmV = true;
                            checkedV = false;
                            break;
                        } else {
                            vNum = 0;
                            i = j;
                        }
                    }
                } else {
                    if (vNum < 5) {
                        vNum = 0;
                    }
                    i = j;
                    break;
                }
            }
        }
    }
    if (rmH) {
        cleard = true;
        for (var t = hStart; t < hStart + hNum; t++) {
            setTimeout(rmBall, Ti, x, t);
        }
    }
    if (rmV) {
        cleard = true;
        for (var t = vStart; t < vStart + vNum; t++) {
            setTimeout(rmBall, Ti, t, y);
        }
    }
    if (hNum < 5 && vNum < 5) {
        return 0;
    } else if (hNum > 4 && vNum < 5) {
        totalScore += hNum;
        updateScore();
        return hNum;
    } else if (hNum < 5 && vNum > 4) {
        totalScore += vNum;
        updateScore();
        return vNum;
    } else {
        totalScore += hNum + vNum - 1;
        updateScore();
        return hNum + vNum - 1;
    }
}

function Move(x, y) {
    var t = null;
    var visited = new Object();
    var open = new Object();
    var q = new Array();
    var found = false;
    q.push(new pos(movingX, movingY, null));
    open[hashMap(movingX, movingY)] = null;

    while (q != "") {
        t = q.shift();
        var tx = t.x
        var ty = t.y;
        delete open[hashMap(tx, ty)];
        visited[hashMap(tx, ty)] = null;
        if (tx == x && ty == y) {
            found = true;
            break;
        } else {
            var r = hashMap(tx + 1, ty);
            var l = hashMap(tx - 1, ty);
            var u = hashMap(tx, ty - 1);
            var d = hashMap(tx, ty + 1);
            var goade = distance(tx, ty, movingX, movingY);
            if (!(r in visited)) {
                if (v(tx + 1, ty) && !(r in open)) {
                    q.push(new pos(tx + 1, ty, t));
                    open[hashMap(tx + 1, ty)] = null;
                } else if (r in open) {
                    if (distance(tx + 1, ty, movingX, movingY) < goade) {
                        pos(tx + 1, ty, t);
                    }
                }
            }
            if (!(d in visited)) {
                if (v(tx, ty + 1) && !(d in open)) {
                    q.push(new pos(tx, ty + 1, t));
                    open[hashMap(tx, ty + 1)] = null;
                } else if (d in open) {
                    if (distance(tx, ty + 1, movingX, movingY) < goade) {
                        pos(tx, ty + 1, t);
                    }
                }
            }
            if (!(l in visited)) {
                if (v(tx - 1, ty) && !(l in open)) {
                    q.push(new pos(tx - 1, ty, t));
                    open[hashMap(tx - 1, ty)] = null;
                } else if (l in open) {
                    if (distance(tx - 1, ty, movingX, movingY) < goade) {
                        pos(tx - 1, ty, t);
                    }
                }
            }
            if (!(u in visited)) {
                if (v(tx, ty - 1) && !(u in open)) {
                    q.push(new pos(tx, ty - 1, t));
                    open[hashMap(tx, ty - 1)] = null;
                } else if (u in open) {
                    if (distance(tx, ty - 1, movingX, movingY) < goade) {
                        pos(tx, ty - 1, t);
                    }
                }
            }
        }
    }

    Through = t;
    if (found) {
        return true;
    } else {
        return false;
    }
}