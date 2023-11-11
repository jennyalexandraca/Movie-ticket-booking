package com.backend.cinema.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.io.IOException;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {

        AuthCredentials authCredentials = new AuthCredentials();

        try {
            authCredentials = new ObjectMapper().readValue(request.getReader(), AuthCredentials.class);
        } catch (IOException e){
            System.out.println("e = " + e);
        }

        UsernamePasswordAuthenticationToken usernamePAT = new UsernamePasswordAuthenticationToken(
                authCredentials.getEmail(),
                authCredentials.getPassword(),
                Collections.emptyList()
        );
            return getAuthenticationManager().authenticate(usernamePAT);


    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {

        UserDetailsImpl userDetails =  (UserDetailsImpl) authResult.getPrincipal();
        String token = TokenUtils.createToken(userDetails.getNombre(), userDetails.getUsername());


        response.setContentType("application/json"); // Establecer el tipo de contenido a JSON
        response.setCharacterEncoding("UTF-8"); // Establecer la codificación de caracteres
        Map<String,Object> infoUser = new HashMap<>();

        infoUser.put("accessToken", token);
        infoUser.put("id", userDetails.getID());
        infoUser.put("email", userDetails.getUsername());
        infoUser.put("name", userDetails.getNombre());
        infoUser.put("last_name", userDetails.getApellido());
        infoUser.put("rol", userDetails.getRol());

        StringBuilder sb = new StringBuilder();
        sb.append("{");

        for (Map.Entry<String, Object> entry : infoUser.entrySet()) {
            sb.append("\"").append(entry.getKey()).append("\":\"").append(entry.getValue()).append("\",");
        }

        sb.deleteCharAt(sb.length() - 1); // Elimina la última coma

        sb.append("}");

        String jsonResponse = sb.toString();

        response.addHeader("Authorization", "Bearer " + token);
        response.getWriter().write(jsonResponse);
        response.getWriter().flush();



        super.successfulAuthentication(request, response, chain, authResult);
    }
}