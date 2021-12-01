package uk.co.credera.creaturesapp.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

@Entity
@Table(name = "creatures",
        uniqueConstraints=@UniqueConstraint(columnNames = {"creature_name"}))
public class Creature {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "creature_id")
    private Integer id;

    @NotNull
    @Column(name = "creature_name")
    private String name;

    @NotNull
    @Column(name = "creature_type")
    private String type;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "stat_id")
    private Stats stats;

    @NotNull
    @Column(name = "creature_description")
    private String description;

    @NotNull
    @ManyToMany(targetEntity = Attack.class)
    @JoinTable(name = "attack_mapping",
        joinColumns = {@JoinColumn(name = "creature_id")},
        inverseJoinColumns = {@JoinColumn(name = "attack_id")})
    private List<Attack> attacks;

    @NotNull
    @ManyToMany(targetEntity = Item.class)
    @JoinTable(name = "item_mapping",
        joinColumns = {@JoinColumn(name = "creature_id")},
        inverseJoinColumns = {@JoinColumn(name = "item_id")})
    private List<Item> items;

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

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Stats getStats() {
        return stats;
    }

    public void setStats(Stats stats) {
        this.stats = stats;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String creatureDescription) {
        this.description = creatureDescription;
    }

    public List<Attack> getAttacks() {
        return attacks;
    }

    public void setAttacks(List<Attack> attacks) {
        this.attacks = attacks;
    }

    public List<Item> getItems() {
        return items;
    }

    public void setItems(List<Item> items) {
        this.items = items;
    }
}
