require('dotenv').config();
var nodemailer = require('nodemailer');

const send = (order, email) => {
	var transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: process.env.EMAIL,
			pass: process.env.EMAIL_PASSWORD,
		},
	});

	var mailOptions = {
		from: process.env.EMAIL,
		to: `adilovic79@yahoo.com, ${email}`,
		subject: 'Potvrda vaše narudžbe broj: ' + order.orderNumber,
		text: `Hvala na vašoj narudžbi sadnica broj: ${order.orderNumber}!\n${order.firstName} ${order.lastName}\n${order.address}\n${order.city} ${order.postNumber}\nTelefon: ${order.phone}\nUkupna vrijednost sadnica: ${order.totalOrder}KM\nStandardna dostava brzom poštom: 10KM\nZa provjeru stanja vaše narudžbe nazovite 062-261-353\nIli provjerite vas profil na https://sadnice.herokuapp.com/ ako ste registrovani korisnik.`,
	};

	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log(error);
		} else {
			console.log('Email sent: ' + info.response);
		}
	});
};

module.exports = send;
