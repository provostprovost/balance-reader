(function() {
  $('#balanceForm').on('submit', function(e) {
    e.preventDefault();

    var balanceInput = $('#balanceText').val();
    var balanceText = balanceToText(balanceInput);

    window.player = new Audio();

    playSound(balanceText, 0);

    var counter = 1;
    $(window.player).on('ended', function() {
      if (counter < balanceText.length) {
        playSound(balanceText, counter);
        counter++;
      }
    });
  });

  function balanceToText(balance) {
    var centsNum = Math.round(parseFloat(balance) % 1 * 100);
    var dollarsNum = Math.floor(parseFloat(balance));

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

    return ["yourbalanceis"].concat(billions, millions, thousands, hundreds,
                  dollarText, "and", cents, centText).filter(Boolean);
  }

  function twoDigits(num) {
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
      if (secondDigit == 0) {
        return [tensText[firstDigit - 2]];
      }
      else {
        return [tensText[firstDigit - 2], numberText[secondDigit]];
      }
    }
  };

  function threeDigits(num) {
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

  function playSound(array, index) {
    window.player.src = "sounds/" + array[index] + ".mp3";
    window.player.play();
  }
})();
