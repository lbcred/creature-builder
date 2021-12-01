package uk.co.credera.creaturesapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import uk.co.credera.creaturesapp.model.Attack;

@Repository
public interface AttackRepository extends JpaRepository<Attack, Integer> {

}
