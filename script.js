/* Custom Dragula JS */
var drake = dragula([
  document.getElementById("member"),
  document.getElementById("waiting"),
  document.getElementById("scheduled")
]).on("drag", function(el) {
    el.className.replace(" ex-moved", "");
  })
  .on("drop", function(el, target, source, sibling) {
    // el: 드래그하고 있는 요소
    // target: el이 드래그 후 놓아진 리스트 요소
    // sibling: 자리에 놓았을 때, 바로 그 다음 요소
    // source: 원래 el이 있던 리스트 요소
    el.className += " ex-moved";
    if(el.classList.contains('player')){
      if("scheduled" == target.id){
        var match = makeMatch('scheduled');
        match.appendTo('#scheduled');
        drake.containers.push(match.find('ul.player-list')[0]);
        $(el).appendTo(match.find('ul.player-list'));
        drake.cancel();
      }else if(target.classList.contains('player-list')){
        var memberCnt = $(target).find('li').length;
        if(memberCnt > 4){
          alert("게임은 4인 1조 입니다.")
          drake.cancel(true);
        }else if(memberCnt == 4){
          console.log("시작버튼 노출");
          if($(target).parent().find('div.column-button').length == 0){
            var btn = makeStartButtonDiv('scheduled');
            btn.appendTo($(target).parent());
          }
        }

      }
      
      if(source.classList.contains('player-list')){
        var memberCnt = $(source).find('li.player').length;
        if(memberCnt == 0){
          $(source).parent().remove();
        }else if(memberCnt < 4){
          $(source).parent().find('div.column-button').remove();
        }
      }
    }
    
  })
  .on("over", function(el, container) {
    container.className += " ex-over";
  })
  .on("out", function(el, container) {
    container.className.replace(" ex-over", "");
  });

//document.getElementById("scheduled1"),
$('ul#scheduled ul.player-list').each(function(index, item){
  drake.containers.push(item);
})

/* Vanilla JS to add a new player */
function addGuest() {
  /* Get player text from input */
  var inputGuest = document.getElementById("guestText").value.trim();
  if(inputGuest == ''){
    alert("게스트를 입력해주세요.");
    return false;
  } 
  /* Add player to the 'To Do' column */
  document.getElementById("member").innerHTML +=
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

$(document).on('click', 'button[name="startGame"]', function(){
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
  var title = type == 'playing' ? '게입' : '대기';
  var btn = type == 'playing' ? makeStartButtonDiv(type) : null;
  var $match = $("<li class='column "+type+"-column'>" +
  "<div class='column-header'>" +
  "  <h4>"+idNum+"번 "+title+"</h4>" +
  "</div>" +
  "<ul class='player-list' id='" + type +idNum+"'>" +
  "</ul>" +
  "</li>");
  $match.append(btn);
  return $match;
}

function makeStartButtonDiv(type){
  var buttonText = type == 'playing' ? '종료' : '시작';
  var buttonName = type == 'playing' ? 'endGame' : 'startGame';
  var buttonClass = type == 'playing' ? 'delete-button' : 'add-button';
  var $buttonDiv = $(
  "<div class='column-button'>" +
  "  <button class='button "+buttonClass+"' name='"+buttonName+"'>"+buttonText+"</button>" +
  "</div>");
  
  return $buttonDiv;
}
