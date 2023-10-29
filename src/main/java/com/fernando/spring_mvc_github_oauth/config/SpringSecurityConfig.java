package com.fernando.spring_mvc_github_oauth.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
public class SpringSecurityConfig {
    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
        .csrf(AbstractHttpConfigurer::disable)
        .cors(AbstractHttpConfigurer::disable)
        .authorizeHttpRequests(authorize -> authorize
        .requestMatchers(new AntPathRequestMatcher("/login")).permitAll()
        .requestMatchers(new AntPathRequestMatcher("/static/**")).permitAll()
        .anyRequest().authenticated())
        
        .oauth2Login(oauthLogin -> oauthLogin
        .loginPage("/login")
        .defaultSuccessUrl("/"))
        .logout(logout -> logout
        .logoutUrl("/logout")
        .logoutSuccessUrl("/login"))
        
        .build();
    }
}
