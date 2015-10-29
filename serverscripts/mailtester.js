/**
 * Created by johnfranklin on 10/28/15.
 */
/**
 * tester for manbir's mail method with mock data.
 */
driver = require("./manbirsmail");
email1 = {};
email1._id = "???"
email1.ownerId = "johnfranklin42@gmail.com";//The email to send to. NOT THE EMAIL OF THE SENDER!
email1.senderId = "mrandhawa27@gmail.com";//email sent from. the id of the sender technically.
email1.links = ["http://mongoosejs.com/docs/middleware.html"]
email1.sent = false
email1.body = "Dummy Body";//the body of the email.
email1.title = "Dummy Title";//the title
email1.links= ["/profile", "https://mail.google.com/mail/u/1/#inbox/150b48a0b79c8188", "https://github.com/Matthancock03/cmpe165/tree/nodemailer-testing/bower_components"];
driver.manbirMail(email1);
//driver.manbirMail(emailnobodynotitle);
//driver.manbirMail(emailnobody);
//driver.manbirMail(emailnotitle);