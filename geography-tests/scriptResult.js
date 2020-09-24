const getTestsGeography = () => {
    let tests = JSON.parse(localStorage.getItem('tests'));
    if (tests) {
        tests.forEach(test => {
            const card = createTestBlock(test);
            document.getElementById('card-box').appendChild(card);  
        })
    }
}

const createTestBlock = (item) => {
    const card = document.createElement('div');
    card.classList.add('card');

    const title = document.createElement('h3');
    title.innerHTML = `#${item.id} ${item.question}`
    card.appendChild(title);

    const image = document.createElement('div');
    image.classList.add('image');
    image.innerHTML = `<img src="img/${item.img}" alt="img">`;
    card.appendChild(image);

    const answerContent = document.createElement('div');
    const form = document.createElement('form');
    form.classList.add('answer-content');
    form.innerHTML = `${createAnswerBlock(item)}`;
    answerContent.appendChild(form);
    card.appendChild(answerContent);


    return card;
}

const createAnswerBlock = (item) => {
    let answersResult = '';
    const answers = item.answers;
    for(let j = 0; j < answers.length; j++) {
        const answer = answers[j];
        let color = 'white';
        if(answer.corect) {
            color = 'green';
        }else if(answer.selected) {
            color = 'red';
        }
        const checkBox = `
            <label class=${color} for=${answer.answer}>
                ${answer.answer}
            </label>
        `;
        answersResult += checkBox;
    }    
    return answersResult;
}

const getResult = () => {
    let tests = JSON.parse(localStorage.getItem('tests'));

    let sum = 0;
    let correctCount = 0; 

    for(let i = 0; i < tests.length; i++) {
        sum += countAnswers(tests[i].answers);
        correctCount += countCorrectAnswers(tests[i].answers);
    }

    const result = document.querySelector('.content-result');
    result.innerHTML = `
        <h3>Вы набрали ${sum} баллов из ${correctCount}</h3>
        <p>Оценка: ${getResultAnswer(sum, correctCount)}!</p>
        <button class="button" type="button" onclick=takeTestAgain()>Пройти тест еще раз</button>
    `
}

const countAnswers = (answers) => {
    let sum = 0;
    for(let j = 0; j < answers.length; j++) {
        let answer = answers[j];
        if(answer.corect && answer.selected) {
            sum++;
        } else if(!answer.corect && answer.selected) {
            sum--;
        }
    }
    if(sum < 0) {
        sum = 0;
    }
    return sum;
}

const countCorrectAnswers = (answers) => {
    let sum = 0;
    for(let j = 0; j < answers.length; j++) {
        let answer = answers[j];
        if(answer.corect) {
            sum++;
        }
    }
    return sum;
}

function getResultAnswer(sum, correctCount) {
    let res = 100 * sum / correctCount;

    if(res >= 70) {
        return 'Хорошо';
    } 
    return 'Упс...попробуйте еще раз';
}

function takeTestAgain() {
    localStorage.removeItem('tests');
    location.href='index.html';
}

getResult();

getTestsGeography();