package com.backend.cinema.utilities;

import javax.net.ssl.*;
import java.security.cert.X509Certificate;
import java.util.Properties;

public class trustAllCerts {
 
    /*TrustManager[] trustAllCerts = new TrustManager[] {
    new X509TrustManager() {
        public X509Certificate[] getAcceptedIssuers() {
            return null;
        }
        public void checkClientTrusted(X509Certificate[] certs, String authType) {
        }
        public void checkServerTrusted(X509Certificate[] certs, String authType) {
        }
    }
};

try {
    // Obtener la instancia del objeto SSLContext
    SSLContext sslContext = SSLContext.getInstance("TLS");

    // Configurar el SSLContext con el TrustManager que confía en todos los certificados
    sslContext.init(null, trustAllCerts, new java.security.SecureRandom());

    // Obtener la fábrica de socket SSL
    SSLSocketFactory sslSocketFactory = sslContext.getSocketFactory();

    // Configurar las propiedades del servidor de correo
    Properties props = new Properties();
    props.put("mail.smtp.ssl.socketFactory", sslSocketFactory);

    // Crear la sesión de JavaMail con las propiedades configuradas
    Session session = Session.getInstance(props, null);

    // Envía el correo electrónico utilizando la sesión
    // ...
} catch (Exception e) {
    e.printStackTrace();
}*/



}
