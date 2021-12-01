package uk.co.credera.creaturesapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:9090")
@SpringBootApplication
public class CreaturesAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(CreaturesAppApplication.class, args);
	}

}
