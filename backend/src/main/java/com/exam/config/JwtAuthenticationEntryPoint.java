package com.exam.config;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint{

	@Override
	public void commence(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException authException) throws IOException, ServletException {
		response.sendError(HttpServletResponse.SC_UNAUTHORIZED,"Unauthorised:server");
		
	}

}

//{
//	"username":"rohit3",
//	"password":"12345678",
//	"firstName":"Rohit",
//	"lastName":"Dol",
//	"email":"rohitdol21@gmail.com",
//	"phone":"9226412682",
//	"profile":"default.png"
//	
//}