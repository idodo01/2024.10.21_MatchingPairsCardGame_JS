const gameStartInfoH3 = document.querySelector('h3');

const gameTimeSpan = document.querySelector('.time');
const gameLevelSpan = document.querySelector('.level');

const cardContainer = document.querySelector('.card-container');


const gameClearTime = 10.0; // 게임 진행 설정 시간 (초) // 설정용 변수
let gameCurrentTime = gameClearTime; // 현재 게임 흘러간 시간 (초) // 실제 사용 변수
let intervalId = null;


// 스페이스 바를 누르면 시작
document.onkeydown = event => {

    if(event.key === ' ' && intervalId === null){
        gameStartInfoH3.style.visibility = 'hidden'; 
       
        create_game(); 
    }
}

// 초 세기
function reset_time(){

    // 이미 게임 진행중이었다면
    if(intervalId !== null){
        // 진행중이던 초읽기를 중단한다
        clearInterval(intervalId);

        // 시간 초기화, 다시 10초로
        gameCurrentTime = gameClearTime;
        
        // .toFixed(1) : 소수점 첫번째 자리까지 표시
        gameTimeSpan.textContent = gameCurrentTime.toFixed(1);
    }

    // 0.1초마다 0.1초씩 시간을 줄인다
    intervalId = setInterval(() => {
        gameCurrentTime -= 0.1; // 0.1초씩 시간 감소

        // 시간이 5초 이하라면
        if(gameCurrentTime <= 5){
            gameTimeSpan.style.color = 'red';
            gameTimeSpan.style.fontWeight = 'bold';
        }

        if(gameCurrentTime <= 0){ 
            clearInterval(intervalId);  
            intervalId = null; 
            
            alert('게임 오버!');

            gameCurrentTime = gameClearTime;
            cardContainer.innerHTML = '';
            gameStartInfoH3.style.visibility = 'visible';
        }
        gameTimeSpan.textContent = gameCurrentTime.toFixed(1);
    }, 100); // 1000이 1초, 100은 0.1초
}



// 숫자로 된 이미지 배열
const images = [
    '1.jpg', '2.jpg', '3.jpg', '4.jpg',
    '1.jpg', '2.jpg', '3.jpg', '4.jpg',
    '5.jpg', '6.jpg', '7.jpg', '8.jpg',
    '5.jpg', '6.jpg', '7.jpg', '8.jpg'
];

// 배열을 무작위로 섞는 함수 (Fisher-Yates 알고리즘 사용)
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


// 새로운 게임 레벨을 생성한다
function create_game(){

    reset_time(); // 초 세기


    // cardContainer.innerHTML = '';
    for (let index = 0; index < images.length; index++) {
        cardContainer.innerHTML += '<div class="card"></div>';
    }

    // 그림 카드 넣기
    const shuffledImages = shuffle(images); // 이미지를 섞음
    const cards = document.querySelectorAll('.card'); // 모든 카드 요소 선택
    const cards2 = document.getElementsByClassName('.card');

    cards.forEach((card, index) => {
        const imgElement = document.createElement('img');
        imgElement.src = `images/${shuffledImages[index]}`; // 무작위로 섞인 이미지
        imgElement.alt = `card${shuffledImages[index]}`;
        card.appendChild(imgElement);
    });


    let firstCard;
    let secondCard;
    let clickCheck = false;

    cards.forEach((card, index) => {
        // card 내부의 img 요소를 찾음
        const imgElement = card.querySelector('img');
        
       
        // 카드 클릭
        card.onclick = () => {
            if(clickCheck == false) { // 아직 첫번째 카드 클릭하지 않음
                firstCard = imgElement.alt;
                console.log(firstCard,clickCheck);
                clickCheck = true;
            } else {
                secondCard = imgElement.alt;
                console.log("2클릭",secondCard, clickCheck);
                clickCheck = false;
            }

            if(firstCard==secondCard) { // 동일한 그림 카드 클릭
                console.log("동일한 그림 발견~");
                
            }
        }

        
    });
    





}
    
