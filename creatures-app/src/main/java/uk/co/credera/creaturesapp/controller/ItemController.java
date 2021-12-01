package uk.co.credera.creaturesapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uk.co.credera.creaturesapp.model.*;
import uk.co.credera.creaturesapp.service.ItemService;

import javax.validation.Valid;
import java.util.List;


@CrossOrigin("http://localhost:3000")
@RestController
public class ItemController {

    private final ItemService service;

    @Autowired
    public ItemController(ItemService service) {
        this.service = service;
    }

    @PostMapping("/items")
    public Item newItem (@RequestBody @Valid Item item){ return service.addItem(item); }

    @GetMapping("/items/{id}")
    public Item getItem (@PathVariable("id") Integer id){
        Item item = service.getItem(id);
        return item;
    }

    @DeleteMapping("/items/{id}")
    public ResponseEntity<Integer> deleteItem (@PathVariable int id){
        service.deleteItem(id);

        return new ResponseEntity<>(id, HttpStatus.OK);
    }

    @GetMapping("/items")
    public List<Item> allItems(){
        return service.getAllItems();
    }

    @ExceptionHandler({ItemNotFoundException.class})
    public ResponseEntity<ErrorResponse> itemNotFound(ItemNotFoundException exception){
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ErrorResponse(exception.getMessage()));
    }

    @ExceptionHandler({ItemAlreadyExistsException.class})
    public ResponseEntity<ErrorResponse> itemAlreadyExists(ItemAlreadyExistsException exception){
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ErrorResponse(exception.getMessage()));
    }
}
