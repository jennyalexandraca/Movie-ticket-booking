package com.backend.cinema.utilities;

import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

	private final JavaMailSender mailSender;


	public EmailService(JavaMailSender mailSender){
		this.mailSender = mailSender;
	}

	public String getTemplateRegister (String url, String name){
		String minifiedHtml = "<!DOCTYPE html><html><head><title>Verificación de Correo Electrónico MagicFilm ⭐</title><link href=\"https://fonts.googleapis.com/css?family=Montserrat\" rel=\"stylesheet\"><style>html,body{font-family:'Montserrat',sans-serif!important;margin:0;padding:0;background-color:#F5F5F5}.container{display:flex;flex-direction:column;align-items:center;justify-content:center;max-width:600px;margin:0 auto;height:100%}.header{background-color:#00c9c8;padding:20px;text-align:center;border-radius:6px}.header h1{color:#fff;font-size:24px;margin:0}.content{background-color:#fff;padding:20px;flex:1;display:flex;flex-direction:column;align-items:center;text-align:justify}.content p{margin:10px;line-height:1.5;text-align:justify}.button{display:inline-block;background-color:#00c9c8;color:#fff;text-decoration:none;padding:10px 20px;border-radius:5px;margin:20px}.footer{background-color:#f2f2f2;padding:10px;text-align:center}</style></head><body><div class=\"container\"><div class=\"content\"><div class=\"header\"><h1>Verificación de Correo Electrónico</h1></div><p>Estimado/a {{name}},</p><p>¡Gracias por registrarte en MagicFilm!</p><p>Nos complace informarte que tu cuenta ha sido creada exitosamente. Ahora estás listo/a para disfrutar de la mejor experiencia cinematográfica y reservar tus boletas para las películas más recientes.</p><p>MagicFilm es tu plataforma de confianza para descubrir películas emocionantes, explorar sinopsis, ver tráilers y reservar tus boletas desde la comodidad de tu hogar. Estamos comprometidos a brindarte la mejor selección de películas, salas de cine cómodas y un servicio excepcional.</p><p>Para comenzar a utilizar nuestra plataforma, por favor, verifica tu dirección de correo electrónico haciendo clic en el siguiente enlace:</p><div style=\"text-align:center;\"><a class=\"button\" href=\"{{stringUrl}}\">Verificar Correo Electrónico</a></div><p>¡No te pierdas los estrenos más esperados! MagicFilm te ofrece una amplia variedad de géneros y películas para todos los gustos. Además, te mantendremos informado/a sobre promociones exclusivas, eventos especiales y mucho más.</p><p>Si tienes alguna pregunta o necesitas asistencia, nuestro equipo de soporte estará encantado de ayudarte. No dudes en contactarnos a través de nuestro sitio web o enviando un correo electrónico a <a href=\"mailto:magicfilmdh@gmail.com\">magicfilm@gmail.com</a></p><div class=\"footer\"><p>El equipo de MagicFilm</p></div></div></div></body></html>";
		return minifiedHtml.replace("{{name}}",name).replace("{{stringUrl}}",url);
	}

	public void sendRegisterEmail(String name, String url, String email, String subject) throws Exception {
		try{
			MimeMessage message = mailSender.createMimeMessage();
			MimeMessageHelper helper = new MimeMessageHelper(message, true);
			helper.setTo(email);
			helper.setSubject(subject);
			helper.setText(getTemplateRegister(url, name), true);
			mailSender.send(message);

		} catch (Exception e) {
			throw new Exception("Failed to send email: " + e.getMessage());
		}
	}


}
