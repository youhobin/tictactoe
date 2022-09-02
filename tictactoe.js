const { body } = document; // const body = document.body body처럼 같을때 사용 - 구조분해할당 / document.createElement도 createElement로 줄임
const $table = document.createElement('table');  // document 가 생략됨.
const $result = document.createElement('div');  // document 가 생략됨.
const rows = [];
let turn = 'O';

const checkWinner = (target) => {
    let rowIndex;
    let cellIndex;
    rows.forEach((row, ri) => {
        row.forEach((cell, ci) => {
            if  (cell === target) {
                rowIndex = ri;
                cellIndex = ci;
            }
        });
    }); 
    //3칸 다 채워졌나?
    let hasWinner = false;
    // 가로줄 검사
    if (
        rows[cellIndex][0].textContent === turn &&
        rows[cellIndex][1].textContent === turn &&
        rows[cellIndex][2].textContent === turn 
    ) {
        hasWinner = true;
    };
    //세로줄 검사
    if (
        rows[0][cellIndex].textContent === turn &&
        rows[1][cellIndex].textContent === turn &&
        rows[2][cellIndex].textContent === turn 
    ) {
        hasWinner = true;
    };
    //대각선 검사
    if (
        rows[0][0].textContent === turn &&
        rows[1][1].textContent === turn &&
        rows[2][2].textContent === turn 
    ) {
        hasWinner = true;
    };
    if (
        rows[0][2].textContent === turn &&
        rows[1][1].textContent === turn &&
        rows[2][0].textContent === turn 
    ) {
        hasWinner = true;
    };
    return hasWinner;
}

function callback (event) {
    if (event.target.textContent !== '') return; // 칸 안에 이미 값이 있으면 함수 멈춰버리게
    event.target.textContent = turn;
    //승부 판단
    if (checkWinner(event.target)) {
        $result.textContent = `${turn}님이 승리`;
        $table.removeEventListener('click', callback);
        return;
    };
    // 무승부 검사
    let draw = true;
    rows.forEach((row) => {
        row.forEach((cell) => {
            if (!cell.textContent){
                draw = false;
            }
        });
    });
    if (draw) {
        $result.textContent = `무승부`;
        return;
    }

    if (turn === 'O') {
        turn = 'X';
    } else if (turn === 'X') {
        turn = 'O';
    };
}

for (let i=1; i <= 3; i++) {
    const $tr = document.createElement('tr');
    const cells = [];
    for (let j=1; j <= 3; j++) {
        const $td = document.createElement('td');
        cells.push($td);
        
        $tr.append($td);
    }
    rows.push(cells);
    $table.append($tr);
}

$table.addEventListener('click', callback);
body.append($table);
body.append($result);