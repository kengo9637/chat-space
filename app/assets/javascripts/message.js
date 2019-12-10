$(function(){
  
  function buildHTML(message){
    if (message.image) {
      var html = `<div class="message__name">
                    <div class="message__name__box">
                      ${message.user_name}
                    </div>
                    <div class="message__name__time">
                      ${message.date}
                    </div>
                  </div>
                  <div class="message__text">
                    ${message.text}
                  </div>
                  <img class= "lower-message__image" src="${message.image}">`
    } else {
      var html = `<div class="message__name">
                    <div class="message__name__box">
                      ${message.user_name}
                    </div>
                    <div class="message__name__time">
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
});