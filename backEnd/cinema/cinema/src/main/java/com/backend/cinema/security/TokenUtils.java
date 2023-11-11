package com.backend.cinema.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class TokenUtils {
    private final static String ACCESS_TOKEN_SECRET = "8x/A?D(G+KbPeShVmYq3s6v9y$B&E)H@k";
    private final static Long ACCESS_TOKEN_VALIDITY_SECONDS =  30*24*60*60L;
    private final static Long VERIFY_TOKEN_VALIDITY_SECONDS = 5*60L; // 5 minutos para poder hacer las pruebas

    public static String createToken(String nombre, String email){
        long expirationTime = ACCESS_TOKEN_VALIDITY_SECONDS * 1000;
        Date expirationDate = new Date(System.currentTimeMillis() + expirationTime);

        Map<String, Object> extra = new HashMap<>();
        extra.put("nombre", nombre);

        return Jwts.builder()
                .setSubject(email)
                .setExpiration(expirationDate)
                .addClaims(extra)
                .signWith(Keys.hmacShaKeyFor(ACCESS_TOKEN_SECRET.getBytes()))
                .compact();
    }

    public static String createVerifyToken(String email){
        long expirationTime = VERIFY_TOKEN_VALIDITY_SECONDS*1000;
        Date expirationDate = new Date(System.currentTimeMillis() + expirationTime);
        Map<String, Object> extra = new HashMap<>();
        return Jwts.builder()
                .setSubject(email)
                .setExpiration(expirationDate)
                .addClaims(extra)
                .signWith(Keys.hmacShaKeyFor(ACCESS_TOKEN_SECRET.getBytes()))
                .compact();
    }


    public static UsernamePasswordAuthenticationToken getAuthentication(String token){

            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(ACCESS_TOKEN_SECRET.getBytes())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
            String email = claims.getSubject();
            Date exp= claims.getExpiration();
            System.out.println("exp = " + exp);
            Date now = new Date();


            return new UsernamePasswordAuthenticationToken(email, null, Collections.emptyList());

    }
    public static Claims decodeToken(String token) throws Exception{

            return Jwts.parserBuilder()
                    .setSigningKey(ACCESS_TOKEN_SECRET.getBytes())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();

    }
}
