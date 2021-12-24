package uk.co.credera.creaturesapp.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

@Entity
@Table(name="items",
    uniqueConstraints=@UniqueConstraint(columnNames = {"name"}))
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "item_id")
    private Integer id;

    @NotNull
    @Column(name = "name")
    private String name;

    @NotNull
    @Column(name = "item_type")
    private String itemType;

    @NotNull
    @Column(name = "item_description")
    private String description;

    @ManyToMany
    @JoinTable(name = "item_mapping",
            joinColumns = @JoinColumn(name="item_id"),
            inverseJoinColumns = @JoinColumn(name="creature_id")
    )
    private List<Creature> creatures;

    public Item() {
    }

    public Item(Integer id, String name, String itemType, String description, List<Creature> creatures) {
        this.id = id;
        this.name = name;
        this.itemType = itemType;
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

    public String getItemType() {
        return itemType;
    }

    public void setItemType(String itemType) {
        this.itemType = itemType;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
