json.text @message.text
json.user_name @message.user.name
json.image @message.image.url
json.date @message.created_at.strftime("%Y/%m/%d %H:%M")
json.id @message.id
