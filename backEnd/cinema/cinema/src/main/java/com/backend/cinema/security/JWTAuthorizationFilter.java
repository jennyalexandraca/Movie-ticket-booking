package com.backend.cinema.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JWTAuthorizationFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        String bearerToken = request.getHeader("Authorization");

        if ( bearerToken != null && bearerToken.startsWith("Bearer ")){
            String token = bearerToken.replace("Bearer ", "");
            try {
                UsernamePasswordAuthenticationToken usernamePAT = TokenUtils.getAuthentication(token);
                System.out.println("usernamePAT = " + usernamePAT);
                SecurityContextHolder.getContext().setAuthentication(usernamePAT);
                System.out.println("usernamePAT = " + usernamePAT);
            }
            catch (Exception e){
                System.out.println("e.getMessage() = " + e.getMessage());

                response.getWriter().write(e.getMessage());
                response.setStatus(HttpStatus.FORBIDDEN.value());
                response.getWriter().flush();
                return;
            }

        }
        filterChain.doFilter(request, response);
    }
}
