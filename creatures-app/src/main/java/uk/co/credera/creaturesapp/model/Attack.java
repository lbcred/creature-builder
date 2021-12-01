package uk.co.credera.creaturesapp.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

@Entity
@Table(name="attacks",
    uniqueConstraints=@UniqueConstraint(columnNames = {"name"}))
public class Attack {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "attack_id")
    private Integer id;

    @NotNull
    @Column(name = "name")
    private String name;

    @NotNull
    @Column(name = "damage")
    private Integer damage;

    @NotNull
    @Column(name = "damage_type")
    private String damageType;

    @NotNull
    @Column(name = "attack_type")
    private String attackType;

    @Column(name = "area")
    private Integer area;

    @Column(name = "attack_description")
    private String description;

    @ManyToMany
    @JoinTable(name = "attack_mapping",
            joinColumns = @JoinColumn(name="attack_id"),
            inverseJoinColumns = @JoinColumn(name="creature_id")
    )
    private List<Creature> creatures;

    public Attack() {
    }

    public Attack(Integer id, String name, Integer damage, String damageType, String attackType, Integer area, String description) {
        this.id = id;
        this.name = name;
        this.damage = damage;
        this.damageType = damageType;
        this.attackType = attackType;
        this.area = area;
        this.description = description;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getDamage() {
        return damage;
    }

    public void setDamage(Integer damage) {
        this.damage = damage;
    }

    public String getDamageType() {
        return damageType;
    }

    public void setDamageType(String damageType) {
        this.damageType = damageType;
    }

    public String getAttackType() {
        return attackType;
    }

    public void setAttackType(String attackType) {
        this.attackType = attackType;
    }

    public Integer getArea() {
        return area;
    }

    public void setArea(Integer area) {
        this.area = area;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
