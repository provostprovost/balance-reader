// Grab form input

var balanceText = 0;

$('#balanceForm').on('submit', function(e) {
  e.preventDefault();
  balanceText = $('#balanceText').val();
  console.log(balanceText);
  $('#balanceText').val("");

  console.log(twoDigits(balanceText));
});

var twoDigits = function(digits) {
  var num = parseInt(digits);
  var numberText = [  "zero", "one", "two", "three", "four", "five",
                      "six", "seven", "eight", "nine", "ten", "eleven",
                      "twelve", "thirteen", "fourteen", "fifteen", "sixteen",
                      "seventeen", "eighteen", "nineteen"];
  var tensText = [  "twenty", "thirty", "fourty", "fifty", "sixty",
                    "seventy", "eighty", "ninety"];
  if (num < 20) {
    return [numberText[num]];
  }
  else {
    var firstDigit = parseInt(digits[0]);
    var secondDigit = parseInt(digits[1]);

    return [tensText[firstDigit - 2], numberText[secondDigit]];
  }
};
