package uk.co.credera.creaturesapp.model;

public class ItemAlreadyExistsException extends RuntimeException {
    public ItemAlreadyExistsException(String message) {
        super(message);
    }
}
