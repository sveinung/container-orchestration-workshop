package no.bekk.backend

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.web.servlet.FilterRegistrationBean
import org.springframework.context.annotation.Bean

@SpringBootApplication
open class BackendApplication {
    @Bean
    open fun corsFilter(): FilterRegistrationBean {
        val registration = FilterRegistrationBean()
        registration.setFilter(CorsFilter())
        registration.addUrlPatterns("*")
        registration.setName("corsFilter")
        return registration
    }
}

fun main(args: Array<String>) {
    SpringApplication.run(BackendApplication::class.java, *args)
}
