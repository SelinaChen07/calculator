var totalInput=''; 

//show the operation is the screen, eg:"4+0.9*2"
var showOperation = function(totalInput){
	$("#screen_operation").html(totalInput);
};

var isOperator = function(char){
	if(char === '+' || char === '-' || char === '*' || char === '/'){
		return true;
	}else{
		return false;
	}
};

var endsWithOperator = function(totalInput){
	var lastChar = totalInput[totalInput.length-1];
	if(isOperator(lastChar)){
		return true;
	}else{
		return false;
	}
};

//returns the last number in the operation. For example, currentNum('3') =>'3'. currentNum('3+434') => 434.
var currentNum = function(totalInput){
	var length = totalInput.length;
	var i = length-1;
	while(!(isOperator(totalInput[i])|| i === -1)){
		i--;
	}
	return totalInput.substr(i+1, length-1)
}

$('.num').click(function(event){
	var input = event.target.innerHTML;
	totalInput = totalInput + input;
	showOperation(totalInput);	
});

// If number starts with point, turn into '0.'. It is invalid if point already exists in the number.
$('#point').click(function(event){
	var input = event.target.innerHTML;
	if(totalInput === '' || endsWithOperator(totalInput)){
		totalInput = totalInput + '0.';
		showOperation(totalInput);
	}else if(!(currentNum(totalInput).includes('.'))){
		totalInput = totalInput + '.';
		showOperation(totalInput);
	}
});

$('#backspace').click(function(event){
	$("#screen_result").html(''); // clean the result first if use wants to revise the operation.
	var length = totalInput.length;
	totalInput = totalInput.substring(0,length-1);
	showOperation(totalInput);
});

////It is invalid to input operator first unless it's '-', and it is invalid to input two operators in a row.
$('.operator').click(function(event){
	var input = event.target.innerHTML;
	if(totalInput === ''){ 
		if(input === '-'){	
			totalInput = input;
			showOperation(totalInput);	
		}
	}else if(!endsWithOperator(totalInput)){
		totalInput = totalInput + input;
		showOperation(totalInput);

	}
});

$('#equal').click(function(event){
	if(totalInput){
		$("#screen_result").html('='+eval(totalInput));
	}
	
});

$('#clear').click(function(event){
	$("#screen_operation").html('');
	$("#screen_result").html('');
	totalInput = '';	
});