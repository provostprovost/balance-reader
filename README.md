#Balance Reader

A program to read a bank balance dollar amount in English, using my goofy voice.

All relevant logic is here: [balance_reader.js](js/balance_reader.js)

When the form is submitted, balance_reader.js strips non-numerical characters and converts the number into an array of strings with the balanceToText function. It then plays the first sound ("yourbalanceis.mp3") with the function playSound, and when that is finished playing ( .on('ended') ), iterates through the rest of the array.

##balanceToText

This function takes in numerical string and outputs an array of English words. It gets the appropriate words with the twoDigits and threeDigits functions, then concatenates them into the following format:

"Your balance is" + billions + millions + thousands + hundreds + "dollar(s)" + "and" + cents + "cent(s)"

##playSound

This function concatenates the string with the correct directory and extension to form a path for the MP3 file. It sets the src of the window's audio player to the appropriate file and then plays it.