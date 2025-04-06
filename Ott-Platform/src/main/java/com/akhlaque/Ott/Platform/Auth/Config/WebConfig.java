package com.akhlaque.Ott.Platform.Auth.Config;

import java.util.Arrays;
import java.util.Collections;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import jakarta.servlet.http.HttpServletRequest;

@Configuration
public class WebConfig {
    @Bean
    public SecurityFilterChain springSecurityConfiguration(HttpSecurity http) throws Exception {

        http.sessionManagement(sessionManagement -> sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                .cors(cors -> {
                    cors.configurationSource(request -> {
                        CorsConfiguration cfg = new CorsConfiguration();
                        cfg.setAllowedOrigins(Arrays.asList("http://localhost:5174", "http://localhost:5173")); // Add multiple origins properly
                        cfg.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
                        cfg.setAllowCredentials(true);
                        cfg.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type", "Accept"));
                        cfg.setExposedHeaders(Arrays.asList("Authorization"));
                        return cfg;
                    });
                })

                .authorizeHttpRequests(auth -> {
                    auth
                            .requestMatchers(HttpMethod.POST, "/ott/customers/add").permitAll()
                            .requestMatchers(HttpMethod.GET, "/api/all/video").permitAll()
                            .requestMatchers(HttpMethod.GET, "/api/search/video").permitAll()

                            .requestMatchers(
                                    HttpMethod.POST,
                                    "/api/create"
                            ).hasRole("ADMIN")
                            .requestMatchers(
                                    HttpMethod.PUT,
                                    "/ott/admin/**"

                            ).hasRole("ADMIN")
                            .requestMatchers(
                                    HttpMethod.PUT,
                                    "/ott/customers/api/**",
                                    "/api/history/**"

                            ).hasRole("USER")

                            .requestMatchers(
                                    HttpMethod.DELETE,
                                    "/api/delete/post/**"

                            ).hasRole("ADMIN")
                            .requestMatchers(
                                    HttpMethod.GET,

                                    "/ott/signIn",
                                    "ott/customers/api/**"

                            ).hasAnyRole("ADMIN", "USER")

                            .requestMatchers("/ott/customers/add", "/v3/api-docs/**").permitAll()
                            .anyRequest().authenticated();
                })
                .csrf(csrf -> csrf.disable())
                .addFilterAfter(new JwtTokenGeneratorFilter(), BasicAuthenticationFilter.class)
                .addFilterBefore(new JwtTokenValidatorFilter(), BasicAuthenticationFilter.class)
                .httpBasic(Customizer.withDefaults());

        return http.build();

    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return NoOpPasswordEncoder.getInstance();
    }


}

