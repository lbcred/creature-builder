package uk.co.credera.creaturesapp.model;

public class AttackAlreadyExistsException extends RuntimeException {
    public AttackAlreadyExistsException(String message) {
        super(message);
    }
}
