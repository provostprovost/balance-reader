(function() {
  $('#balanceForm').on('submit', function(e) {
    e.preventDefault();

    // Grab input and strip non-numerical characters
    var balanceInput = $('#balanceText').val().replace(/[^\d.-]/g, '');

    // Get balance text array
    var balanceText = balanceToText(balanceInput);

    window.player = new Audio();

    // We need to play the first sound outside of the on ended loop so
    // that we can trigger an 'ended' event.

    playSound(balanceText[0]);

    // Play all sounds in the array
    var counter = 1;
    $(window.player).on('ended', function() {
      if (counter < balanceText.length) {
        playSound(balanceText[counter]);
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

    // Don't say zeros when not appropriate, e.g. "one thousand zero dollars"
    if (dollarsNum >= 1000 && hundreds == "zero") {
      hundreds = [];
    }

    if (dollarString.length > 3) {
      thousands = threeDigits(parseInt(dollarString.slice(-6,-3))).concat("thousand");
      if (thousands[0] == "zero") { thousands = []; }
    }

    if (dollarString.length > 6) {
      millions = threeDigits(parseInt(dollarString.slice(-9,-6))).concat("million");
      console.log(millions);
      if (millions[0] == "zero") { millions = []; }
    }

    if (dollarString.length > 9) {
      billions = threeDigits(parseInt(dollarString.slice(-12,-9))).concat("billion");
      if (billions[0] == "zero") { billions = []; }
    }

    // Say "dollar" or "dollars"
    var dollarText = "dollars";
    if (dollarsNum == 1) {
      dollarText = "dollar";
    }

    // Say "cent" or "cents"
    var centText = "cents";
    if (centsNum == 1) {
      dollarText = "cent";
    }

    // Concatenate all arrays and strip undefined entries
    return ["yourbalanceis"].concat(billions, millions, thousands, hundreds,
                  dollarText, "and", cents, centText).filter(Boolean);
  }

  function twoDigits(num) {
    // There is a different formula for saying numbers below and above 20.

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
        // Don't say "thirty zero", just "thirty"
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

  function playSound(string) {
    window.player.src = "sounds/" + string + ".mp3";
    window.player.play();
  }
})();
