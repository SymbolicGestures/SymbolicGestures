CREATE TABLE `Users` (
	`id` int NOT NULL,
	`date_created` DATE NOT NULL,
	`email` varchar(255) NOT NULL UNIQUE,
	`first_name` varchar(255) NOT NULL,
	`last_name` varchar(255) NOT NULL,
	`stages` TEXT NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `Applications` (
	`id` int NOT NULL,
	`date_created` DATE NOT NULL,
	`user_id`  NOT NULL,
	`stage` VARCHAR(255) NOT NULL,
	`date_applied` DATE NOT NULL,
	`link` TEXT NOT NULL,
	`company_name` varchar NOT NULL,
	`job_title` varchar NOT NULL,
	`source` VARCHAR(255) NOT NULL,
	`pdf` TEXT NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `Histories` (
	`id` int NOT NULL,
	`date_created` DATE NOT NULL,
	`application_id` INT NOT NULL,
	`event` TEXT NOT NULL
);

CREATE TABLE `Contacts` (
	`id` int NOT NULL,
	`date_created` DATE NOT NULL,
	`application_id` INT NOT NULL,
	`role` TEXT NOT NULL,
	`name` TEXT NOT NULL,
	`email` TEXT NOT NULL,
	`phone` TEXT NOT NULL
);

CREATE TABLE `Notes` (
	`id` int NOT NULL AUTO_INCREMENT,
	`application_id` TEXT NOT NULL,
	`note` TEXT NOT NULL,
	`type` TEXT NOT NULL,
	PRIMARY KEY (`id`)
);

ALTER TABLE `Applications` ADD CONSTRAINT `Applications_fk0` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`);

ALTER TABLE `Histories` ADD CONSTRAINT `Histories_fk0` FOREIGN KEY (`application_id`) REFERENCES `Applications`(`id`);

ALTER TABLE `Contacts` ADD CONSTRAINT `Contacts_fk0` FOREIGN KEY (`application_id`) REFERENCES `Applications`(`id`);

ALTER TABLE `Notes` ADD CONSTRAINT `Notes_fk0` FOREIGN KEY (`application_id`) REFERENCES `Applications`(`id`);
