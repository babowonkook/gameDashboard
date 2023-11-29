/* Custom Dragula JS */
var drake = dragula([
  document.getElementById("doing"),
  document.getElementById("done"),
  document.getElementById("waiting"),
  document.getElementById("scheduled")
]).on("drag", function(el) {
    el.className.replace("ex-moved", "");
  })
  .on("drop", function(el, target, source, sibling) {
    // el: 드래그하고 있는 요소
    // target: el이 드래그 후 놓아진 리스트 요소
    // sibling: 자리에 놓았을 때, 바로 그 다음 요소
    // source: 원래 el이 있던 리스트 요소
    el.className += "ex-moved";
    var childrenLength = target.children.length;
    console.log(childrenLength);
    if(el.classList.contains('player') && "scheduled" == target.id){
      var idNum = childrenLength++;
      document.getElementById("scheduled").innerHTML +=
        "<li class='column scheduled-column'>" +
        "<div class='column-header'>" +
        "  <h4>"+idNum+"번 대기</h4>" +
        "</div>" +
        "<ul class='player-list' id='doing"+idNum+"'>" +
        "</ul>" +
        "</li>";

      //drake.remove();
    }
    
  })
  .on("over", function(el, container) {
    container.className += " ex-over";
  })
  .on("out", function(el, container) {
    container.className.replace(" ex-over", "");
  });

/* Vanilla JS to add a new player */
function addGuest() {
  /* Get player text from input */
  var inputGuest = document.getElementById("guestText").value.trim();
  if(inputGuest == ''){
    alert("게스트를 입력해주세요.");
    return false;
  } 
  /* Add player to the 'To Do' column */
  document.getElementById("done").innerHTML +=
    "<li class='player'><p>" + inputGuest + "</p></li>";
  /* Clear player text from input after adding player */
  document.getElementById("guestText").value = "";
}

function endGame() {
  alert("게임 종료 되었습니다.");
}

/* Vanilla JS to delete players in 'Trash' column */
function emptyTrash() {
  /* Clear players from 'Trash' column */
  document.getElementById("waiting").innerHTML = "";
}

$('button[name="startGame"]').click(function(){
  var match = makeMatch('playing');
  match.appendTo('#playing');
  $(this).parent().parent().find('li.player').appendTo(match.find('.player-list'));
  $(this).parents('.scheduled-column').remove();
});


// $('button[name="endGame"]').click(function(){
//   $(this).parent().parent().find('li.player').appendTo('#waiting');
//   $(this).parents('.playing-column').remove();
// });

$(document).on('click', 'button[name="endGame"]', function(){
  $(this).parent().parent().find('li.player').appendTo('#waiting');
  $(this).parents('.playing-column').remove();
});

function makeMatch(type){
  var idNum = $('#'+type).find('.column').length+1;
  var $match = $("<li class='column "+type+"-column'>" +
  "<div class='column-header'>" +
  "  <h4>"+idNum+"번 대기</h4>" +
  "</div>" +
  "<ul class='player-list' id='" + type +idNum+"'>" +
  "</ul>" +
  "<div class='column-button'>" +
  "  <button class='button delete-button' name='endGame'>종료</button>" +
  "</div>" +
  "</li>");
  
  return $match;
}
