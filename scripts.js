let gameStarted = false; // 用来追踪游戏是否已经开始
let score = 0; // 记录分数
let firstCard = null; // 第一个翻开的卡片
let secondCard = null; // 第二个翻开的卡片

// 初始化卡片数据，定义两个主题
let currentTheme = 'one'; // 当前主题，默认是 'one'

const themes = {
    one: [
        { front: 'one1.png', back: 'one2.png' },
        { front: 'one1.png', back: 'one2.png' },
        { front: 'one1.png', back: 'one3.png' },
        { front: 'one1.png', back: 'one3.png' },
        { front: 'one1.png', back: 'one4.png' },
        { front: 'one1.png', back: 'one4.png' },
        { front: 'one1.png', back: 'one5.png' },
        { front: 'one1.png', back: 'one5.png' },
        { front: 'one1.png', back: 'one6.png' },
        { front: 'one1.png', back: 'one6.png' },
        { front: 'one1.png', back: 'one7.png' },
        { front: 'one1.png', back: 'one7.png' },
        { front: 'one1.png', back: 'one8.png' },
        { front: 'one1.png', back: 'one8.png' },
        { front: 'one1.png', back: 'one9.png' },
        { front: 'one1.png', back: 'one9.png' },
    ],
    history: [
        { front: 'history1.png', back: 'history2.png' },
        { front: 'history1.png', back: 'history2.png' },
        { front: 'history1.png', back: 'history3.png' },
        { front: 'history1.png', back: 'history3.png' },
        { front: 'history1.png', back: 'history4.png' },
        { front: 'history1.png', back: 'history4.png' },
        { front: 'history1.png', back: 'history5.png' },
        { front: 'history1.png', back: 'history5.png' },
        { front: 'history1.png', back: 'history6.png' },
        { front: 'history1.png', back: 'history6.png' },
        { front: 'history1.png', back: 'history7.png' },
        { front: 'history1.png', back: 'history7.png' },
        { front: 'history1.png', back: 'history8.png' },
        { front: 'history1.png', back: 'history8.png' },
        { front: 'history1.png', back: 'history9.png' },
        { front: 'history1.png', back: 'history9.png' },
    ]
};


// Fisher-Yates 洗牌算法来打乱数组顺序
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// 根据主题生成卡片
function generateCards(theme) {
    const cardData = themes[theme];
    shuffle(cardData); // 打乱卡片顺序

    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = ''; // 清空现有卡片

    cardData.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.index = index; // 将索引存储在数据集中，便于后续比较

        const frontFace = document.createElement('div');
        frontFace.classList.add('card-face', 'card-front');
        const frontImg = document.createElement('img');
        frontImg.src = card.front;
        frontImg.alt = 'Card Front';
        frontFace.appendChild(frontImg);

        const backFace = document.createElement('div');
        backFace.classList.add('card-face', 'card-back');
        const backImg = document.createElement('img');
        backImg.src = card.back;
        backImg.alt = 'Card Back';
        backFace.appendChild(backImg);

        cardElement.appendChild(frontFace);
        cardElement.appendChild(backFace);

        cardElement.addEventListener('click', () => {
            if (!gameStarted || cardElement.classList.contains('is-flipped')) return;

            cardElement.classList.toggle('is-flipped');

            if (!firstCard) {
                firstCard = cardElement; // 记录第一张卡片
            } else {
                secondCard = cardElement; // 记录第二张卡片

                checkForMatch(firstCard, secondCard); // 检查是否匹配
                firstCard = null; // 重置
                secondCard = null; // 重置
            }
        });

        cardContainer.appendChild(cardElement);
    });

    if (!gameStarted) {
        hideAllCards(); // 开始前隐藏所有卡片
    } else {
        showBack(); // 游戏开始后显示所有卡片背面
    }
}

// 检查是否匹配
function checkForMatch(card1, card2) {
    const index1 = card1.dataset.index;
    const index2 = card2.dataset.index;

    const cardData = themes[currentTheme];
    
    if (cardData[index1].back === cardData[index2].back) {
        score++; // 增加分数
        updateScore(); // 更新分数显示
    } else {
        setTimeout(() => {
            card1.classList.remove('is-flipped'); // 翻回正面
            card2.classList.remove('is-flipped'); // 翻回正面
        }, 1000); // 1秒后翻回
    }
}

// 更新分数显示
function updateScore() {
    const scoreDisplay = document.getElementById('score');
    scoreDisplay.innerText = `分数: ${score}`; // 更新分数文本
}

// 显示背面
function showBack() {
    document.querySelectorAll('.card').forEach(card => {
        card.classList.add('is-flipped'); // 添加翻转类，显示背面
        card.style.display = 'block'; // 显示卡片
    });
}

// 隐藏所有卡片
function hideAllCards() {
    document.querySelectorAll('.card').forEach(card => {
        card.style.display = 'none'; // 隐藏卡片
    });
}

// 显示所有卡片正面
function showAllFront() {
    document.querySelectorAll('.card').forEach(card => {
        card.classList.remove('is-flipped'); // 移除翻转类，显示正面
    });
}

// 切换主题，游戏开始后才允许切换
document.getElementById('switch-theme').addEventListener('click', () => {
    if (gameStarted) {
        currentTheme = currentTheme === 'one' ? 'history' : 'one'; // 在两个主题之间切换
        generateCards(currentTheme); // 重新生成卡片
    } else {
        alert("请先开始游戏");
    }
});

// 翻开全部正面
document.getElementById('show-front').addEventListener('click', () => {
    if (gameStarted) showAllFront();
});

// 翻开全部背面
document.getElementById('show-back').addEventListener('click', () => {
    if (gameStarted) showBack();
});

// 开始游戏
document.getElementById('start-game').addEventListener('click', () => {
    gameStarted = true; // 标记游戏已开始
    score = 0; // 重置分数
    updateScore(); // 更新分数显示
    showBack(); // 显示所有卡片背面

    // 显示分数计表
    document.getElementById('score-container').style.display = 'block';

    // 等待10秒后自动显示正面
    setTimeout(() => {
        showAllFront(); // 显示所有卡片正面
    }, 10000); // 10000毫秒 = 10秒
});

// 初始化时生成默认主题的卡片
generateCards(currentTheme);

// 隐藏分数计表，初始状态下
document.getElementById('score-container').style.display = 'none';


// 初始化时生成默认主题的卡片
generateCards(currentTheme);
