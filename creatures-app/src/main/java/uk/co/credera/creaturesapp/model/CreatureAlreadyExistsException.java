package uk.co.credera.creaturesapp.model;

public class CreatureAlreadyExistsException extends RuntimeException {
    public CreatureAlreadyExistsException(String message) {
        super(message);
    }
}
