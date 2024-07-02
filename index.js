//localStorage
var questionList = [
	{
		id:1,
		category:'fun',
		questionText:'What is capital of India',
		answer:'Delhi',
		options: ['Delhi','Maharastra','Mumbai','U.P']
	},
	{
		id:2,
		category:'fun',
		questionText:'Who won world cup 2024',
		answer :'Australia',
		options:['Australia','England','India','South-Africa']
	},
	{
		id:3,
		category:'fun',
		questionText:'Is String is Data Type Of JS',
		answer :'Yes',
		options:['Yes','No']
	},
	{
		id:4,
		category:'fun',
		questionText:'Which country is hosting t20 world cup 2024',
		answer :'USA & WestIndies',
		options:['USA & WestIndies','USA','WestIndies','None']
	},
	{
		id:5,
		category:'fun',
		questionText:'Which state is most populated ?',
		answer :'U.P',
		options:['U.P','Rajashthan','Bihar','Madhya Pradesh']
	},
];

var currentIndex = 0;
var questionTextBlock = document.getElementsByClassName('question')[0];
var optionsBlock = document.getElementsByClassName('options')[0];
var scoreBlock = document.getElementById('current-score');
var qNoIndex = document.getElementById('q_no_index');
var nextBtn = document.getElementsByClassName('next-btn')[0];
var currentTimeOut = null;

nextBtn.addEventListener('click',function (){
		moveToNext();
		console.log('c',currentTimeOut);
		if(currentTimeOut != null){
			clearTimeout(currentTimeOut);
			currentTimeOut = null;
		}
});

document.getElementsByClassName('retry-btn')[0].addEventListener('click',function (){
		startQuestion();
});;

function createQuestion(index){
	let isOptionClicked = false;
	questionTextBlock.innerHTML = '';
	optionsBlock.innerHTML = '';
	cuurentTimeOut = null;
	let questionItem = questionList[index];
	currentIndex = index;
	console.log('currentIndex',currentIndex);
	qNoIndex.innerText = `${currentIndex+1}/${questionList.length}`;
	const {questionText,options,answer} = questionItem;
	questionTextBlock.innerText = questionText;
	console.log(questionText);
	options.map((option,index) => {
		let div =document.createElement('div');
		div.innerHTML = `<span class="s_no"> ${index+1} </span> <span class="answer" data-val=${option}>${option.toUpperCase()}.<span>`;

		div.addEventListener('click',function handleAnswerClick(){
				if(isOptionClicked == true){
					return;
				}
				isOptionClicked = true;
				let isAnswerCorrect = checkAnswer(option,answer);
				div.style.backgroundColor = isAnswerCorrect ? 'green':'red';
				updateScore(isAnswerCorrect);
				currentTimeOut = 	setTimeout(()=>{
					moveToNext();
				},5000);
				console.log('a',currentTimeOut);	
		});
		div.classList.add('option');
		optionsBlock.append(div);
	});
}

function updateScore(isAnswerCorrect){
	let newScore = isAnswerCorrect ? 4 :-5;
	scoreBlock.innerText = Number(scoreBlock.innerText) + (newScore);
}

function moveToNext(){
	if(currentIndex +1 <questionList.length){
		createQuestion(currentIndex+1);	
	}else{
		showResult();	
	}
}

function showResult(){
	document.getElementById('main-container').style.display = 'none';
	document.getElementById('last-card').style.display = 'block';
	let currentScore = Number(scoreBlock.innerText);
	let mssg = '';
	if(localStorage.getItem('maxVal')){
			let maxVal = Number(localStorage.getItem('maxVal'));
			mssg = 'You need to work hard';
			if(maxVal < currentScore){
				mssg = 'You have done great job.You have now highest score';
			}
			if(maxVal == currentScore){
				mssg = 'You have done good job.You have now equal to highest score'
			}
	}
	let maxVal = Math.max(currentScore,localStorage.getItem('maxVal'));
	localStorage.setItem('maxVal',maxVal);
	document.getElementById('last-card-content').innerHTML = `You have scored ${Number(scoreBlock.innerText)} out of ${4*questionList.length} . ${mssg}`;
}
function startQuestion(){
	document.getElementById('main-container').style.display = 'block';
	document.getElementById('last-card').style.display = 'none';
		createQuestion(0);
}

function checkAnswer(answerGiven,correctAnswer){
		return answerGiven == correctAnswer
}

(function init(){
	startQuestion();
})();
