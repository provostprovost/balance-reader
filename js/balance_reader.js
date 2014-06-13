var balanceNum = 0;

$('#balanceForm').on('submit', function(e) {
  e.preventDefault();
  balanceNum = $('#balanceText').val();
  console.log(balanceNum);
  $('#balanceText').val("");
});
