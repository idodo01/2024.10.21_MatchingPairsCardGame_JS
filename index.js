const gameStartInfoH3 = document.querySelector('h3');

const gameTimeSpan = document.querySelector('.time');
const gameLevelSpan = document.querySelector('.level');

const cardContainer = document.querySelector('.card-container');


const gameClearTime = 30.0; // 게임 진행 설정 시간 (초) // 설정용 변수
let gameCurrentTime = gameClearTime; // 현재 게임 흘러간 시간 (초) // 실제 사용 변수
let intervalId = null;


// 키가 눌림
document.onkeydown = event => {

    // 그 키가 스페이스 바이면서
    // 타이머가 작동되지 않았을 때,
    // 게임 시작
    if(event.key === ' ' && intervalId === null){
        gameStartInfoH3.style.visibility = 'hidden';  // 시작 문구 지우기
       
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

        // 게임 오버, 게임 종료
        if(gameCurrentTime <= 0){  
            clearInterval(intervalId);  
            intervalId = null; 
            
            alert('게임 오버!');

            gameCurrentTime = gameClearTime; // 타이머 초기화
            cardContainer.innerHTML = ''; // 카드 나오는 부분 비우기
            gameStartInfoH3.style.visibility = 'visible'; // 시작 문구 다시 보이도록
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


// 새로운 게임을 생성한다
function create_game(){

    reset_time(); // 초 세기


    // cardContainer.innerHTML = '';
    for (let index = 0; index < images.length; index++) {
        cardContainer.innerHTML += '<div class="card"></div>';
    }

    // 그림 카드 넣기
    const shuffledImages = shuffle(images); // 이미지를 섞음
    const cards = document.querySelectorAll('.card'); // 모든 카드 요소 선택

    cards.forEach((card, index) => {
        const imgElement = document.createElement('img');
        // imgElement.src = `images/${shuffledImages[index]}`; // 무작위로 섞인 이미지
        imgElement.src = `images/back.jpg`; // 카드 뒷면 사진
        imgElement.alt = `${shuffledImages[index]}`;
        card.appendChild(imgElement);
    });


    let firstCard = '';
    let secondCard = '';
    let clickCheck = 0; // 카드 클릭 횟수
                        // 0: 아무것도 눌리지않음, 1: 첫번째 카드 눌렸음, 2: 두번째 카드 눌렸음
    let cardCnt = 0; // 맞춘 카드 쌍 (클리어cnt : 8)

    cards.forEach((card, index) => {
        // card 내부의 img 요소를 찾음
        const imgElement = card.querySelector('img');
        
       
        // 카드 클릭
        card.onclick = () => {
            
            if(clickCheck == 0) { 
                firstCard = imgElement;
                firstCard.alt = imgElement.alt;
                // 누르면 카드 앞면이 나타남

                firstCard.src = `images/${firstCard.alt}`;

                console.log("1번째 카드 눌림",firstCard.alt,clickCheck);
                clickCheck = 1; // 1번째 카드 눌림

            } else {
                secondCard = imgElement;
                secondCard.alt = imgElement.alt;
                // 누르면 카드 앞면이 나타남
                secondCard.src = `images/${secondCard.alt}`;

                console.log("2번째 카드 눌림",secondCard.alt, clickCheck);
                clickCheck = 2;  // 2번째 카드 눌림
            }

            if(clickCheck==2) { // 2번째 카드까지 눌린 상태에서

                // 카드 그림 판단
                if(firstCard.alt==secondCard.alt) { // 동일한 그림 카드 눌려짐
                    // 0.5초 뒤, 같은 그림 카드 둘다 없애기
                    setTimeout(removeCard,500); 

                    function removeCard() {
                        console.log("동일한 그림 발견~");

                        firstCard.remove();
                        secondCard.remove();

                        cardCnt++;

                        if(cardCnt == 8) { // 맞춘 카드 쌍 개수가 8이 되면 클리어

                            clearInterval(intervalId);  
                            intervalId = null; 
                            
                            alert('게임 클리어~!!');
                        }
                    }           

                } else { // 다른 그림이 눌려짐
                    
                    // 0.5초 뒤, 카드 뒷면 다시 보여주기
                    setTimeout(backCard,500); 

                    function backCard() {
                        console.log("다른 그림이지요~");

                        firstCard.src = `images/back.jpg`; 
                        secondCard.src = `images/back.jpg`;
                    }           
                }
                clickCheck = 0; // 카드 클릭 횟수 초기화

            }


            
        }

        
    });
    





}
    
