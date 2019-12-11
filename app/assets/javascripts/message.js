$(function(){

  function buildHTML(message){
    if (message.image) {
      var html = `<div class="message__name" data-message_id= ${message.id}>
                    <div class="message__name__box">
                      ${message.user_name}
                    </div>
                    <div class="message__name__time">
                      ${message.date}
                    </div>
                  </div>
                  <div class="message__text" data-message_id= ${message.id}>
                    ${message.text}
                  </div>
                  <img class= "lower-message__image" src="${message.image}">`
    } else {
      var html = `<div class="message__name" data-message_id= ${message.id}>
                    <div class="message__name__box">
                      ${message.user_name}
                    </div>
                    <div class="message__name__time" data-message_id= ${message.id}>
                      ${message.date}
                    </div>
                  </div>
                  <div class="message__text">
                    ${message.text}
                  </div>`
    }
    return html
  }


  $('#new__content').on('submit', function(e){
    e.preventDefault();
    var formdata = new FormData(this);
    var url =$(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formdata,
      dataType: 'json', 
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildHTML(message);
      $('.message').append(html);
      $('form')[0].reset();
      $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      $('.form__submit').prop('disabled', false);
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
    })
  })
  var reloadMessages = function(){
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      last_message_id = $('.message__name:last').data('message_id')
      $.ajax({
        url: "api/messages",
        type: "GET",
        dataType: "json",
        data: {id: last_message_id}
      })
      .done(function(messages){
        var insertHTML = '';
        $.each(messages, function(i, message){
          insertHTML += buildHTML(message)
        });
        $('.message').append(insertHTML);
        $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      })
      .fail(function(){
        arert("自動更新に失敗しました");
      });
    }
  };
  setInterval(reloadMessages, 7000);
});