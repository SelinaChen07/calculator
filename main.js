var calculator ={
	totalInput: '',
	result: '',

	//bundle click event handle to table, only one event handler to the whole table
	init: function(){
		$('#calculator').on('click', calculator.calClickHandler);
	},


	calClickHandler: function(event){
		var ele = $(event.target);
		if(ele.is('.num')){
			calculator.onClickNum(ele);
		}else if(ele.is('#point')){
			calculator.onClickPoint();
		}else if(ele.is('.operator')){
			calculator.onClickOperator(ele);
		}else if(ele.is('#backspace')){
			calculator.onClickBackspace();
		}else if(ele.is('#equal')){
			calculator.onClickEqual();
		}else if(ele.is('#clear')){
			calculator.onClickClear();
		}

	},


	//show the operation in the screen, eg:"4+0.9*2"
	showOperation: function(){
		$("#screen_operation").html(calculator.totalInput);
	},

	isOperator: function(char){
		if(char === '+' || char === '-' || char === '*' || char === '/'){
			return true;
		}else{
			return false;
		}
	},

	endsWithOperator: function(){
		var lastChar = calculator.totalInput[calculator.totalInput.length-1];
		if(calculator.isOperator(lastChar)){
			return true;
		}else{
			return false;
		}
	},

	//returns the last number in the operation. For example, currentNum('3') =>'3'. currentNum('3+434') => 434.
	currentNum: function(){
		var length = calculator.totalInput.length;
		var i = length-1;
		while(!(calculator.isOperator(calculator.totalInput[i])|| i === -1)){
			i--;
		}
		return calculator.totalInput.substring(i+1, length);
	},

	onClickNum: function(ele){
		var input = ele.text();
		calculator.totalInput += input;
		calculator.showOperation(calculator.totalInput);
		console.log(calculator.totalInput);	
	},

	// If number starts with point, turn into '0.'. It is invalid if point already exists in the number.
	onClickPoint: function(){
		console.log(calculator.totalInput);
		if(calculator.totalInput === '' || calculator.endsWithOperator(calculator.totalInput)){
			calculator.totalInput += '0.';
			calculator.showOperation(calculator.totalInput);
		}else if(!(calculator.currentNum(calculator.totalInput).includes('.'))){
			calculator.totalInput += '.';
			calculator.showOperation(calculator.totalInput);
		}
	},

	onClickBackspace: function(){
		$("#screen_result").html(''); // clean the result first if use wants to revise the operation.
		var length = calculator.totalInput.length;
		calculator.totalInput = calculator.totalInput.substring(0,length-1);
		calculator.showOperation(calculator.totalInput);
	},

	//It is invalid to input operator first unless it's '-', and it is invalid to input two operators in a row.
	onClickOperator: function(ele){
		var input = ele.text();
		if(calculator.totalInput === ''){ 
			if(input === '-'){	
				calculator.totalInput = input;
				calculator.showOperation(calculator.totalInput);	
			}
		}else if(!calculator.endsWithOperator(calculator.totalInput)){
			calculator.totalInput += input;
			calculator.showOperation(calculator.totalInput);
		}
	},

	onClickEqual: function(){
		if(calculator.totalInput){
			result = eval(calculator.totalInput);
			if((''+result).length >= 18){
				result = result.toExponential(5);
			}
			$("#screen_result").html('='+result);
		}
	
	},
	onClickClear: function(event){
		$("#screen_operation").html('');
		$("#screen_result").html('');
		calculator.totalInput = '';	
	}

};

$( document ).ready(calculator.init);
