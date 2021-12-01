package uk.co.credera.creaturesapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import uk.co.credera.creaturesapp.model.Attack;
import uk.co.credera.creaturesapp.model.Item;

@Repository
public interface ItemRepository extends JpaRepository<Item, Integer> {

}
