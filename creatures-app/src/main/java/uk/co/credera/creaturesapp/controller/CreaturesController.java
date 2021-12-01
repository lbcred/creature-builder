package uk.co.credera.creaturesapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uk.co.credera.creaturesapp.model.AttackAlreadyExistsException;
import uk.co.credera.creaturesapp.model.Creature;
import uk.co.credera.creaturesapp.model.CreatureAlreadyExistsException;
import uk.co.credera.creaturesapp.model.ErrorResponse;
import uk.co.credera.creaturesapp.service.CreatureService;

import javax.servlet.http.HttpUtils;
import javax.validation.Valid;
import java.util.List;


@CrossOrigin("http://localhost:3000")
@RestController
public class CreaturesController {

    private final CreatureService service;

    @Autowired
    public CreaturesController(CreatureService service) {
        this.service = service;
    }

    @PostMapping("/creatures")
    public Creature newCreature (@RequestBody @Valid Creature creature) { return service.addCreature(creature); }

    @GetMapping("/creatures")
    public List<Creature> allCreatures () {
        return service.getAllCreatures();
    }

    @DeleteMapping("/creatures/{id}")
    public ResponseEntity<Integer> deleteCreature (@PathVariable int id){
        service.deleteCreature(id);

        return new ResponseEntity<>(id, HttpStatus.OK);
    }

    @ExceptionHandler({CreatureAlreadyExistsException.class})
    public ResponseEntity<ErrorResponse> creatureAlreadyExists(AttackAlreadyExistsException exception) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ErrorResponse(exception.getMessage()));
    }
}
