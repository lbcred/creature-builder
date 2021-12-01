package uk.co.credera.creaturesapp.model;

public class CreatureNotFoundException extends RuntimeException {
    public CreatureNotFoundException(String message) {
        super(message);
    }
}
