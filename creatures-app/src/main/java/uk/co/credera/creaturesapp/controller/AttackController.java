package uk.co.credera.creaturesapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uk.co.credera.creaturesapp.model.Attack;
import uk.co.credera.creaturesapp.model.AttackAlreadyExistsException;
import uk.co.credera.creaturesapp.model.AttackNotFoundException;
import uk.co.credera.creaturesapp.model.ErrorResponse;
import uk.co.credera.creaturesapp.service.AttackService;

import javax.validation.Valid;
import java.util.List;


@CrossOrigin("http://localhost:3000")
@RestController
public class AttackController {

    private final AttackService service;

    @Autowired
    public AttackController(AttackService service) {
        this.service = service;
    }

    @PostMapping("/attacks")
    public Attack newAttack (@RequestBody @Valid Attack attack){ return service.addAttack(attack); }

    @GetMapping("/attacks/{id}")
    public Attack getAttack (@PathVariable("id") Integer id){
        Attack attack = service.getAttack(id);
        return attack;
    }

    @DeleteMapping("/attacks/{id}")
    public ResponseEntity<Integer> deleteAttack (@PathVariable int id){
        service.deleteAttack(id);

        return new ResponseEntity<>(id, HttpStatus.OK);
    }

    @GetMapping("/attacks")
    public List<Attack> allAttacks(){
        return service.getAllAttacks();
    }

    @ExceptionHandler({AttackNotFoundException.class})
    public ResponseEntity<ErrorResponse> attackNotFound(AttackNotFoundException exception){
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ErrorResponse(exception.getMessage()));
    }

    @ExceptionHandler({AttackAlreadyExistsException.class})
    public ResponseEntity<ErrorResponse> attackAlreadyExists(AttackAlreadyExistsException exception){
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ErrorResponse(exception.getMessage()));
    }
}
