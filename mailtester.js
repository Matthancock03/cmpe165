/**
 * Created by johnfranklin on 10/28/15.
 */
/**
 * tester for manbir's mail method with mock data.
 */
driver = require("manbirsmail");
email1 = {};
email1._id = "???"
email1.ownerId = "mrandhawa27@gmail.com";//The email to send to. NOT THE EMAIL OF THE SENDER!
email1.senderId = "johnfranklin42@gmail.com";//email sent from. the id of the sender technically.
email1.links = ["http://mongoosejs.com/docs/middleware.html"]
email1.sent = false
emailnobodynotitle = email1;
email1.body = "Dummy Body";//the body of the email.
emailnobody = email1;
email1.title = "Dummy Title";//the title
emailnotitle = email1;
emailnotitle.title = null;

driver.manbirMail(email1);
driver.manbirMail(emailnobodynotitle);
driver.manbirMail(emailnobody);
driver.manbirMail(emailnotitle);