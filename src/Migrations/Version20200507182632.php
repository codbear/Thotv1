<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200507182632 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE genre (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE book (id INT AUTO_INCREMENT NOT NULL, author_id INT NOT NULL, genre_id INT NOT NULL, format_id INT NOT NULL, collection_id INT NOT NULL, title VARCHAR(255) NOT NULL, isbn VARCHAR(13) DEFAULT NULL, volume INT DEFAULT NULL, description LONGTEXT DEFAULT NULL, observations LONGTEXT DEFAULT NULL, has_been_read TINYINT(1) DEFAULT \'0\' NOT NULL, is_ebook TINYINT(1) DEFAULT \'0\' NOT NULL, publication_year INT DEFAULT NULL, created_at DATETIME NOT NULL, INDEX IDX_CBE5A331F675F31B (author_id), INDEX IDX_CBE5A3314296D31F (genre_id), INDEX IDX_CBE5A331D629F605 (format_id), INDEX IDX_CBE5A331514956FD (collection_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE collection (id INT AUTO_INCREMENT NOT NULL, publisher_id INT NOT NULL, name VARCHAR(255) NOT NULL, INDEX IDX_FC4D653240C86FCE (publisher_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE format (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE author (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE publisher (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE book ADD CONSTRAINT FK_CBE5A331F675F31B FOREIGN KEY (author_id) REFERENCES author (id)');
        $this->addSql('ALTER TABLE book ADD CONSTRAINT FK_CBE5A3314296D31F FOREIGN KEY (genre_id) REFERENCES genre (id)');
        $this->addSql('ALTER TABLE book ADD CONSTRAINT FK_CBE5A331D629F605 FOREIGN KEY (format_id) REFERENCES format (id)');
        $this->addSql('ALTER TABLE book ADD CONSTRAINT FK_CBE5A331514956FD FOREIGN KEY (collection_id) REFERENCES collection (id)');
        $this->addSql('ALTER TABLE collection ADD CONSTRAINT FK_FC4D653240C86FCE FOREIGN KEY (publisher_id) REFERENCES publisher (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE book DROP FOREIGN KEY FK_CBE5A3314296D31F');
        $this->addSql('ALTER TABLE book DROP FOREIGN KEY FK_CBE5A331514956FD');
        $this->addSql('ALTER TABLE book DROP FOREIGN KEY FK_CBE5A331D629F605');
        $this->addSql('ALTER TABLE book DROP FOREIGN KEY FK_CBE5A331F675F31B');
        $this->addSql('ALTER TABLE collection DROP FOREIGN KEY FK_FC4D653240C86FCE');
        $this->addSql('DROP TABLE genre');
        $this->addSql('DROP TABLE book');
        $this->addSql('DROP TABLE collection');
        $this->addSql('DROP TABLE format');
        $this->addSql('DROP TABLE author');
        $this->addSql('DROP TABLE publisher');
    }
}
