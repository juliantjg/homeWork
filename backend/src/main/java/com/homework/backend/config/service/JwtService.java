package com.homework.backend.config.service;

import java.security.Key;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {
	
	@Autowired
	private Environment env;
	
	// Generate key: https://allkeysgenerator.com/Random/Security-Encryption-Key-Generator.aspx
	// Tick Hex, minimum security 256-bit
	private static final String SECRET_KEY = "77217A25432A462D4A614E635266556A586E3272357538782F413F4428472B4B6250655367566B5970337336763979244226452948404D635166546A576D5A71";
	
	public String extractUsername(String token) {
		return extractClaim(token, Claims::getSubject);
	}
	
	public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
		final Claims claims = extractAllClaims(token);
		return claimsResolver.apply(claims);
	}
	
	/**
	 * Getting/extracting the "claims" part of a JWT token
	 * @param token
	 * @return
	 */
	private Claims extractAllClaims(String token) {
		return Jwts
				.parserBuilder()
				.setSigningKey(getSignInKey())
				.build()
				.parseClaimsJws(token)
				.getBody();
	}
	
	private Key getSignInKey() {
		byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
		return Keys.hmacShaKeyFor(keyBytes);
	}
}
