const getTestsFromLocalStorage = () => {
    const testsFromLS = JSON.parse(localStorage.getItem('tests'));
    if(testsFromLS) {
        testsFromLS.forEach((test, i) => testsGeography[i] = test);
    }
}

const setTestsToLocalStorage = () => {
    localStorage.setItem('tests', JSON.stringify(testsGeography))
}

getTestsFromLocalStorage();

const checkTest = () => {
    testsGeography.forEach(question => {
        let allAnswers = question.answers;
        let selectedAnswers = document.querySelectorAll(`input[id=answer${question.id}]:checked`);
        selectedAnswers.forEach(selectedAnswer => {
            let storedAnswer = allAnswers.find(answer => answer.answer === selectedAnswer.value);
            storedAnswer.selected = true;
        })
    })
    setTestsToLocalStorage();
    location.href='indexResult.html';
}

const getTimer = (duration, display) => {
    let timer = duration - 1, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

window.onload = function () {
    let oneMinutes = 60;
    let display = document.querySelector('#time');
    getTimer(oneMinutes, display);
    setTimeout(function() {
        checkTest();
    }, 60000);
}

const getTestsGeography = (tests = testsGeography) => {
    tests.forEach(test => {
        const card = createTestBlock(test);
        document.getElementById('card-box').appendChild(card);  
    })
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
        const answer = answers[j].answer;
        const checkBox = `
            <label for=${answer}>
                <input class="answer" type="checkbox" id="answer${item.id}" value="${answer}">
                ${answer}
            </label>
        `;
        answersResult += checkBox;
    }   
    return answersResult;
}

getTestsGeography();

