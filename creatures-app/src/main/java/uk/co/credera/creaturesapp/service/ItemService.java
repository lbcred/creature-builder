package uk.co.credera.creaturesapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import uk.co.credera.creaturesapp.model.*;
import uk.co.credera.creaturesapp.repository.AttackRepository;
import uk.co.credera.creaturesapp.repository.ItemRepository;

import java.util.List;

@Service
public class ItemService {

    private ItemRepository itemRepository;

    @Autowired
    public ItemService(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    public Item addItem(Item item){
        try {
            return itemRepository.save(item);
        }
        catch (DataIntegrityViolationException exception){
            throw new ItemAlreadyExistsException("Item with name " + item.getName() + " already exists.");
        }
    }

    public Item getItem(Integer id){
        return itemRepository.findById(id)
                .orElseThrow(() -> new ItemNotFoundException("Item with id " + id + " not found."));
    }

    public List<Item> getAllItems(){
        return itemRepository.findAll();
    }

    public void deleteItem(Item item){ itemRepository.delete(item); }
    public void deleteItem(int id){ itemRepository.deleteById(id); }
}
