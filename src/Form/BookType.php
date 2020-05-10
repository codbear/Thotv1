<?php

namespace App\Form;

use App\Entity\Author;
use App\Entity\Book;
use App\Entity\Collection;
use App\Entity\Format;
use App\Entity\Genre;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class BookType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('title', TextType::class)
            ->add('isbn', TextType::class, [
                'label' => 'ISBN',
                'required' => false,
            ])
            ->add('volume', IntegerType::class, [
                'required' => false,
            ])
            ->add('description', TextareaType::class, [
                'required' => false,
            ])
            ->add('observations', TextareaType::class, [
                'required' => false,
            ])
            ->add('hasBeenRead', CheckboxType::class, [
                'label' => 'Read',
                'required' => false,
            ])
            ->add('isEbook', CheckboxType::class, [
                'label' => 'Dematerialized',
                'required' => false,
            ])
            ->add('publicationYear', IntegerType::class, [
                'label' => 'Publication date',
                'required' => false,
            ])
            ->add('author', EntityType::class, [
                'class' => Author::class,
            ])
            ->add('genre', EntityType::class, [
                'class' => Genre::class,
            ])
            ->add('format', EntityType::class, [
                'class' => Format::class,
            ])
            ->add('collection', EntityType::class, [
                'class' => Collection::class,
            ]);
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Book::class,
            'translation_domain' => 'forms'
        ]);
    }
}
