<?php
add_action('wp_enqueue_scripts', 'amk_styles');
add_action('wp_enqueue_scripts', 'amk_scripts');

function amk_styles() {
    wp_enqueue_style('amk-style', get_stylesheet_uri());
}

function amk_scripts() {
    wp_enqueue_script('amk_scripts', get_template_directory_uri() . '/dist/assets/js/main-min.js', array(), null, true);
}

add_theme_support( 'title-tag' );
add_theme_support('custom-logo');
add_theme_support('post-thumbnails');
add_theme_support('menus');

/* add_filter('nav_menu_link_attributes', 'filter_nav_menu_link_attributes', 10, 3);
function filter_nav_menu_link_attributes($atts, $item, $args) {
    if ($args->menu === 'Main') {
        $atts['class'] = 'header__nav-item';

        if ($item->current || $item->current_item_ancestor) {
            $atts['class'] .= ' header__nav-item-active';
        }
    };

    return $atts;
}
?> */