CREATE TABLE IF NOT EXISTS stats
(
    stat_id INT PRIMARY KEY,
    health  INT NOT NULL,
    attack  INT NOT NULL,
    defense INT NOT NULL
);

CREATE TABLE IF NOT EXISTS attacks
(
    attack_id   INT PRIMARY KEY,
    name        VARCHAR(255) NOT NULL,
    damage      INT          NOT NULL,
    damage_type VARCHAR(255) NOT NULL,
    attack_type VARCHAR(255) NOT NULL,
    area        INT,
    attack_description VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS creatures
(
    creature_id    INT PRIMARY KEY,
    stat_id        INT REFERENCES stats (stat_id),
    creature_name  VARCHAR(255) NOT NULL,
    creature_type  VARCHAR(255) NOT NULL,
    creature_description VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS attack_mapping
(
    mapping_id INT PRIMARY KEY,
    attack INT REFERENCES attacks (attack_id),
    creature INT REFERENCES creatures (creature_id)
);
