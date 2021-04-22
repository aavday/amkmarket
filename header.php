<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="format-detection" content="telephone=no">
    <link rel="preload" href="<?php echo bloginfo('template_url'); ?>/dist/assets/fonts/Montserrat-Regular-min.woff" as="font" type="font/woff" crossorigin="anonymous">
    <link rel="preload" href="<?php echo bloginfo('template_url'); ?>/dist/assets/fonts/Montserrat-Italic-min.woff" as="font" type="font/woff" crossorigin="anonymous">
    <link rel="preload" href="<?php echo bloginfo('template_url'); ?>/dist/assets/fonts/Montserrat-Bold-min.woff" as="font" type="font/woff" crossorigin="anonymous">
    <link rel="preload" href="<?php echo bloginfo('template_url'); ?>/dist/assets/fonts/Montserrat-BoldItalic-min.woff" as="font" type="font/woff" crossorigin="anonymous">
    <link rel="preload" href="<?php echo bloginfo('template_url'); ?>/dist/assets/fonts/Montserrat-ExtraBold-min.woff" as="font" type="font/woff" crossorigin="anonymous">
    <link rel="preload" href="<?php echo bloginfo('template_url'); ?>/dist/assets/fonts/Montserrat-ExtraBoldItalic-min.woff" as="font" type="font/woff" crossorigin="anonymous">
    <link rel="preload" href="<?php echo bloginfo('template_url'); ?>/dist/assets/fonts/Montserrat-Black-min.woff" as="font" type="font/woff" crossorigin="anonymous">
    <link rel="preload" href="<?php echo bloginfo('template_url'); ?>/dist/assets/fonts/Montserrat-BlackItalic-min.woff" as="font" type="font/woff" crossorigin="anonymous">
    <script src="https://kit.fontawesome.com/c0475dd5ed.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="<?php echo bloginfo('template_url'); ?>/libs/lightgallery.js/dist/css/lightgallery.min.css">
    <?php wp_head(); ?>
</head>
<body>

    <header class="header">
        <div class="burger d-xl-none d-block">
            <div class="burger__item"></div>
        </div>
        <?php the_custom_logo(); ?>
        <div class="header__inner">
            <nav class="nav header__nav">
                <ul class="header__nav-list">
                    <li class="header__nav-list-item">
                        <a href="<?php echo get_home_url(); ?>/" data-scroll=".intro">Главная</a>
                    </li>
                    <li class="header__nav-list-item">
                        <a href="<?php echo get_home_url(); ?>/" data-scroll=".about-us">О компании</a>
                    </li>
                    <li class="header__nav-list-item">
                        <a href="<?php echo get_home_url(); ?>/" data-scroll=".feedback">Отзывы</a>
                    </li>
                    <li class="header__nav-list-item">
                        <a href="<?php echo get_home_url(); ?>/" data-scroll=".contacts">Контакты</a>
                    </li>
                    <li class="header__nav-list-item mt-2">
                        <a href="<?php echo get_home_url(); ?>/kategorii" class="fw-800">Каталог</a>
                    </li>
                    <li class="header__nav-list-item mt-2">
                        <a href="<?php echo get_home_url(); ?>/korzina">Корзина</a>
                    </li>
                </ul>
            </nav>
            <div class="header__contacts">
                <a href="tel:<?php the_field('phone', 15); ?>" class="d-block mb-2"><?php the_field('phone', 15); ?></a>
                <a href="mailto:<?php the_field('mail', 15); ?>" class="d-block mb-2"><?php the_field('mail', 15); ?></a>
                <div class="my-2">
                    <a href="<?php the_field('vk', 15); ?>"><i class="fab fa-vk"></i></a>
                    <a href="<?php the_field('instagram', 15); ?>"><i class="fab fa-instagram"></i></a>
                </div>
                <span class="header__copyright"><?php the_field('copyright', 15); ?></span>
            </div>
        </div>
        <a href="<?php echo get_home_url(); ?>/korzina"><i class="fas fa-shopping-cart d-xl-none"></i></a>
    </header>

    <main class="main">