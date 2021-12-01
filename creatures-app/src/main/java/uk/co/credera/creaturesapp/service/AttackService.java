package uk.co.credera.creaturesapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import uk.co.credera.creaturesapp.model.Attack;
import uk.co.credera.creaturesapp.model.AttackAlreadyExistsException;
import uk.co.credera.creaturesapp.model.AttackNotFoundException;
import uk.co.credera.creaturesapp.repository.AttackRepository;

import java.util.List;

@Service
public class AttackService {

    private AttackRepository attackRepository;

    @Autowired
    public AttackService(AttackRepository attackRepository) {
        this.attackRepository = attackRepository;
    }

    public Attack addAttack(Attack attack){
        try {
            return attackRepository.save(attack);
        }
        catch (DataIntegrityViolationException exception){
            throw new AttackAlreadyExistsException("Attack with name " + attack.getName() + " already exists.");
        }
    }

    public Attack getAttack(Integer id){
        return attackRepository.findById(id)
                .orElseThrow(() -> new AttackNotFoundException("Attack with id " + id + " not found."));
    }

    public List<Attack> getAllAttacks(){
        return attackRepository.findAll();
    }

    public void deleteAttack(Attack attack){ attackRepository.delete(attack); }
    public void deleteAttack(int id){ attackRepository.deleteById(id); }
}
