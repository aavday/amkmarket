<?php get_header(); ?>
        <section class="section intro" id="intro">
            <div class="slider intro__slider">

                <?php 
                    $posts = get_posts( array(
                        'numberposts' => -1,
                        'category_name'    => 'slider',
                        'orderby'     => 'date',
                        'order'       => 'ASC',
                        'post_type'   => 'post',
                        'suppress_filters' => true, // подавление работы фильтров изменения SQL запроса
                    ) );

                    foreach( $posts as $post ){
                        setup_postdata($post);
                        ?>

                        <div class="intro__slider-item" style="background-image: url(<?php the_field('slide_bg') ?>);">
                            <div class="container h-100 d-flex flex-column justify-content-center">
                                <div class="intro__slider-item__inner">
                                    <p class="intro__slider-item__text white">
                                        <?php 
                                            $field = get_field('slide_discount');
                                            if ($field == true) : 
                                                ?>
                                                <span class="text-beige">АКЦИЯ!</span>
                                            <?php
                                                endif;
                                                the_field('slide_text'); 
                                        ?>
                                    </p>
                                    <?php 
                                        $field = get_field('slide_btn');
                                        if ($field == true) : 
                                            ?>
                                            <a href="/kategorii" class="sign-up-link">
                                                <button class="button intro__slider-item__button rounded">ПЕРЕЙТИ В КАТАЛОГ</button>
                                            </a>
                                        <?php
                                            endif;
                                    ?>
                                </div>
                            </div>
                        </div>

                        <?php 
                    }

                    wp_reset_postdata(); // сброс
                ?>

            </div>
        </section>

        <section class="section about-us" id="about-us">
            <div class="container">
                <h1 class="section-title">
                    О КОМПАНИИ
                </h1>
                <?php the_field('about_text'); ?>
            </div>
        </section>

        <section class="section feedback" id="feedback">
            <div class="container">
                <h2 class="section-title">
                    ОТЗЫВЫ
                </h2>
                <i class="fas fa-quote-left d-block"></i>
                <div class="slider feedback__slider">

                    <?php 
                        $posts = get_posts( array(
                            'numberposts' => -1,
                            'category_name'    => 'feedback',
                            'orderby'     => 'date',
                            'order'       => 'ASC',
                            'post_type'   => 'post',
                            'suppress_filters' => true, // подавление работы фильтров изменения SQL запроса
                        ) );

                        foreach( $posts as $post ){
                            setup_postdata($post);
                            ?>

                            <div class="slider-item feedback-wrapper">
                                <div class="d-flex flex-column">
                                    <div class="feedback-text mx-4">
                                        <span class="fw-800"><?php the_field('feedback_name') ?></span>
                                        <?php the_field('feedback_text') ?>
                                    </div>
                                </div>
                            </div>

                            <?php 
                        }

                        wp_reset_postdata(); // сброс
                    ?>

                </div>
                <i class="fas fa-quote-right d-block text-right"></i>
                <?php echo do_shortcode('[contact-form-7 id="601" title="Отзыв"]'); ?>
            </div>
        </section>

        <section class="section contacts" id="contacts">
            <div class="container">
                <h2 class="section-title section-title-2">
                    КОНТАКТЫ
                </h2>
                <div class="d-flex flex-wrap">
                    <div class="contacts__info">
                        <div class="mb-2">
                            <span class="d-block mb-2 fw-800">Позвоните нам</span>
                            <a href="tel:<?php the_field('phone', 15); ?>" class="d-block mb-2"><?php the_field('phone', 15); ?></a>
                            <a href="tel:<?php the_field('phone_2', 15); ?>" class="d-block mb-2"><?php the_field('phone_2', 15); ?></a>
                            <a href="tel:<?php the_field('phone_3', 15); ?>" class="d-block mb-2"><?php the_field('phone_3', 15); ?></a>
                            <a href="tel:<?php the_field('phone_4', 15); ?>" class="d-block mb-2"><?php the_field('phone_4', 15); ?></a>
                        </div>
                        <span class="d-block mb-2 fw-800">Напишите нам</span>
                        <a href="mailto:<?php the_field('mail', 15); ?>" class="d-block mb-2"><?php the_field('mail', 15); ?></a>
                        <span class="d-block mb-2 fw-800">Наш адрес</span>
                        <a href="https://yandex.ru/maps/?pt=52.361621,55.688472&z=12&l=map" class="d-block mb-2"><?php the_field('location', 15); ?></a>
                        <span class="d-block mb-2 fw-800">Наши соцсети</span>
                        <div class="my-3">
                            <a href="<?php the_field('vk', 15); ?>"><i class="fab fa-vk"></i></a>
                            <a href="<?php the_field('instagram', 15); ?>"><i class="fab fa-instagram"></i></a>
                        </div>
                    </div>
                    <div class="contacts__map">
                        <script type="text/javascript" charset="utf-8" async src="https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3Af403a01e1df66f24ec1af089b117713d980c1ee8962991c5d4093b53b4ba33b5&amp;width=100%25&amp;height=550&amp;lang=ru_RU&amp;scroll=false"></script>
                    </div>
                </div>
            </div>
        </section>
<?php get_footer(); ?>
