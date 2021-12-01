package uk.co.credera.creaturesapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import uk.co.credera.creaturesapp.model.Creature;
import uk.co.credera.creaturesapp.model.CreatureAlreadyExistsException;
import uk.co.credera.creaturesapp.model.Stats;
import uk.co.credera.creaturesapp.repository.*;

import java.util.List;

@Service
public class CreatureService {

    private final CreatureRepository creatureRepository;
    private final StatsRepository statsRepository;

    @Autowired
    public CreatureService(CreatureRepository creatureRepository, StatsRepository statsRepository) {
        this.creatureRepository = creatureRepository;
        this.statsRepository = statsRepository;
    }

    public Creature addCreature(Creature creature ) {
        Stats newStats = statsRepository.save(creature.getStats());
        creature.setStats(newStats);
        try {
            return creatureRepository.save(creature);
        }
        catch (DataIntegrityViolationException exception){
            statsRepository.delete(newStats);
            throw new CreatureAlreadyExistsException("Creature with name " + creature.getName() + " already exists.");
        }
    }

    public List<Creature> getAllCreatures(){
        return creatureRepository.findAll();
    }

    public void deleteCreature(int id){
        creatureRepository.deleteById(id);
    }
}
