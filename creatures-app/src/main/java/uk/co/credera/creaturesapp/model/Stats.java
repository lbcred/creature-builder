package uk.co.credera.creaturesapp.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name="stats")
public class Stats {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "stat_id")
    private Integer id;

    @NotNull
    @Column(name = "attack")
    private Integer attack;

    @NotNull
    @Column(name = "defense")
    private Integer defense;

    @NotNull
    @Column(name = "health")
    private Integer health;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getAttack() {
        return attack;
    }

    public void setAttack(Integer attack) {
        this.attack = attack;
    }

    public Integer getDefense() {
        return defense;
    }

    public void setDefense(Integer defense) {
        this.defense = defense;
    }

    public Integer getHealth() {
        return health;
    }

    public void setHealth(Integer health) {
        this.health = health;
    }
}
