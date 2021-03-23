<?php 
/*
Template name: Категории
*/
?>

<?php get_header(); ?>


<section class="section categories">
    <div class="container">
        <h2 class="section-title">Категории</h2>
        <div class="d-flex row flex-row flex-wrap">
            <?php 
                $categories = get_categories('child_of=4');

                foreach( $categories as $category ){
                    $category_id = 'category_'.$category->cat_ID;
                    ?>

                        <div class="col-lg-4 col-sm-6 col-12 my-2">
                            <div class="p-3 h-100 shadow rounded d-flex flex-column text-center">
                                <img src="<?php the_field('category_img', $category_id); ?>" alt="" class="category-img mx-auto">
                                <p class="my-2 text-decoration-none text-brown"><?php echo $category->cat_name ?></p>
                                <a href="<?php echo get_home_url(); ?>/katalog?category=<?php echo $category->category_nicename ?>" class="category-link font-small text-brown">Перейти в категорию</a>
                            </div>
                        </div>

                    <?php
                }
            ?>
            <div class="col-lg-4 col-sm-6 col-12 my-2">
                <div class="p-3 h-100 shadow rounded d-flex flex-column text-center">
                    <img src="<?php the_field('category_img', 'category_4'); ?>" alt="" class="category-img mx-auto">
                    <p class="my-2 text-decoration-none text-brown">Все товары</p>
                    <a href="<?php echo get_home_url(); ?>/katalog?category=products" class="category-link font-small text-brown">Перейти в категорию</a>
                </div>
            </div>

        </div>
    </div>
</section>

<?php get_footer(); ?>
