</main>

    <footer class="footer">
        <div class="container">
            <h3 class="text-brown"><?php the_field('footer_title', 15); ?></h3>
            <nav class="nav footer__nav">
                <ul class="footer__nav-list">
                    <li class="footer__nav-list-item">
                        <a href="<?php echo get_home_url(); ?>" data-scroll=".intro">Главная</a>
                    </li>
                    <li class="footer__nav-list-item">
                        <a href="<?php echo get_home_url(); ?>" data-scroll=".about-us">О компании</a>
                    </li>
                    <li class="footer__nav-list-item">
                        <a href="<?php echo get_home_url(); ?>" data-scroll=".feedback">Отзывы</a>
                    </li>
                    <li class="footer__nav-list-item">
                        <a href="<?php echo get_home_url(); ?>" data-scroll=".contacts">Контакты</a>
                    </li>
                    <li class="footer__nav-list-item">
                        <a href="<?php echo get_home_url(); ?>/katalog">Каталог</a>
                    </li>
                    <li class="footer__nav-list-item">
                        <a href="<?php echo get_home_url(); ?>/korzina">Корзина</a>
                    </li>
                    <li class="footer__nav-list-item">
                        <a href="<?php echo get_home_url(); ?>/privacy-policy">Политика конфиденциальности</a>
                    </li>
                </ul>
            </nav>
            <a href="https://yandex.ru/maps/?pt=52.361621,55.688472&z=12&l=map"><?php the_field('location', 15); ?></a>
            <div class="footer__made-by my-2">Дизайн, создание и поддержка: Авдеев Алексей <a href="mailto:avdey@avday.ru">avdey@avday.ru</a></div>
            <div class="footer__copyright"><?php the_field('copyright', 15); ?></div>
            <p class="font-small">
                <?php the_field('not_offer', 15); ?>
            </p>
        </div>
    </footer>

    <script src="<?php echo bloginfo('template_url'); ?>/libs/tiny-slider/dist/min/tiny-slider.js"></script>
    <script src="<?php echo bloginfo('template_url'); ?>/libs/lightgallery.js/dist/js/lightgallery.min.js"></script>

    <?php wp_footer(); ?>

</body>
</html>
