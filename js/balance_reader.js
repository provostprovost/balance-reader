// Grab form input

var balanceText = 0;

$('#balanceForm').on('submit', function(e) {
  e.preventDefault();
  balanceInput = $('#balanceText').val();
  var centsNum = Math.round(parseFloat(balanceInput) % 1 * 100);
  var dollarsNum = Math.floor(parseFloat(balanceInput));

  var dollarString = dollarsNum.toString();

  var cents, hundreds, thousands, millions, billions = [];

  cents = twoDigits(centsNum);

  hundreds = threeDigits(parseInt(dollarString.slice(-3)));

  if (dollarString.length > 3) {
    thousands = threeDigits(parseInt(dollarString.slice(-6,-3))).concat("thousand");
    if (hundreds == ["zero"]) { hundreds = []; }
  }

  if (dollarString.length > 6) {
    millions = threeDigits(parseInt(dollarString.slice(-9,-6))).concat("million");
  }

  if (dollarString.length > 9) {
    billions = threeDigits(parseInt(dollarString.slice(-12,-9))).concat("billion");
  }

  var dollarText = "dollars";
  if (dollarsNum == 1) {
    dollarText = "dollar";
  }

  var centText = "cents";
  if (centsNum == 1) {
    dollarText = "cent";
  }

  var sayThis = ["yourbalanceis"].concat(billions, millions, thousands, hundreds,
                dollarText, "and", cents, centText).filter(Boolean);

  console.log(sayThis);
});

var twoDigits = function(num) {
  var numberText = [  "zero", "one", "two", "three", "four", "five",
                      "six", "seven", "eight", "nine", "ten", "eleven",
                      "twelve", "thirteen", "fourteen", "fifteen", "sixteen",
                      "seventeen", "eighteen", "nineteen" ];
  var tensText = [  "twenty", "thirty", "fourty", "fifty", "sixty",
                    "seventy", "eighty", "ninety" ];
  if (num < 20) {
    return [numberText[num]];
  }
  else {
    var firstDigit = parseInt(num.toString()[0]);
    var secondDigit = parseInt(num.toString()[1]);
    return [tensText[firstDigit - 2], numberText[secondDigit]];
  }
};

var threeDigits = function(num) {
  if (num < 100) {
    return twoDigits(num);
  }
  else {
    hundreds = parseInt(num.toString()[0]);
    tens = [];
    if (num % 100 != 0) {
      tens = twoDigits(num % 100);
    }
    return twoDigits(hundreds).concat("hundred").concat(tens);
  }
}
