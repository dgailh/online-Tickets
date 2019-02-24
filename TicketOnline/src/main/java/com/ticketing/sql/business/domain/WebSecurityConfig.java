package com.ticketing.sql.business.domain;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import javax.sql.DataSource;

@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    private DataSource dataSource;
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable()
                .httpBasic().and()
                .authorizeRequests()
                //.antMatchers(HttpMethod.POST,"/api/user/create").permitAll()
                .antMatchers("/api/user/login").permitAll()
                .anyRequest().authenticated(); // disable security for testing
//                .antMatchers("/login").permitAll()
//                .antMatchers("/admin").hasAnyRole("Admin")
//                .anyRequest().authenticated();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {

        auth.jdbcAuthentication().dataSource(dataSource)
                .usersByUsernameQuery("select email , password , enabled " + "from users where email=?"
        ).authoritiesByUsernameQuery("select email , roles_name from users where email=?").passwordEncoder(new BCryptPasswordEncoder());

    }
}
