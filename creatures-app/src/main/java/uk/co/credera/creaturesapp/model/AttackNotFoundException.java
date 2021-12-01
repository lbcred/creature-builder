package uk.co.credera.creaturesapp.model;

public class AttackNotFoundException extends RuntimeException {
    public AttackNotFoundException(String message) {
        super(message);
    }
}
